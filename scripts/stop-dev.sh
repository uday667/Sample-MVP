#!/bin/bash

# AgriConnect Development Stop Script

echo "🛑 Stopping AgriConnect Development Environment..."

# Stop frontend
echo "⚛️ Stopping React frontend..."
pkill -f "npm start"

# Stop Spring Boot services
echo "☕ Stopping Spring Boot services..."
pkill -f "spring-boot:run"

# Stop infrastructure services
echo "📦 Stopping infrastructure services..."
docker-compose down

echo "✅ All services stopped!"
