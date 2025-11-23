-- Supabase Database Schema for Ignitia

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user','admin')),
  created_at TIMESTAMP DEFAULT now()
);

-- Wallets table
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  balance INT DEFAULT 2000,
  created_at TIMESTAMP DEFAULT now()
);

-- Wallet transactions table
CREATE TABLE wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('credit', 'debit')),
  amount INT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'failed')),
  created_at TIMESTAMP DEFAULT now()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  price INT DEFAULT 0,
  description TEXT,
  date TEXT,
  location TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Event registrations table
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'participated', 'cancelled')),
  registered_at TIMESTAMP DEFAULT now()
);

-- Merchandise table
CREATE TABLE merchandise (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price INT NOT NULL,
  description TEXT,
  quantity INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Merchandise orders table
CREATE TABLE merch_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_price INT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  ordered_at TIMESTAMP DEFAULT now(),
  completed_at TIMESTAMP
);

-- Merchandise order items table
CREATE TABLE merch_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES merch_orders(id) ON DELETE CASCADE,
  merch_id UUID NOT NULL REFERENCES merchandise(id),
  quantity INT NOT NULL,
  price INT NOT NULL
);

-- Create indexes for faster queries
CREATE INDEX idx_wallet_transactions_user_id ON wallet_transactions(user_id);
CREATE INDEX idx_event_registrations_user_id ON event_registrations(user_id);
CREATE INDEX idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX idx_merch_orders_user_id ON merch_orders(user_id);
CREATE INDEX idx_merch_order_items_order_id ON merch_order_items(order_id);

-- Insert sample merchandise
INSERT INTO merchandise (name, price, description, quantity) VALUES
  ('Official Ignitia Tee', 299, 'Premium cotton t-shirt with official Ignitia branding', 100),
  ('Ignitia Hoodie', 649, 'Comfortable hoodie with embroidered logo', 50),
  ('Ignitia Cap', 199, 'Adjustable baseball cap', 75);
