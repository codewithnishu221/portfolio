import { useState } from 'react'
import './ProjectsSection.css'

const projects = [
  {
    name: 'FSC-Bridge — AI-Powered Migration Engine',
    badge: 'Enterprise Data Migration',
    badgeColor: '#818cf8',
    badgeBg: 'rgba(99, 102, 241, 0.12)',
    link: 'https://github.com/codewithnishu221',
    details: [
      'Automated migration of Salesforce FSC managed package data to FSC Core using Java microservices, Spring Batch, Kafka, and Spring AI.',
      'Problem: Salesforce deprecated its official FSC migration tool — FSC Bridge fills the gap with automated, AI-assisted migration.',
      'My Role: Designed 5-service microservices architecture, built batch pipelines (50K+ records), integrated Spring AI + Gemini, implemented Kafka event streaming, OAuth 2.0, and CI/CD with Docker & K8s.',
    ],
    tech: ['Java 17', 'Spring Boot', 'Spring Batch', 'Apache Kafka', 'PostgreSQL', 'Docker', 'K8s', 'GitHub Actions'],
  },
  {
    name: 'AL3 Carrier Integration — Enterprise Data Pipeline',
    badge: 'Insurance Automation',
    badgeColor: '#fbbf24',
    badgeBg: 'rgba(251, 191, 36, 0.12)',
    details: [
      'Java Spring Boot platform that automates AL3 insurance carrier file processing — parses files into JSON and orchestrates via AWS event-driven architecture.',
      'Problem: Large AL3 files caused processing failures and delays — solution eliminated failures (100% → 0%) and Lambda timeouts.',
      'My Role: Built REST APIs & AL3-to-JSON transformation, integrated AWS S3/Lambda/SQS/EventBridge/SES/CloudWatch, re-architected large-file processing with JSON chunking.',
    ],
    tech: ['Java', 'Spring Boot', 'REST APIs', 'AWS Lambda', 'S3', 'SQS', 'EventBridge', 'CloudWatch'],
  },
  {
    name: 'SprintLens — Cloud-Native Project Management Platform',
    badge: 'In Progress',
    badgeColor: '#34d399',
    badgeBg: 'rgba(52, 211, 153, 0.12)',
    link: 'https://github.com/codewithnishu221',
    description: 'A production-grade microservices-based project management platform built with Spring Boot, designed to manage teams, sprints, tasks, and real-time collaboration at scale.',
    tech: ['Java 21', 'Spring Boot 3.3', 'Spring Cloud Gateway', 'Kafka', 'Redis', 'Elasticsearch', 'Docker', 'K8s'],
  },
]

function ProjectsSection() {
  return (
    <section id="projects" className="section projects-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p>Projects I've built and contributed to</p>
        </div>
        <div className="projects-list">
          {projects.map((project, i) => (
            <div key={i} className="project-card-new">
              <div className="project-card-top">
                <div className="project-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div className="project-card-info">
                  <div className="project-card-title-row">
                    <h3>{project.name}</h3>
                    <span className="project-badge-new" style={{ color: project.badgeColor, background: project.badgeBg, borderColor: project.badgeBg }}>
                      {project.badge}
                    </span>
                  </div>
                  {project.details ? (
                    <ul className="project-card-details">
                      {project.details.map((d, j) => <li key={j}>{d}</li>)}
                    </ul>
                  ) : (
                    <p className="project-card-desc">{project.description}</p>
                  )}
                </div>
              </div>
              <div className="project-card-tech">
                {project.tech.map((t, j) => (
                  <span key={j} className="project-tech-tag">{t}</span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
