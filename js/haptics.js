/* ============================================================
   haptics.js  --  Web Haptics for Wadi Al Awir
   Vibration feedback on touch interactions (mobile devices)

   Haptic hierarchy (lightest → heaviest):
   - micro:   3ms  - image thumbnails, swatches, scroll snaps
   - light:   6ms  - product card tap, nav links
   - tap:     10ms - buttons, quantity +/-
   - select:  [5, 25, 8] - filters, variants, car pills
   - confirm: [8, 40, 15] - add to cart, language switch
   - heavy:   20ms - brand logo, remove item, menu toggle
   - error:   [12, 30, 12, 30, 12] - triple buzz for errors
   ============================================================ */

(function () {
  'use strict';

  var canVibrate = 'vibrate' in navigator;

  var H = {
    micro:   3,
    light:   6,
    tap:     10,
    select:  [5, 25, 8],
    confirm: [8, 40, 15],
    heavy:   20,
    error:   [12, 30, 12, 30, 12]
  };

  function vib(pattern) {
    if (!canVibrate) return;
    try { navigator.vibrate(pattern); } catch (e) {}
  }

  /* --- Click delegation --- */
  document.addEventListener('click', function (e) {
    if (!canVibrate) return;
    var t = e.target;

    /* Brand logo - heavy */
    if (t.closest('.navbar__brand, .footer__brand-ar')) {
      vib(H.heavy);
      return;
    }

    /* Add to cart - confirm */
    if (t.closest('[onclick*="addToCart"], .product-page__btn-cart, .cart-add-btn, .lightbox__order-btn')) {
      vib(H.confirm);
      return;
    }

    /* WhatsApp buttons - confirm */
    if (t.closest('.btn--whatsapp, .fab-whatsapp, .cart-drawer__send')) {
      vib(H.confirm);
      return;
    }

    /* Cart remove - heavy */
    if (t.closest('.cart-item__remove')) {
      vib(H.heavy);
      return;
    }

    /* Hamburger menu toggle - heavy */
    if (t.closest('.navbar__hamburger')) {
      vib(H.heavy);
      return;
    }

    /* Language toggle - confirm */
    if (t.closest('.lang-toggle')) {
      vib(H.confirm);
      return;
    }

    /* Cart open/close - tap */
    if (t.closest('.cart-btn, .cart-drawer__close')) {
      vib(H.tap);
      return;
    }

    /* Filter & variant selection - select */
    if (t.closest('.filter-btn, .car-pill, .filter-bar__btn, .product-page__variant-btn')) {
      vib(H.select);
      return;
    }

    /* Car card tap - select */
    if (t.closest('.car-card')) {
      vib(H.select);
      return;
    }

    /* Image thumbnails (product page + lightbox) - micro */
    if (t.closest('.product-page__thumb, .lightbox__thumb')) {
      vib(H.micro);
      return;
    }

    /* Quantity buttons - tap */
    if (t.closest('.cart-item__qty-btn, .product-page__qty-btn')) {
      vib(H.tap);
      return;
    }

    /* Lightbox close / zoom close - light */
    if (t.closest('.lightbox__close, .lightbox__backdrop, .product-page__zoom-close')) {
      vib(H.light);
      return;
    }

    /* Product card tap - light */
    if (t.closest('.product-card')) {
      vib(H.light);
      return;
    }

    /* Nav links - light */
    if (t.closest('.navbar__link, .mobile-menu__link')) {
      vib(H.light);
      return;
    }

    /* Any other button - tap */
    if (t.closest('.btn, button')) {
      vib(H.tap);
      return;
    }

    /* Any other link - micro */
    if (t.closest('a[href]')) {
      vib(H.micro);
      return;
    }
  }, { passive: true });

  /* --- Product page main image tap (zoom) - light --- */
  document.addEventListener('click', function (e) {
    if (!canVibrate) return;
    if (e.target.closest('.product-page__main-img-wrap')) {
      vib(H.light);
    }
  }, { passive: true });

  /* --- Swipe/scroll snap on review track - micro --- */
  var reviewTrack = null;
  var scrollTimeout;
  document.addEventListener('DOMContentLoaded', function () {
    reviewTrack = document.querySelector('.reviews-track');
    if (reviewTrack && canVibrate) {
      reviewTrack.addEventListener('scroll', function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
          vib(H.micro);
        }, 80);
      }, { passive: true });
    }
  });

  /* --- Long press on product card - heavy --- */
  var pressTimer;
  document.addEventListener('touchstart', function (e) {
    if (!canVibrate) return;
    var card = e.target.closest('.product-card');
    if (!card) return;
    pressTimer = setTimeout(function () { vib(H.heavy); }, 400);
  }, { passive: true });

  document.addEventListener('touchend', function () { clearTimeout(pressTimer); }, { passive: true });
  document.addEventListener('touchmove', function () { clearTimeout(pressTimer); }, { passive: true });

  /* Expose for manual triggers from other scripts */
  window.haptic = vib;
  window.HAPTICS = H;

})();
