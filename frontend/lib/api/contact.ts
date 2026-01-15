// Contact Info API functions
import { api } from './client';
import type { ContactInfo } from '../types';

export interface UpdateContactInfoData {
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
}

// Get contact information (public)
export async function getContactInfo(): Promise<ContactInfo> {
  return api.get<ContactInfo>('/api/v1/contact_info');
}

// Update contact information (admin only)
export async function updateContactInfo(data: UpdateContactInfoData): Promise<ContactInfo> {
  return api.patch<ContactInfo>('/api/v1/contact_info', { contact_info: data });
}

