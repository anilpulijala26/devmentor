import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Server-side validation
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Query database for user
    const userResult = await dbQuery("SELECT id, name FROM users WHERE email = $1", [
      normalizedEmail,
    ]);

    const userExists = userResult.rows.length > 0;

    if (userExists) {
      const user = userResult.rows[0];
      // Log for developer context (no real email sending integration is set up yet)
      console.log(`[Forgot Password] Triggered for user: ${user.name} (${normalizedEmail})`);
    } else {
      console.log(`[Forgot Password] Requested for non-existent email: ${normalizedEmail}`);
    }

    // Always return a generic message to prevent email enumeration
    return NextResponse.json(
      {
        message: "If an account exists, password reset instructions will be sent.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}
