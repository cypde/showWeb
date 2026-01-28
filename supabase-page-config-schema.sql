-- Supabase database schema for musician website - Page Configuration Tables

-- 1. Site-wide configuration table
CREATE TABLE site_config (
  id BIGSERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Navigation menu table
CREATE TABLE navigation (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  order_position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  parent_id BIGINT REFERENCES navigation(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Page content base table
CREATE TABLE page_content (
  id BIGSERIAL PRIMARY KEY,
  page_slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Home page sections table
CREATE TABLE home_sections (
  id BIGSERIAL PRIMARY KEY,
  section_name TEXT UNIQUE NOT NULL,
  title TEXT,
  subtitle TEXT,
  content TEXT,
  image_url TEXT,
  button_text TEXT,
  button_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. About page table
CREATE TABLE about (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT,
  artistic_approach TEXT,
  image_url TEXT,
  performing_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Performances table
CREATE TABLE performances (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Gallery table
CREATE TABLE gallery (
  id BIGSERIAL PRIMARY KEY,
  title TEXT,
  image_url TEXT NOT NULL,
  description TEXT,
  order_position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Contact information table
CREATE TABLE contact_info (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  section_type TEXT NOT NULL,
  name TEXT,
  organization TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  order_position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Social media links table
CREATE TABLE social_media (
  id BIGSERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  order_position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_navigation_order ON navigation(order_position);
CREATE INDEX idx_home_sections_active ON home_sections(is_active);
CREATE INDEX idx_performances_date ON performances(date);
CREATE INDEX idx_performances_active ON performances(is_active);
CREATE INDEX idx_gallery_order ON gallery(order_position);
CREATE INDEX idx_gallery_active ON gallery(is_active);
CREATE INDEX idx_contact_info_order ON contact_info(order_position);
CREATE INDEX idx_contact_info_active ON contact_info(is_active);
CREATE INDEX idx_social_media_order ON social_media(order_position);
CREATE INDEX idx_social_media_active ON social_media(is_active);

-- Insert initial site configuration data
INSERT INTO site_config (key, value, description) VALUES
('site_name', 'Charlotte Clapperton', 'Website name'),
('site_tagline', 'Mezzo-Soprano Opera Singer', 'Website tagline'),
('site_email', 'contact@charlotteclapperton.com', 'Main contact email'),
('site_phone', '+1 (555) 123-4567', 'Main contact phone'),
('site_footer', '© 2024 Charlotte Clapperton. All rights reserved.', 'Footer text'),
('primary_color', '#000000', 'Primary color for website'),
('secondary_color', '#ffffff', 'Secondary color for website'),
('accent_color', '#ff6b6b', 'Accent color for website');

-- Insert initial navigation data
INSERT INTO navigation (name, url, order_position) VALUES
('Home', '/', 1),
('About', '/about', 2),
('Upcoming', '/upcoming', 3),
('Gallery', '/gallery', 4),
('Contact', '/contact', 5);

-- Insert initial page content data
INSERT INTO page_content (page_slug, title, meta_description) VALUES
('home', 'Home', 'Charlotte Clapperton - Internationally acclaimed mezzo-soprano opera singer'),
('about', 'About', 'Learn more about Charlotte Clapperton''s background and artistic approach'),
('upcoming', 'Upcoming Performances', 'Charlotte Clapperton''s upcoming opera performances and concerts'),
('gallery', 'Gallery', 'Photos from Charlotte Clapperton''s performances and events'),
('contact', 'Contact', 'Contact information for Charlotte Clapperton');

-- Insert initial home sections data
INSERT INTO home_sections (section_name, title, subtitle, content, image_url, button_text, button_url, is_active) VALUES
('hero', 'Charlotte Clapperton', 'Mezzo-Soprano Opera Singer', '', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20mezzo-soprano%20opera%20singer%20on%20stage%2C%20elegant%20pose%2C%20dramatic%20lighting%2C%20high%20quality%20photography&image_size=landscape_16_9', 'About Me', '#about', true),
('video', 'Featured Performance', '', '', '', '', '', true),
('about_preview', 'About Charlotte', '', 'Charlotte Clapperton is an internationally acclaimed mezzo-soprano known for her powerful voice and captivating stage presence.', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20mezzo-soprano%20singer%20in%20opera%20costume%2C%20professional%20photography%2C%20dramatic%20lighting%2C%20high%20quality&image_size=portrait_4_3', 'Learn More', '/about', true),
('upcoming_preview', 'Upcoming Performances', '', 'Check my upcoming performances around the world', '', 'View All', '/upcoming', true),
('gallery_preview', 'Gallery', '', 'Browse my performance photos', '', 'View Full Gallery', '/gallery', true);

-- Insert initial about page data
INSERT INTO about (title, content, artistic_approach, image_url, performing_image_url) VALUES
('Charlotte Clapperton', 'Charlotte Clapperton is an internationally acclaimed mezzo-soprano known for her powerful voice, exceptional musicianship, and captivating stage presence. With a repertoire spanning from Baroque to contemporary opera, she has performed in prestigious venues across Europe and North America.

Born in London, Charlotte began her musical training at the Royal Academy of Music, where she graduated with distinction. She further honed her craft at the Guildhall School of Music & Drama, studying under the renowned mezzo-soprano Sarah Walker.

Recent highlights include her debut at the Royal Opera House, Covent Garden, as Cherubino in Mozart''s Le nozze di Figaro, and performances with the London Symphony Orchestra, the Metropolitan Opera Orchestra, and the Berlin Philharmonic.

Charlotte''s unique interpretation of classic roles has earned her critical acclaim and a dedicated following. She is particularly renowned for her portrayals of Carmen, Octavian in Der Rosenkavalier, and Orfeo in Gluck''s Orfeo ed Euridice.', 'Charlotte is dedicated to bringing depth and authenticity to every role she portrays. She believes in the power of opera to connect with audiences on an emotional level, and her performances are noted for their dramatic intensity and vocal beauty.

In addition to her operatic work, Charlotte is a passionate recitalist, specializing in French mélodies and German lieder. She has recorded several critically acclaimed albums, including French Connections and Songs of Love and Loss.

Charlotte is also committed to music education and outreach. She regularly conducts masterclasses and workshops for young singers, and she is a patron of several music charities that support emerging artists.

When not performing, Charlotte enjoys spending time with her family, reading literature, and exploring new cuisines. She is fluent in English, French, German, and Italian, which allows her to bring authentic nuance to her performances in these languages.', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20elegant%20mezzo-soprano%20singer%2C%20classical%20style%2C%20high%20quality%20photography%2C%20dramatic%20lighting&image_size=portrait_4_3', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20performing%20on%20grand%20stage%2C%20opera%20house%20setting%2C%20professional%20photography%2C%20dramatic%20lighting&image_size=portrait_4_3');

-- Insert initial performances data
INSERT INTO performances (title, location, date, time, description, image_url) VALUES
('Royal Albert Hall', 'London, UK', '2024-03-15', '19:30', 'Solo recital featuring works by Bach, Handel, and Purcell', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20stage%20performance%20venue%2C%20elegant%20interior%2C%20concert%20hall%2C%20royal%20albert%20hall&image_size=landscape_16_9'),
('La Scala', 'Milan, Italy', '2024-04-22', '20:00', 'Performances in Mozart''s Le nozze di Figaro as Cherubino', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20house%20interior%2C%20grand%20stage%2C%20luxury%20venue%2C%20la%20scala&image_size=landscape_16_9'),
('Carnegie Hall', 'New York, USA', '2024-05-10', '19:30', 'Collaboration with the New York Philharmonic Orchestra', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=concert%20hall%20interior%2C%20modern%20design%2C%20orchestra%20stage%2C%20carnegie%20hall&image_size=landscape_16_9'),
('Berlin Philharmonie', 'Berlin, Germany', '2024-06-05', '20:00', 'Recital with pianist Daniel Barenboim', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20concert%20hall%20interior%2C%20orchestra%20stage%2C%20berlin%20philharmonie&image_size=landscape_16_9'),
('Sydney Opera House', 'Sydney, Australia', '2024-07-18', '19:30', 'Performances in Bizet''s Carmen as the title role', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20house%20interior%2C%20iconic%20design%2C%20sydney%20opera%20house&image_size=landscape_16_9'),
('Vienna State Opera', 'Vienna, Austria', '2024-08-12', '19:00', 'Performances in Strauss''s Der Rosenkavalier as Octavian', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vienna%20state%20opera%20interior%2C%20grand%20stage%2C%20luxury%20venue&image_size=landscape_16_9'),
('Paris Opera Bastille', 'Paris, France', '2024-09-05', '20:00', 'Recital featuring French mélodies by Debussy and Ravel', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=paris%20opera%20bastille%20interior%2C%20modern%20design%2C%20concert%20hall&image_size=landscape_16_9'),
('Tokyo Bunka Kaikan', 'Tokyo, Japan', '2024-10-18', '18:30', 'Collaboration with the Tokyo Philharmonic Orchestra', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tokyo%20bunka%20kaikan%20concert%20hall%20interior&image_size=landscape_16_9'),
('Teatro Colón', 'Buenos Aires, Argentina', '2024-11-22', '20:30', 'Performances in Verdi''s La traviata as Flora Bervoix', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=teatro%20colon%20buenos%20aires%20interior%2C%20grand%20opera%20house&image_size=landscape_16_9'),
('Cairo Opera House', 'Cairo, Egypt', '2024-12-10', '19:00', 'New Year''s Eve Gala Concert', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cairo%20opera%20house%20interior%2C%20elegant%20concert%20hall&image_size=landscape_16_9'),
('Moscow Bolshoi Theatre', 'Moscow, Russia', '2025-01-15', '19:30', 'Performances in Tchaikovsky''s Eugene Onegin as Olga', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=moscow%20bolshoi%20theatre%20interior%2C%20grand%20opera%20house&image_size=landscape_16_9'),
('Seoul Arts Center', 'Seoul, South Korea', '2025-02-08', '18:00', 'Asian Tour Opening Concert', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=seoul%20arts%20center%20concert%20hall%20interior&image_size=landscape_16_9'),
('Madrid Royal Theatre', 'Madrid, Spain', '2025-03-20', '20:00', 'Performances in Bizet''s Carmen as the title role', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=madrid%20royal%20theatre%20interior%2C%20spanish%20opera%20house&image_size=landscape_16_9'),
('Budapest Opera House', 'Budapest, Hungary', '2025-04-12', '19:30', 'Recital with Hungarian National Philharmonic', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=budapest%20opera%20house%20interior%2C%20historic%20venue&image_size=landscape_16_9'),
('Warsaw National Opera', 'Warsaw, Poland', '2025-05-08', '19:00', 'Performances in Mozart''s Così fan tutte as Dorabella', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=warsaw%20national%20opera%20interior%2C%20polish%20theatre&image_size=landscape_16_9');

-- Insert initial gallery data
INSERT INTO gallery (title, image_url, order_position) VALUES
('Performance at Royal Opera House', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20performing%20on%20stage%2C%20professional%20photography%2C%20dramatic%20lighting%2C%20high%20quality&image_size=landscape_4_3', 1),
('Backstage at La Scala', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20in%20costume%2C%20backstage%20photo%2C%20professional%20lighting%2C%20high%20quality&image_size=landscape_4_3', 2),
('Concert with London Symphony Orchestra', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20with%20orchestra%2C%20concert%20performance%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_4_3', 3),
('Rehearsal in Berlin', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20rehearsing%2C%20professional%20photography%2C%20natural%20lighting%2C%20high%20quality&image_size=landscape_4_3', 4),
('Taking a bow at Carnegie Hall', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20taking%20bow%20on%20stage%2C%20audience%20applause%2C%20professional%20photography&image_size=landscape_4_3', 5),
('Red Carpet Event', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20in%20elegant%20gown%2C%20red%20carpet%20event%2C%20professional%20photography&image_size=landscape_4_3', 6),
('Opera Production', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20performing%20in%20opera%20production%2C%20elaborate%20stage%20set%2C%20professional%20lighting&image_size=landscape_4_3', 7),
('Solo Recital', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=classical%20singer%20in%20concert%20hall%2C%20solo%20performance%2C%20professional%20photography&image_size=landscape_4_3', 8),
('With Conductor', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20with%20conductor%2C%20backstage%20photo%2C%20professional%20photography&image_size=landscape_4_3', 9),
('Performance at Vienna State Opera', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20performing%20at%20vienna%20state%20opera%2C%20elegant%20costume%2C%20professional%20photography&image_size=landscape_4_3', 10),
('Backstage in Paris', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20backstage%20in%20paris%2C%20natural%20lighting%2C%20candid%20photo&image_size=landscape_4_3', 11),
('Tokyo Concert Hall Performance', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20performing%20in%20tokyo%20concert%20hall%2C%20asian%20audience%2C%20professional%20lighting&image_size=landscape_4_3', 12),
('Buenos Aires Rehearsal', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20rehearsing%20in%20buenos%20aires%2C%20south%20american%20setting%2C%20professional%20photography&image_size=landscape_4_3', 13),
('Cairo Gala Event', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20at%20gala%20event%20in%20cairo%2C%20elegant%20evening%20gown%2C%20professional%20photography&image_size=landscape_4_3', 14),
('Moscow Opera Production', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20in%20russian%20opera%20production%2C%20traditional%20costume%2C%20dramatic%20lighting&image_size=landscape_4_3', 15),
('Seoul Press Conference', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20at%20press%20conference%20in%20seoul%2C%20asian%20media%2C%20professional%20photography&image_size=landscape_4_3', 16),
('Madrid Red Carpet', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20on%20red%20carpet%20in%20madrid%2C%20spanish%20media%2C%20elegant%20gown&image_size=landscape_4_3', 17),
('Budapest Recital', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20giving%20recital%20in%20budapest%2C%20historic%20venue%2C%20professional%20lighting&image_size=landscape_4_3', 18),
('Warsaw Opera Performance', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20performing%20in%20warsaw%20opera%2C%20polish%20stage%20design%2C%20dramatic%20lighting&image_size=landscape_4_3', 19);

-- Insert initial contact info data
INSERT INTO contact_info (title, section_type, name, organization, email, phone, website, order_position) VALUES
('Management', 'management', 'John Smith', 'Artists Management Inc.', 'management@charlotteclapperton.com', '+1 (555) 123-4567', 'https://artistsmanagement.com', 1),
('Public Relations', 'pr', 'Jane Doe', 'PR Excellence', 'pr@charlotteclapperton.com', '+1 (555) 987-6543', 'https://prexcellence.com', 2),
('Booking', 'booking', 'Michael Johnson', 'Global Bookings', 'booking@charlotteclapperton.com', '+1 (555) 456-7890', 'https://globalbookings.com', 3),
('Social Media', 'social', '', '', '', '', '', 4);

-- Insert initial social media data
INSERT INTO social_media (platform, url, order_position) VALUES
('facebook', 'https://facebook.com/charlotteclapperton', 1),
('twitter', 'https://twitter.com/charlotteclapperton', 2),
('instagram', 'https://instagram.com/charlotteclapperton', 3),
('youtube', 'https://youtube.com/charlotteclapperton', 4);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_site_config_timestamp
BEFORE UPDATE ON site_config
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_navigation_timestamp
BEFORE UPDATE ON navigation
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_page_content_timestamp
BEFORE UPDATE ON page_content
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_home_sections_timestamp
BEFORE UPDATE ON home_sections
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_about_timestamp
BEFORE UPDATE ON about
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_performances_timestamp
BEFORE UPDATE ON performances
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_gallery_timestamp
BEFORE UPDATE ON gallery
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_contact_info_timestamp
BEFORE UPDATE ON contact_info
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_social_media_timestamp
BEFORE UPDATE ON social_media
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Enable Row Level Security for all tables
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE performances ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Public access to site config" ON site_config
  FOR SELECT USING (true);

CREATE POLICY "Public access to navigation" ON navigation
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public access to page content" ON page_content
  FOR SELECT USING (true);

CREATE POLICY "Public access to home sections" ON home_sections
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public access to about" ON about
  FOR SELECT USING (true);

CREATE POLICY "Public access to performances" ON performances
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public access to gallery" ON gallery
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public access to contact info" ON contact_info
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public access to social media" ON social_media
  FOR SELECT USING (is_active = true);

-- Note: Database management will be done directly through Supabase console
-- All file URLs are stored as text fields for manual configuration

-- Final comment
COMMENT ON DATABASE postgres IS 'Musician website database with page configuration tables';

-- End of schema