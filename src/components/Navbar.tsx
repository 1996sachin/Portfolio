import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { usePortfolioContent } from '../context/ContentContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Education', to: '/education' },
  { label: 'Contact', to: '/contact' },
]

interface NavbarProps {
  onOpenCommandPalette?: () => void
}

const Navbar = ({ onOpenCommandPalette }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { content: { heroContent } } = usePortfolioContent()
  const resumeHref = heroContent.cvDownload.href || '/Sachin_Singh_Resume_2026.pdf'

  const isAdminRoute =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/forgot-password') ||
    location.pathname.startsWith('/reset-password')

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="nav-container">
      <div className="nav-inner">
        <div className="nav-brand">
          <NavLink to="/" onClick={closeMenu} className="brand-link">
            <div className="brand-logo-frame">
              <img src="/favicon.svg" alt="Sachin Singh Logo" className="brand-logo-img" />
            </div>
            <div className="brand-meta">
              <span className="brand-name">Sachin Singh</span>
              <span className="brand-badge">DevOps &amp; Security</span>
            </div>
          </NavLink>
        </div>

        {!isAdminRoute && (
          <>
            <button
              className={`nav-toggle ${isOpen ? 'active' : ''}`}
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <span />
              <span />
              <span />
            </button>

            <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link ${isActive || location.pathname === link.to ? 'active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="nav-actions-mobile">
                {onOpenCommandPalette && (
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu()
                      onOpenCommandPalette()
                    }}
                    className="nav-cta-btn secondary"
                  >
                    <span>⌘ Search</span>
                  </button>
                )}
                <a
                  href={resumeHref}
                  download="Sachin-Singh-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-cta-btn secondary"
                >
                  CV ↓
                </a>
                <NavLink to="/contact" onClick={closeMenu} className="nav-cta-btn primary">
                  Hire Me
                </NavLink>
              </div>
            </nav>

            <div className="nav-actions-desktop">
              {onOpenCommandPalette && (
                <button
                  type="button"
                  className="nav-cmd-trigger"
                  onClick={onOpenCommandPalette}
                  title="Search & Quick Actions (⌘K)"
                >
                  <span className="cmd-icon">⌘</span>
                  <span className="cmd-label">Quick Actions</span>
                  <kbd className="cmd-kbd">⌘K</kbd>
                </button>
              )}

              <a
                href={resumeHref}
                download="Sachin-Singh-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta-btn secondary"
                title="Download Resume"
              >
                <span>CV</span>
                <span className="download-icon">↓</span>
              </a>
              <NavLink to="/contact" className="nav-cta-btn primary">
                Hire Me
              </NavLink>
            </div>
          </>
        )}

        {isAdminRoute && (
          <nav className="nav-links">
            <NavLink to="/" onClick={closeMenu} className="nav-cta-btn secondary">
              View Site →
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar
