/**
 * THE SINNERS / PARRHESIA - ABOUT & SLIDESHOW DATA SERVICE
 * Fully powered by Supabase PostgreSQL about_slides & site_settings tables.
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

// Default 3 dynamic editorial archive cards/slides
export const DEFAULT_ABOUT_SLIDES = [
  {
    id: 'slide_1',
    title: '01 // REHEARSAL & NOISE',
    description: 'Ham gitar geribildirimi ve analog mikser distorsiyon ayarları sırasında kaydedilen 35mm kontakt baskı.',
    image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    caption: '01 // REHEARSAL & NOISE',
    display_order: 1,
    slide_order: 1
  },
  {
    id: 'slide_2',
    title: '02 // STAGE CATHARSIS',
    description: "Yoğun sis, kırmızı spot ışıkları ve 1/60s deklanşör hızıyla yakalanan ham sahne enerjisi.",
    image_url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    caption: '02 // STAGE CATHARSIS',
    display_order: 2,
    slide_order: 2
  },
  {
    id: 'slide_3',
    title: '03 // DARKROOM TEXTURE',
    description: 'Made of Sin albüm kapağı ve editoryal koleksiyon için karanlık odada elle basılan ilk prova negatifi.',
    image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    caption: '03 // DARKROOM TEXTURE',
    display_order: 3,
    slide_order: 3
  }
];

// In-memory cache for instant UI rendering
let inMemorySlides = [...DEFAULT_ABOUT_SLIDES];
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
 * Fetches latest about slides & biography paragraphs from Supabase
 */
export async function fetchAboutDataFromSupabase() {
  if (!supabase) {
    console.error('Supabase About Hatası: Supabase client is not initialized.');
    return getAboutData();
  }

  try {
    // 1. Fetch Slides directly with display_order
    let slidesData = null;
    const { data: orderData, error: orderError } = await supabase
      .from('about_slides')
      .select('*')
      .order('display_order', { ascending: true });

    if (orderError) {
      console.warn('Supabase display_order fetch attempt:', orderError);
      // Fallback query if table was using slide_order
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('about_slides')
        .select('*')
        .order('slide_order', { ascending: true });

      if (!fallbackError && Array.isArray(fallbackData) && fallbackData.length > 0) {
        slidesData = fallbackData;
      }
    } else if (Array.isArray(orderData) && orderData.length > 0) {
      slidesData = orderData;
    }

    if (Array.isArray(slidesData) && slidesData.length > 0) {
      inMemorySlides = slidesData.map((row, idx) => ({
        id: String(row.id || `slide_${idx + 1}`),
        title: row.title || row.caption || DEFAULT_ABOUT_SLIDES[idx]?.title || `0${idx + 1} // SLIDE`,
        description: row.description || DEFAULT_ABOUT_SLIDES[idx]?.description || '',
        image_url: cleanImageUrl(row.image_url || row.url || DEFAULT_ABOUT_SLIDES[idx]?.image_url || ''),
        url: cleanImageUrl(row.image_url || row.url || DEFAULT_ABOUT_SLIDES[idx]?.image_url || ''),
        caption: row.caption || row.title || DEFAULT_ABOUT_SLIDES[idx]?.title || '',
        display_order: Number(row.display_order ?? row.slide_order ?? (idx + 1)),
        slide_order: Number(row.display_order ?? row.slide_order ?? (idx + 1)),
        slideOrder: Number(row.display_order ?? row.slide_order ?? (idx + 1)),
        createdAt: row.created_at || new Date().toISOString()
      }));
    }

    // 2. Fetch Biography Paragraphs from site_settings
    const { data: settingsData, error: settingsError } = await supabase
      .from('site_settings')
      .select('bio_paragraphs')
      .limit(1)
      .maybeSingle();

    if (settingsError) {
      console.error('Supabase About Bio Hatası:', settingsError);
    } else if (settingsData && Array.isArray(settingsData.bio_paragraphs) && settingsData.bio_paragraphs.length > 0) {
      inMemoryBioParagraphs = settingsData.bio_paragraphs;
    }

    window.dispatchEvent(new CustomEvent('about-data-updated'));
    return getAboutData();
  } catch (err) {
    console.error('Supabase About Hatası (Network):', err);
    return getAboutData();
  }
}

/**
 * Upserts a single slide directly in Supabase about_slides table
 */
export async function upsertAboutSlide({ id, title, description, image_url, display_order }) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Slide Hatası:', err);
    throw err;
  }

  const cleanedUrl = cleanImageUrl(image_url);
  const slideId = id || ('slide_' + Date.now());
  const orderNum = Number(display_order || 1);

  const payload = {
    id: slideId,
    title: title || '',
    description: description || '',
    image_url: cleanedUrl,
    url: cleanedUrl,
    caption: title || '',
    display_order: orderNum,
    slide_order: orderNum,
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('about_slides')
      .upsert(payload, { onConflict: 'id' })
      .select();

    if (error) {
      console.error('Supabase Slide Upsert Hatası:', error);
      throw error;
    }

    console.log('Supabase Slide Upsert Edildi:', data);

    const saved = {
      id: slideId,
      title: title || '',
      description: description || '',
      image_url: cleanedUrl,
      url: cleanedUrl,
      caption: title || '',
      display_order: orderNum,
      slide_order: orderNum,
      slideOrder: orderNum,
      createdAt: new Date().toISOString()
    };

    const existingIdx = inMemorySlides.findIndex(s => s.id === slideId);
    if (existingIdx !== -1) {
      inMemorySlides[existingIdx] = saved;
    } else {
      inMemorySlides.push(saved);
    }

    inMemorySlides.sort((a, b) => (a.display_order || 1) - (b.display_order || 1));
    window.dispatchEvent(new CustomEvent('about-data-updated'));
    return saved;
  } catch (err) {
    console.error('Supabase Slide Upsert Hatası:', err);
    throw err;
  }
}

/**
 * Batch saves/upserts multiple slides into Supabase about_slides table
 */
export async function saveAboutSlidesBatch(slides) {
  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Slide Batch Hatası:', err);
    throw err;
  }

  const payloads = slides.map((slide, idx) => {
    const cleanedUrl = cleanImageUrl(slide.image_url || slide.url);
    const slideId = slide.id || (`slide_${idx + 1}`);
    const orderNum = Number(slide.display_order ?? slide.slide_order ?? (idx + 1));
    return {
      id: slideId,
      title: slide.title || '',
      description: slide.description || '',
      image_url: cleanedUrl,
      url: cleanedUrl,
      caption: slide.title || '',
      display_order: orderNum,
      slide_order: orderNum,
      created_at: new Date().toISOString()
    };
  });

  try {
    const { data, error } = await supabase
      .from('about_slides')
      .upsert(payloads, { onConflict: 'id' })
      .select();

    if (error) {
      console.error('Supabase Slide Batch Hatası:', error);
      throw error;
    }

    console.log('Supabase Slides Batch Upsert Edildi:', data);

    inMemorySlides = payloads.map(p => ({
      ...p,
      slideOrder: p.display_order,
      createdAt: p.created_at
    }));

    inMemorySlides.sort((a, b) => (a.display_order || 1) - (b.display_order || 1));
    window.dispatchEvent(new CustomEvent('about-data-updated'));
    return inMemorySlides;
  } catch (err) {
    console.error('Supabase Slide Batch Hatası:', err);
    throw err;
  }
}

/**
 * Inserts a new slide directly into Supabase about_slides table
 */
export async function addSlide({ url, caption, title, description, image_url, display_order }) {
  const finalTitle = title || caption || '';
  const finalUrl = image_url || url || '';
  const finalOrder = display_order || (inMemorySlides.length + 1);

  return upsertAboutSlide({
    id: 'slide_' + Date.now(),
    title: finalTitle,
    description: description || '',
    image_url: finalUrl,
    display_order: finalOrder
  });
}

/**
 * Updates an existing slide directly in Supabase about_slides table
 */
export async function updateSlide(id, { url, caption, title, description, image_url, display_order }) {
  const finalTitle = title || caption || '';
  const finalUrl = image_url || url || '';
  const existing = inMemorySlides.find(s => s.id === id);
  const finalOrder = display_order || (existing ? existing.display_order : 1);

  return upsertAboutSlide({
    id,
    title: finalTitle,
    description: description || (existing ? existing.description : ''),
    image_url: finalUrl,
    display_order: finalOrder
  });
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
 * Updates and saves editorial biography paragraphs directly to Supabase site_settings table
 */
export async function updateBioParagraphs(paragraphs) {
  const cleanParagraphs = Array.isArray(paragraphs) ? paragraphs.filter(Boolean) : [];

  inMemoryBioParagraphs = cleanParagraphs;
  window.dispatchEvent(new CustomEvent('about-data-updated'));

  if (!supabase) {
    const err = new Error('Supabase client is not initialized.');
    console.error('Supabase Bio Hatası:', err);
    throw err;
  }

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({
        id: 'default',
        bio_paragraphs: cleanParagraphs,
        updated_at: new Date().toISOString()
      })
      .select('bio_paragraphs')
      .single();

    if (error) {
      console.error('Supabase Bio Hatası:', error);
      throw error;
    }

    console.log('Supabase Bio Kaydedildi:', data);

    if (data && Array.isArray(data.bio_paragraphs)) {
      inMemoryBioParagraphs = data.bio_paragraphs;
      window.dispatchEvent(new CustomEvent('about-data-updated'));
    }

    return inMemoryBioParagraphs;
  } catch (err) {
    console.error('Supabase Bio Hatası:', err);
    throw err;
  }
}

// Initial fetch from Supabase on startup
fetchAboutDataFromSupabase();

