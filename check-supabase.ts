import postgres from "postgres";

async function check() {
    const SUPABASE_URL = "postgresql://postgres.byjpaxkzmvrihzedqnia:COlded9090!@aws-1-eu-west-1.pooler.supabase.com:5432/postgres";
    const pg = postgres(SUPABASE_URL, { ssl: { rejectUnauthorized: false }, prepare: false });

    try {
        const users = await pg`SELECT email, password_hash, role FROM users`;
        console.log("Users in Supabase:", users);
    } catch (e) {
        console.error(e);
    } finally {
        await pg.end();
    }
}
check();
