// Database-agnostic schema helper
// Automatically uses the correct table type based on DATABASE_URL

const databaseUrl = process.env.DATABASE_URL || "file:./local.db";
const isSQLite = databaseUrl.startsWith("file:");

// Export the appropriate modules based on database type
export const {
  text: varchar,
  integer: sqliteInteger,
  real,
  blob,
  text,
} = isSQLite
  ? await import("drizzle-orm/sqlite-core")
  : { text: null as any, integer: null as any, real: null as any, blob: null as any };

export const {
  pgTable,
  uuid: pgUuid,
  varchar: pgVarchar,
  timestamp: pgTimestamp,
  boolean: pgBoolean,
  pgEnum,
  decimal: pgDecimal,
  text: pgText,
  jsonb: pgJsonb,
} = !isSQLite
  ? await import("drizzle-orm/pg-core")
  : {
      pgTable: null as any,
      uuid: null as any,
      varchar: null as any,
      timestamp: null as any,
      boolean: null as any,
      pgEnum: null as any,
      decimal: null as any,
      text: null as any,
      jsonb: null as any,
    };

export const {
  sqliteTable,
  text: sqliteText,
  integer,
} = isSQLite
  ? await import("drizzle-orm/sqlite-core")
  : { sqliteTable: null as any, text: null as any, integer: null as any };

export { isSQLite };
