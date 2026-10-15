import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { jasperDownload } from './useExportDialog'

export type ApplicationKind = 'student' | 'teacher' | 'host'

export type DraftValues = Record<string, string | boolean>

export interface DraftField {
  name: string
  /** Visible label; also the heading of this answer in the exported text. */
  label: string
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox'
  required?: boolean | ((values: DraftValues) => boolean)
  autocomplete?: string
  rows?: number
  options?: readonly string[]
  hint?: string
  /** Guidance shown under the field that changes with the current answers. */
  callout?: (values: DraftValues) => string
}

type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export const STEP_LEGENDS = ['Your introduction', 'Your work and questions', 'Your commitments'] as const
const STEP_NAMES = ['Your introduction', 'Your work', 'Your commitments', 'Review and keep'] as const
export const REVIEW_STEP = 3
export const MAX_TEXT = 12000
const BLANK_ANSWER = 'Please enter an answer; spaces alone are not an answer.'
const LEAVE_WARNING = 'You have unsaved changes. Leave this page?'

const isText = (field: DraftField) => field.type === 'text' || field.type === 'email' || field.type === 'textarea'

/**
 * A private, step-by-step introduction draft. Nothing is ever sent: answers stay in the page, are kept in
 * localStorage only when the visitor opts in, and leave the browser only as a text file or copied text.
 */
export function useApplicationForm(kind: ApplicationKind, steps: readonly (readonly DraftField[])[], preselect?: string) {
  const storageKey = `jasper-draft-v2-${kind}`
  const fields = steps.flat()
  const route = useRoute()

  const blank = (): DraftValues =>
    Object.fromEntries(
      fields.map(field => [field.name, field.type === 'checkbox' ? false : field.type === 'select' ? field.options![0]! : '']),
    )

  const values = reactive<DraftValues>(blank())
  const current = ref(0)
  const remember = ref(false)
  const confirmClear = ref(false)
  const status = ref('')
  const error = ref('')
  const reviewText = ref('')
  const invalid = reactive(new Set<string>())
  let dirty = false

  let formEl: HTMLFormElement | null = null
  let reviewEl: HTMLElement | null = null
  const legends: (HTMLElement | null)[] = []
  const controls = new Map<string, Control>()

  function bindForm(el: unknown) {
    formEl = (el as HTMLFormElement | null) ?? null
  }

  function bindReview(el: unknown) {
    reviewEl = (el as HTMLElement | null) ?? null
  }

  function bindControl(name: string, el: unknown) {
    if (el) controls.set(name, el as Control)
    else controls.delete(name)
  }

  function bindLegend(index: number, el: unknown) {
    legends[index] = (el as HTMLElement | null) ?? null
  }

  const stepLabel = computed(() => `Step ${current.value + 1} of 4 · ${STEP_NAMES[current.value]}`)

  function isRequired(field: DraftField) {
    return typeof field.required === 'function' ? field.required(values) : Boolean(field.required)
  }

  function exportText() {
    let text = `UNIVERSITY OF JASPER\n${kind.toUpperCase()} INTRODUCTION DRAFT\nEdition: 15 October 2026\nNOT SUBMITTED. This is not an application receipt, place reservation or appointment.\n\n`
    for (const field of fields) {
      const value = values[field.name]
      const answer =
        field.type === 'checkbox' ? (value ? 'Confirmed' : 'Not confirmed') : String(value).trim() || '(Not provided)'
      text += `${field.label}\n${answer}\n\n`
    }
    return (
      text +
      'General inquiries: vincent@ujasper.ca. Formal admissions and teaching appointments are not open. Keep this draft until formal instructions are published.\n'
    )
  }

  function persist() {
    if (!remember.value) return false
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ version: 2, savedAt: new Date().toISOString(), values: { ...values } }),
      )
      dirty = false
      status.value = 'Saved in this browser on this device. Nothing has been sent.'
      return true
    } catch {
      status.value = 'This browser could not save the draft. Keep the page open and download a copy.'
      return false
    }
  }

  function changed(field: DraftField) {
    controls.get(field.name)?.setCustomValidity('')
    invalid.delete(field.name)
    dirty = true
    if (remember.value) persist()
    else status.value = 'Unsaved changes. Save on this device or download a copy before leaving.'
  }

  function update(field: DraftField, value: string | boolean) {
    values[field.name] = value
    changed(field)
  }

  async function show(index: number, focus = true) {
    current.value = index
    if (index === REVIEW_STEP) reviewText.value = exportText()
    error.value = ''
    if (!focus) return
    await nextTick()
    const target = index === REVIEW_STEP ? reviewEl : legends[index]
    target?.focus({ preventScroll: true })
    formEl?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }

  async function valid(index: number) {
    for (const field of steps[index]!) {
      const control = controls.get(field.name)
      if (!control) continue
      if (isText(field)) control.setCustomValidity(isRequired(field) && !String(values[field.name]).trim() ? BLANK_ANSWER : '')
      if (!control.checkValidity()) {
        await show(index, false)
        invalid.add(field.name)
        error.value = control.validationMessage
        await nextTick()
        control.focus()
        return false
      }
      invalid.delete(field.name)
    }
    return true
  }

  async function allValid() {
    for (let i = 0; i < REVIEW_STEP; i++) if (!(await valid(i))) return false
    return true
  }

  async function next() {
    if (!(await valid(current.value))) return
    if (current.value === REVIEW_STEP - 1 && !(await allValid())) return
    await show(current.value + 1)
  }

  function back() {
    show(Math.max(0, current.value - 1))
  }

  async function download() {
    if (!(await allValid())) return
    jasperDownload(`jasper-${kind}-application-draft.txt`, exportText())
    dirty = false
    status.value = 'Your draft is ready to download or copy. Nothing has been submitted.'
  }

  function setRemember(checked: boolean) {
    remember.value = checked
    if (checked) {
      persist()
      return
    }
    try {
      localStorage.removeItem(storageKey)
      status.value = 'Saved copy removed. Your current answers remain here until you leave.'
      dirty = true
    } catch {
      status.value = 'The saved copy could not be removed. Use your browser’s site-data controls.'
    }
  }

  function saveNow() {
    remember.value = true
    persist()
  }

  function clearDraft() {
    if (!confirmClear.value) {
      status.value = 'Select the confirmation checkbox before clearing this draft.'
      return
    }
    try {
      localStorage.removeItem(storageKey)
      Object.assign(values, blank())
      for (const control of controls.values()) control.setCustomValidity('')
      invalid.clear()
      remember.value = false
      confirmClear.value = false
      dirty = false
      show(0, false)
      status.value = 'Draft cleared from this page and this browser. Exported files are unaffected.'
    } catch {
      status.value = 'The saved copy could not be removed. Use your browser’s site-data controls.'
    }
  }

  /** Applies `?area=` / `?role=` from a link, if it names one of the select's options. */
  function applyRequested(requested: unknown) {
    const field = fields.find(f => f.name === preselect)
    if (typeof requested !== 'string' || !field?.options?.includes(requested)) return false
    values[field.name] = requested
    return true
  }

  function restore() {
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return
      const saved = JSON.parse(raw)
      if (saved?.version === 2 && saved.values && typeof saved.values === 'object') {
        for (const field of fields) {
          const value = saved.values[field.name]
          if (field.type === 'checkbox') values[field.name] = value === true
          else if (typeof value === 'string')
            values[field.name] = field.type === 'select' && !field.options?.includes(value) ? '' : value.slice(0, MAX_TEXT)
        }
        remember.value = true
        status.value = 'Restored your draft from this browser. Nothing has been submitted.'
      } else {
        status.value = 'A saved draft could not be read. It has not been overwritten.'
      }
    } catch {
      status.value = 'Saved drafts are unavailable in this browser. You can still write and download a copy.'
    }
  }

  function warnBeforeUnload(event: BeforeUnloadEvent) {
    if (!dirty) return
    event.preventDefault()
    event.returnValue = ''
  }

  onMounted(() => {
    restore()
    if (preselect) applyRequested(route.query[preselect])
    window.addEventListener('beforeunload', warnBeforeUnload)
  })

  onBeforeUnmount(() => window.removeEventListener('beforeunload', warnBeforeUnload))

  onBeforeRouteLeave(() => (dirty ? window.confirm(LEAVE_WARNING) : true))

  if (preselect) {
    watch(
      () => route.query[preselect],
      requested => {
        const field = fields.find(f => f.name === preselect)
        if (field && applyRequested(requested)) {
          changed(field)
          show(0, false)
        }
      },
    )
  }

  return {
    values,
    current,
    remember,
    confirmClear,
    status,
    error,
    reviewText,
    invalid,
    stepLabel,
    bindForm,
    bindReview,
    bindControl,
    bindLegend,
    isRequired,
    update,
    next,
    back,
    download,
    setRemember,
    saveNow,
    clearDraft,
  }
}
