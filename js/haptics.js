/* ============================================================
   haptics.js  --  Web Haptics for Wadi Al Awir
   Vibration feedback on touch interactions (mobile devices)
   ============================================================ */

(function () {
  'use strict';

  /* Check for Vibration API support */
  var canVibrate = 'vibrate' in navigator;

  /* Haptic patterns (duration in ms) */
  var HAPTICS = {
    tap: 8,            /* Light tap - buttons, links */
    select: [6, 30, 6], /* Double pulse - filter/variant selection */
    success: [8, 50, 12], /* Confirmation - add to cart */
    heavy: 15          /* Heavy tap - important actions */
  };

  function vibrate(pattern) {
    if (!canVibrate) return;
    try {
      navigator.vibrate(pattern);
    } catch (e) { /* silently fail */ }
  }

  /* Attach haptics via event delegation */
  document.addEventListener('click', function (e) {
    if (!canVibrate) return;

    var target = e.target;

    /* Add to cart - success pattern */
    if (target.closest('[onclick*="addToCart"], .product-page__btn-cart, .cart-add-btn')) {
      vibrate(HAPTICS.success);
      return;
    }

    /* Filter & variant selection - select pattern */
    if (target.closest('.filter-btn, .car-pill, .car-card, .product-page__variant-btn, .filter-bar__btn')) {
      vibrate(HAPTICS.select);
      return;
    }

    /* Cart quantity buttons - tap */
    if (target.closest('.cart-item__qty-btn, .product-page__qty-btn')) {
      vibrate(HAPTICS.tap);
      return;
    }

    /* Cart remove - heavy tap */
    if (target.closest('.cart-item__remove')) {
      vibrate(HAPTICS.heavy);
      return;
    }

    /* Language toggle - select */
    if (target.closest('.lang-toggle')) {
      vibrate(HAPTICS.select);
      return;
    }

    /* Hamburger menu - tap */
    if (target.closest('.navbar__hamburger')) {
      vibrate(HAPTICS.tap);
      return;
    }

    /* Any button or link tap - light tap */
    if (target.closest('.btn, button, a[href]')) {
      vibrate(HAPTICS.tap);
      return;
    }
  }, { passive: true });

  /* Haptic on product card long press (contextual feedback) */
  var pressTimer;
  document.addEventListener('touchstart', function (e) {
    if (!canVibrate) return;
    var card = e.target.closest('.product-card');
    if (!card) return;

    pressTimer = setTimeout(function () {
      vibrate(HAPTICS.heavy);
    }, 400);
  }, { passive: true });

  document.addEventListener('touchend', function () {
    clearTimeout(pressTimer);
  }, { passive: true });

  document.addEventListener('touchmove', function () {
    clearTimeout(pressTimer);
  }, { passive: true });

})();
