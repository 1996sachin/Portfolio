import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import sachinPhoto from '../assets/Sachin.jpg'
import { usePortfolioContent } from '../context/ContentContext'
import TiltCard from '../components/TiltCard'
import ArchitectureConsole from '../components/ArchitectureConsole'

const heroStats = [
  { label: 'Production Servers', value: '45+' },
  { label: 'ISO 27001:2022', value: 'Certified' },
  { label: 'System Uptime Target', value: '99.9%' },
  { label: 'Professional Certs', value: '6' },
]

const marqueeItems = [
  'ISO 27001:2022 ISMS', 'AWS Cloud (VPC, WAF, RDS)', 'Fortinet Firewalls & Switches',
  'Jenkins CI/CD Pipelines', 'Linux (Ubuntu, CentOS, RHEL)', 'Docker & Containers',
  'Zabbix & Grafana Monitoring', 'L2 IPSec VPN Tunnels', 'Bare-Metal iDRAC Systems',
  'Infrastructure as Code', 'Vulnerability Assessment', 'SOC & Incident Response',
]

const bentoFeatures = [
  {
    id: 'cloud-net',
    icon: '🌐',
    title: 'Hybrid Cloud & Networking',
    desc: 'Architecting secure multi-tier AWS environments integrated seamlessly with bare-metal on-premise clusters via high-throughput L2 IPSec VPN tunnels.',
    tags: ['AWS VPC', 'Route 53', 'Fortinet NGFW', 'L2 IPSec', 'FortiSwitch'],
    badge: '45+ Managed Nodes',
  },
  {
    id: 'isms-sec',
    icon: '🛡️',
    title: 'ISO 27001 ISMS & Hardening',
    desc: 'Led the comprehensive ISO 27001:2022 ISMS implementation for Sociair SaaS, authoring policies, risk treatment plans, and passing external certification audits.',
    tags: ['ISO 27001:2022', 'ISMS Policy', 'Risk Assessment', 'SoA', 'CIS Hardening'],
    badge: 'Certified Lead',
  },
  {
    id: 'cicd-auto',
    icon: '⚡',
    title: 'CI/CD & Container Automation',
    desc: 'Eliminating deployment toil through automated Jenkins pipelines, immutable Docker containerization, and zero-downtime rolling update strategies.',
    tags: ['Jenkins CI', 'Docker', 'Bash Automation', 'Zero-Downtime', 'GitOps'],
    badge: '9 Pipelines Automated',
  },
  {
    id: 'obs-mon',
    icon: '📊',
    title: 'Proactive Telemetry & SOC',
    desc: 'Full-stack infrastructure observability with Zabbix and Grafana, monitoring hardware sensors, network latency, and automated incident escalation.',
    tags: ['Zabbix HA', 'Grafana', 'SNMP & iDRAC', 'SOC Analysis', 'Log Retention'],
    badge: '2,400+ Telemetry Items',
  },
]

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 90, damping: 18 },
  },
} as const

const HomePage = () => {
  const {
    content: { heroContent, projectShowcase, skillMatrix },
  } = usePortfolioContent()

  const handleOpenCmd = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'))
  }

  return (
    <motion.section
      className="page home-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div className="hero-section" variants={itemVariants}>
        <div className="hero-content">
          <div className="hero-status-pill">
            <span className="status-dot-pulse" />
            <span className="status-pill-text">{heroContent.availability}</span>
          </div>

          <h1 className="hero-headline">
            Architecting <span className="headline-gradient">Resilient Cloud Systems</span> &amp; Zero-Trust Security.
          </h1>

          <p className="hero-summary">
            {heroContent.summary}
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary" to={heroContent.primaryCta.href}>
              <span>{heroContent.primaryCta.label}</span>
              <span className="btn-arrow">→</span>
            </Link>

            <Link className="btn btn-secondary" to={heroContent.secondaryCta.href}>
              {heroContent.secondaryCta.label}
            </Link>

            <a
              className="btn btn-resume"
              href={heroContent.cvDownload.href}
              download="Sachin-Singh-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              title="Download Resume PDF"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{heroContent.cvDownload.label}</span>
            </a>
          </div>

          <div className="hero-shortcut-hint">
            <button type="button" onClick={handleOpenCmd} className="shortcut-btn">
              <span>Tip: Press</span>
              <kbd>⌘K</kbd>
              <span>or</span>
              <kbd>Ctrl+K</kbd>
              <span>for quick actions &amp; instant navigation</span>
            </button>
          </div>
        </div>

        {/* Hero Visual: System Engineer Profile Card */}
        <div className="hero-visual">
          <TiltCard className="system-card">
            <div className="system-card-header">
              <div className="system-card-profile">
                <div className="profile-img-wrap">
                  <img src={sachinPhoto} alt="Sachin Singh - DevOps & System Engineer" />
                  <span className="profile-online-badge" />
                </div>
                <div className="profile-info">
                  <h3 className="profile-name">Sachin Singh</h3>
                  <p className="profile-role">DevOps &amp; System Engineer</p>
                  <p className="profile-location">Old Baneshwor, Kathmandu</p>
                </div>
              </div>
            </div>

            <div className="system-metrics-grid">
              {heroStats.map((stat) => (
                <div key={stat.label} className="metric-cell">
                  <span className="metric-val">{stat.value}</span>
                  <span className="metric-lbl">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="system-stack-row">
              <span className="stack-label">Active Core Stack:</span>
              <div className="stack-pills">
                {['AWS Cloud', 'Fortinet NGFW', 'ISO 27001', 'Jenkins CI', 'Linux / RHEL', 'Zabbix'].map((pill) => (
                  <span key={pill} className="stack-chip">{pill}</span>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>
      </motion.div>

      {/* CENTERPIECE: INTERACTIVE ARCHITECTURE & SECURITY CONSOLE */}
      <motion.section className="console-section" variants={itemVariants}>
        <div className="console-section-header">
          <div className="console-header-badge">
            <span className="badge-pulse" />
            <span>INTERACTIVE SYSTEM EXPLORER</span>
          </div>
          <h2>Live Infrastructure Architecture &amp; Security Controls</h2>
          <p className="console-header-sub">
            Click through the tabs below to inspect the production topology, ISO 27001 ISMS implementation, and automated deployment pipelines.
          </p>
        </div>

        <ArchitectureConsole />
      </motion.section>

      {/* Infinite Scrolling Marquee */}
      <motion.div className="skills-marquee-container" variants={itemVariants}>
        <div className="skills-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="marquee-badge">
              <span className="marquee-dot" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* DEVOPS & SECURITY BENTO GRID */}
      <motion.section className="bento-section" variants={itemVariants}>
        <div className="section-block-header">
          <div>
            <span className="section-eyebrow">Engineering Pillars</span>
            <h2>Core Competencies &amp; Infrastructure Mastery</h2>
          </div>
          <Link className="btn btn-secondary view-all-link" to="/experience">
            View Career Timeline →
          </Link>
        </div>

        <div className="bento-grid">
          {bentoFeatures.map((feature) => (
            <TiltCard key={feature.id} className="bento-card">
              <div className="bento-card-top">
                <span className="bento-icon">{feature.icon}</span>
                <span className="bento-badge">{feature.badge}</span>
              </div>
              <h3 className="bento-title">{feature.title}</h3>
              <p className="bento-desc">{feature.desc}</p>
              <div className="bento-tags">
                {feature.tags.map((tag) => (
                  <span key={tag} className="tech-badge">{tag}</span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </motion.section>

      {/* Featured Projects Preview */}
      <motion.section className="section-block" variants={itemVariants}>
        <div className="section-block-header">
          <div>
            <span className="section-eyebrow">Selected Builds</span>
            <h2>Production-Grade Projects &amp; Systems</h2>
          </div>
          <Link className="btn btn-secondary view-all-link" to="/projects">
            All Projects →
          </Link>
        </div>

        <div className="project-rows-wrapper">
          {projectShowcase.slice(0, 3).map((project, idx) => (
            <a
              key={project.title}
              href={project.link || '#'}
              target={project.link ? '_blank' : undefined}
              rel="noreferrer"
              className="project-row-item"
            >
              <div className="row-index">0{idx + 1}</div>
              <div className="row-info">
                <h3 className="row-title">{project.title}</h3>
                <p className="row-desc">{project.description}</p>
              </div>
              <div className="row-stack">
                {project.stack.slice(0, 3).map((tag) => (
                  <span key={tag} className="tech-badge">{tag}</span>
                ))}
              </div>
              <div className="row-arrow">↗</div>
            </a>
          ))}
        </div>
      </motion.section>

      {/* Skills Matrix Preview */}
      <motion.section className="section-block" variants={itemVariants}>
        <div className="section-block-header">
          <div>
            <span className="section-eyebrow">Skills Matrix</span>
            <h2>Infrastructure, Security &amp; Automation Tooling</h2>
          </div>
          <Link className="btn btn-secondary view-all-link" to="/skills">
            Full Tech Stack →
          </Link>
        </div>

        <div className="skills-overview-grid">
          {skillMatrix.slice(0, 4).map((category) => (
            <TiltCard key={category.title} className="skill-category-card">
              <h3 className="category-title">{category.title}</h3>
              <ul className="category-list">
                {category.skills.slice(0, 4).map((skill) => (
                  <li key={skill} className="category-item">
                    <span className="item-check">✓</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>
      </motion.section>
    </motion.section>
  )
}

export default HomePage
