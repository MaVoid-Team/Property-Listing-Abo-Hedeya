# Deployment Checklist

## Pre-Deployment

### 1. Database Setup (CRITICAL)
- [ ] Created Supabase project
- [ ] Added environment variables to Vercel
- [ ] Ran SQL migration script (`/scripts/02-complete-schema.sql`) in Supabase
- [ ] Verified all tables created: admin_users, properties, property_images, categories, inquiries, contact_info
- [ ] Verified admin user created (admin@propertylistings.com)
- [ ] Verified default contact info inserted

### 2. Environment Variables
In your Vercel project → Settings → Environment Variables, add:
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `SUPABASE_JWT_SECRET`
- [ ] `BLOB_READ_WRITE_TOKEN`

### 3. Integrations
- [ ] Supabase connected to Vercel
- [ ] Vercel Blob connected to Vercel

### 4. Local Testing
\`\`\`bash
# Install dependencies
npm install

# Create .env.local with your credentials
cp .env.example .env.local

# Run locally
npm run dev

# Test the following:
\`\`\`

- [ ] Homepage loads at http://localhost:3000
- [ ] Properties page shows at `/properties`
- [ ] Can view property details at `/properties/[id]`
- [ ] Contact page loads at `/contact`
- [ ] Contact info displays correctly
- [ ] Admin login works at `/admin-login`
  - Username: admin@propertylistings.com
  - Password: admin123
- [ ] Admin dashboard loads at `/admin`
- [ ] Can create new property at `/list-property`
- [ ] Can edit property at `/edit-property/[id]`
- [ ] Contact info is editable from admin dashboard
- [ ] Navbar shows "Contact" link
- [ ] Can logout from admin dashboard

## Deployment Steps

### Step 1: Push to Git
\`\`\`bash
git add .
git commit -m "Complete property listing website"
git push origin main
\`\`\`

### Step 2: Verify Vercel Deployment
1. Go to vercel.com
2. Select your project
3. Wait for build to complete
4. Check build logs for errors

### Step 3: Post-Deployment Testing
Visit your live domain and test:
- [ ] Homepage loads
- [ ] Properties display
- [ ] Search/filters work
- [ ] Admin login works
- [ ] Admin dashboard functional
- [ ] Contact page displays correct info
- [ ] No console errors

### Step 4: Security - Change Default Credentials
1. Go to admin dashboard (`yoursite.com/admin`)
2. Change admin email/password from defaults
3. Update default contact information

## Troubleshooting Deployment

### Build Fails
- Check "Environment Variables" section in Vercel settings
- Ensure all required variables are set
- Check build logs for specific errors

### "Table not found" Error
- Run SQL migration in Supabase dashboard
- Verify Supabase URL and key are correct
- Check RLS policies are enabled

### Admin Login Not Working
- Verify `admin_users` table exists in Supabase
- Check `SUPABASE_SERVICE_ROLE_KEY` is set
- Verify bcryptjs dependency in package.json

### Images Not Uploading
- Check `BLOB_READ_WRITE_TOKEN` is set
- Verify Vercel Blob integration is active
- Test with small image first

## Rollback Plan

If deployment issues occur:
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Select previous successful deployment
4. Click "Promote to Production"

## Post-Deployment

### Change Default Admin Password
1. Login with default credentials
2. (Future feature) Add user management page to change password
3. For now, update directly in Supabase:
   - Go to Supabase → admin_users table
   - Generate new bcrypt hash
   - Update password_hash column

### Monitor Performance
- Check Vercel Analytics for page performance
- Monitor Supabase query performance
- Check Vercel Blob usage

### Backup
- Enable automatic backups in Supabase
- Regularly export important data

## Live Deployment Monitoring

After going live:
1. Monitor error logs in Vercel
2. Check Supabase connection health
3. Monitor Blob storage usage
4. Track admin activities

## Success Indicators

Your deployment is successful when:
- Homepage loads in < 2 seconds
- All navigation links work
- Admin authentication works
- Database queries execute without errors
- Images upload and display correctly
- Contact information is manageable from admin
- No console errors or warnings
