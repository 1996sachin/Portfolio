import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import sachinPhoto from '../assets/Sachin.jpg'
import { heroContent, projectShowcase, skillMatrix } from '../data/content'

const heroStats = [
  { label: 'Networks Secured', value: '25+' },
  { label: 'Deployments Automated', value: '30+' },
  { label: 'Certifications', value: '6' },
]

const heroNarrative = [
  'As a dedicated Network & Systems Administrator and Junior DevOps Engineer, I have built a solid foundation in SD-WAN, EMS, automation, and secure network design. I thrive in dynamic IT environments that require both deep technical understanding and a proactive approach to cybersecurity. My experience spans network migrations, wireless surveys, infrastructure optimization, and DevOps workflow integration across leading organizations in Nepal.',
  'I am passionate about building resilient infrastructures and mitigating cyber threats, backed by hands-on security operations work. With certifications like Ruijie Engineer (Senior & Junior) and Oracle Cloud Foundations Associate, I continuously upskill to stay aligned with evolving industry standards.',
]

const HomePage = () => {
  return (
    <section className="page">
      <motion.div
        className="hero-grid"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="hero-copy">
          <p className="eyebrow">Hello, I’m {heroContent.name}</p>
          <h1>{heroContent.title}</h1>
          <p className="lede">{heroContent.summary}</p>
          <div className="hero-cta">
            <Link className="btn primary" to={heroContent.primaryCta.href}>
              {heroContent.primaryCta.label}
            </Link>
            <Link className="btn ghost" to={heroContent.secondaryCta.href}>
              {heroContent.secondaryCta.label}
            </Link>
          </div>
          <p className="availability">{heroContent.availability}</p>
        </div>

        <motion.div
          className="hero-photo-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <img src={sachinPhoto} alt="Portrait of Sachin Singh Chaudhary" />
          <p>Network & Systems Engineer · Junior DevOps Engineer</p>
        </motion.div>

        <motion.div
          className="hero-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
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
            <p>Focused on resilient infrastructure, DevOps automation, and SOC readiness.</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.section
        className="hero-narrative"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Why I build</h2>
        {heroNarrative.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </motion.section>

      <motion.div
        className="quick-links"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {[
          { title: 'About', description: 'Mindset, certifications, and passions', to: '/about' },
          { title: 'Experience', description: 'DevOps, SOC, and network leadership', to: '/experience' },
          { title: 'Projects', description: 'Automation and monitoring labs', to: '/projects' },
        ].map((card) => (
          <Link key={card.to} to={card.to} className="quick-card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <span>Explore →</span>
          </Link>
        ))}
      </motion.div>

      <motion.section
        className="preview-section"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-heading">
          <p className="eyebrow">Selected builds</p>
          <h2>Recent projects that ship delight with rigor</h2>
        </div>
        <div className="project-grid">
          {projectShowcase.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-card-head">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <p className="project-highlight">{project.highlight}</p>
              <div className="tag-row">
                {project.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer">
                  View case study →
                </a>
              )}
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="preview-section"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="section-heading">
          <p className="eyebrow">Skills stack</p>
          <h2>Blending design systems, data, and collaborative leadership.</h2>
        </div>
        <div className="skill-grid">
          {skillMatrix.slice(0, 3).map((category) => (
            <article key={category.title} className="skill-card">
              <h3>{category.title}</h3>
              <ul>
                {category.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </motion.section>
    </section>
  )
}

export default HomePage

