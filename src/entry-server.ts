import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory } from 'vue-router'
import { createJasperApp } from './app'
import { heroPreload } from './images'
import { routeSeo } from './router'
import { renderHead, SITE } from './seo'

export { pagePaths } from './router'
export { SITE }

/** Renders one route to static HTML at build time (see scripts/prerender.mjs). */
export async function render(url: string) {
  const { app, router } = createJasperApp(createMemoryHistory(), true)
  await router.push(url)
  await router.isReady()
  const route = router.currentRoute.value
  const seo = routeSeo(route)
  // @vitejs/plugin-vue records every component module rendered into ctx.modules.
  const ctx: { modules?: Set<string> } = {}
  const html = await renderToString(app, ctx)
  return {
    html,
    modules: [...(ctx.modules ?? [])],
    head: renderHead(seo) + (route.meta.hero ? `\n    ${heroPreload(route.meta.hero)}` : ''),
    bodyClass: route.meta.bodyClass,
    seo,
  }
}
