import { db } from "./src/lib/db";
import { users, accounts } from "./src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { generateAccountNumber } from "./src/lib/utils";

async function main() {
    const email = "iamwaltergray@gmail.com";
    const password = "COlded90";
    const fullName = "Walter Gray";

    try {
        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Check if user exists
        const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);

        let userId;

        if (existing) {
            console.log("User already exists, updating role and password...");
            const [updated] = await db.update(users).set({
                role: "admin",
                passwordHash: passwordHash
            }).where(eq(users.id, existing.id)).returning();
            userId = updated.id;
        } else {
            console.log("Creating new admin user...");
            const [newUser] = await db.insert(users).values({
                email: email,
                passwordHash: passwordHash,
                fullName: fullName,
                emailVerified: true,
                role: "admin"
            }).returning();
            userId = newUser.id;

            // Create default checking account
            await db.insert(accounts).values({
                userId: userId,
                accountNumber: generateAccountNumber(),
                accountType: "checking",
                balance: "100000.0000",
                currency: "USD",
                status: "active",
            });
        }

        console.log(`✅ Success! You can now log in at http://localhost:3000/login`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

    } catch (error) {
        console.error("Error creating admin:", error);
    }
}

main();
