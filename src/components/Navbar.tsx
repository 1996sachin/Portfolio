import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Education', to: '/education' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Contact', to: '/contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login') || location.pathname.startsWith('/forgot-password') || location.pathname.startsWith('/reset-password')

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="nav">
      <div className="nav-brand">
        <NavLink to="/" onClick={closeMenu}>
          Sachin Singh
        </NavLink>
      </div>

      {!isAdminRoute && (
        <>
          <button
            className="nav-toggle"
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
                  isActive || location.pathname === link.to ? 'active' : undefined
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </>
      )}

      {isAdminRoute && (
        <nav className="nav-links">
           <NavLink to="/" onClick={closeMenu}>View Site</NavLink>
        </nav>
      )}
    </header>
  )
}

export default Navbar

