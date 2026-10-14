import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioContent } from '../context/ContentContext'

interface CommandItem {
  id: string
  title: string
  subtitle: string
  category: 'Navigation' | 'Actions' | 'External'
  icon: string
  action: () => void
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { content: { heroContent } } = usePortfolioContent()
  const resumeHref = heroContent.cvDownload.href || '/Sachin_Singh_Resume_2026.pdf'

  const commands: CommandItem[] = [
    {
      id: 'resume',
      title: 'Download Resume (PDF)',
      subtitle: resumeHref.replace(/^\//, ''),
      category: 'Actions',
      icon: '📄',
      action: () => {
        const link = document.createElement('a')
        link.href = resumeHref
        link.download = 'Sachin-Singh-Resume.pdf'
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        onClose()
      },
    },
    {
      id: 'copy-email',
      title: 'Copy Email Address',
      subtitle: 'punksoul2580@gmail.com',
      category: 'Actions',
      icon: '✉️',
      action: () => {
        navigator.clipboard.writeText('punksoul2580@gmail.com')
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
          onClose()
        }, 800)
      },
    },
    {
      id: 'nav-home',
      title: 'Go to Home',
      subtitle: 'Overview, interactive architecture console & metrics',
      category: 'Navigation',
      icon: '🏠',
      action: () => {
        navigate('/')
        onClose()
      },
    },
    {
      id: 'nav-experience',
      title: 'Go to Experience',
      subtitle: 'DevOps, System Engineer & Information Security roles',
      category: 'Navigation',
      icon: '💼',
      action: () => {
        navigate('/experience')
        onClose()
      },
    },
    {
      id: 'nav-projects',
      title: 'Go to Projects',
      subtitle: 'Infrastructure automation, CI/CD labs & cloud configs',
      category: 'Navigation',
      icon: '🚀',
      action: () => {
        navigate('/projects')
        onClose()
      },
    },
    {
      id: 'nav-skills',
      title: 'Go to Tech Stack',
      subtitle: 'AWS, Fortinet, Linux, CI/CD & Security competencies',
      category: 'Navigation',
      icon: '⚡',
      action: () => {
        navigate('/skills')
        onClose()
      },
    },
    {
      id: 'nav-education',
      title: 'Go to Credentials & Education',
      subtitle: 'ISO 27001, Ruijie, Oracle Cloud & academic background',
      category: 'Navigation',
      icon: '🎓',
      action: () => {
        navigate('/education')
        onClose()
      },
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact',
      subtitle: 'Get in touch for DevOps & Security opportunities',
      category: 'Navigation',
      icon: '📬',
      action: () => {
        navigate('/contact')
        onClose()
      },
    },
    {
      id: 'ext-linkedin',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/sachin-singh-devops',
      category: 'External',
      icon: '↗',
      action: () => {
        window.open('https://linkedin.com/in/sachin-singh-devops', '_blank', 'noopener,noreferrer')
        onClose()
      },
    },
    {
      id: 'ext-github',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/punksoul2580',
      category: 'External',
      icon: '↗',
      action: () => {
        window.open('https://github.com/punksoul2580', '_blank', 'noopener,noreferrer')
        onClose()
      },
    },
  ]

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          // Trigger open via parent listener or global event
          const evt = new CustomEvent('open-command-palette')
          window.dispatchEvent(evt)
        }
      }

      if (!isOpen) return

      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filtered, selectedIndex, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="cmd-backdrop" onClick={onClose} role="dialog" aria-modal="true">
          <motion.div
            className="cmd-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <div className="cmd-search-bar">
              <span className="cmd-search-icon">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                placeholder="Type a command or search... (e.g. resume, experience, email)"
                className="cmd-input"
              />
              <span className="cmd-esc-badge" onClick={onClose}>ESC</span>
            </div>

            {copied && (
              <div className="cmd-toast">
                ✓ Copied punksoul2580@gmail.com to clipboard!
              </div>
            )}

            <div className="cmd-list">
              {filtered.length === 0 ? (
                <div className="cmd-empty">No commands matching "{query}"</div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex
                  return (
                    <div
                      key={item.id}
                      className={`cmd-item ${isSelected ? 'selected' : ''}`}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={item.action}
                    >
                      <span className="cmd-item-icon">{item.icon}</span>
                      <div className="cmd-item-info">
                        <span className="cmd-item-title">{item.title}</span>
                        <span className="cmd-item-sub">{item.subtitle}</span>
                      </div>
                      <span className="cmd-item-cat">{item.category}</span>
                    </div>
                  )
                })
              )}
            </div>

            <div className="cmd-footer">
              <div className="cmd-shortcuts">
                <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
                <span><kbd>↵</kbd> to select</span>
                <span><kbd>esc</kbd> to close</span>
              </div>
              <span className="cmd-branding">Sachin Singh · Systems Console</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
