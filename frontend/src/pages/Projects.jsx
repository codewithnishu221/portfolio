function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
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
        }}>
          <i className="fas fa-folder-open"></i>
        </div>
        <div>
          <h3 style={{ margin: 0 }}>{project.name}</h3>
          {project.badge && (
            <span style={{
              fontSize: '0.75em',
              color: '#fbbf24',
              background: 'rgba(251, 191, 36, 0.1)',
              padding: '2px 8px',
              borderRadius: '8px',
              border: '1px solid rgba(251, 191, 36, 0.2)',
            }}>
              {project.badge}
            </span>
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
      name: 'FSC-Bridge — AI-Powered Migration Engine',
      badge: 'Open Source · In Progress',
      description:
        'A production-grade microservices application for intelligent data migration, built with Java 17, Spring Boot 3.x, and a 5-module Maven multi-module architecture (core, connector, mapper, audit, web) — each service independently deployable and testable.',
      details: [
        'Integrated Spring AI with Google Gemini LLM for intelligent field mapping suggestions, natural language migration job parsing, and AI-generated migration summaries; implemented Apache Kafka event streaming (3 topics, producer/consumer pipeline) for async, decoupled migration progress events.',
        'Built Spring Batch chunk-processing pipeline with configurable chunk size, fault tolerance, skip logic, and PostgreSQL job state persistence — enabling pause/resume for 50,000+ record migrations; added pre-flight validation engine with 6 automated checks including API governor limit estimation.',
        'Secured credentials with Jasypt AES-256 encryption and custom Logback MaskingPatternLayout to redact tokens/secrets from logs; added Micrometer custom metrics tracking p50/p95/p99 job duration via Spring Actuator.',
        'Containerized with Docker + docker-compose (app, PostgreSQL, Kafka); wrote Kubernetes manifests and Helm charts with health probes and resource limits; built GitHub Actions CI/CD pipeline with JUnit 5/Mockito testing, Docker build, and registry push on every merge to main.',
      ],
      technologies: ['Java 17', 'Spring Boot 3.x', 'Spring AI', 'Apache Kafka', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitHub Actions'],
    },
    {
      name: 'AL3 Carrier Integration — Enterprise Data Pipeline',
      description:
        'Built and maintained a production REST API integration pipeline processing daily AL3 insurance carrier files — converting structured ACORD data to JSON and routing to AWS S3 — serving as the core data ingestion layer for downstream business operations.',
      details: [
        'Implemented event-driven scheduling, error handling, and CloudWatch monitoring across the pipeline; redesigned chunked processing architecture that eliminated large-payload failures and enabled 500+ successful downstream records created.',
      ],
      technologies: ['REST APIs', 'AWS Lambda', 'S3', 'SQS', 'SES', 'EventBridge', 'JSON Processing', 'IAM'],
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
