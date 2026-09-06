/**
 * PARRHESIA SYSTEM SETTINGS SERVICE
 * CMS System Settings & Global Configurations.
 */

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

export function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent('settings-updated'));
}
