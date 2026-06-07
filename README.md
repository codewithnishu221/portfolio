# Portfolio Website - Full Stack Setup

A modern full-stack portfolio website built with **React + Vite** (frontend) and **Java Spring Boot + Spring AI** (backend).

## 📋 Project Structure

```
portfolio/
├── frontend/          # React + Vite frontend application
│   ├── src/
│   │   ├── pages/     # Home, About, Skills, Experience, Projects, Contact, AIAssistant
│   │   ├── components/# Navigation component
│   │   ├── services/  # API client
│   │   └── styles/    # CSS files
│   ├── package.json
│   └── vite.config.js
└── backend/           # Spring Boot backend application
    ├── src/main/java/com/portfolio/
    │   ├── config/    # CORS and other configurations
    │   ├── controller/# REST API endpoints
    │   ├── entity/    # JPA entities
    │   ├── service/   # Business logic
    │   ├── dto/       # Data Transfer Objects
    │   └── repository/# Database access
    ├── pom.xml
    └── application.yml
```

## 🚀 Quick Start

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:3000

### Backend Setup

**Prerequisites:**
- Java 17+
- Maven 3.6+
- OpenAI API Key (for Spring AI)

```bash
cd backend
# Set OpenAI API key
export OPENAI_API_KEY=sk-your-api-key-here

# Build and run
mvn clean install
mvn spring-boot:run
```

Backend runs on: http://localhost:8080

## 📄 Features

### Frontend Pages
- **Home**: Welcome and introduction
- **About Me**: Personal information and background
- **Skills**: Technical skills organized by category
- **Experience**: Work experience and history
- **Projects**: Portfolio projects showcase
- **Contact Form**: Submit contact messages (saves to database)
- **AI Assistant**: Chat interface powered by Spring AI

### Backend APIs
- `POST /api/contact` - Submit contact form
- `POST /api/ai/chat` - Chat with AI assistant
- `GET /h2-console` - H2 database console (dev only)

## ⚙️ Configuration

### Backend (application.yml)
- Database: H2 (in-memory)
- Spring AI: OpenAI GPT-3.5-turbo
- CORS: Enabled for http://localhost:3000

To use a production database (PostgreSQL, MySQL), update `application.yml`:

```yaml
spring.datasource.url=jdbc:postgresql://localhost:5432/portfolio
spring.datasource.username=postgres
spring.datasource.password=your-password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

### Frontend (vite.config.js)
- Proxy configured to route `/api/*` requests to backend
- Development server on port 3000

## 🔑 Environment Variables

**Backend:**
```bash
OPENAI_API_KEY=sk-your-openai-api-key
```

Create a `.env` file in the backend directory or set via system environment.

## 🛠️ Development

### Adding a New Page (Frontend)
1. Create a new file in `src/pages/`
2. Add route in `App.jsx`
3. Add navigation link in `Navigation.jsx`

### Adding a New API Endpoint (Backend)
1. Create DTO in `dto/` package
2. Create Controller in `controller/` package
3. Create Service in `service/` package
4. Add repository if needed in `repository/` package

## 📦 Dependencies

### Frontend
- React 18.2.0
- React Router DOM 6.20.0
- Vite 5.0.0
- Axios 1.6.0

### Backend
- Spring Boot 3.2.0
- Spring AI 0.8.1
- Spring Data JPA
- H2 Database
- Lombok

## 🗄️ Database

### H2 Console
Access the H2 console at: `http://localhost:8080/h2-console`
- URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (leave blank)

### Tables
- `contact_messages`: Stores contact form submissions

## 📝 Notes

- CORS is configured to allow requests from `http://localhost:3000`
- Spring AI requires a valid OpenAI API key
- H2 database is in-memory (data resets on restart)
- For production, replace H2 with a persistent database

## 🐛 Troubleshooting

**Frontend can't reach backend:**
- Ensure backend is running on port 8080
- Check CORS configuration in `CorsConfig.java`
- Verify API endpoint in `frontend/src/services/api.js`

**Spring AI not working:**
- Verify OpenAI API key is set correctly
- Check application.yml has correct model name
- Ensure internet connection for API calls

**Port already in use:**
- Frontend: Change port in `vite.config.js`
- Backend: Change port in `application.yml` or via `-Dserver.port=9090`

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Spring AI Guide](https://spring.io/projects/spring-ai)
- [OpenAI API Docs](https://platform.openai.com/docs)

## 📄 License

This project is open source and available under the MIT License.
