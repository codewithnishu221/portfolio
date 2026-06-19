import { useState, useRef, useEffect } from 'react'
import { chatWithAI } from '../services/api'
import './ChatWidget.css'

const knowledgeBase = [
  {
    keywords: ['who is nishu', 'about nishu', 'tell me about nishu', 'about yourself', 'who are you'],
    answer: "Nishu is a Software Engineer with 2+ years of experience specializing in backend development with Java, Spring Boot, and AWS. She currently works at Webner Solutions as a Software Engineer II, building enterprise-grade cloud-native applications and data pipelines."
  },
  {
    keywords: ['skills', 'technologies', 'tech stack', 'programming languages', 'expertise'],
    answer: "Nishu is skilled in: Java 17/21, Spring Boot 3.x, Spring Security, Spring Cloud, Hibernate JPA, Apache Kafka, AWS (Lambda, S3, SQS, SES, EventBridge, CloudWatch), PostgreSQL, Docker, Kubernetes, GitHub Actions, Redis, Elasticsearch, WebSocket, and Microservices architecture."
  },
  {
    keywords: ['experience', 'work', 'job', 'career', 'employed', 'working at'],
    answer: "Nishu works at Webner Solutions as a Software Engineer II. She has experience building production-grade REST APIs, enterprise data pipelines, and cloud-native microservices. She has worked on AI-powered migration platforms, AL3 insurance carrier data pipelines, and project management platforms."
  },
  {
    keywords: ['projects', 'what projects', 'portfolio', 'built', 'developed'],
    answer: "Nishu has built several notable projects: 1) FSC-Bridge - an AI-powered migration engine using Spring Boot, Kafka, and Spring AI, 2) AL3 Carrier Integration - an enterprise data pipeline processing insurance files on AWS, and 3) SprintLens - a cloud-native project management platform with microservices, WebSocket, and Elasticsearch."
  },
  {
    keywords: ['education', 'college', 'university', 'degree', 'study', 'studied'],
    answer: "Nishu holds a Bachelor's degree in Computer Science. She is a self-taught engineer with deep expertise in Java, Spring Boot, and cloud technologies, continuously learning through building production-grade open-source projects."
  },
  {
    keywords: ['contact', 'email', 'reach', 'hire', 'recruit', 'resume', 'cv'],
    answer: "You can reach Nishu through the contact form on this website, or connect with her on GitHub at github.com/codewithnishu221."
  },
  {
    keywords: ['certification', 'certified', 'aws certified', 'certificate', 'credentials'],
    answer: "Nishu holds AWS certifications and continuously upskills in cloud-native development, microservices, and system design."
  },
  {
    keywords: ['fsc-bridge', 'fsc bridge', 'migration engine', 'ai migration'],
    answer: "FSC-Bridge is an open-source AI-powered migration engine built with Java 17, Spring Boot 3.x, Apache Kafka, Spring AI with Google Gemini, PostgreSQL, Docker, and Kubernetes. Features include Spring Batch chunk-processing, Jasypt encryption, Micrometer metrics, and full CI/CD with GitHub Actions."
  },
  {
    keywords: ['al3', 'carrier integration', 'insurance', 'data pipeline'],
    answer: "AL3 Carrier Integration is an enterprise data pipeline processing daily insurance carrier files. It converts ACORD data to JSON and routes it to AWS S3 using Lambda, SQS, SES, and EventBridge. Built with event-driven scheduling, CloudWatch monitoring, and multi-environment deployments."
  },
  {
    keywords: ['sprintlens', 'project management', 'sprint'],
    answer: "SprintLens is a cloud-native microservices-based project management platform. Features include JWT auth with RBAC, Spring Cloud Gateway, PostgreSQL per-tenant, Apache Kafka, WebSocket with Redis Pub/Sub, Elasticsearch search, OpenAI integration, Flyway migrations, and Prometheus/Grafana monitoring."
  },
  {
    keywords: ['spring boot', 'java', 'backend', 'developer', 'software engineer'],
    answer: "Nishu is a highly skilled Java & Spring Boot developer with deep expertise in building enterprise-grade backends, microservices, REST APIs, and cloud-native applications. She works extensively with Spring ecosystem including Spring Security, Spring Cloud, Spring Batch, and Spring AI."
  },
  {
    keywords: ['aws', 'cloud', 'devops', 'docker', 'kubernetes'],
    answer: "Nishu has strong AWS and DevOps skills including: AWS Lambda, S3, SQS, SES, EventBridge, CloudWatch, IAM, Docker containerization, Kubernetes orchestration with Helm charts, and GitHub Actions CI/CD pipelines."
  },
  {
    keywords: ['open source', 'github', 'contributions', 'oss'],
    answer: "Nishu is an active open-source contributor. Her project FSC-Bridge is fully open-source on GitHub. She believes in building high-quality, well-documented software and sharing knowledge with the developer community."
  },
  {
    keywords: ['strengths', 'strongest', 'good at', 'expert', 'most skilled', 'mastered skill', 'best skill', 'top skill', 'primary skill'],
    answer: "Nishu's strongest areas are: Backend Architecture Design, Spring Boot Microservices, REST API Development, System Design, Cloud-Native Applications, Apache Kafka, and Building Production-Grade Enterprise Software."
  },
  {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    answer: "Hello! I hope you're doing well. I'm Kia, Nishu's AI assistant. I can tell you about her skills, experience, projects, education, and more. How may I help you?"
  },
]

function findLocalAnswer(message) {
  const lower = message.toLowerCase().trim()
  for (const item of knowledgeBase) {
    if (item.keywords.some(kw => lower.includes(kw))) {
      return item.answer
    }
  }
  return null
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showGreeting, setShowGreeting] = useState(true)
  const messagesEndRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setShowGreeting(true)
      const timer = setTimeout(() => setShowGreeting(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && !e.target.closest('.chat-fab')) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      setTimeout(() => document.addEventListener('click', handleClickOutside), 100)
    }
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])

    const local = findLocalAnswer(userMsg)
    if (local) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: local }])
      }, 300)
      return
    }

    setLoading(true)
    try {
      const response = await chatWithAI(userMsg)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again or use the contact form to reach Nishu directly." }])
    } finally {
      setLoading(false)
    }
  }

  const handleFabClick = (e) => {
    e.stopPropagation()
    setIsOpen(prev => !prev)
  }

  return (
    <>
      <div className="chat-fab-wrapper">
        {!isOpen && (
          <div className="chat-fab-badge" onClick={handleFabClick}>
            <div className="chat-fab-badge-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <span className="chat-fab-badge-text">Ask Kia anything!</span>
          </div>
        )}
        <button className={`chat-fab ${isOpen ? 'active' : ''}`} onClick={handleFabClick} aria-label="Chat with Kia">
          {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-comment-dots"></i>}
        </button>
      </div>

      {isOpen && (
        <div className="chat-panel" ref={panelRef} onClick={e => e.stopPropagation()}>
          <div className="chat-panel-header">
            <div className="chat-panel-header-left">
              <div className="chat-panel-avatar">
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <span className="chat-panel-name">Kia</span>
                <span className="chat-panel-status">
                  <span className="chat-panel-dot"></span>
                  Online
                </span>
              </div>
            </div>
            <button className="chat-panel-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="chat-panel-messages">
            {showGreeting && messages.length === 0 && (
              <div className="chat-panel-greeting">
                <div className="greeting-avatar">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="greeting-bubble">
                  <p>Hello, I hope you're doing well, How may I help you!</p>
                </div>
              </div>
            )}

            {messages.length === 0 && !showGreeting && (
              <div className="chat-panel-welcome">
                <i className="fas fa-comment-dots"></i>
                <p>Ask me about Nishu's skills, experience, or projects!</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`chat-panel-msg ${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="msg-avatar">
                    <i className="fas fa-robot"></i>
                  </div>
                )}
                <div className="msg-bubble">
                  <p>{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="msg-avatar user-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chat-panel-msg assistant">
                <div className="msg-avatar">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="msg-bubble">
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

          <form className="chat-panel-input" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about Nishu..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatWidget