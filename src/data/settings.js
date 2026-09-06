import { supabase } from '../lib/supabase.js';

const STORAGE_KEY = 'parrhesia_cms_settings';

const INITIAL_SETTINGS = {
  siteTitle: 'toxic - the band',
  artistName: 'TOXIC',
  heroAlbumTitle: 'MADE OF SIN',
  contactEmail: 'booking@toxic.com',
  maintenanceMode: false,
  autoPublishSchedule: true,
  defaultPlayerVolume: 0.8
};

export function getSettings() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SETTINGS));
    return INITIAL_SETTINGS;
  }
  try {
    const parsed = JSON.parse(stored);
    let updated = false;
    if (!parsed.siteTitle || parsed.siteTitle.includes('parrhesia') || parsed.siteTitle.includes('your local band') || parsed.siteTitle.includes('The Sinners') || parsed.siteTitle.includes('Toxic - Made of Sin')) {
      parsed.siteTitle = INITIAL_SETTINGS.siteTitle;
      updated = true;
    }
    if (!parsed.artistName || parsed.artistName.includes('PARRHESIA') || parsed.artistName.includes('THE SINNERS')) {
      parsed.artistName = INITIAL_SETTINGS.artistName;
      updated = true;
    }
    if (parsed.contactEmail && parsed.contactEmail.includes('thesinners.com')) {
      parsed.contactEmail = INITIAL_SETTINGS.contactEmail;
      updated = true;
    }
    if (!parsed.heroAlbumTitle) {
      parsed.heroAlbumTitle = INITIAL_SETTINGS.heroAlbumTitle;
      updated = true;
    }
    if (updated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...INITIAL_SETTINGS, ...parsed }));
    }
    return { ...INITIAL_SETTINGS, ...parsed };
  } catch (e) {
    return INITIAL_SETTINGS;
  }
}

export async function fetchSettingsFromSupabase() {
  if (!supabase) return getSettings();
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'default')
      .single();

    if (error) {
      console.warn('Supabase site_settings fetch error:', error.message);
      return getSettings();
    }

    if (data) {
      const current = getSettings();
      const merged = {
        ...current,
        siteTitle: data.site_title || current.siteTitle,
        artistName: data.artist_name || current.artistName,
        heroAlbumTitle: data.hero_album_title || current.heroAlbumTitle,
        contactEmail: data.contact_email || current.contactEmail,
        maintenanceMode: data.maintenance_mode !== undefined ? data.maintenance_mode : current.maintenanceMode
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent('settings-updated'));
      return merged;
    }
  } catch (err) {
    console.error('Supabase site_settings fetch exception:', err);
  }
  return getSettings();
}

export async function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent('settings-updated'));

  if (supabase) {
    try {
      await supabase.from('site_settings').upsert({
        id: 'default',
        site_title: settings.siteTitle,
        site_description: '',
        artist_name: settings.artistName,
        hero_album_title: settings.heroAlbumTitle,
        contact_email: settings.contactEmail,
        maintenance_mode: !!settings.maintenanceMode,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });
    } catch (err) {
      console.warn('Supabase site_settings upsert error:', err);
    }
  }
}
