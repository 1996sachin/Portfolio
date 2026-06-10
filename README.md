## Dynamic Content & Admin Panel

This portfolio features a dynamic content management system that allows you to update your details directly from the browser without modifying code.

### 1. Configure the Server
The backend requires an `ADMIN_TOKEN` for security. Set this as an environment variable in your production environment (e.g., Vercel, Heroku, or your own server).

```env
ADMIN_TOKEN=your_secure_random_token_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
```

### 2. Access the Admin Panel
1. Start the server (`npm start`).
2. Navigate to `/admin` in your browser.
3. Enter your `ADMIN_TOKEN`.
4. Use the intuitive forms to update your Hero, Experience, Projects, and more.
5. Click **Save All Changes** to persist the updates to `data/content.json`.

### 3. How it Works
- **Frontend**: Fetches content from `/api/content` on load and uses it throughout the site.
- **Backend**: An Express API serves the content and handles updates.
- **Persistence**: Content is stored in `data/content.json`.
- **Fallback**: If the API is unavailable, the site gracefully falls back to the default content in `src/data/content.ts`.

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

This project is open source and available under the MIT License

## Contact

Sachin Singh
- Email: sachinsinghey987@gmail.com
- Phone: +977 98613 24504
- Location: Kathmandu, Nepal · Remote friendly
- LinkedIn: https://www.linkedin.com/in/sachin-singh-88933123a
- GitHub: https://github.com/1996sachin
