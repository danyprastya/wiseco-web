// JWT Authentication utilities
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { adminUsersService } from './firebase-service';
import { AdminUser } from './db-types';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-fallback-secret-key-min-32-chars!'
);

const COOKIE_NAME = 'wiseco_auth_token';
const TOKEN_EXPIRY = '7d'; // Token valid for 7 days

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
  [key: string]: unknown;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Create a JWT token
 */
export async function createToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

/**
 * Set auth cookie
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

/**
 * Remove auth cookie
 */
export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Get auth cookie
 */
export async function getAuthCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  return cookie?.value || null;
}

/**
 * Get current authenticated user from cookie
 */
export async function getCurrentUser(): Promise<JWTPayload | null> {
  const token = await getAuthCookie();
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Authenticate user with email and password
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  try {
    const user = await adminUsersService.getByEmail(email);
    
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }
    
    if (!user.isActive) {
      return { success: false, error: 'Account is deactivated' };
    }
    
    const isValid = await verifyPassword(password, user.passwordHash);
    
    if (!isValid) {
      return { success: false, error: 'Invalid email or password' };
    }
    
    // Update last login
    await adminUsersService.updateLastLogin(user.id);
    
    return { success: true, user };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, error: 'An error occurred during authentication' };
  }
}

/**
 * Initialize admin user if none exists
 */
export async function initializeAdminUser(): Promise<{ created: boolean; email: string }> {
  try {
    const users = await adminUsersService.getAll(false);
    const email = process.env.ADMIN_EMAIL || 'admin@wiseco.id';
    
    if (users.length === 0) {
      const password = process.env.ADMIN_PASSWORD || 'WisecoAdmin2024!';
      
      const hashedPassword = await hashPassword(password);
      
      await adminUsersService.create({
        email: email.toLowerCase(),
        passwordHash: hashedPassword,
        name: 'Admin',
        role: 'super_admin',
        isActive: true,
      });
      
      console.log('✅ Initial admin user created:', email);
      return { created: true, email: email.toLowerCase() };
    } else {
      console.log('ℹ️ Admin user already exists');
      return { created: false, email: users[0].email };
    }
  } catch (error) {
    console.error('❌ Error initializing admin user:', error);
    throw error;
  }
}
