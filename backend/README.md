# Property Listing API Backend

A Ruby on Rails API backend for the property listing platform.

## Requirements

- Ruby 3.2+
- Rails 8.1+
- PostgreSQL 14+

## Setup

### 1. Install dependencies

```bash
bundle install
```

### 2. Configure database

Copy the database configuration if needed and update credentials:

```bash
# Edit config/database.yml with your PostgreSQL credentials
# Or set environment variables:
export DB_USERNAME=your_username
export DB_PASSWORD=your_password
export DB_HOST=localhost
export DB_PORT=5432
```

### 3. Create and setup database

```bash
rails db:create
rails db:migrate
rails db:seed
```

### 4. Start the server

```bash
rails server
# or
rails s -p 3000
```

The API will be available at `http://localhost:3000`

## Default Admin Credentials

- **Email:** `admin@propertylistings.com`
- **Password:** `admin123`

**Important:** Change these immediately after first login!

## API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/login` | No | Admin login (returns JWT in header) |
| DELETE | `/api/v1/logout` | Yes | Revoke JWT token |

### Properties

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/properties` | No | List all properties (with filters) |
| GET | `/api/v1/properties/:id` | No | Get property details |
| POST | `/api/v1/properties` | Yes | Create new property |
| PATCH | `/api/v1/properties/:id` | Yes | Update property |
| DELETE | `/api/v1/properties/:id` | Yes | Delete property |
| POST | `/api/v1/properties/:id/images` | Yes | Upload property image |

**Filter parameters for GET /api/v1/properties:**
- `available=true` - Only available properties
- `featured=true` - Only featured properties
- `property_type=house` - Filter by type (house, apartment, condo, townhouse, land, commercial)
- `location=downtown` - Search by location (address)
- `min_price=100000` - Minimum price
- `max_price=500000` - Maximum price

### Property Images

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| DELETE | `/api/v1/property_images/:id` | Yes | Delete image |

### Categories

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/categories` | No | List all categories |
| GET | `/api/v1/categories/:id` | No | Get category details |
| POST | `/api/v1/categories` | Yes | Create category |
| PATCH | `/api/v1/categories/:id` | Yes | Update category |
| DELETE | `/api/v1/categories/:id` | Yes | Delete category |

### Inquiries

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/inquiries` | Yes | List all inquiries |
| GET | `/api/v1/inquiries/:id` | Yes | Get inquiry details |
| POST | `/api/v1/inquiries` | No | Create inquiry |

### Contact Info

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/contact_info` | No | Get contact information |
| PATCH | `/api/v1/contact_info` | Yes | Update contact information |

## Authentication

The API uses JWT tokens for authentication. 

### Login

```bash
curl -X POST http://localhost:3000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"admin_user": {"email": "admin@propertylistings.com", "password": "admin123"}}'
```

The JWT token is returned in the `Authorization` header.

### Making Authenticated Requests

Include the JWT token in the `Authorization` header:

```bash
curl http://localhost:3000/api/v1/inquiries \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_USERNAME` | PostgreSQL username | System user |
| `DB_PASSWORD` | PostgreSQL password | Empty |
| `DB_HOST` | PostgreSQL host | localhost |
| `DB_PORT` | PostgreSQL port | 5432 |
| `DEVISE_JWT_SECRET_KEY` | JWT signing secret | Rails secret_key_base |
| `RAILS_ENV` | Rails environment | development |

## Project Structure

```
backend/
├── app/
│   ├── controllers/
│   │   └── api/v1/           # API controllers
│   ├── models/               # ActiveRecord models
│   └── serializers/          # JSON serializers
├── config/
│   ├── initializers/
│   │   ├── cors.rb          # CORS configuration
│   │   └── devise.rb        # Devise & JWT config
│   └── routes.rb            # API routes
├── db/
│   ├── migrate/             # Database migrations
│   └── seeds.rb             # Seed data
└── storage/                 # Uploaded files (local)
```

## Models

- **AdminUser** - Admin authentication with Devise + JWT
- **Property** - Property listings with all details
- **PropertyImage** - Images for properties (Active Storage)
- **Category** - Property categories
- **Inquiry** - Property inquiries from users
- **ContactInfo** - Business contact information

## Development

### Run migrations

```bash
rails db:migrate
```

### Run console

```bash
rails console
```

### Check routes

```bash
rails routes
```

## Testing

```bash
rails test
```

## License

MIT License
