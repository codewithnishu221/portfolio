import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">&lt;/&gt;</span>
          <span className="logo-text">Nishu</span>
        </Link>
        <button
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {[
            { path: '/', label: 'Home', icon: 'fa-house' },
            { path: '/about', label: 'About', icon: 'fa-user' },
            { path: '/skills', label: 'Skills', icon: 'fa-code' },
            { path: '/experience', label: 'Experience', icon: 'fa-briefcase' },
            { path: '/projects', label: 'Projects', icon: 'fa-folder-open' },
            { path: '/contact', label: 'Contact', icon: 'fa-envelope' },
            { path: '/ai-assistant', label: 'AI Assistant', icon: 'fa-robot' },
          ].map(({ path, label, icon }) => (
            <li key={path} className="nav-item">
              <Link
                to={path}
                className={`nav-link ${isActive(path) ? 'active' : ''}`}
              >
                <i className={`fas ${icon}`}></i>
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
