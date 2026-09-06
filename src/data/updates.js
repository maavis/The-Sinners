/**
 * TOXIC / PARRHESIA - DIGITAL JOURNAL / UPDATES DATA SERVICE
 * Fully powered by Supabase PostgreSQL updates table (LocalStorage removed).
 */
import { supabase } from '../lib/supabase.js';

// In-memory journal entries cache for instant UI rendering
let inMemoryUpdates = [];

/**
 * Transforms PostgreSQL snake_case row to frontend camelCase JavaScript object
 */
export function mapUpdateFromDB(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    date: row.date || '',
    category: row.category || 'TRANSMISSION // JOURNAL',
    title: row.title || '',
    body: row.body || '',
    image: row.image || '',
    meta: row.meta || '',
    status: row.status || 'PUBLISHED',
    featured: Boolean(row.featured),
    tracklist: Array.isArray(row.tracklist) ? row.tracklist : [],
    links: Array.isArray(row.links) ? row.links : [],
    createdAt: row.created_at || new Date().toISOString()
  };
}

/**
 * Transforms frontend camelCase JavaScript object to PostgreSQL snake_case row
 */
export function mapUpdateToDB(entryData) {
  const payload = {};
  if (entryData.id) payload.id = entryData.id;
  if (entryData.date !== undefined) payload.date = entryData.date;
  if (entryData.category !== undefined) payload.category = entryData.category;
  if (entryData.title !== undefined) payload.title = entryData.title;
  if (entryData.body !== undefined) payload.body = entryData.body;
  if (entryData.image !== undefined) payload.image = entryData.image;
  if (entryData.meta !== undefined) payload.meta = entryData.meta;
  if (entryData.status !== undefined) payload.status = entryData.status;
  if (entryData.featured !== undefined) payload.featured = Boolean(entryData.featured);
  if (entryData.tracklist !== undefined) payload.tracklist = Array.isArray(entryData.tracklist) ? entryData.tracklist : [];
  if (entryData.links !== undefined) payload.links = Array.isArray(entryData.links) ? entryData.links : [];
  if (entryData.createdAt !== undefined) payload.created_at = entryData.createdAt;
  return payload;
}

/**
 * Returns current in-memory journal entries
 */
export function getJournalEntries() {
  return inMemoryUpdates;
}

/**
 * Fetches latest journal entries from Supabase PostgreSQL updates table
 */
export async function fetchJournalEntriesFromSupabase() {
  if (!supabase) {
    console.error('Supabase Update Hatası: Supabase client is not initialized.');
    return inMemoryUpdates;
  }

  try {
    const { data, error } = await supabase
      .from('updates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Update Hatası:', error);
      return inMemoryUpdates;
    }

    if (Array.isArray(data)) {
      inMemoryUpdates = data.map(mapUpdateFromDB);
      window.dispatchEvent(new CustomEvent('updates-data-updated'));
      return inMemoryUpdates;
    }

    return inMemoryUpdates;
  } catch (err) {
    console.error('Supabase Update Hatası (Network):', err);
    return inMemoryUpdates;
  }
}

/**
 * Inserts a new Journal/Update entry directly into Supabase updates table
 */
export async function addJournalEntry(entryData) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Update Hatası:', err);
    throw err;
  }

  const newEntry = {
    id: entryData.id || ('upd_' + Date.now()),
    date: entryData.date || new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
    category: entryData.category || 'TRANSMISSION // JOURNAL',
    title: entryData.title || '',
    body: entryData.body || '',
    image: entryData.image || '',
    meta: entryData.meta || '',
    status: entryData.status || 'PUBLISHED',
    featured: Boolean(entryData.featured),
    tracklist: Array.isArray(entryData.tracklist) ? entryData.tracklist : [],
    links: Array.isArray(entryData.links) ? entryData.links : [],
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('updates')
      .insert([newEntry])
      .select()
      .single();

    if (error) {
      console.error('Supabase Update Hatası:', error);
      throw error;
    }

    console.log('Supabase Tour Kaydedildi:', data); // Log pattern
    console.log('Supabase Update Kaydedildi:', data);

    const saved = mapUpdateFromDB(data);
    inMemoryUpdates.unshift(saved);
    window.dispatchEvent(new CustomEvent('updates-data-updated'));

    return saved;
  } catch (err) {
    console.error('Supabase Update Hatası:', err);
    throw err;
  }
}

/**
 * Updates an existing Journal/Update entry directly in Supabase updates table
 */
export async function updateJournalEntry(id, updatedData) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Update Hatası:', err);
    throw err;
  }

  try {
    const dbPayload = mapUpdateToDB(updatedData);
    delete dbPayload.id; // Primary key should not be modified

    const { data, error } = await supabase
      .from('updates')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase Update Hatası:', error);
      throw error;
    }

    console.log('Supabase Update Güncellendi:', data);

    const saved = mapUpdateFromDB(data);
    const index = inMemoryUpdates.findIndex(e => e.id === id);
    if (index !== -1) {
      inMemoryUpdates[index] = saved;
    } else {
      inMemoryUpdates.unshift(saved);
    }
    window.dispatchEvent(new CustomEvent('updates-data-updated'));

    return saved;
  } catch (err) {
    console.error('Supabase Update Hatası:', err);
    throw err;
  }
}

/**
 * Deletes a Journal/Update entry directly from Supabase updates table
 */
export async function deleteJournalEntry(id) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Update Hatası:', err);
    throw err;
  }

  try {
    const { error } = await supabase
      .from('updates')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase Update Hatası:', error);
      throw error;
    }

    console.log('Supabase Update Silindi:', id);

    inMemoryUpdates = inMemoryUpdates.filter(e => e.id !== id);
    window.dispatchEvent(new CustomEvent('updates-data-updated'));
  } catch (err) {
    console.error('Supabase Update Hatası:', err);
    throw err;
  }
}

// Automatically fetch from Supabase on startup
fetchJournalEntriesFromSupabase();
