import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import helmet from 'helmet';
import { xss } from 'express-xss-sanitizer';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentFilePath = path.join(__dirname, '..', 'data', 'content.json');
const authFilePath = path.join(__dirname, '..', 'data', 'auth.json');

// Helper to handle authentication persistence
const getAdminCredentials = async () => {
  try {
    const authData = await fs.readFile(authFilePath, 'utf8');
    return JSON.parse(authData);
  } catch (error) {
    // Fallback to .env if auth.json doesn't exist
    const password = process.env.ADMIN_PASSWORD || process.env.ADMIN_TOKEN || 'admin123';
    const email = process.env.ADMIN_EMAIL || process.env.EMAIL_HOST_USER || 'admin@example.com';
    
    return { email, password, isHashed: false };
  }
};

const saveAdminCredentials = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await fs.mkdir(path.dirname(authFilePath), { recursive: true });
  await fs.writeFile(authFilePath, JSON.stringify({ email, password: hashedPassword, isHashed: true }), 'utf8');
};

// OWASP: Security Misconfiguration - Helmet helps set secure headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "https:"],
      "script-src": ["'self'", "'unsafe-inline'"], 
    },
  },
}));

app.use(express.json({ limit: '200kb' })); // OWASP: Protection against large payload DOS
app.use(xss()); // OWASP: Injection - XSS protection
app.use(hpp()); // OWASP: Injection - HTTP Parameter Pollution protection

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per window
  message: 'Too many login attempts, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const contactLimiter = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api/contact', contactLimiter);

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://sachinsinghchaudhary.com.np',
    'https://www.sachinsinghchaudhary.com.np',
    'https://portfolio-1-pwgm.onrender.com'
  ],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// OWASP: Identification and Authentication Failures - Secure JWT secret
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  console.error('[FATAL] JWT_SECRET environment variable is required in production!');
  process.exit(1);
}
const ACTUAL_JWT_SECRET = JWT_SECRET || 'dev-secret-only';

const defaultContent = {
  heroContent: {
    name: "Sachin Singh",
    title: "Devops Engineer & Information Security officer",
    summary: "I secure SD-WAN fabrics, script operational runbooks, and keep hybrid networks ready for the next incident.",
    availability: "Open to DevOps, NetOps, and SOC-focused opportunities.",
    primaryCta: {
      label: "View Experience",
      href: "/experience"
    },
    secondaryCta: {
      label: "Get in touch",
      href: "/contact"
    }
  },
  aboutHighlights: [],
  narrative: { intro: "", pillars: [] },
  educationTimeline: [],
  experienceTimeline: [],
  projectShowcase: [],
  skillMatrix: [],
  contactDetails: {
    email: "",
    phone: "",
    location: "",
    availabilityNote: "",
    socials: []
  }
};

const readContent = async () => {
  try {
    const content = await fs.readFile(contentFilePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return defaultContent;
    }
    throw error;
  }
};

const writeContent = async (content) => {
  await fs.mkdir(path.dirname(contentFilePath), { recursive: true });
  await fs.writeFile(contentFilePath, JSON.stringify(content, null, 2), 'utf8');
};

const requiredContentKeys = [
  'heroContent',
  'aboutHighlights',
  'narrative',
  'educationTimeline',
  'experienceTimeline',
  'projectShowcase',
  'skillMatrix',
  'contactDetails'
];

const isValidContentShape = (content) => {
  return (
    content &&
    typeof content === 'object' &&
    requiredContentKeys.every((key) => Object.prototype.hasOwnProperty.call(content, key)) &&
    Array.isArray(content.aboutHighlights) &&
    Array.isArray(content.educationTimeline) &&
    Array.isArray(content.experienceTimeline) &&
    Array.isArray(content.projectShowcase) &&
    Array.isArray(content.skillMatrix)
  );
};

const requireAdmin = (req, res, next) => {
  const token = req.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  try {
    const decoded = jwt.verify(token, ACTUAL_JWT_SECRET);
    if (decoded.role !== 'admin') {
      throw new Error('Not an admin');
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.warn(`[Security] Unauthorized access attempt: ${error.message}`);
    return res.status(401).json({ success: false, message: 'Invalid or expired session.' });
  }
};

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
});

app.post('/api/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const admin = await getAdminCredentials();

  let isValid = false;
  if (admin.isHashed) {
    isValid = await bcrypt.compare(password, admin.password);
  } else {
    isValid = (email === admin.email && password === admin.password);
  }

  if (isValid && email === admin.email) {
    const token = jwt.sign(
      { role: 'admin' },
      ACTUAL_JWT_SECRET,
      { expiresIn: '2h' }
    );
    return res.status(200).json({ success: true, token });
  }

  console.warn(`[Security] Failed login attempt for email ${email} from IP: ${req.ip}`);
  res.status(401).json({ success: false, message: 'Invalid credentials.' });
});

app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  const admin = await getAdminCredentials();

  if (!email || email !== admin.email) {
    return res.status(200).json({ success: true, message: 'If that account exists, an email has been sent.' });
  }

  const resetToken = jwt.sign(
    { role: 'admin', purpose: 'password-reset' },
    ACTUAL_JWT_SECRET,
    { expiresIn: '15m' }
  );

  const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;

  try {
    await transporter.sendMail({
      from: `"Portfolio Security" <${process.env.EMAIL_HOST_USER}>`,
      to: admin.email, 
      subject: 'Portfolio Password Reset Request',
      text: `A password reset was requested for your portfolio admin account. Use the link below to reset your password. This link expires in 15 minutes.\n\n${resetLink}`,
      html: `<p>A password reset was requested for your portfolio admin account.</p><p>Click the button below to reset your password. This link expires in 15 minutes.</p><a href="${resetLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a><p>If you did not request this, please ignore this email.</p>`,
    });
    res.status(200).json({ success: true, message: 'If that account exists, an email has been sent.' });
  } catch (error) {
    console.error('Error sending reset email:', error);
    res.status(500).json({ success: false, message: 'Failed to send reset email.' });
  }
});

app.post('/api/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ success: false, message: 'Token and new password are required.' });
  }

  try {
    const decoded = jwt.verify(token, ACTUAL_JWT_SECRET);
    if (decoded.role !== 'admin' || decoded.purpose !== 'password-reset') {
      throw new Error('Invalid token purpose');
    }

    const admin = await getAdminCredentials();
    await saveAdminCredentials(admin.email, newPassword);

    res.status(200).json({ success: true, message: 'Password reset successfully. You can now log in with your new password.' });
  } catch (error) {
    console.error('Reset password error:', error.message);
    res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
  }
});

app.get('/api/content', async (req, res) => {
  try {
    const content = await readContent();
    res.status(200).json(content);
  } catch (error) {
    console.error('Error reading content:', error);
    res.status(500).json({ success: false, message: 'Failed to load content.' });
  }
});

app.put('/api/content', requireAdmin, async (req, res) => {
  if (!isValidContentShape(req.body)) {
    return res.status(400).json({ success: false, message: 'Invalid portfolio content.' });
  }

  try {
    await writeContent(req.body);
    res.status(200).json({ success: true, message: 'Content saved successfully.' });
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ success: false, message: 'Failed to save content.' });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields.' });
  }

  try {
    const mailOptions = {
      from: `"Portfolio Lead" <${process.env.EMAIL_HOST_USER}>`,
      to: process.env.EMAIL_HOST_USER,
      subject: `New Lead from Portfolio: ${name}`,
      text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

// Serve static files from the 'dist' directory
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Fallback for SPA: serve index.html for any unknown routes
app.get('{*path}', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).json({ success: false, message: 'Frontend not built yet' });
    }
  });
});

export default app;
