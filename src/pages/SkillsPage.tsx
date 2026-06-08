import { motion } from 'framer-motion'
import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { usePortfolioContent } from '../context/ContentContext'
import TiltCard from '../components/TiltCard'
import DetailModal from '../components/DetailModal'
import type { SkillCategory } from '../data/content'

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
    transition: { type: 'spring', stiffness: 80, damping: 15 },
  },
} as const

const SkillsPage = () => {
  const {
    content: { skillMatrix },
  } = usePortfolioContent()
  const [selectedSkill, setSelectedSkill] = useState<SkillCategory | null>(null)

  return (
    <PageWrapper
      eyebrow="Skills"
      title="Network, security, and automation skills that scale."
      description="I combine hands-on NetOps expertise with DevOps tooling, SOC analysis, and documentation-driven delivery. Click on any skill category to see the complete list in detail."
    >
      <motion.div
        className="skill-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skillMatrix.map((category) => (
          <motion.div key={category.title} variants={itemVariants}>
            <div
              onClick={() => setSelectedSkill(category)}
              style={{ cursor: 'pointer', height: '100%' }}
            >
              <TiltCard className="skill-card" intensity={6}>
                <h3 style={{ margin: '0 0 1rem 0', fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.25rem' }}>
                  {category.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-muted)' }}>
                  {category.skills.slice(0, 2).map((skill) => (
                    <li key={skill} style={{ fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      • {skill}
                    </li>
                  ))}
                  {category.skills.length > 2 && (
                    <li style={{ fontSize: '0.82rem', color: 'var(--accent-secondary)', fontWeight: 500, marginTop: '0.3rem' }}>
                      + {category.skills.length - 2} more skills...
                    </li>
                  )}
                </ul>
              </TiltCard>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Skill Category Details Modal */}
      <DetailModal
        isOpen={selectedSkill !== null}
        onClose={() => setSelectedSkill(null)}
        title={selectedSkill?.title ?? ''}
        subtitle="Technology Stack & Expertise"
      >
        {selectedSkill && (
          <div>
            <h4 style={{ margin: '0 0 0.8rem 0', color: '#fff', fontSize: '1.1rem' }}>Technologies &amp; Skills</h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {selectedSkill.skills.map((skill) => (
                <li
                  key={skill}
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.95rem',
                    lineHeight: 1.55,
                    position: 'relative',
                    listStyleType: 'none',
                    paddingLeft: '0.5rem',
                  }}
                >
                  <span style={{ position: 'absolute', left: '-1.2rem', color: 'var(--accent-secondary)' }}>✓</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </DetailModal>
    </PageWrapper>
  )
}

export default SkillsPage
