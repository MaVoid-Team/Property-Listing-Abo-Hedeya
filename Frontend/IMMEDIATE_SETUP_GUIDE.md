# Property Listing Website - Immediate Setup Guide

## Critical: Initialize Database Tables

Your app cannot work until these tables are created in Supabase. Follow these steps:

### Step 1: Access Supabase SQL Editor
1. Go to https://app.supabase.com
2. Select your project: "Property listing website"
3. Click "SQL Editor" in the left sidebar
4. Click "New Query"

### Step 2: Copy and Execute SQL
1. Copy the entire contents of `/scripts/03-setup-admin-tables.sql`
2. Paste it into the SQL editor
3. Click "Run" (or press Ctrl+Enter)
4. You should see success messages

### Step 3: Verify Tables Were Created
1. Go to "Table Editor" in the left sidebar
2. You should see these tables:
   - `admin_users` 
   - `contact_info`
   - `properties` (should already exist)
   - `property_images` (should already exist)
   - `inquiries` (should already exist)

### Step 4: Test Login
1. Go to `https://your-domain.vercel.app/admin-login`
2. Use these credentials:
   - Email: `admin@propertylistings.com`
   - Password: `admin123`

## Troubleshooting

### Error: "Cannot coerce the result to a single JSON object"
- This means the `admin_users` table doesn't exist
- Execute Step 2 above to create the tables

### Error: "email field unique constraint violation"
- The admin user already exists (good!)
- Just verify you can login

### Login fails with "Invalid credentials"
- Double-check your email and password are exactly:
  - Email: `admin@propertylistings.com`
  - Password: `admin123`

## What Gets Created

The SQL script creates:

1. **admin_users table** - Stores admin credentials
   - id (UUID)
   - email (unique)
   - password_hash (bcrypt)
   - is_admin (boolean)
   - timestamps

2. **contact_info table** - Stores business contact details
   - id (UUID)
   - phone
   - email
   - address
   - hours
   - timestamps

3. **Default admin user** with these credentials:
   - Email: admin@propertylistings.com
   - Password: admin123

4. **Default contact info** you can edit from admin dashboard

## Next Steps After Login Works

1. Edit contact info from admin dashboard
2. Create new property listings
3. Manage inquiries from users
4. Upload property images

---

**Total Setup Time: 2 minutes**

If you have issues, make sure you're using the correct Supabase project and that all environment variables are set in Vercel.
