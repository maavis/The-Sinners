/**
 * TOXIC / PARRHESIA - HOME PANO (EDITORIAL ZINE POLAROID COLLAGE) DATA SERVICE
 * Fully powered by Supabase PostgreSQL home_pano table (with graceful fallback & caching).
 */
import { supabase } from '../lib/supabase.js';

/**
 * Utility to clean / normalize image URLs
 */
export function cleanPanoImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  let cleaned = url.trim();

  if (cleaned.includes('images.unsplash.com')) {
    try {
      const unsplashUrl = new URL(cleaned);
      unsplashUrl.searchParams.set('w', '800');
      unsplashUrl.searchParams.set('q', '80');
      unsplashUrl.searchParams.set('auto', 'format');
      unsplashUrl.searchParams.set('fit', 'crop');
      return unsplashUrl.toString();
    } catch (e) {
      if (!cleaned.includes('w=800')) {
        const separator = cleaned.includes('?') ? '&' : '?';
        cleaned = `${cleaned.split('?')[0]}?auto=format&fit=crop&w=800&q=80`;
      }
    }
  }

  const imgurMatch = cleaned.match(/^(?:https?:\/\/)?(?:i\.)?imgur\.com\/(?:a\/|gallery\/)?([a-zA-Z0-9]+)(\.[a-zA-Z]{3,4})?(\?.*)?$/i);
  if (imgurMatch) {
    const id = imgurMatch[1];
    const ext = imgurMatch[2] || '.jpg';
    return `https://i.imgur.com/${id}${ext}`;
  }

  return cleaned;
}

// Fixed 3-card layout configuration for Home Pano Collage
export const DEFAULT_HOME_PANO_ITEMS = [
  {
    id: 'pano_1',
    slot_index: 1,
    display_order: 1,
    location_text: 'BERLİN STÜDYO 03:42 AM',
    badge_text: 'LIMITED ARCHIVE // VOL.01',
    image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    item_class: 'item-rehearsal',
    tape_class: 'zine-tape-top-left',
    red_stamp: '',
    perf_count: 5
  },
  {
    id: 'pano_2',
    slot_index: 2,
    display_order: 2,
    location_text: 'CANLI ŞOV // 180G VINYL ERA',
    badge_text: "DEVIL'S GRIN // CONFIDENTIAL",
    image_url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    item_class: 'item-live',
    tape_class: 'zine-tape-top-right',
    red_stamp: "DEVIL'S GRIN // CONFIDENTIAL",
    perf_count: 5
  },
  {
    id: 'pano_3',
    slot_index: 3,
    display_order: 3,
    location_text: 'EDİTORYAL KOLEKSİYON ARŞİVİ',
    badge_text: 'DARKROOM // RAW PRINT',
    image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    item_class: 'item-darkroom',
    tape_class: 'zine-tape-center',
    red_stamp: '',
    perf_count: 8
  }
];

const STORAGE_KEY = 'home_pano_items';

function getInitialPanoItems() {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return mergeWithDefaultPano(parsed);
      }
    }
  } catch (e) {
    console.warn('home_pano cache read error:', e);
  }
  return [...DEFAULT_HOME_PANO_ITEMS];
}

function mergeWithDefaultPano(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return [...DEFAULT_HOME_PANO_ITEMS];
  }

  return items.map((item, idx) => {
    const slotIdx = Number(item.slot_index || item.display_order || (idx + 1));
    const def = DEFAULT_HOME_PANO_ITEMS.find(d => String(d.id) === String(item.id) || d.slot_index === slotIdx) 
      || DEFAULT_HOME_PANO_ITEMS[idx % DEFAULT_HOME_PANO_ITEMS.length];
    
    const locText = item.location_text !== undefined ? item.location_text : (item.meta_location || def.location_text);
    const badgeText = item.badge_text !== undefined ? item.badge_text : (def.badge_text || '');
    return {
      ...def,
      ...item,
      id: item.id || def.id || `pano_${idx + 1}`,
      slot_index: slotIdx,
      display_order: slotIdx,
      image_url: cleanPanoImageUrl(item.image_url || item.url || def.image_url),
      location_text: locText,
      badge_text: badgeText
    };
  });
}

let inMemoryPanoItems = getInitialPanoItems();

/**
 * Returns current in-memory home pano items
 */
export function getHomePanoItems() {
  return inMemoryPanoItems;
}

/**
 * Fetches home pano items from Supabase home_pano table
 */
export async function fetchHomePanoFromSupabase() {
  if (!supabase) {
    console.warn('Supabase not initialized for home_pano.');
    return inMemoryPanoItems;
  }

  try {
    const { data, error } = await supabase
      .from('home_pano')
      .select('*')
      .order('slot_index', { ascending: true });

    if (error) {
      console.warn('Supabase home_pano fetch note (table may be pending or empty):', error.message);
      return inMemoryPanoItems;
    }

    if (Array.isArray(data)) {
      if (data.length > 0) {
        inMemoryPanoItems = mergeWithDefaultPano(data);
      } else {
        inMemoryPanoItems = [...DEFAULT_HOME_PANO_ITEMS];
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryPanoItems));
      } catch (e) {}
      window.dispatchEvent(new CustomEvent('home-pano-updated'));
    }

    return inMemoryPanoItems;
  } catch (err) {
    console.warn('Supabase home_pano fetch error:', err);
    return inMemoryPanoItems;
  }
}

/**
 * Deletes a single pano card from Supabase home_pano table and local state
 */
export async function deleteHomePanoItem(id) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Home Pano Silme Hatası:', err);
    throw err;
  }

  try {
    const { error } = await supabase
      .from('home_pano')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase Home Pano Silme Hatası:', error);
      throw error;
    }

    console.log('Supabase Home Pano Silindi:', id);

    inMemoryPanoItems = inMemoryPanoItems.filter(item => String(item.id) !== String(id));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryPanoItems));
    } catch (e) {}
    window.dispatchEvent(new CustomEvent('home-pano-updated'));
    return inMemoryPanoItems;
  } catch (err) {
    console.error('Supabase Home Pano Silme Hatası:', err);
    throw err;
  }
}

/**
 * Inserts a new pano card with default values into Supabase home_pano table
 */
export async function addHomePanoItem(customData = {}) {
  const newId = customData.id || `pano_${Date.now()}`;
  const nextOrder = inMemoryPanoItems.length + 1;
  const rawUrl = customData.image_url || customData.url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80';
  const cleanedUrl = cleanPanoImageUrl(rawUrl);
  const locText = customData.location_text || customData.meta_location || 'YENİ KONUM // MEKAN';
  const badgeText = customData.badge_text || customData.red_stamp || "DEVIL'S GRIN // CONFIDENTIAL";
  const slotIdx = Number(customData.slot_index || customData.display_order || nextOrder);

  const newCard = {
    id: newId,
    image_url: cleanedUrl,
    meta_location: locText,
    location_text: locText,
    badge_text: badgeText,
    slot_index: slotIdx,
    display_order: slotIdx,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // Immediate local in-memory state update
  inMemoryPanoItems.push({
    ...newCard,
    item_class: slotIdx % 3 === 1 ? 'item-rehearsal' : slotIdx % 3 === 2 ? 'item-live' : 'item-darkroom',
    tape_class: slotIdx % 3 === 1 ? 'zine-tape-top-left' : slotIdx % 3 === 2 ? 'zine-tape-top-right' : 'zine-tape-center',
    perf_count: slotIdx % 3 === 0 ? 8 : 5
  });

  inMemoryPanoItems.sort((a, b) => (a.slot_index || 1) - (b.slot_index || 1));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryPanoItems));
  } catch (e) {}
  window.dispatchEvent(new CustomEvent('home-pano-updated'));

  if (!supabase) return newCard;

  try {
    const { data, error } = await supabase
      .from('home_pano')
      .insert([newCard])
      .select();

    if (error) {
      console.error('Supabase home_pano insert error:', error);
      throw error;
    }

    console.log('Supabase home_pano inserted:', data);
    return newCard;
  } catch (err) {
    console.error('Supabase home_pano insert failed:', err);
    throw err;
  }
}

/**
 * Upserts a single pano card into Supabase home_pano table
 */
export async function upsertHomePanoItem(itemData) {
  const slotIdx = Number(itemData.slot_index || itemData.display_order || 1);
  const id = itemData.id || `pano_${slotIdx}`;
  const cleanedUrl = cleanPanoImageUrl(itemData.image_url || itemData.url || '');
  const locText = itemData.location_text !== undefined ? itemData.location_text : (itemData.meta_location || '');
  const badgeText = itemData.badge_text !== undefined ? itemData.badge_text : (itemData.red_stamp || '');

  const payload = {
    id,
    slot_index: slotIdx,
    display_order: slotIdx,
    location_text: locText,
    meta_location: locText,
    badge_text: badgeText,
    image_url: cleanedUrl,
    updated_at: new Date().toISOString()
  };

  // Update local in-memory state immediately
  const existingIdx = inMemoryPanoItems.findIndex(p => p.id === id || p.slot_index === slotIdx);
  if (existingIdx !== -1) {
    inMemoryPanoItems[existingIdx] = {
      ...inMemoryPanoItems[existingIdx],
      ...payload
    };
  } else {
    const defaultTemplate = DEFAULT_HOME_PANO_ITEMS[(slotIdx - 1) % DEFAULT_HOME_PANO_ITEMS.length] || {};
    inMemoryPanoItems.push({
      ...defaultTemplate,
      ...payload
    });
  }

  inMemoryPanoItems.sort((a, b) => (a.slot_index || 1) - (b.slot_index || 1));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryPanoItems));
  } catch (e) {}
  window.dispatchEvent(new CustomEvent('home-pano-updated'));

  if (!supabase) return inMemoryPanoItems[existingIdx !== -1 ? existingIdx : 0];

  try {
    const { data, error } = await supabase
      .from('home_pano')
      .upsert(payload, { onConflict: 'id' })
      .select();

    if (error) {
      console.error('Supabase home_pano upsert error:', error);
      throw error;
    }

    console.log('Supabase home_pano saved:', data);
    return inMemoryPanoItems;
  } catch (err) {
    console.error('Supabase home_pano upsert failed:', err);
    throw err;
  }
}

/**
 * Saves all 3 pano cards at once to Supabase home_pano table
 */
export async function saveAllHomePanoItems(items) {
  const payloads = items.map((item, idx) => {
    const slotIdx = idx + 1;
    const id = item.id || `pano_${slotIdx}`;
    const cleanedUrl = cleanPanoImageUrl(item.image_url || item.url || '');
    const locText = item.location_text !== undefined ? item.location_text : (item.meta_location || '');
    const badgeText = item.badge_text !== undefined ? item.badge_text : (item.red_stamp || '');
    return {
      id,
      slot_index: slotIdx,
      display_order: slotIdx,
      location_text: locText,
      meta_location: locText,
      badge_text: badgeText,
      image_url: cleanedUrl,
      updated_at: new Date().toISOString()
    };
  });

  inMemoryPanoItems = mergeWithDefaultPano(payloads);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryPanoItems));
  } catch (e) {}
  window.dispatchEvent(new CustomEvent('home-pano-updated'));

  if (!supabase) return inMemoryPanoItems;

  try {
    const { data, error } = await supabase
      .from('home_pano')
      .upsert(payloads, { onConflict: 'id' })
      .select();

    if (error) {
      console.error('Supabase home_pano batch upsert error:', error);
      throw error;
    }

    console.log('Supabase home_pano all saved:', data);
    return inMemoryPanoItems;
  } catch (err) {
    console.error('Supabase home_pano batch failed:', err);
    throw err;
  }
}

// Initial fetch from Supabase
fetchHomePanoFromSupabase();
