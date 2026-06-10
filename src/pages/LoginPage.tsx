import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin'

  const apiBaseUrl = '' // Forced empty to use Vite proxy locally

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`${apiBaseUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        localStorage.setItem('portfolio_admin_token', data.token)
        navigate(from, { replace: true })
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageWrapper
      eyebrow="Security"
      title="Admin Login"
      description="Enter your administrator credentials to manage portfolio content."
    >
      <div className="admin-shell" style={{ justifyContent: 'center', marginTop: '2rem' }}>
        <div className="admin-panel" style={{ maxWidth: '400px', width: '100%' }}>
          <form className="contact-form" onSubmit={handleLogin}>
            <label>
              Administrator Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                autoFocus
              />
            </label>
            <label style={{ marginTop: '1rem' }}>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {isLoading ? 'Verifying...' : 'Login'}
            </button>

            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Link to="/forgot-password" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  )
}

export default LoginPage
