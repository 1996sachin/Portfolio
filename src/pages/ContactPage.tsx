import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { usePortfolioContent } from '../context/ContentContext'
import { useState } from 'react'
import TiltCard from '../components/TiltCard'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 15 },
  },
} as const

const ContactPage = () => {
  const {
    content: { contactDetails, heroContent },
  } = usePortfolioContent()
  const [isSent, setIsSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  return (
    <PageWrapper
      eyebrow="Contact"
      title="Let’s build secure, scalable systems together."
      description={contactDetails.availabilityNote}
    >
      <motion.div
        className="contact-layout-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column: Info cards */}
        <div className="contact-info-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div variants={itemVariants}>
            <TiltCard className="contact-card" intensity={5}>
              <p className="eyebrow">Reach out</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</span>
                  <a href={`mailto:${contactDetails.email}`} style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>{contactDetails.email}</a>
                </li>
                <li style={{ marginTop: '0.5rem' }}>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phone</span>
                  <a href={`tel:${contactDetails.phone}`} style={{ color: '#fff' }}>{contactDetails.phone}</a>
                </li>
                <li style={{ marginTop: '0.5rem' }}>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</span>
                  <p style={{ margin: 0 }}>{contactDetails.location}</p>
                </li>
                <li style={{ marginTop: '0.5rem' }}>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Resume</span>
                  <a
                    href={heroContent.cvDownload.href}
                    download="Sachin-Singh-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}
                  >
                    {heroContent.cvDownload.label} ↓
                  </a>
                </li>
              </ul>
            </TiltCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TiltCard className="contact-card" intensity={5}>
              <p className="eyebrow">Social</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {contactDetails.socials.map((social) => (
                  <li key={social.href}>
                    <a href={social.href} target="_blank" rel="noreferrer" style={{ display: 'inline-block', color: 'var(--accent-secondary)' }}>
                      {social.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </motion.div>
        </div>

        {/* Right Column: Form card */}
        <motion.div variants={itemVariants} className="contact-form-container">
          <TiltCard className="contact-form-card" intensity={3}>
            <form
              className="contact-form"
              action="https://formspree.io/f/xojrorrn"
              method="POST"
              onSubmit={async (event) => {
                event.preventDefault()
                const form = event.currentTarget
                setIsSubmitting(true)
                setError('')
                try {
                  const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                  })
                  console.log('Formspree response status:', res.status)
                  console.log('Formspree response ok:', res.ok)

                  if (res.ok) {
                    setIsSent(true)
                    setTimeout(() => {
                      setIsSent(false)
                      form.reset()
                    }, 4000)
                  } else {
                    setError('Failed to send message. Please try again later.')
                  }
                } catch (err) {
                  console.error('Form submission error:', err)
                  setError('Failed to send message. Please try again later.')
                } finally {
                  setIsSubmitting(false)
                }
              }}
            >
              <p className="eyebrow">Send a note</p>
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="you@email.com" required />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows={4}
                  placeholder="What would you like to collaborate on?"
                  required
                />
              </label>
              <button className="btn primary" type="submit" disabled={isSubmitting || isSent}>
                {isSubmitting ? 'Sending...' : isSent ? 'Message sent!' : 'Send message'}
              </button>

              {isSent && (
                <p style={{ color: 'var(--text-secondary, #a1a1aa)', marginTop: '1rem', fontSize: '0.9rem' }}>
                  Thanks for reaching out! I will reply shortly.
                </p>
              )}
              {error && (
                <p style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.9rem' }}>{error}</p>
              )}
            </form>
          </TiltCard>
        </motion.div>
      </motion.div>
    </PageWrapper>
  )
}

export default ContactPage
