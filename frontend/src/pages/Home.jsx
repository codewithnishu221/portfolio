import { useState, useEffect, useRef } from 'react'

const roles = [
  'Java & Spring Boot Developer',
  'Backend Engineer',
  'AWS & Cloud Enthusiast',
  'Open Source Contributor',
]

function Home() {
  const [text, setText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const orbsRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout

    if (!deleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setText(currentRole.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 80)
    } else if (!deleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText(currentRole.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, 40)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setRoleIndex((roleIndex + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, roleIndex])

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const container = orbsRef.current
    if (!container) return

    const orbs = container.querySelectorAll('.orb')
    const speeds = [0.4, 0.3, 0.35]
    let startTime = Date.now()
    let animId

    const animate = () => {
      const t = (Date.now() - startTime) / 1000
      const mx = (mouseRef.current.x - 0.5) * 2
      const my = (mouseRef.current.y - 0.5) * 2

      orbs.forEach((orb, i) => {
        const floatY = Math.sin(t * (0.5 + i * 0.2) + i * 2) * 20
        const floatX = Math.cos(t * (0.3 + i * 0.15) + i * 1.5) * 10
        const cursorX = mx * 50 * speeds[i]
        const cursorY = my * 50 * speeds[i]
        orb.style.transform = `translate(${floatX + cursorX}px, ${floatY + cursorY}px)`
      })

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="page-container">
      <section className="hero">
        <div className="hero-orbs" ref={orbsRef}>
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <p className="hero-subtitle" style={{ color: '#818cf8', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9em' }}>
          Software Engineer | Java | Spring Boot | AWS
        </p>
        <h1>Nishu</h1>
        <p className="typing-text">
          {text}<span className="cursor"></span>
        </p>
        <p className="hero-subtitle">
          Building enterprise-grade backends with modern Java, Spring Boot & AWS
        </p>
      </section>
    </div>
  )
}

export default Home
