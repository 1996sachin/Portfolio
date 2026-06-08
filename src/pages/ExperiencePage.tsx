import { motion } from 'framer-motion'
import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { usePortfolioContent } from '../context/ContentContext'
import TiltCard from '../components/TiltCard'
import DetailModal from '../components/DetailModal'
import type { TimelineItem } from '../data/content'

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

const ExperiencePage = () => {
  const {
    content: { experienceTimeline },
  } = usePortfolioContent()
  const [selectedExperience, setSelectedExperience] = useState<TimelineItem | null>(null)

  return (
    <PageWrapper
      eyebrow="Experience"
      title="Impact-Driven Careers"
      description="Transforming infrastructure through automation and reliability. Click on any work experience card to pop out its detailed list of achievements and network designs."
    >
      <motion.div
        className="timeline"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {experienceTimeline.map((entry) => (
          <motion.div key={entry.title} variants={itemVariants}>
            <div
              onClick={() => setSelectedExperience(entry)}
              style={{ cursor: 'pointer', height: '100%' }}
            >
              <TiltCard className="timeline-card" intensity={3}>
                <div>
                  <p className="eyebrow">{entry.period}</p>
                  <h3 style={{ margin: '0.4rem 0 0.2rem 0', fontSize: '1.25rem' }}>{entry.title}</h3>
                  <p className="place" style={{ margin: '0 0 0.8rem 0', fontSize: '0.9rem', color: 'var(--accent-secondary)' }}>
                    {entry.place}
                  </p>
                  {entry.description && (
                    <p style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      {entry.description}
                    </p>
                  )}
                </div>
                
                {entry.highlights.length > 0 && (
                  <ul style={{ margin: '1rem 0 0 0', paddingLeft: '1rem', fontSize: '0.85rem' }}>
                    {entry.highlights.slice(0, 2).map((highlight) => (
                      <li key={highlight} style={{ marginBottom: '0.4rem' }}>{highlight}</li>
                    ))}
                    {entry.highlights.length > 2 && (
                      <li style={{ listStyle: 'none', color: 'var(--accent-secondary)', fontWeight: 500, marginTop: '0.3rem' }}>
                        + {entry.highlights.length - 2} more details...
                      </li>
                    )}
                  </ul>
                )}
              </TiltCard>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Experience Details Modal */}
      <DetailModal
        isOpen={selectedExperience !== null}
        onClose={() => setSelectedExperience(null)}
        title={selectedExperience?.title ?? ''}
        subtitle={`${selectedExperience?.place} · ${selectedExperience?.period}`}
      >
        {selectedExperience && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {selectedExperience.description && (
              <div>
                <h4 style={{ margin: '0 0 0.4rem 0', color: '#fff', fontSize: '1.1rem' }}>Role Description</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {selectedExperience.description}
                </p>
              </div>
            )}

            {selectedExperience.highlights.length > 0 && (
              <div>
                <h4 style={{ margin: '0 0 0.75rem 0', color: '#fff', fontSize: '1.1rem' }}>Key Contributions &amp; Achievements</h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {selectedExperience.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.92rem',
                        lineHeight: 1.5,
                        position: 'relative',
                        listStyleType: 'none',
                        paddingLeft: '0.5rem',
                      }}
                    >
                      <span style={{ position: 'absolute', left: '-1.2rem', color: 'var(--accent-secondary)' }}>→</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </DetailModal>
    </PageWrapper>
  )
}

export default ExperiencePage
