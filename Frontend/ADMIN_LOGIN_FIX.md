# Admin Login Not Working? Here's The Fix

## What Happened
Your app works, but the admin database tables don't exist. That's why you get errors when trying to login.

## The Fix (Choose One)

### 🟢 EASIEST - Copy & Paste SQL (Recommended)

1. Go to: https://app.supabase.com
2. Click your project: "Property listing website"
3. On the left, click: **SQL Editor**
4. Click: **New Query**
5. **Copy everything below** and paste it:

\`\`\`sql
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

-- Create RLS policies for admin_users
DROP POLICY IF EXISTS "Public read admin users" ON admin_users;
CREATE POLICY "Public read admin users for login" ON admin_users
  FOR SELECT
  USING (true);

-- Create RLS policies for contact_info
DROP POLICY IF EXISTS "Public read contact info" ON contact_info;
CREATE POLICY "Public read contact info" ON contact_info
  FOR SELECT
  USING (true);

-- Insert default admin user
INSERT INTO admin_users (email, password_hash, is_admin)
VALUES ('admin@propertylistings.com', '$2b$10$v.7EwZI1m2Ej8/bNFCi0aeJ9WjWQSW.JIrTVNLKS1hChOlkjPQU3a', true)
ON CONFLICT (email) DO NOTHING;

-- Insert default contact info
INSERT INTO contact_info (phone, email, address, hours)
VALUES ('+1 (555) 123-4567', 'info@propertylistings.com', '123 Business Ave, Suite 100', 'Mon-Fri: 9AM-6PM\nSat: 10AM-4PM\nSun: Closed')
ON CONFLICT DO NOTHING;
\`\`\`

6. Click: **Run** (or press Ctrl+Enter)
7. ✅ Done!

### Test It
1. Go to: `https://yourapp.com/admin-login`
2. Login with:
   - **Email:** admin@propertylistings.com
   - **Password:** admin123

## That's It!
You should now be able to:
- ✅ Login to admin dashboard
- ✅ Create property listings
- ✅ Upload images
- ✅ View customer inquiries
- ✅ Edit contact information

---

**Need help?** Check `QUICK_START.md` or `IMMEDIATE_SETUP_GUIDE.md` for more details.
