/**
 * PARRHESIA TOUR DATES DATA SERVICE
 * Handles Tour Event CRUD and LocalStorage Synchronization.
 */

const STORAGE_KEY = 'parrhesia_tour_events';

// Default initial sample tour dates
const INITIAL_TOUR_EVENTS = [
  {
    id: 'evt_101',
    date: '2026-10-24',
    time: '20:00',
    venue: 'Sick New World Festival',
    city: 'Fort Worth',
    country: 'TX, USA',
    status: 'SATIŞTA',
    ticketUrl: 'https://tickets.example.com/snw',
    rsvpUrl: '',
    description: 'Headline Stage Performance',
    images: [],
    isFeatured: true,
    visible: true,
    createdAt: '2026-08-10T12:00:00.000Z'
  },
  {
    id: 'evt_102',
    date: '2026-11-15',
    time: '21:00',
    venue: 'Accor Stadium',
    city: 'Sydney',
    country: 'Australia',
    status: 'SATIŞTA',
    ticketUrl: 'https://tickets.example.com/sydney',
    rsvpUrl: '',
    description: 'Oceania Tour Opening Night',
    images: [],
    isFeatured: false,
    visible: true,
    createdAt: '2026-08-10T12:30:00.000Z'
  },
  {
    id: 'evt_103',
    date: '2026-12-05',
    time: '20:30',
    venue: 'O2 Brixton Academy',
    city: 'London',
    country: 'UK',
    status: 'TÜKENDİ',
    ticketUrl: 'https://tickets.example.com/london',
    rsvpUrl: '',
    description: 'Winter Solstice Special Show',
    images: [],
    isFeatured: true,
    visible: true,
    createdAt: '2026-08-10T13:00:00.000Z'
  },
  {
    id: 'evt_104',
    date: '2025-05-18',
    time: '20:00',
    venue: 'Wembley Arena',
    city: 'London',
    country: 'UK',
    status: 'TÜKENDİ',
    ticketUrl: '',
    rsvpUrl: '',
    description: 'Sanguivore Ritual Tour',
    images: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    visible: true,
    createdAt: '2025-05-01T10:00:00.000Z'
  },
  {
    id: 'evt_105',
    date: '2025-03-12',
    time: '21:00',
    venue: 'Bataclan',
    city: 'Paris',
    country: 'France',
    status: 'TÜKENDİ',
    ticketUrl: '',
    rsvpUrl: '',
    description: 'European Headline Tour',
    images: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    visible: true,
    createdAt: '2025-03-01T10:00:00.000Z'
  }
];

export function getTourEvents() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TOUR_EVENTS));
    return INITIAL_TOUR_EVENTS;
  }
  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error('Error parsing tour events:', err);
    return INITIAL_TOUR_EVENTS;
  }
}

export function saveTourEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  // Dispatch custom event for real-time reactive sync across app
  window.dispatchEvent(new CustomEvent('tour-data-updated'));
}

export function addTourEvent(eventData) {
  const events = getTourEvents();
  const newEvt = {
    id: 'evt_' + Date.now(),
    date: eventData.date || new Date().toISOString().split('T')[0],
    time: eventData.time || '20:00',
    venue: eventData.venue || '',
    city: eventData.city || '',
    country: eventData.country || '',
    status: eventData.status || 'SATIŞTA',
    ticketUrl: eventData.ticketUrl || '',
    rsvpUrl: '',
    description: eventData.description || '',
    images: Array.isArray(eventData.images) ? eventData.images : [],
    isFeatured: !!eventData.isFeatured,
    visible: eventData.visible !== false,
    createdAt: new Date().toISOString()
  };
  events.push(newEvt);
  saveTourEvents(events);
  return newEvt;
}

export function updateTourEvent(id, updatedData) {
  const events = getTourEvents();
  const index = events.findIndex(e => e.id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...updatedData };
    saveTourEvents(events);
    return events[index];
  }
  return null;
}

export function deleteTourEvent(id) {
  let events = getTourEvents();
  events = events.filter(e => e.id !== id);
  saveTourEvents(events);
}

export function toggleTourEventVisibility(id) {
  const events = getTourEvents();
  const evt = events.find(e => e.id === id);
  if (evt) {
    evt.visible = !evt.visible;
    saveTourEvents(events);
  }
}

/**
 * Filter and sort events into Upcoming and Past
 */
export function getCategorizedTourEvents() {
  const allEvents = getTourEvents();
  const todayStr = new Date().toISOString().split('T')[0];

  const upcoming = allEvents
    .filter(e => e.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date)); // Nearest date first

  const past = allEvents
    .filter(e => e.date < todayStr)
    .sort((a, b) => b.date.localeCompare(a.date)); // Most recent past date first

  return { upcoming, past };
}
