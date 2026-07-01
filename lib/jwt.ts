import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  // During build time JWT_SECRET might not be defined. Using a safe fallback
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET environment variable is required in production.");
  }
}

const SECRET = JWT_SECRET || "fallback-local-dev-secret-key-123!";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Sign user details into a JWT token
 */
export function signJWT(payload: JWTPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

/**
 * Verify a JWT token and return the decoded payload or null if invalid/expired
 */
export function verifyJWT(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}
