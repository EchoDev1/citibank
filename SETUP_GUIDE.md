# Setup Guide - Citibank Online Banking Platform

This guide will walk you through setting up the banking platform from scratch.

## Prerequisites Installation

### 1. Install Node.js

Download and install Node.js 18+ from [nodejs.org](https://nodejs.org/)

Verify installation:
```bash
node --version  # Should show v18 or higher
npm --version
```

### 2. Install PostgreSQL

**Option A: Local PostgreSQL**

Windows: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
Mac: `brew install postgresql`
Linux: `sudo apt-get install postgresql`

**Option B: Cloud PostgreSQL (Recommended for beginners)**

- [Neon](https://neon.tech/) - Serverless PostgreSQL (Free tier available)
- [Supabase](https://supabase.com/) - PostgreSQL with additional features (Free tier)
- [Railway](https://railway.app/) - Easy deployment platform (Free tier)

## Step-by-Step Setup

### Step 1: Verify Project Files

Ensure you're in the `citibank` directory:
```bash
cd citibank
ls  # Should see package.json, src/, etc.
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (Next.js, Drizzle, Auth.js, etc.)

### Step 3: Configure Database

**Using Neon (Recommended for beginners):**

1. Go to [neon.tech](https://neon.tech/) and sign up
2. Create a new project
3. Copy the connection string (looks like: `postgresql://user:pass@host/db`)

**Using Local PostgreSQL:**

1. Create a database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE citibank_dev;

# Exit
\q
```

2. Your connection string will be:
```
postgresql://postgres:your_password@localhost:5432/citibank_dev
```

### Step 4: Set Environment Variables

1. Copy the example file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local`:
```env
# Replace with your actual database URL
DATABASE_URL="postgresql://your_connection_string_here"

# Keep these as-is for local development
NEXTAUTH_URL="http://localhost:3000"

# Generate a random secret (see below)
NEXTAUTH_SECRET="your-secret-here"

NODE_ENV="development"
```

3. Generate `NEXTAUTH_SECRET`:

**On Mac/Linux:**
```bash
openssl rand -base64 32
```

**On Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Or use any random 32+ character string like:**
```
Kj8#mL9$pQ2@nR5%tW7&xY4*zA1!bC6
```

### Step 5: Generate Database Schema

Run Drizzle to create the database tables:

```bash
npm run db:generate
npm run db:push
```

You should see output like:
```
✓ Pulling schema from database...
✓ Applying changes...
✅ Done!
```

### Step 6: Seed Demo Data (Optional)

Create demo accounts for testing:

```bash
npm run db:seed
```

This creates two users:
- Email: `john.doe@example.com` | Password: `Demo123!`
- Email: `jane.smith@example.com` | Password: `Demo123!`

### Step 7: Start Development Server

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Ready in Xms
```

### Step 8: Test the Application

1. Open [http://localhost:3000](http://localhost:3000)
2. You'll be redirected to the login page
3. Click "Register" to create an account OR
4. Use demo credentials: `john.doe@example.com` / `Demo123!`

## Common Issues & Solutions

### Issue: "DATABASE_URL is not defined"

**Solution:**
- Ensure `.env.local` file exists (not `.env.example`)
- Check the file contains `DATABASE_URL=...`
- Restart the dev server (`Ctrl+C` then `npm run dev`)

### Issue: Database Connection Error

**Solution:**
- Verify your PostgreSQL server is running
- Check the connection string is correct
- Test connection using a database client like [TablePlus](https://tableplus.com/)

### Issue: "Migration failed"

**Solution:**
```bash
# Drop all tables and start fresh
npm run db:push

# Then re-seed
npm run db:seed
```

### Issue: "Module not found"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or use a different port:
PORT=3001 npm run dev
```

### Issue: Auth.js/NextAuth errors

**Solution:**
- Verify `NEXTAUTH_SECRET` is set and is at least 32 characters
- Clear browser cookies for localhost:3000
- Restart the development server

## Verifying Everything Works

### ✅ Registration Test
1. Go to `/register`
2. Fill in:
   - Full Name: Test User
   - Email: test@example.com
   - Password: Test123!@#
3. Click "Create Account"
4. Should redirect to login

### ✅ Login Test
1. Go to `/login`
2. Enter email and password
3. Should redirect to `/dashboard`

### ✅ Dashboard Test
- Should see account card(s)
- Balance should display
- Sidebar navigation should be visible

### ✅ Deposit Test
1. Click "Deposit Funds" in sidebar
2. Enter amount (e.g., 100.00)
3. Click "Deposit Funds"
4. Should see success message
5. Balance should update

### ✅ Transactions Test
1. Click "Transactions" in sidebar
2. Should see your deposit
3. Should show date, amount, and balance after

## Database Management

### View Data with Drizzle Studio

```bash
npm run db:studio
```

Opens a web UI at `https://local.drizzle.studio` to view/edit database records.

### Reset Database

```bash
# Clear all data and re-seed
npm run db:seed
```

### Backup Database

**PostgreSQL dump:**
```bash
pg_dump -U postgres citibank_dev > backup.sql
```

**Restore:**
```bash
psql -U postgres citibank_dev < backup.sql
```

## Next Steps

Once everything is working:

1. **Explore the Code**: Check out `src/app/` for pages and routes
2. **Customize UI**: Modify components in `src/components/`
3. **Add Features**: Implement withdrawal, transfers, etc.
4. **Deploy**: Follow the deployment guide in README.md

## Getting Help

- Check `README.md` for full documentation
- Review error messages carefully
- Check browser console (F12) for client-side errors
- Check terminal for server-side errors

## Development Tools

**Recommended VS Code Extensions:**
- ESLint
- Tailwind CSS IntelliSense
- Prettier
- PostgreSQL (for database queries)

**Useful Commands:**
```bash
npm run dev          # Start dev server
npm run build        # Test production build
npm run lint         # Check for code issues
npm run db:studio    # Database GUI
```

---

**You're all set! Happy coding! 🚀**
