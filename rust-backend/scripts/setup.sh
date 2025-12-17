#!/bin/bash

# Setup script for Rust backend development

set -e

echo "🦀 Setting up Rust backend..."

# Check if Rust is installed
if ! command -v cargo &> /dev/null; then
    echo "❌ Rust is not installed. Please install Rust first:"
    echo "   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
    exit 1
fi

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

# Install sqlx-cli if not present
if ! command -v sqlx &> /dev/null; then
    echo "📦 Installing sqlx-cli..."
    cargo install sqlx-cli --no-default-features --features postgres
fi

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env with your database credentials"
fi

# Create database if it doesn't exist
echo "🗄️  Setting up database..."
createdb nextn 2>/dev/null || echo "Database 'nextn' already exists"

# Run migrations
echo "🔄 Running database migrations..."
sqlx migrate run

echo "✅ Setup complete!"
echo ""
echo "To start the development server:"
echo "  cargo run"
echo ""
echo "To run tests:"
echo "  cargo test"
echo ""
echo "The server will be available at http://localhost:8080"