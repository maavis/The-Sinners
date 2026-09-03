/**
 * PARRHESIA DIGITAL JOURNAL / CREATIVE ARCHIVE DATA SERVICE
 * Manages raw studio records, photos, thoughts, and timestamps.
 */

const STORAGE_KEY = 'parrhesia_journal_entries';

const INITIAL_JOURNAL_ENTRIES = [
  {
    id: 'upd_104',
    date: '12 AUG 2026',
    category: 'ESSAY // DISCOGRAPHY',
    title: 'THE ANALOG RESONANCE OF 9MM HATE',
    body: `The tape machine doesn't forgive. In an era dominated by surgical digital precision, 9MM HATE was built on physical friction, magnetic tape saturation, and room spill. Every track was tracked live through custom valve preamps directly to a vintage 24-track 2-inch tape machine.

We spent weeks tuning the room to reflect raw low-frequency pressure without losing the high-register guitar decay. What you hear on the record is the unedited sonic footprint of three human beings occupying the same room at midnight.`,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    meta: 'LONDON // ANALOG SESSION 04',
    tracklist: ['01 Parrhesia!', '02 Wasn\'t Me', '03 Betrayal', '04 I\'m Not Okay'],
    links: [
      { name: 'SPOTIFY', url: 'https://spotify.com' },
      { name: 'APPLE MUSIC', url: 'https://apple.com' },
      { name: 'BANDCAMP', url: 'https://bandcamp.com' }
    ],
    createdAt: '2026-08-12T10:00:00.000Z'
  },
  {
    id: 'upd_101',
    date: '11 AUG 2026',
    category: 'STUDIO DIARY',
    title: "WE'RE STILL HERE. ROOM LOUDNESS & SPECTRUM.",
    body: `The room has been getting louder. Tape reels spinning late into the morning. Analog synths warming up for the upcoming European tour cycle. We built this space to test sound pressure limits and emotional boundaries.

No pitch correction, no quantization grids. Just heavy bass frequencies bouncing off brutalist concrete walls.`,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    meta: '01:42 // THE SINNERS STUDIO',
    tracklist: ['01 Sound Test Alpha', '02 Sub-bass Feedback'],
    links: [
      { name: 'SPOTIFY', url: 'https://spotify.com' },
      { name: 'SOUNDCLOUD', url: 'https://soundcloud.com' }
    ],
    createdAt: '2026-08-11T01:42:00.000Z'
  },
  {
    id: 'upd_102',
    date: '04 AUG 2026',
    category: 'ESSAY // NOISE ARCHIVE',
    title: 'NO NEWS. JUST PURE UNFILTERED NOISE.',
    body: `Reflections on modern music aesthetics, feedback loops, and dynamic tension. Why raw noise remains the purest expression of unfiltered truth in recorded audio.

When silence breaks, it shouldn't apologize. It should demand full presence.`,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    meta: '03:15 // NIGHT TRANSMISSION',
    tracklist: ['01 Feedback Loop I', '02 Industrial Decay'],
    links: [
      { name: 'BANDCAMP', url: 'https://bandcamp.com' }
    ],
    createdAt: '2026-08-04T03:15:00.000Z'
  },
  {
    id: 'upd_103',
    date: '28 JUL 2026',
    category: 'PHOTOGRAPHY // FIELD RECORDINGS',
    title: 'BERLIN INDUSTRIAL SOUNDSCAPE SESSIONS',
    body: `Field recordings captured across abandoned industrial complexes in East Berlin. Low-frequency hums, resonant acoustic cavities, and metallic decay merged into the atmospheric layers of our upcoming releases.`,
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    meta: 'BERLIN // FIELD RECORDINGS',
    tracklist: ['01 Berlin Ambient Decay'],
    links: [
      { name: 'YOUTUBE', url: 'https://youtube.com' }
    ],
    createdAt: '2026-07-28T22:00:00.000Z'
  }
];

export function getJournalEntries() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_JOURNAL_ENTRIES));
    return INITIAL_JOURNAL_ENTRIES;
  }
  try {
    const parsed = JSON.parse(stored);
    let updated = false;
    parsed.forEach(entry => {
      if (entry.meta && entry.meta.includes('PARRHESIA')) {
        entry.meta = entry.meta.replace(/PARRHESIA/g, 'THE SINNERS');
        updated = true;
      }
    });
    if (updated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    console.error('Error parsing journal entries:', e);
    return INITIAL_JOURNAL_ENTRIES;
  }
}

export function saveJournalEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new CustomEvent('updates-data-updated'));
}

export function addJournalEntry(entryData) {
  const entries = getJournalEntries();
  const newEntry = {
    id: 'upd_' + Date.now(),
    date: entryData.date || new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
    category: entryData.category || 'TRANSMISSION // JOURNAL',
    title: entryData.title || '',
    body: entryData.body || '',
    image: entryData.image || '',
    meta: entryData.meta || '',
    status: entryData.status || 'PUBLISHED',
    featured: entryData.featured || false,
    tracklist: entryData.tracklist || [],
    links: entryData.links || [],
    createdAt: new Date().toISOString()
  };

  if (newEntry.featured) {
    entries.forEach(e => e.featured = false);
  }

  entries.unshift(newEntry);
  saveJournalEntries(entries);
  return newEntry;
}

export function updateJournalEntry(id, updatedData) {
  const entries = getJournalEntries();
  const index = entries.findIndex(e => e.id === id);
  if (index !== -1) {
    if (updatedData.featured) {
      entries.forEach(e => e.featured = false);
    }
    entries[index] = { ...entries[index], ...updatedData };
    saveJournalEntries(entries);
    return entries[index];
  }
  return null;
}

export function deleteJournalEntry(id) {
  let entries = getJournalEntries();
  entries = entries.filter(e => e.id !== id);
  saveJournalEntries(entries);
}
