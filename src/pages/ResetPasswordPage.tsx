import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setStatus('')

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!token) {
      setError('Invalid reset link. Please request a new one.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus(data.message || 'Password reset successfully.')
      } else {
        setError(data.message || 'Failed to reset password.')
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
      title="Reset Password"
      description="Enter your new administrator password."
    >
      <div className="admin-shell" style={{ justifyContent: 'center', marginTop: '2rem' }}>
        <div className="admin-panel" style={{ maxWidth: '400px', width: '100%' }}>
          {status ? (
            <div style={{ textAlign: 'center' }}>
              <p className="admin-success" style={{ marginBottom: '1.5rem' }}>{status}</p>
              <Link to="/login" className="btn primary">Login Now</Link>
            </div>
          ) : !token ? (
            <div style={{ textAlign: 'center' }}>
              <p className="admin-error" style={{ marginBottom: '1.5rem' }}>Missing or invalid reset token.</p>
              <Link to="/forgot-password" style={{ color: 'var(--accent)' }}>Request a new link</Link>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleReset}>
              <label>
                New Password
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoFocus
                />
              </label>

              <label style={{ marginTop: '1rem' }}>
                Confirm New Password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </label>
              
              {error && <p className="admin-error" style={{ marginTop: '0.5rem' }}>{error}</p>}
              
              <button 
                className="btn primary" 
                type="submit" 
                disabled={isLoading}
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                {isLoading ? 'Resetting...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default ResetPasswordPage
