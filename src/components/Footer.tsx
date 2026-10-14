import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-brand-title">
            <span className="footer-dot" />
            <h3>Sachin Singh</h3>
          </div>
          <p className="footer-role">
            DevOps &amp; System Engineer · Information Security Officer
          </p>
          <div className="footer-status-badge">
            <span className="status-ping" />
            <span>Open to DevOps, NetOps &amp; Cloud Security Opportunities</span>
          </div>
        </div>

        <div className="footer-nav-groups">
          <div className="footer-nav-col">
            <span className="footer-col-title">Navigation</span>
            <Link to="/experience">Experience</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/skills">Tech Stack</Link>
            <Link to="/education">Credentials</Link>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">Connect</span>
            <a href="https://linkedin.com/in/sachin-singh-devops" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href="https://github.com/punksoul2580" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <Link to="/contact">Get in Touch</Link>
            <a
              href="/Sachin-Singh_Resume-2026.pdf"
              download="Sachin-Singh-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV ↓
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} Sachin Singh. Engineered with precision &amp; security.
        </p>
        <div className="footer-meta-tags">
          <span className="footer-tag">ISO 27001:2022</span>
          <span className="footer-tag">AWS Cloud</span>
          <span className="footer-tag">CI/CD Automation</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
