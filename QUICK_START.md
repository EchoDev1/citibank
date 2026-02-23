# ⚡ Quick Start - Get Running in 2 Minutes!

## Prerequisites
- ✅ Node.js 18+ installed
- ✅ That's it! No database setup needed!

## 4 Commands to Get Running

```bash
# 1. Install dependencies (1 minute)
npm install

# 2. Create database tables (5 seconds)
npm run db:push

# 3. Add demo data (5 seconds)
npm run db:seed

# 4. Start the app (5 seconds)
npm run dev
```

**Open browser:** http://localhost:3000

**Login with:**
- Email: `john.doe@example.com`
- Password: `Demo123!`

## That's It! 🎉

You now have a fully functional Citibank banking platform running locally!

---

## What Just Happened?

✅ Created a local SQLite database (`local.db`)
✅ Created all tables (users, accounts, transactions)
✅ Added 2 demo users with accounts
✅ Started the development server
✅ Ready to use!

---

## What You Can Do Now

### 1. Login & Explore
- Login with demo account
- View dashboard with accounts
- Check balances ($5,000 in checking, $10,000 in savings)
- View transaction history

### 2. Test Deposit
- Go to "Deposit Funds" in sidebar
- Enter amount (e.g., $100)
- See balance update in real-time
- Check transaction history

### 3. Create New Account
- Logout (top right)
- Click "Register"
- Create your own account
- Password requirements: 8+ chars, uppercase, lowercase, number, special char

---

## Demo Accounts

**Account 1 - John Doe:**
- Email: `john.doe@example.com`
- Password: `Demo123!`
- Checking: $5,000.00
- Savings: $10,000.00
- 5 transactions

**Account 2 - Jane Smith:**
- Email: `jane.smith@example.com`
- Password: `Demo123!`
- Checking: $2,500.00
- 2 transactions

---

## Using SQLite (Default)

✅ **No configuration needed**
✅ **Works offline**
✅ **Fast and lightweight**
✅ **Perfect for testing**

Your database is stored in: `local.db`

---

## View Your Data

```bash
npm run db:studio
```

Opens Drizzle Studio at https://local.drizzle.studio

Browse tables, view data, run queries!

---

## Reset Database

```bash
# Windows:
del local.db
npm run db:push
npm run db:seed

# Mac/Linux:
rm local.db
npm run db:push
npm run db:seed
```

---

## Switch to Supabase (Optional)

Want to use cloud database instead?

**1. Edit `.env.local`:**
```env
# Comment out SQLite
# DATABASE_URL="file:./local.db"

# Add your Supabase URL
DATABASE_URL="postgresql://your-supabase-url"
```

**2. Push to Supabase:**
```bash
npm run db:push
npm run db:seed
```

See `SUPABASE_SETUP.md` for detailed Supabase setup.

---

## Troubleshooting

### Port 3000 in use?
```bash
# Use different port
PORT=3001 npm run dev
```

### Database locked error?
```bash
# Stop all terminals (Ctrl+C)
# Restart:
npm run dev
```

### Want fresh start?
```bash
del local.db  # or rm local.db on Mac/Linux
npm run db:push
npm run db:seed
npm run dev
```

---

## Next Steps

✅ **Explore the code:**
- Pages: `src/app/(dashboard)/`
- Components: `src/components/`
- Database: `src/db/schema/`

✅ **Read documentation:**
- Full features: `README.md`
- SQLite guide: `SQLITE_SETUP.md`
- Branding: `CITIBANK_BRANDING.md`

✅ **Deploy to production:**
- See `README.md` deployment section
- Switch to Supabase for production

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Create/update tables
npm run db:seed          # Add demo data
npm run db:studio        # Open database GUI

# Reset
rm local.db              # Delete database (Mac/Linux)
del local.db             # Delete database (Windows)
```

---

## Features Available

✅ User registration with validation
✅ Secure login (bcrypt password hashing)
✅ Account dashboard
✅ Multiple accounts (checking/savings)
✅ Deposit funds with validation
✅ Transaction history
✅ Professional Citibank branding
✅ Responsive design
✅ Session management
✅ Route protection

---

## File Structure

```
citibank/
├── local.db             ← Your database (auto-created)
├── src/
│   ├── app/            ← Pages and routes
│   ├── components/     ← React components
│   ├── db/schema/      ← Database models
│   └── lib/            ← Utilities
└── .env.local          ← Configuration (already set!)
```

---

## Tips

💡 **Database location**: `local.db` in project root
💡 **Configuration**: `.env.local` (already configured!)
💡 **View data**: `npm run db:studio`
💡 **Reset anytime**: Delete `local.db` and re-run setup
💡 **Switch to Supabase**: Just change `DATABASE_URL` in `.env.local`

---

## You're All Set! 🚀

Your Citibank banking platform is running with:
- ✅ SQLite database
- ✅ Demo accounts
- ✅ Full functionality
- ✅ Citibank branding
- ✅ Professional UI

**Start developing immediately - no cloud setup needed!**

---

**Questions?**
- SQLite: See `SQLITE_SETUP.md`
- Features: See `README.md`
- Branding: See `CITIBANK_BRANDING.md`
- Supabase: See `SUPABASE_SETUP.md`

Happy coding! 💻
