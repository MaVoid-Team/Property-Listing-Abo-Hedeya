-- Create admin users table for authentication
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create contact info table
CREATE TABLE contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  hours TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add category_id to properties table
ALTER TABLE properties ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id);

-- Enable RLS for new tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users (read-only for authenticated users)
CREATE POLICY "Admin users are not readable" 
  ON admin_users FOR SELECT 
  USING (false);

-- RLS Policies for contact_info (anyone can read)
CREATE POLICY "Anyone can view contact info" 
  ON contact_info FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can update contact info" 
  ON contact_info FOR UPDATE 
  USING (false);

-- Insert default contact info
INSERT INTO contact_info (phone, email, address, hours) 
VALUES ('+1 (555) 123-4567', 'info@propertylistings.com', '123 Business Ave, Suite 100', 'Mon-Fri: 9AM-6PM')
ON CONFLICT DO NOTHING;

-- Insert sample admin user (password: admin123, bcrypt hashed)
INSERT INTO admin_users (email, password_hash) 
VALUES ('admin@propertylistings.com', '$2b$10$v.7EwZI1m2Ej8/bNFCi0aeJ9WjWQSW.JIrTVNLKS1hChOlkjPQU3a')
ON CONFLICT DO NOTHING;
