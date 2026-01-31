# 联系页面配置架构

## 概述
本文档概述了联系页面的数据库架构，旨在以结构化方式存储和管理联系信息。根据要求，联系页面将仅显示信息，不包含联系表单。

## 表结构

### 1. `page_content` 表
存储所有页面（包括联系页面）的基本页面信息。

| 字段名称 | 数据类型 | 描述 | 约束 |
|------------|-----------|-------------|-------------|
| `id` | `SERIAL` | 页面的唯一标识符 | PRIMARY KEY |
| `page_slug` | `VARCHAR(255)` | 页面的唯一标识符 | UNIQUE NOT NULL |
| `title` | `VARCHAR(255)` | 页面标题 | NOT NULL |
| `content` | `TEXT` | 页面内容/描述 | |
| `meta_title` | `VARCHAR(255)` | SEO 元标题 | |
| `meta_description` | `TEXT` | SEO 元描述 | |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | 最后更新时间戳 | DEFAULT NOW() |

### 2. `contact_info` 表
存储联系页面的详细联系信息。

| 字段名称 | 数据类型 | 描述 | 约束 |
|------------|-----------|-------------|-------------|
| `id` | `SERIAL` | 联系信息的唯一标识符 | PRIMARY KEY |
| `section_type` | `VARCHAR(50)` | 联系部分的类型（例如，管理、媒体、社交） | NOT NULL |
| `title` | `VARCHAR(255)` | 部分标题 | NOT NULL |
| `name` | `VARCHAR(255)` | 联系人姓名 | |
| `organization` | `VARCHAR(255)` | 组织名称 | |
| `email` | `VARCHAR(255)` | 电子邮件地址 | |
| `phone` | `VARCHAR(50)` | 电话号码 | |
| `website` | `VARCHAR(255)` | 网站 URL | |
| `order_position` | `INTEGER` | 显示顺序 | DEFAULT 0 |
| `is_active` | `BOOLEAN` | 部分是否活跃 | DEFAULT true |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | 最后更新时间戳 | DEFAULT NOW() |

### 3. `social_media` 表
存储联系页面的社交媒体链接。

| 字段名称 | 数据类型 | 描述 | 约束 |
|------------|-----------|-------------|-------------|
| `id` | `SERIAL` | 社交媒体链接的唯一标识符 | PRIMARY KEY |
| `platform` | `VARCHAR(50)` | 社交媒体平台名称 | NOT NULL |
| `url` | `VARCHAR(255)` | 社交媒体个人资料 URL | NOT NULL |
| `icon` | `VARCHAR(255)` | 图标类或 SVG | |
| `order_position` | `INTEGER` | 显示顺序 | DEFAULT 0 |
| `is_active` | `BOOLEAN` | 链接是否活跃 | DEFAULT true |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | 最后更新时间戳 | DEFAULT NOW() |

## 元素到表的映射

### 联系页面元素

| 页面元素 | 表 | 字段 | 描述 |
|--------------|-------|-------|-------------|
| 页面标题 | page_content | title | 联系页面的主标题 |
| 页面描述 | page_content | content | 联系页面的简要描述 |
| 元标题 | page_content | meta_title | SEO 元标题 |
| 元描述 | page_content | meta_description | SEO 元描述 |
| 管理部分标题 | contact_info | title | 管理部分的标题 |
| 管理联系人姓名 | contact_info | name | 管理联系人的姓名 |
| 管理组织 | contact_info | organization | 管理公司名称 |
| 管理电子邮件 | contact_info | email | 管理电子邮件地址 |
| 管理电话 | contact_info | phone | 管理电话号码 |
| 媒体部分标题 | contact_info | title | 媒体部分的标题 |
| 媒体联系人姓名 | contact_info | name | 媒体联系人的姓名 |
| 媒体组织 | contact_info | organization | 媒体公司名称 |
| 媒体电子邮件 | contact_info | email | 媒体电子邮件地址 |
| 媒体电话 | contact_info | phone | 媒体电话号码 |
| 社交媒体部分标题 | contact_info | title | 社交媒体部分的标题 |
| 社交媒体平台 | social_media | platform | 社交媒体平台名称 |
| 社交媒体 URL | social_media | url | 社交媒体个人资料 URL |
| 社交媒体图标 | social_media | icon | 社交媒体图标 |

## 示例数据

### page_content 表
```sql
INSERT INTO page_content (page_slug, title, content, meta_title, meta_description) VALUES
('contact', '联系我们', '通过管理或媒体联系人与 Charlotte Clapperton 取得联系。', 'Charlotte Clapperton - 联系我们', '女中音歌剧演唱家 Charlotte Clapperton 的联系信息。');
```

### contact_info 表
```sql
INSERT INTO contact_info (section_type, title, name, organization, email, phone, order_position, is_active) VALUES
('management', '管理', 'John Smith', 'Artists Management Ltd.', 'email@example.com', '+44 (0) 20 1234 5678', 1, true),
('press', '媒体', 'Jane Doe', 'Media Relations', 'press@example.com', '+44 (0) 20 8765 4321', 2, true),
('social', '社交媒体', NULL, NULL, NULL, NULL, 3, true);
```

### social_media 表
```sql
INSERT INTO social_media (platform, url, icon, order_position, is_active) VALUES
('facebook', 'https://facebook.com', 'facebook-icon', 1, true),
('twitter', 'https://twitter.com', 'twitter-icon', 2, true),
('instagram', 'https://instagram.com', 'instagram-icon', 3, true),
('youtube', 'https://youtube.com', 'youtube-icon', 4, true);
```

## 前端实现

联系页面应修改为：
1. 从 `page_content` 表中获取联系页面的数据
2. 从 `contact_info` 表中获取联系部分
3. 从 `social_media` 表中获取社交媒体链接
4. 以干净的英文格式显示信息
5. 完全删除联系表单

## 管理面板集成

管理面板应更新为包含：
1. 编辑联系页面基本信息的表单
2. 管理联系信息的部分（添加/编辑/删除联系部分）
3. 管理社交媒体链接的部分（添加/编辑/删除链接）

## 结论

此架构提供了一种结构化方式来存储和管理联系页面的联系信息。所有元素均设计为仅使用英文，如要求所述，页面将仅显示信息，不包含联系表单。该架构足够灵活，可以适应联系信息结构的未来变化。