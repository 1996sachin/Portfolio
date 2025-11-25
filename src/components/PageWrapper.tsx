import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  title: string
  eyebrow?: string
  description?: string
  children: ReactNode
}

const MotionSection = motion.section

const PageWrapper = ({ title, eyebrow = 'Portfolio', description, children }: Props) => {
  return (
    <MotionSection
      className="page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="page-header">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="lede">{description}</p>}
      </div>
      {children}
    </MotionSection>
  )
}

export default PageWrapper

