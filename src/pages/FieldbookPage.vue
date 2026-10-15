<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { jasperDownload } from '../composables/useExportDialog'

interface Week {
  title: string
  theme: string
  move: string
  think: string
  make: string
  give: string
  evidence: string
  prompt: string
}

interface Entry {
  note: string
  checks: boolean[]
}

const KEY = 'jasper-fieldbook-v1'
const UNSAVED = 'Unsaved changes. Choose Save to keep these on this device.'
const WEEK_LABELS = ['Attention', 'Discipline', 'Evidence', 'Freedom', 'Responsibility', 'Contribution']
const BLOCKS: [keyof Week, string][] = [
  ['move', '01 / Move & observe'],
  ['think', '02 / Think & discuss'],
  ['make', '03 / Make & verify'],
  ['give', '04 / Contribute'],
  ['evidence', 'Your weekly artifact'],
]
const CHECKLIST = [
  'I practised or made an appropriate adaptation.',
  'I examined an idea and recorded a question.',
  'I created or revised my weekly artifact.',
  'I offered or reflected on a useful contribution.',
]

const route = useRoute()
const router = useRouter()

const weeks = ref<Week[]>([])
const failed = ref(false)
const current = ref(1)
const notes = ref<Record<number, Entry>>({})
const saveStatus = ref('')
const confirmClear = ref(false)

const week = computed(() => weeks.value[current.value - 1])
const entry = computed(() => notes.value[current.value]!)
const completed = computed(
  () => Object.values(notes.value).filter(n => n.checks.length === 4 && n.checks.every(Boolean)).length,
)
const progressText = computed(() => {
  if (failed.value) return 'Notebook content could not load.'
  if (!week.value) return 'Loading the fieldbook…'
  return `${completed.value} of 6 weeks marked complete · self-recorded`
})

const clean = (value: unknown) => String(value ?? '').slice(0, 15000)
const pad = (n: number) => String(n).padStart(2, '0')

function announce(message: string) {
  saveStatus.value = message
}

function ensureEntry(n: number) {
  notes.value[n] ??= { note: '', checks: [false, false, false, false] }
}

function parseWeek(value: unknown) {
  const requested = Number(value)
  return Number.isInteger(requested) && requested >= 1 && requested <= 6 ? requested : 1
}

function load() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '{}')
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      for (let n = 1; n <= 6; n++) {
        const d = data[n]
        if (d && typeof d === 'object') {
          notes.value[n] = { note: clean(d.note), checks: Array.from({ length: 4 }, (_, i) => d.checks?.[i] === true) }
        }
      }
    }
  } catch {
    announce('Saved notes could not be loaded. You can still write and export this session.')
  }
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(notes.value))
    announce('Saved on this device. Export a copy to keep your own backup.')
    return true
  } catch {
    announce('This browser could not save your notes. Keep this page open and export a copy.')
    return false
  }
}

function selectWeek(n: number) {
  if (!Number.isInteger(n) || n < 1 || n > 6) throw new Error('Week must be an integer from 1 to 6.')
  if (!weeks.value.length) throw new Error('Notebook is not loaded.')
  persist()
  current.value = n
  ensureEntry(n)
  router.replace({ query: { week: String(n) } })
  return { week: current.value, title: weeks.value[current.value - 1]!.title }
}

async function copyPrompt() {
  persist()
  try {
    await navigator.clipboard.writeText(week.value!.prompt)
    announce('Question copied. Use it in your paper fieldbook during the offline programme.')
  } catch {
    announce('Clipboard access is unavailable. Select the prompt text above and copy it manually.')
  }
}

function download() {
  persist()
  let text = `JASPER — PERSONAL FIELDBOOK\nSelf-recorded notes. Not enrolment or a credential.\nExported ${new Date().toISOString()}\n`
  weeks.value.forEach((w, i) => {
    const n = notes.value[i + 1]
    text += `\n\nWEEK ${i + 1}: ${w.title}\nPractices marked: ${n?.checks?.filter(Boolean).length || 0}/4\n\n${n?.note || '(No notes yet)'}\n`
  })
  jasperDownload('jasper-fieldbook.txt', text)
  announce('Your fieldbook is ready in the export panel. Keep a copy somewhere private.')
}

function clearBook() {
  if (!confirmClear.value) {
    announce('Select the confirmation checkbox before deleting.')
    return
  }
  try {
    localStorage.removeItem(KEY)
    notes.value = {}
    ensureEntry(current.value)
    confirmClear.value = false
    announce('Saved fieldbook deleted from this device.')
  } catch {
    announce('The browser could not clear storage. Please use your browser’s site-data settings.')
  }
}

watch(
  () => route.query.week,
  value => {
    if (route.name !== 'fieldbook' || !weeks.value.length) return
    const n = parseWeek(value)
    if (n !== current.value) {
      current.value = n
      ensureEntry(n)
    }
  },
)

onMounted(async () => {
  load()
  try {
    const response = await fetch('/weeks.json')
    if (!response.ok) throw new Error('Content unavailable')
    const data = await response.json()
    if (!Array.isArray(data) || data.length !== 6) throw new Error('Incomplete content')
    current.value = parseWeek(route.query.week)
    ensureEntry(current.value)
    weeks.value = data
    activeSelectWeek = selectWeek
    registerModelTool()
  } catch {
    failed.value = true
  }
})

onUnmounted(() => {
  if (activeSelectWeek === selectWeek) activeSelectWeek = null
})
</script>

<script lang="ts">
type SelectWeek = (n: number) => { week: number; title: string }

let activeSelectWeek: SelectWeek | null = null
let toolRegistered = false

// Exposes the visible fieldbook to in-browser agents that implement document.modelContext (WebMCP).
function registerModelTool() {
  const modelContext = (document as Document & { modelContext?: { registerTool?: (tool: object) => unknown } })
    .modelContext
  if (toolRegistered || !modelContext?.registerTool) return
  toolRegistered = true
  try {
    Promise.resolve(
      modelContext.registerTool({
        name: 'open_jasper_week',
        title: 'Open a Jasper fieldbook week',
        description:
          'Open week 1–6 in the visible fieldbook. Saves the current notes locally, then shows the selected week. Does not enrol or submit anything.',
        inputSchema: {
          type: 'object',
          properties: { week: { type: 'integer', minimum: 1, maximum: 6 } },
          required: ['week'],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false },
        execute(input: unknown) {
          if (!input || typeof input !== 'object' || Object.keys(input).some(k => k !== 'week')) {
            throw new Error('Provide only a week number.')
          }
          if (!activeSelectWeek) throw new Error('Notebook is not loaded.')
          return activeSelectWeek((input as { week: number }).week)
        },
      }),
    ).catch(() => {})
  } catch {
    // Registration is optional.
  }
}
</script>

<template>
  <div class="fb">
    <section class="fb-section fb-section--paper fb-intro" aria-labelledby="fb-title">
      <div class="container">
        <div class="fb-head">
          <p class="fb-label">Your personal fieldbook</p>
          <h1 id="fb-title" class="fb-title">Keep the evidence.<br><em>Keep asking.</em></h1>
          <p class="fb-copy">A private browser notebook for preparation and later reflection. During the taught semester, use the paper fieldbook. No account, enrolment or credential is created here.</p>
        </div>
      </div>
    </section>

    <section class="fb-section fb-section--cloud" aria-label="Fieldbook">
      <div class="container">
        <p class="fb-callout">Notes stay in this browser and website origin. Choose Save or switch weeks to save locally; export a copy before changing devices or domains. This website never receives your notes.</p>
        <noscript>
          <p class="fb-copy fb-noscript">The notebook needs JavaScript. <a class="link" href="/offline-fieldbook.pdf">Download the paper fieldbook</a> instead.</p>
        </noscript>
        <p id="book-progress" class="fb-progress-text" role="status">{{ progressText }}</p>
        <div class="fb-progress" aria-hidden="true">
          <div class="fb-progress__fill" id="progress-fill" :style="week ? { width: `${(completed / 6) * 100}%` } : undefined"></div>
        </div>
        <div class="fb-book">
          <nav class="fb-weeks" aria-label="Choose a week">
            <button
              v-for="(label, i) in WEEK_LABELS"
              :key="label"
              type="button"
              class="fb-week"
              :data-week="i + 1"
              :aria-pressed="!!week && current === i + 1"
              @click="weeks.length && selectWeek(i + 1)"
            >
              <span class="fb-week__num">{{ pad(i + 1) }} ·</span> {{ label }}</button>
          </nav>
          <div id="week-content" class="fb-content">
            <template v-if="week">
              <p class="fb-label">WEEK {{ pad(current) }} / {{ week.theme }}</p>
              <h2 class="fb-title fb-week-title">{{ week.title }}</h2>
              <div class="fb-blocks">
                <div v-for="[key, title] in BLOCKS" :key="key" class="fb-block">
                  <h3 class="fb-block__title">{{ title }}</h3>
                  <p class="fb-block__text">{{ week[key] }}</p>
                </div>
              </div>
              <details :key="current" class="fb-details">
                <summary>A question for paper reflection</summary>
                <p class="fb-prompt">{{ week.prompt }}</p>
                <button type="button" class="cta cta--outline" @click="copyPrompt">Copy question</button>
              </details>
              <div class="fb-checklist">
                <label v-for="(text, i) in CHECKLIST" :key="i" class="fb-check">
                  <input v-model="entry.checks[i]" type="checkbox" :data-check="i" @change="announce(UNSAVED)">{{ text }}</label>
              </div>
              <label class="fb-field-label" for="week-notes">Your observations, evidence, sources and next step</label>
              <textarea
                id="week-notes"
                v-model="entry.note"
                class="fb-input"
                maxlength="15000"
                rows="8"
                placeholder="What did I try? What did I learn? What supports my conclusion? What will I change?"
                @input="announce(UNSAVED)"
              ></textarea>
            </template>
            <template v-else-if="failed">
              <h2 class="fb-title fb-week-title">The notebook could not load.</h2>
              <p class="fb-copy">Your saved notes have not been changed. Please reload this page or use the <a class="link" href="/syllabus.txt">downloadable syllabus</a>.</p>
            </template>
          </div>
        </div>
        <div class="fb-after">
          <div class="fb-actions">
            <button type="button" class="cta cta--primary" id="save-book" :disabled="failed" @click="persist">Save notes</button>
            <button type="button" class="cta cta--outline" id="export-book" :disabled="failed" @click="download">Export fieldbook</button>
          </div>
          <p id="save-status" class="fb-small fb-status" role="status">{{ saveStatus }}</p>
          <details class="fb-details fb-details--danger">
            <summary>Delete notes from this browser</summary>
            <label class="fb-check">
              <input id="confirm-clear" v-model="confirmClear" type="checkbox"><span>I confirm I want to delete the saved fieldbook from this browser.</span></label>
            <button type="button" class="cta cta--outline" id="clear-book" :disabled="failed" @click="clearBook">Delete saved fieldbook</button>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fb {
  font-family: var(--font-sans);
  font-variant-numeric: lining-nums;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--color-ink);
  background: var(--color-paper);
}

.fb :where(h1, h2, h3, p) {
  margin: 0;
}

.fb button:focus-visible,
.fb summary:focus-visible,
.fb a:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

.fb-section {
  padding-block: var(--space-section);
}

.fb-section--paper {
  background: var(--color-paper);
}

.fb-section--cloud {
  background: var(--color-cloud);
}

.fb-intro {
  padding-top: var(--space-8);
}

.fb-head {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  max-width: 48rem;
  margin-bottom: var(--space-7);
}

.fb-label {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.fb .fb-title {
  font-family: var(--font-serif);
  font-size: var(--text-display);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.fb-title em {
  font-style: italic;
  color: var(--color-cobalt);
}

.fb-copy {
  max-width: 40rem;
  color: var(--color-muted);
}

.fb-small {
  font-size: var(--text-small);
  line-height: 1.6;
  color: var(--color-muted);
}

/* ---------- Notebook ---------- */
.fb .fb-callout {
  max-width: 46rem;
  margin-bottom: var(--space-7);
  padding-left: var(--space-4);
  border-left: 2px solid var(--color-cobalt);
  font-family: var(--font-serif);
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-ink);
}

.fb-noscript {
  margin-bottom: var(--space-5);
}

.fb-book {
  display: grid;
  gap: var(--space-7);
  margin-top: var(--space-6);
}

.fb-weeks {
  align-self: start;
  display: grid;
  border-top: 1px solid var(--color-ink);
}

.fb-week {
  display: block;
  padding: var(--space-3) var(--space-4);
  border: 0;
  border-bottom: 1px solid var(--color-line);
  border-left: 2px solid transparent;
  background: transparent;
  color: var(--color-ink);
  font-family: var(--font-serif);
  font-size: 1.125rem;
  line-height: 1.3;
  text-align: left;
  cursor: pointer;
  transition: color var(--duration) var(--ease), border-color var(--duration) var(--ease),
    background-color var(--duration) var(--ease);
}

.fb-week__num {
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  color: var(--color-muted);
}

.fb-week:hover {
  color: var(--color-cobalt);
}

.fb-week[aria-pressed='true'] {
  border-left-color: var(--color-cobalt);
  background: var(--color-paper);
  color: var(--color-cobalt);
}

.fb-week[aria-pressed='true'] .fb-week__num {
  color: var(--color-cobalt);
}

.fb-progress-text {
  margin-bottom: var(--space-2);
  font-size: var(--text-small);
  color: var(--color-muted);
}

.fb-progress {
  max-width: 46rem;
  height: 2px;
  background: var(--color-line);
}

.fb-progress__fill {
  width: 0;
  height: 100%;
  background: var(--color-cobalt);
  transition: width var(--duration) var(--ease);
}

.fb-content {
  min-width: 0;
}

.fb-week-title {
  margin-top: var(--space-4);
}

.fb-blocks {
  margin-top: var(--space-6);
  border-top: 1px solid var(--color-ink);
}

.fb-block {
  display: grid;
  gap: var(--space-2);
  padding-block: var(--space-5);
  border-bottom: 1px solid var(--color-line);
}

.fb .fb-block__title {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.fb-block__text {
  max-width: 44rem;
  color: var(--color-ink);
}

.fb .fb-details {
  padding: 0;
  border: 0;
  border-bottom: 1px solid var(--color-line);
}

.fb-details summary {
  padding-block: var(--space-4);
  font-weight: 500;
  color: var(--color-ink);
  cursor: pointer;
}

.fb-details[open] {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  padding-bottom: var(--space-5);
}

.fb .fb-prompt {
  max-width: 44rem;
  margin: 0;
  padding-left: var(--space-4);
  border-left: 2px solid var(--color-cobalt);
  font-family: var(--font-serif);
  font-size: 1.125rem;
  line-height: 1.7;
  white-space: pre-wrap;
}

.fb-checklist {
  display: grid;
  gap: var(--space-3);
  margin-block: var(--space-6);
}

.fb-check {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: var(--text-small);
  font-weight: 400;
  line-height: 1.5;
  cursor: pointer;
}

.fb-check input {
  flex: none;
  width: 1rem;
  height: 1rem;
  margin: 0.2rem 0 0;
  accent-color: var(--color-cobalt);
}

.fb-field-label {
  display: block;
  margin-bottom: var(--space-2);
  font-size: var(--text-small);
  font-weight: 500;
}

.fb .fb-input {
  width: 100%;
  min-height: 12rem;
  padding: 0.75rem 0.875rem;
  border: 1px solid var(--color-line);
  border-radius: 0;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  resize: vertical;
  transition: border-color var(--duration) var(--ease);
}

.fb .fb-input:hover {
  border-color: #a9bccb;
}

.fb .fb-input:focus {
  border-color: var(--color-cobalt);
  outline: 1px solid var(--color-cobalt);
  outline-offset: 0;
}

.fb-input::placeholder {
  color: #8497a6;
}

.fb-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.fb .cta {
  cursor: pointer;
}

.fb .cta--outline {
  background: transparent;
}

.fb .cta--outline:hover {
  background: var(--color-mist);
}

.fb .cta:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.fb-status {
  min-height: 1.5em;
  margin-block: var(--space-3) var(--space-6);
}

.fb-details--danger {
  border-top: 1px solid var(--color-line);
}

.fb-check span {
  min-width: 0;
}

@media (min-width: 900px) {
  .fb-book {
    grid-template-columns: 16rem minmax(0, 1fr);
    gap: var(--space-8);
  }

  .fb-weeks {
    position: sticky;
    top: calc(var(--header-height) + var(--space-5));
  }

  .fb-after {
    margin-left: calc(16rem + var(--space-8));
  }
}

@media (max-width: 899px) {
  .fb-weeks {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .fb-week:nth-child(odd) {
    border-right: 1px solid var(--color-line);
  }
}

@media (prefers-reduced-motion: reduce) {
  .fb-week,
  .fb-progress__fill,
  .fb .fb-input {
    transition: none;
  }
}
</style>
