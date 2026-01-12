export interface Property {
  id: string
  title: string
  description?: string
  address: string
  price: number
  bedrooms?: number
  bathrooms?: number
  area?: number
  property_type: string
  status: string
  featured: boolean
  created_at: string
  updated_at: string
  created_by: string
}

export interface PropertyImage {
  id: string
  property_id: string
  image_url: string
  blob_url?: string
  is_primary: boolean
  created_at: string
}

export interface Inquiry {
  id: string
  property_id: string
  name: string
  email: string
  phone?: string
  message: string
  created_at: string
}

export interface Category {
  id: string
  name: string
  created_at: string
}

export interface ContactInfo {
  id: string
  phone: string
  email: string
  address: string
  hours: string
  updated_at: string
}
