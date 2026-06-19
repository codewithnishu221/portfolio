import { useEffect, useRef } from 'react'

const TRAIL_COUNT = 15
const FLOATING_COUNT = 25

function CursorEffects() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const trailRef = useRef([])
  const floatingRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let w, h

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouse)

    // Init trail
    trailRef.current = Array.from({ length: TRAIL_COUNT }, () => ({ x: -1000, y: -1000, size: 1.5 + Math.random() * 2 }))

    // Init floating particles
    floatingRef.current = Array.from({ length: FLOATING_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: 1 + Math.random() * 2.5,
      phase: Math.random() * Math.PI * 2,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      // Update trail
      const mouse = mouseRef.current
      trailRef.current.unshift({ x: mouse.x, y: mouse.y, size: 1.5 + Math.random() * 2 })
      trailRef.current.pop()

      // Draw trail
      trailRef.current.forEach((p, i) => {
        const alpha = (1 - i / TRAIL_COUNT) * 0.25
        const size = p.size * (1 - i / TRAIL_COUNT * 0.6)
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(129, 140, 248, ${alpha})`
        ctx.fill()
      })

      // Draw cursor glow ring
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120)
      grad.addColorStop(0, 'rgba(99, 102, 241, 0.04)')
      grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.02)')
      grad.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      // Update & draw floating particles
      floatingRef.current.forEach(p => {
        p.x += p.vx
        p.y += p.vy

        // Magnetic pull toward cursor (very subtle)
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          const force = (1 - dist / 200) * 0.02
          p.x += dx * force
          p.y += dy * force
        }

        // Wrap around
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        const alpha = 0.06 + Math.sin(Date.now() / 3000 + p.phase) * 0.04
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(129, 140, 248, ${Math.max(0, alpha)})`
        ctx.fill()
      })

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
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
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    />
  )
}

export default CursorEffects