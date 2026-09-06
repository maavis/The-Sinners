/**
 * PARRHESIA - SITE CONFIGURATION & CONTENT SETTINGS
 * 
 * You can update logos, background images, album titles, and placeholders
 * directly in this file without modifying HTML structure.
 */

export const siteConfig = {
  // Band Branding
  bandName: "TOXIC",
  
  // Logo Settings
  logo: {
    useImageLogo: true,
    textLogo: "TOXIC",
    imageUrl: "https://i.imgur.com/s1hSAjx.png",
    altText: "TOXIC Official Band Logo"
  },

  // Hero Background Settings
  // To use your own photograph for the hero background:
  // 1. Put your background image inside assets/ folder (e.g. assets/hero-photo.jpg)
  // 2. Set heroBgUrl to 'assets/hero-photo.jpg' (or leave empty '' to use dark grey placeholder)
  hero: {
    heroBgUrl: "", // Example: "assets/hero-photo.jpg"
    albumSubtitle: "9MM HATE YAYINDA",
    albumTitle: "MADE OF SIN"
  },

  // Sidebar Menu Navigation Links
  navigation: [
    { label: "HOME", url: "#hero" },
    { label: "SHOP ALL", url: "#merch" },
    { label: "MUSIC", url: "#video" },
    { label: "TOPS", url: "#merch" },
    { label: "OUTERWEAR", url: "#merch" },
    { label: "ACCESSORIES", url: "#merch" },
    { label: "TOUR DATES", url: "#hero" }
  ]
};
