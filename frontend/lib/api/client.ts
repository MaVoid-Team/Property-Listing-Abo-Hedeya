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
  
  let response: Response;
  
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (networkError) {
    // Network error (CORS, offline, etc.)
    console.error('Network error:', networkError);
    throw new ApiError('Network error. Please check your connection.', 0);
  }
  
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
  
  // Parse JSON response with error handling
  let data: T;
  try {
    data = await response.json();
  } catch (parseError) {
    // Response is not valid JSON
    if (!response.ok) {
      throw new ApiError(`Request failed with status ${response.status}`, response.status);
    }
    // Successful response but empty/invalid body - return empty object
    return {} as T;
  }
  
  if (!response.ok) {
    const errorMessage = (data as Record<string, unknown>).error as string || 
      ((data as Record<string, unknown>).errors as string[])?.join(', ') || 
      (data as Record<string, unknown>).message as string || 
      'An error occurred';
    throw new ApiError(errorMessage, response.status);
  }
  
  return data;
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
  
  let response: Response;
  
  try {
    response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });
  } catch (networkError) {
    console.error('Upload network error:', networkError);
    throw new ApiError('Network error during upload. Please check your connection.', 0);
  }
  
  // For successful responses (2xx), try to parse JSON
  if (response.ok) {
    try {
      return await response.json();
    } catch {
      // No JSON body or empty response - that's okay for success
      return {};
    }
  }
  
  // For error responses, try to get error message from body
  try {
    const errorData = await response.json() as Record<string, unknown>;
    throw new ApiError(
      (errorData.error as string) || (errorData.errors as string[])?.join(', ') || 'Upload failed', 
      response.status
    );
  } catch (e) {
    if (e instanceof ApiError) throw e;
    throw new ApiError(`Upload failed with status ${response.status}`, response.status);
  }
}

