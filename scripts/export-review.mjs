// Export rendered pages as self-contained HTML files (text + used CSS, images and links as placeholders) for UI/UX review.
// Usage: npm run review:export -- [page ...]   e.g. `discover`, `vision students`, or `all`
// Section export: npm run review:export -- discover --from .home-facts --to .home-participate --out discover-sections
//   keeps only the sibling sections from..to (inclusive), real images (copied to <out dir>/assets) and real external links.
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'
import { createServer } from 'vite'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = process.env.REVIEW_DIR ?? path.join(os.homedir(), 'Desktop', 'review')
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const PAGES = {
  discover: '/',
  vision: '/vision',
  program: '/program',
  teachers: '/teachers',
  students: '/students',
  publications: '/publications',
  support: '/support',
  letter: '/letter',
  fieldbook: '/fieldbook',
  join: '/join',
  care: '/care',
  sources: '/sources',
}

// Whitespace between these tags never renders, so line breaks can be added there safely.
const BLOCK_TAGS = new Set(
  'html head body header footer main nav section article aside div p h1 h2 h3 h4 h5 h6 ul ol li dl dt dd figure figcaption form fieldset legend details summary dialog table thead tbody tr td th blockquote hr style script meta title link'.split(' '),
)

// Same behaviour as the site's menu button and inquiry switcher; placeholder links do nothing.
const INTERACTION_SCRIPT = `
document.querySelectorAll('a[data-placeholder]').forEach(a => a.addEventListener('click', e => e.preventDefault()))
const menu = document.getElementById('site-menu')
const toggle = document.querySelector('.site-header__toggle')
const setMenu = open => {
  menu.hidden = !open
  toggle?.setAttribute('aria-expanded', String(open))
  document.body.style.overflow = open ? 'hidden' : ''
}
toggle?.addEventListener('click', () => setMenu(true))
menu?.querySelector('.site-menu__close')?.addEventListener('click', () => setMenu(false))
document.querySelectorAll('.inquiry-section').forEach(section => {
  const buttons = [...section.querySelectorAll('[data-inquiry]')]
  const panels = [...section.querySelectorAll('.inquiry-panel')]
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)))
    panels.forEach(panel => { panel.hidden = panel.id !== button.getAttribute('aria-controls') })
  }))
})
document.querySelectorAll('[role="tablist"]').forEach(list => {
  const tabs = [...list.querySelectorAll('[role="tab"]')]
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(item => {
      const on = item === tab
      item.setAttribute('aria-selected', String(on))
      item.tabIndex = on ? 0 : -1
      const panel = document.getElementById(item.getAttribute('aria-controls'))
      if (panel) panel.hidden = !on
    })
  }))
})`

const requested = []
const flags = {}
for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i]
  if (arg.startsWith('--')) flags[arg.slice(2)] = process.argv[++i]
  else requested.push(arg)
}
const names = requested.length === 0 ? ['discover'] : requested.includes('all') ? Object.keys(PAGES) : requested
for (const name of names) {
  if (!PAGES[name]) throw new Error(`Unknown page "${name}". Use one of: ${Object.keys(PAGES).join(', ')}, all`)
}
const range = flags.from && flags.to ? { from: flags.from, to: flags.to } : null
if (range && names.length !== 1) throw new Error('--from/--to work with exactly one page')

const server = await createServer({ root: ROOT, logLevel: 'error', server: { port: 0 } })
await server.listen()
const base = server.resolvedUrls.local[0].replace(/\/$/, '')
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true })

try {
  await fs.mkdir(OUT_DIR, { recursive: true })
  for (const name of names) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 900 })
    await page.goto(base + PAGES[name], { waitUntil: 'networkidle0' })
    const data = await page.evaluate(collectPage, range)
    await page.close()

    for (const [url, asset] of data.assets) {
      const source = url.startsWith('/assets/')
        ? path.join(ROOT, 'public', url)
        : url.startsWith('/@fs/')
          ? url.slice('/@fs'.length)
          : path.join(ROOT, url)
      const target = path.join(OUT_DIR, asset)
      await fs.mkdir(path.dirname(target), { recursive: true })
      await fs.copyFile(source, target)
    }
    const html = buildHtml(name, data)
    const file = path.join(OUT_DIR, `${flags.out ?? name}.html`)
    await fs.writeFile(file, html)
    console.log(`${file}  ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`)
  }
} finally {
  await browser.close()
  await server.close()
}

function formatHtml(markup) {
  const tokens = markup.split(/(<[^>]+>)/).filter(Boolean)
  const tagName = token => /^<\/?([a-zA-Z0-9-]+)/.exec(token)?.[1].toLowerCase()
  let out = ''
  let depth = 0
  let prev = null
  for (const token of tokens) {
    const name = token.startsWith('<') ? tagName(token) : null
    const closing = token.startsWith('</')
    const isBlock = name && BLOCK_TAGS.has(name)
    if (closing && isBlock) depth--
    if (isBlock && prev && BLOCK_TAGS.has(tagName(prev) ?? '')) out += '\n' + '  '.repeat(Math.max(depth, 0))
    out += token
    if (isBlock && !closing && !/^<(meta|link|hr)\b/.test(token)) depth++
    prev = token.startsWith('<') ? token : null
  }
  return out
}

function buildHtml(name, { title, description, bodyClass, body, css, selfHostedFonts }) {
  const fontLink = selfHostedFonts
    ? ''
    : '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap">\n'
  const styles = range ? css : css.replace(/url\("[^"]+\.(?:jpe?g|png|webp)"\)/g, 'linear-gradient(#c5cfd8, #c5cfd8)')
  const markup = body
  const notes = range
    ? `  Sections ${range.from} to ${range.to} only. Images load from ./assets;
  external links work, site-internal links keep their styling but go nowhere (data-placeholder="link: target").`
    : `  Placeholders: images are grey boxes at the original aspect ratio (data-placeholder="image: file");
  links and downloads keep their styling but go nowhere (data-placeholder="link: target" / "download: file").`
  return `<!doctype html>
<!--
  University of Jasper — "${name}" page, single-file export for UI/UX review.
  Rendered from the Vue app (route ${PAGES[name]}). CSS contains only the rules this page uses,
  grouped by original stylesheet in cascade order; print rules are omitted.
${notes}
-->
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
${fontLink}<style>
${styles}
</style>
</head>
<body class="${bodyClass}">
${formatHtml(markup)}
<script>${INTERACTION_SCRIPT}
</script>
</body>
</html>
`
}

// Runs in the browser.
async function collectPage(range) {
  // Drop everything outside the range first, so CSS pruning only keeps rules those sections use.
  if (range) {
    const first = document.querySelector(range.from)
    const last = document.querySelector(range.to)
    if (!first || !last || first.parentElement !== last.parentElement) throw new Error('--from/--to must be sibling elements')
    let inside = false
    for (const el of [...first.parentElement.children]) {
      if (el === first) inside = true
      if (!inside) el.remove()
      if (el === last) inside = false
    }
    for (let el = first.parentElement; el.id !== 'app'; el = el.parentElement) {
      for (const sibling of [...el.parentElement.children]) if (sibling !== el) sibling.remove()
    }
  }

  const DYNAMIC_PSEUDO =
    /::?(?:hover|focus-visible|focus-within|focus|active|visited|link|target|checked|disabled|enabled|placeholder-shown|invalid|valid|before|after|placeholder|marker|selection|backdrop|first-letter|first-line|-webkit-[\w-]+|-moz-[\w-]+)(?![\w-])/g

  const splitSelectors = text => {
    const parts = []
    let depth = 0
    let current = ''
    for (const ch of text) {
      if (ch === '(') depth++
      if (ch === ')') depth--
      if (ch === ',' && depth === 0) {
        parts.push(current.trim())
        current = ''
      } else current += ch
    }
    parts.push(current.trim())
    return parts
  }

  const matches = selector => {
    const stripped = selector.replace(DYNAMIC_PSEUDO, '').trim()
    if (!stripped || /[>+~]$/.test(stripped)) return true
    try {
      return document.querySelector(stripped) !== null
    } catch {
      return true
    }
  }

  // Interaction states whose styles must survive pruning (mobile menu open).
  const states = [
    () => {},
    () => {
      document.getElementById('site-menu')?.removeAttribute('hidden')
    },
  ]
  const used = new Set()
  const styleRules = []
  const walk = rules => {
    for (const rule of rules) {
      if (rule instanceof CSSStyleRule) styleRules.push(rule)
      else if (rule.cssRules) walk(rule.cssRules)
    }
  }
  const sheets = [...document.styleSheets].filter(sheet => sheet.ownerNode?.dataset.viteDevId?.endsWith('.css'))
  sheets.forEach(sheet => walk(sheet.cssRules))
  for (const apply of states) {
    apply()
    for (const rule of styleRules) for (const sel of splitSelectors(rule.selectorText)) if (matches(sel)) used.add(`${sel}\u0000${rule.cssText}`)
  }
  document.getElementById('site-menu')?.setAttribute('hidden', '')

  const serialize = (rules, indent) => {
    const lines = []
    for (const rule of rules) {
      if (rule instanceof CSSStyleRule) {
        const kept = splitSelectors(rule.selectorText).filter(sel => used.has(`${sel}\u0000${rule.cssText}`))
        if (kept.length) lines.push(`${indent}${kept.join(', ')} { ${rule.style.cssText} }`)
      } else if (rule instanceof CSSMediaRule) {
        if (/^print$/.test(rule.conditionText.trim())) continue
        const inner = serialize(rule.cssRules, indent + '  ')
        if (inner.length) lines.push(`${indent}@media ${rule.conditionText} {`, ...inner, `${indent}}`)
      } else if (rule instanceof CSSSupportsRule) {
        const inner = serialize(rule.cssRules, indent + '  ')
        if (inner.length) lines.push(`${indent}@supports ${rule.conditionText} {`, ...inner, `${indent}}`)
      } else if (rule instanceof CSSFontFaceRule) {
        if (range && /-latin-/.test(rule.cssText)) lines.push(indent + rule.cssText)
      } else {
        lines.push(indent + rule.cssText)
      }
    }
    return lines
  }

  let css = sheets
    .map(sheet => `/* ===== ${sheet.ownerNode.dataset.viteDevId.split('/').pop()} ===== */\n${serialize(sheet.cssRules, '').join('\n')}`)
    .join('\n\n')
  // Drop keyframes that no kept rule references.
  css = css.replace(/@keyframes ([\w-]+) \{[\s\S]*?\n?\}\s*\}/g, (block, keyframe) =>
    css.split(block).join('').includes(keyframe) ? block : '',
  )

  const app = document.getElementById('app').cloneNode(true)
  app.querySelectorAll('script').forEach(el => el.remove())
  const walker = document.createTreeWalker(app, NodeFilter.SHOW_COMMENT)
  const comments = []
  while (walker.nextNode()) comments.push(walker.currentNode)
  comments.forEach(node => node.remove())

  // Maps the dev-server URL of each image or font to its path next to the exported file.
  const assets = new Map()
  const localAsset = url => {
    const clean = url.split(/[?#]/)[0]
    const target = clean.startsWith('/assets/')
      ? clean.slice(1)
      : /\.(woff2?|ttf)$/.test(clean)
        ? `assets/fonts/${clean.split('/').pop()}`
        : null
    if (!target) return url
    assets.set(clean, target)
    return target
  }
  if (range) {
    app.querySelectorAll('img').forEach(img => {
      img.setAttribute('src', localAsset(img.getAttribute('src')))
      img.removeAttribute('loading')
    })
    css = css.replace(/url\("([^"]+)"\)/g, (_, url) => `url("${localAsset(url)}")`)
    app.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href')
      if (/^(https?:|mailto:)/.test(href)) return
      a.setAttribute('data-placeholder', `link: ${href}`)
      a.setAttribute('href', '#')
    })
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content ?? '',
      bodyClass: document.body.className,
      body: app.innerHTML,
      css,
      assets: [...assets],
      selfHostedFonts: true,
    }
  }

  // Images become grey SVG boxes with the original intrinsic size, so CSS sizing and cropping behave the same.
  const sourceImages = [...document.querySelectorAll('#app img')]
  app.querySelectorAll('img').forEach((img, i) => {
    const { naturalWidth: w, naturalHeight: h } = sourceImages[i]
    const file = img.getAttribute('src').split('/').pop()
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}'>` +
      `<rect width='100%' height='100%' fill='#c5cfd8'/>` +
      `<text x='97%' y='95%' text-anchor='end' font-family='Arial' font-size='${Math.round(Math.min(w, h) / 16)}' fill='#41505e'>IMAGE</text></svg>`
    img.setAttribute('src', 'data:image/svg+xml,' + encodeURIComponent(svg))
    img.setAttribute('data-placeholder', `image: ${file}`)
  })

  // Links keep their look but do not navigate.
  app.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href')
    const isFile = a.hasAttribute('download') || /\.(pdf|docx?|zip|txt)$/i.test(href)
    a.setAttribute('data-placeholder', isFile ? `download: ${href.split('/').pop()}` : `link: ${href}`)
    a.setAttribute('href', '#')
    a.removeAttribute('download')
    a.removeAttribute('target')
    a.removeAttribute('rel')
  })

  return {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content ?? '',
    bodyClass: document.body.className,
    body: app.innerHTML,
    css,
    assets: [],
  }
}
