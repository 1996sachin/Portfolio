import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { skillMatrix } from '../data/content'

const SkillsPage = () => {
  return (
    <PageWrapper
      eyebrow="Skills"
      title="Network, security, and automation skills that scale."
      description="I combine hands-on NetOps expertise with DevOps tooling, SOC analysis, and documentation-driven delivery."
    >
      <motion.div
        className="skill-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {skillMatrix.map((category) => (
          <article key={category.title} className="skill-card">
            <h3>{category.title}</h3>
            <ul>
              {category.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        ))}
      </motion.div>
    </PageWrapper>
  )
}

export default SkillsPage

