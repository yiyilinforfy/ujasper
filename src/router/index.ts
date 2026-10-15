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
      title: 'University of Jasper · Proposed university in Jasper, Alberta',
      description:
        'University of Jasper is a proposed university in the Canadian Rockies. Its first programme is a six-week, in-person, offline field semester for adults.',
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
      title: 'Vision and Mission · University of Jasper',
      description:
        'The founding vision and mission of University of Jasper: physical training, the world’s humanities and fundamental inquiry, taught together in Jasper, Alberta.',
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
        'A proposed six-week, 144-hour offline field semester in Jasper for 6–8 adults: fieldcraft, martial arts, attention, science, philosophy and original inquiry.',
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
          title: 'Join University of Jasper: teachers, students and hosts',
          description:
            'Three ways to join the founding work of University of Jasper: teach in the field semester, apply for the proposed field semester, or offer a place, skill or partnership.',
          bodyClass: 'join-page',
        },
      },
      {
        path: 'teachers',
        name: 'teachers',
        component: () => import('../pages/TeachersPage.vue'),
        meta: {
          title: 'Teach in the field semester · University of Jasper',
      description:
        'Recruiting founding teachers in fieldcraft, martial arts, attention, mathematics and physics, philosophy or original inquiry to teach in person in Jasper.',
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
          title: 'Field Semester Student Application · University of Jasper',
          description:
            'Prepare an application for the proposed six-week field semester in Jasper, open to adults aged 18 and over. No transcript, test score or portfolio is required.',
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
          title: 'Hosts and founding partners · University of Jasper',
          description:
            'Local hosts, activity leads, learning contributors, supporters and future founding directors can introduce themselves and help the first Jasper gathering take shape.',
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
      title: 'Publications and downloads · University of Jasper',
      description:
        'Read and download the core publications of University of Jasper: the Vision and Founding Charter, the Field Semester Instructor Guide and the Offline Learner Fieldbook.',
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
            publication('Vision & Founding Charter', '/founding-charter.pdf'),
            publication('Field Semester Instructor Guide', '/field-semester.pdf'),
            publication('Offline Learner Fieldbook', '/offline-fieldbook.pdf'),
            publication('Founding Supporter Brief', '/founding-brief.pdf'),
            publication(
              'Editable Founding Charter',
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
      title: 'The Founding Invitation · University of Jasper',
      description:
        'The founding capital proposal for University of Jasper: a C$10 million ambition through five founding commitments or an anchor patron. No commitments are yet confirmed.',
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
      title: 'The Founding Letter by Vincent Zhang · University of Jasper',
      description:
        'Vincent Zhang’s founding letter for University of Jasper, recovered from 2015, with a contemporary welcome to the people who will help build it in Jasper, Alberta.',
      bodyClass: 'vision-page',
      image: PEAKS_IMAGE,
    },
  },
  {
    path: '/fieldbook',
    name: 'fieldbook',
    component: () => import('../pages/FieldbookPage.vue'),
    meta: {
      title: 'Personal fieldbook · University of Jasper',
      description:
        'An optional browser notebook for the proposed Jasper Field Semester, kept on your own device, with a printable paper fieldbook for weekly notes and practice.',
      bodyClass: 'fieldbook-page',
      indexable: false,
    },
  },
  {
    path: '/care',
    name: 'care',
    component: () => import('../pages/CarePage.vue'),
    meta: {
      title: 'Care, participation and privacy · University of Jasper',
      description:
        'Proposed operating principles for the first Jasper field lab: physical challenge, offline learning, camping and martial arts, community and privacy.',
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
      title: 'Sources, references and image credits · University of Jasper',
      description:
        'The research sources, historical references and image credits behind the University of Jasper proposal. External sources do not imply endorsement or affiliation.',
      bodyClass: '',
    },
  },
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
]

const notFound: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: () => import('../pages/NotFoundPage.vue'),
  meta: {
    title: 'Page not found · University of Jasper',
    description: 'The page you were looking for could not be found on the University of Jasper website.',
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
