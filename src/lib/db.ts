import { drizzle as drizzleSQLite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import Database from "better-sqlite3";
import postgres from "postgres";
import dns from "node:dns";
import * as schemaSQLite from "@/db/schema-sqlite";
import * as schemaPostgres from "@/db/schema";

// Fix Vercel Serverless dropping Supabase pooler DNS via IPv6 dead-ends
if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

const connectionString = process.env.DATABASE_URL && process.env.DATABASE_URL !== "file:./local.db"
  ? process.env.DATABASE_URL
  : "postgresql://postgres.byjpaxkzmvrihzedqnia:COlded9090!@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

// Detect database type
const isSQLite = connectionString.startsWith("file:");

let db: any;
let client: any;

if (isSQLite) {
  // SQLite setup for local development
  const sqliteFile = connectionString.replace("file:", "");
  const sqlite = new Database(sqliteFile);

  // Enable foreign keys for SQLite
  sqlite.pragma("foreign_keys = ON");

  db = drizzleSQLite(sqlite, { schema: schemaSQLite });
  client = sqlite;
} else {
  // PostgreSQL setup for Supabase/Production serverless environments
  const pgClient = postgres(connectionString, {
    max: 1, // Maximize compatibility with serverless execution by limiting to 1 connection per instance
    prepare: false, // Mandated by Supabase transaction pooler port 6543 mode
    ssl: { rejectUnauthorized: false },
    idle_timeout: 20 // Let connection close quickly when idle to restore Supabase pool
  });

  db = drizzlePostgres(pgClient, { schema: schemaPostgres });
  client = pgClient;
}

export { db, client };
