<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLink from './AppLink.vue'

const route = useRoute()

const isHub = computed(() => route.name === 'join')

const back = computed(() => {
  if (route.query.from === 'program') {
    return { to: '/program', label: 'Back to Field semester' }
  }
  return { to: '/join', label: 'Back to Join' }
})
</script>

<template>
  <div class="inbox">
    <div v-if="!isHub" class="inbox__bar">
      <div class="container inbox__bar-inner">
        <AppLink class="inbox__back" :to="back.to">
          <span aria-hidden="true">←</span>
          {{ back.label }}
        </AppLink>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.inbox__bar {
  position: sticky;
  top: var(--header-height);
  z-index: 30;
  border-bottom: 1px solid var(--color-line);
  background: var(--color-paper);
}

.inbox__bar-inner {
  display: flex;
  align-items: center;
  min-height: 3rem;
}

.inbox__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding-block: 0.75rem;
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: color var(--duration) var(--ease);
}

.inbox__back:hover {
  color: var(--color-cobalt);
}
</style>
