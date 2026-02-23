import { drizzle as drizzleSQLite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import Database from "better-sqlite3";
import postgres from "postgres";
import * as schemaSQLite from "@/db/schema-sqlite";
import * as schemaPostgres from "@/db/schema";

const connectionString = process.env.DATABASE_URL && process.env.DATABASE_URL !== "file:./local.db"
  ? process.env.DATABASE_URL
  : "postgresql://postgres.byjpaxkzmvrihzedqnia:COlded9090!@aws-1-eu-west-1.pooler.supabase.com:5432/postgres";

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
  // PostgreSQL setup for Supabase/Production
  const pgClient = postgres(connectionString, {
    prepare: false,
    ssl: { rejectUnauthorized: false }
  });

  db = drizzlePostgres(pgClient, { schema: schemaPostgres });
  client = pgClient;
}

export { db, client };
