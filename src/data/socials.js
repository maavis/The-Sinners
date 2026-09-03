/**
 * PARRHESIA SOCIAL MEDIA LINKS DATA SERVICE
 * Uses exact downloaded favicons from real sites (Facebrowser, Youtube, Soundloop, LS Chat, SanMail).
 */

const STORAGE_KEY = 'parrhesia_social_links_v4'; // Versioned key to force refresh LocalStorage with real favicons

export const BUILTIN_SVGS = {
  generic: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`
};

export const DEFAULT_SOCIAL_LINKS = [
  {
    id: 'soc_1',
    name: 'Facebrowser',
    url: 'https://face-tr.gta.world/page/parrhesia',
    iconUrl: '/icons/facebrowser.ico'
  },
  {
    id: 'soc_2',
    name: 'Youtube',
    url: 'https://www.youtube.com/@parrhesiatheband',
    iconUrl: '/icons/youtube.png'
  },
  {
    id: 'soc_3',
    name: 'Soundloop',
    url: 'https://soundloop.app',
    iconUrl: '/icons/soundloop.png'
  },
  {
    id: 'soc_4',
    name: 'LS Chat',
    url: 'https://chat-tr.gta.world/app/s/107/5398',
    iconUrl: '/icons/lschat.svg'
  },
  {
    id: 'soc_5',
    name: 'SanMail',
    url: 'https://mail-tr.gta.world/compose?to=mail%40parrhesia.com',
    iconUrl: '/icons/sanmail.png'
  }
];

export function getSocialIconHTML(item) {
  const urlKey = (item.url || '').toLowerCase();
  const nameKey = (item.name || '').toLowerCase().replace(/\s+/g, '');

  let iconSrc = item.iconUrl && item.iconUrl.trim() !== '' ? item.iconUrl.trim() : '';

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
    return `<img src="${escapeHtml(iconSrc)}" alt="${escapeHtml(item.name || 'Social Icon')}" class="header-social-icon-img" onerror="this.onerror=null; this.src='https://www.google.com/s2/favicons?domain=${encodeURIComponent(item.url)}&sz=64';" />`;
  }

  return BUILTIN_SVGS.generic;
}

export function getSocialLinks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SOCIAL_LINKS));
    return DEFAULT_SOCIAL_LINKS;
  }
  try {
    const links = JSON.parse(stored);
    if (!Array.isArray(links) || links.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SOCIAL_LINKS));
      return DEFAULT_SOCIAL_LINKS;
    }
    return links;
  } catch (e) {
    return DEFAULT_SOCIAL_LINKS;
  }
}

export function saveSocialLinks(links) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  window.dispatchEvent(new CustomEvent('socials-data-updated'));
}

export function addSocialLink({ name, url, iconUrl }) {
  const links = getSocialLinks();
  const newLink = {
    id: 'soc_' + Date.now(),
    name: name || 'Social Link',
    url: url || '#',
    iconUrl: iconUrl || ''
  };
  links.push(newLink);
  saveSocialLinks(links);
  return newLink;
}

export function updateSocialLink(id, { name, url, iconUrl }) {
  const links = getSocialLinks();
  const index = links.findIndex(item => item.id === id);
  if (index !== -1) {
    links[index] = {
      ...links[index],
      name: name !== undefined ? name : links[index].name,
      url: url !== undefined ? url : links[index].url,
      iconUrl: iconUrl !== undefined ? iconUrl : links[index].iconUrl
    };
    saveSocialLinks(links);
    return links[index];
  }
  return null;
}

export function deleteSocialLink(id) {
  const links = getSocialLinks();
  const filtered = links.filter(item => item.id !== id);
  saveSocialLinks(filtered);
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
