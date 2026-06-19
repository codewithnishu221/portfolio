import './SkillsSection.css'

const skills = [
  {
    category: 'Backend Development',
    icon: 'server',
    desc: 'Building secure, scalable backend systems',
    items: ['Java 17/21', 'Spring Boot 3.x', 'Spring Security', 'REST APIs', 'Hibernate/JPA', 'Kafka', 'Microservices'],
  },
  {
    category: 'Frontend Development',
    icon: 'code',
    desc: 'Creating modern, responsive user interfaces',
    items: ['React.js', 'JavaScript ES6+', 'HTML5/CSS3', 'Responsive UI'],
  },
  {
    category: 'Database & Caching',
    icon: 'database',
    desc: 'Designing efficient data storage and caching',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'H2 Database', 'Elasticsearch'],
  },
  {
    category: 'DevOps & Cloud',
    icon: 'cloud',
    desc: 'Streamlining deployment and cloud infrastructure',
    items: ['AWS (Lambda, S3, SQS, SES, CloudWatch, IAM)', 'Docker', 'Kubernetes', 'Git/GitHub', 'CI/CD', 'Linux'],
  },
]

const iconMap = {
  server: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  code: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  database: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  cloud: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
    </svg>
  ),
}

function SkillsSection() {
  return (
    <section id="skills" className="section skills-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Skills & Technologies</h2>
          <p>Technologies I work with on a daily basis</p>
        </div>
        <div className="skills-grid">
          {skills.map((group, i) => (
            <div key={i} className="skill-group">
              <div className="skill-group-header">
                <div className="skill-group-icon">{iconMap[group.icon]}</div>
                <div>
                  <h3>{group.category}</h3>
                  <p className="skill-group-desc">{group.desc}</p>
                </div>
              </div>
              <div className="skill-tags">
                {group.items.map((item, j) => (
                  <span key={j} className="skill-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
