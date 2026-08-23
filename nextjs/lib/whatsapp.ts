/* ============================================================
   whatsapp.ts  --  Wadi Al Awir Car Accessories (Next.js)
   WhatsApp deep-link message generators
   ============================================================ */

export type Lang = 'en' | 'ar';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface CartItem {
  id: string;
  name: LocalizedString;
  vehicle?: LocalizedString;
  carYear?: string;
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
      if (item.vehicle) {
        const vehicle = item.vehicle.ar || item.vehicle.en;
        const year = item.carYear ? ' (' + item.carYear + ')' : '';
        lines.push('   السيارة: ' + vehicle + year);
      }
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
      if (item.vehicle) {
        const vehicle = item.vehicle.en || item.vehicle.ar;
        const year = item.carYear ? ' (' + item.carYear + ')' : '';
        lines.push('   Vehicle: ' + vehicle + year);
      }
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
