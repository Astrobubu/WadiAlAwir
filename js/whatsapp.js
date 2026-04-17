/* ============================================================
   whatsapp.js  --  Wadi Al Awir Car Accessories
   WhatsApp deep-link URL generators
   ============================================================ */

var WA_NUMBERS = [
  { id: '971553573156', label: { en: 'Line 1', ar: 'الخط 1' } },
  { id: '971581796614', label: { en: 'Line 2', ar: 'الخط 2' } }
];
var WA_NUMBER = WA_NUMBERS[0].id;

/* ----------------------------------------------------------
   WhatsApp Number Picker
   Shows a small popup letting the user choose which line.
   ---------------------------------------------------------- */
var _waPendingMessage = '';

function _createWAPicker() {
  if (document.getElementById('wa-picker')) return;

  var picker = document.createElement('div');
  picker.id = 'wa-picker';
  picker.className = 'wa-picker';
  picker.setAttribute('aria-hidden', 'true');
  picker.innerHTML =
    '<div class="wa-picker__backdrop"></div>' +
    '<div class="wa-picker__card">' +
      '<p class="wa-picker__title" id="wa-picker-title">Choose a WhatsApp line</p>' +
      '<div class="wa-picker__buttons" id="wa-picker-buttons"></div>' +
      '<p class="wa-picker__hint" id="wa-picker-hint">If one line doesn\'t reply, try the other</p>' +
    '</div>';
  document.body.appendChild(picker);

  picker.querySelector('.wa-picker__backdrop').addEventListener('click', _closeWAPicker);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') _closeWAPicker();
  });
}

function _closeWAPicker() {
  var picker = document.getElementById('wa-picker');
  if (picker) {
    picker.setAttribute('aria-hidden', 'true');
    picker.classList.remove('wa-picker--open');
  }
}

function _openWAPicker(encodedMessage, source, productId) {
  _waPendingMessage = { source: source, productId: productId || '' };
  _createWAPicker();

  var lang = (document.body.dataset && document.body.dataset.lang) || 'en';
  var picker = document.getElementById('wa-picker');
  var titleEl = document.getElementById('wa-picker-title');
  var hintEl = document.getElementById('wa-picker-hint');
  var buttonsEl = document.getElementById('wa-picker-buttons');

  if (titleEl) {
    titleEl.textContent = lang === 'ar'
      ? 'اختر رقم الواتساب'
      : 'Choose a WhatsApp line';
  }
  if (hintEl) {
    hintEl.textContent = lang === 'ar'
      ? 'إذا لم يرد أحد الخطوط، جرّب الآخر'
      : 'If one line doesn\'t reply, try the other';
  }

  buttonsEl.innerHTML = WA_NUMBERS.map(function(num) {
    var url = 'https://wa.me/' + num.id + '?text=' + encodedMessage;
    var source = _waPendingMessage.source || 'unknown';
    var productId = _waPendingMessage.productId || '';
    var eventLabel = source + (productId ? ' | ' + productId : '');
    return '<a class="btn btn--whatsapp wa-picker__btn" href="' + url + '" target="_blank" rel="noopener" onclick="if(typeof gtag===\'function\'){gtag(\'event\',\'whatsapp_click\',{event_category:\'engagement\',event_label:eventLabel,transport_type:\'beacon\',send_to:\'G-P2VSYNSK2W\'});}setTimeout(function(){document.getElementById(\'wa-picker\').classList.remove(\'wa-picker--open\');},200);">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
      '<span>' + num.label[lang] + '</span>' +
    '</a>';
  }).join('');

  picker.classList.add('wa-picker--open');
  picker.setAttribute('aria-hidden', 'false');

  if (typeof haptic === 'function') haptic('select');
}

/* ----------------------------------------------------------
   Intercept WhatsApp navigation — show picker instead
   ---------------------------------------------------------- */
function openWhatsApp(encodedMessage, source, productId) {
  _openWAPicker(encodedMessage, source || 'general', productId || '');
}

/**
 * Build a WhatsApp order URL for a specific product.
 */
function getProductWhatsAppURL(product, lang) {
  var message;

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

  return encodeURIComponent(message);
}

/**
 * Build a WhatsApp inquiry URL for a service.
 */
function getServiceWhatsAppURL(service, lang) {
  var message;

  if (lang === 'ar') {
    message = '\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645\u060C \u0623\u0648\u062F \u0627\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631 \u0639\u0646 \u062E\u062F\u0645\u0629 ' + service.name.ar;
  } else {
    message = 'Hello, I\'d like to inquire about your ' + service.name.en + ' service.';
  }

  return encodeURIComponent(message);
}

/**
 * Build a general WhatsApp inquiry URL.
 */
function getGeneralWhatsAppURL(lang) {
  var message;

  if (lang === 'ar') {
    message = '\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645\u060C \u0623\u0648\u062F \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0645\u0632\u064A\u062F \u0639\u0646 \u0645\u0646\u062A\u062C\u0627\u062A\u0643\u0645 \u0648\u062E\u062F\u0645\u0627\u062A\u0643\u0645';
  } else {
    message = 'Hello, I\'d like to learn more about your products and services.';
  }

  return encodeURIComponent(message);
}

/**
 * Build a WhatsApp order URL for cart items.
 */
function getCartWhatsAppURL(cartItems, lang) {
  var lines = [];
  var total = 0;

  if (lang === 'ar') {
    lines.push('السلام عليكم، أود طلب المنتجات التالية:');
    lines.push('');
    cartItems.forEach(function(item, i) {
      var varAr = item.variant ? ' (' + (item.variant.ar || item.variant.en) + ')' : '';
      lines.push((i+1) + '. ' + item.name.ar + varAr + ' — ' + item.price + ' درهم × ' + item.qty);
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
      var varEn = item.variant ? ' (' + (item.variant.en || item.variant.ar) + ')' : '';
      lines.push((i+1) + '. ' + item.name.en + varEn + ' — ' + item.price + ' AED × ' + item.qty);
      total += item.price * item.qty;
    });
    lines.push('');
    lines.push('Total: ' + total + ' AED');
    lines.push('');
    lines.push('Are these items available?');
  }

  return encodeURIComponent(lines.join('\n'));
}

window.getCartWhatsAppURL = getCartWhatsAppURL;
window.openWhatsApp = openWhatsApp;

/* Expose globals */
window.getProductWhatsAppURL = getProductWhatsAppURL;
window.getServiceWhatsAppURL = getServiceWhatsAppURL;
window.getGeneralWhatsAppURL = getGeneralWhatsAppURL;
