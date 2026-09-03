/**
 * PARRHESIA MUSIC DATA SERVICE
 * Official Releases, Tracks, and Audio Streams Data Store.
 */

const STORAGE_KEY = 'parrhesia_releases';

export const INITIAL_RELEASES = [
  {
    id: 'rel_9mm_hate',
    title: '9MM HATE',
    artist: 'THE SINNERS',
    year: '2026',
    releaseDate: '18 OCAK 2026',
    type: 'ALBUM',
    coverUrl: 'https://i.imgur.com/ADvecY4.gif',
    description: 'The Sinners\' flagship 2026 dark alternative / gothic rock album featuring 8 raw, high-contrast tracks.',
    status: 'PUBLISHED',
    featured: true,
    tracks: [
      { id: 'trk_101', title: 'Parrhesia!', duration: '03:56', durationSec: 236, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', releaseId: 'rel_9mm_hate', releaseTitle: '9MM HATE', type: 'ALBUM' },
      { id: 'trk_102', title: 'Wasn\'t Me', duration: '03:23', durationSec: 203, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', releaseId: 'rel_9mm_hate', releaseTitle: '9MM HATE', type: 'ALBUM' },
      { id: 'trk_103', title: 'Betrayal', duration: '03:34', durationSec: 214, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', releaseId: 'rel_9mm_hate', releaseTitle: '9MM HATE', type: 'ALBUM' },
      { id: 'trk_104', title: 'I\'m Not Okay', duration: '03:25', durationSec: 205, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', releaseId: 'rel_9mm_hate', releaseTitle: '9MM HATE', type: 'ALBUM' },
      { id: 'trk_105', title: 'For the Night', duration: '03:25', durationSec: 205, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', releaseId: 'rel_9mm_hate', releaseTitle: '9MM HATE', type: 'ALBUM' },
      { id: 'trk_106', title: 'Way to Heaven', duration: '05:57', durationSec: 357, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', releaseId: 'rel_9mm_hate', releaseTitle: '9MM HATE', type: 'ALBUM' },
      { id: 'trk_107', title: 'Still Standing', duration: '04:12', durationSec: 252, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', releaseId: 'rel_9mm_hate', releaseTitle: '9MM HATE', type: 'ALBUM' },
      { id: 'trk_108', title: 'No Longer Quiet', duration: '03:45', durationSec: 225, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', releaseId: 'rel_9mm_hate', releaseTitle: '9MM HATE', type: 'ALBUM' }
    ]
  },
  {
    id: 'rel_cruel',
    title: 'CRUEL',
    artist: 'THE SINNERS',
    year: '2025',
    releaseDate: '05 KASIM 2025',
    type: 'SINGLE',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy guitar riffs and visceral vocals leading the Sanguivore Era.',
    status: 'PUBLISHED',
    featured: false,
    tracks: [
      { id: 'trk_201', title: 'Cruel', duration: '04:15', durationSec: 255, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', releaseId: 'rel_cruel', releaseTitle: 'CRUEL', type: 'SINGLE' },
      { id: 'trk_202', title: 'Cruel (Instrumental)', duration: '04:15', durationSec: 255, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', releaseId: 'rel_cruel', releaseTitle: 'CRUEL', type: 'SINGLE' }
    ]
  },
  {
    id: 'rel_its_the_way',
    title: 'IT\'S THE WAY',
    artist: 'THE SINNERS',
    year: '2025',
    releaseDate: '14 AĞUSTOS 2025',
    type: 'SINGLE',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: 'Atmospheric post-punk anthem with sweeping synth basslines.',
    status: 'PUBLISHED',
    featured: false,
    tracks: [
      { id: 'trk_301', title: 'It\'s the Way', duration: '03:48', durationSec: 228, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', releaseId: 'rel_its_the_way', releaseTitle: 'IT\'S THE WAY', type: 'SINGLE' }
    ]
  },
  {
    id: 'rel_survive',
    title: 'SURVIVE',
    artist: 'THE SINNERS',
    year: '2025',
    releaseDate: '20 ŞUBAT 2025',
    type: 'EP',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    description: 'The foundational 3-track EP defining The Sinners\' signature gothic sound.',
    status: 'PUBLISHED',
    featured: false,
    tracks: [
      { id: 'trk_401', title: 'Survive', duration: '04:02', durationSec: 242, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', releaseId: 'rel_survive', releaseTitle: 'SURVIVE', type: 'EP' },
      { id: 'trk_402', title: 'Darkness Echoes', duration: '03:50', durationSec: 230, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', releaseId: 'rel_survive', releaseTitle: 'SURVIVE', type: 'EP' },
      { id: 'trk_403', title: 'Bloodline', duration: '04:30', durationSec: 270, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', releaseId: 'rel_survive', releaseTitle: 'SURVIVE', type: 'EP' }
    ]
  }
];

export const RELEASES = getReleases();

export function getReleases() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_RELEASES));
    return INITIAL_RELEASES;
  }
  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0].tracks || parsed[0].tracks.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_RELEASES));
      return INITIAL_RELEASES;
    }
    let updated = false;
    parsed.forEach(rel => {
      if (rel.artist === 'PARRHESIA') {
        rel.artist = 'THE SINNERS';
        updated = true;
      }
      if (rel.description && rel.description.includes('Parrhesia')) {
        rel.description = rel.description.replace(/Parrhesia/g, 'The Sinners');
        updated = true;
      }
    });
    if (updated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    console.error('Error parsing music releases:', e);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_RELEASES));
    return INITIAL_RELEASES;
  }
}

export function saveReleases(releases) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(releases));
  window.dispatchEvent(new CustomEvent('music-data-updated'));
}

export function addRelease(releaseData) {
  const releases = getReleases();
  const newRelease = {
    id: 'rel_' + Date.now(),
    title: releaseData.title || 'UNTITLED RELEASE',
    artist: releaseData.artist || 'THE SINNERS',
    year: releaseData.year || new Date().getFullYear().toString(),
    releaseDate: releaseData.releaseDate || new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase(),
    type: releaseData.type || 'SINGLE',
    coverUrl: releaseData.coverUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    description: releaseData.description || '',
    status: releaseData.status || 'PUBLISHED',
    featured: releaseData.featured || false,
    tracks: releaseData.tracks || []
  };

  if (newRelease.featured) {
    releases.forEach(r => r.featured = false);
  }

  releases.unshift(newRelease);
  saveReleases(releases);
  return newRelease;
}

export function updateRelease(id, updatedData) {
  const releases = getReleases();
  const index = releases.findIndex(r => r.id === id);
  if (index !== -1) {
    if (updatedData.featured) {
      releases.forEach(r => r.featured = false);
    }
    releases[index] = { ...releases[index], ...updatedData };
    saveReleases(releases);
    return releases[index];
  }
  return null;
}

export function deleteRelease(id) {
  let releases = getReleases();
  releases = releases.filter(r => r.id !== id);
  saveReleases(releases);
}

// Helper to flatten all published tracks across releases for the Music Archive
export function getAllTracks() {
  const releases = getReleases();
  const tracks = [];
  releases.forEach(rel => {
    if (rel.status === 'DRAFT') return;
    (rel.tracks || []).forEach(trk => {
      tracks.push({
        ...trk,
        coverUrl: rel.coverUrl,
        artist: rel.artist,
        year: rel.year,
        type: rel.type
      });
    });
  });
  return tracks;
}

// LocalStorage Favorites Helper
const FAV_KEY = 'parrhesia_fav_tracks';

export function getFavoriteTrackIds() {
  try {
    const stored = localStorage.getItem(FAV_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

export function toggleFavoriteTrack(trackId) {
  const favs = getFavoriteTrackIds();
  const index = favs.indexOf(trackId);
  if (index !== -1) {
    favs.splice(index, 1);
  } else {
    favs.push(trackId);
  }
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  window.dispatchEvent(new CustomEvent('favorites-updated'));
  return favs.includes(trackId);
}
