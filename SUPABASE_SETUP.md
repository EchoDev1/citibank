# Supabase Setup Guide for Citibank Platform

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Log in
3. Click **"New Project"**
4. Fill in:
   - **Name**: `citibank-banking`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you (e.g., US East)
   - **Pricing Plan**: Free tier is fine
5. Click **"Create new project"** (takes ~2 minutes)

## Step 2: Get Your Database Connection String

1. In Supabase Dashboard, go to **Project Settings** (gear icon)
2. Click **Database** in the left sidebar
3. Scroll to **Connection String** section
4. Select **"URI"** tab
5. Copy the connection string

**Important**: Replace `[YOUR-PASSWORD]` with the database password you created!

### Connection String Format:

**For running the app (Session Pooler - Port 6543):**
```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

**For migrations (Transaction Mode - Port 5432):**
```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
```

## Step 3: Update .env.local

Open `.env.local` and replace `DATABASE_URL` with your Supabase connection string:

```env
DATABASE_URL="postgresql://postgres.xxxxxxxxxxxx:YourPassword@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

**Already set for you:**
- ✅ `NEXTAUTH_SECRET` is pre-generated
- ✅ `NEXTAUTH_URL` is set to localhost:3000

## Step 4: Run SQL Migration

You have two options:

### Option A: Using Drizzle (Recommended)

```bash
# This will create all tables automatically
npm run db:push
```

### Option B: Manual SQL (if Drizzle fails)

1. In Supabase Dashboard, click **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the SQL from `supabase/migrations/001_initial_schema.sql`
4. Click **Run** (bottom right)

## Step 5: Seed Demo Data

```bash
npm run db:seed
```

You should see:
```
✅ Seed completed successfully!

Demo accounts:
1. Email: john.doe@example.com | Password: Demo123!
2. Email: jane.smith@example.com | Password: Demo123!
```

## Step 6: Verify Database

1. In Supabase Dashboard, click **Table Editor** (left sidebar)
2. You should see three tables:
   - ✅ `users`
   - ✅ `accounts`
   - ✅ `transactions`
3. Click on `users` - you should see 2 demo users

## Troubleshooting

### Error: "Connection refused" or "ECONNREFUSED"

**Solution:**
- Check your `DATABASE_URL` is correct
- Verify password doesn't have special characters that need escaping
- Try the Transaction mode connection string (port 5432)

### Error: "prepared statement already exists"

**Solution:**
Use Session Pooler (port 6543) with `?pgbouncer=true&connection_limit=1`

### Error: "Password authentication failed"

**Solution:**
1. Go to Supabase Dashboard > Project Settings > Database
2. Click **Reset Database Password**
3. Update your `DATABASE_URL` with new password

### Error: "relation does not exist"

**Solution:**
Tables not created yet. Run:
```bash
npm run db:push
```

Or use the manual SQL migration in Supabase SQL Editor.

## Supabase Features You Can Use

### 1. Table Editor
View and edit data directly in the dashboard
- **URL**: Dashboard > Table Editor

### 2. SQL Editor
Run custom SQL queries
- **URL**: Dashboard > SQL Editor

### 3. Logs
View database logs and errors
- **URL**: Dashboard > Logs

### 4. Database Backups (Paid)
Automatic daily backups
- **URL**: Dashboard > Database > Backups

### 5. Database Webhooks
Trigger actions on data changes
- **URL**: Dashboard > Database > Webhooks

## Security Best Practices

### ✅ Use Row Level Security (RLS)

Run this in SQL Editor to enable RLS:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id::text);

CREATE POLICY "Users can view own accounts" ON accounts
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE auth.uid() = id::text)
  );

CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (
    account_id IN (
      SELECT id FROM accounts WHERE user_id IN (
        SELECT id FROM users WHERE auth.uid() = id::text
      )
    )
  );
```

### ✅ Environment Variables

Never commit `.env.local` to Git!

Add to `.gitignore`:
```
.env.local
.env*.local
```

### ✅ Connection Pooling

Always use Session Pooler (port 6543) for serverless environments:
```
?pgbouncer=true&connection_limit=1
```

## Production Deployment

### 1. Vercel Deployment

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `DATABASE_URL` = Your Supabase connection string
   - `NEXTAUTH_SECRET` = Your secret (from .env.local)
   - `NEXTAUTH_URL` = Your production URL (e.g., `https://yourapp.vercel.app`)

### 2. Update NEXTAUTH_URL for Production

In Vercel environment variables:
```
NEXTAUTH_URL=https://your-app.vercel.app
```

## Connection String Reference

| Environment | Port | Connection String |
|-------------|------|-------------------|
| **Development** | 6543 | Session Pooler with pgbouncer |
| **Migrations** | 5432 | Direct connection (Transaction mode) |
| **Production** | 6543 | Session Pooler (recommended) |

## Need Help?

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Connection Issues**: Check Supabase Dashboard > Project Settings > Database
- **Migration Issues**: See `supabase/migrations/001_initial_schema.sql`

---

**Your Supabase database is now ready for Citibank Banking Platform! 🎉**
