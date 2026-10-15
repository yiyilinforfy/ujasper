<script setup lang="ts">
import AppLink from '../components/AppLink.vue'

const destinations = [
  { to: '/', label: 'University of Jasper home' },
  { to: '/program', label: 'The Jasper Field Semester' },
  { to: '/vision', label: 'Vision and mission' },
  { to: '/publications', label: 'Publications and downloads' },
  { to: '/join', label: 'Ways to join' },
]
</script>

<template>
  <section class="nf" aria-labelledby="nf-title">
    <div class="container">
      <p class="nf__label">404 · Page not found</p>
      <h1 id="nf-title" class="nf__title">This page <em>is not here.</em></h1>
      <p class="nf__text">
        The address may be mistyped, or the page may have moved. These pages cover the university, the proposed field
        semester and how to take part.
      </p>
      <ul class="nf__links">
        <li v-for="item in destinations" :key="item.to">
          <AppLink class="link" :to="item.to">{{ item.label }}</AppLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.nf {
  padding-block: var(--space-9, 6rem);
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
}

.nf :where(h1, p, ul) {
  margin: 0;
}

.nf__label {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.nf .nf__title {
  max-width: 48rem;
  margin-top: var(--space-4);
  font-family: var(--font-serif);
  font-size: var(--text-display);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: var(--color-ink);
}

.nf__title em {
  color: var(--color-cobalt);
}

.nf__text {
  max-width: 40rem;
  margin-top: var(--space-4);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--color-muted);
}

.nf__links {
  display: grid;
  gap: var(--space-3);
  max-width: 40rem;
  margin-top: var(--space-7);
  padding: var(--space-5) 0 0;
  border-top: 1px solid var(--color-ink);
  list-style: none;
}
</style>
