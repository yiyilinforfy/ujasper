// Verifies the prerendered build in dist/ and the CloudFront viewer-request function.
// Usage: npm run build && npm run check:seo
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ORIGIN = 'https://ujasper.ca'
const root = fileURLToPath(new URL('..', import.meta.url))
const dist = join(root, 'dist')
const failures = []
const fail = message => failures.push(message)

const decode = value =>
  value.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&amp;/g, '&')

function htmlFiles(dir) {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return name === 'assets' ? [] : htmlFiles(path)
    return name.endsWith('.html') ? [path] : []
  })
}

function headOf(html) {
  const head = html.slice(0, html.indexOf('</head>'))
  const metas = [...head.matchAll(/<meta\s+(name|property)="([^"]+)"\s+content="([^"]*)"/g)].map(m => ({
    key: m[2],
    content: decode(m[3]),
  }))
  return {
    titles: [...head.matchAll(/<title>([^<]*)<\/title>/g)].map(m => decode(m[1])),
    canonicals: [...head.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map(m => m[1]),
    metas,
    meta: key => metas.filter(m => m.key === key).map(m => m.content),
    jsonld: [...head.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]),
  }
}

const pathFor = file => {
  const rel = relative(dist, file).replace(/\.html$/, '')
  return rel === 'index' ? '/' : `/${rel}`
}

const pages = htmlFiles(dist)
  .filter(file => !file.endsWith('404.html'))
  .map(file => ({ file, path: pathFor(file), html: readFileSync(file, 'utf8') }))
const pagePaths = new Set(pages.map(p => p.path))
const rows = []
const seenTitles = new Map()
const seenDescriptions = new Map()
const indexable = new Set()

for (const page of pages) {
  const head = headOf(page.html)
  const [title] = head.titles
  const [description] = head.meta('description')
  const [robots] = head.meta('robots')
  const isIndexable = robots?.startsWith('index')
  const url = new URL(page.path, ORIGIN).href

  if (head.titles.length !== 1) fail(`${page.path}: expected one <title>, found ${head.titles.length}`)
  for (const { key } of head.metas) {
    if (head.meta(key).length > 1) fail(`${page.path}: duplicate meta ${key}`)
  }
  if (!description) fail(`${page.path}: missing description`)
  if (!robots) fail(`${page.path}: missing robots meta`)
  if (/noindex/.test(page.html.slice(0, page.html.indexOf('</head>'))) && isIndexable) fail(`${page.path}: conflicting robots`)

  if (isIndexable) {
    indexable.add(url)
    if (head.canonicals.length !== 1 || head.canonicals[0] !== url) fail(`${page.path}: canonical ${head.canonicals} ≠ ${url}`)
    if (seenTitles.has(title)) fail(`${page.path}: title duplicates ${seenTitles.get(title)}`)
    if (seenDescriptions.has(description)) fail(`${page.path}: description duplicates ${seenDescriptions.get(description)}`)
    seenTitles.set(title, page.path)
    seenDescriptions.set(description, page.path)
  } else if (head.canonicals.length) {
    fail(`${page.path}: noindex page should not declare a canonical URL`)
  }

  const [ogUrl] = head.meta('og:url')
  if (ogUrl !== url) fail(`${page.path}: og:url ${ogUrl} ≠ ${url}`)
  for (const key of ['og:title', 'og:description', 'og:type', 'og:image', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
    if (!head.meta(key)[0]) fail(`${page.path}: missing ${key}`)
  }
  for (const image of [...head.meta('og:image'), ...head.meta('twitter:image')]) {
    if (!image.startsWith(`${ORIGIN}/`)) fail(`${page.path}: image ${image} is not an absolute ${ORIGIN} URL`)
    else if (!existsSync(join(dist, new URL(image).pathname))) fail(`${page.path}: image ${image} does not exist in dist`)
  }

  if (head.jsonld.length !== 1) fail(`${page.path}: expected one JSON-LD block`)
  for (const block of head.jsonld) {
    let data
    try {
      data = JSON.parse(block)
    } catch (error) {
      fail(`${page.path}: JSON-LD does not parse (${error.message})`)
      continue
    }
    const types = data['@graph'].map(node => node['@type'])
    for (const required of ['Organization', 'WebSite', 'WebPage']) {
      if (!types.includes(required)) fail(`${page.path}: JSON-LD missing ${required}`)
    }
    for (const forbidden of ['CollegeOrUniversity', 'EducationalOrganization', 'Course', 'FAQPage', 'Review', 'AggregateRating']) {
      if (JSON.stringify(data).includes(`"${forbidden}"`)) fail(`${page.path}: JSON-LD uses unsupported claim type ${forbidden}`)
    }
    const webPage = data['@graph'].find(node => node['@type'] === 'WebPage')
    if (webPage?.url !== url) fail(`${page.path}: WebPage url ${webPage?.url} ≠ ${url}`)
    if (webPage?.name !== title || webPage?.description !== description) fail(`${page.path}: WebPage name/description differ from meta`)
  }

  const app = page.html.slice(page.html.indexOf('<div id="app"'))
  const h1s = app.match(/<h1[\s>]/g)?.length ?? 0
  if (h1s !== 1) fail(`${page.path}: expected one <h1> in prerendered markup, found ${h1s}`)
  if (!page.html.includes(`data-path="${page.path}"`)) fail(`${page.path}: #app is not prerendered for its path`)

  // Internal links and assets must resolve to a prerendered page, a legacy alias or a real file.
  for (const [, attr, raw] of app.matchAll(/\s(href|src)="(\/[^"]*)"/g)) {
    if (raw.startsWith('//')) continue
    const target = decode(raw).split(/[?#]/)[0] || '/'
    const known =
      pagePaths.has(target) ||
      pagePaths.has(target.replace(/\.html$/, '')) ||
      ['/teachers', '/students'].includes(target) ||
      existsSync(join(dist, target))
    if (!known) fail(`${page.path}: broken internal ${attr} ${raw}`)
  }

  rows.push({ path: page.path, index: isIndexable ? 'yes' : 'noindex', title: `${title} (${title.length})`, desc: description.length })
}

// 404 page
const notFound = readFileSync(join(dist, '404.html'), 'utf8')
if (!/<meta name="robots" content="noindex/.test(notFound)) fail('404.html: must be noindex')
if (!notFound.includes('data-path=""')) fail('404.html: must not be hydrated as a real route')

// sitemap.xml
const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8')
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
if (!sitemap.startsWith('<?xml') || !sitemap.includes('http://www.sitemaps.org/schemas/sitemap/0.9')) fail('sitemap.xml: invalid header')
if (new Set(locs).size !== locs.length) fail('sitemap.xml: duplicate URLs')
for (const loc of locs) if (!indexable.has(loc)) fail(`sitemap.xml: ${loc} is not an indexable canonical page`)
for (const url of indexable) if (!locs.includes(url)) fail(`sitemap.xml: missing ${url}`)

// robots.txt
const robots = readFileSync(join(dist, 'robots.txt'), 'utf8')
if (!robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) fail('robots.txt: missing sitemap URL')
if (/^Disallow:\s*\/\s*$/m.test(robots)) fail('robots.txt: blocks the whole site')

// CloudFront viewer-request function
const fnSource = readFileSync(join(root, 'deploy/cloudfront-viewer-request.js'), 'utf8')
const handler = new Function(`${fnSource}; return handler;`)()
const event = (uri, query = {}, host = 'ujasper.ca') => ({
  request: { uri, querystring: query, headers: { host: { value: host } } },
})
const cases = [
  ['/', {}, 'ujasper.ca', { uri: '/index.html' }],
  ['/support', {}, 'ujasper.ca', { uri: '/support.html' }],
  ['/join/teachers', {}, 'ujasper.ca', { uri: '/join/teachers.html' }],
  ['/fieldbook', { week: { value: '2' } }, 'ujasper.ca', { uri: '/fieldbook.html' }],
  ['/assets/cards/hike.jpg', {}, 'ujasper.ca', { uri: '/assets/cards/hike.jpg' }],
  ['/robots.txt', {}, 'ujasper.ca', { uri: '/robots.txt' }],
  ['/404.html', {}, 'ujasper.ca', { uri: '/404.html' }],
  ['/nope', {}, 'ujasper.ca', { uri: '/nope.html' }],
  ['/support/', {}, 'ujasper.ca', { location: '/support' }],
  ['/vision.html', {}, 'ujasper.ca', { location: '/vision' }],
  ['/index.html', {}, 'ujasper.ca', { location: '/' }],
  ['/teachers', {}, 'ujasper.ca', { location: '/join/teachers' }],
  ['/students.html', {}, 'ujasper.ca', { location: '/join/students' }],
  ['/teachers/', {}, 'ujasper.ca', { location: '/join/teachers' }],
  ['/join/students', { from: { value: 'program' } }, 'ujasper.ca', { uri: '/join/students.html' }],
  ['/program/', { a: { value: '1' } }, 'ujasper.ca', { location: '/program?a=1' }],
  ['/vision', {}, 'www.ujasper.ca', { location: 'https://ujasper.ca/vision' }],
]
for (const [uri, query, host, expected] of cases) {
  const result = handler(event(uri, query, host))
  if (expected.uri && (result.statusCode || result.uri !== expected.uri)) {
    fail(`cloudfront ${host}${uri}: expected rewrite to ${expected.uri}, got ${JSON.stringify(result)}`)
  }
  if (expected.location && (result.statusCode !== 301 || result.headers.location.value !== expected.location)) {
    fail(`cloudfront ${host}${uri}: expected 301 → ${expected.location}, got ${JSON.stringify(result)}`)
  }
}

console.table(rows)
console.log(`sitemap URLs: ${locs.length} · CloudFront cases: ${cases.length}`)
if (failures.length) {
  console.error(`\n${failures.length} SEO check(s) failed:\n- ${failures.join('\n- ')}`)
  process.exit(1)
}
console.log('All SEO checks passed.')
