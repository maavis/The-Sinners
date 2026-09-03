/**
 * THE SINNERS / PARRHESIA - ABOUT & SLIDESHOW DATA SERVICE
 * Fully powered by Supabase PostgreSQL about_slides table (LocalStorage removed).
 */
import { supabase } from '../lib/supabase.js';

/**
 * Utility to parse and normalize image links (especially Imgur page links)
 * Converts https://imgur.com/xyz or https://imgur.com/gallery/xyz to https://i.imgur.com/xyz.jpg
 */
export function cleanImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  let cleaned = url.trim();

  // Handle Imgur page and gallery URLs
  const imgurMatch = cleaned.match(/^(?:https?:\/\/)?(?:i\.)?imgur\.com\/(?:a\/|gallery\/)?([a-zA-Z0-9]+)(\.[a-zA-Z]{3,4})?(\?.*)?$/i);
  if (imgurMatch) {
    const id = imgurMatch[1];
    const ext = imgurMatch[2] || '.jpg';
    return `https://i.imgur.com/${id}${ext}`;
  }

  return cleaned;
}

// In-memory cache for fast UI rendering
let inMemorySlides = [];
let inMemoryBioParagraphs = [
  "The Sinners is an alternative / gothic rock entity existing at the intersection of raw sonic aggression, atmospheric textures, and uncompromising artistic expression.",
  "Formed in shadow, the band merges heavy distorted baritone instrumentation with hypnotic editorial visual aesthetics. Every record, performance, and visual transmission is created as a complete atmospheric experience.",
  "Truth spoken clearly without compromise. No news, just noise."
];

/**
 * Returns current in-memory about data
 */
export function getAboutData() {
  return {
    slides: inMemorySlides,
    bioParagraphs: inMemoryBioParagraphs
  };
}

/**
 * Fetches latest about slides from Supabase PostgreSQL about_slides table
 */
export async function fetchAboutSlidesFromSupabase() {
  if (!supabase) {
    console.error('Supabase Slide Hatası: Supabase client is not initialized.');
    return getAboutData();
  }

  try {
    const { data, error } = await supabase
      .from('about_slides')
      .select('*')
      .order('slide_order', { ascending: true });

    if (error) {
      console.error('Supabase Slide Hatası:', error);
      return getAboutData();
    }

    if (Array.isArray(data)) {
      inMemorySlides = data.map(row => ({
        id: String(row.id),
        url: cleanImageUrl(row.url),
        caption: row.caption || '',
        slideOrder: row.slide_order || 1,
        createdAt: row.created_at || new Date().toISOString()
      }));

      window.dispatchEvent(new CustomEvent('about-data-updated'));
    }

    return getAboutData();
  } catch (err) {
    console.error('Supabase Slide Hatası (Network):', err);
    return getAboutData();
  }
}

/**
 * Inserts a new slide directly into Supabase about_slides table
 */
export async function addSlide({ url, caption }) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Slide Hatası:', err);
    throw err;
  }

  const directUrl = cleanImageUrl(url);
  const newSlide = {
    id: 'slide_' + Date.now(),
    url: directUrl,
    caption: caption || '',
    slide_order: inMemorySlides.length + 1,
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('about_slides')
      .insert([newSlide])
      .select()
      .single();

    if (error) {
      console.error('Supabase Slide Hatası:', error);
      throw error;
    }

    console.log('Supabase Slide Kaydedildi:', data);

    const saved = {
      id: String(data.id),
      url: cleanImageUrl(data.url),
      caption: data.caption || '',
      slideOrder: data.slide_order || 1,
      createdAt: data.created_at
    };

    inMemorySlides.push(saved);
    window.dispatchEvent(new CustomEvent('about-data-updated'));
    return saved;
  } catch (err) {
    console.error('Supabase Slide Hatası:', err);
    throw err;
  }
}

/**
 * Updates an existing slide directly in Supabase about_slides table
 */
export async function updateSlide(id, { url, caption }) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Slide Hatası:', err);
    throw err;
  }

  const directUrl = cleanImageUrl(url);
  const payload = {
    url: directUrl,
    caption: caption || ''
  };

  try {
    const { data, error } = await supabase
      .from('about_slides')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase Slide Hatası:', error);
      throw error;
    }

    console.log('Supabase Slide Güncellendi:', data);

    const saved = {
      id: String(data.id),
      url: cleanImageUrl(data.url),
      caption: data.caption || '',
      slideOrder: data.slide_order || 1,
      createdAt: data.created_at
    };

    const index = inMemorySlides.findIndex(s => s.id === id);
    if (index !== -1) inMemorySlides[index] = saved;
    window.dispatchEvent(new CustomEvent('about-data-updated'));
    return saved;
  } catch (err) {
    console.error('Supabase Slide Hatası:', err);
    throw err;
  }
}

/**
 * Deletes a slide directly from Supabase about_slides table
 */
export async function deleteSlide(id) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Slide Hatası:', err);
    throw err;
  }

  try {
    const { error } = await supabase
      .from('about_slides')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase Slide Hatası:', error);
      throw error;
    }

    console.log('Supabase Slide Silindi:', id);

    inMemorySlides = inMemorySlides.filter(s => s.id !== id);
    window.dispatchEvent(new CustomEvent('about-data-updated'));
  } catch (err) {
    console.error('Supabase Slide Hatası:', err);
    throw err;
  }
}

/**
 * Updates in-memory editorial biography paragraphs
 */
export function updateBioParagraphs(paragraphs) {
  inMemoryBioParagraphs = paragraphs;
  window.dispatchEvent(new CustomEvent('about-data-updated'));
}

// Initial fetch from Supabase on startup
fetchAboutSlidesFromSupabase();
