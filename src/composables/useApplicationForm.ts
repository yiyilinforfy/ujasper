import { computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { jasperDownload } from './useExportDialog'

export type ApplicationKind = 'teacher' | 'student' | 'host'

const REVIEW_STEP = 3
const STEP_NAMES = ['Your introduction', 'Your work', 'Your commitments', 'Review and keep'] as const
const MAX_STORED = 12000
const LEAVE_WARNING = 'You have unsaved changes. Leave this page?'

/**
 * Private multi-step introduction draft. Nothing is sent: answers stay in the page,
 * go to localStorage only when the visitor opts in, and leave the browser only as a downloaded file.
 */
export function useApplicationForm(kind: ApplicationKind, preselect?: string) {
  const form = useTemplateRef<HTMLFormElement>('form')
  const review = useTemplateRef<HTMLElement>('review')
  const route = useRoute()
  const storageKey = `jasper-draft-v2-${kind}`

  const current = ref(0)
  const message = ref('')
  const reviewText = ref('')
  const remember = ref(false)
  const confirmClear = ref(false)
  let dirty = false

  const steps = () => [...(form.value?.querySelectorAll<HTMLFieldSetElement>('[data-step]') ?? [])]
  const exportFields = () =>
    [...(form.value?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('[data-export]') ?? [])]

  const stepLabel = computed(() => `Step ${current.value + 1} of 4 · ${STEP_NAMES[current.value]}`)

  function values(): Record<string, string | boolean> {
    const result: Record<string, string | boolean> = {}
    const handled = new Set<string>()
    for (const control of exportFields()) {
      if (handled.has(control.name)) continue
      handled.add(control.name)
      if (control instanceof HTMLInputElement && control.type === 'checkbox') {
        result[control.name] = control.checked
      } else if (control instanceof HTMLInputElement && control.type === 'radio') {
        const checked = form.value?.querySelector<HTMLInputElement>(`input[name="${control.name}"]:checked`)
        result[control.name] = checked?.value ?? ''
      } else {
        result[control.name] = control.value
      }
    }
    return result
  }

  function applyValues(saved: Record<string, unknown>) {
    for (const control of exportFields()) {
      const value = saved[control.name]
      if (control instanceof HTMLInputElement && control.type === 'checkbox') {
        control.checked = value === true
      } else if (control instanceof HTMLInputElement && control.type === 'radio') {
        control.checked = control.value === value
      } else if (typeof value === 'string') {
        control.value = value.slice(0, MAX_STORED)
      }
    }
  }

  function exportText() {
    let result =
      `UNIVERSITY OF JASPER\n${kind.toUpperCase()} INTRODUCTION DRAFT\nEdition: 15 October 2026\n` +
      'NOT SUBMITTED. This is not an application receipt, place reservation or appointment.\n\n'
    const handled = new Set<string>()
    for (const control of exportFields()) {
      if (handled.has(control.name)) continue
      if (control instanceof HTMLInputElement && control.type === 'radio' && !control.checked) continue
      handled.add(control.name)
      const label = control.dataset.export ?? control.name
      let answer: string
      if (control instanceof HTMLInputElement && control.type === 'checkbox') {
        answer = control.checked ? 'Confirmed' : 'Not confirmed'
      } else if (control instanceof HTMLInputElement && control.type === 'radio') {
        answer = control.value.trim() || '(Not provided)'
      } else {
        answer = control.value.trim() || '(Not provided)'
      }
      result += `${label}\n${answer}\n\n`
    }
    return (
      result +
      'General inquiries: vincent@ujasper.ca. Formal admissions and teaching appointments are not open. Keep this draft until formal instructions are published.\n'
    )
  }

  function persist() {
    if (!remember.value) return false
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ version: 2, savedAt: new Date().toISOString(), values: values() }),
      )
      dirty = false
      message.value = 'Saved in this browser on this device. Nothing has been sent.'
      return true
    } catch {
      message.value = 'This browser could not save the draft. Keep the page open and download a copy.'
      return false
    }
  }

  function markDirty() {
    dirty = true
    if (remember.value) persist()
    else message.value = 'Unsaved changes. Save on this device or download a copy before leaving.'
  }

  async function show(index: number, focus = true) {
    current.value = index
    if (index === REVIEW_STEP) reviewText.value = exportText()
    if (!focus) return
    await nextTick()
    const target = index === REVIEW_STEP ? review.value : steps()[index]?.querySelector('legend')
    if (!target) return
    target.tabIndex = -1
    target.focus({ preventScroll: true })
    form.value?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }

  async function valid(index: number) {
    for (const control of steps()[index]!.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      'input,textarea,select',
    )) {
      if (!control.checkValidity()) {
        await show(index, false)
        await nextTick()
        control.reportValidity()
        control.focus()
        message.value = control.validationMessage || 'Please complete the required answer or correct the highlighted field.'
        return false
      }
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
    message.value = ''
    await show(current.value + 1)
  }

  function back() {
    if (current.value > 0) {
      message.value = ''
      show(current.value - 1)
    }
  }

  async function download() {
    if (!(await allValid())) return
    jasperDownload(`jasper-${kind}-application-draft.txt`, exportText())
    dirty = false
    message.value = 'Your draft is ready to download or copy. Nothing has been submitted.'
  }

  function setRemember(checked: boolean) {
    remember.value = checked
    if (checked) {
      persist()
      return
    }
    try {
      localStorage.removeItem(storageKey)
      message.value = 'Saved copy removed. Your current answers remain here until you leave.'
      dirty = true
    } catch {
      message.value = 'The saved copy could not be removed. Use your browser’s site-data controls.'
    }
  }

  function saveNow() {
    remember.value = true
    persist()
  }

  function clearDraft() {
    if (!confirmClear.value) {
      message.value = 'Select the confirmation checkbox before clearing this draft.'
      return
    }
    try {
      localStorage.removeItem(storageKey)
      form.value?.reset()
      remember.value = false
      confirmClear.value = false
      dirty = false
      show(0, false)
      message.value = 'Draft cleared from this page and this browser. Exported files are unaffected.'
      applyPreselect()
      form.value?.dispatchEvent(new Event('draft-cleared'))
    } catch {
      message.value = 'The saved copy could not be removed. Use your browser’s site-data controls.'
    }
  }

  /** Pre-selects a teaching area or host role (radio/select value) and returns to the first step. */
  function chooseRole(role: string) {
    const radios = [
      ...(form.value?.querySelectorAll<HTMLInputElement>('input[name="teaching-area"], input[name="area"], input[name="role"]') ??
        []),
    ]
    const selected = radios.find(input => input.value === role)
    if (selected) {
      selected.checked = true
      selected.dispatchEvent(new Event('change', { bubbles: true }))
    } else if (preselect) {
      const select = form.value?.elements.namedItem(preselect) as HTMLSelectElement | RadioNodeList | null
      if (select && 'options' in select && [...select.options].some(o => o.value === role)) {
        select.value = role
      }
    }
    show(0, false)
  }

  function applyPreselect() {
    if (!preselect) return
    const requested = route.query[preselect]
    if (typeof requested !== 'string') return
    chooseRole(requested)
  }

  function restore() {
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return
      const saved = JSON.parse(raw)
      if (saved?.version === 2 && saved.values && typeof saved.values === 'object') {
        applyValues(saved.values)
        remember.value = true
        message.value = 'Restored your draft from this browser. Nothing has been submitted.'
      } else {
        message.value = 'A saved draft could not be read. It has not been overwritten.'
      }
    } catch {
      message.value = 'Saved drafts are unavailable in this browser. You can still write and download a copy.'
    }
  }

  function warnBeforeUnload(event: BeforeUnloadEvent) {
    if (!dirty) return
    event.preventDefault()
    event.returnValue = ''
  }

  function onFormInput() {
    markDirty()
  }

  onMounted(() => {
    restore()
    applyPreselect()
    form.value?.addEventListener('input', onFormInput)
    form.value?.addEventListener('change', onFormInput)
    window.addEventListener('beforeunload', warnBeforeUnload)
  })

  onBeforeUnmount(() => {
    form.value?.removeEventListener('input', onFormInput)
    form.value?.removeEventListener('change', onFormInput)
    window.removeEventListener('beforeunload', warnBeforeUnload)
  })

  onBeforeRouteLeave(() => (dirty ? window.confirm(LEAVE_WARNING) : true))

  if (preselect) {
    watch(
      () => route.query[preselect],
      requested => {
        if (typeof requested === 'string') {
          chooseRole(requested)
          markDirty()
        }
      },
    )
  }

  return {
    current,
    message,
    reviewText,
    stepLabel,
    remember,
    confirmClear,
    next,
    back,
    download,
    chooseRole,
    setRemember,
    saveNow,
    clearDraft,
  }
}
