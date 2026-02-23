import { db, client } from "@/lib/db";
import bcrypt from "bcryptjs";
import { generateAccountNumber } from "@/lib/utils";
import * as schemaSQLite from "@/db/schema-sqlite";
import * as schemaPostgres from "@/db/schema";

// Use the appropriate schema based on database type
const connectionString = process.env.DATABASE_URL || "file:./local.db";
const isSQLite = connectionString.startsWith("file:");

const schema = isSQLite ? schemaSQLite : schemaPostgres;
const { users, accounts, transactions } = schema;

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await db.delete(transactions);
    await db.delete(accounts);
    await db.delete(users);

    // Create demo users
    console.log("Creating users...");
    const hashedPassword = await bcrypt.hash("Demo123!", 10);

    const [user1] = await db
      .insert(users)
      .values({
        email: "john.doe@example.com",
        passwordHash: hashedPassword,
        fullName: "John Doe",
        emailVerified: true,
      })
      .returning();

    const [user2] = await db
      .insert(users)
      .values({
        email: "jane.smith@example.com",
        passwordHash: hashedPassword,
        fullName: "Jane Smith",
        emailVerified: true,
      })
      .returning();

    console.log("Creating accounts...");

    // John Doe's accounts
    const [johnChecking] = await db
      .insert(accounts)
      .values({
        userId: user1.id,
        accountNumber: generateAccountNumber(),
        accountType: "checking",
        balance: "5000.0000",
        currency: "USD",
        status: "active",
      })
      .returning();

    const [johnSavings] = await db
      .insert(accounts)
      .values({
        userId: user1.id,
        accountNumber: generateAccountNumber(),
        accountType: "savings",
        balance: "10000.0000",
        currency: "USD",
        status: "active",
      })
      .returning();

    // Jane Smith's account
    const [janeChecking] = await db
      .insert(accounts)
      .values({
        userId: user2.id,
        accountNumber: generateAccountNumber(),
        accountType: "checking",
        balance: "2500.0000",
        currency: "USD",
        status: "active",
      })
      .returning();

    console.log("Creating sample transactions...");

    // John's checking account transactions
    await db.insert(transactions).values([
      {
        accountId: johnChecking.id,
        type: "deposit",
        amount: "1000.0000",
        description: "Initial deposit",
        balanceAfter: "1000.0000",
        status: "completed",
        createdAt: new Date("2024-01-15T10:00:00Z"),
      },
      {
        accountId: johnChecking.id,
        type: "deposit",
        amount: "2000.0000",
        description: "Salary deposit",
        balanceAfter: "3000.0000",
        status: "completed",
        createdAt: new Date("2024-01-20T14:30:00Z"),
      },
      {
        accountId: johnChecking.id,
        type: "deposit",
        amount: "2000.0000",
        description: "Bonus payment",
        balanceAfter: "5000.0000",
        status: "completed",
        createdAt: new Date("2024-01-25T09:15:00Z"),
      },
    ]);

    // John's savings account transactions
    await db.insert(transactions).values([
      {
        accountId: johnSavings.id,
        type: "deposit",
        amount: "5000.0000",
        description: "Initial savings",
        balanceAfter: "5000.0000",
        status: "completed",
        createdAt: new Date("2024-01-10T11:00:00Z"),
      },
      {
        accountId: johnSavings.id,
        type: "deposit",
        amount: "5000.0000",
        description: "Additional savings",
        balanceAfter: "10000.0000",
        status: "completed",
        createdAt: new Date("2024-01-22T16:45:00Z"),
      },
    ]);

    // Jane's checking account transactions
    await db.insert(transactions).values([
      {
        accountId: janeChecking.id,
        type: "deposit",
        amount: "1500.0000",
        description: "Initial deposit",
        balanceAfter: "1500.0000",
        status: "completed",
        createdAt: new Date("2024-01-12T13:20:00Z"),
      },
      {
        accountId: janeChecking.id,
        type: "deposit",
        amount: "1000.0000",
        description: "Paycheck",
        balanceAfter: "2500.0000",
        status: "completed",
        createdAt: new Date("2024-01-18T10:30:00Z"),
      },
    ]);

    console.log("✅ Seed completed successfully!");
    console.log("\nDemo accounts:");
    console.log("1. Email: john.doe@example.com | Password: Demo123!");
    console.log("   - Checking: $5,000.00");
    console.log("   - Savings: $10,000.00");
    console.log("\n2. Email: jane.smith@example.com | Password: Demo123!");
    console.log("   - Checking: $2,500.00");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  } finally {
    // Close database connection (PostgreSQL only)
    const connectionString = process.env.DATABASE_URL || "file:./local.db";
    const isPostgres = connectionString.startsWith("postgres");
    if (isPostgres && typeof client.end === "function") {
      await client.end();
    } else if (typeof client.close === "function") {
      client.close();
    }
  }
}

seed();
