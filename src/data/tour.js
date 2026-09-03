/**
 * THE SINNERS / PARRHESIA - TOUR DATES DATA SERVICE
 * Fully powered by Supabase PostgreSQL (LocalStorage removed).
 */
import { supabase } from '../lib/supabase.js';

// In-memory tour events cache for instant component render
let inMemoryTours = [];

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
  const payload = {};
  if (eventData.id) payload.id = eventData.id;
  if (eventData.date !== undefined) payload.date = eventData.date;
  if (eventData.time !== undefined) payload.time = eventData.time || '20:00';
  if (eventData.venue !== undefined) payload.venue = eventData.venue;
  if (eventData.city !== undefined) payload.city = eventData.city;
  if (eventData.country !== undefined) payload.country = eventData.country;
  if (eventData.status !== undefined) payload.status = eventData.status;
  if (eventData.ticketUrl !== undefined) payload.ticket_url = eventData.ticketUrl;
  if (eventData.rsvpUrl !== undefined) payload.rsvp_url = eventData.rsvpUrl;
  if (eventData.description !== undefined) payload.description = eventData.description;
  if (eventData.images !== undefined) payload.images = Array.isArray(eventData.images) ? eventData.images : [];
  if (eventData.isFeatured !== undefined) payload.is_featured = Boolean(eventData.isFeatured);
  if (eventData.visible !== undefined) payload.visible = eventData.visible !== false;
  return payload;
}

/**
 * Returns current in-memory tour events
 */
export function getTourEvents() {
  return inMemoryTours;
}

/**
 * Fetches latest tour events from Supabase PostgreSQL tours table
 */
export async function fetchTourEventsFromSupabase() {
  if (!supabase) {
    console.error('Supabase Tour Hatası: Supabase client is not initialized.');
    return inMemoryTours;
  }

  try {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Supabase Tour Hatası:', error);
      return inMemoryTours;
    }

    if (Array.isArray(data)) {
      inMemoryTours = data.map(mapTourFromDB);
      window.dispatchEvent(new CustomEvent('tour-data-updated'));
      return inMemoryTours;
    }

    return inMemoryTours;
  } catch (err) {
    console.error('Supabase Tour Hatası (Network):', err);
    return inMemoryTours;
  }
}

/**
 * Inserts a new Tour Event directly into Supabase tours table
 */
export async function addTourEvent(eventData) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized. Please check your .env variables.');
    console.error('Supabase Tour Hatası:', err);
    throw err;
  }

  const newTour = {
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
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('tours')
      .insert([newTour])
      .select()
      .single();

    if (error) {
      console.error('Supabase Tour Hatası:', error);
      throw error;
    }

    console.log('Supabase Tour Kaydedildi:', data);

    const savedEvent = mapTourFromDB(data);
    inMemoryTours.push(savedEvent);
    window.dispatchEvent(new CustomEvent('tour-data-updated'));

    return savedEvent;
  } catch (err) {
    console.error('Supabase Tour Hatası:', err);
    throw err;
  }
}

/**
 * Updates an existing Tour Event directly in Supabase tours table
 */
export async function updateTourEvent(id, updatedData) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Tour Hatası:', err);
    throw err;
  }

  try {
    const dbPayload = mapTourToDB(updatedData);
    const { data, error } = await supabase
      .from('tours')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase Tour Hatası:', error);
      throw error;
    }

    console.log('Supabase Tour Güncellendi:', data);

    const saved = mapTourFromDB(data);
    const index = inMemoryTours.findIndex(e => e.id === id);
    if (index !== -1) {
      inMemoryTours[index] = saved;
    } else {
      inMemoryTours.push(saved);
    }
    window.dispatchEvent(new CustomEvent('tour-data-updated'));

    return saved;
  } catch (err) {
    console.error('Supabase Tour Hatası:', err);
    throw err;
  }
}

/**
 * Deletes a Tour Event directly from Supabase tours table
 */
export async function deleteTourEvent(id) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Tour Hatası:', err);
    throw err;
  }

  try {
    const { error } = await supabase
      .from('tours')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase Tour Hatası:', error);
      throw error;
    }

    console.log('Supabase Tour Silindi:', id);

    inMemoryTours = inMemoryTours.filter(e => e.id !== id);
    window.dispatchEvent(new CustomEvent('tour-data-updated'));
  } catch (err) {
    console.error('Supabase Tour Hatası:', err);
    throw err;
  }
}

/**
 * Toggles Tour Event visibility in Supabase tours table
 */
export async function toggleTourEventVisibility(id) {
  const evt = inMemoryTours.find(e => e.id === id);
  if (!evt) return;

  const newVisibility = !evt.visible;

  if (!supabase) {
    console.error('Supabase Tour Hatası: Supabase not initialized');
    return;
  }

  try {
    const { data, error } = await supabase
      .from('tours')
      .update({ visible: newVisibility })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase Tour Hatası:', error);
      throw error;
    }

    console.log('Supabase Tour Görünürlük Güncellendi:', data);

    evt.visible = newVisibility;
    window.dispatchEvent(new CustomEvent('tour-data-updated'));
  } catch (err) {
    console.error('Supabase Tour Hatası:', err);
  }
}

/**
 * Filters and sorts events into Upcoming and Past
 */
export function getCategorizedTourEvents() {
  const todayStr = new Date().toISOString().split('T')[0];

  const upcoming = inMemoryTours
    .filter(e => e.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date)); // Nearest date first

  const past = inMemoryTours
    .filter(e => e.date < todayStr)
    .sort((a, b) => b.date.localeCompare(a.date)); // Most recent past date first

  return { upcoming, past };
}

// Initial fetch from Supabase when module loads
fetchTourEventsFromSupabase();
