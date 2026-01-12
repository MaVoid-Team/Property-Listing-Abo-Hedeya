# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

puts "Seeding database..."

# Create default admin user
puts "Creating admin user..."
admin = AdminUser.find_or_initialize_by(email: 'admin@propertylistings.com')
admin.password = 'admin123'
admin.password_confirmation = 'admin123'
admin.is_admin = true
admin.save!
puts "  Admin user created: #{admin.email}"

# Create default contact info
puts "Creating contact info..."
ContactInfo.find_or_create_by!(id: ContactInfo.first&.id) do |contact|
  contact.phone = '+1 (555) 123-4567'
  contact.email = 'info@propertylistings.com'
  contact.address = '123 Business Ave, Suite 100'
  contact.hours = 'Mon-Fri: 9AM-6PM'
end
puts "  Contact info created"

# Create categories
puts "Creating categories..."
categories = %w[House Apartment Condo Townhouse Land Commercial]
categories.each do |name|
  Category.find_or_create_by!(name: name)
end
puts "  #{categories.length} categories created"

# Create sample properties
puts "Creating sample properties..."
sample_properties = [
  {
    title: 'Modern Downtown Loft',
    description: 'Stunning 2-bedroom loft in the heart of downtown with floor-to-ceiling windows, exposed brick, and premium finishes.',
    address: '123 Main Street, Downtown, NY 10001',
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    property_type: 'apartment',
    status: 'available',
    featured: true
  },
  {
    title: 'Spacious Family Home',
    description: 'Beautiful 4-bedroom family home with a large backyard, modern kitchen, and attached 2-car garage.',
    address: '456 Oak Avenue, Suburbs, NY 10002',
    price: 650000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    property_type: 'house',
    status: 'available',
    featured: true
  },
  {
    title: 'Luxury Waterfront Condo',
    description: 'Breathtaking 3-bedroom condo with panoramic water views, private balcony, and resort-style amenities.',
    address: '789 Harbor Drive, Waterfront, NY 10003',
    price: 850000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    property_type: 'condo',
    status: 'available',
    featured: true
  },
  {
    title: 'Cozy Starter Home',
    description: 'Perfect starter home with 2 bedrooms, updated kitchen, and nice backyard in a quiet neighborhood.',
    address: '321 Maple Lane, Suburbia, NY 10004',
    price: 280000,
    bedrooms: 2,
    bathrooms: 1,
    area: 1100,
    property_type: 'house',
    status: 'available',
    featured: false
  },
  {
    title: 'Commercial Office Space',
    description: 'Prime commercial office space with 5000 sq ft, parking, and excellent visibility on main road.',
    address: '555 Business Park, Commercial District, NY 10005',
    price: 1200000,
    bedrooms: 0,
    bathrooms: 4,
    area: 5000,
    property_type: 'commercial',
    status: 'available',
    featured: false
  },
  {
    title: 'Charming Townhouse',
    description: 'Elegant 3-story townhouse with rooftop terrace, modern finishes, and garage in prime location.',
    address: '888 Urban Row, City Center, NY 10006',
    price: 520000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1650,
    property_type: 'townhouse',
    status: 'available',
    featured: false
  }
]

sample_properties.each do |prop_attrs|
  property = Property.find_or_create_by!(title: prop_attrs[:title]) do |p|
    p.assign_attributes(prop_attrs.merge(admin_user: admin))
  end
  puts "  Property created: #{property.title}"
end

puts "Seeding complete!"
puts ""
puts "Default Admin Credentials:"
puts "  Email: admin@propertylistings.com"
puts "  Password: admin123"
puts ""
puts "IMPORTANT: Change these credentials immediately after first login!"
