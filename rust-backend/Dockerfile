# Build stage
FROM rust:1.75 as builder

WORKDIR /app

# Copy manifests
COPY Cargo.toml Cargo.lock ./

# Copy source code
COPY src ./src

# Build the application
RUN cargo build --release

# Runtime stage
FROM debian:bookworm-slim

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the binary from builder stage
COPY --from=builder /app/target/release/nextn-backend /app/nextn-backend

# Create directory for SQLite database
RUN mkdir -p /app/data

# Expose port
EXPOSE 8081

# Set environment variables
ENV DATABASE_URL=sqlite:/app/data/nextn.db
ENV PORT=8081

# Run the binary
CMD ["./nextn-backend"]