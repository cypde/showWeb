-- 创建首页配置表
CREATE TABLE home_sections (
  id SERIAL PRIMARY KEY,
  section_name VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255),
  subtitle VARCHAR(255),
  content TEXT,
  image_url VARCHAR(500),
  video_url VARCHAR(500),
  button_text VARCHAR(100),
  button_url VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER home_sections_update_timestamp
BEFORE UPDATE ON home_sections
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- 插入首页配置数据
INSERT INTO home_sections (section_name, title, subtitle, image_url, button_text, button_url, is_active)
VALUES 
('hero', 'Charlotte Clapperton', 'Mezzo-Soprano Opera Singer', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20mezzo-soprano%20opera%20singer%20on%20stage%2C%20elegant%20pose%2C%20dramatic%20lighting%2C%20high%20quality%20photography&image_size=landscape_16_9', 'About Me', '#about', true),

('video', 'Featured Performance', NULL, NULL, NULL, NULL, true),

('about_preview', 'About Charlotte', NULL, 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20mezzo-soprano%20singer%20in%20opera%20costume%2C%20professional%20photography%2C%20dramatic%20lighting%2C%20high%20quality&image_size=portrait_4_3', 'Learn More', '/about', true),

('upcoming_preview', 'Upcoming Performances', NULL, NULL, 'View All', '/upcoming', true),

('gallery_preview', 'Gallery', NULL, NULL, 'View Full Gallery', '/gallery', true)
ON CONFLICT (section_name) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  image_url = EXCLUDED.image_url,
  button_text = EXCLUDED.button_text,
  button_url = EXCLUDED.button_url,
  is_active = EXCLUDED.is_active;

-- 更新视频部分，添加视频URL
UPDATE home_sections
SET video_url = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
WHERE section_name = 'video';

-- 查看所有配置数据
SELECT * FROM home_sections;