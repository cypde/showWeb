-- Supabase database schema for musician website

-- Create events table
CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  venue TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample events data
INSERT INTO events (title, date, venue, description) VALUES
('Solo Recital at Carnegie Hall', '2024-02-15', 'Carnegie Hall, New York', 'A beautiful evening of classical piano music featuring works by Chopin and Liszt.'),
('Chamber Music Festival', '2024-03-02', 'Lincoln Center, New York', 'Performing Beethoven''s Piano Trio No. 7 in B-flat major with renowned string musicians.'),
('Masterclass Series', '2024-03-20', 'Juilliard School, New York', 'Teaching a masterclass on Romantic era piano performance techniques.'),
('Orchestral Debut', '2024-04-10', 'Metropolitan Opera House, New York', 'Performing Rachmaninoff''s Piano Concerto No. 2 with the Metropolitan Orchestra.');

-- Create profiles table for admin management (optional)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create storage buckets for R2 (this is conceptual - actual R2 setup happens outside Supabase)
-- In a real setup, you would configure R2 storage separately and reference the URLs in your application