/**
 * THE SINNERS MERCH STORE DATA SERVICE
 * Centralized Store Catalog, Products, Stock, Sizes, and Cart Engine
 */

export const STORE_CATEGORIES = [
  { id: 'ALL', label: 'TÜMÜ' },
  { id: 'T-SHIRTS', label: 'TİŞÖRT' },
  { id: 'HOODIES', label: 'KAPÜŞONLU' },
  { id: 'VINYL', label: 'PLAK' },
  { id: 'CASSETTES', label: 'KASET' },
  { id: 'ACCESSORIES', label: 'AKSESUAR' }
];

export const INITIAL_PRODUCTS = [
  // 1. T-SHIRTS
  {
    id: 'prod_tee_logo',
    name: 'THE SINNERS LOGO TİŞÖRT',
    category: 'T-SHIRTS',
    price: 45,
    currency: '€',
    stockStatus: 'IN_STOCK', // 'IN_STOCK' | 'LOW_STOCK' | 'SOLD_OUT'
    stockLabel: 'STOKTA VAR',
    sizes: [
      { size: 'S', available: true, status: 'AVAILABLE' },
      { size: 'M', available: true, status: 'AVAILABLE' },
      { size: 'L', available: true, status: 'AVAILABLE' },
      { size: 'XL', available: true, status: 'AVAILABLE' }
    ],
    defaultSize: 'M',
    primaryImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80'
    ],
    season: 'SONBAHAR/KIŞ 2026',
    tagline: 'İmza Ağır Gramaj Tipografik Grup Tişörtü',
    description: '240 GSM ağır organik pamuktan üretilmiş, yüksek kontrastlı The Sinners arşiv tipografisine ve eskitme dokuya sahip tişört. Rahat ve şık kutu kesim (boxy fit) kalıp.',
    material: '%100 Taranmış Organik Pamuk, 240 GSM, Önceden yıkanmış vintage yıkama doku.',
    sizeGuide: 'Sokak modasına uygun kutu kalıp (boxy fit). Günlük rahat duruş için kendi bedeninizi, daha salaş (oversized) bir görünüm için bir beden büyüğünü tercih edin.',
    shippingInfo: '2-4 iş günü içerisinde takip kodlu kargo ile gönderim. 120€ üzeri siparişlerde kargo ücretsizdir.',
    returnsInfo: 'Teslimat tarihinden itibaren 14 gün içinde koşulsuz iade ve değişim garantisi. Ürünler giyilmemiş ve etiketleri sökülmemiş olmalıdır.'
  },
  {
    id: 'prod_tee_maybe_sin',
    name: 'MADE OF SIN TİŞÖRT',
    category: 'T-SHIRTS',
    price: 50,
    currency: '€',
    stockStatus: 'LOW_STOCK',
    stockLabel: 'SON ADETLER',
    sizes: [
      { size: 'S', available: true, status: 'AVAILABLE' },
      { size: 'M', available: true, status: 'AVAILABLE' },
      { size: 'L', available: true, status: 'LOW STOCK' },
      { size: 'XL', available: false, status: 'SOLD OUT' }
    ],
    defaultSize: 'M',
    primaryImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80'
    ],
    season: 'SINIRLI ÖZEL SERİ',
    tagline: 'Ön ve Arka Yüksek Çözünürlüklü İpek Baskı',
    description: 'Made of Sin albüm dönemine özel limitli seri tişört. Arkada yüksek yoğunluklu parlak ipek baskı ve eskitme vintage yaka detayı.',
    material: '%100 Premium Ağır Pamuk, 260 GSM.',
    sizeGuide: 'Düşük omuzlu salaş (oversized) kesim. Standart kalıp tercih ediyorsanız bir beden küçük seçebilirsiniz.',
    shippingInfo: 'Özel mat siyah biyolojik olarak parçalanabilir ambalajda, resmi koleksiyoncu kartpostalıyla birlikte gönderilir.',
    returnsInfo: 'Sınırlı sayıda üretilen ürün. Stok durumuna bağlı olarak 14 gün içinde iade ve değişim yapılabilir.'
  },
  {
    id: 'prod_tee_blackout',
    name: 'BLACKOUT GRAFİK TİŞÖRT',
    category: 'T-SHIRTS',
    price: 48,
    currency: '€',
    stockStatus: 'IN_STOCK',
    stockLabel: 'STOKTA VAR',
    sizes: [
      { size: 'S', available: true, status: 'AVAILABLE' },
      { size: 'M', available: true, status: 'AVAILABLE' },
      { size: 'L', available: true, status: 'AVAILABLE' },
      { size: 'XL', available: true, status: 'AVAILABLE' }
    ],
    defaultSize: 'L',
    primaryImage: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80'
    ],
    season: 'TEMEL KOLEKSİYON',
    tagline: 'Monokrom Endüstriyel Ton Sür Ton Baskı',
    description: 'Stüdyo makaraları ve underground beton estetiğinden ilham alan mat siyah üzerine koyu gri ton sür ton grafik baskı. Günlük kullanım için tasarlandı.',
    material: '%100 Organik Ring İplik Pamuk, 220 GSM.',
    sizeGuide: 'Standart sokak modası rahat kesim.',
    shippingInfo: 'Dünya geneline standart ve hızlı kargo seçenekleri mevcuttur.',
    returnsInfo: '14 gün içinde standart iade ve değişim hakkı.'
  },

  // 2. HOODIES
  {
    id: 'prod_hoodie_heavy',
    name: 'THE SINNERS AĞIR HOODIE',
    category: 'HOODIES',
    price: 90,
    currency: '€',
    stockStatus: 'IN_STOCK',
    stockLabel: 'STOKTA VAR',
    sizes: [
      { size: 'S', available: true, status: 'AVAILABLE' },
      { size: 'M', available: true, status: 'AVAILABLE' },
      { size: 'L', available: true, status: 'AVAILABLE' },
      { size: 'XL', available: true, status: 'AVAILABLE' }
    ],
    defaultSize: 'L',
    primaryImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=80'
    ],
    season: 'FW26 KOLEKSİYONU',
    tagline: 'Ultra Ağır Gramaj 480 GSM Fransız Havlu Kumaş (French Terry)',
    description: 'Orijinal The Sinners sanat çalışmalarını içeren ağır gramajlı kapüşonlu sweatshirt. Çift katmanlı kapüşon ve nervürlü yan panellerle üretilmiştir.',
    material: '%100 Fransız Havlu Pamuk (French Terry), 480 GSM. Özel ağır metal kordon uçları.',
    sizeGuide: 'Hafif dökümlü düşük omuz kalıp. Üzerinize tam oturması için bir beden küçük tercih edebilirsiniz.',
    shippingInfo: 'Özel korumalı kargo paketi. 120€ üzeri siparişlerde takip numaralı ücretsiz kargo.',
    returnsInfo: 'Orijinal ambalajında 14 gün içerisinde iade imkanı.'
  },
  {
    id: 'prod_hoodie_maybe_sin',
    name: 'MADE OF SIN HOODIE',
    category: 'HOODIES',
    price: 95,
    currency: '€',
    stockStatus: 'LOW_STOCK',
    stockLabel: 'SON ADETLER',
    sizes: [
      { size: 'S', available: false, status: 'SOLD OUT' },
      { size: 'M', available: true, status: 'LOW STOCK' },
      { size: 'L', available: true, status: 'AVAILABLE' },
      { size: 'XL', available: false, status: 'SOLD OUT' }
    ],
    defaultSize: 'M',
    primaryImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80'
    ],
    season: 'SINIRLI ALBÜM KOLEKSİYONU',
    tagline: 'Göğüs Nakışı ve Büyük Boy Sırt Baskısı',
    description: 'Şardonlu yumuşak iç astar, derin kanguru cep ve mat siyah yüksek çözünürlüklü baskılarla hazırlanan özel koleksiyon hoodie.',
    material: '%80 Ağır Pamuk, %20 Polar Polar Kumaş, 460 GSM.',
    sizeGuide: 'Geniş kollu ve kutu kesimli oversized silüet.',
    shippingInfo: 'Sınırlı üretim. 48 saat içerisinde kargoya teslim edilir.',
    returnsInfo: '14 gün koşulsuz iade hakkı.'
  },

  // 3. PHYSICAL MEDIA (VINYL)
  {
    id: 'prod_vinyl_maybe_sin',
    name: 'THE SINNERS — MADE OF SIN (PLAK)',
    category: 'VINYL',
    price: 35,
    currency: '€',
    stockStatus: 'IN_STOCK',
    stockLabel: 'STOKTA VAR',
    sizes: [
      { size: '12" PLAK', available: true, status: 'AVAILABLE' }
    ],
    defaultSize: '12" PLAK',
    primaryImage: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1200&q=80'
    ],
    season: 'FİZİKSEL BASKI // 12" LP PLAK',
    tagline: '180g Ağır Gramaj Odyofil Siyah Plak Baskısı',
    description: 'Çıkış albümünün ilk resmi plak baskısı. 45 RPM hızında iki adet 180g ağır diske özel analog mastering ile basılmıştır. 16 sayfalık büyük boy editoryal sanat kitapçığı içerir.',
    material: '180g Ağır Vinil, Çift Açılır (Gatefold) 350gsm Çizilmez Mat Kapak.',
    sizeGuide: 'Standart 12" LP Formatı (33 1/3 & 45 RPM). Çift açılır kapak seti.',
    shippingInfo: 'Köşe korumalı özel sert karton plak kolisinde güvenli kargolanır.',
    returnsInfo: 'Ambalajı ve jelatini açılmamış ürünler 14 gün içinde iade edilebilir.'
  },

  // 4. CASSETTES
  {
    id: 'prod_cassette_maybe_sin',
    name: 'THE SINNERS — MADE OF SIN (KASET)',
    category: 'CASSETTES',
    price: 18,
    currency: '€',
    stockStatus: 'LOW_STOCK',
    stockLabel: 'SON 12 ADET',
    sizes: [
      { size: 'KASET', available: true, status: 'AVAILABLE' }
    ],
    defaultSize: 'KASET',
    primaryImage: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1200&q=80'
    ],
    season: 'FİZİKSEL BASKI // SINIRLI KASET',
    tagline: 'Dumanlı Yarı Şeffaf Gövde ve Gümüş Gövde Baskısı',
    description: 'Elle numaralandırılmış 200 adet sınırlı kaset baskısı. Maksimum bas derinliği ve dinamik ses için yüksek kaliteli Type II Krom manyetik bant ile kaydedilmiştir.',
    material: 'Type II Yüksek Kalite Ses Kaseti, Şeffaf Norelco Kutu ve 5 Panelli J-Card Kuşe Kapak.',
    sizeGuide: 'Standart Ses Kaseti Formatı (C-48).',
    shippingInfo: 'Özel balonlu koruma zarfında jelatinli sıfır ambalajında gönderilir.',
    returnsInfo: 'Jelatini açılmamış kasetler 14 gün içinde iade edilebilir.'
  },

  // 5. ACCESSORIES
  {
    id: 'prod_acc_keychain',
    name: 'THE SINNERS METAL ANAHTARLIK',
    category: 'ACCESSORIES',
    price: 15,
    currency: '€',
    stockStatus: 'IN_STOCK',
    stockLabel: 'STOKTA VAR',
    sizes: [
      { size: 'STANDART', available: true, status: 'AVAILABLE' }
    ],
    defaultSize: 'STANDART',
    primaryImage: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&w=1200&q=80'
    ],
    season: 'OBJELER VE AKSESUARLAR',
    tagline: 'Antik Füme Kaplama Döküm Çinko Alaşım',
    description: 'Resmi The Sinners kabartmalı amblemine sahip masif ağır döküm çinko anahtarlık. Lazer işlemeli orijinallik halkası.',
    material: '%100 Masif Çinko Alaşım, Mat Füme PVD Kaplama. Ağırlık: 85g.',
    sizeGuide: 'Boyutlar: 65mm x 25mm x 4mm.',
    shippingInfo: 'Özel siyah kadife kese ve mat hediye kutusunda kargolanır.',
    returnsInfo: '14 gün içinde iade edilebilir.'
  },
  {
    id: 'prod_acc_patches',
    name: 'THE SINNERS ARMA SETİ',
    category: 'ACCESSORIES',
    price: 12,
    currency: '€',
    stockStatus: 'IN_STOCK',
    stockLabel: 'STOKTA VAR',
    sizes: [
      { size: "3'LÜ SET", available: true, status: 'AVAILABLE' }
    ],
    defaultSize: "3'LÜ SET",
    primaryImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80'
    ],
    season: 'OBJELER VE AKSESUARLAR',
    tagline: 'Overlok Kenarlı Yüksek Yoğunluklu Dokuma Armalar',
    description: 'Ütüyle yapışabilen termal arka yüzeye ve overloklu kenarlara sahip üçlü dokuma arma seti. Kot ceketler, kapüşonlular ve çantalar için idealdir.',
    material: '%100 Dokuma Polyester İplik, Isıyla yapışan yapışkan taban.',
    sizeGuide: 'İçerik: 1x Büyük Sırt Arması (12cm), 2x Kol Arması (6cm).',
    shippingInfo: 'Korumalı zarf içinde gönderilir.',
    returnsInfo: 'Açılmamış paketler 14 gün içinde iade edilebilir.'
  },
  {
    id: 'prod_acc_cap',
    name: 'THE SINNERS ŞAPKA',
    category: 'ACCESSORIES',
    price: 30,
    currency: '€',
    stockStatus: 'SOLD_OUT',
    stockLabel: 'TÜKENDİ',
    sizes: [
      { size: 'STANDART', available: false, status: 'SOLD OUT' }
    ],
    defaultSize: 'STANDART',
    primaryImage: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80'
    ],
    season: 'TEMEL KOLEKSİYON',
    tagline: 'Düşük Profilli 6 Panelli Yıkanmış Gabardin Şapka',
    description: 'Yıkanmış ağır pamuklu gabardinden üretilmiş, ton sür ton 3D nakışlı ve antik pirinç tokalı ayarlanabilir şapka.',
    material: '%100 Yıkanmış Pamuk Gabardin, Antik Pirinç Metal Toka.',
    sizeGuide: 'Ayarlanabilir kayış (54cm - 62cm baş çevresi).',
    shippingInfo: 'Stok yenileme bildirimleri aktif. Yeni parti geldiğinde kargolanır.',
    returnsInfo: 'Teslimattan sonra 14 gün iade süresi.'
  }
];

const CART_STORAGE_KEY = 'thesinners_store_cart_v4';
const PRODUCTS_STORAGE_KEY = 'thesinners_store_products_v4';

// ---------------------------------------------------------------------------
// PRODUCTS SERVICE
// ---------------------------------------------------------------------------
export function getProducts() {
  try {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }

    return parsed;
  } catch (e) {
    console.error('Error reading store products:', e);
    return INITIAL_PRODUCTS;
  }
}

export function getProductById(id) {
  const products = getProducts();
  return products.find(p => p.id === id) || null;
}

// ---------------------------------------------------------------------------
// SHOPPING CART SERVICE
// ---------------------------------------------------------------------------
export function getCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error reading cart:', e);
    return [];
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('store-cart-updated', { detail: { cart } }));
  } catch (e) {
    console.error('Error saving cart:', e);
  }
}

export function addToCart(productId, size = null, quantity = 1) {
  const product = getProductById(productId);
  if (!product || product.stockStatus === 'SOLD_OUT') return false;

  const chosenSize = size || product.defaultSize || (product.sizes[0] ? product.sizes[0].size : 'ONE SIZE');
  const cart = getCart();

  const existingIndex = cart.findIndex(item => item.productId === productId && item.size === chosenSize);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.unshift({
      id: 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      currency: product.currency,
      image: product.primaryImage,
      size: chosenSize,
      quantity: quantity,
      addedAt: new Date().toISOString()
    });
  }

  saveCart(cart);
  return true;
}

export function updateCartQuantity(cartItemId, delta) {
  const cart = getCart();
  const index = cart.findIndex(item => item.id === cartItemId);
  if (index === -1) return;

  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
}

export function removeFromCart(cartItemId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== cartItemId);
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getCartSummary() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 120 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  return {
    items: cart,
    count,
    subtotal,
    shipping,
    total,
    currency: '€'
  };
}
