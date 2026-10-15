import { createRouter, type RouteLocationNormalized, type RouteRecordRaw, type RouterHistory } from 'vue-router'
import { PUBLICATIONS_HERO_SIZES, type HeroImage } from '../images'
import { absoluteUrl, DEFAULT_IMAGE, normalizePath, SITE, type PageSeo, type SeoImage } from '../seo'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
    bodyClass: string
    /** Main-navigation link marked aria-current on this page. */
    nav?: string
    /** Defaults to true. Utility and error pages opt out. */
    indexable?: boolean
    image?: SeoImage
    schema?: Record<string, unknown>[]
    /** Above-the-fold photo preloaded in the prerendered head. */
    hero?: HeroImage
  }
}

const PEAKS_IMAGE: SeoImage = {
  src: '/assets/social/rockies-peaks.jpg',
  alt: 'Mountain peaks in the Canadian Rockies',
  width: 1200,
  height: 630,
}

const publication = (name: string, file: string, encodingFormat = 'application/pdf') => ({
  '@type': 'DigitalDocument',
  name,
  url: absoluteUrl(file),
  encodingFormat,
  inLanguage: SITE.lang,
  publisher: { '@id': `${SITE.origin}/#organization` },
})

const pages: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('../pages/HomePage.vue'),
    meta: {
      title: 'Strong in body. Free in mind. · University of Jasper',
      description:
        'Vincent Zhang’s founding project for an education of body, humanities and inquiry in Jasper, Alberta.',
      bodyClass: 'home',
      nav: '/',
      hero: { image: 'field/hero' },
    },
  },
  {
    path: '/vision',
    name: 'vision',
    component: () => import('../pages/VisionPage.vue'),
    meta: {
      title: 'Vision and mission · University of Jasper',
      description:
        'Physical capability, humanistic depth and fundamental inquiry in one education, rooted in Jasper and open to the world.',
      bodyClass: 'vision-page',
      nav: '/vision',
      image: PEAKS_IMAGE,
    },
  },
  {
    path: '/program',
    name: 'program',
    component: () => import('../pages/ProgramPage.vue'),
    meta: {
      title: 'The Jasper Field Semester · University of Jasper',
      description:
        'Six weeks in Jasper: 144 facilitated hours, 24 independent-study hours, six courses and an offline community of inquiry.',
      bodyClass: 'program-page',
      nav: '/program',
      hero: { image: 'hero-ridge' },
      image: {
        src: '/assets/social/field-semester-ridge.jpg',
        alt: 'A small group seated on a rocky ridge above a mountain lake',
        width: 1024,
        height: 468,
      },
    },
  },
  {
    path: '/join',
    component: () => import('../components/JoinInbox.vue'),
    meta: { title: '', description: '', bodyClass: 'join-page', nav: '/join' },
    children: [
      {
        path: '',
        name: 'join',
        component: () => import('../pages/JoinPage.vue'),
        meta: {
          title: 'Join the founding community · University of Jasper',
          description:
            'Explore student, educator, local host and supporter pathways for the proposed Jasper Field Semester.',
          bodyClass: 'join-page',
        },
      },
      {
        path: 'teachers',
        name: 'teachers',
        component: () => import('../pages/TeachersPage.vue'),
        meta: {
          title: 'Founding teaching roles · University of Jasper',
          description:
            'Contribute disciplinary depth, thoughtful coaching and a clear teaching demonstration to the proposed Jasper Field Semester.',
          bodyClass: 'teach-page',
          hero: { image: 'teach-classroom' },
          image: {
            src: '/assets/social/teaching-classroom.jpg',
            alt: 'A teacher leading a seminar with a small group of adult learners',
            width: 1024,
            height: 538,
          },
        },
      },
      {
        path: 'students',
        name: 'students',
        component: () => import('../pages/StudentsPage.vue'),
        meta: {
          title: 'The student pathway · University of Jasper',
          description:
            'Explore the proposed Field Semester, understand the commitment and prepare a private student introduction.',
          bodyClass: 'apply-page',
          hero: { image: 'apply-signing' },
          image: {
            src: '/assets/social/student-application.jpg',
            alt: 'A hand signing an application form on a desk',
            width: 1024,
            height: 538,
          },
        },
      },
      {
        path: 'hosts',
        name: 'hosts',
        component: () => import('../pages/HostsPage.vue'),
        meta: {
          title: 'Hosts and contributors · University of Jasper',
          description:
            'Prepare a role-specific introduction as a host, educator, activity lead or supporter.',
          bodyClass: 'hosts-page',
          hero: { image: 'join-hosts' },
          image: PEAKS_IMAGE,
        },
      },
    ],
  },
  {
    path: '/publications',
    name: 'publications',
    component: () => import('../pages/PublicationsPage.vue'),
    meta: {
      title: 'The publication library · University of Jasper',
      description:
        'Read or download the coherent Jasper founding edition: five PDFs, an editable charter and accessible HTML reading alternatives.',
      bodyClass: 'publications-page',
      nav: '/publications',
      hero: { image: 'publications-hero', sizes: PUBLICATIONS_HERO_SIZES },
      image: {
        src: '/assets/social/publications-desk.jpg',
        alt: 'A founding letter, an open notebook and bound publications on a wooden desk',
        width: 1024,
        height: 538,
      },
      schema: [
        {
          '@type': 'ItemList',
          name: 'University of Jasper publications',
          itemListElement: [
            publication('Founding charter', '/founding-charter.pdf'),
            publication('Academic curriculum', '/field-semester.pdf'),
            publication('Operations and safety manual', '/operations-manual.pdf'),
            publication('Printable learner fieldbook', '/offline-fieldbook.pdf'),
            publication('Founding supporter brief', '/founding-brief.pdf'),
            publication(
              'Editable founding charter',
              '/founding-charter.docx',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ),
          ].map((item, i) => ({ '@type': 'ListItem', position: i + 1, item })),
        },
      ],
    },
  },
  {
    path: '/support',
    name: 'support',
    component: () => import('../pages/SupportPage.vue'),
    meta: {
      title: 'The founding invitation · University of Jasper',
      description:
        'Explore the C$10 million long-term founding proposal and the evidence needed for a defined first commitment.',
      bodyClass: 'support-page',
      nav: '/support',
      hero: { image: 'founding-chairs' },
      image: {
        src: '/assets/social/founding-table.jpg',
        alt: 'Empty chairs around a boardroom table',
        width: 1024,
        height: 538,
      },
    },
  },
  {
    path: '/letter',
    name: 'letter',
    component: () => import('../pages/LetterPage.vue'),
    meta: {
      title: 'The founding letter · University of Jasper',
      description:
        'Vincent Zhang’s recovered original welcome and Jasper Dream Crying, the founder’s song of place and memory.',
      bodyClass: 'vision-page',
      image: PEAKS_IMAGE,
    },
  },
  {
    path: '/fieldbook',
    name: 'fieldbook',
    component: () => import('../pages/FieldbookPage.vue'),
    meta: {
      title: 'Your personal fieldbook · University of Jasper',
      description:
        'A browser-local notebook for six weeks of observations, inquiry, revision and contribution.',
      bodyClass: 'fieldbook-page',
      indexable: false,
    },
  },
  {
    path: '/care',
    name: 'care',
    component: () => import('../pages/CarePage.vue'),
    meta: {
      title: 'Care and privacy · University of Jasper',
      description:
        'Participation, offline agreements, qualified supervision, local drafts and clear privacy information.',
      bodyClass: '',
      image: PEAKS_IMAGE,
      hero: { image: 'letter-peaks' },
    },
  },
  {
    path: '/sources',
    name: 'sources',
    component: () => import('../pages/SourcesPage.vue'),
    meta: {
      title: 'Sources and credits · University of Jasper',
      description:
        'Historical inspirations, primary readings, official operating references and visual credits for University of Jasper.',
      bodyClass: '',
    },
  },
  {
    path: '/founding',
    name: 'founding',
    component: () => import('../pages/FoundingPage.vue'),
    meta: {
      title: 'Founding progress · University of Jasper',
      description:
        'Published plans, outstanding delivery conditions and the next decisions for University of Jasper.',
      bodyClass: 'founding-page',
      image: PEAKS_IMAGE,
    },
  },
  {
    path: '/learning',
    name: 'learning',
    component: () => import('../pages/LearningPage.vue'),
    meta: {
      title: 'Learning you can inspect · University of Jasper',
      description:
        'An interactive, clearly labelled teaching example of evidence, scientific modelling, criticism and revision.',
      bodyClass: 'learning-page',
      nav: '/program',
      image: PEAKS_IMAGE,
    },
  },
  ...[
    {
      slug: 'charter',
      component: () => import('../pages/read/CharterRead.vue'),
      title: 'Founding charter full text · University of Jasper',
      description: 'The original welcome, vision, educational commitments and staged institutional proposal.',
    },
    {
      slug: 'curriculum',
      component: () => import('../pages/read/CurriculumRead.vue'),
      title: 'Academic curriculum full text · University of Jasper',
      description: 'Six connected courses, timed teaching, Jasper investigations, tutorials, readings and assessment.',
    },
    {
      slug: 'operations',
      component: () => import('../pages/read/OperationsRead.vue'),
      title: 'Operations and safety manual full text · University of Jasper',
      description:
        'Staffing, field permissions, activity controls, access, communications and release-to-operate decisions.',
    },
    {
      slug: 'fieldbook',
      component: () => import('../pages/read/FieldbookRead.vue'),
      title: 'Printable learner fieldbook full text · University of Jasper',
      description:
        'Paper sheets for observation, physical progression, arguments, experiments, useful work and reflection.',
    },
    {
      slug: 'supporter',
      component: () => import('../pages/read/SupporterRead.vue'),
      title: 'Founding supporter brief full text · University of Jasper',
      description: 'The first funding conversation, long-term ambition and governance decisions to establish.',
    },
  ].map(({ slug, component, title, description }): RouteRecordRaw => ({
    path: `/read/${slug}`,
    name: `read-${slug}`,
    component,
    meta: { title, description, bodyClass: 'read-page', nav: '/publications', image: PEAKS_IMAGE },
  })),
]

// Keep the original static-site URLs (/vision.html, /index.html …) working.
for (const page of pages) {
  page.alias = page.path === '/' ? '/index.html' : `${page.path}.html`
}

const redirects: RouteRecordRaw[] = [
  { path: '/teachers', redirect: '/join/teachers' },
  { path: '/teachers.html', redirect: '/join/teachers' },
  { path: '/students', redirect: '/join/students' },
  { path: '/students.html', redirect: '/join/students' },
  { path: '/hosts', redirect: '/join/hosts' },
  { path: '/hosts.html', redirect: '/join/hosts' },
]

const notFound: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: () => import('../pages/NotFoundPage.vue'),
  meta: {
    title: 'Page not found · University of Jasper',
    description: 'This address does not match a University of Jasper page.',
    bodyClass: '',
    indexable: false,
  },
}

export function createAppRouter(history: RouterHistory) {
  const router = createRouter({
    history,
    routes: [...pages, ...redirects, notFound],
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) {
        const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 0
        return { el: to.hash, top: offset }
      }
      if (to.path === from.path) return false
      return { top: 0 }
    },
  })

  // Static hosts may redirect /support to its folder /support/.
  router.beforeEach(to => {
    if (to.path !== '/' && to.path.endsWith('/')) {
      return { path: normalizePath(to.path), query: to.query, hash: to.hash, replace: true }
    }
  })

  return router
}

/** The canonical path of a resolved route: aliases and query strings collapse to the primary record. */
type ResolvedRoute = Pick<RouteLocationNormalized, 'matched' | 'meta' | 'path'>

export function canonicalPath(route: ResolvedRoute) {
  const record = route.matched.at(-1)
  if (!record || record.name === 'not-found') return normalizePath(route.path)
  return normalizePath((record.aliasOf ?? record).path)
}

export function routeSeo(route: ResolvedRoute): PageSeo {
  const { meta } = route
  return {
    title: meta.title,
    description: meta.description,
    path: canonicalPath(route),
    indexable: meta.indexable !== false,
    image: meta.image ?? DEFAULT_IMAGE,
    schema: meta.schema,
  }
}

/** Every distinct page, for prerendering and the sitemap. */
export const pagePaths = [
  ...pages.flatMap(page =>
    page.children ? page.children.map(child => normalizePath(`${page.path}/${child.path}`)) : [page.path],
  ),
]
