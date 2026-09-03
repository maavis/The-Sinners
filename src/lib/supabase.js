import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  ''
).trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

if (!isSupabaseConfigured) {
  console.warn(
    '[Supabase Warning] Environment variables are missing or not loaded yet by Vite.\n' +
    'Eğer .env dosyasını yeni eklediyseniz terminalde "npm run dev" sunucusunu durdurup (Ctrl+C) tekrar başlatmanız gerekir.\n' +
    'Beklenen değişkenler: VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY (veya VITE_SUPABASE_PUBLISHABLE_KEY)'
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
    const { data, error } = await supabase.from('tours').select('id').limit(1);
    if (error) {
      return {
        success: false,
        message: 'Supabase error: ' + error.message,
        error
      };
    }
    return {
      success: true,
      message: 'Supabase client connected successfully.',
      data
    };
  } catch (err) {
    return {
      success: false,
      message: 'Failed to reach Supabase server.',
      error: err.message
    };
  }
}
