import { useState } from 'react'
import { submitContact } from '../services/api'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await submitContact(formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="page-container">
      <h1>Contact Me</h1>
      <div className="contact-wrapper">
        <div className="contact-form-section">
          {submitted && (
            <p className="success-message">
              Message sent successfully!
            </p>
          )}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">
                <i className="fas fa-user" style={{ marginRight: 8, color: '#818cf8' }}></i>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope" style={{ marginRight: 8, color: '#818cf8' }}></i>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">
                <i className="fas fa-comment" style={{ marginRight: 8, color: '#818cf8' }}></i>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              <i className="fas fa-paper-plane" style={{ marginRight: 8 }}></i>
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-illustration">
          <div className="illustration-card">
            <div className="illustration-inner">
              <div className="il-envelope">
                <div className="il-envelope-body">
                  <div className="il-envelope-flap"></div>
                </div>
              </div>
              <div className="il-paper il-paper-1">
                <div className="il-line il-line-short"></div>
                <div className="il-line il-line-medium"></div>
                <div className="il-line il-line-long"></div>
              </div>
              <div className="il-paper il-paper-2">
                <div className="il-line il-line-short"></div>
                <div className="il-line il-line-medium"></div>
              </div>
              <div className="il-dot il-dot-1"></div>
              <div className="il-dot il-dot-2"></div>
              <div className="il-dot il-dot-3"></div>
              <div className="il-circle il-circle-1"></div>
              <div className="il-circle il-circle-2"></div>
            </div>
            <p className="illustration-text">Let's build something great together!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
