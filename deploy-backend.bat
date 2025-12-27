@echo off
REM Backend Deployment Script for Windows
echo 🚀 Deploying Ignitia Backend with Docker...

REM Build the Docker image
echo 📦 Building Docker image...
cd rust-backend
docker build -t ignitia-backend:latest .

REM Tag for deployment (replace with your registry)
echo 🏷️ Tagging image...
docker tag ignitia-backend:latest your-registry/ignitia-backend:latest

REM Push to registry (uncomment when ready)
REM echo 📤 Pushing to registry...
REM docker push your-registry/ignitia-backend:latest

REM Run locally for testing
echo 🧪 Running container locally for testing...
docker run -d ^
  --name ignitia-backend-test ^
  -p 8081:8081 ^
  -v %cd%/data:/app/data ^
  --env-file .env.production ^
  ignitia-backend:latest

echo ✅ Backend deployed! Check http://localhost:8081/health
echo 📝 Container name: ignitia-backend-test
echo 🛑 To stop: docker stop ignitia-backend-test
echo 🗑️ To remove: docker rm ignitia-backend-test

cd ..