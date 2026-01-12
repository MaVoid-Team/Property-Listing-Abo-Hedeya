# Admin Login Reset - Fresh Account Setup

## The Problem
The admin password hash was not properly created, causing "Invalid Credentials" errors.

## The Solution - Choose One

### Option 1: Use the Fresh Reset Script (RECOMMENDED)
This is the easiest and fastest way.

1. Go to **Supabase Dashboard** → SQL Editor
2. Create a **New Query**
3. Copy and paste the contents of: **`scripts/04-reset-admin-fresh.sql`**
4. Click **Run**
5. Done!

**New Admin Credentials:**
- Email: `admin@propertylistings.com`
- Password: `TestAdmin123!`

### Option 2: Use a Custom Password
If you want to use your own password:

1. Open the file: **`scripts/generate-password-hash.mjs`**
2. Run it with your desired password:
   \`\`\`bash
   node scripts/generate-password-hash.mjs "YourNewPassword123!"
   \`\`\`
3. Copy the generated hash
4. Go to Supabase Dashboard → SQL Editor
5. Run this query:
   \`\`\`sql
   DELETE FROM admin_users WHERE email = 'admin@propertylistings.com';
   INSERT INTO admin_users (email, password_hash, is_admin)
   VALUES ('admin@propertylistings.com', 'PASTE_YOUR_HASH_HERE', true);
   \`\`\`
6. Replace `PASTE_YOUR_HASH_HERE` with the hash from step 2
7. Click **Run**

## After Reset
1. Go to: `https://yourapp.vercel.app/admin-login`
2. Enter your email and password
3. Click Login
4. You should see the Admin Dashboard

## If Still Not Working
- Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Try an incognito/private window
- Check that Supabase environment variables are set in Vercel

## What Was Wrong
The original password hash was never properly generated and inserted into the database. This fresh setup creates a brand new admin user with a correctly hashed password.
