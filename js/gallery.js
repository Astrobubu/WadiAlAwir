/* ============================================================
   gallery.js  --  Wadi Al Awir Car Accessories
   Product lightbox / modal gallery
   ============================================================ */

var _lightboxEscHandler = null;

/**
 * Open the product lightbox with full details.
 * @param {string} productId - product slug id
 */
function openLightbox(productId) {
  var product = window.getProductById(productId);
  if (!product) return;

  var lang = (document.body.dataset && document.body.dataset.lang) || 'en';

  var lightbox      = document.getElementById('lightbox');
  var mainImg       = document.getElementById('lightbox-main-img');
  var thumbsWrap    = document.getElementById('lightbox-thumbs');
  var titleEl       = document.getElementById('lightbox-title');
  var priceEl       = document.getElementById('lightbox-price');
  var warrantyEl    = document.getElementById('lightbox-warranty');
  var featuresEl    = document.getElementById('lightbox-features');
  var orderBtn      = document.getElementById('lightbox-order-btn');

  if (!lightbox) return;

  /* Main image */
  if (mainImg) {
    mainImg.src = product.images[0];
    mainImg.alt = product.name[lang];
  }

  /* Thumbnails */
  if (thumbsWrap) {
    thumbsWrap.innerHTML = product.images.map(function (img, idx) {
      var activeClass = idx === 0 ? ' lightbox__thumb--active' : '';
      return '<img class="lightbox__thumb' + activeClass + '" ' +
        'src="' + img + '" ' +
        'alt="' + product.name[lang] + ' ' + (idx + 1) + '" ' +
        'width="60" height="60" loading="lazy" ' +
        'data-full-src="' + img + '">';
    }).join('');

    /* Thumb click handlers */
    var thumbs = thumbsWrap.querySelectorAll('.lightbox__thumb');
    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        thumbs.forEach(function (t) { t.classList.remove('lightbox__thumb--active'); });
        thumb.classList.add('lightbox__thumb--active');
        if (mainImg) {
          mainImg.src = thumb.getAttribute('data-full-src');
        }
      });
    });
  }

  /* Title */
  if (titleEl) {
    titleEl.textContent = product.name[lang];
  }

  /* Price */
  if (priceEl) {
    var tabbyInstallment = (product.price / 4).toFixed(2);
    var tabbyText = lang === 'ar'
      ? 'أو 4 دفعات بقيمة ' + tabbyInstallment + ' د.إ'
      : 'Or 4 payments of ' + tabbyInstallment + ' AED';
    priceEl.innerHTML = '<span>' + product.price + '</span> <span class="product-card__price-currency">' + product.currency + '</span>' +
      '<div class="lightbox__tabby"><img src="assets/badges/tabby-logo.png" alt="Tabby" height="16"><span>' + tabbyText + '</span></div>';
  }

  /* Warranty */
  if (warrantyEl) {
    if (product.warranty) {
      warrantyEl.textContent = '\u2713 ' + product.warranty + ' ' + (lang === 'ar' ? 'ضمان' : 'Warranty');
      warrantyEl.style.display = '';
    } else {
      warrantyEl.textContent = '';
      warrantyEl.style.display = 'none';
    }
  }

  /* Features */
  if (featuresEl) {
    var featuresList = product.features[lang] || [];
    featuresEl.innerHTML = featuresList.map(function (f) {
      return '<li>' + f + '</li>';
    }).join('');
  }

  /* Order button */
  if (orderBtn) {
    orderBtn._waMessage = window.getProductWhatsAppURL(product, lang);
    orderBtn.href = '#';
    orderBtn.textContent = lang === 'ar' ? 'اطلب عبر واتساب' : 'Order via WhatsApp';
    orderBtn.onclick = function(e) {
      e.preventDefault();
      window.openWhatsApp(orderBtn._waMessage);
    };
  }

  /* Show lightbox */
  lightbox.classList.add('lightbox--open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  /* Escape key handler */
  _lightboxEscHandler = function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  };
  document.addEventListener('keydown', _lightboxEscHandler);
}

/**
 * Close the lightbox.
 */
function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  lightbox.classList.remove('lightbox--open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (_lightboxEscHandler) {
    document.removeEventListener('keydown', _lightboxEscHandler);
    _lightboxEscHandler = null;
  }
}

/* ----------------------------------------------------------
   Static event listeners (delegated)
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  /* Close button */
  var closeBtn = document.getElementById('lightbox-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  /* Backdrop click */
  var backdrop = document.querySelector('.lightbox__backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeLightbox);
  }
});

/* Expose globals */
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
