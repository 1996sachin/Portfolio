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
  const isSubPage = eyebrow !== 'Portfolio' && eyebrow !== 'Home'

  useEffect(() => {
    if (eyebrow && eyebrow !== 'Portfolio' && eyebrow !== 'Home') {
      document.title = `${eyebrow} | Sachin Singh · DevOps & Security Engineer`
    } else {
      document.title = 'Sachin Singh · DevOps & Security Engineer'
    }
  }, [eyebrow])

  return (
    <MotionSection
      className="page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="page-header">
        {isSubPage && (
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-home">
              <span className="breadcrumb-arrow">←</span>
              <span>Home</span>
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{eyebrow}</span>
          </nav>
        )}

        <div className="page-title-block">
          <p className="page-eyebrow-badge">{eyebrow}</p>
          <h1 className="page-heading">{title}</h1>
          {description && <p className="page-lede">{description}</p>}
        </div>
      </div>
      {children}
    </MotionSection>
  )
}

export default PageWrapper
