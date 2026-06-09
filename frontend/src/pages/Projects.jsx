function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3em',
          color: '#818cf8',
          border: '1px solid rgba(99, 102, 241, 0.15)',
          flexShrink: 0,
        }}>
          <i className={`fas ${project.icon || 'fa-folder-open'}`}></i>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h3 style={{ margin: 0 }}>{project.name}</h3>
            {project.badge && (
              <span style={{
                fontSize: '0.75em',
                color: project.badgeColor || '#fbbf24',
                background: `${project.badgeColor || 'rgba(251, 191, 36, 0.1)'}`,
                padding: '2px 8px',
                borderRadius: '8px',
                border: `1px solid ${project.badgeColor || 'rgba(251, 191, 36, 0.2)'}`,
                opacity: 0.9,
              }}>
                {project.badge}
              </span>
            )}
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
              color: '#818cf8',
              fontSize: '0.85em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '4px',
              transition: 'color 0.3s',
            }}
              onMouseEnter={(e) => e.target.style.color = '#a855f7'}
              onMouseLeave={(e) => e.target.style.color = '#818cf8'}
            >
              <i className="fab fa-github"></i> View on GitHub →
            </a>
          )}
          {project.note && (
            <p style={{
              color: '#6b7280',
              fontSize: '0.8em',
              marginTop: '4px',
              fontStyle: 'italic',
            }}>
              {project.note}
            </p>
          )}
        </div>
      </div>
      <p>{project.description}</p>
      {project.details && (
        <ul style={{
          listStyle: 'none', padding: 0, marginBottom: '18px',
          position: 'relative', zIndex: 1,
        }}>
          {project.details.map((detail, idx) => (
            <li key={idx} style={{
              color: '#a0a0b8', padding: '4px 0', lineHeight: '1.6',
              display: 'flex', gap: '8px', fontSize: '0.9em',
            }}>
              <span style={{ color: '#818cf8' }}>▹</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="technologies">
        {project.technologies.map((tech, idx) => (
          <span key={idx} className="tech-badge">{tech}</span>
        ))}
      </div>
    </div>
  )
}

function Projects() {
  const projects = [
    {
      icon: 'fa-cogs',
      name: 'FSC-Bridge — AI-Powered Migration Engine',
      badge: 'Open Source',
      badgeColor: 'rgba(99, 102, 241, 0.15)',
      link: 'https://github.com/codewithnishu221',
      description:
        'A production-grade, open-source microservices platform for intelligent enterprise data migration. Built with Java 17 and Spring Boot 3.x using a 5-module Maven multi-module architecture (core, connector, mapper, audit, web) — each service independently deployable and testable.',
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
      badgeColor: 'rgba(251, 191, 36, 0.15)',
      note: 'Proprietary — built at Webner Solutions for a US-based client',
      description:
        'Designed and maintained a production-grade REST API integration pipeline processing daily AL3 insurance carrier files — converting structured ACORD data to JSON and routing to AWS S3 — serving as the core data ingestion layer for downstream business operations processing 500+ records daily.',
      details: [
        'Implemented event-driven scheduling, error handling, and CloudWatch monitoring across the pipeline; redesigned chunked processing architecture that eliminated large-payload Lambda timeout failures from near-100% to zero.',
        'Applied IAM Role-based access control, secure credential management, and OWASP security standards across AWS-integrated workflows with multi-environment deployments across Sandbox, UAT, and Production.',
      ],
      technologies: ['REST APIs', 'AWS Lambda', 'S3', 'SQS', 'SES', 'EventBridge', 'JSON Processing', 'IAM'],
    },
    {
      icon: 'fa-rocket',
      name: 'SprintLens — Cloud-Native Project Management Platform',
      badge: 'In Progress',
      badgeColor: 'rgba(52, 211, 153, 0.15)',
      link: 'https://github.com/codewithnishu221',
      description:
        'A production-grade microservices-based project management platform built with Spring Boot, designed to manage teams, sprints, tasks, and real-time collaboration at scale.',
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
