# Quick Reference Guide

## Most Used Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Push schema to database
npm run db:generate      # Generate migrations
npm run db:seed          # Seed demo data
npm run db:studio        # Open database GUI

# Code Quality
npm run lint             # Run ESLint
```

## Demo Accounts

| Email | Password | Checking | Savings |
|-------|----------|----------|---------|
| john.doe@example.com | Demo123! | $5,000 | $10,000 |
| jane.smith@example.com | Demo123! | $2,500 | - |

## File Locations

| What | Where |
|------|-------|
| Pages | `src/app/(dashboard)/dashboard/` |
| Components | `src/components/` |
| Server Actions | `src/actions/` |
| Database Schema | `src/db/schema/` |
| Auth Config | `src/lib/auth.ts` |
| Validation | `src/lib/validations.ts` |

## Common Tasks

### Add a New Page

1. Create file in `src/app/(dashboard)/dashboard/your-page/page.tsx`
2. Add to sidebar navigation in `src/components/layout/sidebar.tsx`

### Add Database Table

1. Create schema in `src/db/schema/your-table.ts`
2. Export from `src/db/schema/index.ts`
3. Run `npm run db:generate`
4. Run `npm run db:push`

### Add Server Action

1. Create function in `src/actions/your-action.ts`
2. Mark file with `"use server"`
3. Import and use in client components

### Add UI Component

```bash
npx shadcn@latest add component-name
```

## Environment Variables

```env
DATABASE_URL="postgresql://..."        # Required
NEXTAUTH_URL="http://localhost:3000"  # Required
NEXTAUTH_SECRET="random-32-chars"      # Required
NODE_ENV="development"                 # Optional
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/accounts` | Yes | Get user accounts |
| GET | `/api/accounts/:id` | Yes | Get specific account |
| GET | `/api/transactions` | Yes | Get all transactions |
| GET | `/api/transactions?accountId=xxx` | Yes | Get account transactions |

## Tech Stack Quick Reference

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Drizzle |
| Auth | Auth.js (NextAuth v5) |
| UI | Tailwind + shadcn/ui |
| Validation | Zod |
| Icons | Lucide React |

## Folder Structure

```
src/
├── app/                 # Pages and routes
│   ├── (auth)/         # Public auth pages
│   ├── (dashboard)/    # Protected pages
│   └── api/            # API endpoints
├── components/          # React components
│   ├── ui/             # Base UI components
│   ├── auth/           # Auth forms
│   ├── dashboard/      # Dashboard components
│   └── layout/         # Layout components
├── actions/            # Server Actions
├── lib/                # Utilities and config
└── db/                 # Database schema and migrations
```

## Development Workflow

1. **Start server**: `npm run dev`
2. **Make changes** to files
3. **Test** in browser (auto-reloads)
4. **Check errors** in terminal/browser console
5. **Commit** when working

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Port in use | `PORT=3001 npm run dev` |
| Module not found | `rm -rf node_modules && npm install` |
| DB connection error | Check `.env.local` has `DATABASE_URL` |
| Auth not working | Check `NEXTAUTH_SECRET` is set |
| Build errors | `npm run lint` to find issues |

## Key Files to Know

- `src/middleware.ts` - Route protection
- `src/lib/auth.ts` - Authentication config
- `src/lib/db.ts` - Database connection
- `src/lib/validations.ts` - Input validation schemas
- `src/actions/transaction-actions.ts` - Deposit logic
- `drizzle.config.ts` - Database config
- `.env.local` - Environment variables

## TypeScript Hints

```typescript
// Import types
import type { Account, Transaction } from "@/db/schema";

// Server Action
"use server";
export async function myAction() { ... }

// Client Component
"use client";
export default function MyComponent() { ... }
```

## Useful Code Snippets

### Format Currency
```typescript
import { formatCurrency } from "@/lib/utils";
formatCurrency(1234.56); // "$1,234.56"
```

### Format Date
```typescript
import { formatDate } from "@/lib/utils";
formatDate(new Date()); // "Jan 1, 2024, 10:30 AM"
```

### Get Current User
```typescript
import { auth } from "@/lib/auth";
const session = await auth();
const userId = session?.user?.id;
```

### Database Query
```typescript
import { db } from "@/lib/db";
import { accounts } from "@/db/schema";
import { eq } from "drizzle-orm";

const userAccounts = await db
  .select()
  .from(accounts)
  .where(eq(accounts.userId, userId));
```

## Production Deployment

### Vercel (Easiest)

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy

### Manual

1. `npm run build`
2. Set environment variables on server
3. `npm run db:push` (run migrations)
4. `npm start`

---

**Keep this guide handy for quick reference! 📌**
