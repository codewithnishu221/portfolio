# Backend README

Spring Boot portfolio backend with Spring AI integration.

## 🚀 Setup

**Requirements:**
- Java 17+
- Maven 3.6+
- OpenAI API Key

```bash
# Set API key
export OPENAI_API_KEY=sk-your-key

# Build
mvn clean install

# Run
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

## 📂 Structure

- `config/`: Configuration classes (CORS, etc.)
- `controller/`: REST endpoints
- `service/`: Business logic
- `entity/`: JPA entities
- `dto/`: Data Transfer Objects
- `repository/`: Database access

## 🔌 API Endpoints

### Contact
- `POST /api/contact` - Submit contact form
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!"
  }
  ```

### AI Chat
- `POST /api/ai/chat` - Chat with AI
  ```json
  {
    "message": "What is your experience?"
  }
  ```

## 🗄️ Database

H2 in-memory database

Console: `http://localhost:8080/h2-console`
- URL: `jdbc:h2:mem:testdb`
- User: `sa`
- Password: (blank)

## ⚙️ Configuration

Edit `src/main/resources/application.yml`:
- Change database
- Update Spring AI model
- Configure CORS

## 📦 Dependencies

- Spring Boot Web
- Spring Data JPA
- Spring AI OpenAI
- H2 Database
- Lombok
