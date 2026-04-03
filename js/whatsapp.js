/* ============================================================
   whatsapp.js  --  Wadi Al Awir Car Accessories
   WhatsApp deep-link URL generators
   ============================================================ */

var WA_NUMBER = '971553573156';

/**
 * Build a WhatsApp order URL for a specific product.
 * @param {Object} product  - product object from PRODUCTS array
 * @param {string} lang     - 'en' or 'ar'
 * @returns {string} wa.me URL with pre-filled message
 */
function getProductWhatsAppURL(product, lang) {
  var message;

  /* Find car model name */
  var carName = product.carYear || '';
  if (typeof window.CAR_MODELS !== 'undefined') {
    var car = window.CAR_MODELS.find(function(c) { return c.id === product.carModel; });
    if (car) carName = car.name[lang] + ' (' + car.years + ')';
  }

  if (lang === 'ar') {
    message =
      '\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645\u060C \u0623\u0648\u062F \u0627\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631 \u0639\u0646:\n\n' +
      '\u0627\u0644\u0645\u0646\u062A\u062C: ' + product.name.ar + '\n' +
      '\u0627\u0644\u0633\u064A\u0627\u0631\u0629: ' + carName + '\n' +
      '\u0627\u0644\u0633\u0639\u0631: ' + product.price + ' \u062F\u0631\u0647\u0645\n\n' +
      '\u0647\u0644 \u0627\u0644\u0645\u0646\u062A\u062C \u0645\u062A\u0648\u0641\u0631\u061F';
  } else {
    message =
      'Hello, I\'m interested in:\n\n' +
      'Product: ' + product.name.en + '\n' +
      'Vehicle: ' + carName + '\n' +
      'Price: ' + product.price + ' AED\n\n' +
      'Is this available?';
  }

  return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
}

/**
 * Build a WhatsApp inquiry URL for a service.
 * @param {Object} service  - service object from SERVICES array
 * @param {string} lang     - 'en' or 'ar'
 * @returns {string} wa.me URL
 */
function getServiceWhatsAppURL(service, lang) {
  var message;

  if (lang === 'ar') {
    message = '\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645\u060C \u0623\u0648\u062F \u0627\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631 \u0639\u0646 \u062E\u062F\u0645\u0629 ' + service.name.ar;
  } else {
    message = 'Hello, I\'d like to inquire about your ' + service.name.en + ' service.';
  }

  return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
}

/**
 * Build a general WhatsApp inquiry URL.
 * @param {string} lang - 'en' or 'ar'
 * @returns {string} wa.me URL
 */
function getGeneralWhatsAppURL(lang) {
  var message;

  if (lang === 'ar') {
    message = '\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645\u060C \u0623\u0648\u062F \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0645\u0632\u064A\u062F \u0639\u0646 \u0645\u0646\u062A\u062C\u0627\u062A\u0643\u0645 \u0648\u062E\u062F\u0645\u0627\u062A\u0643\u0645';
  } else {
    message = 'Hello, I\'d like to learn more about your products and services.';
  }

  return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
}

/**
 * Build a WhatsApp order URL for cart items.
 * @param {Array} cartItems - array of {id, name, price, qty} objects
 * @param {string} lang     - 'en' or 'ar'
 * @returns {string} wa.me URL with pre-filled message
 */
function getCartWhatsAppURL(cartItems, lang) {
  var WHATSAPP_NUMBER = '971553573156';
  var lines = [];
  var total = 0;

  if (lang === 'ar') {
    lines.push('السلام عليكم، أود طلب المنتجات التالية:');
    lines.push('');
    cartItems.forEach(function(item, i) {
      lines.push((i+1) + '. ' + item.name.ar + ' — ' + item.price + ' درهم × ' + item.qty);
      total += item.price * item.qty;
    });
    lines.push('');
    lines.push('المجموع: ' + total + ' درهم');
    lines.push('');
    lines.push('هل هذه المنتجات متوفرة؟');
  } else {
    lines.push('Hello, I would like to order:');
    lines.push('');
    cartItems.forEach(function(item, i) {
      lines.push((i+1) + '. ' + item.name.en + ' — ' + item.price + ' AED × ' + item.qty);
      total += item.price * item.qty;
    });
    lines.push('');
    lines.push('Total: ' + total + ' AED');
    lines.push('');
    lines.push('Are these items available?');
  }

  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
}

window.getCartWhatsAppURL = getCartWhatsAppURL;

/* Expose globals */
window.getProductWhatsAppURL = getProductWhatsAppURL;
window.getServiceWhatsAppURL = getServiceWhatsAppURL;
window.getGeneralWhatsAppURL = getGeneralWhatsAppURL;
