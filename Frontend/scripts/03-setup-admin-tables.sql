-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  hours TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin_users (allow queries for login verification)
DROP POLICY IF EXISTS "Public read admin users" ON admin_users;
CREATE POLICY "Public read admin users for login" ON admin_users
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admin can update users" ON admin_users;
CREATE POLICY "Admin can update users" ON admin_users
  FOR UPDATE
  USING (false);

-- Create RLS policies for contact_info (everyone can read, no one can write)
DROP POLICY IF EXISTS "Public read contact info" ON contact_info;
CREATE POLICY "Public read contact info" ON contact_info
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Disable contact updates" ON contact_info;
CREATE POLICY "Disable contact updates" ON contact_info
  FOR UPDATE
  USING (false);

-- Insert default admin user if not exists
-- Password: admin123 (bcrypt hashed)
INSERT INTO admin_users (email, password_hash, is_admin)
VALUES ('admin@propertylistings.com', '$2b$10$v.7EwZI1m2Ej8/bNFCi0aeJ9WjWQSW.JIrTVNLKS1hChOlkjPQU3a', true)
ON CONFLICT (email) DO NOTHING;

-- Insert default contact info if not exists
INSERT INTO contact_info (phone, email, address, hours)
VALUES ('+1 (555) 123-4567', 'info@propertylistings.com', '123 Business Ave, Suite 100', 'Mon-Fri: 9AM-6PM\nSat: 10AM-4PM\nSun: Closed')
ON CONFLICT DO NOTHING;
