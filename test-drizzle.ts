import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { users } from "./src/db/schema";
import { eq } from "drizzle-orm";

async function testQuery() {
    const connectionString = "postgresql://postgres.byjpaxkzmvrihzedqnia:COlded9090!@aws-1-eu-west-1.pooler.supabase.com:5432/postgres";
    const pgClient = postgres(connectionString, {
        prepare: false,
        ssl: { rejectUnauthorized: false }
    });
    const db = drizzle(pgClient);

    try {
        console.log("Running Drizzle query...");
        const result = await db.select().from(users).where(eq(users.email, "iamwaltergray@gmail.com")).limit(1);
        console.log("Success:", result);
    } catch (e) {
        console.error("Drizzle Query Error:", e);
    } finally {
        await pgClient.end();
    }
}

testQuery();
