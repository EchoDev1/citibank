# Getting Started Checklist

Follow this checklist to get your banking platform running in under 10 minutes!

## ✅ Pre-Flight Checklist

### Step 1: Verify Prerequisites
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] You have a PostgreSQL database ready (or will create one)

### Step 2: Get PostgreSQL Database

**Option A: Cloud Database (Easiest - Recommended)**

1. Go to [Neon.tech](https://neon.tech/)
2. Sign up (free)
3. Create a new project
4. Copy the connection string (looks like: `postgresql://user:pass@host/database`)

**Option B: Local PostgreSQL**

1. Install PostgreSQL from [postgresql.org](https://www.postgresql.org/)
2. Create database: `createdb citibank_dev`
3. Connection string: `postgresql://postgres:your_password@localhost:5432/citibank_dev`

### Step 3: Configure Environment

1. **Copy the environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`** and update:
   ```env
   DATABASE_URL="postgresql://your-connection-string-here"
   NEXTAUTH_SECRET="your-random-32-character-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

3. **Generate a secret key:**

   **Windows (PowerShell):**
   ```powershell
   -join ((65..90) + (97..122) + (48..57) + (33,35,36,37,38,42,64) | Get-Random -Count 32 | % {[char]$_})
   ```

   **Mac/Linux:**
   ```bash
   openssl rand -base64 32
   ```

   Copy the output and paste it as your `NEXTAUTH_SECRET`

### Step 4: Install & Setup

Run these commands in order:

```bash
# 1. Install all dependencies (if not already done)
npm install

# 2. Push database schema (creates tables)
npm run db:push

# 3. Seed demo data (creates test accounts)
npm run db:seed
```

**Expected output from seed:**
```
✅ Seed completed successfully!

Demo accounts:
1. Email: john.doe@example.com | Password: Demo123!
   - Checking: $5,000.00
   - Savings: $10,000.00

2. Email: jane.smith@example.com | Password: Demo123!
   - Checking: $2,500.00
```

### Step 5: Run the Application

```bash
npm run dev
```

**You should see:**
```
  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000
  - Ready in 2s
```

### Step 6: Test the Application

1. **Open browser:** http://localhost:3000
2. **You'll be redirected to:** http://localhost:3000/login
3. **Try logging in with demo account:**
   - Email: `john.doe@example.com`
   - Password: `Demo123!`
4. **You should see:** Dashboard with accounts and balances

## ✅ Verify Everything Works

### Test 1: Login ✓
- [ ] Login page loads
- [ ] Can login with `john.doe@example.com` / `Demo123!`
- [ ] Redirects to dashboard after login
- [ ] Dashboard shows accounts

### Test 2: Dashboard ✓
- [ ] See total balance card
- [ ] See checking account ($5,000.00)
- [ ] See savings account ($10,000.00)
- [ ] Recent transactions display
- [ ] Sidebar navigation works

### Test 3: Deposit ✓
- [ ] Click "Deposit Funds" in sidebar
- [ ] Select an account
- [ ] Enter amount (try $100.00)
- [ ] Click "Deposit Funds"
- [ ] See success message
- [ ] Balance updates

### Test 4: Transaction History ✓
- [ ] Click "Transactions" in sidebar
- [ ] See your recent deposit
- [ ] Transaction shows correct amount
- [ ] "Balance After" is accurate

### Test 5: Security ✓
- [ ] Logout works (redirects to login)
- [ ] Can't access `/dashboard` without login
- [ ] Can register new account

## 🎉 Success!

If all tests pass, your banking platform is fully operational!

## 🔧 Troubleshooting

### Problem: "DATABASE_URL is not defined"

**Solution:**
```bash
# Make sure .env.local exists (not .env.example)
ls -la .env.local

# If missing, create it
cp .env.example .env.local

# Edit it with your database URL
```

### Problem: "Connection refused" or database error

**Solution:**
- Verify your DATABASE_URL is correct
- Check PostgreSQL is running (if local)
- Test connection with: `npm run db:studio`

### Problem: "Port 3000 already in use"

**Solution:**
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or use different port:
PORT=3001 npm run dev
```

### Problem: ESLint/npm audit warnings

**Solution:**
```bash
# These are minor warnings, safe to ignore for development
# To fix non-breaking issues:
npm audit fix
```

### Problem: Page not loading or blank screen

**Solution:**
1. Check browser console (F12) for errors
2. Check terminal for server errors
3. Restart dev server: Ctrl+C then `npm run dev`
4. Clear browser cache and cookies

## 📚 Next Steps

Once everything is working:

1. **Explore the code:**
   - Pages: `src/app/(dashboard)/`
   - Components: `src/components/`
   - Database: `src/db/schema/`

2. **Try creating your own account:**
   - Go to `/register`
   - Use a different email
   - Strong password required (8+ chars, uppercase, lowercase, number, special char)

3. **View database:**
   ```bash
   npm run db:studio
   ```
   Opens a GUI at https://local.drizzle.studio

4. **Read documentation:**
   - `README.md` - Full features and API docs
   - `SECURITY.md` - Security features
   - `QUICK_REFERENCE.md` - Common commands

## 🚀 Deploy to Production

When ready to deploy:

1. **Push to GitHub**
2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy!

See `README.md` for detailed deployment instructions.

## 📞 Need Help?

- **Setup issues?** → See `SETUP_GUIDE.md`
- **Security questions?** → See `SECURITY.md`
- **Code reference?** → See `QUICK_REFERENCE.md`
- **General info?** → See `README.md`

## ✨ Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Update database schema
npm run db:generate  # Generate migrations
npm run db:seed      # Seed demo data
npm run db:studio    # Open database GUI

# Code Quality
npm run lint         # Check code quality
```

---

**That's it! You're ready to go! 🎊**

If you completed all steps above, your online banking platform is now running at http://localhost:3000

Happy coding! 💻
