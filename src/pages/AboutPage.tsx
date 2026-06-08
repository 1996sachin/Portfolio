import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { usePortfolioContent } from '../context/ContentContext'
import TiltCard from '../components/TiltCard'

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

const AboutPage = () => {
  const {
    content: { aboutHighlights, narrative },
  } = usePortfolioContent()

  return (
    <PageWrapper
      title="I blend DevOps practices, infrastructure automation, and secure system design."
      description={narrative.intro}
      eyebrow="About"
    >
      <motion.section
        className="about-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <TiltCard className="about-card" intensity={5}>
            <p className="eyebrow">Guiding beliefs</p>
            <ul>
              {aboutHighlights.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <p>{item.value}</p>
                </li>
              ))}
            </ul>
          </TiltCard>
        </motion.div>

        <motion.div className="about-pillars" variants={itemVariants}>
          {narrative.pillars.map((pillar, idx) => (
            <TiltCard key={pillar.title} className="about-pillar-card" intensity={7}>
              <article>
                <h3>
                  <span className="pillar-num">0{idx + 1}</span> {pillar.title}
                </h3>
                <p>{pillar.detail}</p>
              </article>
            </TiltCard>
          ))}
        </motion.div>
      </motion.section>
    </PageWrapper>
  )
}

export default AboutPage
