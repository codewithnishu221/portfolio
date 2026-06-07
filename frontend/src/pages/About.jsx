function About() {
  const highlights = [
    { icon: 'fa-briefcase', title: '2+ Years Experience', desc: 'Building enterprise integrations with REST APIs, AWS, and event-driven architectures' },
    { icon: 'fa-code-fork', title: 'Open Source', desc: 'Creator of FSC-Bridge — a production-grade microservices migration engine' },
    { icon: 'fa-graduation-cap', title: 'MCA (GPA: 8.5)', desc: 'Master of Computer Applications from Chandigarh Group of Colleges' },
  ]

  return (
    <div className="page-container">
      <h1>About Me</h1>
      <section className="about-content">
        <p>
          Software Engineer with ~2 years of professional experience building enterprise-grade 
          integrations using REST APIs, AWS services (S3, Lambda, SQS, SES, EventBridge), and 
          event-driven architectures. Currently engineering{' '}
          <strong style={{ color: '#818cf8' }}>FSC-Bridge</strong>, a production-grade 
          open-source microservices system in Java 17, Spring Boot 3.x, Apache Kafka, and PostgreSQL.
        </p>
        <p>
          Experienced in multi-environment deployments (dev/prod), CI/CD pipelines, Docker, 
          Kubernetes, and Agile delivery. Strong foundation in software design patterns, 
          secure coding practices, and scalable backend architecture.
        </p>
      </section>
      <div className="about-highlights">
        {highlights.map((item, index) => (
          <div key={index} className="highlight-card">
            <i className={`fas ${item.icon}`}></i>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '60px' }}>
        <h2 style={{ fontSize: '1.8em', marginBottom: '24px', color: '#e0e0e0' }}>Education</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="experience-item">
            <h3>Master of Computer Applications (MCA)</h3>
            <p className="company">
              <i className="fas fa-university"></i>
              Chandigarh Group of Colleges, Landran, Mohali
            </p>
            <p className="duration">
              <i className="far fa-calendar-alt"></i>
              2021 – 2023 &nbsp;|&nbsp; <strong>GPA: 8.5</strong>
            </p>
          </div>
          <div className="experience-item">
            <h3>B.Sc. Information Technology</h3>
            <p className="company">
              <i className="fas fa-university"></i>
              Motherhood University, Roorkee
            </p>
            <p className="duration">
              <i className="far fa-calendar-alt"></i>
              2017 – 2020 &nbsp;|&nbsp; <strong>GPA: 8.47</strong>
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '60px' }}>
        <h2 style={{ fontSize: '1.8em', marginBottom: '24px', color: '#e0e0e0' }}>Achievements & Certifications</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="experience-item">
            <h3>Agentforce Certification</h3>
            <p className="company">
              <i className="fas fa-certificate"></i>
              Salesforce (Self-directed learning, 2025)
            </p>
          </div>
          <div className="experience-item">
            <h3>Good Performer Award</h3>
            <p className="company">
              <i className="fas fa-trophy"></i>
              Webner Solutions — Two consecutive cycles (Apr 2025 – Oct 2025 & Oct 2025 – Apr 2026)
            </p>
            <p className="duration">Awarded for consistent high-quality delivery</p>
          </div>
          <div className="experience-item">
            <h3>Cash Prize — Table Tennis Tournament</h3>
            <p className="company">
              <i className="fas fa-medal"></i>
              Demonstrating teamwork and collaboration beyond the workplace
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
