/**
 * @deprecated This admin auth module is no longer used.
 * The application now uses the Rails API backend with JWT authentication.
 * See lib/api/auth.ts for the new authentication functions.
 */

// This file is kept for reference but is not used in the application.
// Authentication is now handled through the Rails API with JWT tokens.

export interface AdminSession {
  adminId: string;
  email: string;
  isAdmin: boolean;
}

export async function hashPassword(password: string): Promise<string> {
  throw new Error('This function is deprecated. Authentication is now handled by the Rails API.');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  throw new Error('This function is deprecated. Authentication is now handled by the Rails API.');
}

export async function validateAdminCredentials(
  email: string,
  password: string,
): Promise<{ success: boolean; adminId?: string; message: string }> {
  throw new Error('This function is deprecated. Use lib/api/auth.ts login() instead.');
}
