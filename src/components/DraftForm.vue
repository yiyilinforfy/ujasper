<script setup lang="ts">
import {
  MAX_TEXT,
  REVIEW_STEP,
  STEP_LEGENDS,
  useApplicationForm,
  type ApplicationKind,
  type DraftField,
} from '../composables/useApplicationForm'

const props = defineProps<{
  kind: ApplicationKind
  /** Three steps of fields; the fourth step is the review. */
  steps: readonly (readonly DraftField[])[]
  /** Blank plain-text worksheet offered when JavaScript is unavailable. */
  worksheet: string
  /** Query parameter that may pre-select the select field of the same name, e.g. `area`. */
  preselect?: string
}>()

const {
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
} = useApplicationForm(props.kind, props.steps, props.preselect)

const id = (field: DraftField) => `f-${field.name}`

function describedBy(field: DraftField) {
  const ids = [field.hint && `${id(field)}-hint`, field.callout && `${id(field)}-guidance`].filter(Boolean)
  return ids.length ? ids.join(' ') : undefined
}

const target = (event: Event) => event.target as HTMLInputElement
</script>

<template>
  <div class="df">
    <div class="pw-head">
      <p class="pw-label">A local draft · nothing submitted</p>
      <h2 id="draft-title" class="pw-title">Begin with something<br><em>only you can bring.</em></h2>
      <p class="pw-text">
        Use this as a thinking space. Required fields are marked. Keep the draft until formal instructions are published.
        For a short general inquiry, email <a class="link df-inline-link" href="mailto:vincent@ujasper.ca">vincent@ujasper.ca</a>.
      </p>
    </div>

    <noscript>
      <p class="pw-text df-noscript">
        The guided form needs JavaScript. <a class="link" :href="worksheet">Download the blank worksheet</a> instead.
      </p>
    </noscript>

    <form :ref="bindForm" class="df-form" :data-kind="kind" novalidate @submit.prevent>
      <div class="df-save">
        <label class="df-check">
          <input type="checkbox" :checked="remember" @change="setRemember(target($event).checked)">
          <span>Save my answers in this browser on this device. Do not use this on a shared device.</span>
        </label>
        <p class="df-small">
          Without this choice, refreshing or leaving clears unsaved answers. Saved drafts stay until you clear them or
          browser storage is removed. Download a copy for your own backup.
        </p>
      </div>
      <p class="df-status" role="status" aria-live="polite">{{ status }}</p>

      <div class="df-progress">
        <p class="df-step-label">{{ stepLabel }}</p>
        <div class="df-bar" aria-hidden="true">
          <span v-for="n in 4" :key="n" :class="{ 'is-active': n - 1 <= current }"></span>
        </div>
      </div>

      <fieldset v-for="(fields, s) in steps" :key="s" class="df-step" :hidden="current !== s">
        <legend :ref="el => bindLegend(s, el)" class="df-legend" tabindex="-1">{{ STEP_LEGENDS[s] }}</legend>

        <template v-for="field in fields" :key="field.name">
          <label v-if="field.type === 'checkbox'" class="df-check">
            <input
              :ref="el => bindControl(field.name, el)"
              type="checkbox"
              :name="field.name"
              :checked="values[field.name] === true"
              :required="isRequired(field)"
              :aria-invalid="invalid.has(field.name) || undefined"
              @change="update(field, target($event).checked)"
            >
            <span>{{ field.label }}{{ isRequired(field) ? ' (required)' : '' }}</span>
          </label>

          <div v-else class="df-field">
            <label class="df-label" :for="id(field)">
              {{ field.label }}
              <span class="df-req">{{ isRequired(field) ? '(required)' : '(optional)' }}</span>
            </label>
            <select
              v-if="field.type === 'select'"
              :id="id(field)"
              :ref="el => bindControl(field.name, el)"
              class="df-input"
              :name="field.name"
              :value="values[field.name] as string"
              :required="isRequired(field)"
              :aria-invalid="invalid.has(field.name) || undefined"
              :aria-describedby="describedBy(field)"
              @change="update(field, target($event).value)"
            >
              <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
            </select>
            <textarea
              v-else-if="field.type === 'textarea'"
              :id="id(field)"
              :ref="el => bindControl(field.name, el)"
              class="df-input"
              :name="field.name"
              :value="values[field.name] as string"
              :rows="field.rows ?? 5"
              :maxlength="MAX_TEXT"
              :required="isRequired(field)"
              :aria-invalid="invalid.has(field.name) || undefined"
              :aria-describedby="describedBy(field)"
              @input="update(field, target($event).value)"
            ></textarea>
            <input
              v-else
              :id="id(field)"
              :ref="el => bindControl(field.name, el)"
              class="df-input"
              :type="field.type"
              :name="field.name"
              :value="values[field.name] as string"
              :autocomplete="field.autocomplete"
              maxlength="250"
              :required="isRequired(field)"
              :aria-invalid="invalid.has(field.name) || undefined"
              :aria-describedby="describedBy(field)"
              @input="update(field, target($event).value)"
            >
            <p v-if="field.hint" :id="`${id(field)}-hint`" class="df-small">{{ field.hint }}</p>
            <p v-if="field.callout" :id="`${id(field)}-guidance`" class="df-callout" aria-live="polite">
              {{ field.callout(values) }}
            </p>
          </div>
        </template>
      </fieldset>

      <section
        :ref="bindReview"
        class="df-review"
        :hidden="current !== REVIEW_STEP"
        tabindex="-1"
        aria-labelledby="draft-review-title"
      >
        <h3 id="draft-review-title" class="df-review__title">Review your introduction</h3>
        <p class="df-small">Your draft stays yours. Downloading it sends nothing to University of Jasper.</p>
        <pre class="df-review__text">{{ reviewText }}</pre>
      </section>

      <p class="df-error" role="alert">{{ error }}</p>

      <div class="df-actions">
        <button type="button" class="cta cta--outline" :disabled="current === 0" @click="back">Back</button>
        <button v-if="current !== REVIEW_STEP" type="button" class="cta cta--primary" @click="next">
          {{ current === REVIEW_STEP - 1 ? 'Review my draft' : 'Continue' }}
        </button>
        <button v-else type="button" class="cta cta--primary" @click="download">Download my draft</button>
      </div>

      <div class="df-tools">
        <div class="df-tools__buttons">
          <button type="button" class="cta cta--outline" @click="saveNow">Save on this device</button>
          <button type="button" class="cta cta--outline" @click="clearDraft">Clear this draft</button>
        </div>
        <label class="df-check">
          <input v-model="confirmClear" type="checkbox">
          <span>I confirm I want to clear my answers and this browser’s saved copy.</span>
        </label>
      </div>
    </form>
  </div>
</template>

<style scoped>
.df-form {
  display: grid;
  gap: var(--space-5);
  max-width: 46rem;
  scroll-margin-top: calc(var(--header-height) + var(--space-5));
}

.df :where(p, fieldset, legend, pre, h3) {
  margin: 0;
}

.df-noscript {
  margin-bottom: var(--space-5);
}

.df-inline-link {
  font-size: inherit;
}

.df-save {
  display: grid;
  gap: var(--space-2);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-ink);
}

.df-small {
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--color-muted);
}

.df-status:not(:empty) {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-cobalt);
}

.df-progress {
  display: grid;
  gap: var(--space-2);
}

.df-step-label {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ink);
}

.df-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3px;
}

.df-bar span {
  height: 2px;
  background: var(--color-line);
  transition: background-color var(--duration) var(--ease);
}

.df-bar span.is-active {
  background: var(--color-cobalt);
}

.df-step {
  display: grid;
  gap: var(--space-5);
  min-width: 0;
  padding: 0;
  border: 0;
}

.df-step[hidden],
.df-review[hidden] {
  display: none;
}

.df-legend {
  float: left;
  width: 100%;
  padding: 0;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.25;
  color: var(--color-ink);
}

.df-legend:focus,
.df-review:focus {
  outline: none;
}

.df-field {
  display: grid;
  gap: var(--space-2);
  min-width: 0;
}

.df-label {
  font-size: var(--text-small);
  font-weight: 500;
  line-height: 1.45;
  color: var(--color-ink);
}

.df-req {
  font-size: 0.875rem;
  font-weight: 300;
  color: var(--color-muted);
}

.df .df-input {
  width: 100%;
  min-height: 0;
  padding: 0.75rem 0.875rem;
  border: 1px solid var(--color-line);
  border-radius: 0;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  transition: border-color var(--duration) var(--ease);
}

.df textarea.df-input {
  resize: vertical;
}

.df .df-input:hover {
  border-color: #a9bccb;
}

.df .df-input:focus {
  border-color: var(--color-cobalt);
  outline: 1px solid var(--color-cobalt);
  outline-offset: 0;
}

.df .df-input[aria-invalid='true'] {
  border-color: #9b1c1c;
}

.df-callout {
  padding-left: var(--space-4);
  border-left: 2px solid var(--color-cobalt);
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-ink);
}

.df-check {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: var(--text-small);
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-ink);
  cursor: pointer;
}

.df-check input {
  flex: none;
  width: 1rem;
  height: 1rem;
  margin: 0.2rem 0 0;
  accent-color: var(--color-cobalt);
}

.df-check input:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

.df-check input[aria-invalid='true'] {
  outline: 2px solid #9b1c1c;
  outline-offset: 2px;
}

.df-review {
  display: grid;
  gap: var(--space-3);
}

.df-review__title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.25;
  color: var(--color-ink);
}

.df-review__text {
  max-height: 32rem;
  padding: var(--space-5);
  overflow: auto;
  border: 1px solid var(--color-line);
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  line-height: 1.6;
  white-space: pre-wrap;
}

.df-error:not(:empty) {
  font-size: 0.875rem;
  font-weight: 500;
  color: #9b1c1c;
}

.df-actions,
.df-tools__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.df-actions {
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-line);
}

.df-tools {
  display: grid;
  gap: var(--space-4);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-line);
}

.df .cta {
  cursor: pointer;
}

.df .cta--outline {
  background: transparent;
}

.df .cta--outline:hover:not(:disabled) {
  background: var(--color-mist);
}

.df .cta:disabled {
  opacity: 0.45;
  cursor: default;
}

@media (max-width: 640px) {
  .df-actions .cta,
  .df-tools__buttons .cta {
    flex: 1 1 auto;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .df-bar span,
  .df .df-input {
    transition: none;
  }
}
</style>
