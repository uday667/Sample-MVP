#!/bin/bash

# AgriConnect Health Check Script

echo "🔍 Performing AgriConnect Health Checks..."

# Check if services are running
services=("postgres" "redis" "kafka" "api-gateway" "user-service" "frontend")

for service in "${services[@]}"; do
    if docker ps | grep -q "$service"; then
        echo "✅ $service is running"
    else
        echo "❌ $service is not running"
    fi
done

# Check API endpoints
echo ""
echo "🌐 Checking API endpoints..."

# API Gateway health check
if curl -s http://localhost:8080/actuator/health > /dev/null; then
    echo "✅ API Gateway is responding"
else
    echo "❌ API Gateway is not responding"
fi

# User Service health check
if curl -s http://localhost:8081/actuator/health > /dev/null; then
    echo "✅ User Service is responding"
else
    echo "❌ User Service is not responding"
fi

# Frontend health check
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend is responding"
else
    echo "❌ Frontend is not responding"
fi

# Database connectivity check
echo ""
echo "🗄️ Checking database connectivity..."
if docker-compose exec postgres pg_isready -U agriconnect > /dev/null 2>&1; then
    echo "✅ PostgreSQL is ready"
else
    echo "❌ PostgreSQL is not ready"
fi

# Kafka connectivity check
echo ""
echo "📨 Checking Kafka connectivity..."
if docker-compose exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --list > /dev/null 2>&1; then
    echo "✅ Kafka is ready"
else
    echo "❌ Kafka is not ready"
fi

echo ""
echo "🏁 Health check complete!"
