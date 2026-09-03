/**
 * PARRHESIA BACKSTAGE ADMIN CMS PORTAL MODULE
 * Full production-ready content management system for Tour, Music, Updates, Media Library, and Settings.
 */

import {
  getCategorizedTourEvents,
  getTourEvents,
  addTourEvent,
  updateTourEvent,
  deleteTourEvent,
  toggleTourEventVisibility,
  fetchTourEventsFromSupabase
} from './data/tour.js';

import {
  getReleases,
  addRelease,
  updateRelease,
  deleteRelease,
  getAllTracks
} from './data/music.js';

import {
  getJournalEntries,
  addJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  fetchJournalEntriesFromSupabase
} from './data/updates.js';

import {
  getAboutData,
  addSlide,
  updateSlide,
  deleteSlide,
  updateBioParagraphs
} from './data/about.js';

import {
  getSocialLinks,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
  getSocialIconHTML
} from './data/socials.js';

import {
  getMediaItems,
  addMediaItem,
  getMediaUsage,
  deleteMediaItem
} from './data/media.js';

import {
  getActivities,
  logActivity
} from './data/activity.js';

import {
  getSettings,
  saveSettings
} from './data/settings.js';

import {
  getFooterData,
  updateFooterData
} from './data/footer.js';

const AUTH_CONFIG = {
  sessionKey: 'parrhesia_admin_auth',
  verifyPassword: (password) => password === 'mavisim'
};

export function showAdminToast(message, type = 'success') {
  let toastContainer = document.getElementById('admin-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'admin-toast-container';
    toastContainer.className = 'admin-toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `admin-toast ${type === 'danger' ? 'toast-danger' : 'toast-success'}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'danger' ? '✕' : '✓'}</span>
    <span class="toast-message">${escapeHtml(message)}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

export function initAdminPortal() {
  handleAdminRouting();

  window.addEventListener('popstate', () => {
    handleAdminRouting();
  });
}

export function handleAdminRouting() {
  const path = window.location.pathname;
  const isAdminRoute = path === '/admin' || path.startsWith('/admin/');

  const mainSiteContainer = document.querySelector('.site-container');
  const mobileHeader = document.querySelector('.mobile-header');
  const adminRoot = document.getElementById('admin-portal-root');

  if (!adminRoot) return;

  if (isAdminRoute) {
    if (mainSiteContainer) mainSiteContainer.classList.add('hidden');
    if (mobileHeader) mobileHeader.classList.add('hidden');

    adminRoot.classList.remove('hidden');

    if (!isAuthenticated()) {
      renderAdminLogin(adminRoot);
      return;
    }

    if (path === '/admin/tour') {
      renderAdminTour(adminRoot);
    } else if (path === '/admin/music' || path.startsWith('/admin/music/')) {
      renderAdminMusic(adminRoot);
    } else if (path === '/admin/updates' || path === '/admin/news') {
      renderAdminUpdates(adminRoot);
    } else if (path === '/admin/media') {
      renderAdminMedia(adminRoot);
    } else if (path === '/admin/about') {
      renderAdminAbout(adminRoot);
    } else if (path === '/admin/socials' || path === '/admin/social') {
      renderAdminSocials(adminRoot);
    } else if (path === '/admin/footer') {
      renderAdminFooter(adminRoot);
    } else if (path === '/admin/settings') {
      renderAdminSettings(adminRoot);
    } else {
      renderAdminDashboard(adminRoot);
    }
  } else {
    if (mainSiteContainer) mainSiteContainer.classList.remove('hidden');
    if (mobileHeader) mobileHeader.classList.remove('hidden');

    adminRoot.classList.add('hidden');
    adminRoot.innerHTML = '';
  }
}

function isAuthenticated() {
  return sessionStorage.getItem(AUTH_CONFIG.sessionKey) === 'true';
}

function setAuthenticated(status) {
  if (status) {
    sessionStorage.setItem(AUTH_CONFIG.sessionKey, 'true');
  } else {
    sessionStorage.removeItem(AUTH_CONFIG.sessionKey);
  }
}

function navigateAdmin(path) {
  if (window.location.pathname !== path) {
    window.history.pushState(null, '', path);
  }
  handleAdminRouting();
}

/**
 * Render Admin Login Screen
 */
function renderAdminLogin(container) {
  container.innerHTML = `
    <div class="admin-login-wrapper">
      <div class="admin-login-card">
        <div class="admin-login-title">THE SINNERS CMS</div>
        <div class="admin-login-sub">ADMINISTRATION PORTAL</div>
        <form id="admin-login-form">
          <div class="admin-form-group">
            <label class="admin-label" for="admin-password-input">Security Password</label>
            <input 
              type="password" 
              id="admin-password-input" 
              class="admin-input" 
              placeholder="Enter password..." 
              autocomplete="current-password" 
              autofocus 
              required 
            />
          </div>
          <button type="submit" class="admin-btn admin-btn-primary" style="width: 100%;">LOGIN TO CMS</button>
          <div id="admin-error" class="admin-error-msg"></div>
        </form>
      </div>
    </div>
  `;

  const form = container.querySelector('#admin-login-form');
  const passwordInput = container.querySelector('#admin-password-input');
  const errorMsg = container.querySelector('#admin-error');

  if (form && passwordInput) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = passwordInput.value;

      if (AUTH_CONFIG.verifyPassword(val)) {
        setAuthenticated(true);
        logActivity('LOGIN', 'Administrator logged into CMS');
        if (errorMsg) errorMsg.textContent = '';
        handleAdminRouting();
      } else {
        if (errorMsg) errorMsg.textContent = 'Invalid password.';
        passwordInput.value = '';
        passwordInput.focus();
      }
    });
  }
}

/**
 * Common Admin Sidebar Helper
 */
function getAdminSidebarHTML(activeRoute) {
  return `
    <aside id="admin-sidebar" class="admin-sidebar">
      <div>
        <div class="admin-sidebar-brand">
          <div class="admin-brand-title">THE SINNERS CMS</div>
          <div class="admin-brand-sub">Central Content Management</div>
        </div>

        <div class="admin-nav-group">
          <div class="admin-nav-heading">DASHBOARD</div>
          <ul class="admin-nav-list">
            <li class="admin-nav-item">
              <a href="/admin/dashboard" class="admin-link ${activeRoute === '/admin' || activeRoute === '/admin/dashboard' ? 'active' : ''}">Dashboard</a>
            </li>
          </ul>
        </div>

        <div class="admin-nav-group">
          <div class="admin-nav-heading">CONTENT</div>
          <ul class="admin-nav-list">
            <li class="admin-nav-item">
              <a href="/admin/tour" class="admin-link ${activeRoute === '/admin/tour' ? 'active' : ''}">Tour</a>
            </li>
            <li class="admin-nav-item">
              <a href="/admin/music" class="admin-link ${activeRoute === '/admin/music' ? 'active' : ''}">Music</a>
            </li>
            <li class="admin-nav-item">
              <a href="/admin/updates" class="admin-link ${activeRoute === '/admin/updates' ? 'active' : ''}">UPD//T3</a>
            </li>
            <li class="admin-nav-item">
              <a href="/admin/about" class="admin-link ${activeRoute === '/admin/about' ? 'active' : ''}">About</a>
            </li>
          </ul>
        </div>

        <div class="admin-nav-group">
          <div class="admin-nav-heading">MEDIA</div>
          <ul class="admin-nav-list">
            <li class="admin-nav-item">
              <a href="/admin/media" class="admin-link ${activeRoute === '/admin/media' ? 'active' : ''}">Media Library</a>
            </li>
          </ul>
        </div>

        <div class="admin-nav-group">
          <div class="admin-nav-heading">SYSTEM</div>
          <ul class="admin-nav-list">
            <li class="admin-nav-item">
              <a href="/admin/footer" class="admin-link ${activeRoute === '/admin/footer' ? 'active' : ''}">Footer</a>
            </li>
            <li class="admin-nav-item">
              <a href="/admin/socials" class="admin-link ${activeRoute === '/admin/socials' ? 'active' : ''}">Social Links</a>
            </li>
            <li class="admin-nav-item">
              <a href="/admin/settings" class="admin-link ${activeRoute === '/admin/settings' ? 'active' : ''}">Settings</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="sidebar-footer">
        <button id="admin-logout-btn" class="admin-logout-link">Log Out</button>
      </div>
    </aside>
  `;
}

function bindAdminNavEvents(container) {
  const adminLinks = container.querySelectorAll('.admin-link');
  adminLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPath = link.getAttribute('href');
      navigateAdmin(targetPath);
    });
  });

  const mobileToggleBtn = container.querySelector('#admin-mobile-toggle-btn');
  const sidebar = container.querySelector('#admin-sidebar');
  if (mobileToggleBtn && sidebar) {
    mobileToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('is-open');
    });
  }

  const logoutBtn = container.querySelector('#admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      setAuthenticated(false);
      logActivity('LOGOUT', 'Administrator logged out');
      handleAdminRouting();
    });
  }
}

/**
 * Render Admin CMS Dashboard Screen
 */
function renderAdminDashboard(container) {
  const tours = getTourEvents();
  const upcomingTours = tours.filter(t => t.visible && (t.status === 'SATIŞTA' || t.status === 'UPCOMING'));
  const releases = getReleases();
  const totalTracks = getAllTracks();
  const transmissions = getJournalEntries();
  const mediaItems = getMediaItems();
  const activities = getActivities().slice(0, 8);

  container.innerHTML = `
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${getAdminSidebarHTML('/admin')}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">Dashboard Overview</h1>
            <p class="admin-page-desc">Central Content & System Activity Summary</p>
          </div>
        </div>

        <div class="admin-stats-grid">
          <div class="admin-stat-card">
            <div class="admin-stat-label">TOUR EVENTS</div>
            <div class="admin-stat-val">${tours.length}</div>
            <div class="admin-stat-sub">${upcomingTours.length} upcoming shows</div>
          </div>

          <div class="admin-stat-card">
            <div class="admin-stat-label">DISCOGRAPHY</div>
            <div class="admin-stat-val">${releases.length}</div>
            <div class="admin-stat-sub">${totalTracks.length} tracks published</div>
          </div>

          <div class="admin-stat-card">
            <div class="admin-stat-label">TRANSMISSIONS</div>
            <div class="admin-stat-val">${transmissions.length}</div>
            <div class="admin-stat-sub">UPD//T3 journal records</div>
          </div>

          <div class="admin-stat-card">
            <div class="admin-stat-label">MEDIA ASSETS</div>
            <div class="admin-stat-val">${mediaItems.length}</div>
            <div class="admin-stat-sub">Uploaded image files</div>
          </div>
        </div>

        <div class="admin-content-section" style="margin-top: 2.5rem;">
          <h2 class="admin-section-subtitle">RECENT ACTIVITY LOG</h2>
          <div class="admin-activity-list">
            ${activities.length > 0 ? activities.map(act => `
              <div class="admin-activity-item">
                <div class="activity-left">
                  <span class="activity-badge">${escapeHtml(act.action)}</span>
                  <span class="activity-details">${escapeHtml(act.details)}</span>
                </div>
                <span class="activity-time">${new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} — ${new Date(act.timestamp).toLocaleDateString()}</span>
              </div>
            `).join('') : '<div class="admin-empty-state">No recent activity recorded.</div>'}
          </div>
        </div>
      </main>
    </div>
  `;

  bindAdminNavEvents(container);
}

/**
 * --------------------------------------------------------------------------
 * TOUR MANAGEMENT CMS VIEW (/admin/tour)
 * --------------------------------------------------------------------------
 */
let activeTourFilter = 'ALL';
let tourSearchQuery = '';

function renderAdminTour(container) {
  const events = getTourEvents();
  const todayStr = new Date().toISOString().split('T')[0];

  let filtered = events.filter(evt => {
    if (activeTourFilter === 'UPCOMING') return evt.date >= todayStr;
    if (activeTourFilter === 'PAST') return evt.date < todayStr;
    if (activeTourFilter === 'SOLD_OUT') return evt.status === 'TÜKENDİ' || evt.status === 'SOLD OUT';
    if (activeTourFilter === 'DRAFT') return !evt.visible;
    if (activeTourFilter === 'PUBLISHED') return evt.visible;
    return true;
  });

  if (tourSearchQuery.trim()) {
    const q = tourSearchQuery.toLowerCase().trim();
    filtered = filtered.filter(e => 
      (e.venue && e.venue.toLowerCase().includes(q)) || 
      (e.city && e.city.toLowerCase().includes(q)) || 
      (e.country && e.country.toLowerCase().includes(q))
    );
  }

  container.innerHTML = `
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${getAdminSidebarHTML('/admin/tour')}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">Tour Management</h1>
            <p class="admin-page-desc">Create, Edit, Publish and Manage Upcoming & Past Tour Events</p>
          </div>
          <div class="admin-header-actions" style="display: flex; gap: 0.75rem;">
            <button id="btn-add-upcoming-event" class="admin-btn admin-btn-primary">+ GELECEK ETKİNLİK (UPCOMING)</button>
            <button id="btn-add-past-event" class="admin-btn admin-btn-secondary" style="border-color: #d92b2b; color: #ffffff; background: rgba(217, 43, 43, 0.15);">+ GEÇMİŞ ETKİNLİK (PAST)</button>
          </div>
        </div>

        <div class="admin-toolbar">
          <div class="admin-search-box">
            <input type="text" id="tour-search-input" class="admin-input" placeholder="Search event, venue, or city..." value="${escapeHtml(tourSearchQuery)}" />
          </div>

          <div class="admin-filter-tabs">
            <button class="admin-filter-btn ${activeTourFilter === 'ALL' ? 'active' : ''}" data-filter="ALL">TÜMÜ (${events.length})</button>
            <button class="admin-filter-btn ${activeTourFilter === 'UPCOMING' ? 'active' : ''}" data-filter="UPCOMING">GELECEK ETKİNLİKLER</button>
            <button class="admin-filter-btn ${activeTourFilter === 'PAST' ? 'active' : ''}" data-filter="PAST">GEÇMİŞ ETKİNLİKLER</button>
            <button class="admin-filter-btn ${activeTourFilter === 'SOLD_OUT' ? 'active' : ''}" data-filter="SOLD_OUT">TÜKENDİ</button>
            <button class="admin-filter-btn ${activeTourFilter === 'PUBLISHED' ? 'active' : ''}" data-filter="PUBLISHED">PUBLISHED</button>
            <button class="admin-filter-btn ${activeTourFilter === 'DRAFT' ? 'active' : ''}" data-filter="DRAFT">DRAFTS</button>
          </div>
        </div>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>ZAMAN / DÖNEM</th>
                <th>TARIH</th>
                <th>MEKAN & ETKİNLİK</th>
                <th>ŞEHİR / ÜLKE</th>
                <th>DURUM</th>
                <th>FOTOĞRAFLAR</th>
                <th>YAYIN</th>
                <th>İŞLEMLER</th>
              </tr>
            </thead>
            <tbody>
              ${renderAdminEventRows(filtered, todayStr)}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `;

  bindAdminNavEvents(container);

  const searchInput = container.querySelector('#tour-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      tourSearchQuery = e.target.value;
      renderAdminTour(container);
    };
  }

  const filterBtns = container.querySelectorAll('.admin-filter-btn');
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      activeTourFilter = btn.getAttribute('data-filter') || 'ALL';
      renderAdminTour(container);
    };
  });

  const addUpcomingBtn = container.querySelector('#btn-add-upcoming-event');
  if (addUpcomingBtn) addUpcomingBtn.onclick = () => openEventModal(null, container, 'UPCOMING');

  const addPastBtn = container.querySelector('#btn-add-past-event');
  if (addPastBtn) addPastBtn.onclick = () => openEventModal(null, container, 'PAST');

  const editBtns = container.querySelectorAll('.btn-edit-event');
  editBtns.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const item = getTourEvents().find(e => e.id === id);
      if (item) openEventModal(item, container);
    };
  });

  const toggleBtns = container.querySelectorAll('.btn-toggle-event');
  toggleBtns.forEach(btn => {
    btn.onclick = async () => {
      const id = btn.getAttribute('data-id');
      await toggleTourEventVisibility(id);
      logActivity('TOUR UPDATED', `Visibility toggled for tour event ${id}`);
      showAdminToast('✓ TOUR EVENT VISIBILITY UPDATED');
      renderAdminTour(container);
    };
  });

  const deleteBtns = container.querySelectorAll('.btn-delete-event');
  deleteBtns.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const item = getTourEvents().find(e => e.id === id);
      if (item) openDeleteConfirmModal(item, 'TOUR', container);
    };
  });
}

function renderAdminEventRows(events, todayStr) {
  if (events.length === 0) {
    return `<tr><td colspan="8" class="admin-empty-cell">Filtreye uygun etkinlik bulunamadı.</td></tr>`;
  }

  return events.map(evt => {
    const isPast = evt.date < todayStr;
    const photoCount = (evt.images || []).length;
    const displayStatus = isPast ? 'TAMAMLANDI' : (evt.status || 'SATIŞTA');
    const statusBadgeClass = isPast ? 'badge-subtle' : (displayStatus === 'TÜKENDİ' ? 'badge-danger' : 'badge-success');

    return `
      <tr>
        <td>
          <span class="admin-badge ${isPast ? 'badge-subtle' : 'badge-warning'}">${isPast ? 'GEÇMİŞ ETKİNLİK' : 'GELECEK ETKİNLİK'}</span>
        </td>
        <td><strong>${escapeHtml(evt.date)}</strong></td>
        <td>
          <div class="admin-row-title">${escapeHtml(evt.venue)}</div>
          <div class="admin-sub-text">${escapeHtml(evt.description || 'Concert Event')}</div>
        </td>
        <td>${escapeHtml(evt.city)}, ${escapeHtml(evt.country)}</td>
        <td><span class="admin-badge ${statusBadgeClass}">${escapeHtml(displayStatus)}</span></td>
        <td><strong>${photoCount > 0 ? `📷 ${photoCount} Fotoğraf` : '—'}</strong></td>
        <td>
          <span class="admin-badge ${evt.visible ? 'badge-active' : 'badge-muted'}">${evt.visible ? 'PUBLISHED' : 'DRAFT'}</span>
        </td>
        <td>
          <div class="admin-action-btns">
            <button class="admin-action-btn btn-edit-event" data-id="${evt.id}">Edit</button>
            <button class="admin-action-btn btn-toggle-event" data-id="${evt.id}">${evt.visible ? 'Unpublish' : 'Publish'}</button>
            <button class="admin-action-btn btn-danger btn-delete-event" data-id="${evt.id}">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openEventModal(eventToEdit, rootContainer, defaultPeriod = 'UPCOMING') {
  const isEdit = !!eventToEdit;
  const todayStr = new Date().toISOString().split('T')[0];

  let initialPeriod = defaultPeriod;
  let initialDate = '';

  if (eventToEdit) {
    initialPeriod = eventToEdit.date < todayStr ? 'PAST' : 'UPCOMING';
    initialDate = eventToEdit.date;
  } else {
    if (defaultPeriod === 'PAST') {
      const pastDate = new Date();
      pastDate.setMonth(pastDate.getMonth() - 3);
      initialDate = pastDate.toISOString().split('T')[0];
    } else {
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + 2);
      initialDate = futureDate.toISOString().split('T')[0];
    }
  }

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'admin-modal-backdrop';

  modalOverlay.innerHTML = `
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">${isEdit ? 'EDIT TOUR EVENT' : (defaultPeriod === 'PAST' ? 'YENİ GEÇMİŞ ETKİNLİK EKLE' : 'YENİ GELECEK ETKİNLİK EKLE')}</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <form id="tour-event-form" style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
        <div class="admin-modal-body" style="flex: 1; overflow-y: auto;">
          <div class="admin-form-grid">
            <div class="admin-form-group span-2">
              <label class="admin-label">Etkinlik Zaman Türü (Period)*</label>
              <select id="evt-period-category" class="admin-input">
                <option value="UPCOMING" ${initialPeriod === 'UPCOMING' ? 'selected' : ''}>GELECEK ETKİNLİK (Upcoming Concert)</option>
                <option value="PAST" ${initialPeriod === 'PAST' ? 'selected' : ''}>GEÇMİŞ ETKİNLİK (Past Show Archive)</option>
              </select>
            </div>

            <div class="admin-form-group span-2">
              <label class="admin-label">Etkinlik Tarihi (YYYY-MM-DD)*</label>
              <input type="date" id="evt-date" class="admin-input" value="${initialDate}" required />
            </div>

            <div class="admin-form-group span-2">
              <label class="admin-label">Mekan Adı (Venue)*</label>
              <input type="text" id="evt-venue" class="admin-input" placeholder="Örn: Sick New World Festival / O2 Brixton Academy" value="${eventToEdit ? escapeHtml(eventToEdit.venue) : ''}" required />
            </div>

            <div class="admin-form-group">
              <label class="admin-label">Şehir (City)*</label>
              <input type="text" id="evt-city" class="admin-input" placeholder="Örn: İstanbul / London" value="${eventToEdit ? escapeHtml(eventToEdit.city) : ''}" required />
            </div>

            <div class="admin-form-group">
              <label class="admin-label">Ülke / Eyalet (Country)*</label>
              <input type="text" id="evt-country" class="admin-input" placeholder="Örn: Türkiye / UK" value="${eventToEdit ? escapeHtml(eventToEdit.country) : ''}" required />
            </div>

            <div class="admin-form-group" id="evt-status-group">
              <label class="admin-label">Bilet Durumu (Status)</label>
              <select id="evt-status" class="admin-input">
                <option value="SATIŞTA" ${eventToEdit && eventToEdit.status === 'SATIŞTA' ? 'selected' : ''}>SATIŞTA (On Sale)</option>
                <option value="TÜKENDİ" ${eventToEdit && eventToEdit.status === 'TÜKENDİ' ? 'selected' : ''}>TÜKENDİ (Sold Out)</option>
                <option value="CANCELLED" ${eventToEdit && eventToEdit.status === 'CANCELLED' ? 'selected' : ''}>CANCELLED</option>
              </select>
            </div>

            <div class="admin-form-group">
              <label class="admin-label">Yayın Durumu (Publish Status)</label>
              <select id="evt-visible" class="admin-input">
                <option value="true" ${!eventToEdit || eventToEdit.visible ? 'selected' : ''}>PUBLISHED (Yayında)</option>
                <option value="false" ${eventToEdit && !eventToEdit.visible ? 'selected' : ''}>DRAFT (Taslak / Gizli)</option>
              </select>
            </div>

            <div class="admin-form-group span-2" id="evt-ticket-url-group">
              <label class="admin-label">Bilet Alma Bağlantısı (Ticket URL)</label>
              <input type="url" id="evt-ticket-url" class="admin-input" placeholder="https://tickets.example.com/show" value="${eventToEdit ? escapeHtml(eventToEdit.ticketUrl || '') : ''}" />
            </div>

            <div class="admin-form-group span-2">
              <label class="admin-label">Etkinlik Açıklaması / Alt Başlık</label>
              <input type="text" id="evt-desc" class="admin-input" placeholder="Örn: Headline Stage Performance" value="${eventToEdit ? escapeHtml(eventToEdit.description || '') : ''}" />
            </div>

            <div class="admin-form-group span-2">
              <label class="admin-label">Geçmiş Etkinlik Fotoğraf Galerisi (Her satıra 1 resim URL'si ekleyin)</label>
              <textarea id="evt-images-textarea" class="admin-input" rows="3" placeholder="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80\nhttps://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80">${eventToEdit && eventToEdit.images ? eventToEdit.images.join('\n') : ''}</textarea>
            </div>
          </div>
        </div>

        <div class="admin-modal-footer" style="position: sticky; bottom: 0; background: #0e0e11; border-top: 1px solid rgba(255, 255, 255, 0.15); padding: 1.25rem 2rem; display: flex; justify-content: flex-end; gap: 1rem; z-index: 10;">
          <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">İptal</button>
          <button type="submit" class="admin-btn admin-btn-primary" style="background: #d92b2b; color: #ffffff; padding: 0.75rem 1.8rem; font-size: 0.82rem; font-weight: 700;">💾 KAYDET (SAVE EVENT)</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  const closeModal = () => modalOverlay.remove();
  modalOverlay.querySelector('.admin-modal-close').onclick = closeModal;
  modalOverlay.querySelector('.admin-modal-cancel').onclick = closeModal;

  const periodSelect = modalOverlay.querySelector('#evt-period-category');
  const statusGroup = modalOverlay.querySelector('#evt-status-group');
  const ticketUrlGroup = modalOverlay.querySelector('#evt-ticket-url-group');

  const updateModalFieldsByPeriod = () => {
    const isPast = periodSelect.value === 'PAST';
    if (statusGroup) statusGroup.style.display = isPast ? 'none' : 'block';
    if (ticketUrlGroup) ticketUrlGroup.style.display = isPast ? 'none' : 'block';
  };

  periodSelect.onchange = updateModalFieldsByPeriod;
  updateModalFieldsByPeriod();

  const form = modalOverlay.querySelector('#tour-event-form');
  form.onsubmit = async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '⏳ KAYDEDİLİYOR...';
    }

    const selectedPeriod = modalOverlay.querySelector('#evt-period-category').value;
    let dateVal = modalOverlay.querySelector('#evt-date').value;
    const todayStr = new Date().toISOString().split('T')[0];

    // Ensure date matches period logic
    if (selectedPeriod === 'PAST' && dateVal >= todayStr) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      dateVal = yesterday.toISOString().split('T')[0];
    } else if (selectedPeriod === 'UPCOMING' && dateVal < todayStr) {
      dateVal = todayStr;
    }

    const rawImages = modalOverlay.querySelector('#evt-images-textarea').value;
    const imagesList = rawImages.split('\n').map(s => s.trim()).filter(Boolean);

    const data = {
      date: dateVal,
      time: '',
      venue: modalOverlay.querySelector('#evt-venue').value,
      city: modalOverlay.querySelector('#evt-city').value,
      country: modalOverlay.querySelector('#evt-country').value,
      status: selectedPeriod === 'PAST' ? 'TAMAMLANDI' : modalOverlay.querySelector('#evt-status').value,
      visible: modalOverlay.querySelector('#evt-visible').value === 'true',
      ticketUrl: selectedPeriod === 'PAST' ? '' : modalOverlay.querySelector('#evt-ticket-url').value,
      description: modalOverlay.querySelector('#evt-desc').value,
      images: imagesList
    };

    try {
      if (isEdit) {
        await updateTourEvent(eventToEdit.id, data);
        logActivity('TOUR EVENT UPDATED', `Updated ${selectedPeriod} event "${data.venue}" (${data.city})`);
        showAdminToast('✓ TOUR EVENT SAVED SUCCESSFULLY');
      } else {
        await addTourEvent(data);
        logActivity('TOUR EVENT CREATED', `Created ${selectedPeriod} event "${data.venue}" (${data.city})`);
        showAdminToast('✓ TOUR EVENT CREATED SUCCESSFULLY');
      }
    } catch (err) {
      console.error('Error saving tour event:', err);
      showAdminToast('⚠ Saved locally, Supabase sync error: ' + (err.message || 'Check RLS/Network'), 'danger');
    } finally {
      closeModal();
      renderAdminTour(rootContainer);
    }
  };
}

/**
 * --------------------------------------------------------------------------
 * MUSIC & DISCOGRAPHY CMS VIEW (/admin/music)
 * --------------------------------------------------------------------------
 */
let activeMusicTab = 'ALL';
let musicSearchTerm = '';

function renderAdminMusic(container) {
  const releases = getReleases();

  let filtered = releases.filter(r => {
    if (activeMusicTab === 'ALBUMS') return r.type === 'ALBUM';
    if (activeMusicTab === 'SINGLES') return r.type === 'SINGLE';
    if (activeMusicTab === 'EPS') return r.type === 'EP';
    if (activeMusicTab === 'DRAFTS') return r.status === 'DRAFT';
    return true;
  });

  if (musicSearchTerm.trim()) {
    const q = musicSearchTerm.toLowerCase().trim();
    filtered = filtered.filter(r => r.title.toLowerCase().includes(q) || r.type.toLowerCase().includes(q));
  }

  container.innerHTML = `
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${getAdminSidebarHTML('/admin/music')}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">Music & Discography CMS</h1>
            <p class="admin-page-desc">Manage Official Releases, Tracklists, Audio Files & Cover Artworks</p>
          </div>
          <button id="btn-add-release" class="admin-btn admin-btn-primary">+ CREATE RELEASE</button>
        </div>

        <div class="admin-toolbar">
          <div class="admin-search-box">
            <input type="text" id="music-search-input" class="admin-input" placeholder="Search release title or type..." value="${escapeHtml(musicSearchTerm)}" />
          </div>

          <div class="admin-filter-tabs">
            <button class="admin-filter-btn ${activeMusicTab === 'ALL' ? 'active' : ''}" data-filter="ALL">ALL RELEASES (${releases.length})</button>
            <button class="admin-filter-btn ${activeMusicTab === 'ALBUMS' ? 'active' : ''}" data-filter="ALBUMS">ALBUMS</button>
            <button class="admin-filter-btn ${activeMusicTab === 'SINGLES' ? 'active' : ''}" data-filter="SINGLES">SINGLES</button>
            <button class="admin-filter-btn ${activeMusicTab === 'EPS' ? 'active' : ''}" data-filter="EPS">EPs</button>
            <button class="admin-filter-btn ${activeMusicTab === 'DRAFTS' ? 'active' : ''}" data-filter="DRAFTS">DRAFTS</button>
          </div>
        </div>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>COVER</th>
                <th>RELEASE TITLE</th>
                <th>TYPE</th>
                <th>RELEASE DATE</th>
                <th>TRACKS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              ${renderAdminReleaseRows(filtered)}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `;

  bindAdminNavEvents(container);

  const searchInput = container.querySelector('#music-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      musicSearchTerm = e.target.value;
      renderAdminMusic(container);
    };
  }

  const filterBtns = container.querySelectorAll('.admin-filter-btn');
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      activeMusicTab = btn.getAttribute('data-filter') || 'ALL';
      renderAdminMusic(container);
    };
  });

  const addBtn = container.querySelector('#btn-add-release');
  if (addBtn) addBtn.onclick = () => openReleaseModal(null, container);

  const editBtns = container.querySelectorAll('.btn-edit-release');
  editBtns.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const item = getReleases().find(r => r.id === id);
      if (item) openReleaseModal(item, container);
    };
  });

  const toggleBtns = container.querySelectorAll('.btn-toggle-release');
  toggleBtns.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const item = getReleases().find(r => r.id === id);
      if (item) {
        const newStatus = item.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
        updateRelease(id, { status: newStatus });
        logActivity('RELEASE UPDATED', `Release "${item.title}" status changed to ${newStatus}`);
        showAdminToast('✓ RELEASE STATUS UPDATED');
        renderAdminMusic(container);
      }
    };
  });

  const deleteBtns = container.querySelectorAll('.btn-delete-release');
  deleteBtns.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const item = getReleases().find(r => r.id === id);
      if (item) openDeleteConfirmModal(item, 'RELEASE', container);
    };
  });
}

function renderAdminReleaseRows(releases) {
  if (releases.length === 0) {
    return `<tr><td colspan="7" class="admin-empty-cell">No releases found matching filter.</td></tr>`;
  }

  return releases.map(rel => {
    const trackCount = (rel.tracks || []).length;
    return `
      <tr>
        <td>
          <img src="${rel.coverUrl}" alt="Cover" class="admin-thumb-img" />
        </td>
        <td>
          <div class="admin-row-title">${escapeHtml(rel.title)} ${rel.featured ? '<span class="admin-badge badge-warning">FEATURED</span>' : ''}</div>
          <div class="admin-sub-text">${escapeHtml(rel.artist || 'THE SINNERS')}</div>
        </td>
        <td><span class="admin-badge badge-subtle">${rel.type}</span></td>
        <td>${escapeHtml(rel.releaseDate || rel.year)}</td>
        <td><strong>${trackCount} ${trackCount === 1 ? 'Track' : 'Tracks'}</strong></td>
        <td>
          <span class="admin-badge ${rel.status === 'PUBLISHED' ? 'badge-active' : 'badge-muted'}">${rel.status || 'PUBLISHED'}</span>
        </td>
        <td>
          <div class="admin-action-btns">
            <button class="admin-action-btn btn-edit-release" data-id="${rel.id}">Edit Release & Tracks</button>
            <button class="admin-action-btn btn-toggle-release" data-id="${rel.id}">${rel.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}</button>
            <button class="admin-action-btn btn-danger btn-delete-release" data-id="${rel.id}">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openReleaseModal(releaseToEdit, rootContainer) {
  const isEdit = !!releaseToEdit;
  let tracksState = releaseToEdit && releaseToEdit.tracks ? JSON.parse(JSON.stringify(releaseToEdit.tracks)) : [
    { id: 'trk_' + Date.now(), title: 'Sample Track', duration: '03:30', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
  ];

  let testAudioObj = null;

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'admin-modal-backdrop';

  const renderModalContent = () => {
    modalOverlay.innerHTML = `
      <div class="admin-modal admin-modal-wide">
        <div class="admin-modal-header">
          <h2 class="admin-modal-title">${isEdit ? 'EDIT RELEASE & TRACKLIST' : 'CREATE NEW RELEASE'}</h2>
          <button type="button" class="admin-modal-close">&times;</button>
        </div>
        <form id="release-form">
          <div class="admin-modal-body admin-grid-layout">
            <!-- LEFT MAIN COL: RELEASE METADATA & TRACKLIST -->
            <div class="admin-modal-main-col">
              <div class="admin-form-grid">
                <div class="admin-form-group span-2">
                  <label class="admin-label">Release Title*</label>
                  <input type="text" id="rel-title" class="admin-input" value="${releaseToEdit ? escapeHtml(releaseToEdit.title) : ''}" required placeholder="e.g. 9MM HATE" />
                </div>

                <div class="admin-form-group">
                  <label class="admin-label">Artist Name*</label>
                  <input type="text" id="rel-artist" class="admin-input" value="${releaseToEdit ? escapeHtml(releaseToEdit.artist) : 'THE SINNERS'}" required />
                </div>

                <div class="admin-form-group">
                  <label class="admin-label">Release Type*</label>
                  <select id="rel-type" class="admin-input">
                    <option value="ALBUM" ${releaseToEdit && releaseToEdit.type === 'ALBUM' ? 'selected' : ''}>ALBUM</option>
                    <option value="SINGLE" ${releaseToEdit && releaseToEdit.type === 'SINGLE' ? 'selected' : ''}>SINGLE</option>
                    <option value="EP" ${releaseToEdit && releaseToEdit.type === 'EP' ? 'selected' : ''}>EP</option>
                  </select>
                </div>

                <div class="admin-form-group">
                  <label class="admin-label">Release Date String*</label>
                  <input type="text" id="rel-date" class="admin-input" value="${releaseToEdit ? escapeHtml(releaseToEdit.releaseDate) : '18 OCAK 2026'}" placeholder="e.g. 18 OCAK 2026" required />
                </div>

                <div class="admin-form-group">
                  <label class="admin-label">Year*</label>
                  <input type="text" id="rel-year" class="admin-input" value="${releaseToEdit ? escapeHtml(releaseToEdit.year) : new Date().getFullYear().toString()}" required />
                </div>

                <div class="admin-form-group span-2">
                  <label class="admin-label">Description / Bio Statement</label>
                  <textarea id="rel-desc" class="admin-input" rows="2" placeholder="Brief description of the release...">${releaseToEdit ? escapeHtml(releaseToEdit.description) : ''}</textarea>
                </div>

                <!-- DIGITAL PLATFORM LINKS (Database Ready) -->
                <div class="admin-form-group">
                  <label class="admin-label">Spotify Link</label>
                  <input type="url" id="rel-spotify" class="admin-input" value="${releaseToEdit ? escapeHtml(releaseToEdit.spotifyUrl || '') : ''}" placeholder="https://open.spotify.com/..." />
                </div>

                <div class="admin-form-group">
                  <label class="admin-label">Apple Music Link</label>
                  <input type="url" id="rel-apple" class="admin-input" value="${releaseToEdit ? escapeHtml(releaseToEdit.appleUrl || '') : ''}" placeholder="https://music.apple.com/..." />
                </div>

                <div class="admin-form-group">
                  <label class="admin-label">YouTube Link</label>
                  <input type="url" id="rel-youtube" class="admin-input" value="${releaseToEdit ? escapeHtml(releaseToEdit.youtubeUrl || '') : ''}" placeholder="https://youtube.com/..." />
                </div>

                <div class="admin-form-group">
                  <label class="admin-label">Bandcamp / Store Link</label>
                  <input type="url" id="rel-bandcamp" class="admin-input" value="${releaseToEdit ? escapeHtml(releaseToEdit.bandcampUrl || '') : ''}" placeholder="https://bandcamp.com/..." />
                </div>
              </div>

              <!-- TRACKLIST MANAGER -->
              <div class="admin-tracklist-editor" style="margin-top: 2rem;">
                <div class="admin-section-header-row">
                  <h3>TRACKLIST MANAGER (${tracksState.length} TRACKS)</h3>
                  <button type="button" id="btn-add-track-row" class="admin-btn admin-btn-secondary">+ ADD TRACK</button>
                </div>

                <div class="admin-table-container">
                  <table class="admin-table admin-table-compact">
                    <thead>
                      <tr>
                        <th style="width: 30px;">#</th>
                        <th>TRACK TITLE</th>
                        <th style="width: 80px;">DURATION</th>
                        <th>AUDIO FILE / STREAM URL</th>
                        <th style="width: 110px;">PREVIEW / ACTION</th>
                      </tr>
                    </thead>
                    <tbody id="tracklist-rows-body">
                      ${tracksState.map((t, idx) => `
                        <tr>
                          <td><strong>${idx + 1}</strong></td>
                          <td>
                            <input type="text" class="admin-input input-track-title" data-idx="${idx}" value="${escapeHtml(t.title)}" placeholder="Track title..." required />
                          </td>
                          <td>
                            <input type="text" class="admin-input input-track-dur" data-idx="${idx}" value="${escapeHtml(t.duration)}" placeholder="03:45" required />
                          </td>
                          <td>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                              <input type="text" class="admin-input input-track-url" data-idx="${idx}" value="${escapeHtml(t.audioUrl)}" placeholder="https://... or upload local MP3" required />
                              <label class="admin-file-upload-btn" style="display: inline-block; font-size: 0.72rem; padding: 2px 6px; cursor: pointer; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 3px; text-align: center;">
                                🎵 Upload MP3 File
                                <input type="file" class="input-track-file hidden" data-idx="${idx}" accept="audio/*" />
                              </label>
                            </div>
                          </td>
                          <td>
                            <div style="display: flex; gap: 4px; align-items: center;">
                              <button type="button" class="admin-action-btn btn-test-play-audio" data-idx="${idx}" title="Test Play Audio">▶</button>
                              <button type="button" class="admin-action-btn btn-danger btn-remove-track" data-idx="${idx}">&times;</button>
                            </div>
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- RIGHT SIDEBAR COL: ARTWORK & PUBLISHING -->
            <div class="admin-modal-side-col">
              <div class="admin-form-group">
                <label class="admin-label">Cover Artwork URL / Upload*</label>
                <input type="text" id="rel-cover-url" class="admin-input" value="${releaseToEdit ? escapeHtml(releaseToEdit.coverUrl) : 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'}" required />
                <label class="admin-btn admin-btn-secondary" style="display: block; width: 100%; margin-top: 6px; text-align: center; cursor: pointer; box-sizing: border-box;">
                  📷 Upload Cover Image File
                  <input type="file" id="rel-cover-file" class="hidden" accept="image/*" />
                </label>
                <div class="admin-img-preview-box" style="margin-top: 0.75rem;">
                  <img id="rel-cover-preview" src="${releaseToEdit ? releaseToEdit.coverUrl : 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'}" alt="Preview" />
                </div>
              </div>

              <div class="admin-form-group" style="margin-top: 1.5rem;">
                <label class="admin-label">Publication Status</label>
                <select id="rel-status" class="admin-input">
                  <option value="PUBLISHED" ${!releaseToEdit || releaseToEdit.status === 'PUBLISHED' ? 'selected' : ''}>PUBLISHED (Public)</option>
                  <option value="DRAFT" ${releaseToEdit && releaseToEdit.status === 'DRAFT' ? 'selected' : ''}>DRAFT (Hidden)</option>
                </select>
              </div>

              <div class="admin-form-group" style="margin-top: 1rem;">
                <label class="admin-checkbox-label">
                  <input type="checkbox" id="rel-featured" ${releaseToEdit && releaseToEdit.featured ? 'checked' : ''} />
                  <span>Set as Main Featured Release</span>
                </label>
              </div>
            </div>
          </div>

          <div class="admin-modal-footer">
            <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">Cancel</button>
            <button type="submit" class="admin-btn admin-btn-primary">SAVE RELEASE & TRACKS</button>
          </div>
        </form>
      </div>
    `;

    // Bind inner listeners
    const stopTestAudio = () => {
      if (testAudioObj) {
        testAudioObj.pause();
        testAudioObj = null;
      }
    };

    const closeModal = () => {
      stopTestAudio();
      modalOverlay.remove();
    };

    modalOverlay.querySelector('.admin-modal-close').onclick = closeModal;
    modalOverlay.querySelector('.admin-modal-cancel').onclick = closeModal;

    const coverInput = modalOverlay.querySelector('#rel-cover-url');
    const coverFileInput = modalOverlay.querySelector('#rel-cover-file');
    const coverPreview = modalOverlay.querySelector('#rel-cover-preview');

    if (coverInput && coverPreview) {
      coverInput.oninput = (e) => {
        coverPreview.src = e.target.value;
      };
    }

    if (coverFileInput && coverInput && coverPreview) {
      coverFileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            coverInput.value = evt.target.result;
            coverPreview.src = evt.target.result;
          };
          reader.readAsDataURL(file);
        }
      };
    }

    // Audio MP3 File Upload handlers for tracks
    const trackFileInputs = modalOverlay.querySelectorAll('.input-track-file');
    trackFileInputs.forEach(input => {
      input.onchange = (e) => {
        const idx = parseInt(input.getAttribute('data-idx'));
        const file = e.target.files[0];
        if (file) {
          const urlInput = modalOverlay.querySelector(`.input-track-url[data-idx="${idx}"]`);
          const durInput = modalOverlay.querySelector(`.input-track-dur[data-idx="${idx}"]`);
          const reader = new FileReader();

          reader.onload = (evt) => {
            if (urlInput) urlInput.value = evt.target.result;
            if (tracksState[idx]) tracksState[idx].audioUrl = evt.target.result;

            // Auto detect duration if possible
            const tempAudio = new Audio(evt.target.result);
            tempAudio.onloadedmetadata = () => {
              const m = Math.floor(tempAudio.duration / 60);
              const s = Math.floor(tempAudio.duration % 60);
              const formattedDur = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
              if (durInput) durInput.value = formattedDur;
              if (tracksState[idx]) tracksState[idx].duration = formattedDur;
            };
          };
          reader.readAsDataURL(file);
        }
      };
    });

    // Test Play buttons for tracks in CMS modal
    const testPlayBtns = modalOverlay.querySelectorAll('.btn-test-play-audio');
    testPlayBtns.forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        syncTracksFromInputs();
        const trk = tracksState[idx];
        if (!trk || !trk.audioUrl) {
          showAdminToast('⚠️ Please enter an Audio Stream URL or upload an MP3 file first!');
          return;
        }

        if (testAudioObj && testAudioObj.src === trk.audioUrl && !testAudioObj.paused) {
          testAudioObj.pause();
          btn.textContent = '▶';
        } else {
          stopTestAudio();
          testAudioObj = new Audio(trk.audioUrl);
          testAudioObj.play().then(() => {
            btn.textContent = '⏸';
          }).catch(err => {
            showAdminToast('⚠️ Unable to play audio stream: ' + err.message);
          });
          testAudioObj.onended = () => {
            btn.textContent = '▶';
          };
        }
      };
    });

    // Add track row
    const addTrackBtn = modalOverlay.querySelector('#btn-add-track-row');
    if (addTrackBtn) {
      addTrackBtn.onclick = () => {
        syncTracksFromInputs();
        tracksState.push({ id: 'trk_' + Date.now(), title: 'New Track', duration: '03:30', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' });
        renderModalContent();
      };
    }

    // Remove track
    const removeTrackBtns = modalOverlay.querySelectorAll('.btn-remove-track');
    removeTrackBtns.forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        syncTracksFromInputs();
        tracksState.splice(idx, 1);
        renderModalContent();
      };
    });

    const form = modalOverlay.querySelector('#release-form');
    form.onsubmit = (e) => {
      e.preventDefault();
      stopTestAudio();
      syncTracksFromInputs();

      const releaseTitle = modalOverlay.querySelector('#rel-title').value;
      const releaseType = modalOverlay.querySelector('#rel-type').value;

      const formattedTracks = tracksState.map(t => ({
        ...t,
        releaseTitle: releaseTitle,
        type: releaseType
      }));

      const data = {
        title: releaseTitle,
        artist: modalOverlay.querySelector('#rel-artist').value,
        type: releaseType,
        releaseDate: modalOverlay.querySelector('#rel-date').value,
        year: modalOverlay.querySelector('#rel-year').value,
        description: modalOverlay.querySelector('#rel-desc').value,
        spotifyUrl: modalOverlay.querySelector('#rel-spotify').value,
        appleUrl: modalOverlay.querySelector('#rel-apple').value,
        youtubeUrl: modalOverlay.querySelector('#rel-youtube').value,
        bandcampUrl: modalOverlay.querySelector('#rel-bandcamp').value,
        coverUrl: modalOverlay.querySelector('#rel-cover-url').value,
        status: modalOverlay.querySelector('#rel-status').value,
        featured: modalOverlay.querySelector('#rel-featured').checked,
        tracks: formattedTracks
      };

      if (isEdit) {
        updateRelease(releaseToEdit.id, data);
        logActivity('RELEASE UPDATED', `Updated release "${data.title}" (${data.type})`);
        showAdminToast('✓ RELEASE & TRACKLIST SAVED SUCCESSFULLY');
      } else {
        addRelease(data);
        logActivity('RELEASE CREATED', `Created release "${data.title}" (${data.type})`);
        showAdminToast('✓ NEW RELEASE CREATED SUCCESSFULLY');
      }

      closeModal();
      renderAdminMusic(rootContainer);
    };
  };

  const syncTracksFromInputs = () => {
    const titleInputs = modalOverlay.querySelectorAll('.input-track-title');
    const durInputs = modalOverlay.querySelectorAll('.input-track-dur');
    const urlInputs = modalOverlay.querySelectorAll('.input-track-url');

    titleInputs.forEach((inp, idx) => {
      if (tracksState[idx]) {
        tracksState[idx].title = inp.value;
        tracksState[idx].duration = durInputs[idx] ? durInputs[idx].value : '03:30';
        tracksState[idx].audioUrl = urlInputs[idx] ? urlInputs[idx].value : '';
      }
    });
  };

  document.body.appendChild(modalOverlay);
  renderModalContent();
}

/**
 * --------------------------------------------------------------------------
 * UPD//T3 TRANSMISSIONS CMS VIEW (/admin/updates)
 * --------------------------------------------------------------------------
 */
let activeUpdateFilter = 'ALL';
let updateSearchQuery = '';

function renderAdminUpdates(container) {
  const entries = getJournalEntries();

  let filtered = entries.filter(e => {
    if (activeUpdateFilter === 'PUBLISHED') return e.status !== 'DRAFT';
    if (activeUpdateFilter === 'DRAFT') return e.status === 'DRAFT';
    if (activeUpdateFilter === 'FEATURED') return e.featured;
    return true;
  });

  if (updateSearchQuery.trim()) {
    const q = updateSearchQuery.toLowerCase().trim();
    filtered = filtered.filter(e => (e.title && e.title.toLowerCase().includes(q)) || (e.category && e.category.toLowerCase().includes(q)));
  }

  container.innerHTML = `
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${getAdminSidebarHTML('/admin/updates')}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">UPD//T3 Transmissions CMS</h1>
            <p class="admin-page-desc">Create, Edit, Preview and Publish Digital Journal Records & Essays</p>
          </div>
          <button id="btn-add-journal" class="admin-btn admin-btn-primary">+ CREATE TRANSMISSION</button>
        </div>

        <div class="admin-toolbar">
          <div class="admin-search-box">
            <input type="text" id="update-search-input" class="admin-input" placeholder="Search transmission title or category..." value="${escapeHtml(updateSearchQuery)}" />
          </div>

          <div class="admin-filter-tabs">
            <button class="admin-filter-btn ${activeUpdateFilter === 'ALL' ? 'active' : ''}" data-filter="ALL">ALL (${entries.length})</button>
            <button class="admin-filter-btn ${activeUpdateFilter === 'PUBLISHED' ? 'active' : ''}" data-filter="PUBLISHED">PUBLISHED</button>
            <button class="admin-filter-btn ${activeUpdateFilter === 'DRAFT' ? 'active' : ''}" data-filter="DRAFT">DRAFTS</button>
            <button class="admin-filter-btn ${activeUpdateFilter === 'FEATURED' ? 'active' : ''}" data-filter="FEATURED">FEATURED</button>
          </div>
        </div>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>TRANSMISSION TITLE</th>
                <th>CATEGORY</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              ${renderJournalAdminRows(filtered)}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `;

  bindAdminNavEvents(container);

  const searchInput = container.querySelector('#update-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      updateSearchQuery = e.target.value;
      renderAdminUpdates(container);
    };
  }

  const filterBtns = container.querySelectorAll('.admin-filter-btn');
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      activeUpdateFilter = btn.getAttribute('data-filter') || 'ALL';
      renderAdminUpdates(container);
    };
  });

  const addBtn = container.querySelector('#btn-add-journal');
  if (addBtn) addBtn.onclick = () => openJournalModal(null, container);

  const editBtns = container.querySelectorAll('.btn-edit-journal');
  editBtns.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const item = getJournalEntries().find(e => e.id === id);
      if (item) openJournalModal(item, container);
    };
  });

  const previewBtns = container.querySelectorAll('.btn-preview-journal');
  previewBtns.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const item = getJournalEntries().find(e => e.id === id);
      if (item) openTransmissionPreviewModal(item);
    };
  });

  const toggleBtns = container.querySelectorAll('.btn-toggle-journal');
  toggleBtns.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const item = getJournalEntries().find(e => e.id === id);
      if (item) {
        const newStatus = item.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
        updateJournalEntry(id, { status: newStatus });
        logActivity('TRANSMISSION UPDATED', `Transmission "${item.title}" status changed to ${newStatus}`);
        showAdminToast('✓ TRANSMISSION STATUS UPDATED');
        renderAdminUpdates(container);
      }
    };
  });

  const deleteBtns = container.querySelectorAll('.btn-delete-journal');
  deleteBtns.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const item = getJournalEntries().find(e => e.id === id);
      if (item) openDeleteConfirmModal(item, 'TRANSMISSION', container);
    };
  });
}

function renderJournalAdminRows(entries) {
  if (entries.length === 0) {
    return `<tr><td colspan="5" class="admin-empty-cell">No transmission records found matching filter.</td></tr>`;
  }

  return entries.map(item => {
    return `
      <tr>
        <td><strong>${escapeHtml(item.date)}</strong></td>
        <td>
          <div class="admin-row-title">${escapeHtml(item.title)} ${item.featured ? '<span class="admin-badge badge-warning">FEATURED</span>' : ''}</div>
          <div class="admin-sub-text">${escapeHtml(item.meta || 'Journal Transmission')}</div>
        </td>
        <td><span class="admin-badge badge-subtle">${escapeHtml(item.category || 'JOURNAL')}</span></td>
        <td><span class="admin-badge ${item.status === 'DRAFT' ? 'badge-muted' : 'badge-active'}">${item.status || 'PUBLISHED'}</span></td>
        <td>
          <div class="admin-action-btns">
            <button class="admin-action-btn btn-edit-journal" data-id="${item.id}">Edit</button>
            <button class="admin-action-btn btn-preview-journal" data-id="${item.id}">Preview</button>
            <button class="admin-action-btn btn-toggle-journal" data-id="${item.id}">${item.status === 'DRAFT' ? 'Publish' : 'Unpublish'}</button>
            <button class="admin-action-btn btn-danger btn-delete-journal" data-id="${item.id}">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openJournalModal(itemToEdit, rootContainer) {
  const isEdit = !!itemToEdit;

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'admin-modal-backdrop';

  modalOverlay.innerHTML = `
    <div class="admin-modal admin-modal-wide">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">${isEdit ? 'EDIT TRANSMISSION' : 'CREATE TRANSMISSION'}</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <form id="journal-entry-form">
        <div class="admin-modal-body admin-grid-layout">
          <div class="admin-modal-main-col">
            <div class="admin-form-grid">
              <div class="admin-form-group span-2">
                <label class="admin-label">Transmission Title*</label>
                <input type="text" id="j-title" class="admin-input" value="${itemToEdit ? escapeHtml(itemToEdit.title) : ''}" required placeholder="e.g. THE ANALOG RESONANCE OF 9MM HATE" />
              </div>
              <div class="admin-form-group">
                <label class="admin-label">Date String*</label>
                <input type="text" id="j-date" class="admin-input" value="${itemToEdit ? escapeHtml(itemToEdit.date) : '12 AUG 2026'}" required placeholder="e.g. 12 AUG 2026" />
              </div>
              <div class="admin-form-group">
                <label class="admin-label">Category Tag*</label>
                <input type="text" id="j-category" class="admin-input" value="${itemToEdit ? escapeHtml(itemToEdit.category || 'ESSAY // DISCOGRAPHY') : 'ESSAY // DISCOGRAPHY'}" required />
              </div>
              <div class="admin-form-group span-2">
                <label class="admin-label">Location / Studio Meta Header</label>
                <input type="text" id="j-meta" class="admin-input" value="${itemToEdit ? escapeHtml(itemToEdit.meta || '') : ''}" placeholder="e.g. LONDON // ANALOG SESSION 04" />
              </div>
              <div class="admin-form-group span-2">
                <label class="admin-label">Full Editorial Content (Use double linebreaks for paragraphs)*</label>
                <textarea id="j-body" class="admin-input" rows="8" required placeholder="Write transmission essay or studio diary entry...">${itemToEdit ? escapeHtml(itemToEdit.body) : ''}</textarea>
              </div>
            </div>
          </div>

          <div class="admin-modal-side-col">
            <div class="admin-form-group">
              <label class="admin-label">Hero / Cover Image URL*</label>
              <input type="url" id="j-image" class="admin-input" value="${itemToEdit ? escapeHtml(itemToEdit.image || '') : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80'}" required />
              <div class="admin-img-preview-box" style="margin-top: 0.75rem;">
                <img id="j-image-preview" src="${itemToEdit ? itemToEdit.image : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80'}" alt="Preview" />
              </div>
            </div>

            <div class="admin-form-group" style="margin-top: 1.5rem;">
              <label class="admin-label">Publication Status</label>
              <select id="j-status" class="admin-input">
                <option value="PUBLISHED" ${!itemToEdit || itemToEdit.status === 'PUBLISHED' ? 'selected' : ''}>PUBLISHED</option>
                <option value="DRAFT" ${itemToEdit && itemToEdit.status === 'DRAFT' ? 'selected' : ''}>DRAFT (Hidden)</option>
              </select>
            </div>

            <div class="admin-form-group" style="margin-top: 1rem;">
              <label class="admin-checkbox-label">
                <input type="checkbox" id="j-featured" ${itemToEdit && itemToEdit.featured ? 'checked' : ''} />
                <span>Featured Transmission</span>
              </label>
            </div>

            <div style="margin-top: 2rem;">
              <button type="button" id="btn-preview-modal-trigger" class="admin-btn admin-btn-secondary" style="width: 100%;">LIVE PUBLIC PREVIEW</button>
            </div>
          </div>
        </div>

        <div class="admin-modal-footer">
          <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">Cancel</button>
          <button type="submit" class="admin-btn admin-btn-primary">SAVE TRANSMISSION</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  const closeModal = () => modalOverlay.remove();
  modalOverlay.querySelector('.admin-modal-close').onclick = closeModal;
  modalOverlay.querySelector('.admin-modal-cancel').onclick = closeModal;

  const imgInput = modalOverlay.querySelector('#j-image');
  const imgPreview = modalOverlay.querySelector('#j-image-preview');
  if (imgInput && imgPreview) {
    imgInput.oninput = (e) => imgPreview.src = e.target.value;
  }

  const previewTrigger = modalOverlay.querySelector('#btn-preview-modal-trigger');
  if (previewTrigger) {
    previewTrigger.onclick = () => {
      const previewData = {
        title: modalOverlay.querySelector('#j-title').value,
        date: modalOverlay.querySelector('#j-date').value,
        category: modalOverlay.querySelector('#j-category').value,
        meta: modalOverlay.querySelector('#j-meta').value,
        body: modalOverlay.querySelector('#j-body').value,
        image: modalOverlay.querySelector('#j-image').value
      };
      openTransmissionPreviewModal(previewData);
    };
  }

  const form = modalOverlay.querySelector('#journal-entry-form');
  form.onsubmit = async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '⏳ SAVING...';
    }

    const data = {
      title: modalOverlay.querySelector('#j-title').value,
      date: modalOverlay.querySelector('#j-date').value,
      category: modalOverlay.querySelector('#j-category').value,
      meta: modalOverlay.querySelector('#j-meta').value,
      body: modalOverlay.querySelector('#j-body').value,
      image: modalOverlay.querySelector('#j-image').value,
      status: modalOverlay.querySelector('#j-status').value,
      featured: modalOverlay.querySelector('#j-featured').checked
    };

    try {
      if (isEdit) {
        await updateJournalEntry(itemToEdit.id, data);
        logActivity('TRANSMISSION UPDATED', `Updated transmission "${data.title}"`);
        showAdminToast('✓ TRANSMISSION SAVED SUCCESSFULLY');
      } else {
        await addJournalEntry(data);
        logActivity('TRANSMISSION CREATED', `Created transmission "${data.title}"`);
        showAdminToast('✓ TRANSMISSION CREATED SUCCESSFULLY');
      }
    } catch (err) {
      console.error('Error saving transmission:', err);
      showAdminToast('⚠ Supabase sync error: ' + (err.message || 'Check RLS/Network'), 'danger');
    } finally {
      closeModal();
      renderAdminUpdates(rootContainer);
    }
  };
}

function openTransmissionPreviewModal(transmissionData) {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'admin-modal-backdrop';

  const paragraphs = (transmissionData.body || '').split('\n\n').map(p => `<p>${escapeHtml(p)}</p>`).join('');

  modalOverlay.innerHTML = `
    <div class="admin-modal admin-modal-wide admin-preview-modal">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">LIVE PUBLIC PREVIEW — /news</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <div class="admin-modal-body" style="background: #f5f3ee; color: #111113; padding: 2.5rem;">
        <div class="transmission-magazine-spread" style="margin: 0;">
          <div class="spread-left-col">
            <div class="spread-meta-header">
              <span class="spread-cat">${escapeHtml(transmissionData.category || 'TRANSMISSION')}</span>
              <span class="spread-date">${escapeHtml(transmissionData.date)}</span>
            </div>
            <h2 class="spread-title">${escapeHtml(transmissionData.title)}</h2>
            ${transmissionData.meta ? `<div class="spread-meta-location">${escapeHtml(transmissionData.meta)}</div>` : ''}
            
            <div class="spread-body-text">
              ${paragraphs}
            </div>
          </div>

          <div class="spread-right-col">
            <div class="spread-artwork-box">
              <img src="${escapeHtml(transmissionData.image)}" alt="${escapeHtml(transmissionData.title)}" class="spread-artwork-img" />
            </div>
          </div>
        </div>
      </div>
      <div class="admin-modal-footer">
        <button type="button" class="admin-btn admin-btn-secondary admin-modal-close-btn">CLOSE PREVIEW</button>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);
  const closeModal = () => modalOverlay.remove();
  modalOverlay.querySelector('.admin-modal-close').onclick = closeModal;
  modalOverlay.querySelector('.admin-modal-close-btn').onclick = closeModal;
}

/**
 * --------------------------------------------------------------------------
 * MEDIA LIBRARY CMS VIEW (/admin/media)
 * --------------------------------------------------------------------------
 */
let mediaSearchQuery = '';

function renderAdminMedia(container) {
  const items = getMediaItems();

  let filtered = items;
  if (mediaSearchQuery.trim()) {
    const q = mediaSearchQuery.toLowerCase().trim();
    filtered = items.filter(m => m.name.toLowerCase().includes(q) || m.url.toLowerCase().includes(q));
  }

  container.innerHTML = `
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${getAdminSidebarHTML('/admin/media')}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">Media Library</h1>
            <p class="admin-page-desc">Centralized Image Assets Store for Tour, Music and Transmissions</p>
          </div>
          <button id="btn-add-media" class="admin-btn admin-btn-primary">+ UPLOAD ASSET</button>
        </div>

        <div class="admin-toolbar">
          <div class="admin-search-box">
            <input type="text" id="media-search-input" class="admin-input" placeholder="Search asset name or URL..." value="${escapeHtml(mediaSearchQuery)}" />
          </div>
        </div>

        <div class="admin-media-grid">
          ${filtered.length > 0 ? filtered.map(item => `
            <div class="admin-media-card">
              <div class="media-thumb-box">
                <img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.name)}" class="media-thumb-img" />
              </div>
              <div class="media-card-info">
                <div class="media-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div>
                <div class="media-meta">${item.size} • ${item.dimensions}</div>
                <div class="media-card-actions">
                  <button type="button" class="admin-action-btn btn-copy-url" data-url="${escapeHtml(item.url)}">Copy URL</button>
                  <button type="button" class="admin-action-btn btn-danger btn-delete-media" data-id="${item.id}">Delete</button>
                </div>
              </div>
            </div>
          `).join('') : '<div class="admin-empty-state">No media assets found.</div>'}
        </div>
      </main>
    </div>
  `;

  bindAdminNavEvents(container);

  const searchInput = container.querySelector('#media-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      mediaSearchQuery = e.target.value;
      renderAdminMedia(container);
    };
  }

  const addBtn = container.querySelector('#btn-add-media');
  if (addBtn) addBtn.onclick = () => openMediaUploadModal(container);

  const copyBtns = container.querySelectorAll('.btn-copy-url');
  copyBtns.forEach(btn => {
    btn.onclick = () => {
      const url = btn.getAttribute('data-url');
      navigator.clipboard.writeText(url).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy URL', 2000);
      });
    };
  });

  const deleteBtns = container.querySelectorAll('.btn-delete-media');
  deleteBtns.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const item = getMediaItems().find(m => m.id === id);
      if (item) openDeleteMediaModal(item, container);
    };
  });
}

function openMediaUploadModal(rootContainer) {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'admin-modal-backdrop';

  modalOverlay.innerHTML = `
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">UPLOAD MEDIA ASSET</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <form id="media-upload-form">
        <div class="admin-modal-body">
          <div class="admin-form-group">
            <label class="admin-label">Asset Title / Name*</label>
            <input type="text" id="med-name" class="admin-input" placeholder="e.g. Concert Stage Photo" required />
          </div>
          <div class="admin-form-group" style="margin-top: 1rem;">
            <label class="admin-label">Image URL*</label>
            <input type="url" id="med-url" class="admin-input" placeholder="https://..." required />
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">Cancel</button>
          <button type="submit" class="admin-btn admin-btn-primary">SAVE ASSET</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modalOverlay);
  const closeModal = () => modalOverlay.remove();
  modalOverlay.querySelector('.admin-modal-close').onclick = closeModal;
  modalOverlay.querySelector('.admin-modal-cancel').onclick = closeModal;

  const form = modalOverlay.querySelector('#media-upload-form');
  form.onsubmit = (e) => {
    e.preventDefault();
    const name = modalOverlay.querySelector('#med-name').value;
    const url = modalOverlay.querySelector('#med-url').value;

    addMediaItem({ name, url });
    logActivity('MEDIA UPLOADED', `Uploaded media asset "${name}"`);
    showAdminToast('✓ MEDIA ASSET UPLOADED SUCCESSFULLY');
    closeModal();
    renderAdminMedia(rootContainer);
  };
}

function openDeleteMediaModal(mediaItem, rootContainer) {
  const usage = getMediaUsage(mediaItem.url);

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'admin-modal-backdrop';

  const usageHTML = usage.length > 0 ? `
    <div class="admin-warning-box">
      <strong>⚠️ WARNING: THIS ASSET IS CURRENTLY REFERENCED BY:</strong>
      <ul>
        ${usage.map(u => `<li>${escapeHtml(u)}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  modalOverlay.innerHTML = `
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">DELETE MEDIA ASSET</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <div class="admin-modal-body">
        <p>Are you sure you want to permanently delete asset <strong>"${escapeHtml(mediaItem.name)}"</strong>?</p>
        ${usageHTML}
      </div>
      <div class="admin-modal-footer">
        <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">Cancel</button>
        <button type="button" id="btn-confirm-delete-media" class="admin-btn admin-btn-danger">DELETE ASSET</button>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);
  const closeModal = () => modalOverlay.remove();
  modalOverlay.querySelector('.admin-modal-close').onclick = closeModal;
  modalOverlay.querySelector('.admin-modal-cancel').onclick = closeModal;

  modalOverlay.querySelector('#btn-confirm-delete-media').onclick = () => {
    deleteMediaItem(mediaItem.id);
    logActivity('MEDIA DELETED', `Deleted media asset "${mediaItem.name}"`);
    showAdminToast('✓ MEDIA ASSET DELETED', 'danger');
    closeModal();
    renderAdminMedia(rootContainer);
  };
}

/**
 * --------------------------------------------------------------------------
 * SYSTEM SETTINGS CMS VIEW (/admin/settings)
 * --------------------------------------------------------------------------
 */
function renderAdminSettings(container) {
  const settings = getSettings();

  container.innerHTML = `
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${getAdminSidebarHTML('/admin/settings')}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">CMS System Settings</h1>
            <p class="admin-page-desc">Global Site Configurations & Default Settings</p>
          </div>
        </div>

        <form id="cms-settings-form" style="max-width: 650px;">
          <div class="admin-form-group">
            <label class="admin-label">Official Site Title</label>
            <input type="text" id="set-title" class="admin-input" value="${escapeHtml(settings.siteTitle)}" required />
          </div>

          <div class="admin-form-group" style="margin-top: 1.25rem;">
            <label class="admin-label">Artist / Band Name</label>
            <input type="text" id="set-artist" class="admin-input" value="${escapeHtml(settings.artistName)}" required />
          </div>

          <div class="admin-form-group" style="margin-top: 1.25rem;">
            <label class="admin-label">Contact / Booking Email</label>
            <input type="email" id="set-email" class="admin-input" value="${escapeHtml(settings.contactEmail)}" required />
          </div>

          <div class="admin-form-group" style="margin-top: 1.5rem;">
            <label class="admin-checkbox-label">
              <input type="checkbox" id="set-maintenance" ${settings.maintenanceMode ? 'checked' : ''} />
              <span>Enable Maintenance Mode (System Notice)</span>
            </label>
          </div>

          <div style="margin-top: 2rem;">
            <button type="submit" class="admin-btn admin-btn-primary">SAVE SYSTEM SETTINGS</button>
            <span id="settings-saved-msg" class="admin-success-msg"></span>
          </div>
        </form>
      </main>
    </div>
  `;

  bindAdminNavEvents(container);

  const form = container.querySelector('#cms-settings-form');
  const msgEl = container.querySelector('#settings-saved-msg');

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const updated = {
        siteTitle: container.querySelector('#set-title').value,
        artistName: container.querySelector('#set-artist').value,
        contactEmail: container.querySelector('#set-email').value,
        maintenanceMode: container.querySelector('#set-maintenance').checked
      };

      saveSettings(updated);
      logActivity('SETTINGS UPDATED', 'CMS System settings updated');
      showAdminToast('✓ SYSTEM SETTINGS SAVED SUCCESSFULLY');

      if (msgEl) {
        msgEl.textContent = 'Settings saved successfully!';
        setTimeout(() => msgEl.textContent = '', 3000);
      }
    };
  }
}

/**
 * --------------------------------------------------------------------------
 * ABOUT PAGE CMS VIEW (/admin/about)
 * --------------------------------------------------------------------------
 */
function renderAdminAbout(container) {
  const aboutData = getAboutData();

  container.innerHTML = `
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${getAdminSidebarHTML('/admin/about')}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">About / WHØ CMS</h1>
            <p class="admin-page-desc">Manage Cinematic Slideshow Images & Editorial Bio Paragraphs</p>
          </div>
          <button id="btn-add-slide" class="admin-btn admin-btn-primary">+ ADD SLIDE IMAGE</button>
        </div>

        <div class="admin-content-section">
          <h2 class="admin-section-subtitle">CINEMATIC HERO SLIDESHOW (${aboutData.slides.length} SLIDES)</h2>
          <div class="admin-table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>PREVIEW</th>
                  <th>CAPTION</th>
                  <th>SLIDE ID</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                ${renderAboutSlideAdminRows(aboutData.slides)}
              </tbody>
            </table>
          </div>
        </div>

        <div class="admin-content-section" style="margin-top: 3rem;">
          <h2 class="admin-section-subtitle">EDITORIAL BIOGRAPHY PARAGRAPHS</h2>
          <form id="about-bio-form">
            <div class="admin-form-group">
              <textarea id="about-bio-textarea" class="admin-input" rows="10" required>${escapeHtml(aboutData.bioParagraphs.join('\n\n'))}</textarea>
            </div>
            <div style="margin-top: 1rem;">
              <button type="submit" class="admin-btn admin-btn-primary">SAVE BIOGRAPHY</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  `;

  bindAdminNavEvents(container);

  const addSlideBtn = container.querySelector('#btn-add-slide');
  if (addSlideBtn) addSlideBtn.onclick = () => openSlideModal(null, container);

  const editSlideBtns = container.querySelectorAll('.btn-edit-slide');
  editSlideBtns.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const slide = aboutData.slides.find(s => s.id === id);
      if (slide) openSlideModal(slide, container);
    };
  });

  const deleteSlideBtns = container.querySelectorAll('.btn-delete-slide');
  deleteSlideBtns.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      deleteSlide(id);
      logActivity('ABOUT SLIDE DELETED', `Deleted about slide ${id}`);
      showAdminToast('✓ SLIDE DELETED', 'danger');
      renderAdminAbout(container);
    };
  });

  const bioForm = container.querySelector('#about-bio-form');
  if (bioForm) {
    bioForm.onsubmit = (e) => {
      e.preventDefault();
      const rawText = container.querySelector('#about-bio-textarea').value;
      const paragraphs = rawText.split('\n\n').map(p => p.trim()).filter(Boolean);
      updateBioParagraphs(paragraphs);
      logActivity('ABOUT BIO UPDATED', 'Updated editorial biography text');
      showAdminToast('✓ EDITORIAL BIOGRAPHY SAVED');
      renderAdminAbout(container);
    };
  }
}

function renderAboutSlideAdminRows(slides) {
  if (slides.length === 0) {
    return `<tr><td colspan="4" class="admin-empty-cell">No slides in slideshow.</td></tr>`;
  }
  return slides.map(slide => `
    <tr>
      <td><img src="${slide.url}" class="admin-thumb-img" alt="Slide" /></td>
      <td><strong>${escapeHtml(slide.caption)}</strong></td>
      <td><code>${slide.id}</code></td>
      <td>
        <div class="admin-action-btns">
          <button class="admin-action-btn btn-edit-slide" data-id="${slide.id}">Edit</button>
          <button class="admin-action-btn btn-danger btn-delete-slide" data-id="${slide.id}">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openSlideModal(slideItem, rootContainer) {
  const isEdit = !!slideItem;
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'admin-modal-backdrop';

  modalOverlay.innerHTML = `
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">${isEdit ? 'EDIT SLIDE IMAGE' : 'ADD SLIDE IMAGE'}</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <form id="slide-form">
        <div class="admin-modal-body">
          <div class="admin-form-group">
            <label class="admin-label">Image URL*</label>
            <input type="url" id="slide-url" class="admin-input" value="${slideItem ? escapeHtml(slideItem.url) : ''}" required />
          </div>
          <div class="admin-form-group" style="margin-top: 1rem;">
            <label class="admin-label">Caption / Tagline*</label>
            <input type="text" id="slide-caption" class="admin-input" value="${slideItem ? escapeHtml(slideItem.caption) : ''}" required />
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">Cancel</button>
          <button type="submit" class="admin-btn admin-btn-primary">SAVE SLIDE</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modalOverlay);
  const closeModal = () => modalOverlay.remove();
  modalOverlay.querySelector('.admin-modal-close').onclick = closeModal;
  modalOverlay.querySelector('.admin-modal-cancel').onclick = closeModal;

  const form = modalOverlay.querySelector('#slide-form');
  form.onsubmit = (e) => {
    e.preventDefault();
    const url = modalOverlay.querySelector('#slide-url').value;
    const caption = modalOverlay.querySelector('#slide-caption').value;

    if (isEdit) {
      updateSlide(slideItem.id, { url, caption });
      logActivity('ABOUT SLIDE UPDATED', `Updated slide ${slideItem.id}`);
      showAdminToast('✓ SLIDE IMAGE SAVED');
    } else {
      addSlide({ url, caption });
      logActivity('ABOUT SLIDE CREATED', `Added new slide "${caption}"`);
      showAdminToast('✓ NEW SLIDE CREATED');
    }

    closeModal();
    renderAdminAbout(rootContainer);
  };
}

/**
 * --------------------------------------------------------------------------
 * SOCIAL LINKS CMS VIEW (/admin/socials)
 * --------------------------------------------------------------------------
 */
function renderAdminSocials(container) {
  const links = getSocialLinks();

  container.innerHTML = `
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${getAdminSidebarHTML('/admin/socials')}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">Social Links Management</h1>
            <p class="admin-page-desc">Manage Header & Footer Social Icons, Labels and External URLs</p>
          </div>
          <button id="btn-add-social" class="admin-btn admin-btn-primary">+ ADD SOCIAL LINK</button>
        </div>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>PLATFORM</th>
                <th>URL</th>
                <th>VISIBILITY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              ${renderSocialLinkAdminRows(links)}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `;

  bindAdminNavEvents(container);

  const addBtn = container.querySelector('#btn-add-social');
  if (addBtn) addBtn.onclick = () => openSocialModal(null, container);

  const editBtns = container.querySelectorAll('.btn-edit-social');
  editBtns.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const link = links.find(l => l.id === id);
      if (link) openSocialModal(link, container);
    };
  });

  const deleteBtns = container.querySelectorAll('.btn-delete-social');
  deleteBtns.forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      deleteSocialLink(id);
      logActivity('SOCIAL LINK DELETED', `Deleted social link ${id}`);
      showAdminToast('✓ SOCIAL LINK DELETED', 'danger');
      renderAdminSocials(container);
    };
  });
}

function renderSocialLinkAdminRows(links) {
  if (links.length === 0) {
    return `<tr><td colspan="4" class="admin-empty-cell">No social links configured.</td></tr>`;
  }
  return links.map(item => `
    <tr>
      <td><strong>${escapeHtml(item.platform)}</strong></td>
      <td><a href="${escapeHtml(item.url)}" target="_blank" class="admin-table-link">${escapeHtml(item.url)}</a></td>
      <td><span class="admin-badge ${item.visible !== false ? 'badge-active' : 'badge-muted'}">${item.visible !== false ? 'ACTIVE' : 'HIDDEN'}</span></td>
      <td>
        <div class="admin-action-btns">
          <button class="admin-action-btn btn-edit-social" data-id="${item.id}">Edit</button>
          <button class="admin-action-btn btn-danger btn-delete-social" data-id="${item.id}">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openSocialModal(item, rootContainer) {
  const isEdit = !!item;
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'admin-modal-backdrop';

  modalOverlay.innerHTML = `
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">${isEdit ? 'EDIT SOCIAL LINK' : 'ADD SOCIAL LINK'}</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <form id="social-form">
        <div class="admin-modal-body">
          <div class="admin-form-group">
            <label class="admin-label">Platform Name*</label>
            <input type="text" id="soc-platform" class="admin-input" value="${item ? escapeHtml(item.platform) : ''}" placeholder="e.g. Instagram" required />
          </div>
          <div class="admin-form-group" style="margin-top: 1rem;">
            <label class="admin-label">Full Profile URL*</label>
            <input type="url" id="soc-url" class="admin-input" value="${item ? escapeHtml(item.url) : ''}" placeholder="https://..." required />
          </div>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">Cancel</button>
          <button type="submit" class="admin-btn admin-btn-primary">SAVE SOCIAL LINK</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modalOverlay);
  const closeModal = () => modalOverlay.remove();
  modalOverlay.querySelector('.admin-modal-close').onclick = closeModal;
  modalOverlay.querySelector('.admin-modal-cancel').onclick = closeModal;

  const form = modalOverlay.querySelector('#social-form');
  form.onsubmit = (e) => {
    e.preventDefault();
    const platform = modalOverlay.querySelector('#soc-platform').value;
    const url = modalOverlay.querySelector('#soc-url').value;

    if (isEdit) {
      updateSocialLink(item.id, { platform, url });
      logActivity('SOCIAL LINK UPDATED', `Updated social link ${platform}`);
      showAdminToast('✓ SOCIAL LINK SAVED');
    } else {
      addSocialLink({ platform, url });
      logActivity('SOCIAL LINK CREATED', `Added social link ${platform}`);
      showAdminToast('✓ NEW SOCIAL LINK CREATED');
    }

    closeModal();
    renderAdminSocials(rootContainer);
  };
}

/**
 * General Delete Confirmation Modal Helper
 */
function openDeleteConfirmModal(item, type, rootContainer) {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'admin-modal-backdrop';

  const title = item.title || item.venue || item.name || 'Item';

  modalOverlay.innerHTML = `
    <div class="admin-modal">
      <div class="admin-modal-header">
        <h2 class="admin-modal-title">DELETE CONFIRMATION</h2>
        <button type="button" class="admin-modal-close">&times;</button>
      </div>
      <div class="admin-modal-body">
        <p>Are you sure you want to permanently delete ${type.toLowerCase()} <strong>"${escapeHtml(title)}"</strong>?</p>
        <p class="admin-sub-text" style="margin-top: 0.5rem;">This action will immediately update the public website.</p>
      </div>
      <div class="admin-modal-footer">
        <button type="button" class="admin-btn admin-btn-secondary admin-modal-cancel">Cancel</button>
        <button type="button" id="btn-confirm-delete" class="admin-btn admin-btn-danger">PERMANENTLY DELETE</button>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);
  const closeModal = () => modalOverlay.remove();
  modalOverlay.querySelector('.admin-modal-close').onclick = closeModal;
  modalOverlay.querySelector('.admin-modal-cancel').onclick = closeModal;

  modalOverlay.querySelector('#btn-confirm-delete').onclick = async () => {
    if (type === 'TOUR') {
      await deleteTourEvent(item.id);
      logActivity('TOUR EVENT DELETED', `Deleted tour event ${item.id}`);
      showAdminToast('✓ TOUR EVENT DELETED', 'danger');
      renderAdminTour(rootContainer);
    } else if (type === 'RELEASE') {
      deleteRelease(item.id);
      logActivity('RELEASE DELETED', `Deleted release "${title}"`);
      showAdminToast('✓ RELEASE DELETED', 'danger');
      renderAdminMusic(rootContainer);
    } else if (type === 'TRANSMISSION') {
      await deleteJournalEntry(item.id);
      logActivity('TRANSMISSION DELETED', `Deleted transmission "${title}"`);
      showAdminToast('✓ TRANSMISSION DELETED', 'danger');
      renderAdminUpdates(rootContainer);
    }
    closeModal();
  };
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Render Admin Footer Management Screen
 */
function renderAdminFooter(container) {
  const currentFooter = getFooterData();

  container.innerHTML = `
    <div class="admin-cms-layout">
      <div class="admin-mobile-header">
        <div class="admin-mobile-title">THE SINNERS CMS</div>
        <button id="admin-mobile-toggle-btn" class="admin-mobile-toggle">☰</button>
      </div>

      ${getAdminSidebarHTML('/admin/footer')}

      <main class="admin-main-content">
        <div class="admin-page-header">
          <div>
            <h1 class="admin-page-title">Footer Management</h1>
            <p class="admin-page-desc">Global Footer Record Label, Tagline, and Legal Copyright Text</p>
          </div>
        </div>

        <div class="admin-form-container">
          <form id="admin-footer-form" class="admin-form">
            <div class="admin-form-group">
              <label class="admin-label">RECORD LABEL LINE (LINE 1)</label>
              <input type="text" id="footer-line1-input" class="admin-input" value="${escapeHtml(currentFooter.line1)}" required placeholder="e.g. © DEVIL'S GRIN RECORDS 2026" />
              <p class="admin-input-help">Primary record label header line shown at the top of all footers.</p>
            </div>

            <div class="admin-form-group">
              <label class="admin-label">TAGLINE / QUOTE (LINE 2)</label>
              <textarea id="footer-line2-input" class="admin-textarea" rows="2" required placeholder="e.g. MADE OF SIN">${escapeHtml(currentFooter.line2)}</textarea>
              <p class="admin-input-help">Sub-header quote tagline shown directly under the record label line.</p>
            </div>

            <div class="admin-form-group">
              <label class="admin-label">COPYRIGHT HOLDER LINE (LINE 4)</label>
              <input type="text" id="footer-line4-input" class="admin-input" value="${escapeHtml(currentFooter.line4)}" required placeholder="e.g. © 2026 The Sinners" />
              <p class="admin-input-help">Legal copyright notice line shown above the Privacy & Terms links.</p>
            </div>

            <div class="admin-form-actions">
              <button type="submit" class="admin-btn admin-btn-primary">SAVE FOOTER SETTINGS</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  `;

  bindAdminNavEvents(container);

  const form = container.querySelector('#admin-footer-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const line1 = container.querySelector('#footer-line1-input').value.trim();
      const line2 = container.querySelector('#footer-line2-input').value.trim();
      const line4 = container.querySelector('#footer-line4-input').value.trim();

      updateFooterData({
        line1,
        line2,
        line4
      });

      logActivity('FOOTER UPDATED', `Updated record label "${line1}" & tagline`);
      showAdminToast('✓ FOOTER SETTINGS SAVED', 'success');
    });
  }
}
