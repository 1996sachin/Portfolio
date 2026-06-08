import { motion } from 'framer-motion'
import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { usePortfolioContent } from '../context/ContentContext'
import TiltCard from '../components/TiltCard'
import DetailModal from '../components/DetailModal'
import type { Project } from '../data/content'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

const ProjectsPage = () => {
  const {
    content: { projectShowcase },
  } = usePortfolioContent()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <PageWrapper
      eyebrow="Projects"
      title="Case studies that show how reliable infrastructure comes from thoughtful automation."
      description="Every project combines planning, configuration, validation, and continuous monitoring to create dependable systems. Click on any project card to view its full case details."
    >
      <motion.div
        className="project-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projectShowcase.map((project, idx) => (
          <motion.div key={project.title} variants={itemVariants}>
            <div
              onClick={() => setSelectedProject(project)}
              style={{ cursor: 'pointer', height: '100%' }}
            >
              <TiltCard className="project-card" intensity={6}>
                <div className="project-card-header">
                  <span className="project-num">0{idx + 1}</span>
                  <h3>{project.title}</h3>
                </div>
                <p className="project-desc" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {project.description}
                </p>
                
                {project.highlight && (
                  <div className="project-highlight-box" style={{ marginTop: '0.5rem' }}>
                    <strong>Key Impact:</strong> {project.highlight}
                  </div>
                )}
                
                <div className="tag-row" style={{ marginTop: 'auto', paddingTop: '1.2rem' }}>
                  {project.stack.slice(0, 3).map((tag) => (
                    <span key={tag} className="tech-badge">{tag}</span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="tech-badge">+{project.stack.length - 3} more</span>
                  )}
                </div>
                <span className="project-arrow-icon" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>↗</span>
              </TiltCard>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Project details popout modal */}
      <DetailModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title ?? ''}
        subtitle="Project Case Study"
      >
        {selectedProject && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#fff', fontSize: '1.1rem' }}>Description</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {selectedProject.description}
              </p>
            </div>

            {selectedProject.highlight && (
              <div
                style={{
                  background: 'rgba(53, 219, 192, 0.04)',
                  borderLeft: '4px solid var(--accent-secondary)',
                  padding: '1rem',
                  borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                }}
              >
                <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--accent-secondary)', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Impact &amp; Value</h4>
                <p style={{ margin: 0, color: '#fff', fontSize: '0.95rem', fontWeight: 500 }}>
                  {selectedProject.highlight}
                </p>
              </div>
            )}

            <div>
              <h4 style={{ margin: '0 0 0.75rem 0', color: '#fff', fontSize: '1.1rem' }}>Technology Stack</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedProject.stack.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '999px',
                      padding: '0.3rem 1rem',
                      fontSize: '0.8rem',
                      fontFamily: 'monospace',
                      color: 'var(--accent-secondary)',
                      background: 'rgba(53, 219, 192, 0.03)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {selectedProject.link && (
              <div style={{ marginTop: '0.5rem', display: 'flex' }}>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn primary animate-btn"
                  style={{ width: '100%' }}
                >
                  Launch Live Project ↗
                </a>
              </div>
            )}
          </div>
        )}
      </DetailModal>
    </PageWrapper>
  )
}

export default ProjectsPage
