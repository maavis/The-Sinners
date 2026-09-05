/**
 * PARRHESIA SOCIAL MEDIA LINKS DATA SERVICE
 * Fully powered by Supabase PostgreSQL social_links table.
 */
import { supabase } from '../lib/supabase.js';

export const BUILTIN_SVGS = {
  generic: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`
};

// Initial state is strictly an empty array to eliminate any flicker/flash of old static icons in the footer
let inMemorySocialLinks = [];

export const HEADER_SOCIAL_LINKS = [
  {
    id: 'hdr_1',
    name: 'Facebrowser',
    title: 'Facebrowser',
    url: 'https://face-tr.gta.world/page/parrhesia',
    target_url: 'https://face-tr.gta.world/page/parrhesia',
    icon_url: '/icons/facebrowser.ico'
  },
  {
    id: 'hdr_2',
    name: 'Youtube',
    title: 'Youtube',
    url: 'https://www.youtube.com/@parrhesiatheband',
    target_url: 'https://www.youtube.com/@parrhesiatheband',
    icon_url: '/icons/youtube.png'
  },
  {
    id: 'hdr_3',
    name: 'Soundloop',
    title: 'Soundloop',
    url: 'https://soundloop.app',
    target_url: 'https://soundloop.app',
    icon_url: '/icons/soundloop.png'
  },
  {
    id: 'hdr_4',
    name: 'LS Chat',
    title: 'LS Chat',
    url: 'https://chat-tr.gta.world/app/s/107/5398',
    target_url: 'https://chat-tr.gta.world/app/s/107/5398',
    icon_url: '/icons/lschat.svg'
  },
  {
    id: 'hdr_5',
    name: 'SanMail',
    title: 'SanMail',
    url: 'https://mail-tr.gta.world/compose?to=mail%40parrhesia.com',
    target_url: 'https://mail-tr.gta.world/compose?to=mail%40parrhesia.com',
    icon_url: '/icons/sanmail.png'
  }
];

export function getHeaderSocialLinks() {
  return HEADER_SOCIAL_LINKS;
}

/**
 * Returns isolated Header Social Icon HTML (restores original 17px design & hover effects)
 */
export function getHeaderSocialIconHTML(item) {
  const urlKey = (item.target_url || item.url || '').toLowerCase();
  const nameKey = (item.title || item.name || '').toLowerCase().replace(/\s+/g, '');

  let iconSrc = item.icon_url || item.iconUrl || '';
  if (typeof iconSrc === 'string') iconSrc = iconSrc.trim();

  if (!iconSrc) {
    if (nameKey.includes('facebrowser') || urlKey.includes('face-tr.gta.world')) {
      iconSrc = '/icons/facebrowser.ico';
    } else if (nameKey.includes('youtube') || urlKey.includes('youtube.com')) {
      iconSrc = '/icons/youtube.png';
    } else if (nameKey.includes('soundloop') || urlKey.includes('soundloop.app')) {
      iconSrc = '/icons/soundloop.png';
    } else if (nameKey.includes('chat') || urlKey.includes('chat-tr.gta.world')) {
      iconSrc = '/icons/lschat.svg';
    } else if (nameKey.includes('mail') || urlKey.includes('mail-tr.gta.world')) {
      iconSrc = '/icons/sanmail.png';
    }
  }

  if (iconSrc) {
    if (iconSrc.startsWith('<svg')) {
      return iconSrc;
    }
    const finalUrl = item.target_url || item.url || 'https://google.com';
    return `<img src="${escapeHtml(iconSrc)}" alt="${escapeHtml(item.title || item.name || 'Social Icon')}" class="header-social-icon-img" onerror="this.onerror=null; this.src='https://www.google.com/s2/favicons?domain=${encodeURIComponent(finalUrl)}&sz=64';" />`;
  }

  return BUILTIN_SVGS.generic;
}

/**
 * Returns isolated Footer Social Icon HTML (22px replica brutalist styling)
 */
export function getFooterSocialIconHTML(item) {
  let iconSrc = item.icon_url || item.iconUrl || '';
  if (typeof iconSrc === 'string') iconSrc = iconSrc.trim();

  if (iconSrc) {
    if (iconSrc.startsWith('<svg')) {
      return iconSrc;
    }
    const finalUrl = item.target_url || item.url || 'https://google.com';
    return `<img src="${escapeHtml(iconSrc)}" alt="${escapeHtml(item.title || item.name || 'Social Icon')}" class="footer-replica-icon-img" onerror="this.onerror=null; this.src='https://www.google.com/s2/favicons?domain=${encodeURIComponent(finalUrl)}&sz=64';" />`;
  }

  return BUILTIN_SVGS.generic;
}

export function getSocialIconHTML(item) {
  return getHeaderSocialIconHTML(item);
}

/**
 * Returns current in-memory social links (empty array [] until Supabase responds)
 */
export function getSocialLinks() {
  return inMemorySocialLinks;
}

/**
 * Fetches latest social links from Supabase social_links table
 */
export async function fetchSocialLinksFromSupabase() {
  if (!supabase) {
    console.error('Supabase Social Links: client is not initialized.');
    return getSocialLinks();
  }

  try {
    let linksData = null;
    const { data: orderData, error: orderError } = await supabase
      .from('social_links')
      .select('*')
      .order('display_order', { ascending: true });

    if (orderError) {
      console.warn('Supabase display_order fetch attempt:', orderError);
      // Fallback query if table only had sort_order
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('social_links')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!fallbackError && Array.isArray(fallbackData) && fallbackData.length > 0) {
        linksData = fallbackData;
      }
    } else if (Array.isArray(orderData) && orderData.length > 0) {
      linksData = orderData;
    }

    if (Array.isArray(linksData) && linksData.length > 0) {
      inMemorySocialLinks = linksData.map((row, idx) => {
        const title = row.title || row.name || 'Social Link';
        const targetUrl = row.target_url || row.url || '#';
        const iconUrl = row.icon_url || '';
        const orderNum = Number(row.display_order ?? row.sort_order ?? (idx + 1));

        return {
          id: String(row.id || `soc_${idx + 1}`),
          title: title,
          name: title,
          target_url: targetUrl,
          url: targetUrl,
          icon_url: iconUrl,
          iconUrl: iconUrl,
          display_order: orderNum,
          sort_order: orderNum,
          createdAt: row.created_at || new Date().toISOString()
        };
      });
    }

    window.dispatchEvent(new CustomEvent('socials-data-updated'));
    return getSocialLinks();
  } catch (err) {
    console.error('Supabase Social Links Hatası (Network):', err);
    return getSocialLinks();
  }
}

/**
 * Upserts a single social link in Supabase
 */
export async function upsertSocialLink({ id, title, name, target_url, url, icon_url, iconUrl, display_order, sort_order }) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Social Link Hatası:', err);
    throw err;
  }

  const linkId = id || ('soc_' + Date.now());
  const finalTitle = title || name || 'Social Link';
  const finalUrl = target_url || url || '#';
  const finalIcon = icon_url || iconUrl || '';
  const orderNum = Number(display_order ?? sort_order ?? 1);

  const payload = {
    id: linkId,
    title: finalTitle,
    name: finalTitle,
    target_url: finalUrl,
    url: finalUrl,
    icon_url: finalIcon,
    display_order: orderNum,
    sort_order: orderNum,
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('social_links')
      .upsert(payload, { onConflict: 'id' })
      .select();

    if (error) {
      console.error('Supabase Social Link Upsert Hatası:', error);
      throw error;
    }

    console.log('Supabase Social Link Upsert Edildi:', data);

    const saved = {
      id: linkId,
      title: finalTitle,
      name: finalTitle,
      target_url: finalUrl,
      url: finalUrl,
      icon_url: finalIcon,
      iconUrl: finalIcon,
      display_order: orderNum,
      sort_order: orderNum,
      createdAt: new Date().toISOString()
    };

    const existingIdx = inMemorySocialLinks.findIndex(s => s.id === linkId);
    if (existingIdx !== -1) {
      inMemorySocialLinks[existingIdx] = saved;
    } else {
      inMemorySocialLinks.push(saved);
    }

    inMemorySocialLinks.sort((a, b) => (a.display_order || 1) - (b.display_order || 1));
    window.dispatchEvent(new CustomEvent('socials-data-updated'));
    return saved;
  } catch (err) {
    console.error('Supabase Social Link Hatası:', err);
    throw err;
  }
}

/**
 * Batch saves multiple social links into Supabase
 */
export async function saveSocialLinksBatch(links) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Social Links Batch Hatası:', err);
    throw err;
  }

  const payloads = links.map((link, idx) => {
    const linkId = link.id || `soc_${idx + 1}`;
    const finalTitle = link.title || link.name || 'Social Link';
    const finalUrl = link.target_url || link.url || '#';
    const finalIcon = link.icon_url || link.iconUrl || '';
    const orderNum = Number(link.display_order ?? link.sort_order ?? (idx + 1));

    return {
      id: linkId,
      title: finalTitle,
      name: finalTitle,
      target_url: finalUrl,
      url: finalUrl,
      icon_url: finalIcon,
      display_order: orderNum,
      sort_order: orderNum,
      created_at: new Date().toISOString()
    };
  });

  try {
    const { data, error } = await supabase
      .from('social_links')
      .upsert(payloads, { onConflict: 'id' })
      .select();

    if (error) {
      console.error('Supabase Social Links Batch Hatası:', error);
      throw error;
    }

    console.log('Supabase Social Links Batch Upsert Edildi:', data);

    inMemorySocialLinks = payloads.map(p => ({
      ...p,
      iconUrl: p.icon_url,
      createdAt: p.created_at
    }));

    inMemorySocialLinks.sort((a, b) => (a.display_order || 1) - (b.display_order || 1));
    window.dispatchEvent(new CustomEvent('socials-data-updated'));
    return inMemorySocialLinks;
  } catch (err) {
    console.error('Supabase Social Links Batch Hatası:', err);
    throw err;
  }
}

export async function addSocialLink({ name, title, url, target_url, iconUrl, icon_url, display_order }) {
  return upsertSocialLink({
    id: 'soc_' + Date.now(),
    title: title || name,
    name: name || title,
    target_url: target_url || url,
    url: url || target_url,
    icon_url: icon_url || iconUrl,
    display_order
  });
}

export async function updateSocialLink(id, { name, title, url, target_url, iconUrl, icon_url, display_order }) {
  return upsertSocialLink({
    id,
    title: title || name,
    name: name || title,
    target_url: target_url || url,
    url: url || target_url,
    icon_url: icon_url || iconUrl,
    display_order
  });
}

export async function deleteSocialLink(id) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Social Link Hatası:', err);
    throw err;
  }

  try {
    const { error } = await supabase
      .from('social_links')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase Social Link Silme Hatası:', error);
      throw error;
    }

    inMemorySocialLinks = inMemorySocialLinks.filter(item => item.id !== id);
    window.dispatchEvent(new CustomEvent('socials-data-updated'));
  } catch (err) {
    console.error('Supabase Social Link Silme Hatası:', err);
    throw err;
  }
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Initial fetch from Supabase on startup
fetchSocialLinksFromSupabase();

