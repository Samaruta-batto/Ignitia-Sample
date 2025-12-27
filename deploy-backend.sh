#!/bin/bash

# Backend Deployment Script
echo "🚀 Deploying Ignitia Backend with Docker..."

# Build the Docker image
echo "📦 Building Docker image..."
cd rust-backend
docker build -t ignitia-backend:latest .

# Tag for deployment (replace with your registry)
echo "🏷️ Tagging image..."
docker tag ignitia-backend:latest your-registry/ignitia-backend:latest

# Push to registry (uncomment when ready)
# echo "📤 Pushing to registry..."
# docker push your-registry/ignitia-backend:latest

# Run locally for testing
echo "🧪 Running container locally for testing..."
docker run -d \
  --name ignitia-backend-test \
  -p 8081:8081 \
  -v $(pwd)/data:/app/data \
  --env-file .env.production \
  ignitia-backend:latest

echo "✅ Backend deployed! Check http://localhost:8081/health"
echo "📝 Container name: ignitia-backend-test"
echo "🛑 To stop: docker stop ignitia-backend-test"
echo "🗑️ To remove: docker rm ignitia-backend-test"