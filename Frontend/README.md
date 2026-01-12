# Property Listing Website

A modern, full-featured property listing platform built with Next.js, Supabase, and Vercel Blob. Perfect for real estate agents, brokers, and property managers.

## Features

### For Users
- Browse property listings with beautiful image galleries
- Advanced search and filtering (price, type, location)
- Property details with amenities and specifications
- Easy contact/inquiry system
- Responsive mobile-first design

### For Admins
- Secure admin dashboard with authentication
- Create, edit, and delete property listings
- Manage property images and media
- View all property inquiries/leads
- Manage and update business contact information
- Professional analytics and property management tools

## Quick Start

### Prerequisites
- Node.js 18 or higher
- Supabase account (free tier works)
- Vercel account for deployment

### Installation

1. Clone the repository
\`\`\`bash
git clone <your-repo>
cd property-listing-website
npm install
\`\`\`

2. Set up environment variables
\`\`\`bash
# Create .env.local
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
BLOB_READ_WRITE_TOKEN=your_blob_token
\`\`\`

3. Initialize the database
Run the SQL migration script from `/scripts/02-complete-schema.sql` in your Supabase dashboard.

4. Start development server
\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000

### Default Admin Credentials
- Email: `admin@propertylistings.com`
- Password: `admin123`

**Important:** Change these immediately after first login!

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx                 # Homepage
│   ├── properties/              # Property listing pages
│   ├── contact/                 # Contact page
│   ├── admin/                   # Admin dashboard (protected)
│   ├── admin-login/             # Admin login page
│   ├── list-property/           # Create property
│   ├── edit-property/           # Edit property
│   └── api/
│       ├── admin/login          # Authentication
│       └── contact-info/        # Contact management
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── navbar.tsx               # Navigation
│   ├── property-grid.tsx        # Property cards
│   ├── search-filters.tsx       # Search functionality
│   ├── inquiry-form.tsx         # Contact form
│   ├── admin-*.tsx              # Admin components
│   └── ...
├── lib/
│   ├── supabase/                # Supabase clients
│   ├── auth/                    # Authentication utilities
│   ├── types.ts                 # TypeScript types
│   └── utils.ts                 # Helper functions
└── scripts/
    ├── 01-init-schema.sql       # Basic schema
    └── 02-complete-schema.sql   # Complete schema with admin/contact
\`\`\`

## Technology Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL with RLS)
- **Storage:** Vercel Blob
- **Authentication:** Custom JWT with bcrypt
- **UI:** shadcn/ui component library
- **Icons:** Lucide React

## Database Schema

### Core Tables
- **properties** - Property listings
- **property_images** - Images for properties
- **categories** - Property types/categories
- **inquiries** - Property inquiries from users

### Admin Tables
- **admin_users** - Admin authentication
- **contact_info** - Business contact details

All tables have Row Level Security (RLS) enabled for data protection.

## Admin Dashboard

Access at `/admin` (login at `/admin-login`)

### Properties Management
- View all listed properties
- Create new listings with images
- Edit existing property details
- Delete properties
- Manage featured properties

### Inquiries
- View all property inquiries
- Contact information for leads
- Message history

### Contact Information
- Edit business phone
- Edit business email
- Edit business address
- Edit business hours
- Changes appear immediately on public contact page

## API Routes

### Authentication
- `POST /api/admin/login` - Admin authentication

### Contact Management
- `GET /api/contact-info` - Fetch contact information
- `PUT /api/contact-info` - Update contact information (admin only)

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy!

\`\`\`bash
# Or deploy from CLI
vercel deploy --prod
\`\`\`

### Deploy to Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- Railway
- Render
- Any Node.js hosting

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for detailed instructions.

## Security

- All database access controlled with Row Level Security (RLS)
- Admin passwords hashed with bcrypt
- SQL injection prevention with parameterized queries
- Secure session management
- Environment variables for sensitive data

## Environment Variables

Required:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL         # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY    # Supabase anon key
SUPABASE_SERVICE_ROLE_KEY        # Supabase service role (admin)
BLOB_READ_WRITE_TOKEN            # Vercel Blob token
\`\`\`

Optional:
\`\`\`
SUPABASE_JWT_SECRET              # JWT secret for token signing
\`\`\`

## Common Tasks

### Create a New Property
1. Login to admin dashboard
2. Click "List New Property"
3. Fill in property details
4. Upload images
5. Click "Publish"

### Update Contact Information
1. Login to admin dashboard
2. Go to "Contact Info" tab
3. Edit phone, email, address, or hours
4. Click "Save Changes"

### View Property Inquiries
1. Login to admin dashboard
2. Go to "Inquiries" tab
3. View all inquiries with contact details

### Change Admin Password
1. Currently: Update directly in Supabase admin_users table
2. Future: Add user management UI

## Troubleshooting

### Login Not Working
- Verify admin_users table exists in Supabase
- Check email/password are correct
- Ensure SUPABASE_SERVICE_ROLE_KEY is set

### Properties Not Showing
- Run SQL migration script
- Check Supabase connection
- Verify properties table exists

### Images Not Uploading
- Check BLOB_READ_WRITE_TOKEN is set
- Verify Vercel Blob integration
- Check file size limits

### Contact Info Not Updating
- Verify contact_info table exists
- Check API response in browser dev tools
- Ensure admin token is valid

## Support & Feedback

Issues or questions? Check:
- [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) - Detailed setup guide
- [FEATURE_SUMMARY.md](./FEATURE_SUMMARY.md) - Complete feature list
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Deployment guide

## License

MIT License - feel free to use this project for personal or commercial use.

## Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using v0
