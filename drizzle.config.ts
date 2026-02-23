import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL || "file:./local.db";

// Detect database type from URL
const isSQLite = databaseUrl.startsWith("file:");

const config: Config = isSQLite
  ? // SQLite Configuration (Local Development)
    {
      schema: "./src/db/schema-sqlite/index.ts",
      out: "./src/db/migrations-sqlite",
      dialect: "sqlite",
      dbCredentials: {
        url: databaseUrl,
      },
    }
  : // PostgreSQL Configuration (Supabase/Production)
    {
      schema: "./src/db/schema/index.ts",
      out: "./src/db/migrations",
      dialect: "postgresql",
      dbCredentials: {
        url: databaseUrl,
      },
    };

export default config;
