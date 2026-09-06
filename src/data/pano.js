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
    image_url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    item_class: 'item-live',
    tape_class: 'zine-tape-top-right',
    red_stamp: '<div class="zine-red-stamp">DEVIL\'S GRIN // CONFIDENTIAL</div>',
    perf_count: 5
  },
  {
    id: 'pano_3',
    slot_index: 3,
    display_order: 3,
    location_text: 'EDİTORYAL KOLEKSİYON ARŞİVİ',
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
  return DEFAULT_HOME_PANO_ITEMS.map((def, idx) => {
    const found = items.find(it => String(it.id) === String(def.id) || Number(it.slot_index || it.display_order) === (idx + 1)) || items[idx];
    if (found) {
      const locText = found.location_text !== undefined ? found.location_text : (found.meta_location || def.location_text);
      return {
        ...def,
        ...found,
        id: def.id,
        slot_index: def.slot_index,
        display_order: def.display_order,
        image_url: cleanPanoImageUrl(found.image_url || found.url || def.image_url),
        location_text: locText
      };
    }
    return { ...def };
  });
}

let inMemoryPanoItems = getInitialPanoItems();

/**
 * Returns current in-memory home pano items (guaranteed 3 items)
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

    if (Array.isArray(data) && data.length > 0) {
      inMemoryPanoItems = mergeWithDefaultPano(data);
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
 * Upserts a single pano card into Supabase home_pano table
 */
export async function upsertHomePanoItem(itemData) {
  const slotIdx = Number(itemData.slot_index || itemData.display_order || 1);
  const id = itemData.id || `pano_${slotIdx}`;
  const cleanedUrl = cleanPanoImageUrl(itemData.image_url || itemData.url || '');
  const locText = itemData.location_text !== undefined ? itemData.location_text : (itemData.meta_location || '');

  const payload = {
    id,
    slot_index: slotIdx,
    display_order: slotIdx,
    location_text: locText,
    meta_location: locText,
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
    inMemoryPanoItems.push({
      ...DEFAULT_HOME_PANO_ITEMS[slotIdx - 1],
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
    return {
      id,
      slot_index: slotIdx,
      display_order: slotIdx,
      location_text: locText,
      meta_location: locText,
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
