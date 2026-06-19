import './ExperienceSection.css'

function ExperienceSection() {
  const experiences = [
    {
      title: 'Software Engineer',
      company: 'Webner Solutions Pvt Ltd.',
      location: 'Mohali, Punjab, IN',
      period: 'July 2024 – Present',
      responsibilities: [
        'Designed AL3 (ACORD) REST API ingestion pipeline — parsing carrier files to JSON, routing to AWS S3 via Lambda, SQS, SES, EventBridge, CloudWatch',
        'Resolved critical Lambda timeout failures — re-architected with chunked JSON processing & event-driven scheduling, reducing failures from ~100% to zero',
        'Implemented IAM RBAC and secure credential management across AWS workflows; managed Sandbox, UAT, Production deployments',
        'Collaborated with US-based clients on requirements, translated business needs into technical solutions, guided team delivery in Agile sprints',
      ],
      impacts: [
        'Zero large-file failures after re-architecture',
        'Multi-environment CI/CD with IAM security',
        'Direct client collaboration & delivery',
      ],
    },
  ]

  return (
    <section id="experience" className="section experience-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Experience</h2>
          <p>My professional journey</p>
        </div>
        <div className="experience-content">
          {experiences.map((exp, i) => (
            <div key={i} className="exp-card">
              <div className="exp-card-top">
                <div className="exp-card-left">
                  <div className="exp-title-row">
                    <div className="exp-card-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                      </svg>
                    </div>
                    <div>
                      <h3>{exp.title}</h3>
                      <p className="exp-company">{exp.company}</p>
                    </div>
                  </div>
                  <p className="exp-location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {exp.location}
                  </p>
                </div>
                <div className="exp-card-right">
                  <span className="exp-period-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {exp.period}
                  </span>
                </div>
              </div>
              <div className="exp-card-body">
                <div className="exp-responsibilities">
                  <h4 className="exp-subheading">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                    </svg>
                    Key Responsibilities
                  </h4>
                  <ul className="exp-points">
                    {exp.responsibilities.map((point, j) => (
                      <li key={j}>
                        <span className="exp-point-marker">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="exp-impacts">
                  <h4 className="exp-subheading">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Impact
                  </h4>
                  <ul className="exp-impact-list">
                    {exp.impacts.map((impact, j) => (
                      <li key={j}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                        </svg>
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
