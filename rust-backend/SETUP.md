# Nextn Rust Backend Setup Guide

## Quick Setup Options

### Option 1: Docker (Recommended for Development)

This is the easiest way to get started:

1. **Install Docker Desktop** (if not already installed):
   - Download from: https://www.docker.com/products/docker-desktop
   - Install and start Docker Desktop

2. **Run the Docker setup script**:
   ```cmd
   cd rust-backend
   docker-setup.bat
   ```

3. **Verify the database is running**:
   ```cmd
   docker ps
   ```
   You should see `nextn-postgres` container running.

### Option 2: Use Existing PostgreSQL Installation

If you already have PostgreSQL installed:

1. **Find your PostgreSQL password**:
   - Check pgAdmin 4 settings
   - Or reset it through pgAdmin 4: Server Properties > Definition > Password

2. **Run the database setup script**:
   ```cmd
   cd rust-backend
   setup-db.bat
   ```

3. **Update .env file** with your actual password:
   ```env
   DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@localhost:5432/nextn
   ```

## Install Rust Dependencies

1. **Install sqlx-cli** (for database migrations):
   ```cmd
   cargo install sqlx-cli --no-default-features --features postgres
   ```

2. **Build the project**:
   ```cmd
   cargo build
   ```

## Run Database Migrations

```cmd
sqlx migrate run
```

This will create all the necessary tables and insert sample data.

## Start the Backend

```cmd
cargo run
```

The server will start on `http://localhost:8080`

## Test the API

Run the test client:
```cmd
cargo run --example api_client
```

Or test manually:
```cmd
curl http://localhost:8080/health
```

## Troubleshooting

### PostgreSQL Connection Issues

1. **Check if PostgreSQL is running**:
   ```cmd
   Get-Service -Name "*postgres*"
   ```

2. **Test connection manually**:
   ```cmd
   "C:\Program Files\PostgreSQL\16\bin\psql.exe" -h localhost -U postgres -d nextn
   ```

3. **Reset PostgreSQL password**:
   - Open pgAdmin 4
   - Right-click PostgreSQL server > Properties
   - Go to Definition tab > Change password

### Docker Issues

1. **Check if Docker is running**:
   ```cmd
   docker --version
   ```

2. **Check container status**:
   ```cmd
   docker ps -a
   ```

3. **View container logs**:
   ```cmd
   docker logs nextn-postgres
   ```

4. **Restart container**:
   ```cmd
   docker restart nextn-postgres
   ```

### Rust Compilation Issues

1. **Clean build**:
   ```cmd
   cargo clean
   cargo build
   ```

2. **Update dependencies**:
   ```cmd
   cargo update
   ```

## Environment Variables

Your `.env` file should look like this:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nextn
JWT_SECRET=your-secret-key-here
PORT=8080
```

## Next Steps

Once the backend is running:

1. **Test all endpoints** using the API client example
2. **Update your frontend** to use the new backend URL
3. **Deploy to production** using Docker or direct deployment

## Production Deployment

For production, consider:

1. **Use a managed PostgreSQL service** (AWS RDS, Google Cloud SQL, etc.)
2. **Set strong JWT_SECRET** (use a random 256-bit key)
3. **Enable SSL/TLS** for database connections
4. **Use environment-specific configurations**
5. **Set up proper logging and monitoring**

## Support

If you encounter issues:

1. Check the logs: `cargo run` shows detailed error messages
2. Verify database connectivity using the provided scripts
3. Ensure all environment variables are set correctly
4. Test with the provided API client example