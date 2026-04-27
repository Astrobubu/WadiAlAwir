/* ============================================================
   whatsapp.ts  --  Wadi Al Awir Car Accessories (Next.js)
   WhatsApp deep-link message generators
   ============================================================ */

export type Lang = 'en' | 'ar';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface Product {
  id: string;
  name: LocalizedString;
  price: number;
  carModel?: string;
  carYear?: string;
  [key: string]: unknown;
}

export interface CartItem {
  id: string;
  name: LocalizedString;
  price: number;
  qty: number;
  variant?: LocalizedString;
}

export interface WANumber {
  id: string;
  label: LocalizedString;
}

/* ----------------------------------------------------------
   WhatsApp line numbers
   ---------------------------------------------------------- */
export const WA_NUMBERS: WANumber[] = [
  { id: '971553573156', label: { en: 'Line 1', ar: 'الخط 1' } },
  { id: '971581796614', label: { en: 'Line 2', ar: 'الخط 2' } },
];

/* ----------------------------------------------------------
   getProductWhatsAppMessage
   Returns a URL-encoded WhatsApp message for a product inquiry.
   ---------------------------------------------------------- */
export function getProductWhatsAppMessage(
  product: Product,
  carModelName: string,
  lang: Lang
): string {
  let message: string;

  if (lang === 'ar') {
    message =
      'السلام عليكم، أود الاستفسار عن:\n\n' +
      'المنتج: ' + product.name.ar + '\n' +
      'السيارة: ' + carModelName + '\n' +
      'السعر: ' + product.price + ' درهم\n\n' +
      'هل المنتج متوفر؟';
  } else {
    message =
      "Hello, I'm interested in:\n\n" +
      'Product: ' + product.name.en + '\n' +
      'Vehicle: ' + carModelName + '\n' +
      'Price: ' + product.price + ' AED\n\n' +
      'Is this available?';
  }

  return encodeURIComponent(message);
}

/* ----------------------------------------------------------
   getServiceWhatsAppMessage
   Returns a URL-encoded WhatsApp message for a service inquiry.
   ---------------------------------------------------------- */
export function getServiceWhatsAppMessage(
  serviceName: LocalizedString,
  lang: Lang
): string {
  let message: string;

  if (lang === 'ar') {
    message = 'السلام عليكم، أود الاستفسار عن خدمة ' + serviceName.ar;
  } else {
    message =
      "Hello, I'd like to inquire about your " + serviceName.en + ' service.';
  }

  return encodeURIComponent(message);
}

/* ----------------------------------------------------------
   getCartWhatsAppMessage
   Builds a multi-line cart message with itemised list and total.
   ---------------------------------------------------------- */
export function getCartWhatsAppMessage(
  cartItems: CartItem[],
  lang: Lang
): string {
  const lines: string[] = [];
  let total = 0;

  if (lang === 'ar') {
    lines.push('السلام عليكم، أود طلب المنتجات التالية:');
    lines.push('');
    cartItems.forEach((item, i) => {
      const variant =
        item.variant ? ' (' + (item.variant.ar || item.variant.en) + ')' : '';
      lines.push(
        (i + 1) +
          '. ' +
          item.name.ar +
          variant +
          ' — ' +
          item.price +
          ' درهم × ' +
          item.qty
      );
      total += item.price * item.qty;
    });
    lines.push('');
    lines.push('المجموع: ' + total + ' درهم');
    lines.push('');
    lines.push('هل هذه المنتجات متوفرة؟');
  } else {
    lines.push('Hello, I would like to order:');
    lines.push('');
    cartItems.forEach((item, i) => {
      const variant =
        item.variant ? ' (' + (item.variant.en || item.variant.ar) + ')' : '';
      lines.push(
        (i + 1) +
          '. ' +
          item.name.en +
          variant +
          ' — ' +
          item.price +
          ' AED × ' +
          item.qty
      );
      total += item.price * item.qty;
    });
    lines.push('');
    lines.push('Total: ' + total + ' AED');
    lines.push('');
    lines.push('Are these items available?');
  }

  return encodeURIComponent(lines.join('\n'));
}

/* ----------------------------------------------------------
   buildWhatsAppURL
   Convenience helper — combines a number id with an encoded message.
   ---------------------------------------------------------- */
export function buildWhatsAppURL(numberId: string, encodedMessage: string): string {
  return 'https://wa.me/' + numberId + '?text=' + encodedMessage;
}
