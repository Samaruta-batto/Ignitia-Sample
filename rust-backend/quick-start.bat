@echo off
echo 🚀 Quick Start - Nextn Rust Backend
echo.

echo Installing sqlx-cli (this may take a few minutes)...
cargo install sqlx-cli --no-default-features --features sqlite

echo.
echo Building the project...
cargo build

echo.
echo Setting up SQLite database...
if not exist nextn.db (
    echo Creating database file...
    type nul > nextn.db
)

echo.
echo Running migrations...
sqlx migrate run --source migrations-sqlite

echo.
echo ✅ Setup complete! Starting the server...
echo.
echo The backend is running on: http://localhost:8080
echo.
echo Test endpoints:
echo - Health check: http://localhost:8080/health
echo - Events: http://localhost:8080/api/events
echo.
echo Press Ctrl+C to stop the server.
echo.

cargo run