import assert from 'node:assert/strict'
import test from 'node:test'

const { getCartWhatsAppMessage } = await import('./whatsapp' + '.ts')

const item = {
  id: 'mud-flaps',
  name: { en: '4Pcs Mudguards Mud Flaps', ar: 'طقم واقيات طين 4 قطع' },
  vehicle: { en: 'BYD Leopard 5', ar: 'بي واي دي ليوبارد 5' },
  carYear: '2024–2026',
  price: 250,
  qty: 1,
}

test('English cart message identifies the vehicle for each product', () => {
  const message = decodeURIComponent(getCartWhatsAppMessage([item], 'en'))

  assert.match(message, /Vehicle: BYD Leopard 5 \(2024–2026\)/)
})

test('Arabic cart message identifies the localized vehicle for each product', () => {
  const message = decodeURIComponent(getCartWhatsAppMessage([item], 'ar'))

  assert.match(message, /السيارة: بي واي دي ليوبارد 5 \(2024–2026\)/)
})
