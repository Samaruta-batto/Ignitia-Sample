# Supabase Integration Setup Guide

## 1. Environment Configuration ✅
Your `.env.local` file has been created with:
```
NEXT_PUBLIC_SUPABASE_URL=https://eeegddjfnfojkzaptdxp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlZWdkZGpmbmZvamt6YXB0ZHhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1Mzg5NDUsImV4cCI6MjA3ODExNDk0NX0.S1qOec4WKz0w_aL7zGHd4c1rHRU0GtSjqPRh4tlrJhc
```

## 2. Install Supabase Package
Run the following command:
```bash
npm install @supabase/supabase-js
```

## 3. Create Database Tables
Go to your Supabase dashboard and execute the SQL queries from `docs/supabase-schema.sql`:

**Direct Steps:**
1. Go to https://app.supabase.com
2. Select your project
3. Go to **SQL Editor**
4. Create a new query
5. Copy the content from `docs/supabase-schema.sql`
6. Click **Run**

Or use the individual SQL queries below:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
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

-- Create indexes
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
```

## 4. Updated Services
The following services now use Supabase instead of in-memory/JSON storage:

- ✅ `userService.ts` - Users stored in Supabase
- ✅ `walletService.ts` - Wallets and transactions stored in Supabase
- ⏳ `eventService.ts` - To be migrated
- ⏳ `registrationService.ts` - To be migrated
- ⏳ `merchService.ts` - To be migrated

## 5. Next Steps
1. Run `npm install @supabase/supabase-js`
2. Execute the SQL schema in Supabase dashboard
3. Update remaining services (events, registrations, merchandise)
4. Test the complete flow

## Files Created/Modified
- `.env.local` - Supabase credentials
- `src/lib/supabase.ts` - Supabase client configuration
- `docs/supabase-schema.sql` - Database schema
- `src/backend/services/userService.ts` - Migrated to Supabase
- `src/backend/services/walletService.ts` - Migrated to Supabase

## Database Schema Overview
- **users**: User accounts (id, email, name, password_hash)
- **wallets**: User wallet balances (user_id, balance)
- **wallet_transactions**: Transaction history (user_id, type, amount, description)
- **events**: Event listings (name, price, description, date)
- **event_registrations**: User event registrations (user_id, event_id, status)
- **merchandise**: Merchandise inventory (name, price, quantity)
- **merch_orders**: User merchandise orders (user_id, total_price, status)
- **merch_order_items**: Items in each order (order_id, merch_id, quantity)
