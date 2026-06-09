import { useState } from 'react'
import { submitContact } from '../services/api'
import devImage from '../assets/developer-typing.svg'

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
          <div className="contact-image-wrapper">
            <img src={devImage} alt="Developer typing at laptop" className="contact-dev-image" />
            <div className="ci-float-circle ci-circle-1"></div>
            <div className="ci-float-circle ci-circle-2"></div>
            <div className="ci-float-circle ci-circle-3"></div>
            <div className="ci-sparkle ci-sparkle-1"></div>
            <div className="ci-sparkle ci-sparkle-2"></div>
            <div className="ci-sparkle ci-sparkle-3"></div>
          </div>
          <p className="contact-image-caption">Let's build something great together!</p>
        </div>
      </div>
    </div>
  )
}

export default Contact
