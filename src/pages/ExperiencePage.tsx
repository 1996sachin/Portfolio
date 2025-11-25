import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { experienceTimeline } from '../data/content'

const ExperiencePage = () => {
  return (
    <PageWrapper
      eyebrow="Experience"
      title="Impact-Driven"
      description="Transforming infrastructure through automation and reliability.
From Dockerized cloud applications to multi-vendor network deployments, I build systems that reduce downtime, improve visibility, and streamline operations."
    >
      <motion.div
        className="timeline"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {experienceTimeline.map((entry) => (
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

export default ExperiencePage

