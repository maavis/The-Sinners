import { createClient } from '@supabase/supabase-js';

// Safe environment variable helper supporting import.meta.env, process.env and window
function readEnv(key) {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return String(import.meta.env[key]).trim();
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return String(process.env[key]).trim();
  }
  if (typeof window !== 'undefined' && window.__ENV__ && window.__ENV__[key]) {
    return String(window.__ENV__[key]).trim();
  }
  return '';
}

// 1. Resolve Supabase URL with multiple fallbacks
const supabaseUrl = 
  readEnv('VITE_SUPABASE_URL') ||
  readEnv('NEXT_PUBLIC_SUPABASE_URL') ||
  readEnv('SUPABASE_URL') ||
  '';

// 2. Resolve Supabase Anon / Publishable Key with multiple fallbacks
const supabaseKey = 
  readEnv('VITE_SUPABASE_ANON_KEY') ||
  readEnv('VITE_SUPABASE_PUBLISHABLE_KEY') ||
  readEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') ||
  readEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') ||
  readEnv('SUPABASE_ANON_KEY') ||
  '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

if (!isSupabaseConfigured) {
  console.warn(
    '[Supabase Configuration Notice]\n' +
    'Supabase URL veya Anon Key henüz yüklenemedi.\n' +
    '- Kontrol edilen URL değişkenleri: VITE_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_URL\n' +
    '- Kontrol edilen Key değişkenleri: VITE_SUPABASE_ANON_KEY, VITE_SUPABASE_PUBLISHABLE_KEY, NEXT_PUBLIC_SUPABASE_ANON_KEY\n\n' +
    'Vercel veya lokal .env ayarlarınızda bu değişkenlerin tanımlandığından emin olun.'
  );
}

// 3. Initialize Supabase Client
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
    console.warn('[Supabase Test] Supabase client is not configured.');
    return {
      success: false,
      message: 'Supabase client is not initialized because environment variables are missing.'
    };
  }

  try {
    const { data, error } = await supabase.from('tours').select('id').limit(1);
    if (error) {
      console.warn('[Supabase Test Warning]', error.message);
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
    console.warn('[Supabase Test Exception]', err.message);
    return {
      success: false,
      message: 'Failed to reach Supabase server.',
      error: err.message
    };
  }
}
