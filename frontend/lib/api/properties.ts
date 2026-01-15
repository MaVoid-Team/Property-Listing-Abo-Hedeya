// Properties API functions
import { api, uploadFile } from './client';
import type { Property, PropertyImage } from '../types';

export interface PropertyWithImages extends Property {
  property_images: PropertyImage[];
}

export interface PropertiesFilters {
  available?: boolean;
  featured?: boolean;
  property_type?: string;
  location?: string;
  min_price?: number;
  max_price?: number;
}

export interface CreatePropertyData {
  title: string;
  description?: string;
  address: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  property_type: string;
  status?: string;
  featured?: boolean;
  category_id?: string;
}

// Build query string from filters
function buildQueryString(filters: PropertiesFilters): string {
  const params = new URLSearchParams();
  
  if (filters.available) params.append('available', 'true');
  if (filters.featured) params.append('featured', 'true');
  if (filters.property_type) params.append('property_type', filters.property_type);
  if (filters.location) params.append('location', filters.location);
  if (filters.min_price) params.append('min_price', filters.min_price.toString());
  if (filters.max_price) params.append('max_price', filters.max_price.toString());
  
  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

// Get all properties with optional filters
export async function getProperties(filters: PropertiesFilters = {}): Promise<PropertyWithImages[]> {
  const queryString = buildQueryString(filters);
  return api.get<PropertyWithImages[]>(`/api/v1/properties${queryString}`);
}

// Get a single property by ID
export async function getProperty(id: string): Promise<PropertyWithImages> {
  return api.get<PropertyWithImages>(`/api/v1/properties/${id}`);
}

// Create a new property
export async function createProperty(data: CreatePropertyData): Promise<Property> {
  return api.post<Property>('/api/v1/properties', { property: data });
}

// Update an existing property
export async function updateProperty(id: string, data: Partial<CreatePropertyData>): Promise<Property> {
  return api.patch<Property>(`/api/v1/properties/${id}`, { property: data });
}

// Delete a property
export async function deleteProperty(id: string): Promise<void> {
  await api.delete(`/api/v1/properties/${id}`);
}

// Upload an image for a property
export async function uploadPropertyImage(
  propertyId: string, 
  file: File, 
  isPrimary: boolean = false
): Promise<PropertyImage> {
  return uploadFile(
    `/api/v1/properties/${propertyId}/images`,
    file,
    { is_primary: isPrimary ? 'true' : 'false' }
  ) as Promise<PropertyImage>;
}

// Delete a property image
export async function deletePropertyImage(imageId: string): Promise<void> {
  await api.delete(`/api/v1/property_images/${imageId}`);
}

