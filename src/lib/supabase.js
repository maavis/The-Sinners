import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://orgsksunccsxeyobhbvr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yZ3Nrc3VuY2NzeGV5b2JoYnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MjI5NzEsImV4cCI6MjEwMzk5ODk3MX0.BAiRKvFyNMBYVNlMTR2PVo7aTk7LCbw6F6fgLx5oto8';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
