#!/bin/bash

# AgriConnect Production Deployment Script

echo "🚀 Starting AgriConnect Production Deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Set environment variables
export COMPOSE_PROJECT_NAME=agriconnect
export ENVIRONMENT=production

# Create production environment file
cat > .env.production << EOF
POSTGRES_PASSWORD=agriconnect_prod_2024
REDIS_PASSWORD=redis_prod_2024
KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092
GRAFANA_ADMIN_PASSWORD=admin_prod_2024
EOF

# Build and start infrastructure
echo "📦 Building and starting infrastructure services..."
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d postgres redis zookeeper kafka prometheus grafana kafka-ui

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Build Spring Boot services
echo "☕ Building Spring Boot services..."

# Build API Gateway
echo "🌐 Building API Gateway..."
cd services/api-gateway
mvn clean package -DskipTests
docker build -t agriconnect/api-gateway:latest .
cd ../..

# Build User Service
echo "👤 Building User Service..."
cd services/user-service
mvn clean package -DskipTests
docker build -t agriconnect/user-service:latest .
cd ../..

# Build Task Service
echo "📋 Building Task Service..."
cd services/task-service
mvn clean package -DskipTests
docker build -t agriconnect/task-service:latest .
cd ../..

# Build Payment Service
echo "💳 Building Payment Service..."
cd services/payment-service
mvn clean package -DskipTests
docker build -t agriconnect/payment-service:latest .
cd ../..

# Build AI Service
echo "🤖 Building AI Service..."
cd services/ai-service
mvn clean package -DskipTests
docker build -t agriconnect/ai-service:latest .
cd ../..

# Build Notification Service
echo "🔔 Building Notification Service..."
cd services/notification-service
mvn clean package -DskipTests
docker build -t agriconnect/notification-service:latest .
cd ../..

# Build Frontend
echo "⚛️ Building React Frontend..."
cd frontend
npm install
npm run build
docker build -t agriconnect/frontend:latest .
cd ..

# Start all services
echo "🚀 Starting all services..."
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Wait for all services to start
echo "⏳ Waiting for all services to start..."
sleep 60

# Run database migrations
echo "🗄️ Running database migrations..."
docker-compose exec postgres psql -U agriconnect -d agriconnect -f /docker-entrypoint-initdb.d/init.sql

# Health check
echo "🔍 Performing health checks..."
./scripts/health-check.sh

# Display service URLs
echo ""
echo "🎉 AgriConnect Production Deployment Complete!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🌐 API Gateway: http://localhost:8080"
echo "📊 Grafana: http://localhost:3000 (admin/admin_prod_2024)"
echo "📈 Prometheus: http://localhost:9090"
echo "🔍 Kafka UI: http://localhost:8080"
echo ""
echo "🛑 To stop all services, run: docker-compose down"
echo "📊 To view logs, run: docker-compose logs -f [service-name]"
echo ""
