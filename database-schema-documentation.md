# 音乐人网站数据库架构文档

## 表结构概览

| 表名 | 描述 |
|------|------|
| `site_config` | 站点级配置设置 |
| `navigation` | 导航菜单项 |
| `page_content` | 所有页面的基础内容 |
| `home_sections` | 首页特定部分 |
| `about` | 关于页面内容 |
| `performances` | 即将到来的演出 |
| `gallery` | 画廊图片 |
| `contact_info` | 联系信息部分 |
| `social_media` | 社交媒体链接 |

## 详细表结构

### 1. `site_config` 表

| 字段名 | 数据类型 | 描述 | 必填 | 默认值 |
|--------|----------|------|------|--------|
| `id` | `BIGSERIAL` | 主键 | 是 | 自动递增 |
| `key` | `TEXT` | 配置键（唯一） | 是 | 无 |
| `value` | `TEXT` | 配置值 | 是 | 无 |
| `description` | `TEXT` | 配置描述 | 否 | `NULL` |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | 创建时间戳 | 否 | `NOW()` |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | 最后更新时间戳 | 否 | `NOW()` |

**用途：** 存储全局站点设置，如站点名称、标语、联系信息和颜色方案。

### 2. `navigation` 表

| 字段名 | 数据类型 | 描述 | 必填 | 默认值 |
|--------|----------|------|------|--------|
| `id` | `BIGSERIAL` | 主键 | 是 | 自动递增 |
| `name` | `TEXT` | 菜单项名称 | 是 | 无 |
| `url` | `TEXT` | 菜单项URL | 是 | 无 |
| `order_position` | `INTEGER` | 显示顺序 | 否 | `0` |
| `is_active` | `BOOLEAN` | 菜单项是否激活 | 否 | `true` |
| `parent_id` | `BIGINT` | 父菜单项ID（用于下拉菜单） | 否 | `NULL` |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | 创建时间戳 | 否 | `NOW()` |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | 最后更新时间戳 | 否 | `NOW()` |

**用途：** 定义导航菜单结构，支持嵌套下拉菜单。

### 3. `page_content` 表

| 字段名 | 数据类型 | 描述 | 必填 | 默认值 |
|--------|----------|------|------|--------|
| `id` | `BIGSERIAL` | 主键 | 是 | 自动递增 |
| `page_slug` | `TEXT` | 页面标识符（唯一） | 是 | 无 |
| `title` | `TEXT` | 页面标题 | 是 | 无 |
| `subtitle` | `TEXT` | 页面副标题 | 否 | `NULL` |
| `meta_description` | `TEXT` | SEO元描述 | 否 | `NULL` |
| `meta_keywords` | `TEXT` | SEO元关键词 | 否 | `NULL` |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | 创建时间戳 | 否 | `NOW()` |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | 最后更新时间戳 | 否 | `NOW()` |

**用途：** 存储每个页面的基础内容和元数据。

### 4. `home_sections` 表

| 字段名 | 数据类型 | 描述 | 必填 | 默认值 |
|--------|----------|------|------|--------|
| `id` | `BIGSERIAL` | 主键 | 是 | 自动递增 |
| `section_name` | `TEXT` | 部分标识符（唯一） | 是 | 无 |
| `title` | `TEXT` | 部分标题 | 否 | `NULL` |
| `subtitle` | `TEXT` | 部分副标题 | 否 | `NULL` |
| `content` | `TEXT` | 部分内容 | 否 | `NULL` |
| `image_url` | `TEXT` | 部分图片URL | 否 | `NULL` |
| `button_text` | `TEXT` | 按钮文本 | 否 | `NULL` |
| `button_url` | `TEXT` | 按钮URL | 否 | `NULL` |
| `is_active` | `BOOLEAN` | 部分是否激活 | 否 | `true` |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | 创建时间戳 | 否 | `NOW()` |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | 最后更新时间戳 | 否 | `NOW()` |

**用途：** 定义首页的各个部分（英雄区、视频区、关于预览等）。

### 5. `about` 表

| 字段名 | 数据类型 | 描述 | 必填 | 默认值 |
|--------|----------|------|------|--------|
| `id` | `BIGSERIAL` | 主键 | 是 | 自动递增 |
| `title` | `TEXT` | 页面标题 | 是 | 无 |
| `subtitle` | `TEXT` | 页面副标题 | 否 | `NULL` |
| `content` | `TEXT` | 主要内容 | 否 | `NULL` |
| `artistic_approach` | `TEXT` | 艺术方法部分 | 否 | `NULL` |
| `image_url` | `TEXT` | 主要图片URL | 否 | `NULL` |
| `performing_image_url` | `TEXT` | 表演图片URL | 否 | `NULL` |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | 创建时间戳 | 否 | `NOW()` |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | 最后更新时间戳 | 否 | `NOW()` |

**用途：** 存储关于页面的内容，包括个人简介和艺术方法。

### 6. `performances` 表

| 字段名 | 数据类型 | 描述 | 必填 | 默认值 |
|--------|----------|------|------|--------|
| `id` | `BIGSERIAL` | 主键 | 是 | 自动递增 |
| `title` | `TEXT` | 演出标题 | 是 | 无 |
| `location` | `TEXT` | 演出地点 | 是 | 无 |
| `date` | `DATE` | 演出日期 | 是 | 无 |
| `time` | `TEXT` | 演出时间 | 否 | `NULL` |
| `description` | `TEXT` | 演出描述 | 否 | `NULL` |
| `image_url` | `TEXT` | 演出图片URL | 否 | `NULL` |
| `is_active` | `BOOLEAN` | 演出是否激活 | 否 | `true` |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | 创建时间戳 | 否 | `NOW()` |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | 最后更新时间戳 | 否 | `NOW()` |

**用途：** 存储即将到来的演出和活动信息。

### 7. `gallery` 表

| 字段名 | 数据类型 | 描述 | 必填 | 默认值 |
|--------|----------|------|------|--------|
| `id` | `BIGSERIAL` | 主键 | 是 | 自动递增 |
| `title` | `TEXT` | 图片标题 | 否 | `NULL` |
| `image_url` | `TEXT` | 图片URL | 是 | 无 |
| `description` | `TEXT` | 图片描述 | 否 | `NULL` |
| `order_position` | `INTEGER` | 显示顺序 | 否 | `0` |
| `is_active` | `BOOLEAN` | 图片是否激活 | 否 | `true` |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | 创建时间戳 | 否 | `NOW()` |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | 最后更新时间戳 | 否 | `NOW()` |

**用途：** 存储带有标题和描述的画廊图片。

### 8. `contact_info` 表

| 字段名 | 数据类型 | 描述 | 必填 | 默认值 |
|--------|----------|------|------|--------|
| `id` | `BIGSERIAL` | 主键 | 是 | 自动递增 |
| `title` | `TEXT` | 联系部分标题 | 是 | 无 |
| `section_type` | `TEXT` | 部分类型（management, pr, booking, social） | 是 | 无 |
| `name` | `TEXT` | 联系人姓名 | 否 | `NULL` |
| `organization` | `TEXT` | 组织名称 | 否 | `NULL` |
| `email` | `TEXT` | 联系邮箱 | 否 | `NULL` |
| `phone` | `TEXT` | 联系电话 | 否 | `NULL` |
| `website` | `TEXT` | 联系网站 | 否 | `NULL` |
| `order_position` | `INTEGER` | 显示顺序 | 否 | `0` |
| `is_active` | `BOOLEAN` | 联系信息是否激活 | 否 | `true` |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | 创建时间戳 | 否 | `NOW()` |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | 最后更新时间戳 | 否 | `NOW()` |

**用途：** 存储不同的联系信息部分（管理、公关、预订）。

### 9. `social_media` 表

| 字段名 | 数据类型 | 描述 | 必填 | 默认值 |
|--------|----------|------|------|--------|
| `id` | `BIGSERIAL` | 主键 | 是 | 自动递增 |
| `platform` | `TEXT` | 社交媒体平台 | 是 | 无 |
| `url` | `TEXT` | 社交媒体个人资料URL | 是 | 无 |
| `icon` | `TEXT` | 社交媒体图标（可选） | 否 | `NULL` |
| `order_position` | `INTEGER` | 显示顺序 | 否 | `0` |
| `is_active` | `BOOLEAN` | 社交链接是否激活 | 否 | `true` |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | 创建时间戳 | 否 | `NOW()` |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | 最后更新时间戳 | 否 | `NOW()` |

**用途：** 存储社交媒体链接及其显示顺序。

## 字段映射到UI元素

### 首页

| UI元素 | 表 | 字段 |
|--------|-----|------|
| 英雄区标题 | `home_sections` | `title` (section_name='hero') |
| 英雄区副标题 | `home_sections` | `subtitle` (section_name='hero') |
| 英雄区图片 | `home_sections` | `image_url` (section_name='hero') |
| 关于预览标题 | `home_sections` | `title` (section_name='about_preview') |
| 关于预览内容 | `home_sections` | `content` (section_name='about_preview') |
| 关于预览图片 | `home_sections` | `image_url` (section_name='about_preview') |
| 演出预览标题 | `home_sections` | `title` (section_name='upcoming_preview') |
| 画廊预览标题 | `home_sections` | `title` (section_name='gallery_preview') |

### 关于页面

| UI元素 | 表 | 字段 |
|--------|-----|------|
| 页面标题 | `about` | `title` |
| 主要内容 | `about` | `content` |
| 艺术方法 | `about` | `artistic_approach` |
| 主要图片 | `about` | `image_url` |
| 表演图片 | `about` | `performing_image_url` |

### 演出页面

| UI元素 | 表 | 字段 |
|--------|-----|------|
| 页面标题 | `page_content` | `title` (page_slug='upcoming') |
| 演出项目 | `performances` | 多个字段 |
| 演出标题 | `performances` | `title` |
| 演出地点 | `performances` | `location` |
| 演出日期 | `performances` | `date` |
| 演出时间 | `performances` | `time` |
| 演出描述 | `performances` | `description` |
| 演出图片 | `performances` | `image_url` |

### 画廊页面

| UI元素 | 表 | 字段 |
|--------|-----|------|
| 页面标题 | `page_content` | `title` (page_slug='gallery') |
| 画廊图片 | `gallery` | 多个字段 |
| 图片URL | `gallery` | `image_url` |
| 图片标题 | `gallery` | `title` |

### 联系页面

| UI元素 | 表 | 字段 |
|--------|-----|------|
| 页面标题 | `page_content` | `title` (page_slug='contact') |
| 联系部分 | `contact_info` | 多个字段 |
| 部分标题 | `contact_info` | `title` |
| 联系人姓名 | `contact_info` | `name` |
| 组织名称 | `contact_info` | `organization` |
| 联系邮箱 | `contact_info` | `email` |
| 联系电话 | `contact_info` | `phone` |
| 联系网站 | `contact_info` | `website` |
| 社交媒体链接 | `social_media` | 多个字段 |
| 社交平台 | `social_media` | `platform` |
| 社交URL | `social_media` | `url` |

### 导航菜单

| UI元素 | 表 | 字段 |
|--------|-----|------|
| 菜单项 | `navigation` | 多个字段 |
| 菜单项名称 | `navigation` | `name` |
| 菜单项URL | `navigation` | `url` |
| 菜单项顺序 | `navigation` | `order_position` |

### 站点全局元素

| UI元素 | 表 | 字段 |
|--------|-----|------|
| 站点名称 | `site_config` | `value` (key='site_name') |
| 站点标语 | `site_config` | `value` (key='site_tagline') |
| 站点邮箱 | `site_config` | `value` (key='site_email') |
| 站点电话 | `site_config` | `value` (key='site_phone') |
| 页脚文本 | `site_config` | `value` (key='site_footer') |
| 主色调 | `site_config` | `value` (key='primary_color') |
| 辅助色 | `site_config` | `value` (key='secondary_color') |
| 强调色 | `site_config` | `value` (key='accent_color') |

## 如何更新内容

所有内容都可以通过Supabase控制台直接更新：

1. 登录您的Supabase项目
2. 导航到"数据库"部分
3. 选择您要更新的表
4. 使用"编辑"按钮修改现有记录
5. 使用"插入"按钮添加新记录

### 示例：更新首页部分

1. 进入 `home_sections` 表
2. 找到 `section_name` = 'hero' 的记录
3. 根据需要更新 `title`、`subtitle`、`image_url` 字段
4. 点击"保存"

### 示例：添加新演出

1. 进入 `performances` 表
2. 点击"插入行"
3. 填写 `title`、`location`、`date`、`time`、`description`、`image_url`
4. 将 `is_active` 设置为 `true`
5. 点击"保存"

### 示例：更新画廊图片

1. 进入 `gallery` 表
2. 为每张图片更新 `image_url` 字段，使用您的实际图片URL
3. 设置 `order_position` 以控制显示顺序
4. 点击"保存"

## 重要说明

- 所有图片字段存储URL文本，而非实际文件
- 可以使用任何图片托管服务，只需将URL粘贴到相应字段
- `is_active` 字段可用于临时隐藏内容而不删除
- `order_position` 字段控制项目的显示顺序
- 时间戳在记录修改时自动更新

## 示例数据

SQL脚本包含所有表的示例数据，帮助您快速开始。您可以修改这些数据以匹配您的特定需求。