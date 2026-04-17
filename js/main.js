/* ============================================================
   main.js  --  Wadi Al Awir Car Accessories
   Master initialisation, i18n, navbar, filters, animations
   ============================================================ */

/* ----------------------------------------------------------
   Translation dictionary
   ---------------------------------------------------------- */
var TRANSLATIONS = {
  en: {
    "nav.products": "Products",
    "nav.services": "Services",
    "nav.reviews": "Reviews",
    "nav.contact": "Contact",
    "nav.lang": "\u0639\u0631\u0628\u064A",
    "hero.badge.tabby": "Tabby Installments",
    "hero.badge.hours": "Open until 11 PM",
    "hero.subtitle": "Car Accessories",
    "hero.tagline": "Premium auto accessories & window tinting in Al Awir, Dubai",
    "hero.browse": "Browse Products",
    "hero.services": "See Services",
    "hero.whatsapp": "Order via WhatsApp",
    "cars.label": "VEHICLE CATALOG",
    "cars.title": "Shop by Vehicle",
    "cars.subtitle": "Select your car model to find compatible accessories",
    "products.label": "OUR PRODUCTS",
    "products.title": "Accessories & Parts",
    "products.subtitle": "Premium accessories for your vehicle",
    "filter.all": "All",
    "filter.exterior": "Exterior",
    "filter.interior": "Interior",
    "filter.lighting": "Lighting",
    "filter.utility": "Utility",
    "services.label": "WHAT WE DO",
    "services.title": "Our Services",
    "services.subtitle": "Professional auto care services in Al Awir, Dubai",
    "reviews.label": "TESTIMONIALS",
    "reviews.title": "What Our Customers Say",
    "location.label": "FIND US",
    "location.title": "Visit Our Shop",
    "location.address.label": "Address",
    "location.phone.label": "Phone",
    "location.hours.label": "Hours",
    "location.hours.value": "Open daily until 11 PM",
    "location.directions": "Get Directions",
    "footer.tagline": "Car Accessories & Window Tinting",
    "footer.rights": "All rights reserved.",
    "product.order": "Order via WhatsApp",
    "product.details": "Details",
    "product.inquire": "Inquire",
    "products.viewAll": "View All Products",
    "footer.copyright": "\u00a9 2026 Wadi Al Awir Car Accessories.",
    "footer.powered": "Built by",
    "reviews.subtitle": "4.4 \u2605 on Google (33 reviews)",
    "review.1": "\u201cExcellent place for JETOUR accessories. Wide range of products and very helpful staff.\u201d",
    "review.2": "\u201cThe majority of the accessories are in stock, the team is fantastic and very knowledgeable.\u201d",
    "review.3": "\u201cBest shop for Jetour T2 accessories in Dubai. Professional installation and fair prices.\u201d",
    "review.4": "\u201cGreat selection of car accessories. Good quality products and reasonable prices. Recommended!\u201d",
    "review.source": "Google Review",
    "faq.label": "FAQ",
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Everything you need to know",
    "faq.q1": "Do you offer installation for all accessories?",
    "faq.a1": "Yes, all our accessories come with free professional installation at our Al Awir workshop.",
    "faq.q2": "What payment methods do you accept?",
    "faq.a2": "We accept cash, credit/debit cards, and Tabby (split your payment into 4 interest-free installments).",
    "faq.q3": "Do your accessories come with a warranty?",
    "faq.a3": "Select products include a manufacturer warranty. Check each product listing for warranty details.",
    "faq.q4": "Which car models do you support?",
    "faq.a4": "We specialize in Jetour T2 (2023-2024) and Jetour ROX 01 (2024-2025) accessories.",
    "faq.q5": "How can I place an order?",
    "faq.a5": "Browse our products, then order directly via WhatsApp. We\u2019ll confirm availability and arrange installation.",
    "faq.q6": "Where are you located?",
    "faq.a6": "We\u2019re in Al Awir 1, Dubai (near Dubai Safari Park). Open daily from 9 AM to 11 PM."
  },
  ar: {
    "nav.products": "\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A",
    "nav.services": "\u0627\u0644\u062E\u062F\u0645\u0627\u062A",
    "nav.reviews": "\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A",
    "nav.contact": "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627",
    "nav.lang": "English",
    "hero.badge.tabby": "\u062A\u0642\u0633\u064A\u0637 \u062A\u0627\u0628\u064A",
    "hero.badge.hours": "\u0645\u0641\u062A\u0648\u062D \u062D\u062A\u0649 11 \u0645\u0633\u0627\u0621\u064B",
    "hero.subtitle": "لزينة السيارات",
    "hero.tagline": "\u0625\u0643\u0633\u0633\u0648\u0627\u0631\u0627\u062A \u0633\u064A\u0627\u0631\u0627\u062A \u0641\u0627\u062E\u0631\u0629 \u0648\u062A\u0638\u0644\u064A\u0644 \u0632\u062C\u0627\u062C \u0641\u064A \u0627\u0644\u0639\u0648\u064A\u0631\u060C \u062F\u0628\u064A",
    "hero.browse": "\u062A\u0635\u0641\u062D \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A",
    "hero.services": "\u0627\u0633\u062A\u0639\u0631\u0636 \u0627\u0644\u062E\u062F\u0645\u0627\u062A",
    "hero.whatsapp": "\u0627\u0637\u0644\u0628 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628",
    "cars.label": "\u0643\u062A\u0627\u0644\u0648\u062C \u0627\u0644\u0633\u064A\u0627\u0631\u0627\u062A",
    "cars.title": "\u062A\u0633\u0648\u0642 \u062D\u0633\u0628 \u0627\u0644\u0633\u064A\u0627\u0631\u0629",
    "cars.subtitle": "\u0627\u062E\u062A\u0631 \u0645\u0648\u062F\u064A\u0644 \u0633\u064A\u0627\u0631\u062A\u0643 \u0644\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0625\u0643\u0633\u0633\u0648\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u062A\u0648\u0627\u0641\u0642\u0629",
    "products.label": "\u0645\u0646\u062A\u062C\u0627\u062A\u0646\u0627",
    "products.title": "\u0627\u0644\u0625\u0643\u0633\u0633\u0648\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u0642\u0637\u0639",
    "products.subtitle": "\u0625\u0643\u0633\u0633\u0648\u0627\u0631\u0627\u062A \u0641\u0627\u062E\u0631\u0629 \u0644\u0633\u064A\u0627\u0631\u062A\u0643",
    "filter.all": "\u0627\u0644\u0643\u0644",
    "filter.exterior": "\u062E\u0627\u0631\u062C\u064A",
    "filter.interior": "\u062F\u0627\u062E\u0644\u064A",
    "filter.lighting": "\u0625\u0636\u0627\u0621\u0629",
    "filter.utility": "\u0623\u062F\u0648\u0627\u062A",
    "services.label": "\u062E\u062F\u0645\u0627\u062A\u0646\u0627",
    "services.title": "\u062E\u062F\u0645\u0627\u062A\u0646\u0627",
    "services.subtitle": "\u062E\u062F\u0645\u0627\u062A \u0633\u064A\u0627\u0631\u0627\u062A \u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629 \u0641\u064A \u0627\u0644\u0639\u0648\u064A\u0631\u060C \u062F\u0628\u064A",
    "reviews.label": "\u0622\u0631\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u0627\u0621",
    "reviews.title": "\u0645\u0627\u0630\u0627 \u064A\u0642\u0648\u0644 \u0639\u0645\u0644\u0627\u0624\u0646\u0627",
    "location.label": "\u0645\u0648\u0642\u0639\u0646\u0627",
    "location.title": "\u0632\u0648\u0631\u0648\u0627 \u0645\u062A\u062C\u0631\u0646\u0627",
    "location.address.label": "\u0627\u0644\u0639\u0646\u0648\u0627\u0646",
    "location.phone.label": "\u0627\u0644\u0647\u0627\u062A\u0641",
    "location.hours.label": "\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644",
    "location.hours.value": "\u0645\u0641\u062A\u0648\u062D \u064A\u0648\u0645\u064A\u0627\u064B \u062D\u062A\u0649 11 \u0645\u0633\u0627\u0621\u064B",
    "location.directions": "\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0627\u0644\u0627\u062A\u062C\u0627\u0647\u0627\u062A",
    "footer.tagline": "لزينة السيارات وتظليل الزجاج",
    "footer.rights": "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629.",
    "product.order": "\u0627\u0637\u0644\u0628 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628",
    "product.details": "\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644",
    "product.inquire": "\u0627\u0633\u062A\u0641\u0633\u0627\u0631",
    "products.viewAll": "عرض جميع المنتجات",
    "footer.copyright": "\u00a9 2026 وادي العوير لزينة السيارات.",
    "footer.powered": "\u0628\u0646\u0627\u0621",
    "reviews.subtitle": "4.4 \u2605 على جوجل (33 تقييم)",
    "review.1": "\u201cمكان ممتاز لإكسسوارات جيتور. مجموعة واسعة من المنتجات وموظفين متعاونين جداً.\u201d",
    "review.2": "\u201cمعظم الإكسسوارات متوفرة، الفريق رائع وذو خبرة عالية.\u201d",
    "review.3": "\u201cأفضل محل لإكسسوارات جيتور T2 في دبي. تركيب احترافي وأسعار عادلة.\u201d",
    "review.4": "\u201cتشكيلة رائعة من إكسسوارات السيارات. جودة ممتازة وأسعار معقولة. أنصح به!\u201d",
    "review.source": "تقييم جوجل",
    "faq.label": "الأسئلة الشائعة",
    "faq.title": "الأسئلة المتكررة",
    "faq.subtitle": "كل ما تحتاج معرفته",
    "faq.q1": "هل تقدمون خدمة التركيب لجميع الإكسسوارات؟",
    "faq.a1": "نعم، جميع إكسسواراتنا تأتي مع تركيب مجاني احترافي في ورشتنا بالعوير.",
    "faq.q2": "ما هي طرق الدفع المتاحة؟",
    "faq.a2": "نقبل الدفع نقداً، وبالبطاقات الائتمانية/الخصم، وتابي (تقسيط على 4 دفعات بدون فوائد).",
    "faq.q3": "هل الإكسسوارات مشمولة بضمان؟",
    "faq.a3": "بعض المنتجات تأتي بضمان من الشركة المصنعة. تحقق من تفاصيل كل منتج لمعرفة الضمان.",
    "faq.q4": "ما هي السيارات المدعومة؟",
    "faq.a4": "نحن متخصصون في إكسسوارات جيتور T2 (2023-2024) وجيتور روكس 01 (2024-2025).",
    "faq.q5": "كيف يمكنني الطلب؟",
    "faq.a5": "تصفح منتجاتنا، ثم اطلب مباشرة عبر واتساب. سنؤكد التوفر ونرتب التركيب.",
    "faq.q6": "أين موقعكم؟",
    "faq.a6": "نحن في العوير الأولى - دبي (بالقرب من دبي سفاري بارك). مفتوحون يومياً من 9 صباحاً حتى 11 مساءً."
  }
};

/* ----------------------------------------------------------
   Current language state
   ---------------------------------------------------------- */
var _currentLang = 'en';

/* ----------------------------------------------------------
   setLanguage(lang)
   ---------------------------------------------------------- */
function setLanguage(lang) {
  _currentLang = lang;

  /* HTML attributes */
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.dataset.lang = lang;

  /* Persist */
  try { localStorage.setItem('wadi-lang', lang); } catch (e) { /* noop */ }

  /* Translate all data-i18n elements */
  var dict = TRANSLATIONS[lang];
  if (dict) {
    var els = document.querySelectorAll('[data-i18n]');
    els.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });
  }

  /* Re-render dynamic sections */
  if (typeof window.renderCarModels === 'function') window.renderCarModels(lang);
  if (typeof window.renderProducts === 'function') {
    var isHomePage = !window.location.pathname.includes('products.html');
    var activeFilter = document.querySelector('.filter-btn--active');
    var cat = (activeFilter && activeFilter.dataset.category) ? activeFilter.dataset.category : 'all';
    var homeLimit = isHomePage ? 8 : undefined;
    window.renderProducts(lang, cat, _selectedCar, homeLimit);
  }
  if (typeof window.renderServices === 'function') window.renderServices(lang);

  /* Update WhatsApp buttons */
  initWhatsAppButtons();

  /* Re-observe new .animate-in elements after re-render */
  initScrollAnimations();
}

/* ----------------------------------------------------------
   initNavbar()
   ---------------------------------------------------------- */
function initNavbar() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;

  /* Scroll shadow */
  var onScroll = function () {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Active link highlighting via IntersectionObserver */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.navbar__link, .mobile-menu__link');

  if (sections.length && navLinks.length && typeof IntersectionObserver !== 'undefined') {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.remove('navbar__link--active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('navbar__link--active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
}

/* ----------------------------------------------------------
   initHamburger()
   ---------------------------------------------------------- */
function initHamburger() {
  var hamburger = document.querySelector('.navbar__hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  function toggleMenu() {
    hamburger.classList.toggle('navbar__hamburger--active');
    mobileMenu.classList.toggle('mobile-menu--open');

    var isOpen = mobileMenu.classList.contains('mobile-menu--open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      /* Only restore if lightbox isn't open */
      var lightbox = document.getElementById('lightbox');
      var lightboxOpen = lightbox && lightbox.classList.contains('lightbox--open');
      if (!lightboxOpen) {
        document.body.style.overflow = '';
      }
    }
  }

  function closeMenu() {
    hamburger.classList.remove('navbar__hamburger--active');
    mobileMenu.classList.remove('mobile-menu--open');
    hamburger.setAttribute('aria-expanded', 'false');
    var lightbox = document.getElementById('lightbox');
    var lightboxOpen = lightbox && lightbox.classList.contains('lightbox--open');
    if (!lightboxOpen) {
      document.body.style.overflow = '';
    }
  }

  hamburger.addEventListener('click', toggleMenu);

  /* Close on link click */
  var menuLinks = mobileMenu.querySelectorAll('a, button');
  menuLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close on backdrop click (if mobile menu has a backdrop area) */
  mobileMenu.addEventListener('click', function (e) {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });

  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--open')) {
      closeMenu();
    }
  });
}

/* ----------------------------------------------------------
   Car model filter
   ---------------------------------------------------------- */
var _selectedCar = 'all';

function filterByCar(carId) {
  /* If on homepage, navigate to products page with car filter */
  var isHomePage = !window.location.pathname.includes('products.html');
  if (isHomePage) {
    window.location.href = 'products.html?car=' + carId;
    return;
  }

  _selectedCar = carId;

  /* Highlight the selected car card / pill */
  var cards = document.querySelectorAll('.car-card, .car-pill');
  cards.forEach(function(card) {
    var id = card.getAttribute('data-car-id') || card.getAttribute('data-car');
    if (id === carId) {
      card.classList.add('car-card--active');
      card.classList.add('car-pill--active');
    } else {
      card.classList.remove('car-card--active');
      card.classList.remove('car-pill--active');
    }
  });

  /* Reset category filter to 'all' */
  var filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(function(btn) {
    btn.classList.toggle('filter-btn--active', btn.getAttribute('data-category') === 'all');
  });

  /* Re-render products filtered by car */
  window.renderProducts(_currentLang, 'all', carId);

  /* Smooth scroll to products section */
  var productsSection = document.getElementById('products');
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

window.filterByCar = filterByCar;

/* ----------------------------------------------------------
   initFilters()
   ---------------------------------------------------------- */
function initFilters() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      /* Toggle active class */
      filterBtns.forEach(function (b) { b.classList.remove('filter-btn--active'); });
      btn.classList.add('filter-btn--active');

      /* Get category and re-render */
      var category = btn.dataset.category || 'all';
      if (typeof window.renderProducts === 'function') {
        window.renderProducts(_currentLang, category, _selectedCar);
      }

      /* Re-observe new cards for animation */
      initScrollAnimations();
    });
  });
}

/* ----------------------------------------------------------
   initScrollAnimations()
   ---------------------------------------------------------- */
function initScrollAnimations() {
  if (typeof IntersectionObserver === 'undefined') return;

  var elements = document.querySelectorAll('.animate-in:not(.animate-in--visible)');
  if (!elements.length) return;

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        /* Stagger with a small delay based on position among siblings */
        var el = entry.target;
        var parent = el.parentElement;
        var siblings = parent ? Array.prototype.slice.call(parent.querySelectorAll('.animate-in:not(.animate-in--visible)')) : [];
        var siblingIndex = siblings.indexOf(el);
        var delay = siblingIndex >= 0 ? siblingIndex * 80 : 0;

        setTimeout(function () {
          el.classList.add('animate-in--visible');
        }, delay);

        obs.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(function (el) {
    observer.observe(el);
  });
}

/* ----------------------------------------------------------
   initWhatsAppButtons()
   ---------------------------------------------------------- */
function initWhatsAppButtons() {
  if (typeof window.getGeneralWhatsAppURL !== 'function') return;

  var msg = window.getGeneralWhatsAppURL(_currentLang);

  var heroWA = document.getElementById('hero-whatsapp');
  if (heroWA) {
    heroWA.href = '#';
    heroWA.onclick = function(e) { e.preventDefault(); window.openWhatsApp(window.getGeneralWhatsAppURL(_currentLang), 'hero'); };
  }

  var fabWA = document.getElementById('fab-whatsapp');
  if (fabWA) {
    fabWA.href = '#';
    fabWA.onclick = function(e) { e.preventDefault(); window.openWhatsApp(window.getGeneralWhatsAppURL(_currentLang), 'fab'); };
  }
}

/* ----------------------------------------------------------
   Smooth scroll for anchor links
   ---------------------------------------------------------- */
function initSmoothScroll() {
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var targetId = link.getAttribute('href');
    if (targetId === '#' || !targetId) return;

    var target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ----------------------------------------------------------
   Cart System
   ---------------------------------------------------------- */
var _cart = [];

function saveCart() {
  try {
    localStorage.setItem('wadi-cart', JSON.stringify(_cart));
  } catch (e) { /* storage full or unavailable */ }
}

function loadCart() {
  try {
    var stored = localStorage.getItem('wadi-cart');
    if (stored) {
      var parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        _cart = parsed;
      }
    }
  } catch (e) { /* noop */ }
}

function addToCart(productId) {
  var product = window.getProductById(productId);
  if (!product) return;

  var existing = _cart.find(function(item) { return item.id === productId; });
  if (existing) {
    existing.qty += 1;
  } else {
    _cart.push({ id: productId, name: product.name, price: product.price, qty: 1 });
  }

  saveCart();
  updateCartUI();
  showCartNotification();
}

function removeFromCart(productId) {
  _cart = _cart.filter(function(item) { return item.id !== productId; });
  saveCart();
  updateCartUI();
}

function updateCartQty(productId, qty) {
  var item = _cart.find(function(i) { return i.id === productId; });
  if (item) {
    item.qty = Math.max(1, qty);
  }
  saveCart();
  updateCartUI();
}

function getCartTotal() {
  return _cart.reduce(function(sum, item) { return sum + (item.price * item.qty); }, 0);
}

function getCartCount() {
  return _cart.reduce(function(sum, item) { return sum + item.qty; }, 0);
}

function updateCartUI() {
  var badge = document.getElementById('cart-badge');
  var count = getCartCount();
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
  renderCartDrawer();
}

function showCartNotification() {
  var cartBtn = document.getElementById('cart-btn');
  if (cartBtn) {
    cartBtn.classList.add('cart-btn--bounce');
    setTimeout(function() { cartBtn.classList.remove('cart-btn--bounce'); }, 500);
  }

  /* Show toast */
  var existing = document.querySelector('.cart-toast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.className = 'cart-toast';
  toast.textContent = _currentLang === 'ar' ? '\u2713 \u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629' : '\u2713 Added to cart';
  document.body.appendChild(toast);
  setTimeout(function() { if (toast.parentNode) toast.remove(); }, 2500);
}

function toggleCart() {
  var drawer = document.getElementById('cart-drawer');
  var backdrop = document.getElementById('cart-drawer-backdrop');
  if (drawer) {
    drawer.classList.toggle('cart-drawer--open');
    if (backdrop) backdrop.classList.toggle('cart-drawer-backdrop--open');
    document.body.style.overflow = drawer.classList.contains('cart-drawer--open') ? 'hidden' : '';
  }
}

function renderCartDrawer() {
  var lang = _currentLang || 'en';
  var body = document.getElementById('cart-drawer-body');
  var totalEl = document.getElementById('cart-drawer-total');
  var sendBtn = document.getElementById('cart-send-btn');
  var emptyMsg = document.getElementById('cart-empty');

  if (!body) return;

  if (_cart.length === 0) {
    body.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
    if (totalEl) totalEl.style.display = 'none';
    if (sendBtn) sendBtn.style.display = 'none';
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';
  if (totalEl) {
    totalEl.style.display = 'flex';
    totalEl.innerHTML = '<span>' + (lang === 'ar' ? 'المجموع' : 'Total') + '</span><span>' + getCartTotal() + ' AED</span>';
  }
  if (sendBtn) {
    sendBtn.style.display = 'flex';
    sendBtn.href = '#';
    sendBtn.onclick = function(e) { e.preventDefault(); window.openWhatsApp(window.getCartWhatsAppURL(_cart, lang), 'cart'); };
  }

  body.innerHTML = _cart.map(function(item) {
    var product = window.getProductById(item.id);
    var thumb = product ? product.thumbnail : '';
    var name = item.name[lang] || item.name.en;
    return '<div class="cart-item">' +
      '<img class="cart-item__img" src="' + thumb + '" alt="' + name + '" width="60" height="60">' +
      '<div class="cart-item__info">' +
        '<p class="cart-item__name">' + name + '</p>' +
        '<p class="cart-item__price">' + item.price + ' AED × ' + item.qty + '</p>' +
      '</div>' +
      '<div class="cart-item__actions">' +
        '<button class="cart-item__qty-btn" onclick="window.updateCartQty(\'' + item.id + '\', ' + (item.qty - 1) + ')">-</button>' +
        '<span class="cart-item__qty">' + item.qty + '</span>' +
        '<button class="cart-item__qty-btn" onclick="window.updateCartQty(\'' + item.id + '\', ' + (item.qty + 1) + ')">+</button>' +
        '<button class="cart-item__remove" onclick="window.removeFromCart(\'' + item.id + '\')">x</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQty = updateCartQty;
window.toggleCart = toggleCart;

/* ----------------------------------------------------------
   init() -- Master initialization
   ---------------------------------------------------------- */
function init() {
  /* Determine saved language */
  var savedLang = 'en';
  try {
    var stored = localStorage.getItem('wadi-lang');
    if (stored === 'ar' || stored === 'en') {
      savedLang = stored;
    }
  } catch (e) { /* noop */ }

  _currentLang = savedLang;

  /* Set language and render everything */
  setLanguage(savedLang);

  /* Initialise UI behaviours */
  initNavbar();
  initHamburger();
  initFilters();
  initScrollAnimations();
  initWhatsAppButtons();
  initSmoothScroll();

  /* Language toggle button */
  var langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var newLang = _currentLang === 'en' ? 'ar' : 'en';
      setLanguage(newLang);
    });
  }

  /* Restore cart from localStorage */
  loadCart();
  updateCartUI();

  /* Cart button */
  var cartBtn = document.getElementById('cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', toggleCart);
  }
  var cartClose = document.getElementById('cart-drawer-close');
  if (cartClose) {
    cartClose.addEventListener('click', toggleCart);
  }
  var cartBackdrop = document.getElementById('cart-drawer-backdrop');
  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', toggleCart);
  }

  /* FAQ accordion */
  var faqToggles = document.querySelectorAll('.faq-item__toggle');
  faqToggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answer = btn.nextElementSibling;
      if (expanded) {
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        /* Close all others */
        faqToggles.forEach(function (other) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        });
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ----------------------------------------------------------
   Boot
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', init);
