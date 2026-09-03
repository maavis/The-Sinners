/**
 * THE SINNERS — SANGUIVORE VAULT (MERCH STORE ENGINE)
 * High-Animation Gothic Occult & Brutalist Merch Experience
 */
import {
  getProducts,
  getProductById,
  STORE_CATEGORIES,
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  getCartSummary,
  isMerchDataLoading
} from './data/merch.js';

let activeCategory = 'ALL';
let activeSearchQuery = '';
let selectedSizesMap = {}; // { [productId]: 'M' }
let activeDetailProductId = null;
let activeDetailSelectedSize = null;
let activeDetailQuantity = 1;
let activeDetailThumbIndex = 0;
let isCartOpen = false;
let isSearchOpen = false;

/**
 * Initialize and Mount Gothic Merch Store to container element
 */
export function mountMerchStore(container) {
  if (!container) return;

  renderStoreSkeleton(container);
  bindStoreGlobalEvents(container);
  renderProductGrid();
  updateCartBadgeUI();
  initHeaderScrollListener();
  init3DCardTiltEffect();

  window.addEventListener('store-products-updated', () => {
    renderProductGrid();
  });
}

/**
 * Render Store Skeleton Layout
 */
function renderStoreSkeleton(container) {
  container.innerHTML = `
    <!-- Gothic Occult Scanlines & Fog Background Atmosphere -->
    <div class="store-scanlines-overlay" aria-hidden="true"></div>
    <div class="gothic-store-ambient-fog" aria-hidden="true">
      <div class="gothic-fog-1"></div>
      <div class="gothic-fog-2"></div>
    </div>

    <!-- 1. GOTHIC STORE HEADER & NAVIGATION -->
    <header id="store-header" class="store-header">
      <div class="store-header-inner">
        <!-- Brand Group -->
        <div class="store-brand-group">
          <a href="/merch" class="store-brand-logo" data-store-route="/merch">
            <span class="gothic-sigil-icon">☠</span>
            <span class="gothic-brand-text">THE SINNERS</span>
            <span class="store-brand-badge">VAULT // FW26</span>
          </a>
          <a href="/" class="store-back-to-band" data-route="/">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            ANA SİTEYE DÖN
          </a>
        </div>

        <!-- Center Category Nav Links (Desktop) -->
        <ul class="store-nav-menu">
          <li><a class="store-nav-link ${activeCategory === 'ALL' ? 'active' : ''}" data-cat="ALL"><span class="gothic-nav-cross">†</span> TÜMÜ</a></li>
          <li><a class="store-nav-link ${activeCategory === 'T-SHIRTS' ? 'active' : ''}" data-cat="T-SHIRTS">TİŞÖRT</a></li>
          <li><a class="store-nav-link ${activeCategory === 'HOODIES' ? 'active' : ''}" data-cat="HOODIES">KAPÜŞONLU</a></li>
          <li><a class="store-nav-link ${activeCategory === 'VINYL' ? 'active' : ''}" data-cat="VINYL">12" PLAK</a></li>
          <li><a class="store-nav-link ${activeCategory === 'CASSETTES' ? 'active' : ''}" data-cat="CASSETTES">KASET</a></li>
          <li><a class="store-nav-link ${activeCategory === 'ACCESSORIES' ? 'active' : ''}" data-cat="ACCESSORIES">AKSESUAR</a></li>
        </ul>

        <!-- Right Utilities Group -->
        <div class="store-actions-group">
          <button id="store-search-trigger" class="store-action-btn" title="Ürün Ara">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>ARA</span>
          </button>
          <button id="store-cart-trigger" class="store-action-btn gothic-cart-btn" title="Sepeti Görüntüle">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span>SEPET</span>
            <span id="store-cart-count-badge" class="store-cart-badge">0</span>
          </button>
          <button id="store-mobile-menu-btn" class="store-mobile-toggle" aria-label="Menüyü Aç/Kapat">☰</button>
        </div>
      </div>
    </header>

    <!-- 2. HIGH-ANIMATION DUAL GOTHIC MARQUEE TICKERS -->
    <div class="gothic-marquee-container" aria-hidden="true">
      <div class="gothic-marquee-row gothic-marquee-forward">
        <div class="gothic-marquee-track">
          <span>⚡ THE SINNERS MERCH ARCHIVE ⚡ LIMITED ARTIFACTS ⚡ WORLDWIDE DISPATCH ⚡ SIN REIGN ⚡ HEAVYWEIGHT COTTON ⚡ DARKROOM PROOFS ⚡ TYPE II CHROME ⚡ MADE OF SIN ⚡</span>
          <span>⚡ THE SINNERS MERCH ARCHIVE ⚡ LIMITED ARTIFACTS ⚡ WORLDWIDE DISPATCH ⚡ SIN REIGN ⚡ HEAVYWEIGHT COTTON ⚡ DARKROOM PROOFS ⚡ TYPE II CHROME ⚡ MADE OF SIN ⚡</span>
        </div>
      </div>
      <div class="gothic-marquee-row gothic-marquee-reverse">
        <div class="gothic-marquee-track-rev">
          <span>☠ 180G VINYL PRESSINGS ☠ SANGUIVORE ERA ☠ NO COMPROMISE ☠ LIMITED EDITION ☠ HEAVYWEIGHT STREETWEAR ☠ ANALOG TAPE ☠ OCCULT DESIGNS ☠</span>
          <span>☠ 180G VINYL PRESSINGS ☠ SANGUIVORE ERA ☠ NO COMPROMISE ☠ LIMITED EDITION ☠ HEAVYWEIGHT STREETWEAR ☠ ANALOG TAPE ☠ OCCULT DESIGNS ☠</span>
        </div>
      </div>
    </div>

    <!-- 3. GOTHIC MASTHEAD & VAULT TITLE SECTION -->
    <section class="gothic-masthead-section">
      <div class="gothic-masthead-backdrop"></div>
      <div class="gothic-masthead-content">
        <div class="gothic-sigil-pulse">✦ ☩ ☠ ☩ ✦</div>
        <h1 class="gothic-masthead-glitch-title" data-text="SANGUIVORE VAULT">
          SANGUIVORE VAULT
        </h1>
        <div class="gothic-masthead-tech-strip">
          <span class="gothic-tech-item">[ FW26 OFFICIAL ARTIFACTS ]</span>
          <span class="gothic-tech-item">[ RAW HEAVYWEIGHT FABRIC ]</span>
          <span class="gothic-tech-item">[ 100% ANALOG MEDIA ]</span>
        </div>
      </div>
    </section>

    <!-- 4. GOTHIC BRUTALIST CATEGORY FILTER BAR -->
    <nav class="store-filter-bar" id="store-vitrine">
      <div class="store-filter-inner">
        <div class="store-categories-list">
          ${STORE_CATEGORIES.map(cat => `
            <button class="store-cat-pill gothic-pill ${activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
              <span class="gothic-pill-bullet">†</span>
              <span class="gothic-pill-label">${cat.label}</span>
            </button>
          `).join('')}
        </div>
        <div id="store-results-counter" class="store-results-count gothic-counter-badge">
          <span class="pulse-dot"></span>
          <span id="store-counter-text">8 ARTIFACT GÖSTERİLİYOR</span>
        </div>
      </div>
    </nav>

    <!-- 5. DYNAMIC PRODUCT VITRINE GRID -->
    <main class="store-main-layout">
      <div id="store-products-feed" class="store-product-grid">
        <!-- Dynamically rendered product cards with 3D and glitch states -->
      </div>
    </main>

    <!-- 6. HIGH-IMPACT LIMITED DROP GOTHIC BANNER -->
    <section class="store-drop-banner">
      <div class="store-drop-card gothic-drop-card">
        <div class="store-drop-content">
          <div class="gothic-blood-badge">[ SINIRLI ÖZEL SERİ // OCCULT DROP ]</div>
          <h2 class="store-drop-title gothic-dripping-title">MADE OF SIN</h2>
          <p class="store-drop-desc">
            Sanguivore kayıt dönemine özel 380gsm ağır gramajlı giysiler, asit yıkama efektleri ve Type II analog kasetler. Her parça numaralandırılmış koleksiyonluk prova negatifi içerir.
          </p>
          <div class="gothic-drop-actions">
            <button class="gothic-action-cta btn-drop-filter" data-cat="HOODIES">
              <span>SERİYİ İNCELE</span>
              <span class="gothic-cta-arrow">&rarr;</span>
            </button>
          </div>
        </div>
        <div class="store-drop-media">
          <div class="gothic-frame-decor"></div>
          <img src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80" alt="Made of Sin Koleksiyonu" class="store-drop-img" />
        </div>
      </div>
    </section>

    <!-- 7. INTERACTIVE PHYSICAL MEDIA COLLECTOR'S SECTION -->
    <section class="store-media-section">
      <div class="store-media-header">
        <div>
          <span class="gothic-media-tag">// ANALOG SOUND ARCHIVE</span>
          <h2 class="store-media-title gothic-serif-title">FİZİKSEL ALBÜMLER & BASKILAR</h2>
          <span class="store-media-sub">180G AĞIR PLAKLAR / KROM KASETLER / KARANLIK ODA PROVALARI</span>
        </div>
      </div>
      <div class="store-media-grid">
        <!-- Vinyl Interactive Spotlight -->
        <div class="store-media-card gothic-media-card vinyl-card-interactive">
          <div class="vinyl-sleeve-wrapper">
            <img src="https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80" alt="Plak Kapak" class="store-media-thumb vinyl-sleeve-img" />
            <div class="interactive-vinyl-disc" aria-hidden="true">
              <div class="vinyl-grooves"></div>
              <div class="vinyl-center-label">THE SINNERS</div>
            </div>
          </div>
          <div class="store-media-details">
            <span class="store-card-category gothic-tech-tag">12" GATEFOLD LP // 180G VINYL</span>
            <h3 class="store-card-title">THE SINNERS — MADE OF SIN</h3>
            <div class="store-card-price" style="margin-bottom: 0.75rem;">€35</div>
            <p style="font-size: 0.8rem; color: #8A8A8E; line-height: 1.6; margin-bottom: 1.5rem;">
              16 sayfalık büyük boy editoryal sanat kitapçığı ve karanlık oda negatif prova baskısı içeren, çift açılır kapaklı 180g ağır siyah plak baskısı.
            </p>
            <button class="store-quick-add-btn btn-view-product gothic-media-btn" data-product-id="prod_vinyl_maybe_sin" style="margin-top: auto;">
              <span>ÜRÜN DETAYINI AÇ</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
        
        <!-- Cassette Interactive Spotlight -->
        <div class="store-media-card gothic-media-card cassette-card-interactive">
          <div class="cassette-sleeve-wrapper">
            <img src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80" alt="Kaset" class="store-media-thumb" />
            <div class="cassette-tape-overlay">
              <div class="tape-reel reel-left"></div>
              <div class="tape-reel reel-right"></div>
            </div>
          </div>
          <div class="store-media-details">
            <span class="store-card-category gothic-tech-tag">LIMITED CASSETTE // TYPE II CHROME</span>
            <h3 class="store-card-title">THE SINNERS — MADE OF SIN</h3>
            <div class="store-card-price" style="margin-bottom: 0.75rem;">€18</div>
            <p style="font-size: 0.8rem; color: #8A8A8E; line-height: 1.6; margin-bottom: 1.5rem;">
              Dumanlı yarı şeffaf kabuk, yüksek dinamik aralıklı Type II Krom manyetik bant, elle mühürlenmiş ve 200 adet ile sınırlandırılmış özel fiziksel baskı.
            </p>
            <button class="store-quick-add-btn btn-view-product gothic-media-btn" data-product-id="prod_cassette_maybe_sin" style="margin-top: auto;">
              <span>ÜRÜN DETAYINI AÇ</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. GOTHIC STORE FOOTER -->
    <footer class="store-footer">
      <div class="store-footer-inner">
        <div>
          <div class="store-footer-brand-title">THE SINNERS</div>
          <div class="store-footer-brand-sub">RESMİ ÜRÜN VE KOLEKSİYON MAĞAZASI</div>
          <p style="font-size: 0.78rem; color: #777; max-width: 320px; line-height: 1.6; margin-top: 0.5rem;">
            Doğrudan müzik grubundan sokak giyimi, plaklar, kasetler ve resmi editoryal arşiv ürünleri.
          </p>
        </div>

        <div>
          <div class="store-footer-heading">MENÜ</div>
          <ul class="store-footer-links">
            <li><a class="store-footer-link" data-cat="ALL">TÜM ÜRÜNLER</a></li>
            <li><a class="store-footer-link" data-cat="T-SHIRTS">TİŞÖRT</a></li>
            <li><a class="store-footer-link" data-cat="HOODIES">KAPÜŞONLU</a></li>
            <li><a class="store-footer-link" data-cat="VINYL">FİZİKSEL ALBÜMLER</a></li>
          </ul>
        </div>

        <div>
          <div class="store-footer-heading">MÜŞTERİ HİZMETLERİ</div>
          <ul class="store-footer-links">
            <li><a href="#" class="store-footer-link btn-open-care-modal" data-type="shipping">KARGO VE TESLİMAT</a></li>
            <li><a href="#" class="store-footer-link btn-open-care-modal" data-type="returns">İADE VE DEĞİŞİM</a></li>
            <li><a href="#" class="store-footer-link btn-open-care-modal" data-type="sizeguide">BEDEN REHBERİ</a></li>
            <li><a href="mailto:orders@thesinners.com" class="store-footer-link">DESTEK VE İLETİŞİM</a></li>
          </ul>
        </div>

        <div>
          <div class="store-footer-heading">SOSYAL MEDYA</div>
          <ul class="store-footer-links">
            <li><a href="https://instagram.com" target="_blank" rel="noopener" class="store-footer-link">INSTAGRAM</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noopener" class="store-footer-link">YOUTUBE</a></li>
            <li><a href="https://soundloop.app" target="_blank" rel="noopener" class="store-footer-link">SOUNDLOOP</a></li>
            <li><a href="https://tiktok.com" target="_blank" rel="noopener" class="store-footer-link">TIKTOK</a></li>
          </ul>
        </div>
      </div>

      <div class="store-footer-bottom">
        <div>© 2026 THE SINNERS. TÜM HAKLARI SAKLIDIR.</div>
        <div class="gothic-footer-credo">UNDERGROUND SANAT & AYKIRI ESTETİK İÇİN ÜRETİLDİ</div>
      </div>
    </footer>

    <!-- 9. GOTHIC SLIDE-OVER CART DRAWER -->
    <div id="store-cart-drawer-backdrop" class="store-cart-drawer-backdrop" aria-hidden="true">
      <aside class="store-cart-drawer gothic-cart-drawer">
        <div class="store-cart-header">
          <div class="gothic-cart-header-title">
            <span class="gothic-cart-icon">☠</span>
            <h2 class="store-cart-title">SEPETİNİZ</h2>
          </div>
          <button id="store-cart-close-btn" class="store-cart-close" aria-label="Sepeti Kapat">&times;</button>
        </div>

        <div id="store-cart-items-feed" class="store-cart-items-list">
          <!-- Cart items rendered here -->
        </div>

        <div id="store-cart-footer-area" class="store-cart-footer">
          <!-- Cart totals and Checkout button -->
        </div>
      </aside>
    </div>

    <!-- 10. FULLSCREEN GOTHIC SEARCH OVERLAY -->
    <div id="store-search-overlay" class="store-search-overlay" aria-hidden="true">
      <div class="store-search-header">
        <h2 class="store-search-heading gothic-serif-title">MAĞAZA ARŞİVİNDE ARAYIN</h2>
        <button id="store-search-close-btn" class="store-search-close" aria-label="Aramayı Kapat">&times;</button>
      </div>
      <div class="store-search-input-wrapper">
        <input 
          type="text" 
          id="store-search-input-field" 
          class="store-search-input gothic-search-input" 
          placeholder="ÜRÜN, KATEGORİ VEYA KOLEKSİYON YAZIN..." 
          autocomplete="off" 
        />
      </div>
      <div id="store-search-results-feed" class="store-search-results-area">
        <!-- Live search results -->
      </div>
    </div>

    <!-- 11. PRODUCT DETAIL MODAL / QUICK VIEW -->
    <div id="store-detail-modal-backdrop" class="store-modal-backdrop" aria-hidden="true">
      <div id="store-detail-modal-content" class="store-detail-modal gothic-detail-modal">
        <!-- Rendered detail view -->
      </div>
    </div>

    <!-- 12. CHECKOUT PROTOTYPE CONFIRMATION MODAL -->
    <div id="store-checkout-modal-backdrop" class="store-checkout-modal-backdrop" aria-hidden="true">
      <div class="store-checkout-modal gothic-checkout-modal">
        <div class="store-checkout-icon">✓</div>
        <h2 class="store-checkout-title gothic-serif-title">SİPARİŞ ÖNİZLEMESİ HAZIR</h2>
        <p class="store-checkout-text">
          The Sinners Vault Mağazasını ziyaret ettiğiniz için teşekkürler! Sepetinizdeki ürünler başarıyla doğrulandı, vergi ve kargo detayları hesaplandı.
        </p>
        <div id="store-checkout-summary-box" class="gothic-checkout-summary"></div>
        <button id="store-checkout-modal-close" class="gothic-action-cta" style="width:100%;">ALIŞVERİŞE DEVAM ET</button>
      </div>
    </div>

    <!-- TOAST CONTAINER -->
    <div id="store-toast-container" class="store-toast-container"></div>
  `;
}

/**
 * Render Product Grid Based on Category and Search Query
 */
function renderProductGrid() {
  const feed = document.getElementById('store-products-feed');
  const counter = document.getElementById('store-counter-text');
  if (!feed) return;

  if (isMerchDataLoading()) {
    if (counter) counter.textContent = 'YÜKLENİYOR...';
    feed.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 5rem 2rem; color: rgba(255,255,255,0.4); font-family: monospace; font-size: 0.85rem; letter-spacing: 0.15em;">
        // VAULT MAĞAZA ARŞİVİ VE ÜRÜNLER YÜKLENİYOR...
      </div>
    `;
    return;
  }

  const allProducts = getProducts();

  const filtered = allProducts.filter(p => {
    const matchCat = activeCategory === 'ALL' || p.category === activeCategory;
    const matchSearch = !activeSearchQuery || 
      p.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      (p.tagline && p.tagline.toLowerCase().includes(activeSearchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  if (counter) {
    counter.textContent = `${filtered.length} ARTIFACT GÖSTERİLİYOR`;
  }

  if (filtered.length === 0) {
    feed.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 5rem 2rem; color: #8A8A8E;">
        <p style="font-size: 0.9rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.5rem;">ARAMANIZLA EŞLEŞEN ÜRÜN BULUNAMADI</p>
        <button class="store-cat-pill gothic-pill active" id="btn-reset-filters">TÜM ÜRÜNLERİ GÖSTER</button>
      </div>
    `;
    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.onclick = () => {
        activeCategory = 'ALL';
        activeSearchQuery = '';
        updateCategoryPillsUI();
        renderProductGrid();
      };
    }
    return;
  }

  feed.innerHTML = filtered.map(prod => {
    const selectedSize = selectedSizesMap[prod.id] || prod.defaultSize || (prod.sizes[0] ? prod.sizes[0].size : 'STANDART');
    const isSoldOut = prod.stockStatus === 'SOLD_OUT';
    const isLowStock = prod.stockStatus === 'LOW_STOCK';

    let badgeHTML = '';
    if (isSoldOut) {
      badgeHTML = `<span class="store-card-badge badge-sold">☠ TÜKENDİ</span>`;
    } else if (isLowStock) {
      badgeHTML = `<span class="store-card-badge badge-low">⚡ ${prod.stockLabel || 'SON ADETLER'}</span>`;
    } else {
      badgeHTML = `<span class="store-card-badge badge-live">● STOKTA</span>`;
    }

    const sizesHTML = (prod.sizes || []).map(s => {
      const isSelected = selectedSize === s.size;
      const isDisabled = !s.available;
      return `
        <button 
          type="button" 
          class="store-size-btn ${isSelected ? 'selected' : ''}" 
          data-product-id="${prod.id}" 
          data-size="${s.size}" 
          ${isDisabled ? 'disabled title="Tükendi"' : ''}
        >
          ${s.size}
        </button>
      `;
    }).join('');

    return `
      <article class="store-card gothic-product-card" data-product-id="${prod.id}">
        <!-- Media / Images with Glitch & 3D Layer -->
        <div class="store-card-media btn-open-detail" data-product-id="${prod.id}">
          <div class="gothic-card-corner tl"></div>
          <div class="gothic-card-corner tr"></div>
          <div class="gothic-card-corner bl"></div>
          <div class="gothic-card-corner br"></div>
          ${badgeHTML}
          <div class="gothic-spec-stamp">[ ${prod.category} ]</div>
          <img src="${prod.primaryImage}" alt="${escapeHtml(prod.name)}" class="store-card-img" loading="lazy" />
          ${prod.secondaryImage ? `<img src="${prod.secondaryImage}" alt="${escapeHtml(prod.name)}" class="store-card-img store-card-img-secondary" loading="lazy" />` : ''}
          <div class="gothic-scanline-glitch-layer" aria-hidden="true"></div>
        </div>

        <!-- Info Area -->
        <div class="store-card-info">
          <div class="gothic-card-cat-row">
            <span class="store-card-category">${prod.category}</span>
            <span class="gothic-fw-tag">FW26 // RAW</span>
          </div>
          <h3 class="store-card-title btn-open-detail" data-product-id="${prod.id}">${escapeHtml(prod.name)}</h3>
          
          <div class="store-card-price-row">
            <span class="store-card-price">${prod.currency}${prod.price}</span>
            <span class="gothic-stock-meta">${prod.stockLabel}</span>
          </div>

          <!-- Size Selector -->
          ${prod.sizes && prod.sizes.length > 1 ? `
            <div class="store-card-sizes">
              ${sizesHTML}
            </div>
          ` : '<div style="margin-bottom: 0.5rem;"></div>'}

          <!-- Quick Add Button with Blood Glow -->
          <div class="store-card-actions">
            <button 
              type="button" 
              class="store-quick-add-btn btn-quick-add gothic-quick-add" 
              data-product-id="${prod.id}" 
              ${isSoldOut ? 'disabled' : ''}
            >
              <span>${isSoldOut ? 'TÜKENDİ' : '+ SEPETE EKLE'}</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * 3D Card Tilt Micro-Animation on Mouse Move
 */
function init3DCardTiltEffect() {
  const container = document.getElementById('store-products-feed');
  if (!container) return;

  container.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.gothic-product-card');
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  container.addEventListener('mouseleave', (e) => {
    const cards = container.querySelectorAll('.gothic-product-card');
    cards.forEach(c => {
      c.style.transform = '';
    });
  }, true);
}

/**
 * Render Full Product Detail View Modal
 */
function openProductDetailModal(productId) {
  const prod = getProductById(productId);
  if (!prod) return;

  activeDetailProductId = productId;
  activeDetailSelectedSize = selectedSizesMap[productId] || prod.defaultSize || (prod.sizes[0] ? prod.sizes[0].size : 'STANDART');
  activeDetailQuantity = 1;
  activeDetailThumbIndex = 0;

  const modalContainer = document.getElementById('store-detail-modal-content');
  const backdrop = document.getElementById('store-detail-modal-backdrop');
  if (!modalContainer || !backdrop) return;

  const galleryImages = prod.gallery && prod.gallery.length > 0 ? prod.gallery : [prod.primaryImage, prod.secondaryImage].filter(Boolean);

  modalContainer.innerHTML = `
    <button id="store-detail-close-btn" class="store-modal-close-btn" aria-label="Ürün Detayını Kapat">&times;</button>
    
    <!-- LEFT: GALLERY -->
    <div class="store-detail-gallery">
      <div class="detail-main-img-wrap">
        <img id="detail-active-img" src="${galleryImages[0]}" alt="${escapeHtml(prod.name)}" class="store-detail-main-img" />
        <div class="gothic-scanline-glitch-layer"></div>
      </div>
      
      ${galleryImages.length > 1 ? `
        <div class="store-detail-thumbnails">
          ${galleryImages.map((img, idx) => `
            <button type="button" class="store-thumb-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" data-img="${img}">
              <img src="${img}" alt="Görsel ${idx + 1}" />
            </button>
          `).join('')}
        </div>
      ` : ''}
    </div>

    <!-- RIGHT: INFORMATION & PURCHASING -->
    <div class="store-detail-info">
      <span class="store-detail-season">${prod.season || 'SONBAHAR/KIŞ 2026 // VAULT EDITION'}</span>
      <h1 class="store-detail-title gothic-serif-title">${escapeHtml(prod.name)}</h1>
      <div class="store-detail-price">${prod.currency}${prod.price} <span style="font-size:0.75rem; color:#888; font-weight:normal; letter-spacing:0.1em; margin-left:0.5rem;">KDV DAHİLDİR</span></div>
      
      <p class="store-detail-short-desc">${escapeHtml(prod.description)}</p>

      <!-- SIZES -->
      <div class="store-detail-size-section">
        <div class="store-section-label">
          <span>BEDEN SEÇİN</span>
          <span style="color:#fff; font-weight:bold;">${activeDetailSelectedSize}</span>
        </div>
        <div class="store-detail-size-grid">
          ${(prod.sizes || []).map(s => `
            <button 
              type="button" 
              class="store-detail-size-pill ${activeDetailSelectedSize === s.size ? 'selected' : ''}" 
              data-size="${s.size}" 
              ${!s.available ? 'disabled' : ''}
            >
              ${s.size}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- QUANTITY & ADD TO CART -->
      <div class="store-detail-purchase-row">
        <div class="store-qty-stepper">
          <button type="button" id="detail-qty-minus" class="store-qty-btn">−</button>
          <span id="detail-qty-display" class="store-qty-val">1</span>
          <button type="button" id="detail-qty-plus" class="store-qty-btn">+</button>
        </div>

        <button 
          type="button" 
          id="detail-add-cart-btn" 
          class="store-detail-add-btn gothic-action-cta" 
          ${prod.stockStatus === 'SOLD_OUT' ? 'disabled' : ''}
        >
          <span>${prod.stockStatus === 'SOLD_OUT' ? 'TÜKENDİ' : 'SEPETE EKLE +'}</span>
        </button>
      </div>

      <!-- ACCORDION INFORMATION -->
      <div class="store-accordions">
        <div class="store-accordion-item is-open">
          <button type="button" class="store-accordion-header">
            <span>ÜRÜN ÖZELLİKLERİ VE MATERYAL</span>
            <span class="acc-symbol">+</span>
          </button>
          <div class="store-accordion-content" style="display:block;">
            <p>${escapeHtml(prod.material)}</p>
            <p style="margin-top:0.5rem; color:#aaa;">${escapeHtml(prod.tagline || '')}</p>
          </div>
        </div>

        <div class="store-accordion-item">
          <button type="button" class="store-accordion-header">
            <span>BEDEN VE KALIP REHBERİ</span>
            <span class="acc-symbol">+</span>
          </button>
          <div class="store-accordion-content">
            <p>${escapeHtml(prod.sizeGuide)}</p>
          </div>
        </div>

        <div class="store-accordion-item">
          <button type="button" class="store-accordion-header">
            <span>KARGO VE TESLİMAT BİLGİSİ</span>
            <span class="acc-symbol">+</span>
          </button>
          <div class="store-accordion-content">
            <p>${escapeHtml(prod.shippingInfo)}</p>
          </div>
        </div>

        <div class="store-accordion-item">
          <button type="button" class="store-accordion-header">
            <span>İADE VE DEĞİŞİM KOŞULLARI</span>
            <span class="acc-symbol">+</span>
          </button>
          <div class="store-accordion-content">
            <p>${escapeHtml(prod.returnsInfo)}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind Detail Modal Inner Events
  const closeBtn = modalContainer.querySelector('#store-detail-close-btn');
  if (closeBtn) closeBtn.onclick = closeProductDetailModal;

  // Thumbnail clicks
  modalContainer.querySelectorAll('.store-thumb-btn').forEach(btn => {
    btn.onclick = () => {
      const src = btn.getAttribute('data-img');
      const mainImg = modalContainer.querySelector('#detail-active-img');
      if (mainImg && src) {
        mainImg.src = src;
        modalContainer.querySelectorAll('.store-thumb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    };
  });

  // Size pills
  modalContainer.querySelectorAll('.store-detail-size-pill').forEach(btn => {
    btn.onclick = () => {
      activeDetailSelectedSize = btn.getAttribute('data-size');
      selectedSizesMap[productId] = activeDetailSelectedSize;
      modalContainer.querySelectorAll('.store-detail-size-pill').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const labelVal = modalContainer.querySelector('.store-section-label span:last-child');
      if (labelVal) labelVal.textContent = activeDetailSelectedSize;
    };
  });

  // Quantity Stepper
  const qtyMinus = modalContainer.querySelector('#detail-qty-minus');
  const qtyPlus = modalContainer.querySelector('#detail-qty-plus');
  const qtyDisplay = modalContainer.querySelector('#detail-qty-display');

  if (qtyMinus && qtyPlus && qtyDisplay) {
    qtyMinus.onclick = () => {
      if (activeDetailQuantity > 1) {
        activeDetailQuantity--;
        qtyDisplay.textContent = activeDetailQuantity;
      }
    };
    qtyPlus.onclick = () => {
      if (activeDetailQuantity < 10) {
        activeDetailQuantity++;
        qtyDisplay.textContent = activeDetailQuantity;
      }
    };
  }

  // Add to Cart
  const addBtn = modalContainer.querySelector('#detail-add-cart-btn');
  if (addBtn) {
    addBtn.onclick = () => {
      addToCart(prod.id, activeDetailSelectedSize, activeDetailQuantity);
      showStoreToast(`"${prod.name}" (${activeDetailSelectedSize}) sepete eklendi.`);
      closeProductDetailModal();
      openCartDrawer();
    };
  }

  // Accordion Toggle
  modalContainer.querySelectorAll('.store-accordion-header').forEach(header => {
    header.onclick = () => {
      const item = header.closest('.store-accordion-item');
      if (item) {
        const isOpen = item.classList.contains('is-open');
        const content = item.querySelector('.store-accordion-content');
        if (isOpen) {
          item.classList.remove('is-open');
          if (content) content.style.display = 'none';
        } else {
          item.classList.add('is-open');
          if (content) content.style.display = 'block';
        }
      }
    };
  });

  backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeProductDetailModal() {
  const backdrop = document.getElementById('store-detail-modal-backdrop');
  if (backdrop) backdrop.classList.remove('is-open');
  document.body.style.overflow = '';
}

/**
 * Slide-Over Cart Drawer Controller
 */
function openCartDrawer() {
  isCartOpen = true;
  const backdrop = document.getElementById('store-cart-drawer-backdrop');
  if (backdrop) {
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    renderCartDrawer();
  }
}

function closeCartDrawer() {
  isCartOpen = false;
  const backdrop = document.getElementById('store-cart-drawer-backdrop');
  if (backdrop) {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

function renderCartDrawer() {
  const feed = document.getElementById('store-cart-items-feed');
  const footerArea = document.getElementById('store-cart-footer-area');
  if (!feed || !footerArea) return;

  const cart = getCart();
  const summary = getCartSummary();

  if (cart.length === 0) {
    feed.innerHTML = `
      <div class="store-cart-empty">
        <div class="gothic-empty-cross">☠</div>
        <p class="store-cart-empty-text">SEPETİNİZDE HENÜZ ÜRÜN BULUNMUYOR</p>
        <button class="gothic-action-cta" id="btn-cart-empty-browse" style="margin-top:1.5rem;">
          <span>ARŞİVİ KEŞFET</span>
        </button>
      </div>
    `;
    footerArea.innerHTML = '';
    const browseBtn = document.getElementById('btn-cart-empty-browse');
    if (browseBtn) {
      browseBtn.onclick = () => {
        closeCartDrawer();
      };
    }
    return;
  }

  feed.innerHTML = cart.map(item => {
    return `
      <div class="store-cart-item gothic-cart-item" data-cart-key="${item.id}-${item.size}">
        <img src="${item.primaryImage}" alt="${escapeHtml(item.name)}" class="store-cart-item-img" />
        
        <div class="store-cart-item-info">
          <div class="store-cart-item-title">${escapeHtml(item.name)}</div>
          <div class="store-cart-item-meta">BEDEN: <strong>${item.size}</strong> • ${item.currency}${item.price}</div>
          
          <div class="store-cart-item-controls">
            <div class="store-qty-stepper-sm">
              <button type="button" class="btn-cart-qty-minus" data-id="${item.id}" data-size="${item.size}">−</button>
              <span class="store-qty-val-sm">${item.quantity}</span>
              <button type="button" class="btn-cart-qty-plus" data-id="${item.id}" data-size="${item.size}">+</button>
            </div>
            
            <button type="button" class="store-cart-remove-btn btn-cart-remove" data-id="${item.id}" data-size="${item.size}">
              SİL
            </button>
          </div>
        </div>

        <div class="store-cart-item-total">
          ${item.currency}${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    `;
  }).join('');

  footerArea.innerHTML = `
    <div class="store-cart-summary-line">
      <span>ARA TOPLAM</span>
      <span>€${summary.subtotal.toFixed(2)}</span>
    </div>
    <div class="store-cart-summary-line">
      <span>TAHMİNİ KARGO</span>
      <span>${summary.shipping === 0 ? '<strong style="color:#d92b2b;">ÜCRETSİZ</strong>' : '€' + summary.shipping.toFixed(2)}</span>
    </div>
    <div class="store-cart-summary-line total-line">
      <span>GENEL TOPLAM</span>
      <span class="gothic-cart-total">€${summary.total.toFixed(2)}</span>
    </div>
    <button id="btn-start-checkout" class="gothic-action-cta" style="width:100%; margin-top:1rem;">
      <span>ÖDEMEYE GEÇ (CHECKOUT)</span>
      <span>&rarr;</span>
    </button>
  `;

  // Bind Steppers & Remove
  feed.querySelectorAll('.btn-cart-qty-minus').forEach(b => {
    b.onclick = () => {
      const id = b.getAttribute('data-id');
      const size = b.getAttribute('data-size');
      const item = cart.find(x => x.id === id || (x.productId === id && x.size === size));
      if (item) {
        updateCartQuantity(item.id || id, size, item.quantity - 1);
        renderCartDrawer();
        updateCartBadgeUI();
      }
    };
  });

  feed.querySelectorAll('.btn-cart-qty-plus').forEach(b => {
    b.onclick = () => {
      const id = b.getAttribute('data-id');
      const size = b.getAttribute('data-size');
      const item = cart.find(x => x.id === id || (x.productId === id && x.size === size));
      if (item) {
        updateCartQuantity(item.id || id, size, item.quantity + 1);
        renderCartDrawer();
        updateCartBadgeUI();
      }
    };
  });

  feed.querySelectorAll('.btn-cart-remove').forEach(b => {
    b.onclick = () => {
      const id = b.getAttribute('data-id');
      const size = b.getAttribute('data-size');
      removeFromCart(id, size);
      showStoreToast('✓ ÜRÜN SEPETTEN ÇIKARILDI');
      renderCartDrawer();
      updateCartBadgeUI();
    };
  });

  const checkoutBtn = footerArea.querySelector('#btn-start-checkout');
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      closeCartDrawer();
      openCheckoutConfirmationModal();
    };
  }
}

/**
 * Open Checkout Confirmation Modal
 */
function openCheckoutConfirmationModal() {
  const backdrop = document.getElementById('store-checkout-modal-backdrop');
  const summaryBox = document.getElementById('store-checkout-summary-box');
  if (!backdrop || !summaryBox) return;

  const cart = getCart();
  const summary = getCartSummary();

  summaryBox.innerHTML = `
    <div style="font-weight:bold; margin-bottom:0.75rem; color:#fff; font-family:var(--font-serif-editorial); letter-spacing:0.1em;">SEPET DETAYLARI (${summary.totalItems} PARÇA)</div>
    ${cart.map(i => `
      <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem; color:#aaa;">
        <span>${escapeHtml(i.name)} (${i.size}) x${i.quantity}</span>
        <span>€${(i.price * i.quantity).toFixed(2)}</span>
      </div>
    `).join('')}
    <div style="border-top:1px solid rgba(255,255,255,0.1); margin-top:0.75rem; padding-top:0.75rem; display:flex; justify-content:space-between; font-weight:bold; color:#d92b2b;">
      <span>ÖDENECEK TOPLAM</span>
      <span>€${summary.total.toFixed(2)}</span>
    </div>
  `;

  backdrop.classList.add('is-open');
}

/**
 * Fullscreen Search Overlay Controller
 */
function openSearchOverlay() {
  isSearchOpen = true;
  const overlay = document.getElementById('store-search-overlay');
  const input = document.getElementById('store-search-input-field');
  if (overlay) {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (input) {
      input.value = activeSearchQuery;
      input.focus();
      renderSearchResults(activeSearchQuery);
    }
  }
}

function closeSearchOverlay() {
  isSearchOpen = false;
  const overlay = document.getElementById('store-search-overlay');
  if (overlay) {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

function renderSearchResults(query) {
  const feed = document.getElementById('store-search-results-feed');
  if (!feed) return;

  const q = (query || '').toLowerCase().trim();
  if (!q) {
    feed.innerHTML = `
      <div style="color:#666; font-size:0.85rem; letter-spacing:0.1em; text-align:center; padding:3rem 0;">
        // ARAMAK İSTEDİĞİNİZ ÜRÜN VEYA KATEGORİ ADINI GİRİN
      </div>
    `;
    return;
  }

  const allProducts = getProducts();
  const results = allProducts.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.tagline && p.tagline.toLowerCase().includes(q))
  );

  if (results.length === 0) {
    feed.innerHTML = `
      <div style="color:#888; font-size:0.85rem; letter-spacing:0.1em; text-align:center; padding:3rem 0;">
        "${escapeHtml(query)}" İLE EŞLEŞEN ÜRÜN BULUNAMADI.
      </div>
    `;
    return;
  }

  feed.innerHTML = `
    <div class="store-search-grid">
      ${results.map(prod => `
        <div class="store-search-card btn-open-detail" data-product-id="${prod.id}">
          <img src="${prod.primaryImage}" alt="${escapeHtml(prod.name)}" class="store-search-thumb" />
          <div class="store-search-meta">
            <span style="font-size:0.65rem; color:#888; letter-spacing:0.15em;">${prod.category}</span>
            <h4 style="font-size:0.9rem; color:#fff; margin:0.25rem 0;">${escapeHtml(prod.name)}</h4>
            <div style="color:#d92b2b; font-weight:bold; font-size:0.85rem;">${prod.currency}${prod.price}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  feed.querySelectorAll('.store-search-card').forEach(card => {
    card.onclick = () => {
      const id = card.getAttribute('data-product-id');
      closeSearchOverlay();
      openProductDetailModal(id);
    };
  });
}

/**
 * Open Customer Care Info Modal
 */
function openCareModal(type) {
  let title = 'MÜŞTERİ HİZMETLERİ';
  let content = '';

  if (type === 'shipping') {
    title = 'KARGO VE TESLİMAT POLİTİKASI';
    content = `
      <p>The Sinners resmi siparişleri özel mühürlü kutularda tüm dünyaya gönderilmektedir.</p>
      <ul style="margin-top:0.75rem; padding-left:1.25rem; line-height:1.8; color:#bbb;">
        <li><strong>Türkiye İçi:</strong> 1-3 iş günü (Yurtiçi Kargo güvencesiyle). 50€ üzeri siparişlerde kargo ücretsizdir.</li>
        <li><strong>Avrupa:</strong> 3-6 iş günü (DHL Express Tracking).</li>
        <li><strong>Dünya Geneli:</strong> 5-10 iş günü.</li>
      </ul>
    `;
  } else if (type === 'returns') {
    title = 'İADE VE DEĞİŞİM KOŞULLARI';
    content = `
      <p>Siparişinizi teslim aldığınız tarihten itibaren 14 gün içerisinde iade veya değişim hakkınız bulunmaktadır.</p>
      <p style="margin-top:0.5rem; color:#bbb;">Ürünlerin orijinal etiketlerinin sökülmemiş, kullanılmamış ve hasarsız olması gerekmektedir. Plak ve kaset gibi analog medya ürünlerinde koruma bandı açılmamış olmalıdır.</p>
    `;
  } else if (type === 'sizeguide') {
    title = 'BEDEN VE KALIP REHBERİ';
    content = `
      <p>The Sinners sokak giyimi ve editoryal koleksiyonları özel <strong>Custom Oversize</strong> kalıptır.</p>
      <table style="width:100%; border-collapse:collapse; margin-top:1rem; font-size:0.8rem; color:#ccc;">
        <thead>
          <tr style="border-bottom:1px solid #333; text-align:left;">
            <th style="padding:0.5rem;">Beden</th>
            <th style="padding:0.5rem;">Göğüs (cm)</th>
            <th style="padding:0.5rem;">Boy (cm)</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid #222;"><td style="padding:0.5rem;">S</td><td style="padding:0.5rem;">58 cm</td><td style="padding:0.5rem;">72 cm</td></tr>
          <tr style="border-bottom:1px solid #222;"><td style="padding:0.5rem;">M</td><td style="padding:0.5rem;">61 cm</td><td style="padding:0.5rem;">74 cm</td></tr>
          <tr style="border-bottom:1px solid #222;"><td style="padding:0.5rem;">L</td><td style="padding:0.5rem;">64 cm</td><td style="padding:0.5rem;">76 cm</td></tr>
          <tr><td style="padding:0.5rem;">XL</td><td style="padding:0.5rem;">67 cm</td><td style="padding:0.5rem;">78 cm</td></tr>
        </tbody>
      </table>
    `;
  }

  const modalContainer = document.getElementById('store-detail-modal-content');
  const backdrop = document.getElementById('store-detail-modal-backdrop');
  if (!modalContainer || !backdrop) return;

  modalContainer.innerHTML = `
    <button id="store-detail-close-btn" class="store-modal-close-btn" aria-label="Kapat">&times;</button>
    <div style="padding: 2.5rem; max-width:600px; margin:0 auto;">
      <h2 style="font-family:var(--font-serif-editorial); font-size:1.3rem; letter-spacing:0.1em; color:#fff; margin-bottom:1.5rem;">${title}</h2>
      <div style="font-size:0.85rem; line-height:1.7; color:#aaa;">${content}</div>
      <button class="gothic-action-cta" id="btn-close-care" style="margin-top:2rem; width:100%;">ANLADIM</button>
    </div>
  `;

  const closeBtn = modalContainer.querySelector('#store-detail-close-btn');
  const btnCloseCare = modalContainer.querySelector('#btn-close-care');
  if (closeBtn) closeBtn.onclick = closeProductDetailModal;
  if (btnCloseCare) btnCloseCare.onclick = closeProductDetailModal;

  backdrop.classList.add('is-open');
}

/**
 * Toast Feedback Notification
 */
function showStoreToast(message) {
  const container = document.getElementById('store-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'store-toast gothic-toast';
  toast.innerHTML = `
    <span class="store-toast-icon">☠</span>
    <span class="store-toast-msg">${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

/**
 * Update Cart Badge Counters
 */
function updateCartBadgeUI() {
  const badge = document.getElementById('store-cart-count-badge');
  const summary = getCartSummary();
  if (badge) {
    badge.textContent = summary.totalItems;
    badge.style.display = summary.totalItems > 0 ? 'inline-flex' : 'none';
    
    // Animate badge pulse
    badge.classList.remove('badge-pop');
    void badge.offsetWidth; // trigger reflow
    badge.classList.add('badge-pop');
  }
}

/**
 * Update Filter Pills UI
 */
function updateCategoryPillsUI() {
  const pills = document.querySelectorAll('.store-cat-pill');
  pills.forEach(p => {
    const cat = p.getAttribute('data-cat');
    if (cat === activeCategory) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  const navLinks = document.querySelectorAll('.store-nav-link');
  navLinks.forEach(l => {
    const cat = l.getAttribute('data-cat');
    if (cat === activeCategory) {
      l.classList.add('active');
    } else {
      l.classList.remove('active');
    }
  });
}

/**
 * Sticky Header Scroll Observer
 */
function initHeaderScrollListener() {
  const header = document.getElementById('store-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });
}

/**
 * Bind Delegated Global Events for Store
 */
function bindStoreGlobalEvents(container) {
  // Category Pill Clicks
  container.addEventListener('click', (e) => {
    const catBtn = e.target.closest('.store-cat-pill, .store-nav-link, .store-footer-link');
    if (catBtn && catBtn.hasAttribute('data-cat')) {
      e.preventDefault();
      activeCategory = catBtn.getAttribute('data-cat');
      activeSearchQuery = '';
      updateCategoryPillsUI();
      renderProductGrid();

      const vitrine = document.getElementById('store-vitrine');
      if (vitrine && catBtn.classList.contains('store-footer-link')) {
        vitrine.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Drop filter button
    const dropBtn = e.target.closest('.btn-drop-filter');
    if (dropBtn && dropBtn.hasAttribute('data-cat')) {
      activeCategory = dropBtn.getAttribute('data-cat');
      updateCategoryPillsUI();
      renderProductGrid();
      const vitrine = document.getElementById('store-vitrine');
      if (vitrine) vitrine.scrollIntoView({ behavior: 'smooth' });
    }

    // Care Modal Openers
    const careBtn = e.target.closest('.btn-open-care-modal');
    if (careBtn) {
      e.preventDefault();
      const type = careBtn.getAttribute('data-type');
      openCareModal(type);
    }

    // Size Selector on Cards
    const sizeBtn = e.target.closest('.store-size-btn');
    if (sizeBtn) {
      const prodId = sizeBtn.getAttribute('data-product-id');
      const size = sizeBtn.getAttribute('data-size');
      selectedSizesMap[prodId] = size;
      const card = sizeBtn.closest('.store-card');
      if (card) {
        card.querySelectorAll('.store-size-btn').forEach(b => b.classList.remove('selected'));
        sizeBtn.classList.add('selected');
      }
    }

    // Quick Add on Cards
    const quickAddBtn = e.target.closest('.btn-quick-add');
    if (quickAddBtn) {
      const prodId = quickAddBtn.getAttribute('data-product-id');
      const prod = getProductById(prodId);
      if (prod && prod.stockStatus !== 'SOLD_OUT') {
        const size = selectedSizesMap[prodId] || prod.defaultSize || (prod.sizes[0] ? prod.sizes[0].size : 'STANDART');
        addToCart(prodId, size, 1);
        showStoreToast(`"${prod.name}" (${size}) sepete eklendi.`);
        updateCartBadgeUI();
        openCartDrawer();
      }
    }

    // Open Product Detail Modal
    const detailTrigger = e.target.closest('.btn-open-detail, .btn-view-product');
    if (detailTrigger) {
      const prodId = detailTrigger.getAttribute('data-product-id');
      if (prodId) openProductDetailModal(prodId);
    }

    // Open Cart Drawer
    const cartTrigger = e.target.closest('#store-cart-trigger');
    if (cartTrigger) {
      openCartDrawer();
    }

    // Close Cart Drawer
    const cartClose = e.target.closest('#store-cart-close-btn');
    if (cartClose) {
      closeCartDrawer();
    }

    // Open Search
    const searchTrigger = e.target.closest('#store-search-trigger');
    if (searchTrigger) {
      openSearchOverlay();
    }

    // Close Search
    const searchClose = e.target.closest('#store-search-close-btn');
    if (searchClose) {
      closeSearchOverlay();
    }

    // Mobile Menu Toggle
    const mobMenuBtn = e.target.closest('#store-mobile-menu-btn');
    if (mobMenuBtn) {
      const navMenu = container.querySelector('.store-nav-menu');
      if (navMenu) {
        navMenu.classList.toggle('mobile-open');
      }
    }

    // Close Checkout Modal
    const checkoutClose = e.target.closest('#store-checkout-modal-close');
    if (checkoutClose) {
      const backdrop = document.getElementById('store-checkout-modal-backdrop');
      if (backdrop) backdrop.classList.remove('is-open');
    }
  });

  // Search Live Typing
  const searchInput = container.querySelector('#store-search-input-field');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearchQuery = e.target.value;
      renderSearchResults(activeSearchQuery);
    });
  }

  // Backdrop clicks
  const cartBackdrop = container.querySelector('#store-cart-drawer-backdrop');
  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', (e) => {
      if (e.target === cartBackdrop) closeCartDrawer();
    });
  }

  const detailBackdrop = container.querySelector('#store-detail-modal-backdrop');
  if (detailBackdrop) {
    detailBackdrop.addEventListener('click', (e) => {
      if (e.target === detailBackdrop) closeProductDetailModal();
    });
  }

  const searchBackdrop = container.querySelector('#store-search-overlay');
  if (searchBackdrop) {
    searchBackdrop.addEventListener('click', (e) => {
      if (e.target === searchBackdrop) closeSearchOverlay();
    });
  }

  const checkoutBackdrop = container.querySelector('#store-checkout-modal-backdrop');
  if (checkoutBackdrop) {
    checkoutBackdrop.addEventListener('click', (e) => {
      if (e.target === checkoutBackdrop) checkoutBackdrop.classList.remove('is-open');
    });
  }

  // ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductDetailModal();
      closeCartDrawer();
      closeSearchOverlay();
      const checkoutBackdrop = document.getElementById('store-checkout-modal-backdrop');
      if (checkoutBackdrop) checkoutBackdrop.classList.remove('is-open');
    }
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
