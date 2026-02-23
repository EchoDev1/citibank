# Citibank Online Banking Platform

A secure, full-stack online banking platform built with Next.js 15, featuring user authentication, account management, and transaction processing with **official Citibank branding**.

> **Note**: This is a demo/educational project replicating Citibank's visual design. Not affiliated with Citigroup Inc.

## Features

- **User Authentication**: Secure registration and login with bcrypt password hashing
- **Account Management**: View multiple accounts (checking/savings) with real-time balances
- **Deposit Funds**: Add money to accounts with validation and atomic transactions
- **Transaction History**: Complete audit trail with timestamps and balance snapshots
- **Responsive Design**: Professional UI built with Tailwind CSS and shadcn/ui components
- **Type Safety**: Full TypeScript support with Drizzle ORM

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL via **Supabase** (Drizzle ORM)
- **Authentication**: Auth.js (NextAuth v5)
- **UI Components**: shadcn/ui + Tailwind CSS
- **Branding**: Official Citibank colors (#056DAE, #D41F3D)
- **Validation**: Zod
- **Password Hashing**: bcrypt

## Prerequisites

- Node.js 18+ installed
- **Supabase account** (free tier available at [supabase.com](https://supabase.com))
- npm or yarn package manager

## ⚡ Quick Start (2 Minutes!)

### Option A: SQLite (Fastest - Recommended for Testing)

```bash
# 1. Install dependencies
npm install

# 2. Create database & tables
npm run db:push

# 3. Add demo data
npm run db:seed

# 4. Run the app
npm run dev
```

**That's it!** Open http://localhost:3000

✅ No database setup required
✅ Works offline
✅ Perfect for development

**See `QUICK_START.md` for detailed guide**

---

### Option B: Supabase (For Production/Cloud)

**See `SUPABASE_SETUP.md` for complete instructions!**

Quick steps:
1. Create free account at [supabase.com](https://supabase.com)
2. Create new project named `citibank-banking`
3. Copy your database connection string
4. Update `.env.local`:
   ```env
   DATABASE_URL="postgresql://postgres.[YOUR-PROJECT]:[PASSWORD]@...pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
   ```
5. Run `npm run db:push && npm run db:seed && npm run dev`

### 4. Set Up Database

Push schema to Supabase:

```bash
npm run db:push
```

**Alternative**: Use SQL directly in Supabase SQL Editor with `supabase/migrations/001_initial_schema.sql`

Seed the database with demo data:

```bash
npm run db:seed
```

This creates two demo accounts:
- **Email**: `john.doe@example.com` | **Password**: `Demo123!`
- **Email**: `jane.smith@example.com` | **Password**: `Demo123!`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
citibank/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/             # Auth routes (login, register)
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/        # Protected routes
│   │   │   └── dashboard/
│   │   │       ├── deposit/
│   │   │       └── transactions/
│   │   ├── api/                # API routes
│   │   │   ├── auth/
│   │   │   ├── accounts/
│   │   │   └── transactions/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── auth/               # Login/register forms
│   │   ├── dashboard/          # Account cards, transaction tables
│   │   └── layout/             # Header, sidebar
│   ├── lib/
│   │   ├── auth.ts             # Auth.js configuration
│   │   ├── db.ts               # Database connection
│   │   ├── validations.ts      # Zod schemas
│   │   └── utils.ts            # Utility functions
│   ├── db/
│   │   ├── schema/             # Drizzle schemas
│   │   │   ├── users.ts
│   │   │   ├── accounts.ts
│   │   │   ├── transactions.ts
│   │   │   └── index.ts
│   │   ├── migrations/         # SQL migrations
│   │   └── seed.ts             # Demo data script
│   ├── actions/                # Server Actions
│   │   ├── auth-actions.ts
│   │   └── transaction-actions.ts
│   └── middleware.ts           # Route protection
├── .env.local                  # Environment variables
├── drizzle.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Database Schema

### Users
- `id` (UUID, primary key)
- `email` (unique, indexed)
- `passwordHash` (bcrypt)
- `fullName`
- `emailVerified`
- `createdAt`, `updatedAt`

### Accounts
- `id` (UUID, primary key)
- `userId` (foreign key → users)
- `accountNumber` (unique, auto-generated)
- `accountType` (checking/savings)
- `balance` (decimal 19,4 - **never float!**)
- `currency` (default: USD)
- `status` (active/suspended/closed)
- `createdAt`, `updatedAt`

### Transactions
- `id` (UUID, primary key)
- `accountId` (foreign key → accounts)
- `type` (deposit/withdrawal/transfer)
- `amount` (decimal 19,4)
- `description` (optional)
- `balanceAfter` (decimal 19,4 - audit snapshot)
- `status` (pending/completed/failed)
- `createdAt`
- `metadata` (JSONB, optional)

## Key Security Features

✅ **Password Security**: bcrypt hashing with 10 salt rounds
✅ **Atomic Transactions**: Database transactions prevent race conditions
✅ **Decimal Precision**: All monetary values use `decimal(19,4)` (never float)
✅ **Input Validation**: Zod schemas on both client and server
✅ **Route Protection**: Middleware enforces authentication
✅ **Session Management**: JWT with 7-day expiry
✅ **Security Headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
✅ **Audit Trail**: `balanceAfter` provides complete transaction history

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate migrations from schema
- `npm run db:migrate` - Run migrations
- `npm run db:push` - Push schema to database (dev only)
- `npm run db:studio` - Open Drizzle Studio (database GUI)
- `npm run db:seed` - Seed database with demo data

## Testing the Application

### Manual Testing Checklist

**Authentication:**
- [ ] Register new user → creates user + default checking account
- [ ] Register with duplicate email → error displayed
- [ ] Login with correct credentials → redirects to dashboard
- [ ] Login with wrong password → error displayed
- [ ] Access `/dashboard` without auth → redirects to login
- [ ] Logout → redirects to login

**Dashboard:**
- [ ] Dashboard shows all user accounts
- [ ] Balance displays correctly formatted
- [ ] Total balance calculates correctly

**Deposits:**
- [ ] Deposit positive amount → balance updates
- [ ] Deposit appears in transaction history
- [ ] Transaction shows correct `balanceAfter`
- [ ] Deposit $0 or negative → validation error

**Transaction History:**
- [ ] All transactions display in reverse chronological order
- [ ] Status indicators show correctly
- [ ] Account selector works

## API Endpoints

### Authentication
- `POST /api/auth/callback/credentials` - Login
- `POST /api/auth/signout` - Logout

### Accounts
- `GET /api/accounts` - Get all user accounts
- `GET /api/accounts/:id` - Get specific account

### Transactions
- `GET /api/transactions?accountId=xxx` - Get account transactions
- `GET /api/transactions?limit=50` - Get all user transactions

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/dbname` |
| `NEXTAUTH_URL` | Application URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Secret for JWT signing | Generate with `openssl rand -base64 32` |
| `NODE_ENV` | Environment | `development` or `production` |

## Production Deployment

### 1. Build the Application

```bash
npm run build
```

### 2. Set Environment Variables

Ensure all production environment variables are set:
- Use a production PostgreSQL database (Neon, Supabase, etc.)
- Generate a new `NEXTAUTH_SECRET`
- Set `NEXTAUTH_URL` to your production domain
- Set `NODE_ENV=production`

### 3. Run Migrations

```bash
npm run db:push
```

### 4. Deploy

Deploy to Vercel, Railway, or any Node.js hosting platform.

**Vercel (Recommended):**
```bash
npm install -g vercel
vercel
```

## Future Enhancements

- [ ] Withdrawal functionality
- [ ] Transfer between accounts
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] Transaction search and filtering
- [ ] Account statements (PDF export)
- [ ] Spending analytics
- [ ] Admin dashboard
- [ ] Rate limiting on API endpoints
- [ ] Email notifications

## Troubleshooting

### Database Connection Issues

If you see "DATABASE_URL is not defined":
1. Ensure `.env.local` exists and has `DATABASE_URL` set
2. Restart the development server

### Migration Errors

If migrations fail:
```bash
# Drop and recreate migrations
rm -rf src/db/migrations
npm run db:generate
npm run db:push
```

### Authentication Not Working

1. Check `NEXTAUTH_SECRET` is set in `.env.local`
2. Verify `NEXTAUTH_URL` matches your development URL
3. Clear browser cookies and try again

## License

ISC

## Support

For issues or questions, please open an issue in the repository.

---

**Note**: This is a prototype/MVP banking platform. For production use, additional security measures, compliance features, and testing would be required.
