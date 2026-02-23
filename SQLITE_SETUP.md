# SQLite Local Setup - Quick Start! 🚀

## Why SQLite?

✅ **No configuration needed** - Works immediately!
✅ **No internet required** - Fully local database
✅ **Perfect for testing** - Fast and lightweight
✅ **File-based** - Easy to reset and backup
✅ **Same features** - Full banking functionality

## Instant Setup (3 Commands!)

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Database & Tables
```bash
npm run db:push
```

### 3. Add Demo Data
```bash
npm run db:seed
```

### 4. Run the App!
```bash
npm run dev
```

**That's it! 🎉** Visit http://localhost:3000

## What Just Happened?

- ✅ Created `local.db` file in your project root
- ✅ Created all tables (users, accounts, transactions)
- ✅ Added 2 demo users with accounts and transaction history
- ✅ Ready to use immediately!

## Demo Accounts

Login with these pre-seeded accounts:

**Account 1:**
- Email: `john.doe@example.com`
- Password: `Demo123!`
- Checking: $5,000.00
- Savings: $10,000.00

**Account 2:**
- Email: `jane.smith@example.com`
- Password: `Demo123!`
- Checking: $2,500.00

## SQLite vs PostgreSQL/Supabase

| Feature | SQLite (Local) | PostgreSQL (Supabase) |
|---------|----------------|----------------------|
| **Setup** | 3 commands | Requires account + config |
| **Speed** | Very fast | Network dependent |
| **Cost** | Free | Free tier available |
| **Use Case** | Development/Testing | Production |
| **Data Persistence** | Local file | Cloud hosted |
| **Sharing** | Not shareable | Team accessible |

## Configuration

### Already Set in `.env.local`:
```env
DATABASE_URL="file:./local.db"
```

This tells the app to use SQLite with a file named `local.db`

## Database File Location

Your SQLite database is at:
```
citibank/local.db
```

## Managing Your SQLite Database

### View Data with Drizzle Studio
```bash
npm run db:studio
```
Opens a web UI at https://local.drizzle.studio

### Reset Database (Start Fresh)
```bash
# Delete the database file
rm local.db  # Mac/Linux
del local.db  # Windows

# Recreate and seed
npm run db:push
npm run db:seed
```

### Backup Database
```bash
# Copy the database file
cp local.db local.db.backup  # Mac/Linux
copy local.db local.db.backup  # Windows
```

### Restore from Backup
```bash
cp local.db.backup local.db  # Mac/Linux
copy local.db.backup local.db  # Windows
```

## Common Operations

### Add New Tables
1. Update schema in `src/db/schema/`
2. Run `npm run db:push`

### View Tables
```bash
npm run db:studio
```

### Query Database Directly
```bash
# Install sqlite3 CLI (optional)
npm install -g sqlite3

# Open database
sqlite3 local.db

# Example queries:
SELECT * FROM users;
SELECT * FROM accounts;
SELECT * FROM transactions ORDER BY created_at DESC;

# Exit
.exit
```

## Switching to PostgreSQL/Supabase Later

When ready for production:

### 1. Update `.env.local`:
```env
# Comment out SQLite
# DATABASE_URL="file:./local.db"

# Uncomment and add your Supabase URL
DATABASE_URL="postgresql://postgres.xxxxx:password@...supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

### 2. Push Schema to Supabase:
```bash
npm run db:push
```

### 3. Seed Supabase:
```bash
npm run db:seed
```

**The app automatically detects which database to use!**

## Troubleshooting

### Error: "Database locked"
**Solution:**
```bash
# Stop all running instances
# Press Ctrl+C in terminal
# Restart: npm run dev
```

### Error: "SQLITE_CANTOPEN"
**Solution:**
```bash
# Make sure you're in the project directory
cd citibank

# Run db:push to create the database
npm run db:push
```

### Database file not found
**Solution:**
```bash
# Create new database
npm run db:push
npm run db:seed
```

### Want to start completely fresh?
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

## File Locations

```
citibank/
├── local.db              ← Your SQLite database (auto-created)
├── local.db-journal      ← Temporary file (auto-created)
├── .env.local           ← Configuration (DATABASE_URL set to SQLite)
└── src/
    └── db/
        └── schema/      ← Database schema (same for both SQLite & PostgreSQL)
```

## Features That Work with SQLite

✅ User registration
✅ Login/logout
✅ View accounts
✅ Deposit funds
✅ Transaction history
✅ All authentication
✅ All validations
✅ Atomic transactions

**Everything works exactly the same as PostgreSQL!**

## Benefits for Development

1. **Fast iteration** - No network latency
2. **Easy reset** - Just delete the file
3. **Portable** - Single file you can backup/share
4. **No dependencies** - No server to run
5. **Perfect for testing** - Isolated, reproducible

## Production Deployment

For production, switch to PostgreSQL/Supabase:

**Why PostgreSQL for Production?**
- ✅ Better for concurrent users
- ✅ Cloud hosted (accessible anywhere)
- ✅ Automatic backups
- ✅ Better scalability
- ✅ Advanced features (replication, etc.)

See `SUPABASE_SETUP.md` for Supabase configuration.

## Quick Commands Reference

```bash
# Start fresh
npm run db:push && npm run db:seed

# Run app
npm run dev

# View data
npm run db:studio

# Reset everything
rm local.db && npm run db:push && npm run db:seed
```

## Advanced: Multiple Databases

You can switch databases by changing `.env.local`:

```env
# Development with SQLite
DATABASE_URL="file:./dev.db"

# Testing with different data
DATABASE_URL="file:./test.db"

# Production with Supabase
DATABASE_URL="postgresql://..."
```

The app automatically uses the right database driver!

## Need Help?

- **SQLite not working?** Make sure you ran `npm install`
- **Can't see data?** Run `npm run db:studio`
- **Want to switch to Supabase?** See `SUPABASE_SETUP.md`
- **General questions?** Check `README.md`

---

## Summary

✅ **SQLite is now the default** for easy local development
✅ **No setup required** - Just run 3 commands
✅ **Everything works** - Full banking functionality
✅ **Easy to reset** - Delete file and re-run commands
✅ **Switch to Supabase later** - Change one line in `.env.local`

**You can start building immediately without any database configuration!** 🚀

---

**Ready to start?**
```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```

Then visit http://localhost:3000 and login with:
- Email: `john.doe@example.com`
- Password: `Demo123!`
