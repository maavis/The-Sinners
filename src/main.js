import { siteConfig } from './config.js';
import { initAdminPortal, handleAdminRouting } from './admin.js';
import { mountMerchStore } from './store.js';
import { fetchProductsFromSupabase } from './data/merch.js';
import { getCategorizedTourEvents } from './data/tour.js';
import { getJournalEntries } from './data/updates.js';
import { getAboutData, cleanImageUrl, fetchAboutDataFromSupabase } from './data/about.js';
import { getHeaderSocialLinks, getHeaderSocialIconHTML, getFooterSocialIconHTML, getSocialLinks, fetchSocialLinksFromSupabase } from './data/socials.js';
import { getFooterData } from './data/footer.js';
import { RELEASES, getReleases, getAllTracks, getFavoriteTrackIds, toggleFavoriteTrack, fetchMusicFromSupabase, isMusicDataLoading } from './data/music.js';
import { initMotionSystem, triggerPageTransition, observeNewElements, revealSectionContent } from './motion.js';

import './styles/main.css';
import './styles/admin.css';
import './styles/store.css';

document.addEventListener('DOMContentLoaded', () => {
  fetchProductsFromSupabase();
  fetchMusicFromSupabase();
  fetchAboutDataFromSupabase();
  fetchSocialLinksFromSupabase();
  initCinematicIntro();
  initLogo();
  initHero();
  initNavigation();
  initAboutNavigation();
  initVimeoBackgroundCover();
  initVimeoPlayListener();
  initAdminPortal();
  initMotionSystem();
  initClientRouter();
  renderHeaderSocialLinks();
  renderFooterSocialLinks();
  renderPublicFooters();
  renderPublicTourDates();
  renderPublicUpdatesPage();
  renderPublicMusicPage();
  renderPublicEditorialZineCards();
  initGlobalPlayer();
  startHeroGhostTextEngine();
  initHomeScrollEngine();
  initGalleryModalControls();
  initTourTopBarScrollHandler();
  initEditorialZineDarkroomModal();
  initScrollToTopButton();

  window.addEventListener('tour-data-updated', renderPublicTourDates);
  window.addEventListener('updates-data-updated', renderPublicUpdatesPage);
  window.addEventListener('about-data-updated', () => {
    renderPublicAboutPage();
    renderPublicEditorialZineCards();
  });
  window.addEventListener('socials-data-updated', renderFooterSocialLinks);
  window.addEventListener('music-data-updated', renderPublicMusicPage);
  window.addEventListener('footer-data-updated', renderPublicFooters);
});

function initCinematicIntro() {
  const overlay = document.getElementById('cinematic-intro-overlay');
  if (!overlay) return;

  const currentPath = window.location.pathname;
  const isHomepage = (currentPath === '/' || currentPath === '/index.html');
  
  let introSeen = false;
  try {
    introSeen = sessionStorage.getItem('parrhesia_intro_seen') === 'true';
  } catch (e) {}

  if (introSeen || !isHomepage || document.documentElement.classList.contains('skip-intro')) {
    overlay.classList.add('intro-finished');
    overlay.style.display = 'none';
    return;
  }

  let isEntering = false;

  function handleEnterClick() {
    if (isEntering) return;
    isEntering = true;

    try {
      sessionStorage.setItem('parrhesia_intro_seen', 'true');
    } catch (err) {}

    overlay.classList.add('dissolving');

    setTimeout(() => {
      overlay.classList.add('intro-finished');
      overlay.style.display = 'none';
    }, 900);
  }

  overlay.addEventListener('click', handleEnterClick);
}

export function renderPublicFooters() {
  const data = getFooterData();
  const footers = document.querySelectorAll('.site-global-footer');

  footers.forEach(footer => {
    const line1 = footer.querySelector('.footer-replica-line1');
    const line2 = footer.querySelector('.footer-replica-line2');
    const line4 = footer.querySelector('.footer-replica-line4');

    if (line1) line1.textContent = data.line1;
    if (line2) line2.textContent = data.line2;
    if (line4) line4.textContent = data.line4;
  });

  renderFooterSocialLinks();
}

/**
 * Initialize / Apply Logo configuration
 */
function initLogo() {
  const logoTarget = document.getElementById('logo-target');
  if (!logoTarget) return;

  if (siteConfig.logo.useImageLogo && siteConfig.logo.imageUrl) {
    logoTarget.innerHTML = `<img src="${siteConfig.logo.imageUrl}" alt="${siteConfig.logo.altText}" class="band-logo-img" />`;
  } else if (siteConfig.logo.textLogo) {
    logoTarget.innerHTML = `<h1 class="band-logo-text">${siteConfig.logo.textLogo}</h1>`;
  }
}

/**
 * Initialize / Apply Hero configuration
 */
function initHero() {
  const heroBgTarget = document.getElementById('hero-bg-target');
  const albumSubtitleTarget = document.getElementById('album-subtitle-target');
  const albumTitleTarget = document.getElementById('album-title-target');

  if (siteConfig.hero.heroBgUrl && heroBgTarget) {
    heroBgTarget.style.backgroundImage = `url('${siteConfig.hero.heroBgUrl}')`;
    heroBgTarget.style.backgroundSize = 'cover';
    heroBgTarget.style.backgroundPosition = 'center';
  }

  if (siteConfig.hero.albumSubtitle && albumSubtitleTarget) {
    albumSubtitleTarget.textContent = siteConfig.hero.albumSubtitle;
  }

  if (siteConfig.hero.albumTitle && albumTitleTarget) {
    albumTitleTarget.textContent = siteConfig.hero.albumTitle;
  }
}

/**
 * Helper to close mobile drawer and backdrop across all routes
 */
export function closeMobileNavigation() {
  const sidebarEl = document.getElementById('sidebar-navigation');
  const backdropEl = document.getElementById('mobile-drawer-backdrop');
  const aboutToggleBtn = document.getElementById('about-menu-toggle');
  if (sidebarEl) {
    sidebarEl.classList.remove('is-open', 'is-forced-open');
  }
  if (backdropEl) {
    backdropEl.classList.remove('is-visible');
  }
  if (aboutToggleBtn) {
    aboutToggleBtn.classList.remove('is-active');
  }
}

/**
 * Handle Mobile Drawer Toggle and Sidebar Nav interactions
 */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar-navigation');
  const backdrop = document.getElementById('mobile-drawer-backdrop');

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = sidebar.classList.toggle('is-open');
      if (backdrop) {
        if (isOpen) backdrop.classList.add('is-visible');
        else backdrop.classList.remove('is-visible');
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeMobileNavigation();
    });
  }

  // Close mobile drawer when clicking any link inside sidebar
  if (sidebar) {
    sidebar.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        closeMobileNavigation();
      }
    });
  }

  // Fallback outside click
  document.addEventListener('click', (e) => {
    if (sidebar && sidebar.classList.contains('is-open')) {
      if (!sidebar.contains(e.target) && mobileToggle && !mobileToggle.contains(e.target)) {
        closeMobileNavigation();
      }
    }
  });
}

/**
 * Handle Fullscreen Vimeo Background Cover Sizing
 * Enforces videoWidth >= viewportWidth AND videoHeight >= viewportHeight
 * using 9/16 portrait ratio so vertical video spans 100% of horizontal screen width.
 */
function initVimeoBackgroundCover() {
  const videoAspect = 16 / 9;

  function resizeSingleVimeo(iframe, container) {
    if (!iframe || !container) return;
    const viewportWidth = Math.max(window.innerWidth, container.clientWidth || 0);
    const viewportHeight = Math.max(window.innerHeight, container.clientHeight || 0);
    const viewportAspect = viewportWidth / viewportHeight;

    let finalWidth, finalHeight;
    if (viewportAspect > videoAspect) {
      finalWidth = viewportWidth;
      finalHeight = viewportWidth / videoAspect;
    } else {
      finalHeight = viewportHeight;
      finalWidth = viewportHeight * videoAspect;
    }

    if (finalWidth < viewportWidth) {
      finalWidth = viewportWidth;
      finalHeight = viewportWidth / videoAspect;
    }
    if (finalHeight < viewportHeight) {
      finalHeight = viewportHeight;
      finalWidth = viewportHeight * videoAspect;
    }

    const ceilW = Math.ceil(finalWidth * 1.02);
    const ceilH = Math.ceil(finalHeight * 1.02);

    iframe.style.width = `${ceilW}px`;
    iframe.style.height = `${ceilH}px`;
    iframe.style.minWidth = `${ceilW}px`;
    iframe.style.minHeight = `${ceilH}px`;
    iframe.style.maxWidth = 'none';
    iframe.style.maxHeight = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '50%';
    iframe.style.left = '50%';
    iframe.style.transform = 'translate(-50%, -50%)';
  }

  function resizeAll() {
    const heroIframe = document.querySelector('.vimeo-bg-iframe');
    const heroSection = document.querySelector('.hero-section') || document.body;
    resizeSingleVimeo(heroIframe, heroSection);

    const homeIframe = document.querySelector('.home-vimeo-smoke-iframe');
    const homeSection = document.getElementById('home-scroll-sections') || document.body;
    resizeSingleVimeo(homeIframe, homeSection);
  }

  window.addEventListener('resize', resizeAll, { passive: true });
  resizeAll();
}

/**
 * Handle Vimeo Initial Frame Readiness (Prevents Black Flash On Initial Video Load)
 */
function initVimeoPlayListener() {
  const homeIframe = document.querySelector('.home-vimeo-smoke-iframe');
  if (!homeIframe) return;

  let isPlayingMarked = false;
  function markPlaying() {
    if (isPlayingMarked) return;
    isPlayingMarked = true;
    homeIframe.classList.add('is-playing');
  }

  // 1. Try Vimeo Player SDK if loaded
  if (window.Vimeo && window.Vimeo.Player) {
    try {
      const player = new window.Vimeo.Player(homeIframe);
      player.on('playing', markPlaying);
      player.on('play', markPlaying);
      player.on('timeupdate', markPlaying);
    } catch (e) {
      markPlaying();
    }
  }

  // 2. Listen for postMessage events from Vimeo iframe
  window.addEventListener('message', (event) => {
    if (event.origin && event.origin.includes('vimeo')) {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && (data.event === 'playing' || data.event === 'play' || data.event === 'timeupdate' || data.event === 'ready')) {
          markPlaying();
        }
      } catch (e) {}
    }
  });

  // 3. Fast check & fallback to ensure video background is visible on hard refresh
  requestAnimationFrame(markPlaying);
  setTimeout(markPlaying, 300);
}



/**
 * Clean Client-Side SPA Router (HTML5 History API)
 * Routes: / (Home), /live, /videos, /music, /news, /merch
 * No hashes (#), no .html extensions, no full page reload!
 */
function initClientRouter() {
  const routeSectionMap = {
    '/': 'hero',
    '/tour': 'tour',
    '/live': 'tour',
    '/videos': 'updates',
    '/music': 'music',
    '/news': 'updates',
    '/updates': 'updates',
    '/about': 'about',
    '/merch': 'updates'
  };

  let isInitialBoot = true;

  function updateActiveLink(path) {
    const links = document.querySelectorAll('.brutalist-nav .nav-link');
    links.forEach(link => {
      const route = link.getAttribute('data-route') || link.getAttribute('href');
      const isNewsMatch = (path === '/news' || path === '/updates') && (route === '/news' || route === '/updates');
      const isMerchMatch = (path === '/merch' || path === '/store' || path === '/store-teaser') && (route === '/merch' || route === '/store' || route === '/store-teaser');
      if (route === path || (path === '/' && route === '/') || isNewsMatch || isMerchMatch) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function handleRoute(path) {
    if (path === '/admin' || path.startsWith('/admin/')) {
      document.documentElement.classList.add('route-admin');
      document.documentElement.classList.remove('route-tour', 'route-updates', 'route-about', 'route-music', 'route-privacy', 'route-terms');
      handleAdminRouting();
      return;
    }

    document.documentElement.classList.remove('route-admin');

    const normalizedPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
    updateActiveLink(normalizedPath);
    closeMobileNavigation();

    const heroSec = document.getElementById('hero');
    const merchSec = document.getElementById('merch');
    const videoSec = document.getElementById('video');
    const tourSec = document.getElementById('tour');
    const updatesSec = document.getElementById('updates');
    const aboutSec = document.getElementById('about');
    const musicSec = document.getElementById('music');
    const privacySec = document.getElementById('privacy');
    const termsSec = document.getElementById('terms');
    const storeTeaserSec = document.getElementById('store-teaser');
    const homeScrollSec = document.getElementById('home-scroll-sections');

    const sidebarNav = document.getElementById('sidebar-navigation');
    const aboutToggleBtn = document.getElementById('about-menu-toggle');
    if (sidebarNav) sidebarNav.classList.remove('is-forced-open');
    if (aboutToggleBtn) aboutToggleBtn.classList.remove('is-active');

    // Find currently active section before route swap
    const allSections = [heroSec, tourSec, updatesSec, aboutSec, musicSec, privacySec, termsSec, storeTeaserSec];
    const currentActiveSec = allSections.find(s => s && !s.classList.contains('hidden'));

    let targetNextSec = heroSec;
    if (normalizedPath === '/merch-preview' || normalizedPath === '/store-vault') targetNextSec = null;
    else if (normalizedPath === '/merch' || normalizedPath === '/store' || normalizedPath === '/store-teaser') targetNextSec = storeTeaserSec;
    else if (normalizedPath === '/tour') targetNextSec = tourSec;
    else if (normalizedPath === '/news' || normalizedPath === '/updates') targetNextSec = updatesSec;
    else if (normalizedPath === '/about') targetNextSec = aboutSec;
    else if (normalizedPath === '/music') targetNextSec = musicSec;
    else if (normalizedPath === '/privacy') targetNextSec = privacySec;
    else if (normalizedPath === '/terms') targetNextSec = termsSec;

    const executeRouteSwap = () => {
      // Cleanly remove all route state classes from root element
      document.documentElement.classList.remove('route-home', 'route-tour', 'route-updates', 'route-about', 'route-music', 'route-privacy', 'route-terms', 'route-merch', 'route-store-teaser');

      const storeRoot = document.getElementById('merch-store-root');
      if (storeRoot && normalizedPath !== '/merch-preview' && normalizedPath !== '/store-vault') {
        storeRoot.classList.add('hidden');
      }

      if (normalizedPath === '/merch' || normalizedPath === '/store' || normalizedPath === '/store-teaser') {
        document.documentElement.classList.add('route-store-teaser');
        stopAboutSlideshow();
        stopHeroGhostTextEngine();
        stopHomeScrollEngine();

        if (heroSec) heroSec.classList.add('hidden');
        if (homeScrollSec) homeScrollSec.classList.add('hidden');
        if (merchSec) merchSec.classList.add('hidden');
        if (videoSec) videoSec.classList.add('hidden');
        if (tourSec) tourSec.classList.add('hidden');
        if (updatesSec) updatesSec.classList.add('hidden');
        if (aboutSec) aboutSec.classList.add('hidden');
        if (musicSec) musicSec.classList.add('hidden');
        if (privacySec) privacySec.classList.add('hidden');
        if (termsSec) termsSec.classList.add('hidden');
        if (storeTeaserSec) storeTeaserSec.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (normalizedPath === '/merch-preview' || normalizedPath === '/store-vault') {
        document.documentElement.classList.add('route-merch');
        stopAboutSlideshow();
        stopHeroGhostTextEngine();
        stopHomeScrollEngine();

        if (heroSec) heroSec.classList.add('hidden');
        if (homeScrollSec) homeScrollSec.classList.add('hidden');
        if (merchSec) merchSec.classList.add('hidden');
        if (videoSec) videoSec.classList.add('hidden');
        if (tourSec) tourSec.classList.add('hidden');
        if (updatesSec) updatesSec.classList.add('hidden');
        if (aboutSec) aboutSec.classList.add('hidden');
        if (musicSec) musicSec.classList.add('hidden');
        if (privacySec) privacySec.classList.add('hidden');
        if (termsSec) termsSec.classList.add('hidden');
        if (storeTeaserSec) storeTeaserSec.classList.add('hidden');

        if (storeRoot) {
          storeRoot.classList.remove('hidden');
          mountMerchStore(storeRoot);
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (normalizedPath === '/tour') {
        document.documentElement.classList.add('route-tour');
        stopAboutSlideshow();
        stopHeroGhostTextEngine();
        stopHomeScrollEngine();

        if (heroSec) heroSec.classList.add('hidden');
        if (homeScrollSec) homeScrollSec.classList.add('hidden');
        if (merchSec) merchSec.classList.add('hidden');
        if (videoSec) videoSec.classList.add('hidden');
        if (updatesSec) updatesSec.classList.add('hidden');
        if (aboutSec) aboutSec.classList.add('hidden');
        if (musicSec) musicSec.classList.add('hidden');
        if (privacySec) privacySec.classList.add('hidden');
        if (termsSec) termsSec.classList.add('hidden');
        if (storeTeaserSec) storeTeaserSec.classList.add('hidden');
        if (tourSec) tourSec.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'instant' });
        renderPublicTourDates();
      } else if (normalizedPath === '/news' || normalizedPath === '/updates') {
        document.documentElement.classList.add('route-updates');
        stopAboutSlideshow();
        stopHeroGhostTextEngine();
        stopHomeScrollEngine();

        if (heroSec) heroSec.classList.add('hidden');
        if (homeScrollSec) homeScrollSec.classList.add('hidden');
        if (merchSec) merchSec.classList.add('hidden');
        if (videoSec) videoSec.classList.add('hidden');
        if (tourSec) tourSec.classList.add('hidden');
        if (aboutSec) aboutSec.classList.add('hidden');
        if (musicSec) musicSec.classList.add('hidden');
        if (privacySec) privacySec.classList.add('hidden');
        if (termsSec) termsSec.classList.add('hidden');
        if (storeTeaserSec) storeTeaserSec.classList.add('hidden');
        if (updatesSec) updatesSec.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'instant' });
        renderPublicUpdatesPage();
      } else if (normalizedPath === '/about') {
        document.documentElement.classList.add('route-about');

        if (heroSec) heroSec.classList.add('hidden');
        if (homeScrollSec) homeScrollSec.classList.add('hidden');
        if (merchSec) merchSec.classList.add('hidden');
        if (videoSec) videoSec.classList.add('hidden');
        if (tourSec) tourSec.classList.add('hidden');
        if (updatesSec) updatesSec.classList.add('hidden');
        if (musicSec) musicSec.classList.add('hidden');
        if (privacySec) privacySec.classList.add('hidden');
        if (termsSec) termsSec.classList.add('hidden');
        if (storeTeaserSec) storeTeaserSec.classList.add('hidden');
        if (aboutSec) aboutSec.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'instant' });
        renderPublicAboutPage();
      } else if (normalizedPath === '/music') {
        document.documentElement.classList.add('route-music');
        stopAboutSlideshow();
        stopHeroGhostTextEngine();
        stopHomeScrollEngine();

        if (heroSec) heroSec.classList.add('hidden');
        if (homeScrollSec) homeScrollSec.classList.add('hidden');
        if (merchSec) merchSec.classList.add('hidden');
        if (videoSec) videoSec.classList.add('hidden');
        if (tourSec) tourSec.classList.add('hidden');
        if (updatesSec) updatesSec.classList.add('hidden');
        if (aboutSec) aboutSec.classList.add('hidden');
        if (privacySec) privacySec.classList.add('hidden');
        if (termsSec) termsSec.classList.add('hidden');
        if (storeTeaserSec) storeTeaserSec.classList.add('hidden');
        if (musicSec) musicSec.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'instant' });
        renderPublicMusicPage();
      } else if (normalizedPath === '/privacy') {
        document.documentElement.classList.add('route-privacy');
        stopAboutSlideshow();
        stopHeroGhostTextEngine();
        stopHomeScrollEngine();

        if (heroSec) heroSec.classList.add('hidden');
        if (homeScrollSec) homeScrollSec.classList.add('hidden');
        if (merchSec) merchSec.classList.add('hidden');
        if (videoSec) videoSec.classList.add('hidden');
        if (tourSec) tourSec.classList.add('hidden');
        if (updatesSec) updatesSec.classList.add('hidden');
        if (aboutSec) aboutSec.classList.add('hidden');
        if (musicSec) musicSec.classList.add('hidden');
        if (termsSec) termsSec.classList.add('hidden');
        if (storeTeaserSec) storeTeaserSec.classList.add('hidden');
        if (privacySec) privacySec.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'instant' });
        renderPublicFooters();
      } else if (normalizedPath === '/terms') {
        document.documentElement.classList.add('route-terms');
        stopAboutSlideshow();
        stopHeroGhostTextEngine();
        stopHomeScrollEngine();

        if (heroSec) heroSec.classList.add('hidden');
        if (homeScrollSec) homeScrollSec.classList.add('hidden');
        if (merchSec) merchSec.classList.add('hidden');
        if (videoSec) videoSec.classList.add('hidden');
        if (tourSec) tourSec.classList.add('hidden');
        if (updatesSec) updatesSec.classList.add('hidden');
        if (aboutSec) aboutSec.classList.add('hidden');
        if (musicSec) musicSec.classList.add('hidden');
        if (privacySec) privacySec.classList.add('hidden');
        if (storeTeaserSec) storeTeaserSec.classList.add('hidden');
        if (termsSec) termsSec.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'instant' });
        renderPublicFooters();
      } else {
        // Main homepage view (/)
        document.documentElement.classList.add('route-home');
        stopAboutSlideshow();
        startHeroGhostTextEngine();

        if (heroSec) heroSec.classList.remove('hidden');
        if (homeScrollSec) homeScrollSec.classList.remove('hidden');
        if (merchSec) merchSec.classList.remove('hidden');
        if (videoSec) videoSec.classList.remove('hidden');
        if (tourSec) tourSec.classList.add('hidden');
        if (updatesSec) updatesSec.classList.add('hidden');
        if (aboutSec) aboutSec.classList.add('hidden');
        if (musicSec) musicSec.classList.add('hidden');
        if (privacySec) privacySec.classList.add('hidden');
        if (termsSec) termsSec.classList.add('hidden');
        if (storeTeaserSec) storeTeaserSec.classList.add('hidden');

        initHomeScrollEngine();
        if (heroSec) revealSectionContent(heroSec);

        const targetSectionId = routeSectionMap[normalizedPath] || 'hero';
        const section = document.getElementById(targetSectionId);

        if (section && normalizedPath !== '/') {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    updateActiveLink(normalizedPath);

    // Initial page boot bypasses SPA transition to prevent intermediate flash
    if (isInitialBoot) {
      isInitialBoot = false;
      executeRouteSwap();
      if (targetNextSec) {
        revealSectionContent(targetNextSec);
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('motion-pending', 'is-app-initializing');
        document.documentElement.classList.add('motion-ready');
      });
      return;
    }

    triggerPageTransition(currentActiveSec, targetNextSec, executeRouteSwap);
  }

  function navigateTo(path) {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    handleRoute(path);
  }

  // Intercept click on navigation links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-route], a[href^="/"]');
    if (link) {
      const path = link.getAttribute('data-route') || link.getAttribute('href');
      if (path && path.startsWith('/') && !path.startsWith('//')) {
        e.preventDefault();
        navigateTo(path);
      }
    }
  });

  // Handle browser back/forward history buttons
  window.addEventListener('popstate', () => {
    handleRoute(window.location.pathname);
  });

  // Initial route handling on page load
  handleRoute(window.location.pathname);
}

/**
 * Render Public Tour Dates (Upcoming & Past)
 */
let currentGalleryImages = [];
let currentGalleryIndex = 0;

function renderPublicTourDates() {
  const upcomingContainer = document.getElementById('public-upcoming-events');
  const pastContainer = document.getElementById('public-past-events');

  if (!upcomingContainer || !pastContainer) return;

  const { upcoming, past } = getCategorizedTourEvents();

  const visibleUpcoming = upcoming.filter(e => e.visible !== false);
  const visiblePast = past.filter(e => e.visible !== false);

  renderEventList(upcomingContainer, visibleUpcoming, '// ŞU ANDA DUYURULAN GELECEK ETKİNLİK BULUNMAMAKTADIR.', false);
  renderEventList(pastContainer, visiblePast, '// ARŞİVLENMİŞ GEÇMİŞ ETKİNLİK BULUNMAMAKTADIR.', true);

  setupPastEventGalleryHandlers();
  observeNewElements(document.getElementById('tour'));
}

function parseEditorialDate(dateStr) {
  if (!dateStr) return { day: '00', month: 'EKİ', year: '2026' };
  try {
    const d = new Date(dateStr + 'T00:00:00');
    const day = String(d.getDate()).padStart(2, '0');
    const monthNames = ['OCA', 'ŞUB', 'MAR', 'NİS', 'MAY', 'HAZ', 'TEM', 'AĞU', 'EYL', 'EKİ', 'KAS', 'ARA'];
    const month = monthNames[d.getMonth()] || 'EKİ';
    const year = d.getFullYear();
    return { day, month, year };
  } catch (e) {
    return { day: '24', month: 'EKİ', year: '2026' };
  }
}

function formatExactTourDate(dateStr) {
  if (!dateStr) return '14 Ağustos 2026';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    const monthNames = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    const month = monthNames[d.getMonth()] || 'Ağustos';
    const day = d.getDate();
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  } catch (e) {
    return dateStr;
  }
}

function renderEventList(container, events, emptyMsg, isPast = false) {
  if (!events || events.length === 0) {
    container.innerHTML = `<div class="empty-tour-msg">${emptyMsg}</div>`;
    return;
  }

  container.innerHTML = events.map((evt, idx) => {
    const dateFormatted = formatExactTourDate(evt.date);
    const hasImages = Array.isArray(evt.images) && evt.images.length > 0;
    const isSolidBtn = idx === 0 && !isPast; // Solid black GET TICKETS button for the first upcoming show

    if (isPast) {
      const galleryAction = hasImages 
        ? `<button type="button" class="tour-ticket-btn tour-btn-view" data-event-id="${evt.id}">VIEW GALLERY</button>`
        : `<span class="tour-ticket-btn disabled">COMPLETED</span>`;

      return `
        <div class="tour-exact-row">
          <div class="tour-row-info">
            <div class="tour-row-date">${escapeHtml(dateFormatted)}</div>
            <h3 class="tour-row-venue">${escapeHtml(evt.venue)}</h3>
            <div class="tour-row-location">${escapeHtml(evt.city)}${evt.country ? `, ${escapeHtml(evt.country)}` : ''}</div>
          </div>
          <div class="tour-row-action">
            ${galleryAction}
          </div>
        </div>
        <div class="tour-row-divider"></div>
      `;
    }

    // Upcoming show
    const isSoldOut = (evt.status || '').toUpperCase() === 'SOLD OUT' || (evt.status || '').toUpperCase() === 'TÜKENDİ';
    const btnClass = isSoldOut ? 'tour-ticket-btn disabled' : (isSolidBtn ? 'tour-ticket-btn solid' : 'tour-ticket-btn outline');
    const btnText = isSoldOut ? 'SOLD OUT' : 'GET TICKETS';

    const ticketAction = (evt.ticketUrl && !isSoldOut)
      ? `<a href="${escapeHtml(evt.ticketUrl)}" target="_blank" rel="noopener" class="${btnClass}">${btnText}</a>`
      : `<span class="${btnClass}">${btnText}</span>`;

    return `
      <div class="tour-exact-row">
        <div class="tour-row-info">
          <div class="tour-row-date">${escapeHtml(dateFormatted)}</div>
          <h3 class="tour-row-venue">${escapeHtml(evt.venue)}</h3>
          <div class="tour-row-location">${escapeHtml(evt.city)}${evt.country ? `, ${escapeHtml(evt.country)}` : ''}</div>
        </div>
        <div class="tour-row-action">
          ${ticketAction}
        </div>
      </div>
      <div class="tour-row-divider"></div>
    `;
  }).join('');
}

function formatDateString(dateStr) {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    const day = date.getDate();
    const month = date.toLocaleDateString('tr-TR', { month: 'long' }).toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } catch (e) {
    return dateStr;
  }
}

function getStatusLabel(status) {
  const upper = (status || '').toUpperCase();
  if (upper === 'SOLD OUT' || upper === 'TÜKENDİ') return 'TÜKENDİ';
  if (upper === 'WAITLIST' || upper === 'YEDEK LİSTE') return 'YEDEK LİSTE';
  if (upper === 'CANCELLED' || upper === 'İPTAL EDİLDİ') return 'İPTAL EDİLDİ';
  if (upper === 'TBA' || upper === 'YAKINDA') return 'YAKINDA';
  return 'SATIŞTA';
}

function getStatusClass(status) {
  const upper = (status || '').toUpperCase();
  if (upper === 'SOLD OUT' || upper === 'TÜKENDİ') return 'status-sold-out';
  if (upper === 'WAITLIST' || upper === 'YEDEK LİSTE') return 'status-waitlist';
  if (upper === 'CANCELLED' || upper === 'İPTAL EDİLDİ') return 'status-cancelled';
  if (upper === 'TBA' || upper === 'YAKINDA') return 'status-tba';
  return 'status-on-sale';
}

function setupPastEventGalleryHandlers() {
  const viewBtns = document.querySelectorAll('.tour-btn-view');
  viewBtns.forEach(btn => {
    btn.onclick = () => {
      const eventId = btn.getAttribute('data-event-id');
      const { past, upcoming } = getCategorizedTourEvents();
      const allEvts = [...past, ...upcoming];
      const evt = allEvts.find(e => e.id === eventId);
      if (evt) {
        openTourGalleryModal(evt);
      }
    };
  });
}

function openTourGalleryModal(evt) {
  const modal = document.getElementById('tour-gallery-modal');
  if (!modal) return;

  const titleEl = document.getElementById('gallery-event-title');
  const dateEl = document.getElementById('gallery-event-date');

  const formattedDate = formatDateString(evt.date);
  if (titleEl) titleEl.textContent = (evt.venue || '').toUpperCase();
  if (dateEl) dateEl.textContent = `${(evt.city || '').toUpperCase()}${evt.country ? ` — ${evt.country.toUpperCase()}` : ''} // ${formattedDate}`;

  // Default fallback concert photos if event has no custom images
  const defaultConcertImages = [
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=80'
  ];

  currentGalleryImages = (evt.images && evt.images.length > 0) ? evt.images : defaultConcertImages;
  currentGalleryIndex = 0;

  updateGalleryView();

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function updateGalleryView() {
  const imgEl = document.getElementById('gallery-active-img');
  const counterEl = document.getElementById('gallery-counter');
  
  if (imgEl && currentGalleryImages.length > 0) {
    imgEl.style.opacity = '0';
    imgEl.style.transform = 'scale(0.97)';
    
    setTimeout(() => {
      imgEl.src = currentGalleryImages[currentGalleryIndex];
      imgEl.onload = () => {
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1)';
      };
      // Fallback in case cached
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    }, 120);
  }
  
  if (counterEl) {
    const currentStr = String(currentGalleryIndex + 1).padStart(2, '0');
    const totalStr = String(currentGalleryImages.length).padStart(2, '0');
    counterEl.textContent = `${currentStr} / ${totalStr}`;
  }
}

function initGalleryModalControls() {
  const modal = document.getElementById('tour-gallery-modal');
  const closeBtn = document.getElementById('gallery-close-btn');
  const prevBtn = document.getElementById('gallery-prev-btn');
  const nextBtn = document.getElementById('gallery-next-btn');

  const closeModal = () => {
    if (modal) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (closeBtn) closeBtn.onclick = closeModal;
  if (modal) {
    modal.onclick = (e) => {
      if (e.target.classList.contains('gallery-modal-backdrop')) {
        closeModal();
      }
    };
  }

  if (prevBtn) {
    prevBtn.onclick = () => {
      if (currentGalleryImages.length === 0) return;
      currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
      updateGalleryView();
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      if (currentGalleryImages.length === 0) return;
      currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
      updateGalleryView();
    };
  }

  window.addEventListener('keydown', (e) => {
    if (modal && !modal.classList.contains('hidden')) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
      if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    }
  });
}

function initTourTopBarScrollHandler() {
  window.addEventListener('scroll', () => {
    const topBar = document.querySelector('.desktop-top-bar');
    if (!topBar) return;
    if (window.scrollY > 20) {
      topBar.classList.add('top-bar-hidden');
    } else {
      topBar.classList.remove('top-bar-hidden');
    }
  }, { passive: true });
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Render Public UPD//T3 Digital Journal & Creative Archive Page
 */
let activeExpandedTransmissionId = null;

function renderPublicUpdatesPage() {
  const feedContainer = document.getElementById('journal-entries-feed');
  if (!feedContainer) return;

  const entries = getJournalEntries();

  if (!entries || entries.length === 0) {
    feedContainer.innerHTML = `<div class="empty-archive-msg">HENÜZ GÜNCELLEME YOK</div>`;
    return;
  }

  let html = '';

  entries.forEach(entry => {
    const isExpanded = activeExpandedTransmissionId === entry.id;
    const catText = entry.category || 'TRANSMISSION // JOURNAL';
    const imageSrc = entry.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80';

    html += `
      <div class="transmission-card ${isExpanded ? 'is-active' : ''}" data-id="${entry.id}">
        <div class="transmission-img-wrapper">
          <img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(entry.title)}" class="transmission-cover-img" />
          <div class="transmission-overlay">
            <div class="transmission-overlay-top">
              <span class="transmission-cat-tag">${escapeHtml(catText)}</span>
              <span class="transmission-date-tag">${escapeHtml(entry.date)}</span>
            </div>
            <div class="transmission-overlay-center">
              <h3 class="transmission-overlay-title">${escapeHtml(entry.title)}</h3>
            </div>
            <div class="transmission-overlay-bottom">
              <span class="transmission-read-btn">DAHA FAZLASI İÇİN TIKLA &rarr;</span>
            </div>
          </div>
        </div>
      </div>
    `;

    if (isExpanded) {
      const tracklistHTML = entry.tracklist && entry.tracklist.length > 0 ? `
        <div class="spread-section-block">
          <span class="spread-section-label">// ÇALINAN / KAYDEDİLEN PARÇALAR</span>
          <div class="spread-track-chips">
            ${entry.tracklist.map(t => `<span class="spread-track-chip">${escapeHtml(t)}</span>`).join('')}
          </div>
        </div>
      ` : '';

      const linksHTML = entry.links && entry.links.length > 0 ? `
        <div class="spread-section-block">
          <span class="spread-section-label">// İLGİLİ BAĞLANTILAR</span>
          <div class="spread-links-row">
            ${entry.links.map(l => `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener" class="spread-ext-link">${escapeHtml(l.name)} &rarr;</a>`).join('')}
          </div>
        </div>
      ` : '';

      const paragraphs = (entry.body || '').split('\n\n').map(p => `<p>${escapeHtml(p)}</p>`).join('');

      html += `
        <div class="transmission-magazine-spread" id="spread-${entry.id}">
          <div class="spread-left-col">
            <div class="spread-meta-header">
              <span class="spread-cat">${escapeHtml(catText)}</span>
              <span class="spread-date">${escapeHtml(entry.date)}</span>
            </div>
            <h2 class="spread-title">${escapeHtml(entry.title)}</h2>
            ${entry.meta ? `<div class="spread-meta-location">${escapeHtml(entry.meta)}</div>` : ''}
            
            <div class="spread-body-text">
              ${paragraphs}
            </div>

            ${tracklistHTML}
            ${linksHTML}

            <button type="button" class="spread-close-btn" data-close-id="${entry.id}">
              <span>[ KÜÇÜLT ]</span>
            </button>
          </div>

          <div class="spread-right-col">
            <div class="spread-artwork-box">
              <img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(entry.title)}" class="spread-artwork-img" />
            </div>
          </div>
        </div>
      `;
    }
  });

  feedContainer.innerHTML = html;

  const cards = feedContainer.querySelectorAll('.transmission-card');
  cards.forEach(card => {
    card.onclick = () => {
      const id = card.getAttribute('data-id');
      if (activeExpandedTransmissionId === id) {
        activeExpandedTransmissionId = null;
      } else {
        activeExpandedTransmissionId = id;
      }
      renderPublicUpdatesPage();

      if (activeExpandedTransmissionId) {
        const spreadEl = document.getElementById(`spread-${activeExpandedTransmissionId}`);
        if (spreadEl) {
          spreadEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    };
  });

  const closeBtns = feedContainer.querySelectorAll('.spread-close-btn');
  closeBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      activeExpandedTransmissionId = null;
      renderPublicUpdatesPage();
    };
  });

  observeNewElements(feedContainer);
}

/**
 * About / WHØ Navigation & Hamburger Controls
 */
function initAboutNavigation() {
  const toggleBtn = document.getElementById('about-menu-toggle');
  const sidebarNav = document.getElementById('sidebar-navigation');

  if (toggleBtn && sidebarNav) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = sidebarNav.classList.toggle('is-forced-open');
      if (isOpen) {
        toggleBtn.classList.add('is-active');
      } else {
        toggleBtn.classList.remove('is-active');
      }
    });

    // Close forced open sidebar when clicking any link
    sidebarNav.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        sidebarNav.classList.remove('is-forced-open');
        toggleBtn.classList.remove('is-active');
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (
        document.documentElement.classList.contains('route-about') &&
        sidebarNav.classList.contains('is-forced-open') &&
        !sidebarNav.contains(e.target) &&
        !toggleBtn.contains(e.target)
      ) {
        sidebarNav.classList.remove('is-forced-open');
        toggleBtn.classList.remove('is-active');
      }
    });
  }
}

/**
 * About / WHØ Cinematic Page Engine & Slideshow
 */
let aboutSlideshowTimer = null;
let currentAboutSlideIndex = 0;

function renderPublicAboutPage() {
  const slidesWrapper = document.getElementById('about-slides-container');
  const indicatorsWrapper = document.getElementById('about-slide-indicators');
  const captionEl = document.getElementById('about-slide-caption');
  const bioContainer = document.getElementById('about-bio-text');

  if (!slidesWrapper || !bioContainer) return;

  const data = getAboutData();

  // Render Slideshow Images
  if (data.slides && data.slides.length > 0) {
    slidesWrapper.innerHTML = data.slides.map(slide => `
      <div class="about-slide-item">
        <img src="${escapeHtml(slide.url)}" alt="${escapeHtml(slide.caption || 'The Sinners Visual')}" class="about-slide-img" />
      </div>
    `).join('');

    if (indicatorsWrapper) {
      indicatorsWrapper.innerHTML = data.slides.map((_, idx) => `
        <button class="about-indicator-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Slide ${idx + 1}"></button>
      `).join('');

      indicatorsWrapper.querySelectorAll('.about-indicator-dot').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          goToAboutSlide(idx);
        });
      });
    }

    currentAboutSlideIndex = 0;
    updateSlidePosition();
    startAboutSlideshow();
  }

  // Render Biography Paragraphs
  if (data.bioParagraphs && data.bioParagraphs.length > 0) {
    bioContainer.innerHTML = data.bioParagraphs.map(para => `
      <p class="about-bio-paragraph" data-motion="text-reveal">${escapeHtml(para)}</p>
    `).join('');
  }

  observeNewElements(document.getElementById('about'));
}

function startAboutSlideshow() {
  stopAboutSlideshow(); // Ensure clean interval
  const data = getAboutData();
  if (!data.slides || data.slides.length <= 1) return;

  aboutSlideshowTimer = setInterval(() => {
    currentAboutSlideIndex = (currentAboutSlideIndex + 1) % data.slides.length;
    updateSlidePosition();
  }, 4500);
}

function stopAboutSlideshow() {
  if (aboutSlideshowTimer) {
    clearInterval(aboutSlideshowTimer);
    aboutSlideshowTimer = null;
  }
}

function goToAboutSlide(index) {
  currentAboutSlideIndex = index;
  updateSlidePosition();
  startAboutSlideshow(); // Reset auto timer
}

function updateSlidePosition() {
  const slidesWrapper = document.getElementById('about-slides-container');
  const indicatorsWrapper = document.getElementById('about-slide-indicators');

  if (slidesWrapper) {
    slidesWrapper.style.transform = `translateX(-${currentAboutSlideIndex * 100}%)`;
  }

  if (indicatorsWrapper) {
    const dots = indicatorsWrapper.querySelectorAll('.about-indicator-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentAboutSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
}

/**
 * Render Header Social Media Icon Links (Desktop & Mobile)
 * Completely isolated from footer social links.
 * Restores original 17px design, placement, drop shadows, and hover animations.
 */
export function renderHeaderSocialLinks() {
  const desktopContainer = document.getElementById('desktop-social-links');
  const mobileContainer = document.getElementById('mobile-social-links');

  const headerLinks = getHeaderSocialLinks();

  const headerHtml = headerLinks.map(item => {
    const iconContent = getHeaderSocialIconHTML(item);
    const title = escapeHtml(item.title || item.name || 'Social Link');
    const targetUrl = escapeHtml(item.target_url || item.url || '#');

    return `
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="header-social-icon-link" title="${title}" aria-label="${title}">
        ${iconContent}
      </a>
    `;
  }).join('');

  if (desktopContainer) desktopContainer.innerHTML = headerHtml;
  if (mobileContainer) mobileContainer.innerHTML = headerHtml;
}

/**
 * Render Footer Social Media Icon Links (All Public Page Footers)
 * Dynamically populated from Supabase social_links table.
 * Starts with empty state [] to eliminate any flicker/flash of old static icons.
 */
export function renderFooterSocialLinks() {
  const footerIconsRows = document.querySelectorAll('.footer-replica-icons-row');
  const footerTargets = document.querySelectorAll('.footer-social-target');

  const links = getSocialLinks();

  // If Supabase data is not yet loaded, keep footer clean (no flicker/flash)
  if (!links || links.length === 0) {
    footerIconsRows.forEach(el => { el.innerHTML = ''; });
    footerTargets.forEach(el => { el.innerHTML = ''; });
    return;
  }

  // Footer Social Media Icons Row across all page footers (22px Replica Brutalist Icons)
  const footerIconsHtml = links.map(item => {
    const iconContent = getFooterSocialIconHTML(item);
    const title = escapeHtml(item.title || item.name || 'Social Link');
    const targetUrl = escapeHtml(item.target_url || item.url || '#');

    return `
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="replica-icon-link footer-social-link" title="${title}" aria-label="${title}">
        ${iconContent}
      </a>
    `;
  }).join('');

  footerIconsRows.forEach(el => {
    el.innerHTML = footerIconsHtml;
  });

  // Footer Text Social Links (if any footer-social-target exists)
  const footerTextHtml = links.map(item => {
    const title = escapeHtml(item.title || item.name || 'Social Link').toUpperCase();
    const targetUrl = escapeHtml(item.target_url || item.url || '#');

    return `
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="footer-link" title="${title}">
        ${title} ↗
      </a>
    `;
  }).join('');

  footerTargets.forEach(el => {
    el.innerHTML = footerTextHtml;
  });
}

export function renderPublicSocialLinks() {
  renderHeaderSocialLinks();
  renderFooterSocialLinks();
}

/**
 * Organic / Paranoid Ghost Text Animation Engine for Home Page Hero Background
 */
let ghostTextTimer = null;
let ghostTextActiveTimeouts = [];

const GHOST_WORDS_POOL = [
  'The Sinners'
];

const RANDOM_QUADRANTS = [
  { topMin: 6, topMax: 22, leftMin: 5, leftMax: 35 },
  { topMin: 6, topMax: 22, leftMin: 55, leftMax: 82 },
  { topMin: 36, topMax: 52, leftMin: 4, leftMax: 32 },
  { topMin: 36, topMax: 52, leftMin: 58, leftMax: 84 },
  { topMin: 68, topMax: 85, leftMin: 6, leftMax: 38 },
  { topMin: 68, topMax: 85, leftMin: 52, leftMax: 80 }
];

let activeQuadIndices = new Set();

function startHeroGhostTextEngine() {
  stopHeroGhostTextEngine();

  const container = document.getElementById('hero-ghost-layer');
  if (!container) return;

  function spawnGhostTextCycle() {
    const isHome = !document.documentElement.classList.contains('route-tour') &&
                   !document.documentElement.classList.contains('route-updates') &&
                   !document.documentElement.classList.contains('route-about') &&
                   !document.documentElement.classList.contains('route-admin');

    if (!isHome) {
      stopHeroGhostTextEngine();
      return;
    }

    // Determine spawn count: 1, 2, or 3 words
    const rand = Math.random();
    let spawnCount = 2;
    if (rand < 0.25) spawnCount = 1;
    else if (rand < 0.75) spawnCount = 2;
    else spawnCount = 3;

    const availableQuads = RANDOM_QUADRANTS
      .map((q, idx) => ({ quad: q, idx }))
      .filter(item => !activeQuadIndices.has(item.idx));

    const pickedQuads = availableQuads.sort(() => Math.random() - 0.5).slice(0, spawnCount);

    pickedQuads.forEach(({ quad, idx }) => {
      activeQuadIndices.add(idx);

      const word = GHOST_WORDS_POOL[Math.floor(Math.random() * GHOST_WORDS_POOL.length)];
      const maxOpacity = (0.05 + Math.random() * 0.04).toFixed(3); // 0.05 to 0.09 (approx 5%-9%)
      const rotation = (-3 + Math.random() * 6).toFixed(1); // -3deg to +3deg
      const holdDur = (3.0 + Math.random() * 3.5) * 1000; // 3.0s - 6.5s

      // Generate truly random dynamic coordinates within the quadrant
      const randomTop = (quad.topMin + Math.random() * (quad.topMax - quad.topMin)).toFixed(1) + '%';
      const randomLeft = (quad.leftMin + Math.random() * (quad.leftMax - quad.leftMin)).toFixed(1) + '%';

      const el = document.createElement('div');
      el.className = 'ghost-text-item';
      el.textContent = word;

      el.style.top = randomTop;
      el.style.left = randomLeft;
      el.style.transform = `rotate(${rotation}deg)`;
      el.style.setProperty('--max-opacity', maxOpacity);

      container.appendChild(el);

      // Step 1: Pure Smooth Opacity Fade In
      const t1 = setTimeout(() => {
        el.classList.add('is-visible');
      }, 100 + Math.random() * 200);
      ghostTextActiveTimeouts.push(t1);

      // Step 2: Smooth Fade Out after hold duration
      const totalVisibleTime = 1800 + holdDur;
      const t2 = setTimeout(() => {
        el.classList.remove('is-visible');
        el.classList.add('is-fading-out');

        // Step 3: Cleanup DOM element after 1.5s fade-out completes
        const t3 = setTimeout(() => {
          if (el.parentNode) el.parentNode.removeChild(el);
          activeQuadIndices.delete(idx);
        }, 1600);

        ghostTextActiveTimeouts.push(t3);
      }, totalVisibleTime);

      ghostTextActiveTimeouts.push(t2);
    });

    // Schedule next cycle with smooth overlap
    const nextCycleDelay = 2200 + Math.random() * 2500;
    ghostTextTimer = setTimeout(spawnGhostTextCycle, nextCycleDelay);
  }

  // Start initial cycle
  const initT = setTimeout(spawnGhostTextCycle, 300);
  ghostTextActiveTimeouts.push(initT);
}

function stopHeroGhostTextEngine() {
  if (ghostTextTimer) {
    clearTimeout(ghostTextTimer);
    ghostTextTimer = null;
  }
  ghostTextActiveTimeouts.forEach(t => clearTimeout(t));
  ghostTextActiveTimeouts = [];
  activeQuadIndices.clear();

  const container = document.getElementById('hero-ghost-layer');
  if (container) container.innerHTML = '';
}

/**
 * Cinematic Scroll-Driven Parallax & Reveal Engine for Home Page
 */
let homeScrollObserver = null;
let parallaxScrollListener = null;
let isHomeParallaxTicking = false;

function initHomeScrollEngine() {
  stopHomeScrollEngine();

  const revealElements = document.querySelectorAll('.reveal-on-scroll, .music-stagger-section');
  if (!revealElements || revealElements.length === 0) return;

  // 1. Intersection Observer for Scroll Reveals & Staggered Music Entry
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  };

  homeScrollObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('music-stagger-section')) {
          entry.target.classList.add('is-stagger-active');
        } else {
          entry.target.classList.add('is-revealed');
        }
        // Run entry animation strictly once
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => homeScrollObserver.observe(el));

  const parallaxVisual = document.querySelector('.parallax-visual');
  const parallaxItems = document.querySelectorAll('.parallax-item');

  function updateParallax() {
    isHomeParallaxTicking = false;
    if (window.innerWidth <= 768) return;

    const isHome = !document.documentElement.classList.contains('route-about') &&
                   !document.documentElement.classList.contains('route-tour') &&
                   !document.documentElement.classList.contains('route-updates') &&
                   !document.documentElement.classList.contains('route-music') &&
                   !document.documentElement.classList.contains('route-admin');

    if (isHome) {
      const vh = window.innerHeight;
      if (parallaxVisual) {
        const rect = parallaxVisual.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          const speed = 0.07;
          const yPos = (rect.top - vh / 2) * speed;
          parallaxVisual.style.transform = `translate3d(0, ${yPos.toFixed(1)}px, 0) scale(1.04)`;
        }
      }

      parallaxItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          const speed = parseFloat(item.getAttribute('data-speed') || '0.04');
          const yPos = (rect.top - vh / 2) * speed;
          item.style.transform = `translate3d(0, ${yPos.toFixed(1)}px, 0)`;
        }
      });
    }
  }

  parallaxScrollListener = () => {
    if (!isHomeParallaxTicking) {
      isHomeParallaxTicking = true;
      requestAnimationFrame(updateParallax);
    }
  };

  window.addEventListener('scroll', parallaxScrollListener, { passive: true });
  // Initial run on mount
  requestAnimationFrame(updateParallax);
}

function stopHomeScrollEngine() {
  if (homeScrollObserver) {
    homeScrollObserver.disconnect();
    homeScrollObserver = null;
  }
  if (parallaxScrollListener) {
    window.removeEventListener('scroll', parallaxScrollListener);
    parallaxScrollListener = null;
  }
  isHomeParallaxTicking = false;
}

/**
 * --------------------------------------------------------------------------
 * DEDICATED MU//IC PAGE & PERSISTENT AUDIO PLAYER ENGINE
 * --------------------------------------------------------------------------
 */
let globalAudio = new Audio();
let currentTrackList = [];
let currentTrackIndex = -1;
let isAudioPlaying = false;
let activeMusicFilter = 'ALL';
let musicSearchQuery = '';

export function closeGlobalPlayer() {
  globalAudio.pause();
  globalAudio.currentTime = 0;
  isAudioPlaying = false;
  currentTrackIndex = -1;
  const playerBar = document.getElementById('global-music-player');
  if (playerBar) {
    playerBar.classList.add('hidden');
  }
  updatePlayerPlayStateUI(false);
  updateTrackListPlayingIndicators();
}

function initGlobalPlayer() {
  const playBtn = document.getElementById('player-play-btn');
  const prevBtn = document.getElementById('player-prev-btn');
  const nextBtn = document.getElementById('player-next-btn');
  const closeBtn = document.getElementById('player-close-btn');
  const favBtn = document.getElementById('player-fav-btn');
  const volumeSlider = document.getElementById('player-volume-slider');
  const progressContainer = document.getElementById('player-progress-bar-container');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeGlobalPlayer);
  }
  if (playBtn) {
    playBtn.addEventListener('click', toggleAudioPlayPause);
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', playPreviousTrack);
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', playNextTrack);
  }
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      if (currentTrackIndex >= 0 && currentTrackList[currentTrackIndex]) {
        const trk = currentTrackList[currentTrackIndex];
        const isFav = toggleFavoriteTrack(trk.id);
        updatePlayerFavState(isFav);
        renderMusicArchiveList();
      }
    });
  }
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      globalAudio.volume = parseFloat(e.target.value);
    });
  }
  if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
      if (!globalAudio.duration) return;
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      globalAudio.currentTime = percentage * globalAudio.duration;
    });
  }

  globalAudio.addEventListener('timeupdate', () => {
    if (!globalAudio.duration) return;
    const curTimeEl = document.getElementById('player-time-current');
    const durTimeEl = document.getElementById('player-time-duration');
    const fillEl = document.getElementById('player-progress-fill');

    if (curTimeEl) curTimeEl.textContent = formatSec(globalAudio.currentTime);
    if (durTimeEl && !isNaN(globalAudio.duration)) durTimeEl.textContent = formatSec(globalAudio.duration);

    if (fillEl) {
      const pct = (globalAudio.currentTime / globalAudio.duration) * 100;
      fillEl.style.width = `${pct}%`;
    }
  });

  globalAudio.addEventListener('ended', () => {
    playNextTrack();
  });

  globalAudio.addEventListener('play', () => {
    isAudioPlaying = true;
    updatePlayerPlayStateUI(true);
    updateTrackListPlayingIndicators();
  });

  globalAudio.addEventListener('pause', () => {
    isAudioPlaying = false;
    updatePlayerPlayStateUI(false);
    updateTrackListPlayingIndicators();
  });
}

function playTrack(track, queue = []) {
  if (queue.length > 0) {
    currentTrackList = queue;
    currentTrackIndex = currentTrackList.findIndex(t => t.id === track.id);
  } else if (currentTrackList.length === 0) {
    currentTrackList = getAllTracks();
    currentTrackIndex = currentTrackList.findIndex(t => t.id === track.id);
  }

  if (currentTrackIndex === -1) {
    currentTrackList = [track];
    currentTrackIndex = 0;
  }

  const playerBar = document.getElementById('global-music-player');
  if (playerBar) playerBar.classList.remove('hidden');

  const titleEl = document.getElementById('player-title');
  const artistEl = document.getElementById('player-artist');
  const imgEl = document.getElementById('player-img');

  if (titleEl) titleEl.textContent = track.title;
  if (artistEl) artistEl.textContent = `${track.artist || 'THE SINNERS'} — ${track.releaseTitle || 'SINGLE'}`;
  if (imgEl && track.coverUrl) imgEl.src = track.coverUrl;

  const favs = getFavoriteTrackIds();
  updatePlayerFavState(favs.includes(track.id));

  globalAudio.src = track.audioUrl;
  globalAudio.play().catch(err => {
    console.log('Audio playback initialized:', err);
  });

  updateTrackListPlayingIndicators();
}

function toggleAudioPlayPause() {
  if (!globalAudio.src) {
    const all = getAllTracks();
    if (all.length > 0) playTrack(all[0], all);
    return;
  }
  if (globalAudio.paused) {
    globalAudio.play();
  } else {
    globalAudio.pause();
  }
}

function playNextTrack() {
  if (currentTrackList.length === 0) return;
  currentTrackIndex = (currentTrackIndex + 1) % currentTrackList.length;
  playTrack(currentTrackList[currentTrackIndex]);
}

function playPreviousTrack() {
  if (currentTrackList.length === 0) return;
  currentTrackIndex = (currentTrackIndex - 1 + currentTrackList.length) % currentTrackList.length;
  playTrack(currentTrackList[currentTrackIndex]);
}

function updatePlayerPlayStateUI(isPlaying) {
  const playIcon = document.getElementById('player-play-icon');
  const pauseIcon = document.getElementById('player-pause-icon');
  if (isPlaying) {
    if (playIcon) playIcon.classList.add('hidden');
    if (pauseIcon) pauseIcon.classList.remove('hidden');
  } else {
    if (playIcon) playIcon.classList.remove('hidden');
    if (pauseIcon) pauseIcon.classList.add('hidden');
  }
}

function updatePlayerFavState(isFav) {
  const favBtn = document.getElementById('player-fav-btn');
  if (!favBtn) return;
  if (isFav) {
    favBtn.classList.add('active');
    favBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="#d92b2b" stroke="#d92b2b" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
  } else {
    favBtn.classList.remove('active');
    favBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
  }
}

function formatSec(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

function updateTrackListPlayingIndicators() {
  const currentTrack = currentTrackList[currentTrackIndex];
  const allTrackRows = document.querySelectorAll('.music-track-row, .music-archive-row');
  allTrackRows.forEach(row => {
    const trkId = row.getAttribute('data-track-id');
    if (currentTrack && trkId === currentTrack.id) {
      row.classList.add('is-playing');
      if (isAudioPlaying) {
        row.classList.add('is-active-playing');
      } else {
        row.classList.remove('is-active-playing');
      }
    } else {
      row.classList.remove('is-playing');
      row.classList.remove('is-active-playing');
    }
  });
}

function renderPublicMusicPage() {
  const currentReleaseTracklistEl = document.getElementById('current-release-tracklist');
  const discographyGridEl = document.getElementById('discography-grid');

  const isLoading = isMusicDataLoading();
  const allReleases = getReleases();
  const publishedReleases = allReleases.filter(r => r.status === 'PUBLISHED');

  if (isLoading) {
    if (currentReleaseTracklistEl) {
      currentReleaseTracklistEl.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2.5rem 1rem; color: rgba(255,255,255,0.4); font-family: monospace; font-size: 0.8rem; letter-spacing: 0.1em; text-align: center;">
          // YAYINLAR VE PARÇALAR YÜKLENİYOR...
        </div>
      `;
    }
    if (discographyGridEl) {
      discographyGridEl.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2rem 0; color: rgba(255,255,255,0.4); font-family: monospace; font-size: 0.8rem; letter-spacing: 0.1em; text-align: center;">
          // DİSKOGRAFİ YÜKLENİYOR...
        </div>
      `;
    }
    renderMusicArchiveList();
    setupArchiveControls();
    return;
  }
  
  // 1) Find the explicit featured release (e.g. 9MM HATE)
  // 2) If not explicitly featured, find the main ALBUM release
  // 3) Fallback to the first published release
  const mainRelease = publishedReleases.find(r => r.featured) || 
                      publishedReleases.find(r => r.type === 'ALBUM') || 
                      publishedReleases[0];

  // Update Hero Release Info UI
  if (mainRelease) {
    const heroTitleEl = document.querySelector('#music .current-release-album-title, #music .music-hero-title, #music .featured-album-title');
    const heroCoverEl = document.querySelector('#music .current-artwork-img, #music .music-hero-cover, #music .featured-album-cover');
    const heroMetaEl = document.querySelector('#music .current-release-meta-tag, #music .music-hero-meta, #music .featured-album-meta');
    const heroArtistEl = document.querySelector('#music .current-release-artist-name');
    const tracklistHeaderLabelEl = document.querySelector('#music .tracklist-header-label');

    if (heroTitleEl) heroTitleEl.textContent = mainRelease.title;
    if (heroCoverEl) {
      heroCoverEl.src = mainRelease.coverUrl;
      heroCoverEl.alt = `${mainRelease.title} Cover Artwork`;
    }
    if (heroMetaEl) heroMetaEl.textContent = `${mainRelease.year} // ${mainRelease.type} ${mainRelease.releaseDate ? '// ' + mainRelease.releaseDate : ''}`;
    if (heroArtistEl) heroArtistEl.textContent = mainRelease.artist || 'THE SINNERS';
    
    const trackCount = (mainRelease.tracks || []).length;
    if (tracklistHeaderLabelEl) {
      tracklistHeaderLabelEl.textContent = `// TRACKLIST (${trackCount} ${trackCount === 1 ? 'TRACK' : 'TRACKS'})`;
    }
  }

  // 1. Current Release Tracklist
  if (currentReleaseTracklistEl && mainRelease) {
    if ((mainRelease.tracks || []).length === 0) {
      currentReleaseTracklistEl.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2rem 0; color: rgba(255,255,255,0.4); font-family: monospace; font-size: 0.8rem; letter-spacing: 0.1em;">
          // BU YAYINDA HENÜZ PARÇA BULUNMUYOR.
        </div>
      `;
    } else {
      currentReleaseTracklistEl.innerHTML = (mainRelease.tracks || []).map((trk, idx) => {
        const isCurrent = currentTrackList[currentTrackIndex] && currentTrackList[currentTrackIndex].id === trk.id;
        const isPlaying = isCurrent && isAudioPlaying;

        return `
          <div class="music-track-row ${isCurrent ? 'is-playing' : ''} ${isPlaying ? 'is-active-playing' : ''}" data-track-id="${trk.id}">
            <div class="track-row-left">
              <span class="track-num">${(idx + 1) < 10 ? '0' + (idx + 1) : (idx + 1)}</span>
              <button type="button" class="track-play-inline-btn" aria-label="Play ${escapeHtml(trk.title)}">
                <svg class="play-svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <svg class="pause-svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
              </button>
              <span class="track-title-text">${escapeHtml(trk.title)}</span>
            </div>
            <span class="track-duration-text">${trk.duration}</span>
          </div>
        `;
      }).join('');

      const currentRows = currentReleaseTracklistEl.querySelectorAll('.music-track-row');
      currentRows.forEach(row => {
        row.onclick = () => {
          const trkId = row.getAttribute('data-track-id');
          const trk = (mainRelease.tracks || []).find(t => t.id === trkId);
          if (trk) {
            const currentTrk = currentTrackList[currentTrackIndex];
            if (currentTrk && currentTrk.id === trk.id) {
              toggleAudioPlayPause();
            } else {
              const queue = (mainRelease.tracks || []).map(t => ({ ...t, coverUrl: mainRelease.coverUrl, artist: mainRelease.artist }));
              playTrack(trk, queue);
            }
          }
        };
      });
    }
  }

  // Play Release Button Handler
  const playReleaseBtn = document.getElementById('btn-play-current-release');
  if (playReleaseBtn && mainRelease) {
    playReleaseBtn.onclick = () => {
      const queue = (mainRelease.tracks || []).map(t => ({ ...t, coverUrl: mainRelease.coverUrl, artist: mainRelease.artist }));
      if (queue.length > 0) playTrack(queue[0], queue);
    };
  }

  // 2. Music Archive List
  renderMusicArchiveList();

  // Setup Toolbar Tabs & Search Controls
  setupArchiveControls();

  // 3. Discography Grid
  if (discographyGridEl) {
    if (publishedReleases.length === 0) {
      discographyGridEl.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2rem 0; color: rgba(255,255,255,0.4); font-family: monospace; font-size: 0.8rem; letter-spacing: 0.1em; text-align: center;">
          // HENÜZ YAYINLANMIŞ ALBÜM VEYA SINGLE BULUNMUYOR.
        </div>
      `;
    } else {
      discographyGridEl.innerHTML = publishedReleases.map(rel => {
        const trackCount = (rel.tracks || []).length;
        return `
          <div class="discography-card" data-release-id="${rel.id}">
            <div class="disco-cover-wrapper">
              <img src="${rel.coverUrl}" alt="${escapeHtml(rel.title)} Cover" class="disco-cover-img" />
              <div class="disco-overlay-btn">
                <span>LISTEN NOW</span>
              </div>
            </div>
            <div class="disco-card-info">
              <div class="disco-card-meta">
                <span class="disco-year">${rel.year}</span>
                <span class="disco-type">${rel.type}</span>
              </div>
              <h3 class="disco-card-title">${escapeHtml(rel.title)}</h3>
              <span class="disco-track-count">${trackCount} ${trackCount === 1 ? 'TRACK' : 'TRACKS'}</span>
            </div>
          </div>
        `;
      }).join('');

      const discoCards = discographyGridEl.querySelectorAll('.discography-card');
      discoCards.forEach(card => {
        card.onclick = () => {
          const relId = card.getAttribute('data-release-id');
          const rel = publishedReleases.find(r => r.id === relId);
          if (rel && (rel.tracks || []).length > 0) {
            const queue = rel.tracks.map(t => ({ ...t, coverUrl: rel.coverUrl, artist: rel.artist }));
            playTrack(queue[0], queue);
          }
        };
      });
    }
  }

  observeNewElements(document.getElementById('music'));
}

let showAllArchiveTracks = false;

function renderMusicArchiveList() {
  const archiveListEl = document.getElementById('music-archive-list');
  if (!archiveListEl) return;

  if (isMusicDataLoading()) {
    archiveListEl.innerHTML = `
      <div style="padding: 2.5rem 1rem; color: rgba(255,255,255,0.4); font-family: monospace; font-size: 0.8rem; letter-spacing: 0.1em; text-align: center;">
        // PARÇA LİSTESİ YÜKLENİYOR...
      </div>
    `;
    const expandRow = document.getElementById('archive-expand-row');
    if (expandRow) expandRow.classList.add('hidden');
    return;
  }

  const allTracks = getAllTracks();
  const favs = getFavoriteTrackIds();

  let filtered = allTracks.filter(trk => {
    if (activeMusicFilter === 'SINGLES') return trk.type === 'SINGLE';
    if (activeMusicFilter === 'ALBUMS') return trk.type === 'ALBUM';
    if (activeMusicFilter === 'EPS') return trk.type === 'EP';
    return true;
  });

  if (musicSearchQuery.trim()) {
    const q = musicSearchQuery.toLowerCase().trim();
    filtered = filtered.filter(trk => trk.title.toLowerCase().includes(q) || trk.releaseTitle.toLowerCase().includes(q));
  }

  if (filtered.length === 0) {
    archiveListEl.innerHTML = `<div class="empty-archive-msg">NO TRACKS FOUND MATCHING "${escapeHtml(musicSearchQuery)}"</div>`;
    const expandRow = document.getElementById('archive-expand-row');
    if (expandRow) expandRow.classList.add('hidden');
    return;
  }

  const INITIAL_LIMIT = 5;
  const displayTracks = showAllArchiveTracks ? filtered : filtered.slice(0, INITIAL_LIMIT);

  const expandRow = document.getElementById('archive-expand-row');
  const toggleBtn = document.getElementById('btn-toggle-show-all-tracks');
  const labelEl = document.getElementById('btn-show-all-label');
  const iconEl = document.getElementById('btn-show-all-icon');

  if (expandRow && toggleBtn) {
    if (filtered.length > INITIAL_LIMIT) {
      expandRow.classList.remove('hidden');
      if (showAllArchiveTracks) {
        if (labelEl) labelEl.textContent = 'DAHA AZ GÖSTER';
        if (iconEl) iconEl.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
      } else {
        if (labelEl) labelEl.textContent = `HEPSİNİ GÖSTER (${filtered.length} ŞARKI)`;
        if (iconEl) iconEl.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
      }
      toggleBtn.onclick = () => {
        showAllArchiveTracks = !showAllArchiveTracks;
        renderMusicArchiveList();
      };
    } else {
      expandRow.classList.add('hidden');
    }
  }

  archiveListEl.innerHTML = displayTracks.map((trk, idx) => {
    const isCurrent = currentTrackList[currentTrackIndex] && currentTrackList[currentTrackIndex].id === trk.id;
    const isPlaying = isCurrent && isAudioPlaying;
    const isFav = favs.includes(trk.id);

    return `
      <div class="music-archive-row ${isCurrent ? 'is-playing' : ''} ${isPlaying ? 'is-active-playing' : ''}" data-track-id="${trk.id}">
        <div class="archive-row-left">
          <span class="archive-num">${(idx + 1) < 10 ? '0' + (idx + 1) : (idx + 1)}</span>
          <img src="${trk.coverUrl}" alt="Cover" class="archive-thumb-img" />
          <button type="button" class="archive-play-btn" aria-label="Play ${escapeHtml(trk.title)}">
            <svg class="play-svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <svg class="pause-svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          </button>
          <div class="archive-title-meta-col">
            <span class="archive-track-title">${escapeHtml(trk.title)}</span>
            <span class="archive-release-sub">${escapeHtml(trk.artist)} — ${escapeHtml(trk.releaseTitle)}</span>
          </div>
        </div>

        <div class="archive-row-right">
          <span class="archive-type-tag">${trk.type}</span>
          <span class="archive-duration">${trk.duration}</span>
          <button type="button" class="archive-fav-btn ${isFav ? 'active' : ''}" data-fav-id="${trk.id}" aria-label="Favorite">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="${isFav ? '#d92b2b' : 'none'}" stroke="${isFav ? '#d92b2b' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  const rows = archiveListEl.querySelectorAll('.music-archive-row');
  rows.forEach(row => {
    row.onclick = (e) => {
      if (e.target.closest('.archive-fav-btn')) return;
      const trkId = row.getAttribute('data-track-id');
      const trk = filtered.find(t => t.id === trkId);
      if (trk) {
        const currentTrk = currentTrackList[currentTrackIndex];
        if (currentTrk && currentTrk.id === trk.id) {
          toggleAudioPlayPause();
        } else {
          playTrack(trk, filtered);
        }
      }
    };
  });

  const favBtns = archiveListEl.querySelectorAll('.archive-fav-btn');
  favBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const trkId = btn.getAttribute('data-fav-id');
      toggleFavoriteTrack(trkId);
      renderMusicArchiveList();
      const currentTrk = currentTrackList[currentTrackIndex];
      if (currentTrk && currentTrk.id === trkId) {
        const isFav = getFavoriteTrackIds().includes(trkId);
        updatePlayerFavState(isFav);
      }
    };
  });
}

function setupArchiveControls() {
  const tabs = document.querySelectorAll('.music-tab-btn');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeMusicFilter = tab.getAttribute('data-filter') || 'ALL';
      showAllArchiveTracks = false;
      renderMusicArchiveList();
    };
  });

  const searchInput = document.getElementById('music-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      musicSearchQuery = e.target.value;
      showAllArchiveTracks = false;
      renderMusicArchiveList();
    };
  }
}

/**
 * Render Public Editorial Zine Cards (Home Page Visual Archive)
 * Dynamically populated from Supabase about_slides table
 */
export function renderPublicEditorialZineCards() {
  const container = document.getElementById('editorial-zine-grid') || document.querySelector('.editorial-zine-grid');
  if (!container) return;

  const { slides } = getAboutData();
  if (!slides || slides.length === 0) return;

  const cardLayoutConfigs = [
    {
      itemClass: 'item-rehearsal',
      tapeClass: 'zine-tape-top-left',
      redStamp: '',
      perfCount: 5,
      techStamp: '[ KODAK TRI-X • EXP 18 ]',
      film: '35MM KODAK TRI-X 400',
      loc: '52.5200° N, 13.4050° E — STÜDYO B',
      date: '03:42 AM // SIKIYÖNETİM SEANSI',
      metaLocation: 'BERLİN STÜDYO 03:42 AM',
      badge: 'ARCHIVE #01'
    },
    {
      itemClass: 'item-live',
      tapeClass: 'zine-tape-top-right',
      redStamp: '<div class="zine-red-stamp">DEVIL\'S GRIN // CONFIDENTIAL</div>',
      perfCount: 5,
      techStamp: '[ ILFORD HP5 • 1/60s ]',
      film: 'ILFORD HP5 PLUS 400',
      loc: 'CANLI PERFORMANS // DEVIL\'S GRIN',
      date: '22:15 PM // HEADLINE ŞOV',
      metaLocation: 'CANLI ŞOV // 180G VINYL ERA',
      badge: 'ARCHIVE #02'
    },
    {
      itemClass: 'item-darkroom',
      tapeClass: 'zine-tape-center',
      redStamp: '',
      perfCount: 8,
      techStamp: '[ MADE OF SIN • MASTER PROOF ]',
      film: 'TYPE II CHROME / SILVER GELATIN',
      loc: 'UNDERGROUND ANALOG LAB',
      date: 'FW26 // COVER SESSIONS',
      metaLocation: 'EDİTORYAL KOLEKSİYON ARŞİVİ',
      badge: 'ARCHIVE #03'
    }
  ];

  container.innerHTML = slides.map((slide, idx) => {
    const config = cardLayoutConfigs[idx] || {
      itemClass: `item-archive-${idx + 1}`,
      tapeClass: idx % 2 === 0 ? 'zine-tape-top-left' : 'zine-tape-top-right',
      redStamp: '',
      perfCount: 5,
      techStamp: `[ ARCHIVE • #${String(idx + 1).padStart(2, '0')} ]`,
      film: '35MM SILVER EMULSION',
      loc: 'EDITORIAL ARCHIVE',
      date: 'ARCHIVE TRANSMISSION',
      metaLocation: 'THE SINNERS VAULT',
      badge: `ARCHIVE #${String(idx + 1).padStart(2, '0')}`
    };

    const imgUrl = cleanImageUrl(slide.image_url || slide.url || '');
    const title = slide.title || slide.caption || `0${idx + 1} // TRANSMISSION`;
    const desc = slide.description || '';
    const perfs = Array(config.perfCount).fill('<span>■</span>').join('');

    return `
      <article class="zine-item ${config.itemClass}" 
               data-zine-idx="${idx + 1}" 
               data-title="${escapeHtml(title)}" 
               data-film="${escapeHtml(config.film)}" 
               data-loc="${escapeHtml(config.loc)}" 
               data-date="${escapeHtml(config.date)}" 
               data-desc="${escapeHtml(desc)}" 
               data-img="${escapeHtml(imgUrl)}">
        <div class="zine-tape ${config.tapeClass}"></div>
        ${config.redStamp}
        <div class="zine-film-strip">
          <div class="film-perf-row">${perfs}</div>
          <div class="zine-img-wrapper">
            <div class="zine-light-leak"></div>
            <img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(title)}" class="zine-img" loading="lazy" decoding="async" />
          </div>
          <div class="film-perf-row">${perfs}</div>
        </div>
        <div class="zine-card-footer">
          <div class="zine-tech-stamp">${escapeHtml(config.techStamp)}</div>
          <h3 class="zine-card-title">${escapeHtml(title)}</h3>
          <div class="zine-meta-row">
            <span>${escapeHtml(config.metaLocation)}</span>
            <span class="zine-badge-accent">${escapeHtml(config.badge)}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Editorial Zine Darkroom Lightbox Controller
 */
function initEditorialZineDarkroomModal() {
  let modalBackdrop = document.getElementById('darkroom-lightbox-backdrop');
  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'darkroom-lightbox-backdrop';
    modalBackdrop.className = 'darkroom-modal-backdrop';
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(modalBackdrop);
  }

  const openDarkroom = (item) => {
    const title = item.getAttribute('data-title') || '';
    const film = item.getAttribute('data-film') || '';
    const loc = item.getAttribute('data-loc') || '';
    const date = item.getAttribute('data-date') || '';
    const desc = item.getAttribute('data-desc') || '';
    const img = item.getAttribute('data-img') || '';

    modalBackdrop.innerHTML = `
      <div class="darkroom-modal-card">
        <button type="button" class="darkroom-modal-close" id="darkroom-close-btn" aria-label="Kapat">&times;</button>
        
        <div class="darkroom-modal-img-col">
          <img src="${escapeHtml(img)}" alt="${escapeHtml(title)}" class="darkroom-modal-img" />
        </div>

        <div class="darkroom-modal-info-col">
          <div>
            <div style="font-family: monospace; font-size: 0.7rem; color: #d92b2b; letter-spacing: 0.2em; margin-bottom: 0.75rem; text-transform: uppercase;">
              // THE SINNERS • GÖRSEL ARŞİV
            </div>
            <h2 style="font-family: 'Bodoni Moda', 'Playfair Display', serif; font-size: 1.5rem; color: #fff; margin: 0 0 1rem 0; line-height: 1.2;">
              ${escapeHtml(title)}
            </h2>
            <p style="font-size: 0.85rem; color: #aaa; line-height: 1.7; margin-bottom: 1.5rem;">
              ${escapeHtml(desc)}
            </p>

            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.25rem; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.78rem; font-family: monospace;">
              <div style="display: flex; justify-content: space-between; color: #777;">
                <span>FİLM NEGATİFİ:</span>
                <span style="color: #fff;">${escapeHtml(film)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; color: #777;">
                <span>KONUM & MEKAN:</span>
                <span style="color: #fff;">${escapeHtml(loc)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; color: #777;">
                <span>ZAMAN DAMGASI:</span>
                <span style="color: #fff;">${escapeHtml(date)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; color: #777;">
                <span>BASKI TÜRÜ:</span>
                <span style="color: #d92b2b;">GÜMÜŞ JELATİN / ANALOG</span>
              </div>
            </div>
          </div>

          <div style="margin-top: 2rem;">
            <button type="button" class="admin-btn admin-btn-secondary" id="btn-close-darkroom-action" style="width: 100%; border-color: rgba(255,255,255,0.2); text-align: center;">
              KAPAT & ARŞİVE DÖN
            </button>
          </div>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = modalBackdrop.querySelector('#darkroom-close-btn');
    const closeAction = modalBackdrop.querySelector('#btn-close-darkroom-action');
    const closeIt = () => {
      modalBackdrop.classList.remove('is-open');
      modalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.onclick = closeIt;
    if (closeAction) closeAction.onclick = closeIt;
  };

  // Delegated click listener on zine items
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.zine-item');
    if (item && item.closest('#home-archive')) {
      e.preventDefault();
      openDarkroom(item);
    }
  });

  modalBackdrop.onclick = (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('is-open');
      modalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
      modalBackdrop.classList.remove('is-open');
      modalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Scroll to Top Floating Button Controller
 */
function initScrollToTopButton() {
  const btn = document.getElementById('scroll-to-top-btn');
  if (!btn) return;

  const handleScroll = () => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || document.body.scrollTop || 0;
    const isMerchOrAdmin = window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/merch');
    const isScrolled = scrollPos > 100;

    if (isScrolled && !isMerchOrAdmin) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
  document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
  document.body.addEventListener('scroll', handleScroll, { passive: true, capture: true });
  window.addEventListener('popstate', handleScroll);
  window.addEventListener('resize', handleScroll);

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    document.body.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  handleScroll();
}
