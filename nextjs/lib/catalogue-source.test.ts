import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'

function filesUnder(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const file = path.join(directory, name)
    return statSync(file).isDirectory() ? filesUnder(file) : [file]
  })
}

test('the storefront catalogue has no Sanity or legacy-data fallback', () => {
  const root = process.cwd()
  const runtimeFiles = filesUnder(path.join(root, 'lib')).filter((file) =>
    /\.(ts|tsx)$/.test(file) && !/\.test\.(ts|tsx)$/.test(file)
  )
  const runtimeSource = runtimeFiles
    .map((file) => readFileSync(file, 'utf8'))
    .join('\n')
  const packageJson = readFileSync(path.join(root, 'package.json'), 'utf8')

  assert.doesNotMatch(runtimeSource, /@sanity|next-sanity|getSanity|Falling back to Sanity/)
  assert.doesNotMatch(runtimeSource, /_type:\s*['"](?:product|carModel|service)['"]|slug:\s*\{\s*current:/)
  assert.doesNotMatch(packageJson, /@sanity|next-sanity|"sanity"/)
})
