<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppLink from './AppLink.vue'
import ResponsiveImage from './ResponsiveImage.vue'

const route = useRoute()
const open = ref(false)
const bar = useTemplateRef<HTMLElement>('bar')

// Sticky offsets elsewhere (anchors, sticky columns) read the live header height.
let observer: ResizeObserver | undefined
onMounted(() => {
  observer = new ResizeObserver(([entry]) => {
    const height = entry?.borderBoxSize[0]?.blockSize ?? bar.value?.offsetHeight ?? 0
    document.documentElement.style.setProperty('--header-height', `${Math.round(height)}px`)
  })
  if (bar.value) observer.observe(bar.value)
})

const links = [
  { to: '/', label: 'Discover' },
  { to: '/program', label: 'Semester' },
  { to: '/vision', label: 'Vision' },
  { to: '/publications', label: 'Publications' },
  { to: '/join', label: 'Join us' },
  { to: '/support', label: 'Founding ↗' },
]

const current = (to: string) => (route.meta.nav === to ? 'page' : undefined)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false
}

watch(open, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
  if (value) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})
watch(
  () => route.path,
  () => {
    open.value = false
  },
)
onBeforeUnmount(() => {
  open.value = false
  observer?.disconnect()
})
</script>

<template>
  <div ref="bar" class="site-header" role="banner">
    <AppLink class="brand site-header__brand" to="/">
      <ResponsiveImage class="brandcrest" name="founding-crest" alt="University of Jasper crest" sizes="4rem" eager />
      <span class="wordmark">University of<strong>Jasper</strong></span>
    </AppLink>
    <div class="site-header__nav" role="navigation" aria-label="Main navigation">
      <AppLink v-for="link in links" :key="link.to" :to="link.to" :aria-current="current(link.to)">
        {{ link.label }}
      </AppLink>
    </div>
    <button
      class="site-header__toggle"
      type="button"
      aria-controls="site-menu"
      :aria-expanded="open"
      @click="open = true"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16m-7 6h7" /></svg>
      <span class="visually-hidden">Menu</span>
    </button>
  </div>

  <div id="site-menu" class="site-menu" role="dialog" aria-modal="true" aria-label="Menu" :hidden="!open">
    <button class="site-menu__close" type="button" @click="open = false">
      <span aria-hidden="true">&times;</span><span class="visually-hidden">Close menu</span>
    </button>
    <AppLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      :aria-current="current(link.to)"
      @click="open = false"
    >{{ link.label }}</AppLink>
  </div>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  padding-block: 1.125rem;
  padding-inline: max(var(--site-gutter), calc((100% - var(--site-max)) / 2));
  border-bottom: 1px solid var(--color-header-line);
  background: var(--color-paper);
  color: var(--color-footer);
}

.site-header__brand {
  flex: none;
  gap: 0.625rem;
  color: inherit;
  transition: opacity var(--duration) var(--ease);
}

.site-header__brand:hover {
  opacity: 0.85;
}

.site-header__brand .brandcrest {
  width: 2.5rem;
  height: 2.5rem;
  padding: 2px;
  border: 1px solid var(--color-header-line);
  border-radius: var(--radius-small);
  background: var(--color-paper);
}

.site-header__brand .wordmark {
  font-size: 0.75rem;
  line-height: 1.1;
}

.site-header__brand .wordmark strong {
  margin-top: 1px;
  font-size: 1.25rem;
  line-height: 1;
}

.site-header__nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem 2rem;
  font-family: var(--font-serif);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.site-header__nav > a {
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
  transition: color 150ms ease;
}

.site-header__nav > a:hover,
.site-header__toggle:hover {
  color: var(--color-accent);
}

.site-header__nav > a[aria-current='page'] {
  color: var(--color-accent-deep);
}

.site-header__toggle {
  display: none;
  padding: var(--space-2);
  border: 0;
  background: none;
  color: inherit;
  transition: color 150ms ease;
}

.site-header__toggle svg {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.site-header a:focus-visible,
.site-header button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.site-menu {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-5);
  background: rgba(12, 32, 51, 0.95);
  color: var(--color-on-dark);
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.site-menu[hidden] {
  display: none;
}

.site-menu a {
  color: inherit;
  text-decoration: none;
}

.site-menu a:hover,
.site-menu a[aria-current='page'] {
  color: #fde68a;
}

.site-menu a:focus-visible,
.site-menu__close:focus-visible {
  outline: 2px solid #fde68a;
  outline-offset: 4px;
}

.site-menu__close {
  position: absolute;
  top: var(--space-5);
  right: var(--space-5);
  padding: var(--space-2);
  border: 0;
  background: none;
  color: inherit;
  font-size: 2rem;
  line-height: 1;
}

@media (max-width: 1100px) {
  .site-header__nav {
    display: none;
  }

  .site-header__toggle {
    display: block;
  }
}
</style>
