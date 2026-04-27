// Patches next/server.js to lazy-load ua-parser-js (avoids __dirname in Edge Runtime)
const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '..', 'node_modules', 'next', 'server.js')
if (!fs.existsSync(file)) process.exit(0)

let src = fs.readFileSync(file, 'utf8')

// Already patched?
if (src.includes('Object.defineProperty(serverExports')) {
  console.log('next/server.js already patched')
  process.exit(0)
}

// Remove eager userAgent requires from the object literal
src = src.replace(
  /\s*userAgentFromString: require\('next\/dist\/server\/web\/spec-extension\/user-agent'\)\s*\.userAgentFromString,/,
  ''
)
src = src.replace(
  /\s*userAgent: require\('next\/dist\/server\/web\/spec-extension\/user-agent'\)\s*\.userAgent,/,
  ''
)

// Inject lazy getters before module.exports
const injection = `
// Lazy-load ua-parser-js to avoid __dirname in Vercel Edge Runtime
Object.defineProperty(serverExports, 'userAgentFromString', {
  get: () => require('next/dist/server/web/spec-extension/user-agent').userAgentFromString,
  enumerable: true,
})
Object.defineProperty(serverExports, 'userAgent', {
  get: () => require('next/dist/server/web/spec-extension/user-agent').userAgent,
  enumerable: true,
})

`
src = src.replace('module.exports = serverExports', injection + 'module.exports = serverExports')

fs.writeFileSync(file, src, 'utf8')
console.log('Patched next/server.js: lazy-loading ua-parser-js')
