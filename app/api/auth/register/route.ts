import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { dbQuery } from "@/lib/db";
import { signJWT } from "@/lib/jwt";
import {
  LEARNING_LEVEL_OPTIONS,
  serializeLearningProfileCookie,
  type LearningLevelKey,
} from "@/lib/learningProfile";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword, levelKey } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await dbQuery("SELECT id FROM users WHERE email = $1", [normalizedEmail]);

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 },
      );
    }

    const userId = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 10);

    await dbQuery(
      `INSERT INTO users (id, name, email, password_hash, role, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, name.trim(), normalizedEmail, passwordHash, "student", "active"],
    );

    const token = signJWT({ userId, email: normalizedEmail, role: "student" });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    if (levelKey && LEARNING_LEVEL_OPTIONS.some((option) => option.key === levelKey)) {
      cookieStore.set("learning_profile", serializeLearningProfileCookie(levelKey as LearningLevelKey), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 365 * 24 * 60 * 60,
      });
    }

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
      { status: 201 },
    );
  } catch (error: unknown) {
    const errorObject = typeof error === "object" && error !== null ? (error as Record<string, unknown>) : null;
    console.error("Register Error:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      code: typeof errorObject?.code === "string" ? errorObject.code : undefined,
      detail: typeof errorObject?.detail === "string" ? errorObject.detail : undefined,
    });
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}

