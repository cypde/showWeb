# Contact Page Configuration Schema

## Overview
This document outlines the database schema for the contact page, designed to store and manage contact information in a structured manner. The contact page will only display information without a contact form, as requested.

## Table Structures

### 1. `page_content` Table
Stores basic page information for all pages, including the contact page.

| Field Name | Data Type | Description | Constraints |
|------------|-----------|-------------|-------------|
| `id` | `SERIAL` | Unique identifier for the page | PRIMARY KEY |
| `page_slug` | `VARCHAR(255)` | Unique slug for the page | UNIQUE NOT NULL |
| `title` | `VARCHAR(255)` | Page title | NOT NULL |
| `content` | `TEXT` | Page content/description | |
| `meta_title` | `VARCHAR(255)` | Meta title for SEO | |
| `meta_description` | `TEXT` | Meta description for SEO | |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | Last updated timestamp | DEFAULT NOW() |

### 2. `contact_info` Table
Stores detailed contact information for the contact page.

| Field Name | Data Type | Description | Constraints |
|------------|-----------|-------------|
| `id` | `SERIAL` | Unique identifier for the contact info | PRIMARY KEY |
| `section_type` | `VARCHAR(50)` | Type of contact section (e.g., management, press, social) | NOT NULL |
| `title` | `VARCHAR(255)` | Section title | NOT NULL |
| `name` | `VARCHAR(255)` | Contact person name | |
| `organization` | `VARCHAR(255)` | Organization name | |
| `email` | `VARCHAR(255)` | Email address | |
| `phone` | `VARCHAR(50)` | Phone number | |
| `website` | `VARCHAR(255)` | Website URL | |
| `order_position` | `INTEGER` | Display order | DEFAULT 0 |
| `is_active` | `BOOLEAN` | Whether the section is active | DEFAULT true |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | Last updated timestamp | DEFAULT NOW() |

### 3. `social_media` Table
Stores social media links for the contact page.

| Field Name | Data Type | Description | Constraints |
|------------|-----------|-------------|
| `id` | `SERIAL` | Unique identifier for the social media link | PRIMARY KEY |
| `platform` | `VARCHAR(50)` | Social media platform name | NOT NULL |
| `url` | `VARCHAR(255)` | Social media profile URL | NOT NULL |
| `icon` | `VARCHAR(255)` | Icon class or SVG | |
| `order_position` | `INTEGER` | Display order | DEFAULT 0 |
| `is_active` | `BOOLEAN` | Whether the link is active | DEFAULT true |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | Last updated timestamp | DEFAULT NOW() |

## Element to Table Mapping

### Contact Page Elements

| Page Element | Table | Field | Description |
|--------------|-------|-------|-------------|
| Page Title | page_content | title | Main title of the contact page |
| Page Description | page_content | content | Brief description of the contact page |
| Meta Title | page_content | meta_title | SEO meta title |
| Meta Description | page_content | meta_description | SEO meta description |
| Management Section Title | contact_info | title | Title for management section |
| Management Contact Name | contact_info | name | Name of management contact |
| Management Organization | contact_info | organization | Management company name |
| Management Email | contact_info | email | Management email address |
| Management Phone | contact_info | phone | Management phone number |
| Press Section Title | contact_info | title | Title for press section |
| Press Contact Name | contact_info | name | Name of press contact |
| Press Organization | contact_info | organization | Press company name |
| Press Email | contact_info | email | Press email address |
| Press Phone | contact_info | phone | Press phone number |
| Social Media Section Title | contact_info | title | Title for social media section |
| Social Media Platform | social_media | platform | Social media platform name |
| Social Media URL | social_media | url | Social media profile URL |
| Social Media Icon | social_media | icon | Social media icon |

## Sample Data

### page_content Table
```sql
INSERT INTO page_content (page_slug, title, content, meta_title, meta_description) VALUES
('contact', 'Contact', 'Get in touch with Charlotte Clapperton through management or press contacts.', 'Charlotte Clapperton - Contact', 'Contact information for Charlotte Clapperton, mezzo-soprano opera singer.');
```

### contact_info Table
```sql
INSERT INTO contact_info (section_type, title, name, organization, email, phone, order_position, is_active) VALUES
('management', 'Management', 'John Smith', 'Artists Management Ltd.', 'email@example.com', '+44 (0) 20 1234 5678', 1, true),
('press', 'Press', 'Jane Doe', 'Media Relations', 'press@example.com', '+44 (0) 20 8765 4321', 2, true),
('social', 'Social Media', NULL, NULL, NULL, NULL, 3, true);
```

### social_media Table
```sql
INSERT INTO social_media (platform, url, icon, order_position, is_active) VALUES
('facebook', 'https://facebook.com', 'facebook-icon', 1, true),
('twitter', 'https://twitter.com', 'twitter-icon', 2, true),
('instagram', 'https://instagram.com', 'instagram-icon', 3, true),
('youtube', 'https://youtube.com', 'youtube-icon', 4, true);
```

## Frontend Implementation

The contact page should be modified to:
1. Fetch data from the `page_content` table for the contact page
2. Fetch contact sections from the `contact_info` table
3. Fetch social media links from the `social_media` table
4. Display the information in a clean, English-only format
5. Remove the contact form completely

## Admin Panel Integration

The admin panel should be updated to include:
1. A form to edit the contact page basic information
2. A section to manage contact information (add/edit/delete contact sections)
3. A section to manage social media links (add/edit/delete links)

## Conclusion

This schema provides a structured way to store and manage contact information for the contact page. All elements are designed to be English-only, as requested, and the page will only display information without a contact form. The schema is flexible enough to accommodate future changes to the contact information structure.