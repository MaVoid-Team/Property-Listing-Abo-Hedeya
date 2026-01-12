# Quick Start - Get Admin Login Working

## The Problem
Your app needs two database tables that don't exist yet: `admin_users` and `contact_info`

## The Solution (2 minutes)

### Option A: Manual Setup (Most Reliable)
1. Open: https://app.supabase.com
2. Select your project
3. Click **SQL Editor** on left sidebar
4. Click **New Query**
5. Copy-paste all contents from: **scripts/03-setup-admin-tables.sql**
6. Click **Run**
7. Done! Go to `/admin-login` and login

### Option B: Automatic Setup
\`\`\`bash
# Make sure you have these environment variables set:
export NEXT_PUBLIC_SUPABASE_URL="your-url"
export SUPABASE_SERVICE_ROLE_KEY="your-key"

# Then run:
node scripts/setup-database.mjs
\`\`\`

## Test It Works
1. Visit: `https://yourapp.vercel.app/admin-login`
2. Login with:
   - Email: `admin@propertylistings.com`
   - Password: `admin123`
3. You should see the admin dashboard with Properties, Inquiries, and Contact Info tabs

## Common Errors

| Error | Fix |
|-------|-----|
| "Cannot coerce result to JSON" | Tables don't exist - run SQL from scripts/03-setup-admin-tables.sql |
| "Invalid credentials" | Check email/password are exactly as shown above |
| 406 Not Found | Same as first error - need to run SQL setup |

## Default Credentials
- **Email:** admin@propertylistings.com
- **Password:** admin123

Change these in the admin dashboard after first login!
