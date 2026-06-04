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

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentFilePath = path.join(__dirname, '..', 'data', 'content.json');

app.use(helmet());
app.use(express.json({ limit: '200kb' }));
app.use(xss());
app.use(hpp());

const limiter = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api/contact', limiter);

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://sachinsinghchaudhary.com.np',
    'https://www.sachinsinghchaudhary.com.np'
  ],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const readContent = async () => {
  const content = await fs.readFile(contentFilePath, 'utf8');
  return JSON.parse(content);
};

const writeContent = async (content) => {
  await fs.mkdir(path.dirname(contentFilePath), { recursive: true });
  await fs.writeFile(contentFilePath, `${JSON.stringify(content, null, 2)}\n`);
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
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    return res.status(500).json({
      success: false,
      message: 'ADMIN_TOKEN is not configured on the server.'
    });
  }

  const token = req.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (token !== adminToken) {
    return res.status(401).json({ success: false, message: 'Invalid admin token.' });
  }

  next();
};

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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields.' });
  }

  try {
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
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

export default app;
