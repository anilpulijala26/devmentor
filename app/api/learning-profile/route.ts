import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  LEARNING_LEVEL_OPTIONS,
  type LearningLevelKey,
  serializeLearningProfileCookie,
} from "@/lib/learningProfile";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const levelKey = body?.levelKey as LearningLevelKey | undefined;

    if (!levelKey || !LEARNING_LEVEL_OPTIONS.some((option) => option.key === levelKey)) {
      return NextResponse.json({ error: "A valid learning level is required." }, { status: 400 });
    }

    const cookieStore = await cookies();
    cookieStore.set("learning_profile", serializeLearningProfileCookie(levelKey), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Learning profile update failed:", error);
    return NextResponse.json({ error: "Unable to save learning profile." }, { status: 500 });
  }
}

