// Inquiries API functions
import { api } from './client';
import type { Inquiry } from '../types';

export interface CreateInquiryData {
  property_id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

// Get all inquiries (admin only)
export async function getInquiries(): Promise<Inquiry[]> {
  return api.get<Inquiry[]>('/api/v1/inquiries');
}

// Get a single inquiry by ID (admin only)
export async function getInquiry(id: string): Promise<Inquiry> {
  return api.get<Inquiry>(`/api/v1/inquiries/${id}`);
}

// Create a new inquiry (public)
export async function createInquiry(data: CreateInquiryData): Promise<Inquiry> {
  return api.post<Inquiry>('/api/v1/inquiries', { inquiry: data });
}

