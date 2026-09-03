import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
                    import.meta.env.VITE_SUPABASE_ANON_KEY || 
                    import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
                    import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

if (!isSupabaseConfigured) {
  console.warn(
    '[Supabase] Environment variables missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file or Vercel settings.'
  );
}

// Client-side Supabase instance using Publishable/Anon key
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;

/**
 * Diagnostic helper to verify Supabase initialization and connection status
 */
export async function testSupabaseConnection() {
  if (!isSupabaseConfigured || !supabase) {
    return {
      success: false,
      message: 'Supabase client is not initialized because environment variables are missing.'
    };
  }

  try {
    const { error } = await supabase.from('_test_connection').select('*').limit(1);
    // Even if table does not exist (PGRST116/42P01), getting a response from PostgREST confirms connection to Supabase endpoint
    if (error && error.code !== '42P01' && error.code !== 'PGRST204') {
      return {
        success: true,
        message: 'Connected to Supabase endpoint successfully.',
        details: error.message
      };
    }
    return {
      success: true,
      message: 'Supabase client connected successfully.'
    };
  } catch (err) {
    return {
      success: false,
      message: 'Failed to reach Supabase server.',
      error: err.message
    };
  }
}
