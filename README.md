# Musician Portfolio Website

A professional portfolio website for musicians built with Next.js, Supabase, and Cloudflare R2.

## Features

- Responsive design optimized for all devices
- Gallery page for showcasing performance photos
- Biography page with detailed artist information
- Upcoming performances with dynamic data from Supabase
- Contact page with inquiry form
- Integration with Supabase for data storage
- Integration with Cloudflare R2 for media storage

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Cloudflare R2
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- A Supabase account
- A Cloudflare R2 bucket

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd musician-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following content:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudflare R2 Configuration
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=your_r2_bucket_name
R2_ENDPOINT=your_r2_endpoint
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Database Schema

The following tables are expected in your Supabase database:

### events table
```sql
CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  venue TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## R2 Setup

To use Cloudflare R2 for media storage:

1. Create an R2 bucket in your Cloudflare dashboard
2. Generate R2 access keys
3. Update your `.env.local` file with the R2 credentials

## Deployment

The easiest way to deploy this Next.js app is to use Vercel, the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,R2_ACCESS_KEY_ID,R2_SECRET_ACCESS_KEY,R2_BUCKET_NAME,R2_ENDPOINT)

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
- `R2_ACCESS_KEY_ID`: Your R2 access key ID
- `R2_SECRET_ACCESS_KEY`: Your R2 secret access key
- `R2_BUCKET_NAME`: Your R2 bucket name
- `R2_ENDPOINT`: Your R2 endpoint URL

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.