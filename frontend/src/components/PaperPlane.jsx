import { useEffect, useRef, useState } from 'react'
import { usePaperPlane } from '../context/PaperPlaneContext'

const PLANE_SVG = `<svg viewBox="0 0 60 40" width="28" height="20">
  <defs>
    <linearGradient id="ppt" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#818cf8"/><stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="ppb" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a78bfa"/><stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>
  </defs>
  <polygon points="55,20 40,2 20,20" fill="url(#ppt)" stroke="#4f46e5" stroke-width="0.4"/>
  <polygon points="55,20 40,38 20,20" fill="url(#ppb)" stroke="#4f46e5" stroke-width="0.4"/>
  <polygon points="20,20 8,12 8,28" fill="#6366f1" stroke="#4f46e5" stroke-width="0.4"/>
  <polygon points="12,12 18,20 12,28" fill="#818cf8" opacity="0.35"/>
  <line x1="55" y1="20" x2="8" y2="20" stroke="#4f46e5" stroke-width="0.4" opacity="0.2"/>
</svg>`

function getDock(sectionId) {
  const el = document.getElementById(sectionId)
  if (!el) return { x: -100, y: -100 }
  const r = el.getBoundingClientRect()
  return { x: r.left + 24, y: r.top + r.height / 2 }
}

export default function PaperPlane() {
  const { plane, dock, flyTo, getActiveSection } = usePaperPlane()
  const [docked, setDocked] = useState({ x: -100, y: -100, angle: 0, show: false })
  const planeRef = useRef(null)
  const trailRef = useRef(null)
  const flyingRef = useRef(false)
  const lastSectionRef = useRef(null)
  const initRef = useRef(false)

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      const el = document.getElementById('home')
      if (el) {
        const r = el.getBoundingClientRect()
        const x = r.left + 24
        const y = r.top + r.height / 2
        setDocked({ x, y, angle: 0, show: true })
        dock('home', x, y, 0)
      }
    }
  }, [])

  useEffect(() => {
    if (plane.phase !== 'flying' || !plane.toSection) return

    flyingRef.current = true
    const target = document.getElementById(plane.toSection)
    if (!target) return

    const r = target.getBoundingClientRect()
    const endX = r.left + 24
    const endY = r.top + r.height / 2
    const startX = plane.fromX
    const startY = plane.fromY
    const dx = endX - startX
    const dy = endY - startY
    const dist = Math.sqrt(dx * dx + dy * dy)
    const arc = Math.max(120, dist * 0.25)
    const cp1x = startX + dx * 0.3
    const cp1y = startY - arc
    const cp2x = startX + dx * 0.7
    const cp2y = endY - arc
    const duration = Math.min(2200, Math.max(1400, dist * 0.9))
    const startTime = performance.now()
    const trails = []

    setDocked(p => ({ ...p, show: false }))

    const anim = (now) => {
      if (!flyingRef.current) return
      const t = Math.min((now - startTime) / duration, 1)
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const u = 1 - e
      const uu = u * u
      const uuu = uu * u
      const tt = e * e
      const ttt = tt * e

      const x = uuu * startX + 3 * uu * e * cp1x + 3 * u * tt * cp2x + ttt * endX
      const y = uuu * startY + 3 * uu * e * cp1y + 3 * u * tt * cp2y + ttt * endY
      const dx = 3 * uu * (cp1x - startX) + 6 * u * e * (cp2x - cp1x) + 3 * tt * (endX - cp2x)
      const dy = 3 * uu * (cp1y - startY) + 6 * u * e * (cp2y - cp1y) + 3 * tt * (endY - cp2y)
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)

      let opacity = 1
      let scale = 1
      if (t > 0.85) {
        const f = (t - 0.85) / 0.15
        scale = 1 - f * 0.5
        opacity = 1 - f
      }

      if (planeRef.current) {
        planeRef.current.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%) rotate(${angle}deg) scale(${scale})`
        planeRef.current.style.opacity = opacity
      }

      trails.push({ x, y })
      if (trails.length > 25) trails.shift()
      if (trailRef.current) {
        let d = ''
        for (let i = 0; i < trails.length; i++) {
          d += (i === 0 ? 'M' : ' L') + ` ${trails[i].x} ${trails[i].y}`
        }
        const ta = Math.min(1, trails.length / 25) * 0.3 * (t > 0.85 ? 1 - (t - 0.85) / 0.15 : 1)
        trailRef.current.innerHTML = trails.length > 1
          ? `<path d="${d}" stroke="rgba(129,140,248,${ta})" stroke-width="2" fill="none" stroke-linecap="round"/>`
          : ''
      }

      if (t < 1) {
        requestAnimationFrame(anim)
      } else {
        if (trailRef.current) trailRef.current.innerHTML = ''
        const d = getDock(plane.toSection)
        setDocked({ x: d.x, y: d.y, angle, show: true })
        dock(plane.toSection, d.x, d.y, angle)
      }
    }
    requestAnimationFrame(anim)

    return () => { flyingRef.current = false }
  }, [plane.phase, plane.toSection])

  useEffect(() => {
    if (plane.phase !== 'docked' || !docked.show) return
    lastSectionRef.current = plane.sectionId
    const onScroll = () => {
      const d = getDock(plane.sectionId)
      setDocked(p => ({ ...p, x: d.x, y: d.y }))
      const active = getActiveSection()
      if (active && active !== lastSectionRef.current) {
        lastSectionRef.current = active
        flyTo(active, d.x, d.y)
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [plane.phase, plane.sectionId, docked.show])

  const isDocked = plane.phase === 'docked' && docked.show

  return (
    <>
      <svg ref={trailRef} style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 9998,
      }} />
      <div
        ref={planeRef}
        dangerouslySetInnerHTML={{ __html: PLANE_SVG }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          filter: isDocked
            ? 'drop-shadow(0 0 6px rgba(99,102,241,0.25))'
            : 'drop-shadow(0 0 8px rgba(99,102,241,0.35))',
          opacity: isDocked ? 1 : (plane.phase === 'idle' ? 0 : 1),
          transform: isDocked
            ? `translate(${docked.x}px,${docked.y}px) translate(-50%,-50%) rotate(${docked.angle}deg)`
            : 'translate(-100px,-100px)',
          animation: isDocked ? 'dockFloat 3s ease-in-out infinite' : 'none',
        }}
      />
      <style>{`
        @keyframes dockFloat {
          0%, 100% { margin-top: 0; }
          50% { margin-top: -6px; }
        }
      `}</style>
    </>
  )
}
