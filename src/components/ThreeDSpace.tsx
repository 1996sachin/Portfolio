import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as THREE from 'three'

interface SectionNode {
  name: string
  route: string
  label: string
  position: THREE.Vector3
  cameraPos: THREE.Vector3
  lookAt: THREE.Vector3
  color: number
  mesh?: THREE.Group
}

const ThreeDSpace = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mountRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Track projected screen positions for floating HUD labels
  const [hudLabels, setHudLabels] = useState<{ name: string; label: string; route: string; x: number; y: number }[]>([])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Map route names to 3D coordinate targets
  const getNodes = (isMobile: boolean): SectionNode[] => {
    // Compress layout on mobile screens
    const spreadX = isMobile ? 3.2 : 5.2
    const spreadY = isMobile ? 2.5 : 3.8

    return [
      {
        name: 'about',
        route: '/about',
        label: 'About Me',
        position: new THREE.Vector3(-spreadX, spreadY * 0.6, 0),
        cameraPos: new THREE.Vector3(-spreadX, spreadY * 0.6, 3.8),
        lookAt: new THREE.Vector3(-spreadX, spreadY * 0.6, 0),
        color: 0x8c7bff,
      },
      {
        name: 'projects',
        route: '/projects',
        label: 'Build Showcase',
        position: new THREE.Vector3(spreadX, spreadY * 0.6, 0),
        cameraPos: new THREE.Vector3(spreadX, spreadY * 0.6, 3.8),
        lookAt: new THREE.Vector3(spreadX, spreadY * 0.6, 0),
        color: 0x35dbc0,
      },
      {
        name: 'experience',
        route: '/experience',
        label: 'Work Experience',
        position: new THREE.Vector3(-spreadX * 0.8, -spreadY * 0.7, 0),
        cameraPos: new THREE.Vector3(-spreadX * 0.8, -spreadY * 0.7, 3.8),
        lookAt: new THREE.Vector3(-spreadX * 0.8, -spreadY * 0.7, 0),
        color: 0x8c7bff,
      },
      {
        name: 'skills',
        route: '/skills',
        label: 'Tech Stack',
        position: new THREE.Vector3(spreadX * 0.8, -spreadY * 0.7, 0),
        cameraPos: new THREE.Vector3(spreadX * 0.8, -spreadY * 0.7, 3.8),
        lookAt: new THREE.Vector3(spreadX * 0.8, -spreadY * 0.7, 0),
        color: 0x35dbc0,
      },
      {
        name: 'education',
        route: '/education',
        label: 'Academic Info',
        position: new THREE.Vector3(-spreadX * 0.2, -spreadY * 1.1, 0),
        cameraPos: new THREE.Vector3(-spreadX * 0.2, -spreadY * 1.1, 3.8),
        lookAt: new THREE.Vector3(-spreadX * 0.2, -spreadY * 1.1, 0),
        color: 0x8c7bff,
      },
      {
        name: 'contact',
        route: '/contact',
        label: 'Contact',
        position: new THREE.Vector3(spreadX * 0.2, spreadY * 1.1, 0),
        cameraPos: new THREE.Vector3(spreadX * 0.2, spreadY * 1.1, 3.8),
        lookAt: new THREE.Vector3(spreadX * 0.2, spreadY * 1.1, 0),
        color: 0x35dbc0,
      },
    ]
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const mount = mountRef.current
    if (!canvas || !mount) return

    let width = window.innerWidth
    let height = window.innerHeight
    let isMobile = width < 768

    // Initialize Three.js WebGL structures
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x030508, 0.015)

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    
    // Set initial camera position far away for home state zoom-in
    const defaultCameraPos = new THREE.Vector3(0, 0, isMobile ? 15 : 12)
    const defaultLookAt = new THREE.Vector3(0, 0, 0)
    
    camera.position.copy(defaultCameraPos)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    const mainLight = new THREE.PointLight(0x8c7bff, 1.5, 30)
    mainLight.position.set(0, 4, 5)
    scene.add(mainLight)

    const secondaryLight = new THREE.PointLight(0x35dbc0, 1.2, 30)
    secondaryLight.position.set(0, -4, 5)
    scene.add(secondaryLight)

    // Group to hold all interactive section nodes
    const nodesGroup = new THREE.Group()
    scene.add(nodesGroup)

    const nodes = getNodes(isMobile)
    const nodeMeshes: THREE.Object3D[] = []

    // 1. Create Core Globe (Home Anchor)
    const coreGroup = new THREE.Group()
    const coreGeom = new THREE.SphereGeometry(1.4, 24, 24)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x8c7bff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    })
    const coreMesh = new THREE.Mesh(coreGeom, coreMat)
    
    const coreInner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.8, 1),
      new THREE.MeshPhongMaterial({ color: 0x1e1b4b, emissive: 0x0f172a, shininess: 30 })
    )

    const ringGeom = new THREE.TorusGeometry(1.8, 0.03, 8, 64)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x35dbc0, transparent: true, opacity: 0.35 })
    const outerRing = new THREE.Mesh(ringGeom, ringMat)
    outerRing.rotation.x = Math.PI / 2

    coreGroup.add(coreMesh, coreInner, outerRing)
    scene.add(coreGroup)

    // 2. Instantiate 3D Geometry for Section Nodes
    nodes.forEach((node) => {
      const nodeGroup = new THREE.Group()
      nodeGroup.position.copy(node.position)
      nodeGroup.name = node.name

      let visualMesh: THREE.Object3D

      // Custom geometric signifier for each node page
      if (node.name === 'about') {
        // Octahedron shell
        const geom = new THREE.OctahedronGeometry(0.65, 0)
        const mat = new THREE.MeshPhongMaterial({
          color: 0x8c7bff,
          emissive: 0x2e1854,
          shininess: 100,
          flatShading: true,
        })
        const mesh = new THREE.Mesh(geom, mat)

        const shell = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.85, 0),
          new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.12 })
        )
        nodeGroup.add(mesh, shell)
        visualMesh = mesh
      } else if (node.name === 'projects') {
        // Orbiting core node
        const geom = new THREE.IcosahedronGeometry(0.55, 0)
        const mat = new THREE.MeshPhongMaterial({
          color: 0x35dbc0,
          emissive: 0x064e3b,
          shininess: 100,
          flatShading: true,
        })
        const mesh = new THREE.Mesh(geom, mat)
        nodeGroup.add(mesh)

        // Orbiting satellites representing project nodes
        const satGroup = new THREE.Group()
        for (let i = 0; i < 3; i++) {
          const sat = new THREE.Mesh(
            new THREE.SphereGeometry(0.12, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0x8c7bff })
          )
          const radius = 0.95
          const angle = (i / 3) * Math.PI * 2
          sat.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
          satGroup.add(sat)
        }
        nodeGroup.add(satGroup)
        nodeGroup.userData = { satGroup }
        visualMesh = mesh
      } else if (node.name === 'experience') {
        // Server stack boxes
        const serverGroup = new THREE.Group()
        for (let i = 0; i < 3; i++) {
          const server = new THREE.Mesh(
            new THREE.BoxGeometry(0.95, 0.2, 0.65),
            new THREE.MeshPhongMaterial({ color: 0x2d3748, emissive: 0x1a202c, shininess: 80 })
          )
          server.position.y = (i - 1) * 0.3
          
          // Small glowing green network LED indicator
          const led = new THREE.Mesh(
            new THREE.SphereGeometry(0.04, 6, 6),
            new THREE.MeshBasicMaterial({ color: 0x10b981 })
          )
          led.position.set(0.35, 0, 0.33)
          server.add(led)
          serverGroup.add(server)
        }
        nodeGroup.add(serverGroup)
        visualMesh = serverGroup
      } else if (node.name === 'skills') {
        // Torus knot for complex data mesh
        const geom = new THREE.TorusKnotGeometry(0.38, 0.11, 48, 8, 3, 4)
        const mat = new THREE.MeshPhongMaterial({
          color: 0x35dbc0,
          emissive: 0x064e43,
          shininess: 100,
        })
        const mesh = new THREE.Mesh(geom, mat)
        nodeGroup.add(mesh)
        visualMesh = mesh
      } else if (node.name === 'education') {
        // Dual ring planet
        const geom = new THREE.SphereGeometry(0.4, 16, 16)
        const mat = new THREE.MeshPhongMaterial({
          color: 0x8c7bff,
          emissive: 0x22134a,
          shininess: 80,
        })
        const mesh = new THREE.Mesh(geom, mat)

        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.68, 0.05, 6, 32),
          new THREE.MeshBasicMaterial({ color: 0x35dbc0, transparent: true, opacity: 0.45 })
        )
        ring.rotation.x = Math.PI / 3.2
        nodeGroup.add(mesh, ring)
        visualMesh = mesh
      } else {
        // Contact node: Dodecahedron
        const geom = new THREE.DodecahedronGeometry(0.45, 0)
        const mat = new THREE.MeshPhongMaterial({
          color: 0x35dbc0,
          emissive: 0x064e43,
          shininess: 100,
        })
        const mesh = new THREE.Mesh(geom, mat)

        const cage = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.7, 0),
          new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1 })
        )
        nodeGroup.add(mesh, cage)
        visualMesh = mesh
      }

      nodesGroup.add(nodeGroup)
      nodeMeshes.push(visualMesh)
      node.mesh = nodeGroup
    })

    // 3. Connect Nodes via glowing cyber fibers
    const connections: { line: THREE.Line; path: THREE.Vector3[]; length: number }[] = []
    
    nodes.forEach((node) => {
      const p1 = new THREE.Vector3(0, 0, 0)
      const p2 = node.position

      // Create slightly bent pipelines to look organic
      const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5)
      midPoint.z += 0.6 // Pull outwards

      const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2)
      const points = curve.getPoints(24)
      
      const geom = new THREE.BufferGeometry().setFromPoints(points)
      const mat = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.15,
      })
      const line = new THREE.Line(geom, mat)
      scene.add(line)

      connections.push({
        line,
        path: points,
        length: points.length,
      })
    })

    // 4. Create floating packet pulses along connections
    const pulses: { mesh: THREE.Mesh; connectionIdx: number; t: number; speed: number }[] = []
    const pulseCount = nodes.length
    
    for (let i = 0; i < pulseCount; i++) {
      const pulseMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x35dbc0 })
      )
      scene.add(pulseMesh)
      pulses.push({
        mesh: pulseMesh,
        connectionIdx: i,
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
      })
    }

    // 5. Starfield space particles
    const starGeom = new THREE.BufferGeometry()
    const starCount = 600
    const starPositions = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 50
      starPositions[i + 1] = (Math.random() - 0.5) * 50
      starPositions[i + 2] = (Math.random() - 0.5) * 50 - 5
    }

    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.5,
      fog: true,
    })
    const starField = new THREE.Points(starGeom, starMat)
    scene.add(starField)

    // Raycaster for checking hovering/clicking on nodes
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // Camera movement variables (Lerp controls)
    const targetCameraPos = new THREE.Vector3().copy(defaultCameraPos)
    const targetLookAt = new THREE.Vector3().copy(defaultLookAt)
    const currentLookAt = new THREE.Vector3().copy(defaultLookAt)

    // Orbital drag variables
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    const targetRotation = new THREE.Vector2(0, 0)
    const currentRotation = new THREE.Vector2(0, 0)

    // Dynamic HUD projection math
    const tempV = new THREE.Vector3()
    const updateHUD = () => {
      const labels = nodes.map((node) => {
        tempV.copy(node.position)
        tempV.project(camera)
        
        const x = (tempV.x * 0.5 + 0.5) * width
        const y = (-(tempV.y * 0.5) + 0.5) * height

        return {
          name: node.name,
          label: node.label,
          route: node.route,
          x,
          y,
        }
      })
      setHudLabels(labels)
    }

    // Capture mouse movement coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / width) * 2 - 1
      mouse.y = -(e.clientY / height) * 2 + 1

      // Handle drag rotation
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY
        prevMouseX = e.clientX
        prevMouseY = e.clientY

        targetRotation.y += deltaX * 0.002
        targetRotation.x += deltaY * 0.002
        // Cap vertical rotation
        targetRotation.x = Math.max(-0.4, Math.min(0.4, targetRotation.x))
      }

      // Check intersections
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(nodesGroup.children, true)

      if (intersects.length > 0) {
        // Find ancestor group which carries the node name
        let parent: THREE.Object3D | null = intersects[0].object
        while (parent && parent.parent !== nodesGroup) {
          parent = parent.parent
        }
        if (parent) {
          setHoveredNode(parent.name)
          document.body.style.cursor = 'pointer'
          return
        }
      }
      setHoveredNode(null)
      document.body.style.cursor = 'default'
    }

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    // Raycast on click
    const handleCanvasClick = (e: MouseEvent) => {
      mouse.x = (e.clientX / width) * 2 - 1
      mouse.y = -(e.clientY / height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(nodesGroup.children, true)

      if (intersects.length > 0) {
        let parent: THREE.Object3D | null = intersects[0].object
        while (parent && parent.parent !== nodesGroup) {
          parent = parent.parent
        }
        if (parent) {
          const matchedNode = nodes.find((n) => n.name === parent?.name)
          if (matchedNode) {
            navigate(matchedNode.route)
          }
        }
      }
    }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      isMobile = width < 768

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('resize', handleResize)
    canvas.addEventListener('click', handleCanvasClick)

    // Sync camera target according to current route
    const syncRouteCamera = () => {
      const currentRoute = location.pathname
      const activeNode = nodes.find((n) => n.route === currentRoute)

      if (activeNode) {
        targetCameraPos.copy(activeNode.cameraPos)
        targetLookAt.copy(activeNode.lookAt)
      } else {
        targetCameraPos.copy(defaultCameraPos)
        targetLookAt.copy(defaultLookAt)
      }
    }

    syncRouteCamera()

    let frameId: number
    const clock = new THREE.Clock()

    // 6. Animation Render Loop
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Rotate background core
      coreMesh.rotation.y = elapsedTime * 0.15
      coreInner.rotation.y = -elapsedTime * 0.22
      outerRing.rotation.z = elapsedTime * 0.35

      // Orbit/rotate nodes
      nodesGroup.children.forEach((group) => {
        // Rotate all nodes on their Y axis
        group.rotation.y = elapsedTime * 0.4
        
        // Custom internal animation checks
        if (group.name === 'projects') {
          const satGroup = group.userData.satGroup
          if (satGroup) {
            satGroup.rotation.z = elapsedTime * 0.6
          }
        } else if (group.name === 'experience') {
          // Blink indicators
          group.children.forEach((serverMesh, idx) => {
            const led = serverMesh.children[0] as THREE.Mesh
            if (led && led.material) {
              const pulse = Math.sin(elapsedTime * 12 + idx) > 0
              ;(led.material as THREE.MeshBasicMaterial).color.setHex(pulse ? 0x10b981 : 0x064e3b)
            }
          })
        }
      })

      // Animate packet pulses along wires
      pulses.forEach((pulse) => {
        pulse.t += pulse.speed
        if (pulse.t > 1) {
          pulse.t = 0
          pulse.speed = 0.003 + Math.random() * 0.003
        }
        
        const points = connections[pulse.connectionIdx].path
        const totalPoints = points.length
        
        // Find position index on Bezier path
        const idx = Math.floor(pulse.t * (totalPoints - 1))
        pulse.mesh.position.copy(points[idx])

        // Add subtle scale bobbing
        const pulseScale = 1.0 + Math.sin(elapsedTime * 10) * 0.2
        pulse.mesh.scale.set(pulseScale, pulseScale, pulseScale)
      })

      // Lerp Orbit Drag Rotations
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05
      
      // Apply rotation to nodes and core groups altogether
      nodesGroup.rotation.x = currentRotation.x
      nodesGroup.rotation.y = currentRotation.y
      coreGroup.rotation.x = currentRotation.x
      coreGroup.rotation.y = currentRotation.y

      // Lerp camera flying travel
      camera.position.lerp(targetCameraPos, 0.05)
      currentLookAt.lerp(targetLookAt, 0.05)
      camera.lookAt(currentLookAt)

      renderer.render(scene, camera)
      updateHUD()
    }

    animate()

    // Listen to route pathname changes to animate camera
    syncRouteCamera()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('click', handleCanvasClick)
      renderer.dispose()
    }
  }, [location.pathname])

  // Don't render full 3D labels or interactive nodes on admin panel
  const isAdmin = location.pathname.startsWith('/admin')
  if (isAdmin) return null

  const isHome = location.pathname === '/'

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'auto', // Enable pointer events to intercept drags/clicks
        }}
      />

      {/* Floating projected screen HUD labels */}
      {isHome &&
        hudLabels.map((hud) => {
          // Hide labels if coordinates project behind screen space (clipping Z)
          if (hud.x < 0 || hud.x > window.innerWidth || hud.y < 0 || hud.y > window.innerHeight) return null

          const isHovered = hoveredNode === hud.name

          return (
            <div
              key={hud.name}
              onClick={() => navigate(hud.route)}
              style={{
                position: 'absolute',
                left: `${hud.x}px`,
                top: `${hud.y}px`,
                transform: 'translate(-50%, -150%)',
                pointerEvents: 'auto',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div
                className={`hud-badge ${isHovered ? 'hovered' : ''}`}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  background: isHovered ? 'rgba(124, 58, 237, 0.95)' : 'rgba(15, 23, 42, 0.85)',
                  border: `1px solid ${isHovered ? '#8c7bff' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isHovered
                    ? '0 0 20px rgba(124, 58, 237, 0.5), 0 10px 20px rgba(0,0,0,0.3)'
                    : '0 4px 12px rgba(0,0,0,0.25)',
                  color: '#fff',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: isHovered ? '#fff' : '#8c7bff',
                    boxShadow: isHovered ? 'none' : '0 0 6px #8c7bff',
                  }}
                />
                {hud.label}
              </div>
            </div>
          )
        })}

      {/* Interactive HUD helper overlay */}
      {isHome && (
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.45)',
            textAlign: 'center',
            letterSpacing: '0.05em',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            animation: 'pulse-slow 3s infinite ease-in-out',
          }}
        >
          DRAG TO ROTATE SCENE · CLICK NODES TO NAVIGATE
        </div>
      )}
    </div>
  )
}

export default ThreeDSpace
