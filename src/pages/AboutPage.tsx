import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { aboutHighlights, narrative } from '../data/content'

const AboutPage = () => {
  return (
    <PageWrapper
      title="I blend DevOps practices, infrastructure automation, and secure system design."
      description={narrative.intro}
      eyebrow="About"
    >
      <motion.section
        className="about-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="about-card">
          <p className="eyebrow">Guiding beliefs</p>
          <ul>
            {aboutHighlights.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <p>{item.value}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="about-pillars">
          {narrative.pillars.map((pillar) => (
            <article key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.detail}</p>
            </article>
          ))}
        </div>
      </motion.section>
    </PageWrapper>
  )
}

export default AboutPage

