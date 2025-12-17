@echo off
echo 🗄️ Setting up PostgreSQL database for Nextn Rust Backend
echo.

echo Step 1: Testing PostgreSQL connection...
echo Please enter your PostgreSQL password when prompted.
echo.

REM Try to connect to PostgreSQL
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -h localhost -U postgres -c "SELECT version();"

if %errorlevel% neq 0 (
    echo.
    echo ❌ Could not connect to PostgreSQL.
    echo.
    echo Please check:
    echo 1. PostgreSQL service is running
    echo 2. You know the postgres user password
    echo 3. PostgreSQL is accepting connections on localhost:5432
    echo.
    echo To reset postgres password:
    echo 1. Open pgAdmin 4
    echo 2. Right-click on PostgreSQL server
    echo 3. Properties ^> Definition ^> Password
    echo 4. Set a new password (e.g., "postgres")
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ PostgreSQL connection successful!
echo.

echo Step 2: Creating nextn database...
"C:\Program Files\PostgreSQL\16\bin\createdb.exe" -h localhost -U postgres nextn

if %errorlevel% equ 0 (
    echo ✅ Database 'nextn' created successfully!
) else (
    echo ℹ️ Database 'nextn' might already exist, continuing...
)

echo.
echo Step 3: Testing database connection...
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -h localhost -U postgres -d nextn -c "SELECT 'Database connection successful!' as status;"

if %errorlevel% equ 0 (
    echo.
    echo ✅ Database setup complete!
    echo.
    echo Your DATABASE_URL should be:
    echo postgresql://postgres:YOUR_PASSWORD@localhost:5432/nextn
    echo.
    echo Please update the .env file with your actual postgres password.
) else (
    echo ❌ Could not connect to nextn database.
)

echo.
pause