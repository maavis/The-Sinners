/**
 * THE SINNERS / PARRHESIA - TOUR DATES DATA SERVICE
 * Handles Tour Event CRUD with Supabase PostgreSQL integration and LocalStorage fallback/caching.
 */
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

const STORAGE_KEY = 'parrhesia_tour_events';

// Default initial sample tour dates (fallback if table is empty / offline)
export const INITIAL_TOUR_EVENTS = [
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

/**
 * Transforms PostgreSQL snake_case row to frontend camelCase JavaScript object
 */
export function mapTourFromDB(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    date: row.date || '',
    time: row.time || '20:00',
    venue: row.venue || '',
    city: row.city || '',
    country: row.country || '',
    status: row.status || 'SATIŞTA',
    ticketUrl: row.ticket_url || '',
    rsvpUrl: row.rsvp_url || '',
    description: row.description || '',
    images: Array.isArray(row.images) ? row.images : [],
    isFeatured: Boolean(row.is_featured),
    visible: row.visible !== false,
    createdAt: row.created_at || new Date().toISOString()
  };
}

/**
 * Transforms frontend camelCase JavaScript object to PostgreSQL snake_case row
 */
export function mapTourToDB(eventData) {
  return {
    id: eventData.id || ('evt_' + Date.now()),
    date: eventData.date || new Date().toISOString().split('T')[0],
    time: eventData.time || '20:00',
    venue: eventData.venue || '',
    city: eventData.city || '',
    country: eventData.country || '',
    status: eventData.status || 'SATIŞTA',
    ticket_url: eventData.ticketUrl || '',
    rsvp_url: eventData.rsvpUrl || '',
    description: eventData.description || '',
    images: Array.isArray(eventData.images) ? eventData.images : [],
    is_featured: Boolean(eventData.isFeatured),
    visible: eventData.visible !== false,
    created_at: eventData.createdAt || new Date().toISOString()
  };
}

/**
 * Reads cached tour events synchronously (for instant UI render)
 */
export function getTourEvents() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TOUR_EVENTS));
    return INITIAL_TOUR_EVENTS;
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_TOUR_EVENTS;
  } catch (err) {
    console.error('Error parsing tour events:', err);
    return INITIAL_TOUR_EVENTS;
  }
}

/**
 * Saves tour events to local cache and broadcasts update event
 */
export function saveTourEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  window.dispatchEvent(new CustomEvent('tour-data-updated'));
}

/**
 * Fetches latest tour events from Supabase PostgreSQL tours table
 */
export async function fetchTourEventsFromSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    return getTourEvents();
  }

  try {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.warn('[Supabase] Error fetching tours:', error.message);
      return getTourEvents();
    }

    if (Array.isArray(data) && data.length > 0) {
      const mappedEvents = data.map(mapTourFromDB);
      saveTourEvents(mappedEvents);
      return mappedEvents;
    }

    return getTourEvents();
  } catch (err) {
    console.error('[Supabase] Network error fetching tours:', err);
    return getTourEvents();
  }
}

/**
 * Inserts a new Tour Event directly into Supabase tours table
 */
export async function addTourEvent(eventData) {
  const newEvtId = eventData.id || ('evt_' + Date.now());
  const newEvt = {
    id: newEvtId,
    date: eventData.date || new Date().toISOString().split('T')[0],
    time: eventData.time || '20:00',
    venue: eventData.venue || '',
    city: eventData.city || '',
    country: eventData.country || '',
    status: eventData.status || 'SATIŞTA',
    ticketUrl: eventData.ticketUrl || '',
    rsvpUrl: eventData.rsvpUrl || '',
    description: eventData.description || '',
    images: Array.isArray(eventData.images) ? eventData.images : [],
    isFeatured: Boolean(eventData.isFeatured),
    visible: eventData.visible !== false,
    createdAt: new Date().toISOString()
  };

  // 1. Direct Supabase PostgreSQL INSERT
  if (isSupabaseConfigured && supabase) {
    try {
      const dbPayload = mapTourToDB(newEvt);
      const { data, error } = await supabase
        .from('tours')
        .insert([dbPayload])
        .select()
        .single();

      if (error) {
        console.error('[Supabase] Failed to INSERT tour event:', error.message);
        throw error;
      }

      if (data) {
        const savedEvent = mapTourFromDB(data);
        const currentEvents = getTourEvents().filter(e => e.id !== savedEvent.id);
        currentEvents.push(savedEvent);
        saveTourEvents(currentEvents);
        return savedEvent;
      }
    } catch (err) {
      console.error('[Supabase] Insert exception:', err);
      // Fallback: save to local cache if insert fails
      const events = getTourEvents();
      events.push(newEvt);
      saveTourEvents(events);
      throw err;
    }
  }

  // Fallback if Supabase is not configured
  const events = getTourEvents();
  events.push(newEvt);
  saveTourEvents(events);
  return newEvt;
}

/**
 * Updates a Tour Event in Supabase PostgreSQL tours table
 */
export async function updateTourEvent(id, updatedData) {
  const events = getTourEvents();
  const index = events.findIndex(e => e.id === id);
  const merged = index !== -1 ? { ...events[index], ...updatedData } : { id, ...updatedData };

  if (isSupabaseConfigured && supabase) {
    try {
      const dbPayload = mapTourToDB(merged);
      const { data, error } = await supabase
        .from('tours')
        .update(dbPayload)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('[Supabase] Failed to UPDATE tour event:', error.message);
      } else if (data) {
        const saved = mapTourFromDB(data);
        if (index !== -1) events[index] = saved;
        else events.push(saved);
        saveTourEvents(events);
        return saved;
      }
    } catch (err) {
      console.error('[Supabase] Update exception:', err);
    }
  }

  if (index !== -1) {
    events[index] = merged;
    saveTourEvents(events);
    return events[index];
  }
  return null;
}

/**
 * Deletes a Tour Event from Supabase PostgreSQL tours table
 */
export async function deleteTourEvent(id) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('[Supabase] Failed to DELETE tour event:', error.message);
      }
    } catch (err) {
      console.error('[Supabase] Delete exception:', err);
    }
  }

  let events = getTourEvents();
  events = events.filter(e => e.id !== id);
  saveTourEvents(events);
}

/**
 * Toggles Tour Event visibility in Supabase PostgreSQL tours table
 */
export async function toggleTourEventVisibility(id) {
  const events = getTourEvents();
  const evt = events.find(e => e.id === id);
  if (!evt) return;

  const newVisibility = !evt.visible;
  evt.visible = newVisibility;
  saveTourEvents(events);

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('tours')
        .update({ visible: newVisibility })
        .eq('id', id);

      if (error) {
        console.error('[Supabase] Failed to update tour visibility:', error.message);
      }
    } catch (err) {
      console.error('[Supabase] Toggle visibility exception:', err);
    }
  }
}

/**
 * Filters and sorts events into Upcoming and Past
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

// Automatically fetch latest tours from Supabase on startup
fetchTourEventsFromSupabase();
