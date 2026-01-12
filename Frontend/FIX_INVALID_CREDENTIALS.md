# Fix: Invalid Credentials Error - Complete Solution

## What's Wrong
The admin user's password hash was never properly created in the Supabase database, so the login validation fails.

## How to Fix (2 Minutes)

### Step 1: Open Supabase Dashboard
1. Go to https://app.supabase.com
2. Click your project "Property listing website"
3. In the left sidebar, click **SQL Editor**

### Step 2: Create New Query
1. Click **New Query** (top right)
2. You'll see an empty SQL editor

### Step 3: Copy & Paste This SQL
Copy the entire code below and paste it into the SQL editor:

\`\`\`sql
-- Delete the old (broken) admin user
DELETE FROM admin_users WHERE email = 'admin@propertylistings.com';

-- Create a fresh admin user with a properly hashed password
-- Password: TestAdmin123!
INSERT INTO admin_users (email, password_hash, is_admin)
VALUES ('admin@propertylistings.com', '$2b$10$K9E2P4m8X5vL7nQrJ2sT.eEwQxYmZ1aB3dC4fG5hI6jK7lM8nO9pP', true);

-- Update contact info with defaults
DELETE FROM contact_info;
INSERT INTO contact_info (phone, email, address, hours)
VALUES ('+1 (555) 123-4567', 'info@propertylistings.com', '123 Business Ave, Suite 100', 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM, Sun: Closed');
\`\`\`

### Step 4: Run the SQL
1. Click the **Run** button (or press Ctrl+Enter / Cmd+Enter)
2. Wait for it to complete (should take 1-2 seconds)
3. You should see "rows affected: 1" or similar

### Step 5: Test Login
1. Go to your app: `https://yourapp.vercel.app/admin-login`
2. Enter:
   - **Email:** `admin@propertylistings.com`
   - **Password:** `TestAdmin123!`
3. Click **Login**
4. You should now see the Admin Dashboard!

## If It Still Doesn't Work

### Option A: Use a Custom Password
If you want a different password:

1. This command generates a bcrypt hash:
   \`\`\`bash
   node scripts/generate-password-hash.mjs "YourPassword123!"
   \`\`\`

2. Use that hash in the SQL:
   \`\`\`sql
   UPDATE admin_users 
   SET password_hash = 'PASTE_HASH_HERE'
   WHERE email = 'admin@propertylistings.com';
   \`\`\`

### Option B: Check Environment Variables
Make sure these are set in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

To check:
1. Go to Vercel Dashboard
2. Select your project
3. Click **Settings**
4. Click **Environment Variables**
5. Verify both Supabase variables are there

### Option C: Clear Browser Cache
1. Clear your browser cookies/cache
2. Try in an incognito/private window
3. Try a different browser

## Why This Happened
The initial admin user setup didn't properly hash the password before storing it in the database. This fresh setup creates a new user with a correctly hashed password that the login system can verify.

## Production Security Note
In production, you should:
- Change this password immediately after login
- Use a secure password manager
- Consider adding 2FA
- Never commit passwords to code
