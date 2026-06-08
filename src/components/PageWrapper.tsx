import { motion } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  title: string
  eyebrow?: string
  description?: string
  children: ReactNode
}

const MotionSection = motion.section

const PageWrapper = ({ title, eyebrow = 'Portfolio', description, children }: Props) => {
  const showClose = eyebrow !== 'Portfolio' && eyebrow !== 'Home'

  useEffect(() => {
    if (eyebrow && eyebrow !== 'Portfolio') {
      document.title = `${eyebrow} | Sachin Singh - DevOps & Security Engineer`
    } else {
      document.title = 'Sachin Singh | DevOps & Security Engineer'
    }
  }, [eyebrow])

  return (
    <MotionSection
      className="page"
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="page-header">
        <div className="page-header-meta">
          <p className="eyebrow">{eyebrow}</p>
          {showClose && (
            <Link to="/" className="page-close-btn" title="Back to 3D Map">
              ✕ Close
            </Link>
          )}
        </div>
        <h1>{title}</h1>
        {description && <p className="lede">{description}</p>}
      </div>
      {children}
    </MotionSection>
  )
}

export default PageWrapper

