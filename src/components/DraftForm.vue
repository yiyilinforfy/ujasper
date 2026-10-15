<script setup lang="ts">
import { computed } from 'vue'
import { useApplicationForm, type ApplicationKind } from '../composables/useApplicationForm'
import ResponsiveImage from './ResponsiveImage.vue'

const props = defineProps<{
  kind: ApplicationKind
  heading: string
  text: string
  /** Hero photo name from scripts/optimize-images.mjs. */
  image: string
  formTitle: string
  worksheet: string
  subject: string
}>()

const { current, message, reviewText, stepLabel, next, back, download, chooseRole } = useApplicationForm(props.kind)

defineExpose({ chooseRole })

const mailto = computed(() => `mailto:vincent@ujasper.ca?subject=${encodeURIComponent(props.subject)}`)
</script>

<template>
  <div class="draft-block">
    <section class="draft-hero hero-media" aria-labelledby="application-heading">
      <ResponsiveImage class="hero-media__image" :name="image" priority />
      <div class="container draft-hero__inner">
        <h1 id="application-heading" class="draft-hero__title">{{ heading }}</h1>
        <p class="draft-hero__text">{{ text }}</p>
      </div>
    </section>

    <section id="application" class="draft-section" aria-labelledby="application-form-title">
      <div class="container draft-section__inner">
        <div class="draft__paper">
          <noscript>
            <p class="draft-help">
              The guided form needs JavaScript. <a :href="worksheet">Download the blank worksheet instead.</a>
            </p>
          </noscript>
          <div class="draft__intro">
            <div>
              <h2 id="application-form-title" class="draft__title">{{ formTitle }}</h2>
              <p class="draft-help">
                Fill in the form, download your answers and email them to <a :href="mailto">vincent@ujasper.ca</a>.
              </p>
            </div>
            <div class="draft__progress" role="group" aria-label="Form progress">
              <p class="draft__step-label" aria-live="polite">{{ stepLabel }}</p>
              <div class="draft__bar" aria-hidden="true">
                <i v-for="n in 4" :key="n" :class="{ 'is-active': n - 1 <= current }"></i>
              </div>
            </div>
          </div>
          <form ref="form" :data-kind="kind" method="dialog" @submit.prevent>
            <slot :current="current" />

            <section ref="review" class="draft__review" :hidden="current !== 3" tabindex="-1" aria-labelledby="draft-review-title">
              <h3 id="draft-review-title" class="draft__review-title">Review your answers</h3>
              <p class="draft-help">Go back to revise, or download a copy to email.</p>
              <pre>{{ reviewText }}</pre>
            </section>

            <div class="draft__controls">
              <button type="button" class="draft__back" :disabled="current === 0" @click="back">
                <span aria-hidden="true">←</span> Back
              </button>
              <button v-if="current < 3" type="button" class="cta cta--primary" @click="next">
                {{ current === 2 ? 'Review' : 'Continue' }} <span class="cta__arrow" aria-hidden="true">→</span>
              </button>
              <button v-else type="button" class="cta cta--primary" @click="download">
                Download my answers <span aria-hidden="true">↓</span>
              </button>
            </div>
            <p class="draft__message" role="status">{{ message }}</p>
          </form>
        </div>

        <p class="draft__fineprint">
          Required fields are marked *. Prefer paper?
          <a :href="worksheet" download>Download a blank worksheet <span aria-hidden="true">↓</span></a>
        </p>
      </div>
    </section>
  </div>
</template>
