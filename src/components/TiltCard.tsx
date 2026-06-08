import { useState, type ReactNode, type MouseEvent } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  intensity?: number
}

const TiltCard = ({ children, className = '', intensity = 10 }: TiltCardProps) => {
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    glareX: 50,
    glareY: 50,
    showGlare: false,
  })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    
    // Mouse coordinates relative to card width/height (0 to 1)
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    // Tilt calculations (-0.5 to 0.5 multiplied by intensity)
    const rotateX = (0.5 - y) * intensity
    const rotateY = (x - 0.5) * intensity
    
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      glareX: x * 100,
      glareY: y * 100,
      showGlare: true,
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      glareX: 50,
      glareY: 50,
      showGlare: false,
    })
  }

  return (
    <div
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: style.transform,
        transition: style.showGlare ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glare effect overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          background: `radial-gradient(circle at ${style.glareX}% ${style.glareY}%, rgba(140, 123, 255, 0.15) 0%, transparent 60%)`,
          opacity: style.showGlare ? 1 : 0,
          transition: 'opacity 0.4s ease',
          zIndex: 2,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
    </div>
  )
}

export default TiltCard
