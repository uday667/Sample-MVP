#!/bin/bash

# AgriConnect Development Startup Script

echo "🚀 Starting AgriConnect Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start infrastructure services
echo "📦 Starting infrastructure services..."
docker-compose up -d postgres redis zookeeper kafka prometheus grafana kafka-ui

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

# Start backend services
echo "☕ Starting Spring Boot services..."

# Start API Gateway
echo "🌐 Starting API Gateway..."
cd services/api-gateway
mvn spring-boot:run &
API_GATEWAY_PID=$!

# Start User Service
echo "👤 Starting User Service..."
cd ../user-service
mvn spring-boot:run &
USER_SERVICE_PID=$!

# Start Task Service
echo "📋 Starting Task Service..."
cd ../task-service
mvn spring-boot:run &
TASK_SERVICE_PID=$!

# Start Payment Service
echo "💳 Starting Payment Service..."
cd ../payment-service
mvn spring-boot:run &
PAYMENT_SERVICE_PID=$!

# Start AI Service
echo "🤖 Starting AI Service..."
cd ../ai-service
mvn spring-boot:run &
AI_SERVICE_PID=$!

# Start Notification Service
echo "🔔 Starting Notification Service..."
cd ../notification-service
mvn spring-boot:run &
NOTIFICATION_SERVICE_PID=$!

# Go back to root directory
cd ../..

# Start frontend
echo "⚛️ Starting React frontend..."
cd frontend
npm install
npm start &
FRONTEND_PID=$!

# Wait for all services to start
echo "⏳ Waiting for all services to start..."
sleep 60

# Display service URLs
echo ""
echo "🎉 AgriConnect is now running!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🌐 API Gateway: http://localhost:8080"
echo "📊 Grafana: http://localhost:3000 (admin/admin123)"
echo "📈 Prometheus: http://localhost:9090"
echo "🔍 Kafka UI: http://localhost:8080"
echo ""
echo "🛑 To stop all services, run: ./scripts/stop-dev.sh"
echo ""

# Save PIDs for cleanup
echo "$API_GATEWAY_PID $USER_SERVICE_PID $TASK_SERVICE_PID $PAYMENT_SERVICE_PID $AI_SERVICE_PID $NOTIFICATION_SERVICE_PID $FRONTEND_PID" > .pids

# Keep script running
wait
