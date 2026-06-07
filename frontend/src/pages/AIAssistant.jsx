import { useState, useRef, useEffect } from 'react'
import { chatWithAI } from '../services/api'
import './AIAssistant.css'

function AIAssistant() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await chatWithAI(userMessage)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      console.error('Error:', error)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, an error occurred.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h1>AI Assistant</h1>
      <div className="chat-container">
        <div className="chat-header">
          <i className="fas fa-robot" style={{ color: '#818cf8', fontSize: '1.2em' }}></i>
          <span>AI Chat</span>
          <span className="chat-status">
            <span className="status-dot"></span>
            {loading ? 'Thinking...' : 'Online'}
          </span>
        </div>
        <div className="messages">
          {messages.length === 0 && (
            <div className="chat-welcome">
              <i className="fas fa-comment-dots"></i>
              <p>Ask me anything! I'm here to help.</p>
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'user' ? (
                  <i className="fas fa-user"></i>
                ) : (
                  <i className="fas fa-robot"></i>
                )}
              </div>
              <div className="message-content">
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="message assistant">
              <div className="message-avatar">
                <i className="fas fa-robot"></i>
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="chat-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  )
}

export default AIAssistant
