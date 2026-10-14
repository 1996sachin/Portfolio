import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import sachinPhoto from '../assets/Sachin.jpg'
import { usePortfolioContent } from '../context/ContentContext'
import TiltCard from '../components/TiltCard'

const heroStats = [
  { label: 'Production Servers Managed', value: '45+' },
  { label: 'Deployments Automated', value: '9' },
  { label: 'Certifications', value: '6' },
]

const heroNarrative = [
  'As a DevOps & System Engineer and Information Security practitioner, I focus on the critical intersection of automated deployment pipelines, resilient infrastructure, and proactive security controls. I build, monitor, and harden systems from bare-metal iDRAC-managed servers to AWS cloud — and led the end-to-end implementation to achieve official ISO 27001:2022 certification for Sociair SaaS platform.',
  'My daily work spans Fortinet firewalls and FortiSwitch management, Linux server administration across Ubuntu, CentOS, and RHEL, AWS infrastructure including VPC, WAF, EC2, S3, Route 53, RDS, and IAM, L2 IPSec VPN tunnels, Zabbix monitoring, and Jenkins-driven CI/CD pipelines. I also design ISMS programmes covering risk assessment, SoA, internal audits, and certification audit coordination.',
  'I am passionate about eliminating manual operational toil while mitigating cyber threats through infrastructure hardening, ISMS controls, threat analysis, and self-healing cloud design. Bridging the gap between speed and security is my primary mission.',
]

const marqueeItems = [
  'ISO 27001:2022', 'ISMS', 'Risk Assessment', 'Internal Audit',
  'Fortinet Firewall', 'FortiSwitch', 'AWS VPC', 'AWS WAF',
  'EC2 & RDS', 'S3 & Route 53', 'IAM Security', 'Jenkins CI/CD',
  'Ubuntu & CentOS', 'RHEL Server', 'L2 IPSec VPN', 'Zabbix Monitoring',
  'iDRAC Management', 'On-Premises Servers', 'Docker & Kubernetes', 'Terraform',
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
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 15 },
  },
} as const

const HomePage = () => {
  const {
    content: { heroContent, projectShowcase, skillMatrix },
  } = usePortfolioContent()

  return (
    <motion.section
      className="page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="hero-grid" variants={itemVariants}>
        <div className="hero-copy">
          <div className="hero-deco-text">SECURE</div>
          
          <p className="eyebrow-tech">{heroContent.title}</p>
          
          <h1 className="hero-main-title">
            <span className="block-text">Sachin</span>
            <span className="block-text italic-accent">Singh</span>
          </h1>

          <p className="lede">{heroContent.summary}</p>
          
          <div className="hero-cta">
            <Link className="btn primary animate-btn" to={heroContent.primaryCta.href}>
              {heroContent.primaryCta.label} <span>→</span>
            </Link>
            <Link className="btn ghost animate-btn" to={heroContent.secondaryCta.href}>
              {heroContent.secondaryCta.label}
            </Link>
            <a
              className="btn ghost animate-btn"
              href={heroContent.cvDownload.href}
              download="Sachin-Singh-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              {heroContent.cvDownload.label} <span>↓</span>
            </a>
          </div>
          
          <p className="availability">
            <span className="status-indicator"></span> {heroContent.availability}
          </p>
        </div>

        <motion.div
          className="hero-photo-container"
          variants={itemVariants}
        >
          <TiltCard className="hero-photo-card" intensity={15}>
            <img src={sachinPhoto} alt="Portrait of Sachin Singh" />
            <p>DevOps &amp; System Engineer</p>
          </TiltCard>
        </motion.div>

        <motion.div
          className="hero-card-container"
          variants={itemVariants}
        >
          <TiltCard className="hero-card" intensity={8}>
            <p className="eyebrow">Impact pulse</p>
            <ul>
              {heroStats.map((stat) => (
                <li key={stat.label}>
                  <span>{stat.value}</span>
                  <p>{stat.label}</p>
                </li>
              ))}
            </ul>
            <div className="hero-card-footer">
              <p>Hybrid infrastructure, ISO 27001 ISMS, cloud automation, and security hardening.</p>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>

      {/* Infinite Scrolling Marquee */}
      <motion.div className="skills-marquee-wrapper" variants={itemVariants}>
        <div className="skills-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="marquee-item">
              {item}
              <span className="marquee-dot"></span>
            </span>
          ))}
        </div>
      </motion.div>

      <motion.section className="hero-narrative" variants={itemVariants}>
        <h2>Why I build</h2>
        {heroNarrative.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </motion.section>

      <motion.div className="quick-links" variants={itemVariants}>
        {[
          { title: 'About', description: 'Mindset, certifications, and passions', to: '/about' },
          { title: 'Experience', description: 'DevOps, SOC, and network leadership', to: '/experience' },
          { title: 'Projects', description: 'Automation and monitoring labs', to: '/projects' },
        ].map((card) => (
          <Link key={card.to} to={card.to} className="quick-card-link">
            <TiltCard className="quick-card" intensity={12}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span>Explore →</span>
            </TiltCard>
          </Link>
        ))}
      </motion.div>

      <motion.section
        className="preview-section"
        variants={itemVariants}
      >
        <div className="section-heading">
          <p className="eyebrow">Selected builds</p>
          <h2>Recent projects that ship delight with rigor</h2>
        </div>
        <div className="project-list-vertical">
          {projectShowcase.slice(0, 3).map((project, idx) => (
            <a
              key={project.title}
              href={project.link || '#'}
              target={project.link ? '_blank' : undefined}
              rel="noreferrer"
              className="project-item-row"
            >
              <span className="project-num">0{idx + 1}</span>
              <div className="project-row-copy">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-row-tags">
                {project.stack.slice(0, 3).map((tag) => (
                  <span key={tag} className="tech-badge">{tag}</span>
                ))}
              </div>
              <span className="project-arrow-icon">↗</span>
            </a>
          ))}
        </div>
        <div className="view-more-container">
          <Link className="btn ghost view-all-btn" to="/projects">
            View All Projects
          </Link>
        </div>
      </motion.section>

      <motion.section
        className="preview-section"
        variants={itemVariants}
      >
        <div className="section-heading">
          <p className="eyebrow">Skills stack</p>
          <h2>Blending infrastructure, security, and DevOps automation.</h2>
        </div>
        <div className="skill-grid">
          {skillMatrix.slice(0, 3).map((category) => (
            <TiltCard key={category.title} className="skill-card" intensity={6}>
              <h3>{category.title}</h3>
              <ul>
                {category.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
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
