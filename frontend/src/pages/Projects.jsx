import { useState } from 'react'

function ArchitectureDiagram({ diagram }) {
  if (!diagram) return null
  return (
    <div className="arch-diagram">
      <span className="tech-stack-label">
        <i className="fas fa-sitemap"></i> Architecture
      </span>
      <svg viewBox="0 0 400 200" className="arch-svg">
        {diagram}
      </svg>
    </div>
  )
}

const diagrams = {
  fsc: (
    <>
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      {/* API Gateway */}
      <rect x="135" y="5" width="130" height="30" rx="8" fill="url(#g1)" opacity="0.9" />
      <text x="200" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">API Gateway</text>
      {/* Layer labels */}
      <text x="60" y="60" textAnchor="middle" fill="#818cf8" fontSize="8" fontWeight="500">Ingestion</text>
      <text x="200" y="60" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="500">Processing</text>
      <text x="340" y="60" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="500">Storage</text>
      {/* Connector lines */}
      <line x1="130" y1="50" x2="130" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <line x1="200" y1="35" x2="200" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <line x1="270" y1="50" x2="270" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      {/* Boxes row 1 */}
      <rect x="20" y="75" width="80" height="28" rx="6" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.3)" strokeWidth="1" />
      <text x="60" y="93" textAnchor="middle" fill="#818cf8" fontSize="8">REST Controller</text>
      <rect x="160" y="75" width="80" height="28" rx="6" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
      <text x="200" y="93" textAnchor="middle" fill="#34d399" fontSize="8">Spring Batch</text>
      <rect x="300" y="75" width="80" height="28" rx="6" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
      <text x="340" y="93" textAnchor="middle" fill="#fbbf24" fontSize="8">PostgreSQL</text>
      {/* Horizontal bus */}
      <line x1="100" y1="89" x2="160" y2="89" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="240" y1="89" x2="300" y2="89" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3,3" />
      {/* Kafka bus */}
      <rect x="20" y="115" width="360" height="22" rx="6" fill="rgba(244,63,94,0.1)" stroke="rgba(244,63,94,0.25)" strokeWidth="1" />
      <text x="200" y="130" textAnchor="middle" fill="#f43f5e" fontSize="8" fontWeight="500">Apache Kafka Event Bus (3 Topics)</text>
      {/* Row 2 */}
      <rect x="20" y="145" width="110" height="28" rx="6" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.3)" strokeWidth="1" />
      <text x="75" y="163" textAnchor="middle" fill="#818cf8" fontSize="8">Spring AI / Gemini</text>
      <rect x="145" y="145" width="110" height="28" rx="6" fill="rgba(244,63,94,0.15)" stroke="rgba(244,63,94,0.3)" strokeWidth="1" />
      <text x="200" y="163" textAnchor="middle" fill="#f43f5e" fontSize="8">Kafka Consumer</text>
      <rect x="270" y="145" width="110" height="28" rx="6" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
      <text x="325" y="163" textAnchor="middle" fill="#34d399" fontSize="8">Micrometer</text>
      {/* Docker/K8s footer */}
      <rect x="130" y="178" width="140" height="18" rx="4" fill="rgba(99,102,241,0.08)" stroke="rgba(99,102,241,0.15)" strokeWidth="1" />
      <text x="200" y="191" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Docker • K8s • GitHub Actions</text>
    </>
  ),
  al3: (
    <>
      <rect x="20" y="5" width="120" height="30" rx="8" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.3)" strokeWidth="1" />
      <text x="80" y="25" textAnchor="middle" fill="#818cf8" fontSize="8" fontWeight="600">AL3 Carrier Files</text>
      <rect x="260" y="5" width="120" height="30" rx="8" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
      <text x="320" y="25" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="600">JSON Output</text>
      {/* Arrow */}
      <line x1="140" y1="20" x2="255" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <polygon points="255,16 263,20 255,24" fill="rgba(255,255,255,0.2)" />
      <text x="200" y="15" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">ACORD Parse</text>
      {/* Pipeline boxes */}
      <rect x="20" y="50" width="360" height="22" rx="6" fill="rgba(244,63,94,0.1)" stroke="rgba(244,63,94,0.25)" strokeWidth="1" />
      <text x="200" y="64" textAnchor="middle" fill="#f43f5e" fontSize="8" fontWeight="500">Event-Driven Scheduling + Error Handling</text>
      {/* AWS Stack */}
      <rect x="20" y="85" width="85" height="28" rx="6" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
      <text x="62" y="103" textAnchor="middle" fill="#fbbf24" fontSize="8">Lambda</text>
      <rect x="115" y="85" width="85" height="28" rx="6" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
      <text x="157" y="103" textAnchor="middle" fill="#fbbf24" fontSize="8">S3</text>
      <rect x="210" y="85" width="85" height="28" rx="6" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
      <text x="252" y="103" textAnchor="middle" fill="#fbbf24" fontSize="8">SQS/SES</text>
      <rect x="305" y="85" width="75" height="28" rx="6" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
      <text x="342" y="103" textAnchor="middle" fill="#fbbf24" fontSize="8">EventBridge</text>
      {/* Brackets */}
      <text x="200" y="80" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7">AWS Serverless Stack</text>
      {/* Monitoring footer */}
      <rect x="100" y="125" width="200" height="22" rx="4" fill="rgba(99,102,241,0.08)" stroke="rgba(99,102,241,0.15)" strokeWidth="1" />
      <text x="200" y="140" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">CloudWatch Monitoring • IAM Security</text>
      {/* Multi-env */}
      <rect x="50" y="155" width="100" height="18" rx="4" fill="rgba(52,211,153,0.08)" stroke="rgba(52,211,153,0.15)" strokeWidth="1" />
      <text x="100" y="168" textAnchor="middle" fill="rgba(52,211,153,0.6)" fontSize="7">Sandbox</text>
      <rect x="160" y="155" width="80" height="18" rx="4" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.15)" strokeWidth="1" />
      <text x="200" y="168" textAnchor="middle" fill="rgba(251,191,36,0.6)" fontSize="7">UAT</text>
      <rect x="250" y="155" width="100" height="18" rx="4" fill="rgba(52,211,153,0.08)" stroke="rgba(52,211,153,0.15)" strokeWidth="1" />
      <text x="300" y="168" textAnchor="middle" fill="rgba(52,211,153,0.6)" fontSize="7">Production</text>
    </>
  ),
  sprintlens: (
    <>
      <defs>
        <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      {/* API Gateway */}
      <rect x="135" y="5" width="130" height="28" rx="8" fill="url(#sg1)" opacity="0.9" />
      <text x="200" y="24" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Spring Cloud Gateway</text>
      {/* Eureka */}
      <circle cx="60" cy="19" r="12" fill="rgba(34,211,238,0.2)" stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
      <text x="60" y="23" textAnchor="middle" fill="#22d3ee" fontSize="7">Eureka</text>
      <circle cx="340" cy="19" r="12" fill="rgba(251,191,36,0.2)" stroke="rgba(251,191,36,0.4)" strokeWidth="1" />
      <text x="340" y="23" textAnchor="middle" fill="#fbbf24" fontSize="7">Config</text>
      {/* Microservices row */}
      <text x="200" y="55" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7">Microservices</text>
      <rect x="20" y="60" width="85" height="28" rx="6" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.3)" strokeWidth="1" />
      <text x="62" y="78" textAnchor="middle" fill="#818cf8" fontSize="8" fontWeight="500">Auth Service</text>
      <rect x="115" y="60" width="85" height="28" rx="6" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
      <text x="157" y="78" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="500">Task Service</text>
      <rect x="210" y="60" width="85" height="28" rx="6" fill="rgba(244,63,94,0.15)" stroke="rgba(244,63,94,0.3)" strokeWidth="1" />
      <text x="252" y="78" textAnchor="middle" fill="#f43f5e" fontSize="8" fontWeight="500">Notification</text>
      <rect x="305" y="60" width="75" height="28" rx="6" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
      <text x="342" y="78" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="500">Analytics</text>
      {/* Kafka bus */}
      <rect x="20" y="100" width="360" height="20" rx="5" fill="rgba(244,63,94,0.08)" stroke="rgba(244,63,94,0.2)" strokeWidth="1" />
      <text x="200" y="113" textAnchor="middle" fill="#f43f5e" fontSize="7" fontWeight="500">Apache Kafka • Redis Pub/Sub</text>
      {/* Data stores row */}
      <rect x="20" y="130" width="85" height="28" rx="6" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
      <text x="62" y="148" textAnchor="middle" fill="#34d399" fontSize="8">PostgreSQL</text>
      <rect x="115" y="130" width="85" height="28" rx="6" fill="rgba(34,211,238,0.15)" stroke="rgba(34,211,238,0.3)" strokeWidth="1" />
      <text x="157" y="148" textAnchor="middle" fill="#22d3ee" fontSize="8">Elasticsearch</text>
      <rect x="210" y="130" width="85" height="28" rx="6" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
      <text x="252" y="148" textAnchor="middle" fill="#fbbf24" fontSize="8">Redis</text>
      <rect x="305" y="130" width="75" height="28" rx="6" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
      <text x="342" y="148" textAnchor="middle" fill="#fbbf24" fontSize="8">Flyway</text>
      {/* Cross-cutting */}
      <rect x="20" y="170" width="360" height="18" rx="4" fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.12)" strokeWidth="1" />
      <text x="200" y="183" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7">JWT Auth • RBAC • WebSocket • AOP Audit • OpenAI • Prometheus/Grafana</text>
      {/* CI/CD */}
      <rect x="130" y="193" width="140" height="5" rx="2" fill="rgba(34,211,238,0.3)" />
    </>
  ),
}

function ProjectCard({ project }) {
  const [showDetails, setShowDetails] = useState(false)

  const badgeStyles = {
    'Open Source': { bg: 'rgba(99, 102, 241, 0.2)', text: '#818cf8', border: 'rgba(99, 102, 241, 0.3)' },
    'Office Project': { bg: 'rgba(251, 191, 36, 0.2)', text: '#fbbf24', border: 'rgba(251, 191, 36, 0.3)' },
    'In Progress': { bg: 'rgba(52, 211, 153, 0.2)', text: '#34d399', border: 'rgba(52, 211, 153, 0.3)' },
  }

  const badgeStyle = badgeStyles[project.badge] || { bg: 'rgba(99, 102, 241, 0.1)', text: '#818cf8', border: 'rgba(99, 102, 241, 0.2)' }

  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="project-icon">
          <i className={`fas ${project.icon || 'fa-folder-open'}`}></i>
        </div>
        <div className="project-title-group">
          <div className="project-title-row">
            <h3>{project.name}</h3>
            {project.badge && (
              <span className="project-badge" style={{
                background: badgeStyle.bg,
                color: badgeStyle.text,
                borderColor: badgeStyle.border,
              }}>
                {project.badge}
              </span>
            )}
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
              <i className="fab fa-github"></i> View on GitHub →
            </a>
          )}
          {project.note && (
            <p className="project-note">{project.note}</p>
          )}
        </div>
      </div>

      <p className="project-desc">{project.description}</p>

      <ArchitectureDiagram diagram={project.diagram} />

      {project.technologies.length > 0 && (
        <div className="tech-stack-section">
          <span className="tech-stack-label">
            <i className="fas fa-cpu"></i> Tech Stack
          </span>
          <div className="technologies">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="tech-badge">{tech}</span>
            ))}
          </div>
        </div>
      )}

      {project.details && project.details.length > 0 && (
        <div className="project-details-section">
          <button
            className={`details-toggle ${showDetails ? 'active' : ''}`}
            onClick={() => setShowDetails(!showDetails)}
          >
            <span>{showDetails ? '▾' : '▸'} {showDetails ? 'Hide details' : 'Show details'}</span>
            <span className="details-count">{project.details.length} points</span>
          </button>
          {showDetails && (
            <ul className="project-details-list">
              {project.details.map((detail, idx) => (
                <li key={idx}>
                  <span className="detail-marker">▹</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

function Projects() {
  const projects = [
    {
      icon: 'fa-cogs',
      name: 'FSC-Bridge — AI-Powered Migration Engine',
      badge: 'Open Source',
      link: 'https://github.com/codewithnishu221',
      description:
        'A production-grade, open-source microservices platform for intelligent enterprise data migration. Built with Java 17 and Spring Boot 3.x using a 5-module Maven multi-module architecture.',
      diagram: diagrams.fsc,
      details: [
        'Integrated Spring AI with Google Gemini LLM for intelligent field mapping suggestions, natural language migration job parsing, and AI-generated migration summaries; implemented Apache Kafka event streaming (3 topics, producer/consumer pipeline) for async, decoupled migration progress events.',
        'Built Spring Batch chunk-processing pipeline with configurable chunk size, fault tolerance, skip logic, and PostgreSQL job state persistence — enabling pause/resume for 50,000+ record migrations; added pre-flight validation engine with 6 automated checks including API governor limit estimation.',
        'Secured credentials with Jasypt AES-256 encryption and custom Logback MaskingPatternLayout to redact tokens/secrets from logs; added Micrometer custom metrics tracking p50/p95/p99 job duration via Spring Actuator.',
        'Containerized with Docker + docker-compose (app, PostgreSQL, Kafka); wrote Kubernetes manifests and Helm charts with health probes and resource limits; built GitHub Actions CI/CD pipeline with JUnit 5/Mockito testing, Docker build, and registry push on every merge to main.',
      ],
      technologies: ['Java 17', 'Spring Boot 3.x', 'Spring AI', 'Apache Kafka', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitHub Actions'],
    },
    {
      icon: 'fa-database',
      name: 'AL3 Carrier Integration — Enterprise Data Pipeline',
      badge: 'Office Project',
      note: 'Proprietary — built at Webner Solutions for a US-based client',
      description:
        'Designed and maintained a production-grade REST API integration pipeline processing daily AL3 insurance carrier files — converting structured ACORD data to JSON and routing to AWS S3 — serving as the core data ingestion layer for downstream business operations.',
      diagram: diagrams.al3,
      details: [
        'Implemented event-driven scheduling, error handling, and CloudWatch monitoring across the pipeline; redesigned chunked processing architecture that eliminated large-payload Lambda timeout failures from near-100% to zero.',
        'Applied IAM Role-based access control and secure credential management across AWS-integrated workflows with multi-environment deployments across Sandbox, UAT, and Production.',
      ],
      technologies: ['REST APIs', 'AWS Lambda', 'S3', 'SQS', 'SES', 'EventBridge', 'JSON Processing', 'IAM'],
    },
    {
      icon: 'fa-rocket',
      name: 'SprintLens — Cloud-Native Project Management Platform',
      badge: 'In Progress',
      link: 'https://github.com/codewithnishu221',
      description:
        'A production-grade microservices-based project management platform built with Spring Boot, designed to manage teams, sprints, tasks, and real-time collaboration at scale.',
      diagram: diagrams.sprintlens,
      details: [
        'Implemented JWT-based stateless authentication with role-based access control (OWNER / ADMIN / MEMBER / VIEWER) using Spring Security and BCrypt password hashing.',
        'Built API Gateway with Spring Cloud Gateway as single entry point with dynamic routing and load balancing via Eureka Service Discovery.',
        'Designed schema-per-tenant multi-tenancy using PostgreSQL and Spring\'s AbstractRoutingDataSource for complete data isolation between organisations.',
        'Implemented database version control using Flyway migrations — every schema change tracked, versioned, and reversible.',
        'Built real-time collaboration features including live presence and board updates using WebSocket (STOMP protocol) and Redis Pub/Sub across multiple service instances.',
        'Integrated Apache Kafka as event backbone for async communication between services — task events trigger notifications, audit logs, and search indexing.',
        'Synced task data to Elasticsearch via Kafka consumer pipeline for full-text fuzzy search across tasks and projects.',
        'Integrated OpenAI API for AI-powered sprint planning suggestions with Resilience4j circuit breaker for fault tolerance.',
        'Implemented cross-cutting audit logging using Spring AOP — zero audit code in business services, all captured via aspect-oriented interceptors.',
        'Configured complete CI/CD pipeline with GitHub Actions — automated testing, Docker image build, and Kubernetes rolling deployment.',
      ],
      technologies: ['Java 21', 'Spring Boot 3.3', 'Spring Security', 'JWT', 'Spring Cloud Gateway', 'Eureka', 'PostgreSQL', 'Hibernate JPA', 'Flyway', 'Apache Kafka', 'WebSocket', 'Redis', 'Elasticsearch', 'OpenAI API', 'Resilience4j', 'Docker', 'Kubernetes', 'GitHub Actions', 'Prometheus', 'Grafana'],
    },
  ]

  return (
    <div className="page-container">
      <h1>Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  )
}

export default Projects
