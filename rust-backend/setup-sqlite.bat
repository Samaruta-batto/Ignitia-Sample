@echo off
echo 🦀 Setting up Nextn Rust Backend with SQLite
echo.

echo Step 1: Installing sqlx-cli...
cargo install sqlx-cli --no-default-features --features sqlite

echo.
echo Step 2: Building the project...
cargo build

echo.
echo Step 3: Running database migrations...
sqlx migrate run --source migrations-sqlite

echo.
echo Step 4: Testing the setup...
echo Starting the backend server...
echo.
echo ✅ Setup complete!
echo.
echo The backend will start on http://localhost:8080
echo Press Ctrl+C to stop the server when you're done testing.
echo.

cargo run