/**
 * TOXIC MÜZİK VE DİSKOGRAFİ VERİ SERVİSİ
 * Yalnızca Canlı Supabase `releases` ve `tracks` Tablolarından Yüklenir.
 */

import { supabase } from '../lib/supabase.js';

let inMemoryReleases = [];
let isMusicLoading = true;

export const RELEASES = inMemoryReleases;

export function isMusicDataLoading() {
  return isMusicLoading;
}

/**
 * Supabase `releases` ve `tracks` tablolarından canlı verileri çeker
 */
export async function fetchMusicFromSupabase() {
  if (!supabase) {
    isMusicLoading = false;
    return inMemoryReleases;
  }

  isMusicLoading = true;

  try {
    const { data: releasesData, error: relError } = await supabase
      .from('releases')
      .select('*')
      .order('created_at', { ascending: false });

    if (relError) {
      console.warn('Supabase releases tablosu okunamadı:', relError.message);
      isMusicLoading = false;
      return inMemoryReleases;
    }

    const { data: tracksData, error: trkError } = await supabase
      .from('tracks')
      .select('*')
      .order('track_order', { ascending: true });

    if (trkError) {
      console.warn('Supabase tracks tablosu okunamadı:', trkError.message);
    }

    if (releasesData) {
      inMemoryReleases = releasesData.map(r => {
        const matchingTracks = (tracksData || [])
          .filter(t => t.release_id === r.id || t.releaseId === r.id)
          .map(t => ({
            id: t.id,
            title: t.title,
            duration: t.duration,
            durationSec: t.duration_sec || 210,
            audioUrl: t.audio_url,
            releaseId: r.id,
            releaseTitle: r.title,
            type: r.type,
            trackOrder: t.track_order || 1
          }));

        const rawArtist = (r.artist || 'TOXIC').trim();
        const artist = rawArtist.toUpperCase().includes('SINNERS') ? 'TOXIC' : rawArtist;
        const description = (r.description || '').replace(/The Sinners/gi, 'Toxic');

        return {
          id: r.id,
          title: r.title,
          artist: artist,
          year: r.year || '',
          releaseDate: r.release_date || '',
          type: r.type || 'SINGLE',
          coverUrl: r.cover_url || '',
          description: description,
          status: r.status || 'PUBLISHED',
          featured: !!r.featured,
          spotifyUrl: r.spotify_url || '',
          appleUrl: r.apple_url || '',
          youtubeUrl: r.youtube_url || '',
          bandcampUrl: r.bandcamp_url || '',
          tracks: matchingTracks
        };
      });
    }
  } catch (err) {
    console.error('Supabase Müzik Veri Çekme Hatası:', err);
  } finally {
    isMusicLoading = false;
    window.dispatchEvent(new CustomEvent('music-data-updated'));
  }

  return inMemoryReleases;
}

// Uygulama başlangıcında Supabase'den çek
fetchMusicFromSupabase();

export function getReleases() {
  return inMemoryReleases;
}

/**
 * Doğrudan Supabase `tracks` tablosundan şarkıyı siler
 */
export async function deleteTrack(trackId) {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('tracks')
        .delete()
        .eq('id', trackId);

      if (error) {
        console.error('Supabase track silme hatası:', error);
      } else {
        console.log('Supabase Şarkı Başarıyla Silindi:', trackId);
      }
    } catch (err) {
      console.error('Supabase track delete exception:', err);
    }
  }

  // Yerel hafızadaki state'den de hemen çıkar
  inMemoryReleases.forEach(rel => {
    if (rel.tracks) {
      rel.tracks = rel.tracks.filter(t => t.id !== trackId);
    }
  });

  window.dispatchEvent(new CustomEvent('music-data-updated'));
}

/**
 * Doğrudan Supabase `releases` ve bağlı `tracks` kayıtlarını siler
 */
export async function deleteRelease(id) {
  if (supabase) {
    try {
      // Önce tracks tablosundaki şarkıları sil
      await supabase.from('tracks').delete().eq('release_id', id);
      
      // Ardından releases tablosundan albümü sil
      const { error } = await supabase
        .from('releases')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase release silme hatası:', error);
      } else {
        console.log('Supabase Yayın Başarıyla Silindi:', id);
      }
    } catch (err) {
      console.error('Supabase release delete exception:', err);
    }
  }

  inMemoryReleases = inMemoryReleases.filter(r => r.id !== id);
  window.dispatchEvent(new CustomEvent('music-data-updated'));
}

/**
 * Yeni Albüm / Single ve şarkılarını Supabase'e ekler
 */
export async function addRelease(releaseData) {
  const newId = releaseData.id || ('rel_' + Date.now());

  const newRelease = {
    id: newId,
    title: releaseData.title || 'UNTITLED RELEASE',
    artist: releaseData.artist || 'TOXIC',
    year: releaseData.year || new Date().getFullYear().toString(),
    releaseDate: releaseData.releaseDate || new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase(),
    type: releaseData.type || 'SINGLE',
    coverUrl: releaseData.coverUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    description: releaseData.description || '',
    status: releaseData.status || 'PUBLISHED',
    featured: releaseData.featured || false,
    spotifyUrl: releaseData.spotifyUrl || '',
    appleUrl: releaseData.appleUrl || '',
    youtubeUrl: releaseData.youtubeUrl || '',
    bandcampUrl: releaseData.bandcampUrl || '',
    tracks: (releaseData.tracks || []).map((t, idx) => ({
      id: t.id || ('trk_' + (Date.now() + idx)),
      title: t.title || 'Yeni Şarkı',
      duration: t.duration || '03:30',
      durationSec: t.durationSec || 210,
      audioUrl: t.audioUrl || '',
      releaseId: newId,
      releaseTitle: releaseData.title || 'UNTITLED RELEASE',
      type: releaseData.type || 'SINGLE',
      trackOrder: idx + 1
    }))
  };

  if (supabase) {
    try {
      if (newRelease.featured) {
        await supabase.from('releases').update({ featured: false }).neq('id', newId);
      }

      const { error: relError } = await supabase.from('releases').insert([{
        id: newRelease.id,
        title: newRelease.title,
        artist: newRelease.artist,
        year: newRelease.year,
        release_date: newRelease.releaseDate,
        type: newRelease.type,
        cover_url: newRelease.coverUrl,
        description: newRelease.description,
        status: newRelease.status,
        featured: newRelease.featured
      }]);

      if (relError) console.error('Supabase addRelease error:', relError);

      if (newRelease.tracks.length > 0) {
        const tracksToInsert = newRelease.tracks.map((t, idx) => ({
          id: t.id,
          release_id: newId,
          title: t.title,
          duration: t.duration,
          duration_sec: t.durationSec || 210,
          audio_url: t.audioUrl,
          track_order: idx + 1
        }));

        const { error: trkError } = await supabase.from('tracks').insert(tracksToInsert);
        if (trkError) console.error('Supabase addTracks error:', trkError);
      }
    } catch (err) {
      console.error('Supabase addRelease exception:', err);
    }
  }

  if (newRelease.featured) {
    inMemoryReleases.forEach(r => r.featured = false);
  }

  inMemoryReleases.unshift(newRelease);
  window.dispatchEvent(new CustomEvent('music-data-updated'));
  return newRelease;
}

/**
 * Varolan Albüm ve şarkılarını Supabase üzerinde günceller / silinen şarkıları siler
 */
export async function updateRelease(id, updatedData, deletedTrackIds = []) {
  const index = inMemoryReleases.findIndex(r => r.id === id);
  if (index === -1) return null;

  // Silinmesi istenen şarkıları doğrudan Supabase tracks tablosundan sil
  if (deletedTrackIds && deletedTrackIds.length > 0) {
    for (const trackId of deletedTrackIds) {
      await deleteTrack(trackId);
    }
  }

  if (supabase) {
    try {
      if (updatedData.featured) {
        await supabase.from('releases').update({ featured: false }).neq('id', id);
      }

      const releasePayload = {};
      if (updatedData.title !== undefined) releasePayload.title = updatedData.title;
      if (updatedData.artist !== undefined) releasePayload.artist = updatedData.artist;
      if (updatedData.year !== undefined) releasePayload.year = updatedData.year;
      if (updatedData.releaseDate !== undefined) releasePayload.release_date = updatedData.releaseDate;
      if (updatedData.type !== undefined) releasePayload.type = updatedData.type;
      if (updatedData.coverUrl !== undefined) releasePayload.cover_url = updatedData.coverUrl;
      if (updatedData.description !== undefined) releasePayload.description = updatedData.description;
      if (updatedData.status !== undefined) releasePayload.status = updatedData.status;
      if (updatedData.featured !== undefined) releasePayload.featured = updatedData.featured;

      if (Object.keys(releasePayload).length > 0) {
        const { error: relError } = await supabase
          .from('releases')
          .update(releasePayload)
          .eq('id', id);
        if (relError) console.error('Supabase updateRelease error:', relError);
      }

      // Güncellenen veya yeni eklenen şarkıları kaydet
      if (updatedData.tracks) {
        for (let i = 0; i < updatedData.tracks.length; i++) {
          const t = updatedData.tracks[i];
          const trackPayload = {
            id: t.id || ('trk_' + Date.now() + '_' + i),
            release_id: id,
            title: t.title,
            duration: t.duration || '03:30',
            duration_sec: t.durationSec || 210,
            audio_url: t.audioUrl || '',
            track_order: i + 1
          };

          const { error: trkUpsertErr } = await supabase
            .from('tracks')
            .upsert(trackPayload, { onConflict: 'id' });

          if (trkUpsertErr) {
            console.error('Supabase track upsert error:', trkUpsertErr);
          }
        }
      }
    } catch (err) {
      console.error('Supabase updateRelease exception:', err);
    }
  }

  if (updatedData.featured) {
    inMemoryReleases.forEach(r => r.featured = false);
  }

  inMemoryReleases[index] = { ...inMemoryReleases[index], ...updatedData };
  window.dispatchEvent(new CustomEvent('music-data-updated'));
  return inMemoryReleases[index];
}

// Helper to flatten all published tracks across releases for the Music Archive
export function getAllTracks() {
  const tracks = [];
  inMemoryReleases.forEach(rel => {
    if (rel.status === 'DRAFT') return;
    const rawRelArtist = (rel.artist || 'TOXIC').trim();
    const relArtist = rawRelArtist.toUpperCase().includes('SINNERS') ? 'TOXIC' : rawRelArtist;
    (rel.tracks || []).forEach(trk => {
      const rawTrkArtist = (trk.artist || relArtist).trim();
      const trkArtist = rawTrkArtist.toUpperCase().includes('SINNERS') ? 'TOXIC' : rawTrkArtist;
      tracks.push({
        ...trk,
        coverUrl: rel.coverUrl,
        artist: trkArtist,
        releaseTitle: rel.title,
        year: rel.year,
        type: rel.type
      });
    });
  });
  return tracks;
}

// LocalStorage Favorites Helper
const FAV_KEY = 'parrhesia_fav_tracks';

export function getFavoriteTrackIds() {
  try {
    const stored = localStorage.getItem(FAV_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

export function toggleFavoriteTrack(trackId) {
  const favs = getFavoriteTrackIds();
  const index = favs.indexOf(trackId);
  if (index !== -1) {
    favs.splice(index, 1);
  } else {
    favs.push(trackId);
  }
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  window.dispatchEvent(new CustomEvent('favorites-updated'));
  return favs.includes(trackId);
}
