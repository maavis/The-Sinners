# PARRHESIA - Assets Directory

Place your band photos and logo files in this directory.

### How to add your Hero Background Photo:
1. Copy your hero image file into this folder (e.g. `hero-photo.jpg`).
2. Open `src/config.js` and set:
   ```javascript
   hero: {
     heroBgUrl: "assets/hero-photo.jpg",
     ...
   }
   ```

### How to add your Band Logo Image:
1. Copy your transparent PNG logo file into this folder (e.g. `logo.png`).
2. Open `src/config.js` and set:
   ```javascript
   logo: {
     useImageLogo: true,
     imageUrl: "assets/logo.png",
     ...
   }
   ```
