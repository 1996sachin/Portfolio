import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { contactDetails } from '../data/content'
import { useState } from 'react'

const ContactPage = () => {
  const [isSent, setIsSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  return (
    <PageWrapper
      eyebrow="Contact"
      title="Let’s build calm, purposeful products together."
      description={contactDetails.availabilityNote}
    >
      <motion.div
        className="contact-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="contact-card">
          <p className="eyebrow">Reach out</p>
          <ul>
            <li>
              <span>Email</span>
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            </li>
            <li>
              <span>Phone</span>
              <a href={`tel:${contactDetails.phone}`}>{contactDetails.phone}</a>
            </li>
            <li>
              <span>Location</span>
              <p>{contactDetails.location}</p>
            </li>
          </ul>
        </div>
        <div className="contact-card">
          <p className="eyebrow">Social</p>
          <ul>
            {contactDetails.socials.map((social) => (
              <li key={social.href}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.label} →
                </a>
              </li>
            ))}
          </ul>
        </div>
        <form
          className="contact-form"
          action="https://formspree.io/f/mjgjgyor"
          method="POST"
          onSubmit={async (event) => {
            event.preventDefault()
            const form = event.currentTarget
            setIsSubmitting(true)
            setError('')
            
            try {
              const res = await fetch(form.action, {
                method: "POST",
                body: new FormData(form)
              })

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
            <input
              type="email"
              name="email"
              placeholder="you@email.com"
              required
            />
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
            <p style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.9rem' }}>
              {error}
            </p>
          )}
        </form>
      </motion.div>
    </PageWrapper>
  )
}

export default ContactPage

