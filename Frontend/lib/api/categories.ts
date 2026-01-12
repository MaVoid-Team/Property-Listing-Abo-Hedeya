// Categories API functions
import { api } from './client';
import type { Category } from '../types';

// Get all categories
export async function getCategories(): Promise<Category[]> {
  return api.get<Category[]>('/api/v1/categories');
}

// Get a single category by ID
export async function getCategory(id: string): Promise<Category> {
  return api.get<Category>(`/api/v1/categories/${id}`);
}

