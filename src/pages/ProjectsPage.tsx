import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { projectShowcase } from '../data/content'

const ProjectsPage = () => {
  return (
    <PageWrapper
      eyebrow="Projects"
      title="Case studies that show how reliable infrastructure comes from thoughtful automation and multi-vendor expertise."
      description="Every project combines planning, configuration, validation, and continuous monitoring to create dependable systems."
    >
      <motion.div
        className="project-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {projectShowcase.map((project) => (
          <article key={project.title} className="project-card">
            <div className="project-card-head">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <p className="project-highlight">{project.highlight}</p>
            <div className="tag-row">
              {project.stack.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer">
                Read the case study →
              </a>
            )}
          </article>
        ))}
      </motion.div>
    </PageWrapper>
  )
}

export default ProjectsPage

