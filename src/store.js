/**
 * BARRIERSIA MERCH STORE APPLICATION ENGINE
 * High-Fashion Brutalist E-Commerce Engine & Reactive Store UI
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
  getCartSummary
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
 * Initialize and Mount Store to container element
 */
export function mountMerchStore(container) {
  if (!container) return;

  renderStoreSkeleton(container);
  bindStoreGlobalEvents(container);
  renderProductGrid();
  updateCartBadgeUI();
  initHeaderScrollListener();
}

/**
 * Render Store Skeleton Layout
 */
function renderStoreSkeleton(container) {
  container.innerHTML = `
    <!-- Controlled Analog Scanline Overlay -->
    <div class="store-scanlines-overlay" aria-hidden="true"></div>

    <!-- 1. STORE HEADER & NAVIGATION -->
    <header id="store-header" class="store-header">
      <div class="store-header-inner">
        <!-- Brand Group -->
        <div class="store-brand-group">
          <a href="/merch" class="store-brand-logo" data-store-route="/merch">
            THE SINNERS
            <span class="store-brand-badge">MAĞAZA</span>
          </a>
          <a href="/" class="store-back-to-band" data-route="/">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            GRUP SİTESİ
          </a>
        </div>

        <!-- Center Category Nav Links (Desktop) -->
        <ul class="store-nav-menu">
          <li><a class="store-nav-link ${activeCategory === 'ALL' ? 'active' : ''}" data-cat="ALL">TÜMÜ</a></li>
          <li><a class="store-nav-link ${activeCategory === 'T-SHIRTS' ? 'active' : ''}" data-cat="T-SHIRTS">TİŞÖRT</a></li>
          <li><a class="store-nav-link ${activeCategory === 'HOODIES' ? 'active' : ''}" data-cat="HOODIES">KAPÜŞONLU</a></li>
          <li><a class="store-nav-link ${activeCategory === 'VINYL' ? 'active' : ''}" data-cat="VINYL">PLAK</a></li>
          <li><a class="store-nav-link ${activeCategory === 'CASSETTES' ? 'active' : ''}" data-cat="CASSETTES">KASET</a></li>
          <li><a class="store-nav-link ${activeCategory === 'ACCESSORIES' ? 'active' : ''}" data-cat="ACCESSORIES">AKSESUAR</a></li>
        </ul>

        <!-- Right Utilities Group -->
        <div class="store-actions-group">
          <button id="store-search-trigger" class="store-action-btn" title="Ürün Ara">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>ARA</span>
          </button>
          <button id="store-cart-trigger" class="store-action-btn" title="Sepeti Görüntüle">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span>SEPET</span>
            <span id="store-cart-count-badge" class="store-cart-badge">0</span>
          </button>
          <button id="store-mobile-menu-btn" class="store-mobile-toggle" aria-label="Menüyü Aç/Kapat">☰</button>
        </div>
      </div>
    </header>

    <!-- 2. EDITORIAL HERO CAMPAIGN BANNER -->
    <section class="store-hero">
      <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1920&q=80" alt="The Sinners Koleksiyon" class="store-hero-bg" />
      <div class="store-hero-overlay"></div>
      <div class="store-hero-content">
        <span class="store-hero-eyebrow">// RESMİ KOLEKSİYON VE ÜRÜNLER</span>
        <h1 class="store-hero-title">THE SINNERS / MERCH</h1>
        <p class="store-hero-desc">GİYİM / PLAKLAR / KASETLER / ÖZEL KOLEKSİYON PARÇALARI. YÜKSEK KALİTE EDİTORYAL TASARIMLAR VE SINIRLI FİZİKSEL BASKILAR.</p>
        <a href="#store-vitrine" id="store-hero-shop-btn" class="store-hero-cta">KOLEKSİYONU İNCELE &rarr;</a>
      </div>
    </section>

    <!-- 3. CATEGORY FILTER BAR -->
    <nav class="store-filter-bar" id="store-vitrine">
      <div class="store-filter-inner">
        <div class="store-categories-list">
          ${STORE_CATEGORIES.map(cat => `
            <button class="store-cat-pill ${activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
              ${cat.label}
            </button>
          `).join('')}
        </div>
        <div id="store-results-counter" class="store-results-count">8 ÜRÜN GÖSTERİLİYOR</div>
      </div>
    </nav>

    <!-- 4. PRODUCT VITRINE GRID -->
    <main class="store-main-layout">
      <div id="store-products-feed" class="store-product-grid">
        <!-- Dynamically rendered product cards -->
      </div>
    </main>

    <!-- 5. LIMITED DROP EDITORIAL CAMPAIGN BANNER -->
    <section class="store-drop-banner">
      <div class="store-drop-card">
        <div class="store-drop-content">
          <span class="store-drop-tag">// SINIRLI ÖZEL SERİ</span>
          <h2 class="store-drop-title">MADE OF SIN</h2>
          <p class="store-drop-desc">Kayıt dönemine özel ağır gramajlı giysiler ve analog kasetler. Özel antika detaylarla sınırlı sayıda üretim.</p>
          <button class="store-hero-cta btn-drop-filter" data-cat="HOODIES">SERİYİ KEŞFET &rarr;</button>
        </div>
        <div class="store-drop-media">
          <img src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80" alt="Made of Sin Koleksiyonu" class="store-drop-img" />
        </div>
      </div>
    </section>

    <!-- 6. PHYSICAL MEDIA COLLECTOR'S SECTION -->
    <section class="store-media-section">
      <div class="store-media-header">
        <div>
          <h2 class="store-media-title">FİZİKSEL ALBÜMLER</h2>
          <span class="store-media-sub">PLAKLAR / KASETLER / ÖZEL BASKILAR</span>
        </div>
      </div>
      <div class="store-media-grid">
        <!-- Vinyl Spotlight -->
        <div class="store-media-card">
          <img src="https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80" alt="Plak" class="store-media-thumb" />
          <div class="store-media-details">
            <span class="store-card-category">12" LP PLAK // 180G</span>
            <h3 class="store-card-title">THE SINNERS — MADE OF SIN</h3>
            <div class="store-card-price" style="margin-bottom: 0.75rem;">€35</div>
            <p style="font-size: 0.8rem; color: #8A8A8E; line-height: 1.6; margin-bottom: 1.5rem;">16 sayfalık büyük boy editoryal sanat kitapçığı içeren, çift açılır kapaklı 180g ağır plak baskısı.</p>
            <button class="store-quick-add-btn btn-view-product" data-product-id="prod_vinyl_maybe_sin" style="margin-top: auto;">DETAYLARI GÖR &rarr;</button>
          </div>
        </div>
        <!-- Cassette Spotlight -->
        <div class="store-media-card">
          <img src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80" alt="Kaset" class="store-media-thumb" />
          <div class="store-media-details">
            <span class="store-card-category">SINIRLI BASKI KASET</span>
            <h3 class="store-card-title">THE SINNERS — MADE OF SIN</h3>
            <div class="store-card-price" style="margin-bottom: 0.75rem;">€18</div>
            <p style="font-size: 0.8rem; color: #8A8A8E; line-height: 1.6; margin-bottom: 1.5rem;">Dumanlı yarı şeffaf kaset gövdesi, Type II Krom bant, elle numaralandırılmış 200 adet sınırlı baskı.</p>
            <button class="store-quick-add-btn btn-view-product" data-product-id="prod_cassette_maybe_sin" style="margin-top: auto;">DETAYLARI GÖR &rarr;</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. STORE FOOTER -->
    <footer class="store-footer">
      <div class="store-footer-inner">
        <div>
          <div class="store-footer-brand-title">THE SINNERS</div>
          <div class="store-footer-brand-sub">RESMİ ÜRÜN VE KOLEKSİYON MAĞAZASI</div>
          <p style="font-size: 0.78rem; color: #666; max-width: 320px; line-height: 1.6;">
            Doğrudan müzik grubundan sokak giyimi, plaklar, kasetler ve resmi koleksiyon ürünleri.
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
        <div>UNDERGROUND İÇİN TASARLANDI VE ÜRETİLDİ</div>
      </div>
    </footer>

    <!-- 8. SLIDE-OVER CART DRAWER -->
    <div id="store-cart-drawer-backdrop" class="store-cart-drawer-backdrop" aria-hidden="true">
      <aside class="store-cart-drawer">
        <div class="store-cart-header">
          <h2 class="store-cart-title">SEPETİNİZ</h2>
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

    <!-- 9. FULLSCREEN SEARCH OVERLAY -->
    <div id="store-search-overlay" class="store-search-overlay" aria-hidden="true">
      <div class="store-search-header">
        <h2 class="store-search-heading">MAĞAZADA ARAYIN</h2>
        <button id="store-search-close-btn" class="store-search-close" aria-label="Aramayı Kapat">&times;</button>
      </div>
      <div class="store-search-input-wrapper">
        <input 
          type="text" 
          id="store-search-input-field" 
          class="store-search-input" 
          placeholder="ÜRÜN, KATEGORİ VEYA KOLEKSİYON ARAYIN..." 
          autocomplete="off" 
          autofocus 
        />
      </div>
      <div id="store-search-results-feed" class="store-search-results-area">
        <!-- Live search results -->
      </div>
    </div>

    <!-- 10. PRODUCT DETAIL MODAL / VIEW -->
    <div id="store-detail-modal-backdrop" class="store-modal-backdrop" aria-hidden="true">
      <div id="store-detail-modal-content" class="store-detail-modal">
        <!-- Rendered detail view -->
      </div>
    </div>

    <!-- 11. CHECKOUT PROTOTYPE CONFIRMATION MODAL -->
    <div id="store-checkout-modal-backdrop" class="store-checkout-modal-backdrop" aria-hidden="true">
      <div class="store-checkout-modal">
        <div class="store-checkout-icon">✓</div>
        <h2 class="store-checkout-title">SİPARİŞ ÖNİZLEMESİ HAZIR</h2>
        <p class="store-checkout-text">
          The Sinners Mağazasını ziyaret ettiğiniz için teşekkürler! Sepetinizdeki ürünler başarıyla doğrulandı, vergi ve teslimat detayları hesaplandı.
        </p>
        <div id="store-checkout-summary-box" style="background:#050505; border:1px solid rgba(255,255,255,0.1); padding:1.25rem; margin-bottom:1.5rem; text-align:left; font-size:0.8rem;"></div>
        <button id="store-checkout-modal-close" class="store-hero-cta" style="width:100%;">ALIŞVERİŞE DEVAM ET</button>
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
  const counter = document.getElementById('store-results-counter');
  if (!feed) return;

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
    counter.textContent = `${filtered.length} ÜRÜN GÖSTERİLİYOR`;
  }

  if (filtered.length === 0) {
    feed.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 5rem 2rem; color: #8A8A8E;">
        <p style="font-size: 0.9rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.5rem;">ARAMANIZLA EŞLEŞEN ÜRÜN BULUNAMADI</p>
        <button class="store-cat-pill active" id="btn-reset-filters">TÜM ÜRÜNLERİ GÖSTER</button>
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
      badgeHTML = `<span class="store-card-badge badge-sold">TÜKENDİ</span>`;
    } else if (isLowStock) {
      badgeHTML = `<span class="store-card-badge badge-low">${prod.stockLabel || 'SON ADETLER'}</span>`;
    } else {
      badgeHTML = `<span class="store-card-badge">STOKTA VAR</span>`;
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
      <article class="store-card" data-product-id="${prod.id}">
        <!-- Media / Images -->
        <div class="store-card-media btn-open-detail" data-product-id="${prod.id}">
          ${badgeHTML}
          <img src="${prod.primaryImage}" alt="${escapeHtml(prod.name)}" class="store-card-img" loading="lazy" />
          ${prod.secondaryImage ? `<img src="${prod.secondaryImage}" alt="${escapeHtml(prod.name)}" class="store-card-img store-card-img-secondary" loading="lazy" />` : ''}
        </div>

        <!-- Info Area -->
        <div class="store-card-info">
          <span class="store-card-category">${prod.category}</span>
          <h3 class="store-card-title btn-open-detail" data-product-id="${prod.id}">${escapeHtml(prod.name)}</h3>
          
          <div class="store-card-price-row">
            <span class="store-card-price">${prod.currency}${prod.price}</span>
            <span style="font-size: 0.68rem; color: #888; letter-spacing: 0.08em;">${prod.stockLabel}</span>
          </div>

          <!-- Size Selector -->
          ${prod.sizes && prod.sizes.length > 1 ? `
            <div class="store-card-sizes">
              ${sizesHTML}
            </div>
          ` : '<div style="margin-bottom: 0.5rem;"></div>'}

          <!-- Quick Add Button -->
          <div class="store-card-actions">
            <button 
              type="button" 
              class="store-quick-add-btn btn-quick-add" 
              data-product-id="${prod.id}" 
              ${isSoldOut ? 'disabled' : ''}
            >
              ${isSoldOut ? 'TÜKENDİ' : '+ SEPETE EKLE'}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
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
      <img id="detail-active-img" src="${galleryImages[0]}" alt="${escapeHtml(prod.name)}" class="store-detail-main-img" />
      
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
      <span class="store-detail-season">${prod.season || 'SONBAHAR/KIŞ 2026'}</span>
      <h1 class="store-detail-title">${escapeHtml(prod.name)}</h1>
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
          class="store-detail-add-btn" 
          ${prod.stockStatus === 'SOLD_OUT' ? 'disabled' : ''}
        >
          ${prod.stockStatus === 'SOLD_OUT' ? 'TÜKENDİ' : 'SEPETE EKLE'}
        </button>
      </div>

      <!-- ACCORDION INFORMATION -->
      <div class="store-accordions">
        <div class="store-accordion-item is-open">
          <button type="button" class="store-accordion-header">
            <span>ÜRÜN ÖZELLİKLERİ VE MATERYAL</span>
            <span>+</span>
          </button>
          <div class="store-accordion-content" style="display:block;">
            <p>${escapeHtml(prod.material)}</p>
            <p style="margin-top:0.5rem; color:#aaa;">${escapeHtml(prod.tagline || '')}</p>
          </div>
        </div>

        <div class="store-accordion-item">
          <button type="button" class="store-accordion-header">
            <span>BEDEN VE KALIP REHBERİ</span>
            <span>+</span>
          </button>
          <div class="store-accordion-content">
            <p>${escapeHtml(prod.sizeGuide)}</p>
          </div>
        </div>

        <div class="store-accordion-item">
          <button type="button" class="store-accordion-header">
            <span>KARGO VE TESLİMAT BİLGİSİ</span>
            <span>+</span>
          </button>
          <div class="store-accordion-content">
            <p>${escapeHtml(prod.shippingInfo)}</p>
          </div>
        </div>

        <div class="store-accordion-item">
          <button type="button" class="store-accordion-header">
            <span>İADE VE DEĞİŞİM KOŞULLARI</span>
            <span>+</span>
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
  backdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProductDetailModal() {
  const backdrop = document.getElementById('store-detail-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/**
 * Slide-over Cart Drawer Renderer
 */
export function openCartDrawer() {
  renderCartDrawerContents();
  const backdrop = document.getElementById('store-cart-drawer-backdrop');
  if (backdrop) {
    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
    isCartOpen = true;
    document.body.style.overflow = 'hidden';
  }
}

export function closeCartDrawer() {
  const backdrop = document.getElementById('store-cart-drawer-backdrop');
  if (backdrop) {
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
    isCartOpen = false;
    document.body.style.overflow = '';
  }
}

function renderCartDrawerContents() {
  const feed = document.getElementById('store-cart-items-feed');
  const footerArea = document.getElementById('store-cart-footer-area');
  if (!feed || !footerArea) return;

  const summary = getCartSummary();

  if (summary.items.length === 0) {
    feed.innerHTML = `
      <div class="store-cart-empty">
        <div style="font-size:2.5rem; margin-bottom:1rem; opacity:0.3;">∅</div>
        <div class="store-cart-empty-text">SEPETİNİZDE HENÜZ ÜRÜN BULUNMUYOR.</div>
        <button type="button" class="store-cart-continue-btn" id="btn-cart-continue">
          ALIŞVERİŞE DEVAM ET &rarr;
        </button>
      </div>
    `;
    footerArea.innerHTML = '';

    const continueBtn = document.getElementById('btn-cart-continue');
    if (continueBtn) continueBtn.onclick = closeCartDrawer;
    return;
  }

  feed.innerHTML = summary.items.map(item => `
    <div class="store-cart-item" data-cart-id="${item.id}">
      <img src="${item.image}" alt="${escapeHtml(item.name)}" class="store-cart-item-img" />
      <div class="store-cart-item-details">
        <span class="store-cart-item-name">${escapeHtml(item.name)}</span>
        <span class="store-cart-item-meta">BEDEN: ${item.size}</span>
        <span class="store-cart-item-price">${item.currency}${item.price}</span>
        <div class="store-cart-qty-ctrl">
          <button type="button" class="store-cart-qty-btn btn-cart-minus" data-id="${item.id}">−</button>
          <span class="store-cart-qty-count">${item.quantity}</span>
          <button type="button" class="store-cart-qty-btn btn-cart-plus" data-id="${item.id}">+</button>
        </div>
      </div>
      <button type="button" class="store-cart-remove-btn btn-cart-remove" data-id="${item.id}" title="Ürünü Kaldır">&times;</button>
    </div>
  `).join('');

  footerArea.innerHTML = `
    <div class="store-cart-summary-row">
      <span>ARA TOPLAM</span>
      <span>${summary.currency}${summary.subtotal.toFixed(2)}</span>
    </div>
    <div class="store-cart-summary-row">
      <span>TAHMİNİ KARGO</span>
      <span>${summary.shipping === 0 ? 'ÜCRETSİZ' : summary.currency + summary.shipping.toFixed(2)}</span>
    </div>
    <div class="store-cart-total-row">
      <span>TOPLAM</span>
      <span>${summary.currency}${summary.total.toFixed(2)}</span>
    </div>
    <button type="button" id="store-btn-checkout" class="store-checkout-btn">
      SİPARİŞİ TAMAMLA &rarr;
    </button>
  `;

  // Bind Steppers & Removal
  feed.querySelectorAll('.btn-cart-minus').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      updateCartQuantity(id, -1);
      renderCartDrawerContents();
      updateCartBadgeUI();
    };
  });

  feed.querySelectorAll('.btn-cart-plus').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      updateCartQuantity(id, 1);
      renderCartDrawerContents();
      updateCartBadgeUI();
    };
  });

  feed.querySelectorAll('.btn-cart-remove').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      removeFromCart(id);
      renderCartDrawerContents();
      updateCartBadgeUI();
      showStoreToast('Ürün sepetten kaldırıldı.');
    };
  });

  // Checkout Prototype
  const checkoutBtn = footerArea.querySelector('#store-btn-checkout');
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      openCheckoutPrototypeModal(summary);
    };
  }
}

function updateCartBadgeUI() {
  const badge = document.getElementById('store-cart-count-badge');
  if (badge) {
    const summary = getCartSummary();
    badge.textContent = summary.count;
    badge.style.display = summary.count > 0 ? 'inline-block' : 'none';
  }
}

/**
 * Search Overlay Engine
 */
function openSearchOverlay() {
  const overlay = document.getElementById('store-search-overlay');
  const input = document.getElementById('store-search-input-field');
  if (overlay) {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    isSearchOpen = true;
    document.body.style.overflow = 'hidden';
    if (input) {
      input.value = activeSearchQuery;
      setTimeout(() => input.focus(), 100);
      renderSearchResults(activeSearchQuery);
    }
  }
}

function closeSearchOverlay() {
  const overlay = document.getElementById('store-search-overlay');
  if (overlay) {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    isSearchOpen = false;
    document.body.style.overflow = '';
  }
}

function renderSearchResults(query) {
  const feed = document.getElementById('store-search-results-feed');
  if (!feed) return;

  if (!query || query.trim() === '') {
    feed.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: #666;">
        <p style="font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase;">ARAMAK İSTEDİĞİNİZ TİŞÖRT, HOODIE, PLAK VEYA KASET ADINI YAZIN...</p>
      </div>
    `;
    return;
  }

  const products = getProducts();
  const q = query.toLowerCase().trim();
  const results = products.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.tagline && p.tagline.toLowerCase().includes(q))
  );

  if (results.length === 0) {
    feed.innerHTML = `
      <div style="text-align: center; padding: 4rem; color: #8A8A8E;">
        <p style="font-size: 0.85rem; letter-spacing: 0.18em; text-transform: uppercase;">"${escapeHtml(query)}" İLE EŞLEŞEN ÜRÜN BULUNAMADI</p>
      </div>
    `;
    return;
  }

  feed.innerHTML = `
    <div class="store-search-grid">
      ${results.map(prod => `
        <div class="store-card" style="background:#0a0a0a;">
          <div class="store-card-media btn-search-item" data-product-id="${prod.id}" style="aspect-ratio: 4/5;">
            <img src="${prod.primaryImage}" alt="${escapeHtml(prod.name)}" class="store-card-img" />
          </div>
          <div class="store-card-info">
            <span class="store-card-category">${prod.category}</span>
            <h4 class="store-card-title btn-search-item" data-product-id="${prod.id}">${escapeHtml(prod.name)}</h4>
            <div class="store-card-price">${prod.currency}${prod.price}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  feed.querySelectorAll('.btn-search-item').forEach(el => {
    el.onclick = () => {
      const id = el.getAttribute('data-product-id');
      closeSearchOverlay();
      openProductDetailModal(id);
    };
  });
}

/**
 * Checkout Prototype Modal
 */
function openCheckoutPrototypeModal(summary) {
  const backdrop = document.getElementById('store-checkout-modal-backdrop');
  const summaryBox = document.getElementById('store-checkout-summary-box');
  if (!backdrop) return;

  if (summaryBox) {
    summaryBox.innerHTML = `
      <div style="font-weight:700; color:#fff; margin-bottom:0.5rem; letter-spacing:0.1em;">SİPARİŞ ÖZETİ (${summary.count} ÜRÜN)</div>
      ${summary.items.map(it => `
        <div style="display:flex; justify-content:space-between; margin-bottom:0.35rem; color:#aaa;">
          <span>${escapeHtml(it.name)} (${it.size}) × ${it.quantity}</span>
          <span>${it.currency}${(it.price * it.quantity).toFixed(2)}</span>
        </div>
      `).join('')}
      <div style="border-top:1px solid #333; margin-top:0.75rem; padding-top:0.75rem; display:flex; justify-content:space-between; color:#fff; font-weight:700;">
        <span>GENEL TOPLAM:</span>
        <span>${summary.currency}${summary.total.toFixed(2)}</span>
      </div>
    `;
  }

  backdrop.classList.add('is-open');
  backdrop.setAttribute('aria-hidden', 'false');
  closeCartDrawer();
}

function closeCheckoutPrototypeModal() {
  const backdrop = document.getElementById('store-checkout-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
  }
}

/**
 * Care Modal Handler
 */
function openCareInfoModal(type) {
  let title = 'MÜŞTERİ BİLGİLENDİRME';
  let body = '';

  if (type === 'shipping') {
    title = 'KARGO VE TESLİMAT POLİTİKASI';
    body = `
      <p style="margin-bottom: 1rem;"><strong>Teslimat Süresi:</strong> Siparişleriniz 2-4 iş günü içerisinde hazırlanıp takip numaralı kargo ile tarafınıza ulaştırılır.</p>
      <p style="margin-bottom: 1rem;"><strong>Ücretsiz Kargo:</strong> 120€ ve üzeri tüm siparişlerde kargo ücretsizdir.</p>
      <p><strong>Paketleme:</strong> Plaklar özel darbe emici sert karton ambalajlarda, giysiler ise su geçirmez mat koruma kılıflarında özenle paketlenir.</p>
    `;
  } else if (type === 'returns') {
    title = 'İADE VE DEĞİŞİM KOŞULLARI';
    body = `
      <p style="margin-bottom: 1rem;"><strong>14 Gün İade Hakkı:</strong> Ürünü teslim aldığınız tarihten itibaren 14 gün içinde koşulsuz iade veya değişim talep edebilirsiniz.</p>
      <p style="margin-bottom: 1rem;"><strong>Koşullar:</strong> Giysi ürünlerinin kullanılmamış, yıkanmamış ve etiketlerinin sökülmemiş olması gerekmektedir.</p>
      <p><strong>Fiziksel Medya:</strong> Plak ve kasetlerin orijinal jelatin ambalajının açılmamış olması zorunludur.</p>
    `;
  } else if (type === 'sizeguide') {
    title = 'BEDEN VE KALIP REHBERİ';
    body = `
      <p style="margin-bottom: 1rem;"><strong>Tişörtler (Boxy Fit):</strong> Sokak modasına uygun rahat ve dökümlü kutu kesimdir. Standart rahatlık için kendi bedeninizi, ekstra oversized görünüm için 1 beden büyük seçebilirsiniz.</p>
      <p style="margin-bottom: 1rem;"><strong>Hoodieler (Oversized):</strong> 480 GSM ağır gramaj kumaş ile geniş göğüs ve düşük omuz kalıbına sahiptir.</p>
      <p><strong>Beden Tablosu:</strong> S (Genişlik: 54cm, Boy: 70cm) | M (Genişlik: 57cm, Boy: 72cm) | L (Genişlik: 60cm, Boy: 75cm) | XL (Genişlik: 63cm, Boy: 78cm)</p>
    `;
  }

  const modalBackdrop = document.getElementById('store-checkout-modal-backdrop');
  const modal = modalBackdrop ? modalBackdrop.querySelector('.store-checkout-modal') : null;
  if (!modalBackdrop || !modal) return;

  modal.innerHTML = `
    <button id="btn-close-care" class="store-modal-close-btn" style="top:1rem; right:1rem;">&times;</button>
    <div style="font-size: 1.5rem; margin-bottom: 0.75rem; color: #fff;">ℹ</div>
    <h2 class="store-checkout-title" style="font-size:1.15rem; margin-bottom:1rem;">${title}</h2>
    <div style="text-align:left; font-size:0.85rem; color:#ccc; line-height:1.6; margin-bottom:1.5rem;">
      ${body}
    </div>
    <button id="btn-close-care-cta" class="store-hero-cta" style="width:100%;">ANLADIM & KAPAT</button>
  `;

  const closeCare = () => {
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    // Restore default checkout structure
    modal.innerHTML = `
      <div class="store-checkout-icon">✓</div>
      <h2 class="store-checkout-title">SİPARİŞ ÖNİZLEMESİ HAZIR</h2>
      <p class="store-checkout-text">
        The Sinners Mağazasını ziyaret ettiğiniz için teşekkürler! Sepetinizdeki ürünler başarıyla doğrulandı, vergi ve teslimat detayları hesaplandı.
      </p>
      <div id="store-checkout-summary-box" style="background:#050505; border:1px solid rgba(255,255,255,0.1); padding:1.25rem; margin-bottom:1.5rem; text-align:left; font-size:0.8rem;"></div>
      <button id="store-checkout-modal-close" class="store-hero-cta" style="width:100%;">ALIŞVERİŞE DEVAM ET</button>
    `;
    const btn = modal.querySelector('#store-checkout-modal-close');
    if (btn) btn.onclick = closeCheckoutPrototypeModal;
  };

  const c1 = modal.querySelector('#btn-close-care');
  const c2 = modal.querySelector('#btn-close-care-cta');
  if (c1) c1.onclick = closeCare;
  if (c2) c2.onclick = closeCare;

  modalBackdrop.classList.add('is-open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
}

/**
 * Toast Notification Utility
 */
export function showStoreToast(message) {
  const container = document.getElementById('store-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'store-toast';
  toast.innerHTML = `<span>✓</span> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/**
 * Scroll Reactive Header Listener
 */
function initHeaderScrollListener() {
  window.addEventListener('scroll', () => {
    const header = document.getElementById('store-header');
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });
}

/**
 * Update Category UI Selection
 */
function updateCategoryPillsUI() {
  document.querySelectorAll('.store-cat-pill, .store-nav-link').forEach(el => {
    const cat = el.getAttribute('data-cat');
    if (cat === activeCategory) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

/**
 * Global Event Delegation for Store
 */
function bindStoreGlobalEvents(root) {
  // Category Filtering
  root.addEventListener('click', (e) => {
    const catBtn = e.target.closest('[data-cat]');
    if (catBtn) {
      activeCategory = catBtn.getAttribute('data-cat') || 'ALL';
      activeSearchQuery = '';
      updateCategoryPillsUI();
      renderProductGrid();
      const vitrine = document.getElementById('store-vitrine');
      if (vitrine && window.scrollY > 400) {
        vitrine.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // Size Button Pick inside Cards
  root.addEventListener('click', (e) => {
    const sizeBtn = e.target.closest('.store-size-btn');
    if (sizeBtn && !sizeBtn.disabled) {
      const prodId = sizeBtn.getAttribute('data-product-id');
      const size = sizeBtn.getAttribute('data-size');
      selectedSizesMap[prodId] = size;
      const parent = sizeBtn.closest('.store-card-sizes');
      if (parent) {
        parent.querySelectorAll('.store-size-btn').forEach(b => b.classList.remove('selected'));
        sizeBtn.classList.add('selected');
      }
    }
  });

  // Quick Add Button
  root.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.btn-quick-add');
    if (addBtn && !addBtn.disabled) {
      const prodId = addBtn.getAttribute('data-product-id');
      const prod = getProductById(prodId);
      if (prod) {
        const size = selectedSizesMap[prodId] || prod.defaultSize || 'M';
        addToCart(prodId, size, 1);
        updateCartBadgeUI();
        showStoreToast(`"${prod.name}" (${size}) sepete eklendi.`);
        openCartDrawer();
      }
    }
  });

  // Open Product Detail Modal
  root.addEventListener('click', (e) => {
    const trigger = e.target.closest('.btn-open-detail, .btn-view-product');
    if (trigger) {
      const prodId = trigger.getAttribute('data-product-id');
      if (prodId) openProductDetailModal(prodId);
    }
  });

  // Care Modals in Footer
  root.addEventListener('click', (e) => {
    const careLink = e.target.closest('.btn-open-care-modal');
    if (careLink) {
      e.preventDefault();
      const type = careLink.getAttribute('data-type');
      openCareInfoModal(type);
    }
  });

  // Cart Trigger
  const cartTrigger = root.querySelector('#store-cart-trigger');
  if (cartTrigger) cartTrigger.onclick = openCartDrawer;

  const cartCloseBtn = root.querySelector('#store-cart-close-btn');
  if (cartCloseBtn) cartCloseBtn.onclick = closeCartDrawer;

  const cartBackdrop = root.querySelector('#store-cart-drawer-backdrop');
  if (cartBackdrop) {
    cartBackdrop.onclick = (e) => {
      if (e.target === cartBackdrop) closeCartDrawer();
    };
  }

  // Search Trigger
  const searchTrigger = root.querySelector('#store-search-trigger');
  if (searchTrigger) searchTrigger.onclick = openSearchOverlay;

  const searchCloseBtn = root.querySelector('#store-search-close-btn');
  if (searchCloseBtn) searchCloseBtn.onclick = closeSearchOverlay;

  const searchOverlay = root.querySelector('#store-search-overlay');
  if (searchOverlay) {
    searchOverlay.onclick = (e) => {
      if (e.target === searchOverlay) closeSearchOverlay();
    };
  }

  const searchInput = root.querySelector('#store-search-input-field');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });
  }

  // Detail Modal Backdrop Close
  const detailBackdrop = root.querySelector('#store-detail-modal-backdrop');
  if (detailBackdrop) {
    detailBackdrop.onclick = (e) => {
      if (e.target === detailBackdrop) closeProductDetailModal();
    };
  }

  // Checkout Prototype Modal Close
  const checkoutModalClose = root.querySelector('#store-checkout-modal-close');
  if (checkoutModalClose) checkoutModalClose.onclick = closeCheckoutPrototypeModal;

  const checkoutBackdrop = root.querySelector('#store-checkout-modal-backdrop');
  if (checkoutBackdrop) {
    checkoutBackdrop.onclick = (e) => {
      if (e.target === checkoutBackdrop) closeCheckoutPrototypeModal();
    };
  }

  // Escape key global close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (isCartOpen) closeCartDrawer();
      if (isSearchOpen) closeSearchOverlay();
      closeProductDetailModal();
      closeCheckoutPrototypeModal();
    }
  });

  // Listen to external cart sync events
  window.addEventListener('store-cart-updated', () => {
    updateCartBadgeUI();
  });
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
