import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { dbQuery } from "@/lib/db";
import { signJWT } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await dbQuery("SELECT id FROM users WHERE email = $1", [
      normalizedEmail,
    ]);

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    // Generate standard UUID
    const userId = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user into PostgreSQL
    await dbQuery(
      `INSERT INTO users (id, name, email, password_hash, role, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, name.trim(), normalizedEmail, passwordHash, "student", "active"]
    );

    // Create JWT token
    const token = signJWT({
      userId,
      email: normalizedEmail,
      role: "student",
    });

    // Set token cookie securely
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    // Return success response without returning password/hash
    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: userId,
          name: name.trim(),
          email: normalizedEmail,
          role: "student",
          status: "active",
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register Error:", {
      message: error?.message,
      stack: error?.stack,
      code: error?.code,
      detail: error?.detail,
    });
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}
