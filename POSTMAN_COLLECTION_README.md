# Postman Collection for Property Listing API

This directory contains Postman collection and environment files for testing the Property Listing API.

## Files

- `Property-Listing-API.postman_collection.json` - Complete API collection with all endpoints
- `Property-Listing-API.postman_environment.json` - Environment variables for local development

## Setup Instructions

### 1. Import Collection and Environment

1. Open Postman
2. Click **Import** button (top left)
3. Select both JSON files:
   - `Property-Listing-API.postman_collection.json`
   - `Property-Listing-API.postman_environment.json`
4. Click **Import**

### 2. Configure Environment

1. Select the environment **"Property Listing API - Local"** from the dropdown (top right)
2. Update `base_url` if your API is running on a different port or host:
   - Default: `http://localhost:3000`
   - For production: `https://your-api-domain.com`

### 3. Authentication Setup

1. Run the **Login** request from the Authentication folder
2. The collection includes a test script that automatically extracts the JWT token from the response
3. The token will be stored in the `auth_token` environment variable
4. All authenticated requests will automatically use this token

**Default Admin Credentials:**
- Email: `admin@propertylistings.com`
- Password: `admin123`

⚠️ **Important:** Change these credentials in production!

## Collection Structure

### Authentication
- **Login** - Admin login (saves token automatically)
- **Logout** - Revoke JWT token

### Properties
- **List All Properties** - Get all properties with optional filters
- **Get Property by ID** - Get single property details
- **Create Property** - Create new property (requires auth)
- **Update Property** - Update existing property (requires auth)
- **Delete Property** - Delete property (requires auth)
- **Upload Property Image** - Upload image for property (requires auth)

### Property Images
- **Delete Property Image** - Delete property image (requires auth)

### Categories
- **List All Categories** - Get all categories
- **Get Category by ID** - Get single category
- **Create Category** - Create new category (requires auth)
- **Update Category** - Update category (requires auth)
- **Delete Category** - Delete category (requires auth)

### Inquiries
- **List All Inquiries** - Get all inquiries (requires auth)
- **Get Inquiry by ID** - Get single inquiry (requires auth)
- **Create Inquiry** - Create new inquiry (public)

### Contact Info
- **Get Contact Info** - Get contact information (public)
- **Update Contact Info** - Update contact information (requires auth)

### Health Check
- **Health Check** - Verify API is running

## Query Parameters

### Properties List Filters

The **List All Properties** endpoint supports the following query parameters:

- `available` (boolean) - Filter by available status
- `featured` (boolean) - Filter by featured properties
- `property_type` (string) - Filter by type: `house`, `apartment`, `condo`, `townhouse`, `land`, `commercial`
- `location` (string) - Search by address/location
- `min_price` (number) - Minimum price filter
- `max_price` (number) - Maximum price filter

Example:
```
GET /api/v1/properties?available=true&property_type=house&min_price=100000&max_price=500000
```

## Property Types

Valid property types:
- `house`
- `apartment`
- `condo`
- `townhouse`
- `land`
- `commercial`

## Property Statuses

Valid property statuses:
- `available`
- `pending`
- `sold`
- `rented`

## Example Workflow

1. **Start the API server:**
   ```bash
   cd backend
   rails server
   ```

2. **In Postman:**
   - Run **Health Check** to verify API is running
   - Run **Login** to authenticate
   - Run **List All Properties** to see existing properties
   - Run **Create Property** to add a new property
   - Run **Upload Property Image** to add images
   - Run **Create Inquiry** to test inquiry creation

## Troubleshooting

### Token Not Saving
- Check that the Login request test script is enabled
- Verify the response includes an `Authorization` header
- Manually copy the token and set it in the environment variable

### 401 Unauthorized
- Ensure you've logged in and the token is saved
- Check that the token hasn't expired
- Verify the `Authorization` header format: `Bearer <token>`

### 404 Not Found
- Verify the `base_url` is correct
- Check that the API server is running
- Ensure the endpoint path is correct

### 422 Unprocessable Entity
- Check the request body format
- Verify all required fields are included
- Check validation errors in the response

## Notes

- All authenticated endpoints require a valid JWT token in the `Authorization` header
- The collection uses environment variables for `base_url` and `auth_token`
- UUIDs are used for all resource IDs
- Image uploads use `multipart/form-data` format
- All other requests use `application/json` content type

