# Sachin Singh - Portfolio Website

A modern, responsive portfolio website showcasing the professional experience, skills, and projects of Sachin Singh, a DevOps Engineer and Network Engineer with Information Security expertise.

## Features

- **Modern UI/UX**: Built with React, TypeScript, and Framer Motion for smooth animations
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Dark Theme**: Professional dark-themed interface with accent colors
- **Interactive Elements**: Hover effects on cards and smooth page transitions
- **Contact Form**: Integrated with Formspree for reliable message delivery
- **Multiple Sections**: Home, About, Education, Experience, Projects, Skills, and Contact pages

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with CSS Variables
- **Animations**: Framer Motion
- **Form Handling**: Formspree
- **Icons**: Custom styling (no external icon libraries)

## Sections

1. **Home**: Introduction with hero section, stats, and quick links
2. **About**: Professional background, focus areas, and interests
3. **Education**: Academic qualifications
4. **Experience**: Professional work history with detailed descriptions
5. **Projects**: Showcase of significant projects with technologies used
6. **Skills**: Technical skills categorized by domain
7. **Contact**: Contact form and professional contact information

## Project Highlights

- Automated Log Monitoring & Alerting System
- ELK Stack Logging Lab
- Job Vacancy Web Scraper
- CI/CD Deployment & Monitoring Stack
- Enterprise Network Configuration & Automation
- Automated API Regression Testing Tool
- Multi-Tenant Learning Management System (LMS)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Environment Variables

Create a `.env` file in the root directory (if needed for Formspree or other services):

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

## Deployment

This portfolio is configured for easy deployment to Vercel:

1. Push to GitHub/GitLab/Bitbucket
2. Import project in Vercel
3. Vercel will automatically detect the Vite configuration and deploy

## Customization

### Content Updates

All content is managed in `src/data/content.ts`:
- Hero section text
- About highlights
- Narrative/pillars
- Education timeline
- Experience timeline
- Projects showcase
- Skills matrix
- Contact details

### Styling

- Global styles in `src/index.css`
- Component-specific styles in `src/App.css`
- CSS variables defined in `:root` for easy theming

## Contact Form

The contact form uses Formspree for handling submissions:
- Endpoint configured in `src/pages/ContactPage.tsx`
- Automatic success/error handling
- Spam protection included
- Messages delivered directly to your email

## Performance

- Optimized bundle size with Vite
- Lazy loading of routes and images
- Efficient CSS with minimal overrides
- Optimized for Core Web Vitals

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## License

This project is open source and available under the MIT License.

## Contact

Sachin Singh
- Email: sachinsinghey987@gmail.com
- Phone: +977 98613 24504
- Location: Kathmandu, Nepal · Remote friendly
- LinkedIn: https://www.linkedin.com/in/sachin-singh-88933123a
- GitHub: https://github.com/1996sachin