/**
 * PARRHESIA ABOUT / WHØ DATA SERVICE
 * Manages cinematic slideshow images and editorial biography.
 */

const STORAGE_KEY = 'parrhesia_about_data';

const DEFAULT_ABOUT_DATA = {
  slides: [
    {
      id: 'slide_1',
      url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1920&q=80',
      caption: 'STUDIO TRANSMISSIONS'
    },
    {
      id: 'slide_2',
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80',
      caption: 'NIGHT REHEARSALS'
    },
    {
      id: 'slide_3',
      url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80',
      caption: 'LIVE ATMOSPHERE'
    },
    {
      id: 'slide_4',
      url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1920&q=80',
      caption: 'DARKNESS & NOISE'
    }
  ],
  bioParagraphs: [
    "The Sinners is an alternative / gothic rock entity existing at the intersection of raw sonic aggression, atmospheric textures, and uncompromising artistic expression.",
    "Formed in shadow, the band merges heavy distorted baritone instrumentation with hypnotic editorial visual aesthetics. Every record, performance, and visual transmission is created as a complete atmospheric experience.",
    "Truth spoken clearly without compromise. No news, just noise."
  ]
};

export function getAboutData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ABOUT_DATA));
    return DEFAULT_ABOUT_DATA;
  }
  try {
    const parsed = JSON.parse(stored);
    if (parsed.bioParagraphs && parsed.bioParagraphs.some(p => p.includes('Parrhesia'))) {
      parsed.bioParagraphs = parsed.bioParagraphs.map(p => p.replace(/Parrhesia/g, 'The Sinners'));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    return DEFAULT_ABOUT_DATA;
  }
}

export function saveAboutData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('about-data-updated'));
}

export function addSlide(url) {
  const data = getAboutData();
  const newSlide = {
    id: 'slide_' + Date.now(),
    url: url
  };
  data.slides.push(newSlide);
  saveAboutData(data);
  return newSlide;
}

export function updateSlide(id, url) {
  const data = getAboutData();
  const index = data.slides.findIndex(s => s.id === id);
  if (index !== -1) {
    data.slides[index].url = url;
    saveAboutData(data);
    return data.slides[index];
  }
  return null;
}

export function deleteSlide(id) {
  const data = getAboutData();
  data.slides = data.slides.filter(s => s.id !== id);
  saveAboutData(data);
}

export function updateBioParagraphs(paragraphs) {
  const data = getAboutData();
  data.bioParagraphs = paragraphs;
  saveAboutData(data);
}
