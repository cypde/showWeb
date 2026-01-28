import { createClient } from '@supabase/supabase-js';

// Get environment variables with defaults
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yuiugsbbnzjbdygprbih.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_1Jd4DzhQfyonYLHHZNZK8w_rML2SLE3';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;