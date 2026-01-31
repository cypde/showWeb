  -- 国际化支持 - 添加语言字段到所有表

  -- 1. 修改 site_config 表，添加语言字段并更新唯一约束
  ALTER TABLE site_config
  DROP CONSTRAINT IF EXISTS site_config_key_key;

  ALTER TABLE site_config
  ADD COLUMN language VARCHAR(10) DEFAULT 'en',
  ADD CONSTRAINT site_config_key_language_key UNIQUE (key, language);

  -- 2. 修改 navigation 表，添加语言字段
  ALTER TABLE navigation
  ADD COLUMN language VARCHAR(10) DEFAULT 'en';

  -- 3. 修改 page_content 表，添加语言字段并更新唯一约束
  ALTER TABLE page_content
  DROP CONSTRAINT IF EXISTS page_content_page_slug_key;

  ALTER TABLE page_content
  ADD COLUMN language VARCHAR(10) DEFAULT 'en',
  ADD CONSTRAINT page_content_page_slug_language_key UNIQUE (page_slug, language);

  -- 4. 修改 home_sections 表，添加语言字段并更新唯一约束
  ALTER TABLE home_sections
  DROP CONSTRAINT IF EXISTS home_sections_section_name_key;

  ALTER TABLE home_sections
  ADD COLUMN language VARCHAR(10) DEFAULT 'en',
  ADD CONSTRAINT home_sections_section_name_language_key UNIQUE (section_name, language);

  -- 5. 修改 about 表，添加语言字段
  ALTER TABLE about
  ADD COLUMN language VARCHAR(10) DEFAULT 'en';

  -- 6. 修改 performances 表，添加语言字段
  ALTER TABLE performances
  ADD COLUMN language VARCHAR(10) DEFAULT 'en';

  -- 7. 修改 gallery 表，添加语言字段
  ALTER TABLE gallery
  ADD COLUMN language VARCHAR(10) DEFAULT 'en';

  -- 8. 修改 contact_info 表，添加语言字段
  ALTER TABLE contact_info
  ADD COLUMN language VARCHAR(10) DEFAULT 'en';

  -- 9. 修改 social_media 表，添加语言字段
  ALTER TABLE social_media
  ADD COLUMN language VARCHAR(10) DEFAULT 'en';

  -- 10. 初始化英文数据

  -- 站点配置 - 英文
  INSERT INTO site_config (key, value, description, language) VALUES
  ('site_name', 'Charlotte Clapperton', 'Website name', 'en'),
  ('site_tagline', 'Mezzo-Soprano Opera Singer', 'Website tagline', 'en'),
  ('site_email', 'contact@charlotteclapperton.com', 'Main contact email', 'en'),
  ('site_phone', '+1 (555) 123-4567', 'Main contact phone', 'en'),
  ('site_footer', '© 2024 Charlotte Clapperton. All rights reserved.', 'Footer text', 'en'),
  ('primary_color', '#000000', 'Primary color for website', 'en'),
  ('secondary_color', '#ffffff', 'Secondary color for website', 'en'),
  ('accent_color', '#ff6b6b', 'Accent color for website', 'en')
  ON CONFLICT (key, language) DO UPDATE SET
    value = EXCLUDED.value,
    description = EXCLUDED.description;

  -- 导航菜单 - 英文
  INSERT INTO navigation (name, url, order_position, language) VALUES
  ('Home', '/', 1, 'en'),
  ('About', '/about', 2, 'en'),
  ('Upcoming', '/upcoming', 3, 'en'),
  ('Gallery', '/gallery', 4, 'en'),
  ('Contact', '/contact', 5, 'en')
  ON CONFLICT DO NOTHING;

  -- 页面内容 - 英文
  INSERT INTO page_content (page_slug, title, meta_description, language) VALUES
  ('home', 'Home', 'Charlotte Clapperton - Internationally acclaimed mezzo-soprano opera singer', 'en'),
  ('about', 'About', 'Learn more about Charlotte Clapperton''s background and artistic approach', 'en'),
  ('upcoming', 'Upcoming Performances', 'Charlotte Clapperton''s upcoming opera performances and concerts', 'en'),
  ('gallery', 'Gallery', 'Photos from Charlotte Clapperton''s performances and events', 'en'),
  ('contact', 'Contact', 'Contact information for Charlotte Clapperton', 'en')
  ON CONFLICT (page_slug, language) DO UPDATE SET
    title = EXCLUDED.title,
    meta_description = EXCLUDED.meta_description;

  -- 首页部分 - 英文
  INSERT INTO home_sections (section_name, title, subtitle, content, image_url, button_text, button_url, is_active, language) VALUES
  ('hero', 'Charlotte Clapperton', 'Mezzo-Soprano Opera Singer', '', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20mezzo-soprano%20opera%20singer%20on%20stage%2C%20elegant%20pose%2C%20dramatic%20lighting%2C%20high%20quality%20photography&image_size=landscape_16_9', 'About Me', '#about', true, 'en'),
  ('video', 'Featured Performance', '', '', '', '', '', true, 'en'),
  ('about_preview', 'About Charlotte', '', 'Charlotte Clapperton is an internationally acclaimed mezzo-soprano known for her powerful voice and captivating stage presence.', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20mezzo-soprano%20singer%20in%20opera%20costume%2C%20professional%20photography%2C%20dramatic%20lighting%2C%20high%20quality&image_size=portrait_4_3', 'Learn More', '/about', true, 'en'),
  ('upcoming_preview', 'Upcoming Performances', '', 'Check my upcoming performances around the world', '', 'View All', '/upcoming', true, 'en'),
  ('gallery_preview', 'Gallery', '', 'Browse my performance photos', '', 'View Full Gallery', '/gallery', true, 'en')
  ON CONFLICT (section_name, language) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    content = EXCLUDED.content,
    image_url = EXCLUDED.image_url,
    button_text = EXCLUDED.button_text,
    button_url = EXCLUDED.button_url,
    is_active = EXCLUDED.is_active;

  -- 关于页面 - 英文
  INSERT INTO about (title, content, artistic_approach, image_url, performing_image_url, language) VALUES
  ('Charlotte Clapperton', 'Charlotte Clapperton is an internationally acclaimed mezzo-soprano known for her powerful voice, exceptional musicianship, and captivating stage presence. With a repertoire spanning from Baroque to contemporary opera, she has performed in prestigious venues across Europe and North America.

  Born in London, Charlotte began her musical training at the Royal Academy of Music, where she graduated with distinction. She further honed her craft at the Guildhall School of Music & Drama, studying under the renowned mezzo-soprano Sarah Walker.

  Recent highlights include her debut at the Royal Opera House, Covent Garden, as Cherubino in Mozart''s Le nozze di Figaro, and performances with the London Symphony Orchestra, the Metropolitan Opera Orchestra, and the Berlin Philharmonic.

  Charlotte''s unique interpretation of classic roles has earned her critical acclaim and a dedicated following. She is particularly renowned for her portrayals of Carmen, Octavian in Der Rosenkavalier, and Orfeo in Gluck''s Orfeo ed Euridice.', 'Charlotte is dedicated to bringing depth and authenticity to every role she portrays. She believes in the power of opera to connect with audiences on an emotional level, and her performances are noted for their dramatic intensity and vocal beauty.

  In addition to her operatic work, Charlotte is a passionate recitalist, specializing in French mélodies and German lieder. She has recorded several critically acclaimed albums, including French Connections and Songs of Love and Loss.

  Charlotte is also committed to music education and outreach. She regularly conducts masterclasses and workshops for young singers, and she is a patron of several music charities that support emerging artists.

  When not performing, Charlotte enjoys spending time with her family, reading literature, and exploring new cuisines. She is fluent in English, French, German, and Italian, which allows her to bring authentic nuance to her performances in these languages.', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20elegant%20mezzo-soprano%20singer%2C%20classical%20style%2C%20high%20quality%20photography%2C%20dramatic%20lighting&image_size=portrait_4_3', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20performing%20on%20grand%20stage%2C%20opera%20house%20setting%2C%20professional%20photography%2C%20dramatic%20lighting&image_size=portrait_4_3', 'en')
  ON CONFLICT DO NOTHING;

  -- 演出数据 - 英文
  INSERT INTO performances (title, location, date, time, description, image_url, language) VALUES
  ('Royal Albert Hall', 'London, UK', '2024-03-15', '19:30', 'Solo recital featuring works by Bach, Handel, and Purcell', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20stage%20performance%20venue%2C%20elegant%20interior%2C%20concert%20hall%2C%20royal%20albert%20hall&image_size=landscape_16_9', 'en'),
  ('La Scala', 'Milan, Italy', '2024-04-22', '20:00', 'Performances in Mozart''s Le nozze di Figaro as Cherubino', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20house%20interior%2C%20grand%20stage%2C%20luxury%20venue%2C%20la%20scala&image_size=landscape_16_9', 'en'),
  ('Carnegie Hall', 'New York, USA', '2024-05-10', '19:30', 'Collaboration with the New York Philharmonic Orchestra', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=concert%20hall%20interior%2C%20modern%20design%2C%20orchestra%20stage%2C%20carnegie%20hall&image_size=landscape_16_9', 'en'),
  ('Berlin Philharmonie', 'Berlin, Germany', '2024-06-05', '20:00', 'Recital with pianist Daniel Barenboim', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20concert%20hall%20interior%2C%20orchestra%20stage%2C%20berlin%20philharmonie&image_size=landscape_16_9', 'en'),
  ('Sydney Opera House', 'Sydney, Australia', '2024-07-18', '19:30', 'Performances in Bizet''s Carmen as the title role', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20house%20interior%2C%20iconic%20design%2C%20sydney%20opera%20house&image_size=landscape_16_9', 'en')
  ON CONFLICT DO NOTHING;

  -- 画廊数据 - 英文
  INSERT INTO gallery (title, image_url, order_position, language) VALUES
  ('Performance at Royal Albert Hall', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20performing%20on%20stage%2C%20professional%20photography%2C%20dramatic%20lighting%2C%20high%20quality&image_size=landscape_4_3', 1, 'en'),
  ('Backstage at La Scala', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20in%20costume%2C%20backstage%20photo%2C%20professional%20lighting%2C%20high%20quality&image_size=landscape_4_3', 2, 'en'),
  ('With London Symphony Orchestra', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20with%20orchestra%2C%20concert%20performance%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_4_3', 3, 'en'),
  ('Rehearsal at Metropolitan Opera', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20rehearsing%2C%20professional%20photography%2C%20natural%20lighting%2C%20high%20quality&image_size=landscape_4_3', 4, 'en'),
  ('Curtain Call at Carnegie Hall', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20taking%20bow%20on%20stage%2C%20audience%20applause%2C%20professional%20photography&image_size=landscape_4_3', 5, 'en')
  ON CONFLICT DO NOTHING;

  -- 联系信息 - 英文
  INSERT INTO contact_info (title, section_type, name, organization, email, phone, website, order_position, language) VALUES
  ('Management', 'management', 'John Smith', 'Artists Management Inc.', 'management@charlotteclapperton.com', '+1 (555) 123-4567', 'https://artistsmanagement.com', 1, 'en'),
  ('Public Relations', 'pr', 'Jane Doe', 'PR Excellence', 'pr@charlotteclapperton.com', '+1 (555) 987-6543', 'https://prexcellence.com', 2, 'en')
  ON CONFLICT DO NOTHING;

  -- 社交媒体 - 英文
  INSERT INTO social_media (platform, url, order_position, language) VALUES
  ('facebook', 'https://facebook.com/charlotteclapperton', 1, 'en'),
  ('twitter', 'https://twitter.com/charlotteclapperton', 2, 'en'),
  ('instagram', 'https://instagram.com/charlotteclapperton', 3, 'en'),
  ('youtube', 'https://youtube.com/charlotteclapperton', 4, 'en')
  ON CONFLICT DO NOTHING;

  -- 11. 初始化中文数据

  -- 站点配置 - 中文
  INSERT INTO site_config (key, value, description, language) VALUES
  ('site_name', '夏洛特·克拉珀顿', '网站名称', 'zh'),
  ('site_tagline', '女中音歌剧演唱家', '网站标语', 'zh'),
  ('site_email', 'contact@charlotteclapperton.com', '主要联系邮箱', 'zh'),
  ('site_phone', '+1 (555) 123-4567', '主要联系电话', 'zh'),
  ('site_footer', '© 2024 夏洛特·克拉珀顿。保留所有权利。', '页脚文本', 'zh'),
  ('primary_color', '#000000', '网站主色调', 'zh'),
  ('secondary_color', '#ffffff', '网站次色调', 'zh'),
  ('accent_color', '#ff6b6b', '网站强调色', 'zh')
  ON CONFLICT (key, language) DO UPDATE SET
    value = EXCLUDED.value,
    description = EXCLUDED.description;

  -- 导航菜单 - 中文
  INSERT INTO navigation (name, url, order_position, language) VALUES
  ('首页', '/', 1, 'zh'),
  ('关于', '/about', 2, 'zh'),
  ('演出', '/upcoming', 3, 'zh'),
  ('画廊', '/gallery', 4, 'zh'),
  ('联系', '/contact', 5, 'zh')
  ON CONFLICT DO NOTHING;

  -- 页面内容 - 中文
  INSERT INTO page_content (page_slug, title, meta_description, language) VALUES
  ('home', '首页', '夏洛特·克拉珀顿 - 国际知名女中音歌剧演唱家', 'zh'),
  ('about', '关于', '了解更多关于夏洛特·克拉珀顿的背景和艺术理念', 'zh'),
  ('upcoming', '演出安排', '夏洛特·克拉珀顿即将举行的歌剧演出和音乐会', 'zh'),
  ('gallery', '画廊', '夏洛特·克拉珀顿演出和活动的照片', 'zh'),
  ('contact', '联系', '夏洛特·克拉珀顿的联系信息', 'zh')
  ON CONFLICT (page_slug, language) DO UPDATE SET
    title = EXCLUDED.title,
    meta_description = EXCLUDED.meta_description;

  -- 首页部分 - 中文
  INSERT INTO home_sections (section_name, title, subtitle, content, image_url, button_text, button_url, is_active, language) VALUES
  ('hero', '夏洛特·克拉珀顿', '女中音歌剧演唱家', '', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20mezzo-soprano%20opera%20singer%20on%20stage%2C%20elegant%20pose%2C%20dramatic%20lighting%2C%20high%20quality%20photography&image_size=landscape_16_9', '关于我', '#about', true, 'zh'),
  ('video', '精彩演出', '', '', '', '', '', true, 'zh'),
  ('about_preview', '关于夏洛特', '', '夏洛特·克拉珀顿是一位国际知名的女中音歌唱家，以其 powerful 的嗓音和迷人的舞台表现力而闻名。', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20mezzo-soprano%20singer%20in%20opera%20costume%2C%20professional%20photography%2C%20dramatic%20lighting%2C%20high%20quality&image_size=portrait_4_3', '了解更多', '/about', true, 'zh'),
  ('upcoming_preview', '即将举行的演出', '', '查看我在世界各地即将举行的演出', '', '查看全部', '/upcoming', true, 'zh'),
  ('gallery_preview', '画廊', '', '浏览我的演出照片', '', '查看完整画廊', '/gallery', true, 'zh')
  ON CONFLICT (section_name, language) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    content = EXCLUDED.content,
    image_url = EXCLUDED.image_url,
    button_text = EXCLUDED.button_text,
    button_url = EXCLUDED.button_url,
    is_active = EXCLUDED.is_active;

  -- 关于页面 - 中文
  INSERT INTO about (title, content, artistic_approach, image_url, performing_image_url, language) VALUES
  ('夏洛特·克拉珀顿', '夏洛特·克拉珀顿是一位国际知名的女中音歌唱家，以其 powerful 的嗓音、卓越的音乐才华和迷人的舞台表现力而闻名。她的曲目涵盖从巴洛克到现代歌剧，曾在欧洲和北美的 prestigious venues 演出。

  夏洛特出生于伦敦，在皇家音乐学院开始她的音乐训练，并以优异成绩毕业。她在 Guildhall 音乐与戏剧学院进一步磨练技艺，师从著名女中音歌唱家 Sarah Walker。

  最近的亮点包括她在伦敦皇家歌剧院首次亮相，在莫扎特的《费加罗的婚礼》中饰演凯鲁比诺，以及与伦敦交响乐团、大都会歌剧院乐团和柏林爱乐乐团的合作演出。

  夏洛特对经典角色的独特诠释赢得了评论界的好评和忠实的追随者。她尤其以饰演卡门、《玫瑰骑士》中的奥克塔维安和格鲁克的《奥菲欧与尤丽狄茜》中的奥菲欧而闻名。', '夏洛特致力于为她所扮演的每个角色带来深度和真实性。她相信歌剧具有与观众情感连接的力量，她的表演以其戏剧性的强度和 vocal beauty 而著称。

  除了歌剧工作，夏洛特还是一位热情的独唱家，专攻法语艺术歌曲和德国艺术歌曲。她录制了几张广受好评的专辑，包括《法国连接》和《爱与失落之歌》。

  夏洛特还致力于音乐教育和推广。她定期为年轻歌唱家举办大师班和工作坊，并且是 several 支持新兴艺术家的音乐慈善机构的赞助人。

  在不演出时，夏洛特喜欢与家人共度时光、阅读文学作品和探索新美食。她精通英语、法语、德语和意大利语，这使她能够在这些语言的表演中带来 authentic nuance。', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20elegant%20mezzo-soprano%20singer%2C%20classical%20style%2C%20high%20quality%20photography%2C%20dramatic%20lighting&image_size=portrait_4_3', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20performing%20on%20grand%20stage%2C%20opera%20house%20setting%2C%20professional%20photography%2C%20dramatic%20lighting&image_size=portrait_4_3', 'zh')
  ON CONFLICT DO NOTHING;

  -- 演出数据 - 中文
  INSERT INTO performances (title, location, date, time, description, image_url, language) VALUES
  ('皇家阿尔伯特音乐厅', '伦敦，英国', '2024-03-15', '19:30', '独唱音乐会，曲目包括巴赫、亨德尔和普塞尔的作品', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20stage%20performance%20venue%2C%20elegant%20interior%2C%20concert%20hall%2C%20royal%20albert%20hall&image_size=landscape_16_9', 'zh'),
  ('斯卡拉歌剧院', '米兰，意大利', '2024-04-22', '20:00', '在莫扎特的《费加罗的婚礼》中饰演凯鲁比诺', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20house%20interior%2C%20grand%20stage%2C%20luxury%20venue%2C%20la%20scala&image_size=landscape_16_9', 'zh'),
  ('卡内基音乐厅', '纽约，美国', '2024-05-10', '19:30', '与纽约爱乐乐团合作演出', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=concert%20hall%20interior%2C%20modern%20design%2C%20orchestra%20stage%2C%20carnegie%20hall&image_size=landscape_16_9', 'zh'),
  ('柏林爱乐乐团音乐厅', '柏林，德国', '2024-06-05', '20:00', '与钢琴家丹尼尔·巴伦博伊姆合作的独唱音乐会', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20concert%20hall%20interior%2C%20orchestra%20stage%2C%20berlin%20philharmonie&image_size=landscape_16_9', 'zh'),
  ('悉尼歌剧院', '悉尼，澳大利亚', '2024-07-18', '19:30', '在比才的《卡门》中饰演主角卡门', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20house%20interior%2C%20iconic%20design%2C%20sydney%20opera%20house&image_size=landscape_16_9', 'zh')
  ON CONFLICT DO NOTHING;

  -- 画廊数据 - 中文
  INSERT INTO gallery (title, image_url, order_position, language) VALUES
  ('在皇家阿尔伯特音乐厅的演出', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20performing%20on%20stage%2C%20professional%20photography%2C%20dramatic%20lighting%2C%20high%20quality&image_size=landscape_4_3', 1, 'zh'),
  ('在斯卡拉歌剧院后台', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20in%20costume%2C%20backstage%20photo%2C%20professional%20lighting%2C%20high%20quality&image_size=landscape_4_3', 2, 'zh'),
  ('与伦敦交响乐团合作', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20with%20orchestra%2C%20concert%20performance%2C%20professional%20photography%2C%20high%20quality&image_size=landscape_4_3', 3, 'zh'),
  ('在大都会歌剧院排练', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=opera%20singer%20rehearsing%2C%20professional%20photography%2C%20natural%20lighting%2C%20high%20quality&image_size=landscape_4_3', 4, 'zh'),
  ('在卡内基音乐厅谢幕', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mezzo-soprano%20singer%20taking%20bow%20on%20stage%2C%20audience%20applause%2C%20professional%20photography&image_size=landscape_4_3', 5, 'zh')
  ON CONFLICT DO NOTHING;

  -- 联系信息 - 中文
  INSERT INTO contact_info (title, section_type, name, organization, email, phone, website, order_position, language) VALUES
  ('经纪管理', 'management', '约翰·史密斯', '艺术家管理有限公司', 'management@charlotteclapperton.com', '+1 (555) 123-4567', 'https://artistsmanagement.com', 1, 'zh'),
  ('公共关系', 'pr', '简·多伊', '卓越公关', 'pr@charlotteclapperton.com', '+1 (555) 987-6543', 'https://prexcellence.com', 2, 'zh')
  ON CONFLICT DO NOTHING;

  -- 社交媒体 - 中文
  INSERT INTO social_media (platform, url, order_position, language) VALUES
  ('facebook', 'https://facebook.com/charlotteclapperton', 1, 'zh'),
  ('twitter', 'https://twitter.com/charlotteclapperton', 2, 'zh'),
  ('instagram', 'https://instagram.com/charlotteclapperton', 3, 'zh'),
  ('youtube', 'https://youtube.com/charlotteclapperton', 4, 'zh')
  ON CONFLICT DO NOTHING;

  -- 12. 更新视频部分的视频URL（适用于所有语言）
  UPDATE home_sections
  SET video_url = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  WHERE section_name = 'video';

  -- 13. 验证数据插入
  SELECT language, COUNT(*) FROM site_config GROUP BY language;
  SELECT language, COUNT(*) FROM navigation GROUP BY language;
  SELECT language, COUNT(*) FROM page_content GROUP BY language;
  SELECT language, COUNT(*) FROM home_sections GROUP BY language;
  SELECT language, COUNT(*) FROM about GROUP BY language;
  SELECT language, COUNT(*) FROM performances GROUP BY language;
  SELECT language, COUNT(*) FROM gallery GROUP BY language;
  SELECT language, COUNT(*) FROM contact_info GROUP BY language;
  SELECT language, COUNT(*) FROM social_media GROUP BY language;