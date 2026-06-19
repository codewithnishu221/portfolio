function Experience() {
  const experiences = [
    {
      title: 'Software Engineer',
      company: 'Webner Solutions Pvt Ltd.',
      location: 'Mohali, Punjab, IN',
      duration: 'July 2024 – Present',
      points: [
        'Designed and integrated a REST API-based AL3 (ACORD) file ingestion pipeline — parsing carrier files into JSON and routing structured data to AWS S3 — using Lambda, SQS, SES, EventBridge, and CloudWatch for event-driven automation and monitoring.',
        'Diagnosed and resolved critical Lambda timeout failures on large daily payloads; re-architected solution with chunked JSON processing, UUID-named S3 folder storage, and event-driven scheduling — reducing large-file failures from near-100% to zero.',
        'Applied IAM Role-based access control and secure credential management across AWS-integrated workflows; maintained production deployments across Sandbox, UAT, and Production environments.',
        'Collaborated directly with US-based clients to gather requirements, translated business needs into technical solutions, and guided team members on implementation — delivering production-ready features in Git-based Agile sprints with code reviews.',
      ],
    },
  ]

  return (
    <div className="page-container">
      <h1>Experience</h1>
      <div className="experience-list">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.title}</h3>
            <p className="company">
              <i className="fas fa-building"></i>
              {exp.company}
            </p>
            <p className="duration">
              <i className="fas fa-map-marker-alt"></i>
              {exp.location} &nbsp;|&nbsp;
              <i className="far fa-calendar-alt"></i>
              {exp.duration}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '12px' }}>
              {exp.points.map((point, idx) => (
                <li key={idx} style={{
                  color: '#a0a0b8',
                  padding: '8px 0',
                  lineHeight: '1.7',
                  display: 'flex',
                  gap: '10px',
                  borderBottom: idx < exp.points.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none'
                }}>
                  <span style={{ color: '#818cf8', flexShrink: 0 }}>▹</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experience
