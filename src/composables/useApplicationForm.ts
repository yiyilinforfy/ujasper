import { computed, nextTick, ref, useTemplateRef } from 'vue'
import { jasperDownload } from './useExportDialog'

export type ApplicationKind = 'teacher' | 'student'

const REVIEW_STEP = 3

export function useApplicationForm(kind: ApplicationKind) {
  const form = useTemplateRef<HTMLFormElement>('form')
  const review = useTemplateRef<HTMLElement>('review')
  const current = ref(0)
  const message = ref('')
  const reviewText = ref('')

  const steps = () => [...(form.value?.querySelectorAll<HTMLFieldSetElement>('[data-step]') ?? [])]

  const stepLabel = computed(() => `Step ${current.value + 1} of ${REVIEW_STEP + 1}`)

  function text() {
    const title = kind === 'teacher' ? 'FOUNDING TEACHER EXPRESSION OF INTEREST' : 'STUDENT APPLICATION'
    let result = `UNIVERSITY OF JASPER\n${title} — PERSONAL DRAFT\nNOT SUBMITTED. This draft does not reserve a place or create an appointment.\n\n`
    const handled = new Set<string>()
    for (const control of form.value!.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-export]')) {
      const key = control.name
      if (handled.has(key)) continue
      if ((control.type === 'radio' || control.type === 'checkbox') && !(control as HTMLInputElement).checked) continue
      handled.add(key)
      result += `${control.dataset.export}\n${control.value.trim() || '(Not provided)'}\n\n`
    }
    result +=
      'Keep this copy until University of Jasper opens applications. General inquiries: vincent@ujasper.ca. Nothing has been sent or saved in a database.\n'
    result +=
      kind === 'teacher'
        ? 'Teaching appointments, employment or contract status, compensation, dates and resources remain unconfirmed.\n'
        : 'The six-week field semester is proposed, in person in Jasper and non-degree. Dates, fees, support and included costs remain unconfirmed.\n'
    return result
  }

  async function show(index: number, focus = true) {
    current.value = index
    if (index === REVIEW_STEP) reviewText.value = text()
    message.value = ''
    if (!focus) return
    await nextTick()
    const target = index === REVIEW_STEP ? review.value : steps()[index]?.querySelector('legend')
    if (!target) return
    target.tabIndex = -1
    target.focus({ preventScroll: true })
    form.value?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  async function valid(index: number) {
    for (const control of steps()[index]!.querySelectorAll<HTMLInputElement>('input,textarea,select')) {
      if (!control.checkValidity()) {
        await show(index, false)
        await nextTick()
        control.reportValidity()
        control.focus()
        message.value = 'Please complete the required answer or correct the highlighted field.'
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
    await show(current.value + 1)
  }

  function back() {
    if (current.value > 0) show(current.value - 1)
  }

  async function download() {
    if (!(await allValid())) return
    jasperDownload(`jasper-${kind}-application-draft.txt`, text())
    message.value = 'Your answers are ready to download. Email the file to vincent@ujasper.ca.'
  }

  /** Pre-selects a teaching area (radio value) and returns the form to its first step. */
  function chooseRole(role: string) {
    const selected = [...(form.value?.querySelectorAll<HTMLInputElement>('input[name="teaching-area"]') ?? [])].find(
      input => input.value === role,
    )
    if (selected) selected.checked = true
    show(0, false)
  }

  return { current, message, reviewText, stepLabel, next, back, download, chooseRole }
}
