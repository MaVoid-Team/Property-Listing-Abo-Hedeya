// Authentication API functions
import { api, setAuthToken, clearAuthToken, ApiError } from './client';

export interface AdminUser {
  id: string;
  email: string;
  is_admin: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  admin?: AdminUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Login admin user
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  
  const response = await fetch(`${API_BASE}/api/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      admin_user: {
        email: credentials.email,
        password: credentials.password,
      },
    }),
  });
  
  // Get JWT token from Authorization header
  const authHeader = response.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '');
    setAuthToken(token);
    
    // Also store the email
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminEmail', credentials.email);
    }
  }
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(data.message || 'Login failed', response.status);
  }
  
  return data;
}

// Logout admin user
export async function logout(): Promise<void> {
  try {
    await api.delete('/api/v1/logout');
  } catch (error) {
    // Ignore errors on logout - still clear local state
    console.warn('Logout API call failed:', error);
  } finally {
    clearAuthToken();
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('adminToken');
}

// Get current admin email
export function getAdminEmail(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminEmail');
}

