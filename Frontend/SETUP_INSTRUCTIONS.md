# Property Listing Website - Setup Instructions

## Overview
This is a complete property listing website built with Next.js, Supabase, and Vercel Blob. It includes:
- Public property listing and search
- Admin dashboard with authentication
- Contact management system
- Image upload functionality

## Prerequisites
- Node.js 18+
- Supabase account
- Vercel Blob account (or use your own storage)

## Environment Variables

Make sure you have these environment variables set in your Vercel project. Do NOT commit these to your repository - set them only in your Vercel project settings:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_JWT_SECRET
- BLOB_READ_WRITE_TOKEN

To set these in Vercel:
1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add each variable with its corresponding value
4. Redeploy your project

## Database Setup

### Step 1: Create Tables

Run the SQL migration script in your Supabase SQL editor:

1. Go to Supabase Dashboard → Your Project → SQL Editor
2. Click "New Query"
3. Copy and paste the content from `/scripts/02-complete-schema.sql`
4. Click "Run"

The script will create:
- `properties` - for property listings
- `property_images` - for property photos
- `categories` - for property types
- `inquiries` - for property inquiries
- `admin_users` - for admin authentication
- `contact_info` - for business contact details

### Step 2: Initialize Admin User

The default admin credentials are:
- **Email:** admin@propertylistings.com
- **Password:** admin123

These are automatically inserted when you run the SQL migration script.

## Running Locally

\`\`\`bash
# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with your Supabase and Blob credentials

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

## Feature Guide

### Admin Dashboard Access
1. Navigate to `/admin-login` (or click the "Admin" button in navbar)
2. Login with admin credentials
3. Access the admin dashboard at `/admin`

### Admin Dashboard Features
- **Properties Tab:** View, edit, and delete property listings
- **Inquiries Tab:** View all property inquiries/leads
- **Contact Info Tab:** Edit the contact information displayed on the website

### Contact Page
- Users can contact you via the contact form at `/contact`
- The contact details displayed are managed from the admin dashboard
- Email and phone links are functional for user convenience

### Property Management
- Create new listings at `/list-property`
- Edit existing properties at `/edit-property/[id]`
- Upload and manage images for each property
- Mark properties as featured on the homepage

## Deployment

### Deploy to Vercel

\`\`\`bash
# Push to GitHub (if using Git)
git push origin main

# Or deploy directly from Vercel dashboard
\`\`\`

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel Project Settings → Environment Variables
3. Deploy!

## Testing Checklist

- [ ] Homepage loads and displays featured properties
- [ ] Can view all properties at `/properties`
- [ ] Search filters work correctly
- [ ] Can view individual property details
- [ ] Contact form works at `/contact`
- [ ] Admin login works at `/admin-login`
- [ ] Admin dashboard loads after login
- [ ] Can create new property listings
- [ ] Can edit existing properties
- [ ] Can delete properties
- [ ] Can view inquiries
- [ ] Can edit contact information
- [ ] Contact info displays correctly on contact page

## Troubleshooting

### "Table not found" error
- Make sure you ran the SQL migration script in Supabase
- Verify all environment variables are set correctly

### Admin login not working
- Check that admin_users table exists in Supabase
- Verify the password hash is correct (default: admin123)

### Images not uploading
- Verify BLOB_READ_WRITE_TOKEN environment variable is set
- Check Vercel Blob is connected to your Vercel project

### Contact info not showing
- Ensure contact_info table has data
- Check API route `/api/contact-info` is working

## Support

If you encounter issues:
1. Check browser console for error messages
2. Check server logs in Vercel
3. Verify Supabase connection and table structures
4. Make sure all environment variables are set

## Default Credentials

**Admin Login:**
- Email: `admin@propertylistings.com`
- Password: `admin123`

**Default Contact Info:**
- Phone: +1 (555) 123-4567
- Email: info@propertylistings.com
- Address: 123 Business Ave, Suite 100
- Hours: Mon-Fri 9AM-6PM, Sat 10AM-4PM, Sun Closed

Change these immediately after first login in the admin dashboard!
