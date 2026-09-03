/**
 * PARRHESIA MOTION SYSTEM v3 ENGINE
 * Optimized Editorial Motion Choreography, Subsurface Parallax & Fast SPA Route Transitions
 */

let observer = null;
let isPageTransitioning = false;
let isParallaxInitialized = false;

/**
 * Initialize Motion System v3 observer and auto-attach to DOM elements
 */
export function initMotionSystem() {
  if (observer) {
    observer.disconnect();
  }

  // High-performance IntersectionObserver instance with once-only reveal per cycle
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('is-visible');

        // Apply staggered animation delays for list children if stagger parent
        if (el.hasAttribute('data-motion') && el.getAttribute('data-motion') === 'stagger') {
          const children = el.children;
          const isMobile = window.innerWidth <= 768;
          const stepMs = isMobile ? 25 : 35;
          Array.from(children).forEach((child, index) => {
            const delayMs = Math.min(index * stepMs, 210);
            child.style.transitionDelay = `${delayMs}ms`;
          });
        }

        observer.unobserve(el);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px 60px 0px',
    threshold: 0.02
  });

  observeElements();
  initSubtleParallax();

  // Mark motion hydration ready after DOM observer initialization
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('motion-pending');
    document.documentElement.classList.add('motion-ready');
  });
}

/**
 * Observe motion-enabled elements in the document (with deduplication)
 */
export function observeElements(root = document) {
  if (!observer) return;

  const selector = '[data-motion], .motion-reveal, .motion-image';
  const targets = root.querySelectorAll(selector);

  targets.forEach(target => {
    if (target.dataset.motionObserved !== 'true' && !target.classList.contains('is-visible')) {
      target.dataset.motionObserved = 'true';
      observer.observe(target);
    }
  });
}

/**
 * Convenience wrapper for dynamic public content updates
 */
export function observeNewElements(container) {
  if (!container) return;
  revealSectionContent(container);
}

/**
 * High-performance rAF Subsurface Depth Parallax (Disabled on touch mobile)
 */
export function initSubtleParallax() {
  if (isParallaxInitialized || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth <= 768) return;
  isParallaxInitialized = true;

  let ticking = false;

  function updateParallax() {
    const artworkElements = document.querySelectorAll('.parallax-artwork, [data-parallax="artwork"]');
    const viewportHeight = window.innerHeight;

    artworkElements.forEach(el => {
      if (el.closest('#home-music') || el.classList.contains('album-artwork-box')) {
        return;
      }
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const centerProgress = (rect.top + rect.height / 2 - viewportHeight / 2) / (viewportHeight / 2);
        const offsetPx = Math.max(-5, Math.min(5, centerProgress * 3));
        el.style.transform = `translate3d(0, ${offsetPx.toFixed(1)}px, 0)`;
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

let activeTransitionTimer = null;
let activeRafId = null;

/**
 * Reset motion state of elements in a specific route container upon route exit
 */
export function resetRouteMotion(container) {
  if (!container) return;

  const selector = '[data-motion], .motion-reveal, .motion-image';
  const targets = container.querySelectorAll(selector);

  targets.forEach(target => {
    target.classList.remove('is-visible');
    target.style.transitionDelay = '';
    delete target.dataset.motionObserved;
    if (observer) {
      observer.unobserve(target);
    }
  });
}

/**
 * High-speed SPA route transition system (<50ms DOM Swap + Soft Enter Animation)
 */
export function triggerPageTransition(currentSection, nextSection, onSwapCallback) {
  // Cancel any active pending transition timer or animation frame to support rapid navigation
  if (activeTransitionTimer) {
    clearTimeout(activeTransitionTimer);
    activeTransitionTimer = null;
  }
  if (activeRafId) {
    cancelAnimationFrame(activeRafId);
    activeRafId = null;
  }

  // Same route clicked or initial load -> run callback and reveal section content
  if (currentSection === nextSection) {
    if (onSwapCallback) onSwapCallback();
    if (nextSection) {
      revealSectionContent(nextSection);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    return;
  }

  const introOverlay = document.getElementById('cinematic-intro-overlay');
  const isIntroActive = introOverlay && !introOverlay.classList.contains('intro-finished') && introOverlay.style.display !== 'none';

  if (isIntroActive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (currentSection) {
      currentSection.classList.add('hidden');
      resetRouteMotion(currentSection);
    }
    if (onSwapCallback) onSwapCallback();
    if (nextSection) {
      nextSection.classList.remove('hidden');
      revealSectionContent(nextSection);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    return;
  }

  // 1. Immediately clean up exiting section state
  if (currentSection) {
    currentSection.classList.remove('page-transition-exiting', 'page-transition-entering');
    currentSection.classList.add('hidden');
    resetRouteMotion(currentSection);
  }

  // 2. Execute DOM Swap immediately (< 50ms latency feel)
  if (onSwapCallback) onSwapCallback();

  // Instant scroll top to prevent latency feel from smooth scroll
  window.scrollTo({ top: 0, behavior: 'instant' });

  // 3. Enter next section with soft entrance transition (240ms)
  if (nextSection) {
    nextSection.classList.remove('hidden', 'page-transition-exiting');
    nextSection.classList.add('page-transition-entering');

    // Trigger reveal sequence for new route
    revealSectionContent(nextSection);

    activeTransitionTimer = setTimeout(() => {
      nextSection.classList.remove('page-transition-entering');
      activeTransitionTimer = null;
    }, 240);
  }
}

/**
 * Immediately reveal section elements with clean state reset and smooth staggered CSS transitions.
 * Re-animates EVERY time the user enters or returns to any route!
 */
export function revealSectionContent(section) {
  if (!section) return;

  const selector = '[data-motion], .motion-reveal, .motion-image';
  const targets = section.querySelectorAll(selector);
  if (targets.length === 0) return;

  const viewportHeight = window.innerHeight;

  // 1. Reset visible state for entering route to ensure clean initial reveal
  targets.forEach(target => {
    target.classList.remove('is-visible');
    target.style.transitionDelay = '';
    delete target.dataset.motionObserved;
    if (observer) observer.unobserve(target);
  });

  // 2. Fast single rAF for 60 FPS entrance reveal
  activeRafId = requestAnimationFrame(() => {
    const isMobile = window.innerWidth <= 768;
    const stepMs = isMobile ? 20 : 30;

    targets.forEach((target, index) => {
      const rect = target.getBoundingClientRect();
      const isHeroElement = section.id === 'hero' || target.closest('#hero');
      if (isHeroElement || rect.top < viewportHeight + 120) {
        const delayMs = Math.min(index * stepMs, 180);
        target.style.transitionDelay = `${delayMs}ms`;
        target.classList.add('is-visible');
      } else {
        if (observer) {
          target.dataset.motionObserved = 'true';
          observer.observe(target);
        }
      }
    });
    activeRafId = null;
  });
}
