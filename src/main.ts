import { createWebHistory } from 'vue-router'
import { createJasperApp } from './app'
import { routeSeo } from './router'
import { applyHead, normalizePath } from './seo'

import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/400-italic.css'
import '@fontsource/playfair-display/500.css'

// Legacy stylesheets keep the original pages' <link> order; people.css rules only match people-page markup.
import './styles/tokens.css'
import './styles/style.css'
import './styles/expedition.css'
import './styles/horizon.css'
import './styles/people.css'
import './styles/final.css'
import './styles/site.css'
import './styles/sections.css'

const container = document.getElementById('app')!
// Prerendered markup is hydrated only when it was rendered for this exact URL;
// otherwise (query strings, legacy aliases, the 404 page) the app mounts fresh over it.
const hydrate =
  container.firstElementChild !== null &&
  container.dataset.path === normalizePath(location.pathname) &&
  location.search === ''

const { app, router } = createJasperApp(createWebHistory(import.meta.env.BASE_URL), hydrate)

router.afterEach(to => {
  applyHead(routeSeo(to))
  document.body.className = to.meta.bodyClass
})

router.isReady().then(() => app.mount(container))
