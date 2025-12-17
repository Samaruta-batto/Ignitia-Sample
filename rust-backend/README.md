# Nextn Rust Backend

A high-performance Rust backend for the Nextn application, built with Axum and PostgreSQL.

## Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Events**: Event management with registration and leaderboard functionality
- **Payments**: Payment processing with transaction tracking
- **Wallet**: Digital wallet system with transaction history
- **Database**: PostgreSQL with SQLx for type-safe queries
- **API**: RESTful API with JSON responses
- **Error Handling**: Comprehensive error handling with proper HTTP status codes

## Tech Stack

- **Framework**: Axum (async web framework)
- **Database**: PostgreSQL with SQLx
- **Authentication**: JWT + bcrypt
- **Serialization**: Serde
- **Async Runtime**: Tokio
- **Logging**: Tracing

## Quick Start

### Prerequisites

- Rust 1.70+
- PostgreSQL 12+
- sqlx-cli for migrations

### Installation

1. Install sqlx-cli:
```bash
cargo install sqlx-cli --no-default-features --features postgres
```

2. Clone and setup:
```bash
cd rust-backend
cp .env.example .env
# Edit .env with your database credentials
```

3. Setup database:
```bash
# Create database
createdb nextn

# Run migrations
sqlx migrate run
```

4. Run the server:
```bash
cargo run
```

The server will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/profile` - Get user profile (requires auth)

### Events
- `GET /api/events` - List all events
- `GET /api/events/leaderboard` - Get events leaderboard
- `POST /api/events/:id/register` - Register for event (requires auth)
- `GET /api/events/registrations` - Get user registrations (requires auth)

### Payments
- `POST /api/payments/initiate` - Initiate payment (requires auth)
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/history` - Get payment history (requires auth)

### Wallet
- `GET /api/wallet` - Get wallet balance (requires auth)
- `GET /api/wallet/transactions` - Get wallet transactions (requires auth)
- `POST /api/wallet/add` - Add funds to wallet (requires auth)

### Health
- `GET /health` - Health check

## Authentication

The API uses JWT tokens for authentication. Include the token in requests using:

1. **Authorization header**: `Authorization: Bearer <token>`
2. **Cookie**: `token=<token>`

## Database Schema

The application uses PostgreSQL with the following main tables:

- `users` - User accounts
- `events` - Event information
- `event_registrations` - Event registrations
- `wallets` - User wallets
- `wallet_transactions` - Wallet transaction history
- `payment_transactions` - Payment processing records

## Development

### Running Tests
```bash
cargo test
```

### Database Migrations
```bash
# Create new migration
sqlx migrate add <migration_name>

# Run migrations
sqlx migrate run

# Revert last migration
sqlx migrate revert
```

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `PORT` - Server port (default: 8080)

## Production Deployment

1. Set secure environment variables
2. Use a production-grade PostgreSQL instance
3. Configure proper logging levels
4. Set up reverse proxy (nginx/traefik)
5. Enable SSL/TLS

## Migration from TypeScript

This Rust backend provides the same functionality as the original TypeScript backend:

- All API endpoints maintain compatibility
- Database schema matches the original Supabase setup
- Authentication flow remains the same
- Payment processing logic is preserved
- Wallet functionality is equivalent

### Performance Benefits

- **Memory Safety**: Rust's ownership system prevents common bugs
- **Performance**: Significantly faster than Node.js
- **Concurrency**: Excellent async performance with Tokio
- **Type Safety**: Compile-time guarantees prevent runtime errors
- **Resource Usage**: Lower memory and CPU usage

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request