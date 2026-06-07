import { useState, useEffect } from 'react'

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

  return (
    <div className="page-container">
      <section className="hero">
        <div className="hero-orbs">
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
