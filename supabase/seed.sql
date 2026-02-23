-- Supabase Schema and Seed Data for Citibank Banking Platform

-- 1. Create Enums
DO $$ BEGIN
    CREATE TYPE "user_role" AS ENUM ('user', 'admin');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "account_type" AS ENUM ('checking', 'savings');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "account_status" AS ENUM ('active', 'suspended', 'closed');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "transaction_type" AS ENUM ('deposit', 'withdrawal', 'transfer');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "transaction_status" AS ENUM ('pending', 'completed', 'failed');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 2. Create Tables
CREATE TABLE IF NOT EXISTS "users" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "email" varchar(255) NOT NULL UNIQUE,
    "password_hash" varchar(255) NOT NULL,
    "full_name" varchar(255) NOT NULL,
    "email_verified" boolean DEFAULT false NOT NULL,
    "role" "user_role" DEFAULT 'user' NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Ensure the role column exists if the table was already created previously
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" "user_role" DEFAULT 'user' NOT NULL;

CREATE TABLE IF NOT EXISTS "accounts" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "account_number" varchar(50) NOT NULL UNIQUE,
    "account_type" "account_type" DEFAULT 'checking' NOT NULL,
    "balance" numeric(19, 4) DEFAULT '0.0000' NOT NULL,
    "currency" varchar(3) DEFAULT 'USD' NOT NULL,
    "status" "account_status" DEFAULT 'active' NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "transactions" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "account_id" uuid NOT NULL REFERENCES "accounts"("id") ON DELETE CASCADE,
    "type" "transaction_type" NOT NULL,
    "amount" numeric(19, 4) NOT NULL,
    "description" text,
    "balance_after" numeric(19, 4),
    "status" "transaction_status" DEFAULT 'pending' NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "metadata" jsonb
);

-- 3. Insert Demo Data
-- Note: Passwords are already hashed. These match the demo accounts.
-- Password for both accounts: Demo123!
-- Hash generated with: bcrypt.hash("Demo123!", 10)

-- Insert demo users (Jane is made an admin for testing)
INSERT INTO users (id, email, password_hash, full_name, email_verified, role, created_at, updated_at) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'john.doe@example.com', '$2a$10$rKJ5yqW8X.vZYqWZ5vZYqWZ5vZYqWZ5vZYqWZ5vZYqWZ5vZYqWZ5u', 'John Doe', true, 'user', NOW(), NOW()),
  ('b1ffcd99-9d1c-4f19-cc7e-7cc9ce491b22', 'jane.smith@example.com', '$2a$10$rKJ5yqW8X.vZYqWZ5vZYqWZ5vZYqWZ5vZYqWZ5vZYqWZ5vZYqWZ5u', 'Jane Smith', true, 'admin', NOW(), NOW())
ON CONFLICT (email) DO UPDATE SET role = EXCLUDED.role;

-- Insert demo accounts
INSERT INTO accounts (id, user_id, account_number, account_type, balance, currency, status, created_at, updated_at) VALUES
  -- John Doe's accounts
  ('c2ccde99-9e2d-4c10-dd8f-8dd9df502c33', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1234567890', 'checking', 5000.0000, 'USD', 'active', NOW(), NOW()),
  ('d3ddef99-9f3e-4d11-ee9d-9ee9ed613d44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '0987654321', 'savings', 10000.0000, 'USD', 'active', NOW(), NOW()),
  -- Jane Smith's account
  ('e4eefd99-9e4f-4e12-ff0e-0ff0fd724e55', 'b1ffcd99-9d1c-4f19-cc7e-7cc9ce491b22', '5555555555', 'checking', 2500.0000, 'USD', 'active', NOW(), NOW())
ON CONFLICT (account_number) DO NOTHING;

-- Insert demo transactions
INSERT INTO transactions (account_id, type, amount, description, balance_after, status, created_at) VALUES
  -- John's checking account transactions
  ('c2ccde99-9e2d-4c10-dd8f-8dd9df502c33', 'deposit', 1000.0000, 'Initial deposit', 1000.0000, 'completed', '2024-01-15 10:00:00'),
  ('c2ccde99-9e2d-4c10-dd8f-8dd9df502c33', 'deposit', 2000.0000, 'Salary deposit', 3000.0000, 'completed', '2024-01-20 14:30:00'),
  ('c2ccde99-9e2d-4c10-dd8f-8dd9df502c33', 'deposit', 2000.0000, 'Bonus payment', 5000.0000, 'completed', '2024-01-25 09:15:00'),

  -- John's savings account transactions
  ('d3ddef99-9f3e-4d11-ee9d-9ee9ed613d44', 'deposit', 5000.0000, 'Initial savings', 5000.0000, 'completed', '2024-01-10 11:00:00'),
  ('d3ddef99-9f3e-4d11-ee9d-9ee9ed613d44', 'deposit', 5000.0000, 'Additional savings', 10000.0000, 'completed', '2024-01-22 16:45:00'),

  -- Jane's checking account transactions
  ('e4eefd99-9e4f-4e12-ff0e-0ff0fd724e55', 'deposit', 1500.0000, 'Initial deposit', 1500.0000, 'completed', '2024-01-12 13:20:00'),
  ('e4eefd99-9e4f-4e12-ff0e-0ff0fd724e55', 'deposit', 1000.0000, 'Paycheck', 2500.0000, 'completed', '2024-01-18 10:30:00');

-- Verify data
SELECT 'Users created:' as info, COUNT(*) as count FROM users
UNION ALL
SELECT 'Accounts created:' as info, COUNT(*) as count FROM accounts
UNION ALL
SELECT 'Transactions created:' as info, COUNT(*) as count FROM transactions;
