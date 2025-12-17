@echo off
echo 🐳 Setting up PostgreSQL with Docker for Nextn Rust Backend
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed or not in PATH.
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo ✅ Docker is available
echo.

echo Starting PostgreSQL container...
docker run -d ^
  --name nextn-postgres ^
  -e POSTGRES_DB=nextn ^
  -e POSTGRES_USER=postgres ^
  -e POSTGRES_PASSWORD=postgres ^
  -p 5432:5432 ^
  postgres:15

if %errorlevel% equ 0 (
    echo ✅ PostgreSQL container started successfully!
    echo.
    echo Database details:
    echo - Host: localhost
    echo - Port: 5432
    echo - Database: nextn
    echo - Username: postgres
    echo - Password: postgres
    echo.
    echo DATABASE_URL: postgresql://postgres:postgres@localhost:5432/nextn
    echo.
    echo Waiting for PostgreSQL to be ready...
    timeout /t 5 /nobreak >nul
    
    echo Testing connection...
    docker exec nextn-postgres psql -U postgres -d nextn -c "SELECT 'Database ready!' as status;"
    
    if %errorlevel% equ 0 (
        echo.
        echo ✅ PostgreSQL is ready for use!
        echo.
        echo To stop the container later: docker stop nextn-postgres
        echo To start it again: docker start nextn-postgres
        echo To remove it: docker rm -f nextn-postgres
    )
) else (
    echo ❌ Failed to start PostgreSQL container.
    echo This might be because:
    echo 1. Port 5432 is already in use
    echo 2. Container name 'nextn-postgres' already exists
    echo.
    echo Try: docker rm -f nextn-postgres
    echo Then run this script again.
)

echo.
pause