import Database from "better-sqlite3";
import postgres from "postgres";
import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

async function run() {
    console.log("Connecting to SQLite...");
    // Open local SQLite database
    const sqlite = new Database("./local.db");

    const SUPABASE_URL = "postgresql://postgres.byjpaxkzmvrihzedqnia:COlded9090!@aws-1-eu-west-1.pooler.supabase.com:5432/postgres";
    console.log("Connecting to Postgres...");
    // Important: no SSL object provided if pooler is not strict about it or strictly require ssl: { rejectUnauthorized: false }
    const pg = postgres(SUPABASE_URL, { ssl: { rejectUnauthorized: false }, prepare: false });

    try {
        console.log("Emptying target database to prepare for overwrite...");
        await pg`TRUNCATE TABLE transactions, accounts, users CASCADE;`;

        const parseDate = (val: any) => {
            if (!val) return new Date().toISOString();
            // Test if it's already a number or can be parsed to a valid number
            if (typeof val === "number" || !isNaN(Number(val))) {
                return new Date(Number(val)).toISOString();
            }
            // Fallback to JS Date parser
            const parsed = new Date(val);
            if (isNaN(parsed.getTime())) return new Date().toISOString();
            return parsed.toISOString();
        };

        console.log("Reading SQLite users...");
        const users = sqlite.prepare("SELECT * FROM users").all();
        console.log(`Found ${users.length} users. Transferring...`);
        for (const user of users as any[]) {
            await pg`
                INSERT INTO users (id, email, password_hash, full_name, email_verified, role, created_at, updated_at)
                VALUES (
                    ${user.id}, 
                    ${user.email}, 
                    ${user.password_hash}, 
                    ${user.full_name}, 
                    ${user.email_verified === 1 ? true : false}, 
                    ${user.role}, 
                    ${parseDate(user.created_at)}::timestamp, 
                    ${parseDate(user.updated_at)}::timestamp
                )
                ON CONFLICT (id) DO NOTHING;
            `;
        }
        console.log("✅ Users migrated.\n");

        console.log("Reading SQLite accounts...");
        const accounts = sqlite.prepare("SELECT * FROM accounts").all();
        console.log(`Found ${accounts.length} accounts. Transferring...`);
        for (const account of accounts as any[]) {
            await pg`
                INSERT INTO accounts (id, user_id, account_number, account_type, balance, currency, status, allow_withdrawals, created_at, updated_at)
                VALUES (
                    ${account.id}, 
                    ${account.user_id}, 
                    ${account.account_number}, 
                    ${account.account_type}, 
                    ${account.balance}, 
                    ${account.currency}, 
                    ${account.status}, 
                    ${account.allow_withdrawals === 1 ? true : false},
                    ${parseDate(account.created_at)}::timestamp, 
                    ${parseDate(account.updated_at)}::timestamp
                )
                ON CONFLICT (id) DO NOTHING;
            `;
        }
        console.log("✅ Accounts migrated.\n");

        console.log("Reading SQLite transactions...");
        const transactions = sqlite.prepare("SELECT * FROM transactions").all();
        console.log(`Found ${transactions.length} transactions. Transferring...`);
        for (const tx of transactions as any[]) {
            let createdAtStr: string;
            // SQLite `transactions.createdAt` might be an actual integer or a literal custom string due to previous backdate injections 
            if (typeof tx.created_at === "number") {
                createdAtStr = new Date(tx.created_at).toISOString();
            } else if (typeof tx.created_at === "string") {
                createdAtStr = tx.created_at; // keep "Feb 19, 2026, 12:30 PM"
            } else {
                createdAtStr = new Date().toISOString();
            }

            await pg`
                INSERT INTO transactions (id, account_id, type, amount, description, balance_after, status, created_at)
                VALUES (
                    ${tx.id}, 
                    ${tx.account_id}, 
                    ${tx.type}, 
                    ${tx.amount}, 
                    ${tx.description || null}, 
                    ${tx.balance_after || null}, 
                    ${tx.status}, 
                    ${createdAtStr}
                )
                ON CONFLICT (id) DO NOTHING;
            `;
        }
        console.log("✅ Transactions migrated.\n");

        console.log("🎉 All data successfully streamed from Local PC -> Supabase Database!");

    } catch (e) {
        console.error("Migration failed:", e);
    } finally {
        sqlite.close();
        await pg.end();
    }
}

run();
