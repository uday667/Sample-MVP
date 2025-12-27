# AgriConnect Setup Guide

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- **Docker Desktop** installed and running
- **Java 17+** (for local development)
- **Node.js 18+** (for frontend development)
- **Maven 3.8+** (for backend services)

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd dream-project
chmod +x scripts/*.sh
```

### 2. Start Everything
```bash
# Start infrastructure (PostgreSQL, Redis, Kafka, etc.)
docker-compose up -d

# Start all services (in separate terminals or use the script)
./scripts/start-dev.sh
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8080
- **Grafana Dashboard**: http://localhost:3000 (admin/admin123)
- **Kafka UI**: http://localhost:8080

---

## 🏗️ Architecture Overview

### Microservices Architecture
```
┌─────────────────┐    ┌─────────────────┐
│   React UI      │    │   Builder.io    │
│   (No-Code)     │    │   Integration   │
└─────────┬───────┘    └─────────────────┘
          │
          ▼
┌─────────────────────────────────────────┐
│         API Gateway (8080)               │
└─────────────────┬───────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    ▼             ▼             ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│  User   │  │  Task   │  │Payment  │
│Service  │  │Service  │  │Service  │
│ 8081    │  │ 8082    │  │ 8083    │
└────┬────┘  └────┬────┘  └────┬────┘
     │            │            │
     └────────────┼────────────┘
                  ▼
         ┌─────────────────┐
         │   Apache Kafka  │
         │   (Event Bus)   │
         └─────────────────┘
```

### Service Ports
| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | React Application |
| API Gateway | 8080 | Main API Entry Point |
| User Service | 8081 | User Management |
| Task Service | 8082 | Job Management |
| Payment Service | 8083 | Payment Processing |
| AI Service | 8084 | AI Integration |
| Notification Service | 8085 | Notifications |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache |
| Kafka | 9092 | Message Broker |
| Grafana | 3000 | Monitoring |
| Prometheus | 9090 | Metrics |

---

## 🛠️ Development Setup

### Backend Services (Spring Boot)

#### 1. User Service
```bash
cd services/user-service
mvn spring-boot:run
```

**Key Features:**
- User registration and authentication
- Profile management
- JWT token generation
- Kafka event publishing

**API Endpoints:**
- `POST /api/users/register` - Register new user
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}/profile` - Update user profile
- `GET /api/users/type/{userType}` - Get users by type

#### 2. Task Service
```bash
cd services/task-service
mvn spring-boot:run
```

**Key Features:**
- Job posting and management
- Task assignment
- Skill matching
- Status tracking

#### 3. Payment Service
```bash
cd services/payment-service
mvn spring-boot:run
```

**Key Features:**
- Payment processing
- Transaction management
- Payment method storage
- Refund handling

#### 4. AI Service
```bash
cd services/ai-service
mvn spring-boot:run
```

**Key Features:**
- OpenAI API integration
- Chatbot functionality
- Recommendation engine
- Natural language processing

#### 5. Notification Service
```bash
cd services/notification-service
mvn spring-boot:run
```

**Key Features:**
- Real-time notifications
- Email/SMS integration
- Notification preferences
- Kafka message consumption

### Frontend (React + TypeScript)

```bash
cd frontend
npm install
npm start
```

**Key Features:**
- Material-UI components
- Responsive design
- Form validation with React Hook Form
- API integration with Axios
- No-code friendly structure

**Pages:**
- HomePage - Landing page with features
- RegisterPage - User registration
- LoginPage - User authentication
- DashboardPage - Main dashboard
- TaskListPage - Browse available jobs
- TaskCreatePage - Create new jobs
- ProfilePage - User profile management
- ChatPage - AI assistant chat

---

## 🗄️ Database Schema

### User Service Database
```sql
-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    user_type VARCHAR(20) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User profiles table
CREATE TABLE user_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    bio TEXT,
    location VARCHAR(255),
    skills TEXT[],
    experience_years INTEGER,
    hourly_rate DECIMAL(10,2),
    availability_status VARCHAR(20) DEFAULT 'AVAILABLE'
);
```

### Task Service Database
```sql
-- Tasks table
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    farmer_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    task_type VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    estimated_hours INTEGER,
    hourly_rate DECIMAL(10,2),
    total_budget DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'OPEN',
    required_skills TEXT[],
    max_labourers INTEGER DEFAULT 1
);
```

---

## 🤖 AI Integration

### OpenAI API Setup
1. Get API key from OpenAI
2. Add to environment variables:
```bash
export OPENAI_API_KEY=your_api_key_here
```

### AI Features
- **Chatbot**: 24/7 agricultural assistance
- **Recommendations**: Smart matching between farmers and workers
- **Predictions**: Weather and market insights
- **Image Analysis**: Crop health detection (future feature)

### Example AI Service Usage
```java
@RestController
@RequestMapping("/api/ai")
public class AIController {
    
    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        // OpenAI API integration
        String response = openAIService.generateResponse(request.getMessage());
        return ResponseEntity.ok(new ChatResponse(response));
    }
}
```

---

## 📊 Monitoring & Observability

### Grafana Dashboards
- **System Metrics**: CPU, Memory, Disk usage
- **Application Metrics**: Request rates, response times
- **Kafka Metrics**: Message throughput, consumer lag
- **Database Metrics**: Connection pools, query performance

### Prometheus Metrics
- Spring Boot Actuator metrics
- Custom business metrics
- JVM metrics
- Database connection metrics

### Logging
- Centralized logging with ELK stack
- Structured JSON logs
- Log correlation IDs
- Error tracking and alerting

---

## 🚀 Deployment Options

### 1. Local Development
```bash
./scripts/start-dev.sh
```

### 2. Docker Compose
```bash
docker-compose up -d
```

### 3. Production Deployment
```bash
./scripts/deploy-prod.sh
```

### 4. Cloud Deployment
- **AWS**: ECS, EKS, or EC2
- **Google Cloud**: GKE or Cloud Run
- **Azure**: AKS or Container Instances
- **Railway**: One-click deployment
- **Render**: Automatic deployments

---

## 🔧 No-Code Integration

### Builder.io Integration
1. Install Builder.io SDK
2. Create visual components
3. Export to React components
4. Deploy with your app

### Appsmith Integration
1. Connect to your APIs
2. Create admin dashboards
3. Build internal tools
4. Deploy as embedded widgets

### Retool Integration
1. Connect to PostgreSQL
2. Create database admin panels
3. Build custom workflows
4. Embed in your application

---

## 🧪 Testing

### Backend Testing
```bash
# Run all tests
mvn test

# Run specific service tests
cd services/user-service
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Integration Testing
```bash
# Run integration tests
./scripts/test-integration.sh
```

### API Testing
- **Postman Collection**: Import from `/docs/postman/`
- **Swagger UI**: Available at `/swagger-ui.html`
- **OpenAPI Spec**: Available at `/v3/api-docs`

---

## 📚 API Documentation

### Swagger UI
- **API Gateway**: http://localhost:8080/swagger-ui.html
- **User Service**: http://localhost:8081/swagger-ui.html
- **Task Service**: http://localhost:8082/swagger-ui.html

### Postman Collection
Import the collection from `docs/postman/AgriConnect-API.postman_collection.json`

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Services Not Starting
```bash
# Check Docker status
docker ps

# Check logs
docker-compose logs [service-name]

# Restart services
docker-compose restart
```

#### 2. Database Connection Issues
```bash
# Check PostgreSQL status
docker-compose exec postgres pg_isready

# Reset database
docker-compose down -v
docker-compose up -d postgres
```

#### 3. Kafka Issues
```bash
# Check Kafka status
docker-compose exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --list

# Reset Kafka
docker-compose down -v
docker-compose up -d kafka
```

#### 4. Frontend Build Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules
npm install
```

### Health Checks
```bash
# Run health check script
./scripts/health-check.sh
```

---

## 🔐 Security

### Authentication
- JWT tokens for API authentication
- OAuth2 integration ready
- Password hashing with BCrypt
- Session management

### API Security
- CORS configuration
- Rate limiting
- Input validation
- SQL injection prevention

### Data Protection
- Encrypted database connections
- Secure environment variables
- HTTPS in production
- Data encryption at rest

---

## 📈 Performance Optimization

### Backend Optimization
- Connection pooling
- Caching with Redis
- Database indexing
- Async processing with Kafka

### Frontend Optimization
- Code splitting
- Lazy loading
- Image optimization
- Bundle analysis

### Infrastructure Optimization
- Load balancing
- Auto-scaling
- CDN integration
- Database replication

---

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

### Code Standards
- **Java**: Follow Spring Boot conventions
- **TypeScript**: Use ESLint and Prettier
- **Git**: Conventional commit messages
- **Documentation**: Update README and API docs

---

## 📞 Support

### Documentation
- **README**: This file
- **API Docs**: Swagger UI
- **Architecture**: `/docs/architecture/`
- **Deployment**: `/docs/deployment/`

### Community
- **GitHub Issues**: Report bugs and feature requests
- **Discussions**: Ask questions and share ideas
- **Wiki**: Community-contributed documentation

### Professional Support
- **Email**: support@agriconnect.com
- **Slack**: #agriconnect-support
- **Discord**: AgriConnect Community

---

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core microservices
- ✅ React frontend
- ✅ Basic AI integration
- ✅ Docker deployment

### Phase 2 (Next)
- 🔄 Advanced AI features
- 🔄 Mobile app (React Native)
- 🔄 Payment gateway integration
- 🔄 Real-time notifications

### Phase 3 (Future)
- 📅 Machine learning models
- 📅 IoT device integration
- 📅 Blockchain integration
- 📅 Multi-language support

---

**Happy Coding! 🌾**
