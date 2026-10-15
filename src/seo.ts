export const SITE = {
  origin: 'https://ujasper.ca',
  name: 'University of Jasper',
  lang: 'en-CA',
  locale: 'en_CA',
  email: 'vincent@ujasper.ca',
  founder: 'Vincent Zhang',
  logo: { src: '/assets/founding-crest.jpg', width: 1080, height: 1080 },
} as const

export interface SeoImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface PageSeo {
  title: string
  description: string
  /** Canonical path without query or hash, e.g. `/join/teachers`. */
  path: string
  indexable: boolean
  image: SeoImage
  /** Extra JSON-LD nodes for this page, merged into the site graph. */
  schema?: Record<string, unknown>[]
}

export const DEFAULT_IMAGE: SeoImage = {
  src: '/assets/social/rockies-valley.jpg',
  alt: 'Snow-capped peaks above a forested valley in the Canadian Rockies',
  width: 1200,
  height: 630,
}

export const absoluteUrl = (path: string) => new URL(path, SITE.origin).href

/** Canonical form of a route path: no trailing slash except for the home page. */
export const normalizePath = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path) || '/'

const ORGANIZATION_ID = `${SITE.origin}/#organization`
const WEBSITE_ID = `${SITE.origin}/#website`

export function structuredData(seo: PageSeo) {
  const url = absoluteUrl(seo.path)
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: SITE.name,
      url: `${SITE.origin}/`,
      logo: absoluteUrl(SITE.logo.src),
      email: SITE.email,
      description: 'A founding project for a proposed university in Jasper, Alberta, Canada.',
      founder: { '@type': 'Person', name: SITE.founder },
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: SITE.name,
      url: `${SITE.origin}/`,
      inLanguage: SITE.lang,
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: seo.title,
      description: seo.description,
      inLanguage: SITE.lang,
      isPartOf: { '@id': WEBSITE_ID },
      primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(seo.image.src) },
    },
    ...(seo.schema ?? []),
  ]
  return { '@context': 'https://schema.org', '@graph': graph }
}

type Tag =
  | { tag: 'meta'; attrs: Record<string, string> }
  | { tag: 'link'; attrs: Record<string, string> }
  | { tag: 'script'; attrs: Record<string, string>; text: string }

export function headTags(seo: PageSeo): Tag[] {
  const url = absoluteUrl(seo.path)
  const image = absoluteUrl(seo.image.src)
  const meta = (key: 'name' | 'property', id: string, content: string): Tag => ({
    tag: 'meta',
    attrs: { [key]: id, content },
  })
  const tags: Tag[] = [
    meta('name', 'description', seo.description),
    meta('name', 'robots', seo.indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow'),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', SITE.name),
    meta('property', 'og:locale', SITE.locale),
    meta('property', 'og:title', seo.title),
    meta('property', 'og:description', seo.description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', image),
    meta('property', 'og:image:width', String(seo.image.width)),
    meta('property', 'og:image:height', String(seo.image.height)),
    meta('property', 'og:image:alt', seo.image.alt),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', seo.title),
    meta('name', 'twitter:description', seo.description),
    meta('name', 'twitter:image', image),
    meta('name', 'twitter:image:alt', seo.image.alt),
  ]
  if (seo.indexable) tags.unshift({ tag: 'link', attrs: { rel: 'canonical', href: url } })
  tags.push({
    tag: 'script',
    attrs: { type: 'application/ld+json' },
    // `<` is escaped so page copy can never close the script element early.
    text: JSON.stringify(structuredData(seo)).replace(/</g, '\\u003c'),
  })
  return tags
}

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const escapeText = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Head markup for prerendered HTML. Every managed tag carries `data-seo` so the client can replace it. */
export function renderHead(seo: PageSeo) {
  const lines = [`<title>${escapeText(seo.title)}</title>`]
  for (const tag of headTags(seo)) {
    const attrs = Object.entries({ ...tag.attrs, 'data-seo': '' })
      .map(([key, value]) => (value ? `${key}="${escapeAttr(value)}"` : key))
      .join(' ')
    lines.push(tag.tag === 'script' ? `<script ${attrs}>${tag.text}</script>` : `<${tag.tag} ${attrs}>`)
  }
  return lines.join('\n    ')
}

/** Replaces the previous page's managed head tags during client-side navigation. */
export function applyHead(seo: PageSeo, doc: Document = document) {
  doc.title = seo.title
  doc.head.querySelectorAll('[data-seo]').forEach(node => node.remove())
  for (const tag of headTags(seo)) {
    const el = doc.createElement(tag.tag)
    for (const [key, value] of Object.entries(tag.attrs)) el.setAttribute(key, value)
    el.setAttribute('data-seo', '')
    if (tag.tag === 'script') el.textContent = tag.text
    doc.head.append(el)
  }
}
