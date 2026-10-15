<script setup lang="ts">
import { useApplicationForm, type ApplicationKind } from '../composables/useApplicationForm'
import ResponsiveImage from './ResponsiveImage.vue'

const props = defineProps<{
  kind: ApplicationKind
  /** Optional uppercase label above the hero title. */
  label?: string
  /** Hero title; may include <br> and <em> (trusted page copy). */
  heading: string
  text: string
  /** Hero photo name from scripts/optimize-images.mjs. */
  image: string
  worksheet: string
  /** Query parameter that may pre-select a matching field, e.g. `area` or `role`. */
  preselect?: string
}>()

const {
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
} = useApplicationForm(props.kind, props.preselect)

defineExpose({ chooseRole })

const onRemember = (event: Event) => setRemember((event.target as HTMLInputElement).checked)
</script>

<template>
  <div class="draft-block">
    <section class="draft-hero hero-media" aria-labelledby="application-heading">
      <ResponsiveImage class="hero-media__image" :name="image" priority />
      <div class="container draft-hero__inner">
        <p v-if="label" class="draft-hero__label">{{ label }}</p>
        <h1 id="application-heading" class="draft-hero__title" v-html="heading"></h1>
        <p class="draft-hero__text">{{ text }}</p>
      </div>
    </section>

    <section id="draft" class="draft-section" aria-labelledby="application-form-title">
      <div class="container draft-section__inner">
        <div class="draft__paper">
          <noscript>
            <p class="draft-help">
              The guided form needs JavaScript. <a :href="worksheet">Download the blank worksheet</a> instead.
            </p>
          </noscript>
          <div class="draft__intro">
            <div>
              <p class="draft__eyebrow">A local draft · nothing submitted</p>
              <h2 id="application-form-title" class="draft__title">
                Begin with something<br><em>only you can bring.</em>
              </h2>
              <p class="draft-help">
                Use this as a thinking space. Required fields are marked. Keep the draft until formal instructions are published. For a short general inquiry, email <a href="mailto:vincent@ujasper.ca">vincent@ujasper.ca.</a>
              </p>
            </div>
            <div class="draft__progress" role="group" aria-label="Form progress">
              <p class="draft__step-label" aria-live="polite">{{ stepLabel }}</p>
              <div class="draft__bar" aria-hidden="true">
                <i v-for="n in 4" :key="n" :class="{ 'is-active': n - 1 <= current }"></i>
              </div>
            </div>
          </div>

          <form ref="form" :data-kind="kind" method="dialog" novalidate @submit.prevent>
            <div class="draft__save">
              <label class="draft-check">
                <input type="checkbox" :checked="remember" @change="onRemember">
                <span>Save my answers in this browser on this device. Do not use this on a shared device.</span>
              </label>
              <p class="draft-help">
                Without this choice, refreshing or leaving clears unsaved answers. Saved drafts stay until you clear them
                or browser storage is removed. Download a copy for your own backup.
              </p>
            </div>

            <slot :current="current" />

            <section
              ref="review"
              class="draft__review"
              :hidden="current !== 3"
              tabindex="-1"
              aria-labelledby="draft-review-title"
            >
              <h3 id="draft-review-title" class="draft__review-title">Review your introduction</h3>
              <p class="draft-help">Your draft stays yours. Downloading it sends nothing to University of Jasper.</p>
              <pre>{{ reviewText }}</pre>
            </section>

            <div class="draft__controls">
              <button type="button" class="draft__back" :disabled="current === 0" @click="back">
                <span aria-hidden="true">←</span> Back
              </button>
              <button v-if="current < 3" type="button" class="cta cta--primary" @click="next">
                {{ current === 2 ? 'Review my draft' : 'Continue' }}
                <span class="cta__arrow" aria-hidden="true">→</span>
              </button>
              <button v-else type="button" class="cta cta--primary" @click="download">
                Download my draft <span aria-hidden="true">↓</span>
              </button>
            </div>

            <div class="draft__tools">
              <div class="draft__tools-buttons">
                <button type="button" class="draft__tool" @click="saveNow">Save on this device</button>
                <button type="button" class="draft__tool" @click="clearDraft">Clear this draft</button>
              </div>
              <label class="draft-check">
                <input v-model="confirmClear" type="checkbox">
                <span>I confirm I want to clear my answers and this browser’s saved copy.</span>
              </label>
            </div>

            <p class="draft__message" role="status" aria-live="polite">{{ message }}</p>
          </form>
        </div>

        <p class="draft__fineprint">
          Prefer paper?
          <a :href="worksheet" download>Download a blank worksheet <span aria-hidden="true">↓</span></a>
        </p>
      </div>
    </section>
  </div>
</template>
