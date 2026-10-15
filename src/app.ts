import { createApp, createSSRApp } from 'vue'
import type { RouterHistory } from 'vue-router'
import App from './App.vue'
import { createAppRouter } from './router'

export function createJasperApp(history: RouterHistory, ssr: boolean) {
  const app = ssr ? createSSRApp(App) : createApp(App)
  const router = createAppRouter(history)
  app.use(router)
  return { app, router }
}
