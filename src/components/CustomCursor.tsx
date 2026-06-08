import { useEffect, useState } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsHidden(false)
    }

    const handleMouseLeave = () => {
      setIsHidden(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.tilt-card') ||
        target.closest('.project-item') ||
        target.closest('.hud-badge') ||
        target.closest('.quick-card-link')

      setIsHovered(!!isInteractive)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  // Animate the ring position (lagging physics lerp)
  useEffect(() => {
    let animFrame: number

    const updateRing = () => {
      setRingPosition((prev) => {
        const dx = position.x - prev.x
        const dy = position.y - prev.y
        return {
          x: prev.x + dx * 0.16,
          y: prev.y + dy * 0.16,
        }
      })
      animFrame = requestAnimationFrame(updateRing)
    }

    updateRing()

    return () => cancelAnimationFrame(animFrame)
  }, [position])

  if (isHidden) return null

  return (
    <>
      {/* Inner Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: isHovered ? '#fff' : 'var(--accent-secondary)',
          borderRadius: '50%',
          transform: `translate(${position.x - 3}px, ${position.y - 3}px)`,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'background-color 0.2s ease',
        }}
      />
      {/* Outer Ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          border: `1.5px solid ${isHovered ? 'var(--accent-secondary)' : 'rgba(255, 255, 255, 0.4)'}`,
          borderRadius: '50%',
          transform: `translate(${ringPosition.x - (isHovered ? 24 : 14)}px, ${ringPosition.y - (isHovered ? 24 : 14)}px)`,
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, background-color 0.2s',
          backgroundColor: isHovered ? 'rgba(53, 219, 192, 0.08)' : 'rgba(255, 255, 255, 0)',
          boxShadow: isHovered ? '0 0 12px rgba(53, 219, 192, 0.2)' : 'none',
        }}
      />
    </>
  )
}

export default CustomCursor
