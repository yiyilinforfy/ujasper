// Builds responsive WebP variants from assets-src/ into public/assets/img/ and writes src/generated/images.json.
// Usage: npm run images  (unchanged sources are skipped; pass --force to rebuild everything)
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('..', import.meta.url))
const sourceDir = join(root, 'assets-src')
const outDir = join(root, 'public/assets/img')
const manifestFile = join(root, 'src/generated/images.json')
const publicBase = '/assets/img'
const force = process.argv.includes('--force')

// Candidate widths per role; each list is capped at the source width.
const PRESETS = {
  hero: { widths: [640, 960, 1280, 1600, 1920], quality: 74 },
  photo: { widths: [400, 800, 1200], quality: 74 },
  cover: { widths: [283, 566], quality: 80 },
  crest: { widths: [96, 192, 384, 640], quality: 84 },
}

// Every image the site renders. Keys are the names used in components (path under assets-src/ without extension).
const IMAGES = {
  'field/hero': 'hero',
  'hero-ridge': 'hero',
  'letter-peaks': 'hero',
  'publications-hero': 'hero',
  'founding-chairs': 'hero',
  'teach-classroom': 'hero',
  'apply-signing': 'hero',
  'join-hosts': 'hero',
  jasper: 'hero',
  'field/landscape': 'photo',
  'cards/hike': 'photo',
  'cards/train': 'photo',
  'cards/read': 'photo',
  'cards/experiment': 'photo',
  'cards/make': 'photo',
  'cards/offline': 'photo',
  'cards/martial': 'photo',
  'jasper-song-poster': 'photo',
  'founding-charter-cover': 'cover',
  'field-semester-cover': 'cover',
  'offline-fieldbook-cover': 'cover',
  'founding-brief-cover': 'cover',
  'operations-manual-cover': 'cover',
  'founding-charter-docx-cover': 'cover',
  'founding-crest': 'crest',
}

const hash = buffer => createHash('sha1').update(buffer).digest('hex').slice(0, 8)

function widthsFor(preset, sourceWidth) {
  const widths = preset.widths.filter(width => width < sourceWidth)
  const max = preset.widths.at(-1)
  if (sourceWidth <= max && !widths.includes(sourceWidth)) widths.push(sourceWidth)
  if (sourceWidth > max) widths.push(max)
  return [...new Set(widths)].sort((a, b) => a - b)
}

async function findSource(name) {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
    const file = join(sourceDir, `${name}.${ext}`)
    if (existsSync(file)) return file
  }
  throw new Error(`Missing source for "${name}" in assets-src/`)
}

const previous = existsSync(manifestFile) ? JSON.parse(await readFile(manifestFile, 'utf8')) : {}
const manifest = {}
await mkdir(outDir, { recursive: true })

let built = 0
for (const [name, presetName] of Object.entries(IMAGES)) {
  const preset = PRESETS[presetName]
  const input = await readFile(await findSource(name))
  const signature = `${hash(input)}:${presetName}:${preset.widths.join(',')}:${preset.quality}`
  const cached = previous[name]
  if (!force && cached?.signature === signature && cached.variants.every(v => existsSync(join(root, 'public', v.src)))) {
    manifest[name] = cached
    continue
  }

  const { width, height } = await sharp(input).metadata()
  const variants = []
  for (const w of widthsFor(preset, width)) {
    const output = await sharp(input)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: preset.quality, effort: 5 })
      .toBuffer()
    const file = `${name.replace(/\//g, '-')}-${w}.${hash(output)}.webp`
    await writeFile(join(outDir, file), output)
    variants.push({ width: w, src: `${publicBase}/${file}`, bytes: output.length })
  }
  manifest[name] = { width, height, signature, variants }
  built += 1
  const total = variants.reduce((sum, v) => sum + v.bytes, 0)
  console.log(`${name.padEnd(30)} ${width}×${height} → ${variants.map(v => v.width).join('/')} (${Math.round(total / 1024)} KB)`)
}

// Remove variants no longer referenced by the manifest.
const keep = new Set(Object.values(manifest).flatMap(entry => entry.variants.map(v => v.src.split('/').pop())))
for (const file of await readdir(outDir)) {
  if (!keep.has(file)) await rm(join(outDir, file))
}

await mkdir(join(root, 'src/generated'), { recursive: true })
await writeFile(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`images: ${built} built, ${Object.keys(manifest).length - built} unchanged → src/generated/images.json`)
