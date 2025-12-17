@echo off
echo 🦀 Setting up Rust backend...

REM Check if Rust is installed
cargo --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Rust is not installed. Please install Rust first:
    echo    https://rustup.rs/
    exit /b 1
)

REM Check if PostgreSQL is available
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL is not installed. Please install PostgreSQL first.
    exit /b 1
)

REM Install sqlx-cli if not present
sqlx --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing sqlx-cli...
    cargo install sqlx-cli --no-default-features --features postgres
)

REM Copy environment file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ⚠️  Please edit .env with your database credentials
)

REM Create database if it doesn't exist
echo 🗄️  Setting up database...
createdb nextn 2>nul || echo Database 'nextn' already exists

REM Run migrations
echo 🔄 Running database migrations...
sqlx migrate run

echo ✅ Setup complete!
echo.
echo To start the development server:
echo   cargo run
echo.
echo To run tests:
echo   cargo test
echo.
echo The server will be available at http://localhost:8080