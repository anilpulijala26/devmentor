import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    const registerUrl = new URL("/register", request.url);
    return NextResponse.redirect(registerUrl);
  }

  return NextResponse.next();
}

// Protect all private student routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/courses/:path*",
    "/lessons/:path*",
    "/challenges/:path*",
    "/tasks/:path*",
    "/projects/:path*",
    "/roadmaps/:path*",
    "/learn/:path*",
    "/code-review/:path*",
  ],
};
