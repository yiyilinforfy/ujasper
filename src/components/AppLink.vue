<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { isNavigationFailure, NavigationFailureType, useLink } from 'vue-router'

// Unlike RouterLink, this never adds aria-current: the site's CSS styles every `nav a[aria-current]`.
defineOptions({ inheritAttrs: false })

const props = defineProps<{ to: string }>()
const attrs = useAttrs()

const target = computed(() => (props.to.startsWith('#') ? { hash: props.to } : props.to))
const { href, navigate } = useLink({ to: target })

function emitParentClick(event: MouseEvent) {
  const parent = attrs.onClick as ((e: MouseEvent) => void) | ((e: MouseEvent) => void)[] | undefined
  if (typeof parent === 'function') parent(event)
  else if (Array.isArray(parent)) parent.forEach(fn => fn(event))
}

async function onClick(event: MouseEvent) {
  emitParentClick(event)
  const failure = await navigate(event)
  if (isNavigationFailure(failure, NavigationFailureType.duplicated) && props.to.includes('#')) {
    document.querySelector(props.to.slice(props.to.indexOf('#')))?.scrollIntoView()
  }
}
</script>

<template>
  <a v-bind="{ ...$attrs, onClick: undefined }" :href="href" @click="onClick"><slot /></a>
</template>
