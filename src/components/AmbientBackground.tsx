import { useEffect, useState } from 'react'

const AmbientBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Gentle dampening for ambient glow
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="ambient-background" aria-hidden="true">
      {/* Blueprint Architecture Grid */}
      <div className="ambient-grid" />

      {/* Subtle Radial Mesh Accents */}
      <div className="ambient-glow ambient-glow-primary" />
      <div className="ambient-glow ambient-glow-secondary" />

      {/* Soft Interactive Spotlight Following Cursor (Passive) */}
      {mousePos.x > 0 && (
        <div
          className="ambient-spotlight"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
        />
      )}
    </div>
  )
}

export default AmbientBackground
