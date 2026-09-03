/**
 * PARRHESIA MEDIA LIBRARY SERVICE
 * Manages uploaded image assets and tracks references across Tour, Music, and Updates.
 */
import { getTourEvents } from './tour.js';
import { getReleases } from './music.js';
import { getJournalEntries } from './updates.js';

const STORAGE_KEY = 'parrhesia_media_library';

const INITIAL_MEDIA_ITEMS = [
  {
    id: 'med_101',
    name: '9MM HATE Cover Artwork',
    url: 'https://i.imgur.com/ADvecY4.gif',
    type: 'IMAGE',
    size: '1.4 MB',
    dimensions: '1200 x 1200',
    createdAt: '2026-08-01T10:00:00.000Z'
  },
  {
    id: 'med_102',
    name: 'Cruel Single Artwork',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    type: 'IMAGE',
    size: '850 KB',
    dimensions: '1200 x 800',
    createdAt: '2026-08-02T11:00:00.000Z'
  },
  {
    id: 'med_103',
    name: 'It\'s The Way Cover',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    type: 'IMAGE',
    size: '920 KB',
    dimensions: '1200 x 800',
    createdAt: '2026-08-03T12:00:00.000Z'
  },
  {
    id: 'med_104',
    name: 'Survive EP Cover',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    type: 'IMAGE',
    size: '780 KB',
    dimensions: '1200 x 800',
    createdAt: '2026-08-04T13:00:00.000Z'
  },
  {
    id: 'med_105',
    name: 'Berlin Studio Session Photo',
    url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    type: 'IMAGE',
    size: '1.1 MB',
    dimensions: '1200 x 800',
    createdAt: '2026-08-05T14:00:00.000Z'
  }
];

export function getMediaItems() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MEDIA_ITEMS));
    return INITIAL_MEDIA_ITEMS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_MEDIA_ITEMS;
  }
}

export function saveMediaItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('media-data-updated'));
}

export function addMediaItem({ name, url, type = 'IMAGE', size = '500 KB', dimensions = '1200 x 800' }) {
  const items = getMediaItems();
  const newItem = {
    id: 'med_' + Date.now(),
    name: name || 'Uploaded Asset',
    url,
    type,
    size,
    dimensions,
    createdAt: new Date().toISOString()
  };
  items.unshift(newItem);
  saveMediaItems(items);
  return newItem;
}

export function getMediaUsage(mediaUrl) {
  const usage = [];

  const tours = getTourEvents();
  tours.forEach(t => {
    if (t.images && t.images.includes(mediaUrl)) {
      usage.push(`Tour Event: ${t.venue} (${t.city})`);
    }
  });

  const releases = getReleases();
  releases.forEach(r => {
    if (r.coverUrl === mediaUrl) {
      usage.push(`Release Cover: ${r.title}`);
    }
  });

  const updates = getJournalEntries();
  updates.forEach(u => {
    if (u.image === mediaUrl) {
      usage.push(`Transmission: ${u.title}`);
    }
  });

  return usage;
}

export function deleteMediaItem(id) {
  let items = getMediaItems();
  items = items.filter(m => m.id !== id);
  saveMediaItems(items);
}
