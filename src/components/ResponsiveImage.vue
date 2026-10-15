<script setup lang="ts">
import { computed } from 'vue'
import { image, imageUrl, srcset } from '../images'

const props = withDefaults(
  defineProps<{
    /** Name from scripts/optimize-images.mjs, e.g. `cards/hike`. */
    name: string
    alt?: string
    sizes?: string
    /** Above-the-fold hero: no lazy loading, fetched at high priority. */
    priority?: boolean
    /** For images that are visible on load but are not the hero (e.g. the header crest). */
    eager?: boolean
  }>(),
  { alt: '', sizes: '100vw', priority: false, eager: false },
)

const entry = computed(() => image(props.name))
</script>

<template>
  <!-- Vue sets attributes in this order; src must come last or Chrome fetches the fallback before srcset and loading apply. -->
  <img
    :loading="priority || eager ? 'eager' : 'lazy'"
    :fetchpriority="priority ? 'high' : undefined"
    :decoding="priority ? undefined : 'async'"
    :width="entry.width"
    :height="entry.height"
    :alt="alt"
    :sizes="sizes"
    :srcset="srcset(entry)"
    :src="imageUrl(name, 960)"
  >
</template>
