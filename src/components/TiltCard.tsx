import { useState, type ReactNode, type MouseEvent } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  intensity?: number
}

const TiltCard = ({ children, className = '' }: TiltCardProps) => {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setSpotlight({
      x,
      y,
      opacity: 1,
    })
  }

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle modern cursor spotlight on border/card surface */}
      <div
        className="card-spotlight-layer"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(99, 102, 241, 0.12), transparent 70%)`,
        }}
      />
      <div className="card-content-relative">{children}</div>
    </div>
  )
}

export default TiltCard
