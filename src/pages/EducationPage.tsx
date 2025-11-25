import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { educationTimeline } from '../data/content'

const EducationPage = () => {
  return (
    <PageWrapper
      eyebrow="Education"
      title="Learning that keeps curiosity alive."
      description="Blending human-centered computing, design systems, and continuous residencies to sharpen both craft and leadership."
    >
      <motion.div
        className="timeline"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {educationTimeline.map((entry) => (
          <article key={entry.title} className="timeline-card">
            <div>
              <p className="eyebrow">{entry.period}</p>
              <h3>{entry.title}</h3>
              <p className="place">{entry.place}</p>
              {entry.description && <p>{entry.description}</p>}
            </div>
            {entry.highlights.length > 0 && (
              <ul>
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </motion.div>
    </PageWrapper>
  )
}

export default EducationPage

