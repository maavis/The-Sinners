/**
 * TOXIC MERCH STORE DATA SERVICE
 * Supabase `products` PostgreSQL Tablosu İle Canlı Entegrasyon & Sepet Yönetimi
 */

import { supabase } from '../lib/supabase.js';

export const STORE_CATEGORIES = [
  { id: 'ALL', label: 'TÜMÜ' },
  { id: 'T-SHIRTS', label: 'TİŞÖRT' },
  { id: 'HOODIES', label: 'KAPÜŞONLU' },
  { id: 'VINYL', label: 'PLAK' },
  { id: 'CASSETTES', label: 'KASET' },
  { id: 'ACCESSORIES', label: 'AKSESUAR' }
];

let inMemoryProducts = [];
let isMerchLoading = true;

export function isMerchDataLoading() {
  return isMerchLoading;
}

/**
 * Supabase `products` tablosundan tüm ürünleri çeker
 */
export async function fetchProductsFromSupabase() {
  if (!supabase) {
    isMerchLoading = false;
    return inMemoryProducts;
  }

  isMerchLoading = true;

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase products tablosu okunamadı:', error.message);
      isMerchLoading = false;
      return inMemoryProducts;
    }

    if (data) {
      inMemoryProducts = data.map(p => ({
        id: p.id,
        name: p.name || 'İSİMSİZ ÜRÜN',
        category: p.category || 'T-SHIRTS',
        price: parseFloat(p.price) || 0,
        currency: p.currency || '€',
        stockStatus: p.stock_status || 'IN_STOCK',
        stockLabel: p.stock_label || 'STOKTA VAR',
        sizes: Array.isArray(p.sizes) ? p.sizes : (typeof p.sizes === 'string' ? JSON.parse(p.sizes || '[]') : [
          { size: 'S', available: true, status: 'AVAILABLE' },
          { size: 'M', available: true, status: 'AVAILABLE' },
          { size: 'L', available: true, status: 'AVAILABLE' },
          { size: 'XL', available: true, status: 'AVAILABLE' }
        ]),
        defaultSize: p.default_size || 'M',
        primaryImage: p.primary_image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
        secondaryImage: p.secondary_image || '',
        gallery: Array.isArray(p.gallery) ? p.gallery : (typeof p.gallery === 'string' ? JSON.parse(p.gallery || '[]') : []),
        season: p.season || 'SONBAHAR/KIŞ 2026',
        tagline: p.tagline || '',
        description: p.description || '',
        material: p.material || '%100 Organik Pamuk',
        sizeGuide: p.size_guide || 'Standart kalıptır. Günlük kullanım için kendi bedeninizi seçebilirsiniz.',
        shippingInfo: p.shipping_info || '1-3 iş günü içinde kargoya verilir. 50€ üzeri kargo ücretsizdir.',
        returnsInfo: p.returns_info || '14 gün içinde koşulsuz iade ve değişim hakkı mevcuttur.'
      }));
    }
  } catch (err) {
    console.error('Supabase Ürün Veri Çekme Hatası:', err);
  } finally {
    isMerchLoading = false;
    window.dispatchEvent(new CustomEvent('store-products-updated'));
  }

  return inMemoryProducts;
}

// Uygulama açılışında Supabase'den çek
fetchProductsFromSupabase();

export function getProducts() {
  return inMemoryProducts;
}

export function getProductById(id) {
  return inMemoryProducts.find(p => p.id === id) || null;
}

/**
 * Yeni Ürün Ekle (Supabase `products` tablosu)
 */
export async function addProduct(prodData) {
  const newId = prodData.id || ('prod_' + Date.now());

  const newProduct = {
    id: newId,
    name: prodData.name || 'YENİ ÜRÜN',
    category: prodData.category || 'T-SHIRTS',
    price: parseFloat(prodData.price) || 0,
    currency: prodData.currency || '€',
    stockStatus: prodData.stockStatus || 'IN_STOCK',
    stockLabel: prodData.stockLabel || 'STOKTA VAR',
    sizes: prodData.sizes || [
      { size: 'S', available: true, status: 'AVAILABLE' },
      { size: 'M', available: true, status: 'AVAILABLE' },
      { size: 'L', available: true, status: 'AVAILABLE' },
      { size: 'XL', available: true, status: 'AVAILABLE' }
    ],
    defaultSize: prodData.defaultSize || 'M',
    primaryImage: prodData.primaryImage || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: prodData.secondaryImage || '',
    gallery: prodData.gallery || [prodData.primaryImage].filter(Boolean),
    season: prodData.season || 'SONBAHAR/KIŞ 2026',
    tagline: prodData.tagline || '',
    description: prodData.description || '',
    material: prodData.material || '%100 Organik Pamuk',
    sizeGuide: prodData.sizeGuide || 'Standart kalıptır.',
    shippingInfo: prodData.shippingInfo || '1-3 iş günü içinde kargoya verilir.',
    returnsInfo: prodData.returnsInfo || '14 gün içinde iade imkanı.'
  };

  if (supabase) {
    try {
      const { error } = await supabase.from('products').insert([{
        id: newProduct.id,
        name: newProduct.name,
        category: newProduct.category,
        price: newProduct.price,
        currency: newProduct.currency,
        stock_status: newProduct.stockStatus,
        stock_label: newProduct.stockLabel,
        sizes: newProduct.sizes,
        default_size: newProduct.defaultSize,
        primary_image: newProduct.primaryImage,
        secondary_image: newProduct.secondaryImage,
        gallery: newProduct.gallery,
        season: newProduct.season,
        tagline: newProduct.tagline,
        description: newProduct.description,
        material: newProduct.material,
        size_guide: newProduct.sizeGuide,
        shipping_info: newProduct.shippingInfo,
        returns_info: newProduct.returnsInfo
      }]);

      if (error) {
        console.error('Supabase addProduct hatası:', error);
      } else {
        console.log('Supabase Ürün Başarıyla Eklendi:', newProduct.id);
      }
    } catch (err) {
      console.error('Supabase addProduct exception:', err);
    }
  }

  inMemoryProducts.unshift(newProduct);
  window.dispatchEvent(new CustomEvent('store-products-updated'));
  return newProduct;
}

/**
 * Ürün Güncelle (Supabase `products` tablosu)
 */
export async function updateProduct(id, updatedData) {
  const index = inMemoryProducts.findIndex(p => p.id === id);
  if (index === -1) return null;

  if (supabase) {
    try {
      const payload = {};
      if (updatedData.name !== undefined) payload.name = updatedData.name;
      if (updatedData.category !== undefined) payload.category = updatedData.category;
      if (updatedData.price !== undefined) payload.price = parseFloat(updatedData.price);
      if (updatedData.currency !== undefined) payload.currency = updatedData.currency;
      if (updatedData.stockStatus !== undefined) payload.stock_status = updatedData.stockStatus;
      if (updatedData.stockLabel !== undefined) payload.stock_label = updatedData.stockLabel;
      if (updatedData.sizes !== undefined) payload.sizes = updatedData.sizes;
      if (updatedData.defaultSize !== undefined) payload.default_size = updatedData.defaultSize;
      if (updatedData.primaryImage !== undefined) payload.primary_image = updatedData.primaryImage;
      if (updatedData.secondaryImage !== undefined) payload.secondary_image = updatedData.secondaryImage;
      if (updatedData.gallery !== undefined) payload.gallery = updatedData.gallery;
      if (updatedData.season !== undefined) payload.season = updatedData.season;
      if (updatedData.tagline !== undefined) payload.tagline = updatedData.tagline;
      if (updatedData.description !== undefined) payload.description = updatedData.description;
      if (updatedData.material !== undefined) payload.material = updatedData.material;
      if (updatedData.sizeGuide !== undefined) payload.size_guide = updatedData.sizeGuide;
      if (updatedData.shippingInfo !== undefined) payload.shipping_info = updatedData.shippingInfo;
      if (updatedData.returnsInfo !== undefined) payload.returns_info = updatedData.returnsInfo;

      const { error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', id);

      if (error) console.error('Supabase updateProduct hatası:', error);
    } catch (err) {
      console.error('Supabase updateProduct exception:', err);
    }
  }

  inMemoryProducts[index] = { ...inMemoryProducts[index], ...updatedData };
  window.dispatchEvent(new CustomEvent('store-products-updated'));
  return inMemoryProducts[index];
}

/**
 * Ürün Sil (Supabase `products` tablosu)
 */
export async function deleteProduct(id) {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase deleteProduct hatası:', error);
      } else {
        console.log('Supabase Ürün Başarıyla Silindi:', id);
      }
    } catch (err) {
      console.error('Supabase deleteProduct exception:', err);
    }
  }

  inMemoryProducts = inMemoryProducts.filter(p => p.id !== id);
  window.dispatchEvent(new CustomEvent('store-products-updated'));
}

// ---------------------------------------------------------------------------
// SHOPPING CART SERVICE (LocalStorage)
// ---------------------------------------------------------------------------
const CART_STORAGE_KEY = 'toxic_store_cart_v4';

export function getCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY) || localStorage.getItem('thesinners_store_cart_v4');
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
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
      primaryImage: product.primaryImage,
      size: chosenSize,
      quantity: quantity,
      addedAt: new Date().toISOString()
    });
  }

  saveCart(cart);
  return true;
}

export function updateCartQuantity(cartItemIdOrProductId, size, newQty) {
  const cart = getCart();
  const index = cart.findIndex(item => 
    item.id === cartItemIdOrProductId || 
    (item.productId === cartItemIdOrProductId && (!size || item.size === size))
  );
  if (index === -1) return;

  if (newQty <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = newQty;
  }

  saveCart(cart);
}

export function removeFromCart(cartItemIdOrProductId, size = null) {
  let cart = getCart();
  cart = cart.filter(item => {
    if (item.id === cartItemIdOrProductId) return false;
    if (item.productId === cartItemIdOrProductId && (!size || item.size === size)) return false;
    return true;
  });
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getCartSummary() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  return {
    items: cart,
    totalItems,
    subtotal,
    shipping,
    total,
    currency: '€'
  };
}
