-- Create tables for property listing website

-- Properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  price DECIMAL(15, 2) NOT NULL,
  bedrooms INT,
  bathrooms INT,
  area DECIMAL(10, 2),
  property_type TEXT NOT NULL,
  status TEXT DEFAULT 'available',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Property images table
CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  blob_url TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Inquiries table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for properties
CREATE POLICY "Anyone can view published properties" 
  ON properties FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert own properties" 
  ON properties FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own properties" 
  ON properties FOR UPDATE 
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own properties" 
  ON properties FOR DELETE 
  USING (auth.uid() = created_by);

-- RLS Policies for property_images
CREATE POLICY "Anyone can view property images" 
  ON property_images FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert images for own properties" 
  ON property_images FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE id = property_id AND created_by = auth.uid()
    )
  );

CREATE POLICY "Users can delete images for own properties" 
  ON property_images FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE id = property_id AND created_by = auth.uid()
    )
  );

-- RLS Policies for categories (read-only for users)
CREATE POLICY "Anyone can view categories" 
  ON categories FOR SELECT 
  USING (true);

-- RLS Policies for inquiries
CREATE POLICY "Anyone can create inquiries" 
  ON inquiries FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view inquiries for own properties" 
  ON inquiries FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE id = property_id AND created_by = auth.uid()
    )
  );
