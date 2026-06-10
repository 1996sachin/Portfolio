import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const apiBaseUrl = import.meta.env.VITE_API_URL ?? ''
  
  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setStatus('')
    setIsLoading(true)

    try {
      const response = await fetch(`${apiBaseUrl}/api/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus(data.message || 'If that account exists, an email has been sent.')
      } else {
        setError(data.message || 'Failed to send reset email.')
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageWrapper
      eyebrow="Recovery"
      title="Forgot Password"
      description="Enter your admin email to receive a password reset link."
    >
      <div className="admin-shell" style={{ justifyContent: 'center', marginTop: '2rem' }}>
        <div className="admin-panel" style={{ maxWidth: '400px', width: '100%' }}>
          {status ? (
            <div style={{ textAlign: 'center' }}>
              <p className="admin-success" style={{ marginBottom: '1.5rem' }}>{status}</p>
              <Link to="/login" className="btn primary">Back to Login</Link>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleResetRequest}>
              <label>
                Admin Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  autoFocus
                />
              </label>
              
              {error && <p className="admin-error" style={{ marginTop: '0.5rem' }}>{error}</p>}
              
              <button 
                className="btn primary" 
                type="submit" 
                disabled={isLoading}
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <Link to="/login" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default ForgotPasswordPage
