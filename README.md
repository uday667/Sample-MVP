# AgriConnect - No-Code Agricultural Platform

A modern agricultural platform that connects farmers with laborers, built with a no-code-friendly architecture using React, Spring Boot microservices, and Kafka.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React UI      │    │   Builder.io    │    │   Appsmith      │
│   (No-Code)     │    │   Integration   │    │   Dashboards    │
└─────────┬───────┘    └─────────────────┘    └─────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API Gateway (Spring Cloud)                  │
└─────────────────┬───────────────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    ▼             ▼             ▼
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│  User   │  │  Task   │  │Payment  │  │   AI    │  │Notify   │
│Service  │  │Service  │  │Service  │  │Service  │  │Service  │
└────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘
     │            │            │            │            │
     └────────────┼────────────┼────────────┼────────────┘
                  ▼
         ┌─────────────────┐
         │   Apache Kafka  │
         │   (Event Bus)   │
         └─────────────────┘
                  │
         ┌─────────────────┐
         │   PostgreSQL    │
         │   Database      │
         └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- Docker & Docker Compose
- Maven 3.8+

### Local Development

1. **Start Infrastructure**
   ```bash
   docker-compose up -d
   ```

2. **Start Backend Services**
   ```bash
   ./start-services.sh
   ```

3. **Start Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 📁 Project Structure

```
dream-project/
├── services/                 # Spring Boot Microservices
│   ├── api-gateway/         # API Gateway
│   ├── user-service/        # User Management
│   ├── task-service/        # Job Management
│   ├── payment-service/     # Payment Processing
│   ├── ai-service/          # AI Integration
│   └── notification-service/ # Notifications
├── frontend/                # React Application
│   ├── src/
│   │   ├── components/      # Reusable Components
│   │   ├── pages/          # Page Components
│   │   ├── services/       # API Services
│   │   └── utils/          # Utilities
│   └── public/
├── shared/                  # Shared Libraries
├── docker/                  # Docker Configurations
├── docs/                    # Documentation
└── scripts/                 # Deployment Scripts
```

## 🛠️ Technology Stack

### Frontend (No-Code Friendly)
- **React 18** with TypeScript
- **Material-UI** for components
- **React Hook Form** for forms
- **Builder.io** integration ready
- **Appsmith** compatible APIs

### Backend
- **Spring Boot 3.x** Microservices
- **Spring Cloud Gateway** for API Gateway
- **Spring Security** for authentication
- **Spring Data JPA** for data access
- **Apache Kafka** for messaging

### AI & Analytics
- **OpenAI API** integration
- **LangChain4j** for AI workflows
- **TensorFlow** for ML models

### Infrastructure
- **Docker** & **Docker Compose**
- **PostgreSQL** database
- **Redis** for caching
- **Prometheus** & **Grafana** for monitoring

## 🔧 Development Tools

### No-Code Integration
- **Builder.io** - Visual page builder
- **Appsmith** - Internal tool builder
- **Retool** - Database admin panels
- **Whimsical** - System design

### Code Generation
- **Spring Initializr** - Service scaffolding
- **OpenAPI Generator** - API clients
- **Lombok** - Boilerplate reduction

## 📊 Features

### For Farmers
- Job posting and management
- Laborer matching and selection
- Payment processing
- AI-powered recommendations
- Real-time notifications

### For Laborers
- Profile management
- Job discovery and application
- Skill tracking
- Payment history
- AI chat assistant

### For Administrators
- Dashboard analytics
- User management
- System monitoring
- AI insights

## 🤖 AI Features

- **AgriHelp Chatbot** - 24/7 assistance
- **Smart Matching** - AI-powered job-laborer matching
- **Crop Analysis** - Image-based crop health detection
- **Predictive Analytics** - Weather and market predictions

## 🚀 Deployment

### Local Development
```bash
# Start all services
docker-compose up -d
./scripts/start-dev.sh
```

### Production Deployment
```bash
# Deploy to cloud
./scripts/deploy.sh
```

## 📈 Monitoring

- **Grafana Dashboards** - System metrics
- **Kafka UI** - Message monitoring
- **Application Logs** - Centralized logging
- **Health Checks** - Service status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
