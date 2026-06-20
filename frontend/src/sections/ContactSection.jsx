import { useState } from 'react'
import { submitContact } from '../services/api'
import './ContactSection.css'

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    try {
      await submitContact(formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrorMsg('Failed to send. Please try again later.')
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Contact Me</h2>
          <p>Have a question or want to work together?</p>
        </div>
        <div className="contact-content">
          <div className="contact-form-wrapper">
            {submitted && (
              <div className="contact-success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Message sent successfully!
              </div>
            )}
            {errorMsg && (
              <div className="contact-error">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                {errorMsg}
              </div>
            )}
            <form onSubmit={handleSubmit} className="contact-form-new">
              <div className="form-row">
                <div className="form-group-new">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                </div>
                <div className="form-group-new">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-group-new">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your message..." rows="5" required></textarea>
              </div>
              <button type="submit" id="contact-submit-btn" className="btn-primary submit-contact-btn">
                Send Message
                <svg className="submit-plane-icon" width="18" height="14" viewBox="0 0 60 40" style={{ marginLeft: 6 }}>
                  <defs>
                    <linearGradient id="wpT" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#6366f1"/></linearGradient>
                    <linearGradient id="wpB" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#818cf8"/></linearGradient>
                  </defs>
                  <polygon points="55,20 40,2 20,20" fill="url(#wpT)" stroke="#4f46e5" strokeWidth="0.4"/>
                  <polygon points="55,20 40,38 20,20" fill="url(#wpB)" stroke="#4f46e5" strokeWidth="0.4"/>
                  <polygon points="20,20 8,12 8,28" fill="#6366f1" stroke="#4f46e5" strokeWidth="0.4"/>
                  <polygon points="12,12 18,20 12,28" fill="#818cf8" opacity="0.35"/>
                  <line x1="55" y1="20" x2="8" y2="20" stroke="#4f46e5" strokeWidth="0.4" opacity="0.2"/>
                </svg>
              </button>
            </form>
          </div>
          <div className="contact-info">
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <a href="mailto:nishumca22@gmail.com">nishumca22@gmail.com</a>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <h4>Location</h4>
                <p>Mohali, Punjab, IN</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div>
                <h4>GitHub</h4>
                <a href="https://github.com/codewithnishu221" target="_blank" rel="noopener noreferrer">codewithnishu221</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
