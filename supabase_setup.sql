-- Create Products Table
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  old_price DECIMAL(10, 2),
  description TEXT,
  image TEXT,
  sizes TEXT[] DEFAULT '{}',
  rating DECIMAL(2, 1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (OPTIONAL: For testing, you can disable it or add policies)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read products
CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

-- Create a policy that allows anyone to insert products (For demo purposes)
-- In production, you'd restrict this to authenticated admins
CREATE POLICY "Allow public insert" ON products
  FOR INSERT WITH CHECK (true);
