/**
 * PARRHESIA FOOTER DATA SERVICE
 * Manages dynamic footer text, copyright lines, and links across all public pages.
 */

const STORAGE_KEY = 'parrhesia_footer_data';

const DEFAULT_FOOTER_DATA = {
  line1: "© DEVIL'S GRIN RECORDS 2026",
  line2: "MADE OF SIN",
  line4: "© 2026 The Sinners",
  privacyPolicyUrl: "#",
  termsConditionsUrl: "#",
  aiUsageUrl: "#"
};

export function getFooterData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      let updated = false;
      if (!parsed.line2 || parsed.line2.includes('COMA') || parsed.line2.includes('UNSPOKEN') || parsed.line2.includes('WE BUILT A WORLD')) {
        parsed.line2 = DEFAULT_FOOTER_DATA.line2;
        updated = true;
      }
      if (!parsed.line4 || parsed.line4.includes('Sony Music') || parsed.line4.includes('Parrhesia')) {
        parsed.line4 = DEFAULT_FOOTER_DATA.line4;
        updated = true;
      }
      if (updated) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...DEFAULT_FOOTER_DATA, ...parsed }));
      }
      return { ...DEFAULT_FOOTER_DATA, ...parsed };
    }
  } catch (e) {
    console.error('Error reading footer data:', e);
  }
  return { ...DEFAULT_FOOTER_DATA };
}

export function updateFooterData(newData) {
  try {
    const current = getFooterData();
    const updated = { ...current, ...newData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('footer-data-updated', { detail: updated }));
    return updated;
  } catch (e) {
    console.error('Error updating footer data:', e);
    return null;
  }
}
