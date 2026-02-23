"use server";

import { db } from "@/lib/db";
import { users, accounts } from "@/db/schema";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { generateAccountNumber } from "@/lib/utils";

export async function registerUser(data: RegisterInput) {
  try {
    // Validate input
    const validated = registerSchema.parse(data);

    // Check if user already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, validated.email))
      .limit(1);

    if (existingUser) {
      return {
        success: false,
        error: "A user with this email already exists",
      };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(validated.password, 10);

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        email: validated.email,
        passwordHash,
        fullName: validated.fullName,
      })
      .returning();

    // Create default checking account
    await db.insert(accounts).values({
      userId: newUser.id,
      accountNumber: generateAccountNumber(),
      accountType: "checking",
      balance: "0.0000",
      currency: "USD",
      status: "active",
    });

    return {
      success: true,
      message: "Account created successfully. Please log in.",
    };
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred during registration",
    };
  }
}
