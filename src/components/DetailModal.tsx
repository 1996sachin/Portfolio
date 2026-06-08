import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'

interface DetailModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
}

const DetailModal = ({ isOpen, onClose, title, subtitle, children }: DetailModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            pointerEvents: 'auto',
          }}
        >
          {/* Backdrop Dimmer Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(3, 5, 8, 0.75)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '640px',
              maxHeight: '85vh',
              background: 'rgba(10, 12, 22, 0.92)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-lg, 24px)',
              padding: '2.5rem',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              zIndex: 1001,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: '#fff',
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              className="modal-close-hover"
            >
              ✕
            </button>

            {/* Header */}
            <div>
              {subtitle && (
                <p
                  style={{
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    fontSize: '0.75rem',
                    color: 'var(--accent-secondary, #35dbc0)',
                    margin: '0 0 0.4rem 0',
                    fontWeight: 600,
                  }}
                >
                  {subtitle}
                </p>
              )}
              <h2
                style={{
                  margin: 0,
                  fontFamily: "'Syne', 'Space Grotesk', sans-serif",
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.25,
                }}
              >
                {title}
              </h2>
            </div>

            {/* Main content body */}
            <div style={{ color: 'var(--text-muted, #f4f5f7)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default DetailModal
