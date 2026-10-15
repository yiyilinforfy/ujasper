<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import AppLink from './components/AppLink.vue'
import ExportDialog from './components/ExportDialog.vue'
</script>

<template>
  <AppLink class="skip" to="#main">Skip to content</AppLink>
  <AppHeader />
  <main id="main">
    <RouterView />
  </main>
  <AppFooter />
  <div class="toast" id="toast" role="status" aria-live="polite"></div>
  <ExportDialog />
</template>
