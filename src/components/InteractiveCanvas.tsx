import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  radius: number
  color: string
  pulseIndex: number
}

interface Connection {
  p1: Particle
  p2: Particle
  dist3D: number
}

const InteractiveCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Setup particles representing network nodes
    const particleCount = Math.min(60, Math.floor((width * height) / 25000))
    const particles: Particle[] = []
    const colors = [
      'rgba(124, 58, 237, 0.7)', // Purple (Accent primary)
      'rgba(6, 182, 212, 0.7)',  // Cyan (Accent secondary)
      'rgba(16, 185, 129, 0.6)', // Green (Cyber secure status)
    ]

    const rangeX = 350
    const rangeY = 250
    const rangeZ = 200

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * rangeX * 2,
        y: (Math.random() - 0.5) * rangeY * 2,
        z: (Math.random() - 0.5) * rangeZ * 2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1.5,
        color: colors[i % colors.length],
        pulseIndex: Math.random(),
      })
    }

    // Capture mouse coordinate changes relative to center of screen
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX - width / 2
      mouseRef.current.targetY = e.clientY - height / 2
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    let angleX = 0
    let angleY = 0

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Mouse interpolation for smooth lag/parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

      // Base auto-rotation + mouse tilt rotation
      angleY = 0.001 * 0.6 + (mouseRef.current.x / width) * 0.4
      angleX = 0.0005 * 0.6 + (mouseRef.current.y / height) * 0.4

      // Sin and Cos calculations for rotations
      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)
      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)

      const fov = 420
      const cameraDistance = 350

      // Store projected particles
      const projected: {
        x: number
        y: number
        scale: number
        alpha: number
        p: Particle
      }[] = []

      // 1. Update positions & project to 2D
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Smooth boundaries rebound in 3D
        p.x += p.vx
        p.y += p.vy
        p.z += p.vz

        if (Math.abs(p.x) > rangeX) p.vx *= -1
        if (Math.abs(p.y) > rangeY) p.vy *= -1
        if (Math.abs(p.z) > rangeZ) p.vz *= -1

        // Rotate Y-axis
        const x1 = p.x * cosY - p.z * sinY
        const z1 = p.x * sinY + p.z * cosY

        // Rotate X-axis
        const y2 = p.y * cosX - z1 * sinX
        const z2 = p.y * sinX + z1 * cosX

        // Perspective projection formula
        const scale = fov / (cameraDistance + z2)
        const screenX = x1 * scale + width / 2
        const screenY = y2 * scale + height / 2

        // Alpha based on depth
        const alpha = Math.max(0.1, Math.min(1.0, (z2 + rangeZ) / (rangeZ * 2)))

        p.pulseIndex += 0.004
        if (p.pulseIndex > 1) p.pulseIndex = 0

        projected.push({
          x: screenX,
          y: screenY,
          scale,
          alpha,
          p,
        })
      }

      // Sort by scale (depth) to draw background nodes first
      projected.sort((a, b) => a.scale - b.scale)

      // 2. Draw connections (Network grid links)
      const maxDistance = 140
      const connections: Connection[] = []

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i]
          const b = projected[j]

          // 3D Distance check
          const dx = a.p.x - b.p.x
          const dy = a.p.y - b.p.y
          const dz = a.p.z - b.p.z
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist3D < maxDistance) {
            connections.push({ p1: a.p, p2: b.p, dist3D })

            // Compute line opacity based on depth and distance
            const proximity = 1 - dist3D / maxDistance
            const minAlpha = Math.min(a.alpha, b.alpha)
            const opacity = proximity * minAlpha * 0.15

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(140, 123, 255, ${opacity})`
            ctx.lineWidth = 0.8 * a.scale
            ctx.stroke()
          }
        }
      }

      // 3. Draw animated packets (simulating NetOps network pulses)
      for (const conn of connections) {
        const p1Proj = projected.find((pr) => pr.p === conn.p1)
        const p2Proj = projected.find((pr) => pr.p === conn.p2)
        if (!p1Proj || !p2Proj) continue

        // Pulse position along connection path
        const pulseRatio = (conn.p1.pulseIndex + conn.p2.pulseIndex) % 1
        const packetX = p1Proj.x + (p2Proj.x - p1Proj.x) * pulseRatio
        const packetY = p1Proj.y + (p2Proj.y - p1Proj.y) * pulseRatio

        const packetScale = (p1Proj.scale + p2Proj.scale) / 2
        const packetAlpha = (p1Proj.alpha + p2Proj.alpha) / 2 * (1 - conn.dist3D / maxDistance)

        // Draw small glowing pulse
        ctx.beginPath()
        ctx.arc(packetX, packetY, 1.8 * packetScale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${packetAlpha * 0.9})`
        ctx.shadowBlur = 8 * packetScale
        ctx.shadowColor = 'rgba(6, 182, 212, 0.8)'
        ctx.fill()
        ctx.shadowBlur = 0 // Reset shadow
      }

      // 4. Draw node points
      for (const item of projected) {
        ctx.beginPath()
        ctx.arc(item.x, item.y, item.p.radius * item.scale, 0, Math.PI * 2)
        
        // Glow effect for larger nodes
        if (item.p.radius > 3) {
          ctx.shadowBlur = 10 * item.scale
          ctx.shadowColor = item.p.color
        }
        
        ctx.fillStyle = item.p.color.replace('0.7', `${item.alpha * 0.8}`)
        ctx.fill()
        ctx.shadowBlur = 0 // Reset
      }

      // 5. Ambient Mouse Glow (Sleek light following behind the content)
      const absMouseX = mouseRef.current.x + width / 2
      const absMouseY = mouseRef.current.y + height / 2
      const gradient = ctx.createRadialGradient(
        absMouseX,
        absMouseY,
        10,
        absMouseX,
        absMouseY,
        width * 0.4
      )
      gradient.addColorStop(0, 'rgba(124, 58, 237, 0.04)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  )
}

export default InteractiveCanvas
