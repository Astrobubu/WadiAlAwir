import assert from 'node:assert/strict'
import test from 'node:test'

import { NextRequest } from 'next/server.js'

const { middleware } = await import('./middleware' + '.ts')

test('public locale navigation does not rewrite an unchanged locale cookie', async () => {
  const request = new NextRequest('https://wadialawir.com/en/products', {
    headers: { cookie: 'wadi-lang=en' },
  })

  const response = await middleware(request)

  assert.equal(response.headers.get('set-cookie'), null)
})
