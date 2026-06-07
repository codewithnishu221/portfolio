import { useState, useEffect, useRef } from 'react'

function SkillBar({ name, level }) {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 300)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [level])

  return (
    <div ref={ref} className="skill-bar-container">
      <div className="skill-bar-label">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: `${width}%` }}></div>
      </div>
    </div>
  )
}

const skillIcons = {
  'Languages & Frameworks': 'fa-code',
  'Cloud & Infrastructure': 'fa-cloud',
  'Databases & Tools': 'fa-database',
}

function Skills() {
  const skills = [
    {
      category: 'Languages & Frameworks',
      items: [
        { name: 'Java 17', level: 90 },
        { name: 'Spring Boot 3.x', level: 88 },
        { name: 'Spring Security', level: 82 },
        { name: 'Spring AI', level: 78 },
        { name: 'REST APIs', level: 92 },
        { name: 'Hibernate/JPA', level: 85 },
        { name: 'JavaScript', level: 75 },
        { name: 'SQL', level: 80 },
        { name: 'Maven', level: 85 },
      ],
    },
    {
      category: 'Cloud & Infrastructure',
      items: [
        { name: 'AWS (S3, Lambda, SQS, SES)', level: 85 },
        { name: 'AWS (EventBridge, CloudWatch, IAM)', level: 80 },
        { name: 'Docker', level: 78 },
        { name: 'Kubernetes', level: 70 },
        { name: 'GitHub Actions CI/CD', level: 82 },
        { name: 'Apache Kafka', level: 75 },
      ],
    },
    {
      category: 'Databases & Tools',
      items: [
        { name: 'PostgreSQL', level: 82 },
        { name: 'H2 Database', level: 80 },
        { name: 'Git', level: 90 },
        { name: 'JUnit 5 / Mockito', level: 85 },
        { name: 'OpenAPI / Swagger', level: 80 },
        { name: 'Micrometer / Actuator', level: 75 },
        { name: 'Jasypt Encryption', level: 72 },
        { name: 'IntelliJ / VS Code', level: 90 },
      ],
    },
  ]

  return (
    <div className="page-container">
      <h1>Skills</h1>
      <div className="skills-grid">
        {skills.map((skillGroup, index) => (
          <div key={index} className="skill-category">
            <h3>
              <i className={`fas ${skillIcons[skillGroup.category]}`}></i>
              {skillGroup.category}
            </h3>
            {skillGroup.items.map((skill, idx) => (
              <SkillBar key={idx} name={skill.name} level={skill.level} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
