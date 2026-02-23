-- Copy and paste these statements in the SQL Editor to manually create an Admin or a normal User.

-- ==========================================
-- 1. Create an ADMIN user
-- ==========================================
-- Note: Replace the email 'myadmin@example.com' with the email you want.
-- The password_hash below corresponds to the password: "Demo123!"

INSERT INTO users (
  id, 
  email, 
  password_hash, 
  full_name, 
  email_verified, 
  role
) VALUES (
  '11111111-1111-4111-8111-111111111111', -- An explicitly provided UUID
  'myadmin@example.com', 
  '$2a$10$rKJ5yqW8X.vZYqWZ5vZYqWZ5vZYqWZ5vZYqWZ5vZYqWZ5vZYqWZ5u', 
  'Admin Boss', 
  true, 
  'admin' -- Sets the role to admin
) ON CONFLICT (email) DO UPDATE 
SET role = EXCLUDED.role, full_name = EXCLUDED.full_name, password_hash = EXCLUDED.password_hash;

-- Note: In order for this admin to do banking, you also need to generate an account row connecting to the UUID you just generated.


-- ==========================================
-- 2. Create a NORMAL user
-- ==========================================
-- Note: Replace the email 'client@example.com' with the email you want.
-- The password_hash below corresponds to the password: "Demo123!"

INSERT INTO users (
  id, 
  email, 
  password_hash, 
  full_name, 
  email_verified, 
  role
) VALUES (
  '22222222-2222-4222-8222-222222222222', -- An explicitly provided UUID
  'client@example.com', 
  '$2a$10$rKJ5yqW8X.vZYqWZ5vZYqWZ5vZYqWZ5vZYqWZ5vZYqWZ5vZYqWZ5u', 
  'Normal Client', 
  true, 
  'user' -- Sets the role to a normal standard user
) ON CONFLICT (email) DO UPDATE 
SET role = EXCLUDED.role, full_name = EXCLUDED.full_name, password_hash = EXCLUDED.password_hash;
