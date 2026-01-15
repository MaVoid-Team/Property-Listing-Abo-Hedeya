// Centralized API client for Rails backend
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  errors?: string[];
}

export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// Get auth token from localStorage (client-side only)
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
}

// Save auth token to localStorage
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminToken', token);
  }
}

// Remove auth token from localStorage
export function clearAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

// Main API client function
export async function apiClient<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  
  const url = `${API_BASE}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  // Handle JWT token from response header (for login)
  const authHeader = response.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const newToken = authHeader.replace('Bearer ', '');
    setAuthToken(newToken);
  }
  
  // Handle empty responses (204 No Content)
  if (response.status === 204) {
    return {} as T;
  }
  
  const data = await response.json();
  
  if (!response.ok) {
    const errorMessage = data.error || data.errors?.join(', ') || data.message || 'An error occurred';
    throw new ApiError(errorMessage, response.status);
  }
  
  return data as T;
}

// Convenience methods
export const api = {
  get: <T = unknown>(endpoint: string) => 
    apiClient<T>(endpoint, { method: 'GET' }),
  
  post: <T = unknown>(endpoint: string, body?: unknown) =>
    apiClient<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  put: <T = unknown>(endpoint: string, body?: unknown) =>
    apiClient<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  patch: <T = unknown>(endpoint: string, body?: unknown) =>
    apiClient<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  delete: <T = unknown>(endpoint: string) =>
    apiClient<T>(endpoint, { method: 'DELETE' }),
};

// Upload file with multipart form data
export async function uploadFile(
  endpoint: string,
  file: File,
  additionalFields?: Record<string, string>
): Promise<unknown> {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append('image', file);
  
  if (additionalFields) {
    Object.entries(additionalFields).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }
  
  const headers: HeadersInit = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers,
    body: formData,
  });
  
  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(data.error || 'Upload failed', response.status);
  }
  
  return response.json();
}

