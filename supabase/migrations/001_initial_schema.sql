-- Citibank Online Banking Platform - Initial Schema
-- This SQL creates all necessary tables for the banking platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
CREATE TYPE account_type AS ENUM ('checking', 'savings');
CREATE TYPE account_status AS ENUM ('active', 'suspended', 'closed');
CREATE TYPE transaction_type AS ENUM ('deposit', 'withdrawal', 'transfer');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed');

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Index for faster email lookups
CREATE INDEX idx_users_email ON users(email);

-- =====================================================
-- ACCOUNTS TABLE
-- =====================================================
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_number VARCHAR(50) NOT NULL UNIQUE,
    account_type account_type NOT NULL DEFAULT 'checking',
    balance DECIMAL(19, 4) NOT NULL DEFAULT 0.0000,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status account_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_accounts_account_number ON accounts(account_number);

-- =====================================================
-- TRANSACTIONS TABLE
-- =====================================================
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    type transaction_type NOT NULL,
    amount DECIMAL(19, 4) NOT NULL,
    description TEXT,
    balance_after DECIMAL(19, 4),
    status transaction_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    metadata JSONB
);

-- Indexes for faster queries
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX idx_transactions_status ON transactions(status);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for accounts table
CREATE TRIGGER update_accounts_updated_at
    BEFORE UPDATE ON accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (Optional - Uncomment to enable)
-- =====================================================

-- Enable RLS
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Note: RLS policies would require Supabase Auth integration
-- For now, we're using NextAuth which handles authorization at the app level

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE users IS 'Stores user account information with hashed passwords';
COMMENT ON TABLE accounts IS 'Bank accounts (checking/savings) linked to users';
COMMENT ON TABLE transactions IS 'Transaction history with audit trail (balance_after)';

COMMENT ON COLUMN accounts.balance IS 'DECIMAL(19,4) prevents floating-point errors - NEVER use FLOAT for money!';
COMMENT ON COLUMN transactions.balance_after IS 'Snapshot of account balance after transaction for audit trail';
COMMENT ON COLUMN transactions.metadata IS 'JSONB field for additional transaction data (e.g., IP address, device info)';

-- =====================================================
-- VALIDATION CONSTRAINTS
-- =====================================================

-- Ensure balance is never negative (optional - commented out to allow overdrafts in future)
-- ALTER TABLE accounts ADD CONSTRAINT positive_balance CHECK (balance >= 0);

-- Ensure transaction amounts are positive
ALTER TABLE transactions ADD CONSTRAINT positive_amount CHECK (amount > 0);

-- =====================================================
-- INITIAL DATA VERIFICATION
-- =====================================================

-- View to check table counts (useful for verification)
CREATE OR REPLACE VIEW database_stats AS
SELECT
    'users' as table_name,
    COUNT(*) as row_count
FROM users
UNION ALL
SELECT
    'accounts' as table_name,
    COUNT(*) as row_count
FROM accounts
UNION ALL
SELECT
    'transactions' as table_name,
    COUNT(*) as row_count
FROM transactions;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE '✅ Citibank Banking Platform schema created successfully!';
    RAISE NOTICE 'Tables created: users, accounts, transactions';
    RAISE NOTICE 'Next step: Run seed script to create demo data';
END $$;
