// Turns the client build into one static HTML file per route, plus 404.html and sitemap.xml.
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.ts --outDir dist-ssr`.
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const ssrDir = fileURLToPath(new URL('../dist-ssr/', import.meta.url))
const { render, pagePaths, SITE } = await import(`${ssrDir}entry-server.js`)

const template = await readFile(`${dist}index.html`, 'utf8')
const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/
const APP_ROOT = '<div id="app"></div>'
if (!SEO_BLOCK.test(template) || !template.includes(APP_ROOT) || !template.includes('<body>')) {
  throw new Error('dist/index.html is missing the <!--seo--> block, <body> or the empty #app root.')
}

const escapeAttr = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

// Route components are lazy chunks, so without these links their CSS would only arrive after the
// JS runs, restyling the prerendered page and causing a large layout shift.
const ssrManifest = JSON.parse(await readFile(`${dist}.vite/ssr-manifest.json`, 'utf8'))

function chunkLinks(modules) {
  const files = new Set(modules.flatMap(id => ssrManifest[id] ?? []))
  const links = []
  for (const file of files) {
    if (template.includes(file)) continue
    if (file.endsWith('.css')) links.push(`<link rel="stylesheet" crossorigin href="${file}">`)
    else if (file.endsWith('.js')) links.push(`<link rel="modulepreload" crossorigin href="${file}">`)
  }
  return links.length ? `  ${links.join('\n    ')}\n  ` : ''
}

// Fonts are otherwise only discovered after the stylesheet is parsed; text painted in the fallback
// font then reflows when they swap in. Only the latin subsets are used by the English copy.
const FONT_FILE = /^(inter-latin-(300|400|500|600)-normal|playfair-display-latin-(400|500)-normal|playfair-display-latin-400-italic)-[\w-]+\.woff2$/
const fontPreloads = (await readdir(`${dist}assets`))
  .filter(file => FONT_FILE.test(file))
  .map(file => `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${file}">`)
if (fontPreloads.length !== 7) throw new Error(`Expected 7 latin font files, found ${fontPreloads.length}.`)
const FONT_LINKS = `  ${fontPreloads.join('\n    ')}\n  `

// Function replacers keep `$` in page copy (e.g. "C$10m") from being read as a replacement pattern.
function toHtml(rendered, dataPath) {
  const body = rendered.bodyClass ? `<body class="${escapeAttr(rendered.bodyClass)}">` : '<body>'
  return template
    .replace(SEO_BLOCK, () => rendered.head)
    .replace('</head>', () => `${FONT_LINKS}${chunkLinks(rendered.modules)}</head>`)
    .replace('<body>', () => body)
    .replace(APP_ROOT, () => `<div id="app" data-path="${escapeAttr(dataPath)}">${rendered.html}</div>`)
}

async function write(file, html) {
  const target = `${dist}${file}`
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, html)
}

const fileFor = path => (path === '/' ? 'index.html' : `${path.slice(1)}.html`)
const indexable = []

for (const path of pagePaths) {
  const rendered = await render(path)
  if (rendered.seo.path !== path) throw new Error(`Canonical mismatch for ${path}: ${rendered.seo.path}`)
  await write(fileFor(path), toHtml(rendered, path))
  if (rendered.seo.indexable) indexable.push(path)
  console.log(`prerendered ${path.padEnd(16)} → ${fileFor(path)}${rendered.seo.indexable ? '' : ' (noindex)'}`)
}

// Served by the CDN with HTTP 404 for unknown paths; never hydrated (empty data-path).
await write('404.html', toHtml(await render('/__not-found__'), ''))
console.log('prerendered 404              → 404.html (noindex)')

const urls = indexable.map(path => `  <url>\n    <loc>${new URL(path, SITE.origin).href}</loc>\n  </url>`)
await write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
)
console.log(`sitemap.xml with ${indexable.length} URLs`)

await rm(ssrDir, { recursive: true, force: true })
await rm(`${dist}.vite`, { recursive: true, force: true })
