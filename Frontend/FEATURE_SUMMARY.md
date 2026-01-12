# Property Listing Website - Feature Summary

## Public Features

### Homepage (`/`)
- Hero section with search functionality
- Featured properties showcase
- Call-to-action buttons for properties and contact

### Properties Listing (`/properties`)
- Browse all available properties
- Filter by property type, price range, and location
- View property count and sorting options

### Property Details (`/properties/[id]`)
- Full property information (price, specs, description)
- Image gallery with primary image display
- Property amenities list
- Quick contact inquiry form
- Related properties suggestions

### Contact Page (`/contact`)
- Company contact information (dynamically loaded from admin)
- Business hours display
- Contact form for inquiries
- Email, phone, and address links

### Navigation
- Responsive navbar with logo
- Links to Home, Properties, and Contact
- "List Property" button for sellers
- "Admin" button linking to login

## Admin Features

### Authentication
- Secure admin login at `/admin-login`
- Session-based authentication with localStorage
- Logout functionality

### Admin Dashboard (`/admin`)
- Three main tabs: Properties, Inquiries, Contact Info

#### Properties Tab
- View all listed properties in table format
- Quick actions: View, Edit, Delete
- Property status indicators
- Price and type information
- Create new listing button

#### Inquiries Tab
- View all property inquiries/leads
- Contact information (name, email, phone)
- Message content
- Inquiry timestamp

#### Contact Info Tab
- Edit business phone number
- Edit business email
- Edit business address
- Edit business hours (multi-line support)
- Save changes button

### Property Management Pages
- **List Property (`/list-property`):** Create new property listings with images
- **Edit Property (`/edit-property/[id]`):** Update property details and manage images

## Technical Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **Storage:** Vercel Blob
- **Authentication:** Custom admin auth with bcryptjs
- **UI Components:** shadcn/ui
- **Icons:** Lucide React

## Database Schema

### admin_users
- id (UUID)
- email (Text, unique)
- password_hash (Text)
- is_admin (Boolean)
- created_at, updated_at (Timestamps)

### properties
- id, title, description, address, price
- bedrooms, bathrooms, area
- property_type, status, featured
- created_by, created_at, updated_at

### property_images
- id, property_id, image_url, blob_url
- is_primary, created_at

### inquiries
- id, property_id, name, email, phone
- message, created_at

### contact_info
- id, phone, email, address, hours
- updated_at

### categories
- id, name, created_at

## API Endpoints

- `POST /api/admin/login` - Admin authentication
- `GET/PUT /api/contact-info` - Contact information management

## Default Credentials

Email: `admin@propertylistings.com`
Password: `admin123`

(Change immediately after first login)

## Security Features

- Row Level Security (RLS) on all tables
- Bcrypt password hashing for admin credentials
- Secure session management
- Protected admin routes
- SQL injection prevention with parameterized queries
