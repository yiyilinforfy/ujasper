<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { exportRequest } from '../composables/useExportDialog'

const dialog = ref<HTMLDialogElement>()
const link = ref<HTMLAnchorElement>()
const area = ref<HTMLTextAreaElement>()
const url = ref('')
const status = ref('')
let previous: HTMLElement | null = null

watch(exportRequest, async request => {
  if (!request) return
  previous = document.activeElement as HTMLElement | null
  url.value = URL.createObjectURL(new Blob([request.text], { type: 'text/plain;charset=utf-8' }))
  status.value = ''
  await nextTick()
  dialog.value?.showModal()
  link.value?.click()
})

async function copy() {
  try {
    await navigator.clipboard.writeText(exportRequest.value?.text ?? '')
    status.value = 'Copied. Paste into a document you control.'
  } catch {
    area.value?.focus()
    area.value?.select()
    status.value = 'Select the text and use your device’s Copy command.'
  }
}

function onClose() {
  URL.revokeObjectURL(url.value)
  exportRequest.value = null
  previous?.focus()
}
</script>

<template>
  <dialog v-if="exportRequest" ref="dialog" class="xd" aria-labelledby="export-title" @close="onClose">
    <h2 id="export-title" class="xd-title">Your export is ready.</h2>
    <p class="xd-copy">A text-file download has been requested. If your browser does not save it, copy your text below. Nothing has been submitted.</p>
    <label for="export-text" class="xd-label">Your export text</label>
    <textarea id="export-text" ref="area" class="xd-text" readonly rows="12" :value.prop="exportRequest.text"></textarea>
    <div class="xd-actions">
      <a ref="link" :href="url" :download="exportRequest.name" class="cta cta--primary">Download text file <span class="cta__arrow" aria-hidden="true">↓</span></a>
      <button type="button" class="cta cta--outline" @click="copy">Copy text</button>
      <button type="button" class="cta cta--outline" @click="dialog?.close()">Close</button>
    </div>
    <p class="xd-status" role="status">{{ status }}</p>
  </dialog>
</template>

<style scoped>
.xd {
  width: min(46rem, 100% - 2rem);
  max-height: calc(100svh - 2.5rem);
  overflow: auto;
  padding: var(--space-7);
  border: 0;
  border-top: 2px solid var(--color-ink);
  border-radius: 0;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
}

.xd::backdrop {
  background: rgba(11, 27, 42, 0.6);
}

.xd :where(h2, p) {
  margin: 0;
}

.xd .xd-title {
  margin-bottom: var(--space-3);
  font-family: var(--font-serif);
  font-size: var(--text-title);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.xd-copy {
  color: var(--color-muted);
}

.xd-label {
  display: block;
  margin: var(--space-5) 0 var(--space-2);
  font-size: var(--text-small);
  font-weight: 500;
}

.xd .xd-text {
  width: 100%;
  min-height: 12rem;
  padding: 0.75rem 0.875rem;
  border: 1px solid var(--color-line);
  border-radius: 0;
  background: var(--color-cloud);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  line-height: 1.6;
  resize: vertical;
}

.xd .xd-text:focus {
  border-color: var(--color-cobalt);
  outline: 1px solid var(--color-cobalt);
  outline-offset: 0;
}

.xd-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

.xd .cta {
  cursor: pointer;
}

.xd .cta--outline {
  background: transparent;
}

.xd .cta--outline:hover {
  background: var(--color-mist);
}

.xd-status {
  min-height: 1.5em;
  margin-top: var(--space-3);
  font-size: var(--text-small);
  color: var(--color-muted);
}

@media (max-width: 640px) {
  .xd {
    padding: var(--space-5);
  }
}
</style>
