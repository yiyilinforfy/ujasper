<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import AppLink from '../components/AppLink.vue'
import DraftForm from '../components/DraftForm.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import '../styles/pathway.css'

const areas = [
  {
    name: 'Fieldcraft and physical practice',
    focus: ['Route-and-camp', 'Strength practices', '36 hours'],
    hours: 36,
    text: 'Route-and-camp decisions; twelve coached 30-minute strength practices within the 36 hours.',
  },
  {
    name: 'Martial arts and restraint',
    focus: ['Controlled movement', 'Agreed boundaries', 'Stop-and-restart'],
    hours: 18,
    text: 'Controlled movement, agreed boundaries and a demonstrated stop-and-restart procedure.',
  },
  {
    name: 'Attention and reflective practice',
    focus: ['Voluntary attention', 'Observation', 'Reflection'],
    hours: 12,
    text: 'Voluntary attention practice, observation and reflection; no required belief or private disclosure.',
  },
  {
    name: 'Jasper as Laboratory',
    focus: ['Investigations', 'Dossier', 'Defence'],
    hours: 30,
    text: 'Twelve investigations; a scientific dossier with data, model, uncertainty and an individual defence.',
  },
  {
    name: 'Philosophy and the Jasper Tutorial',
    focus: ['Pair tutorials', 'Revised essays', 'Opposing arguments'],
    hours: 30,
    text: 'Weekly pair tutorials; two revised essays and a fair account of an opposing argument.',
  },
  {
    name: 'The Commons and original inquiry',
    focus: ['Original work', 'Peer testing', 'Shared decisions'],
    hours: 18,
    text: 'Useful original work, peer testing, shared decisions and a public-facing explanation when agreed.',
  },
]

const roleInformation = [
  { title: 'Teaching scope', text: 'Named course area and actual preparation/assessment load' },
  { title: 'Practical support', text: 'Venue, equipment, access and field coverage agreed' },
  { title: 'Review', text: 'Relevant work, teaching demonstration and role-appropriate checks' },
  { title: 'Status', text: 'Expressions of interest only; no job or contract offer' },
]

const challenge = [
  { minutes: '0–3', text: 'Ask what a pair of cooling curves might show. Record predictions.' },
  { minutes: '3–9', text: 'Inspect the explicitly synthetic data and calculate both temperature changes.' },
  { minutes: '9–15', text: 'Compare a descriptive conclusion with a causal claim; identify a confounder.' },
  { minutes: '15–20', text: 'Each learner revises one claim and specifies a useful next test.' },
]

const steps = ['Your introduction', 'Your work and questions', 'Your commitments'] as const

const openArea = ref<number | null>(null)
const toggleArea = (i: number) => (openArea.value = openArea.value === i ? null : i)

const draft = useTemplateRef<InstanceType<typeof DraftForm>>('draft')
const pad = (n: number) => String(n).padStart(2, '0')
const areaLink = (name: string) => `/join/teachers?area=${encodeURIComponent(name)}#draft`

function prepareArea(name: string) {
  draft.value?.chooseRole(name)
}
</script>

<template>
  <div class="pw">
    <DraftForm
      ref="draft"
      kind="teacher"
      label="Founding educators"
      heading="Teach with depth.<br><em>Make understanding visible.</em>"
      text="Bring a serious practice and the generosity to help someone else enter it. Show how a learner could test, explain and revise what they understand."
      image="teach-classroom"
      worksheet="/teacher-application-worksheet.txt"
      preselect="area"
    >
      <template #default="{ current }">
        <fieldset class="draft-step" data-step="0" :hidden="current !== 0">
          <legend>{{ steps[0] }}</legend>
          <div class="draft-field draft-field--c1">
            <label class="draft-label" for="teacher-name">Your name <span aria-hidden="true">*</span></label>
            <input
              id="teacher-name"
              class="draft-input"
              name="name"
              data-export="Your name"
              type="text"
              maxlength="250"
              required
              autocomplete="name"
            >
          </div>
          <div class="draft-field draft-field--c1">
            <label class="draft-label" for="teacher-email">
              Email for your own draft <span class="draft-optional">Optional</span>
            </label>
            <p id="teacher-email-help" class="draft-help">No address is sent to us by this tool.</p>
            <input
              id="teacher-email"
              class="draft-input"
              name="email"
              data-export="Email for your own draft"
              type="email"
              maxlength="250"
              autocomplete="email"
              aria-describedby="teacher-email-help"
            >
          </div>
          <fieldset class="draft-field draft-field--full draft-choices">
            <legend>Teaching area <span aria-hidden="true">*</span></legend>
            <label v-for="(area, i) in areas" :key="area.name" class="draft-choice">
              <input
                type="radio"
                name="area"
                :value="area.name"
                data-export="Teaching area"
                :required="i === 0"
              >
              <span>{{ area.name }}</span>
            </label>
          </fieldset>
        </fieldset>

        <fieldset class="draft-step draft-step--three" data-step="1" :hidden="current !== 1">
          <legend>{{ steps[1] }}</legend>
          <div class="draft-field">
            <label class="draft-label" for="teacher-practice">
              What have you studied or practised deeply? <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="teacher-practice"
              class="draft-input"
              name="practice"
              data-export="What have you studied or practised deeply?"
              rows="4"
              maxlength="12000"
              required
            ></textarea>
          </div>
          <div class="draft-field">
            <label class="draft-label" for="teacher-lesson">
              Propose a twenty-minute lesson <span aria-hidden="true">*</span>
            </label>
            <p id="teacher-lesson-help" class="draft-help">
              State the question, activity, evidence of understanding and an adaptation. A model is shown above.
            </p>
            <textarea
              id="teacher-lesson"
              class="draft-input"
              name="lesson"
              data-export="Propose a twenty-minute lesson"
              rows="4"
              maxlength="12000"
              required
              aria-describedby="teacher-lesson-help"
            ></textarea>
          </div>
          <div class="draft-field">
            <label class="draft-label" for="teacher-evidence">
              Work or experience we could inspect <span class="draft-optional">Optional</span>
            </label>
            <p id="teacher-evidence-help" class="draft-help">
              A plain URL or description is enough. Do not include private information about learners.
            </p>
            <textarea
              id="teacher-evidence"
              class="draft-input"
              name="evidence"
              data-export="Work or experience we could inspect"
              rows="4"
              maxlength="12000"
              aria-describedby="teacher-evidence-help"
            ></textarea>
          </div>
        </fieldset>

        <fieldset class="draft-step draft-step--three" data-step="2" :hidden="current !== 2">
          <legend>{{ steps[2] }}</legend>
          <div class="draft-field">
            <label class="draft-label" for="teacher-availability">
              Availability and practical requirements <span class="draft-optional">Optional</span>
            </label>
            <p id="teacher-availability-help" class="draft-help">
              State location, timing, compensation expectations or access needs without sensitive details.
            </p>
            <textarea
              id="teacher-availability"
              class="draft-input"
              name="availability"
              data-export="Availability and practical requirements"
              rows="4"
              maxlength="12000"
              aria-describedby="teacher-availability-help"
            ></textarea>
          </div>
          <label class="draft-check">
            <input type="checkbox" name="adult" value="Yes" data-export="I am 18 or older" required>
            <span>I am 18 or older (required)</span>
          </label>
          <label class="draft-check">
            <input
              type="checkbox"
              name="status"
              value="Yes"
              data-export="I understand that this is a draft and no teaching appointment or compensation is offered"
              required
            >
            <span>
              I understand that this is a draft and no teaching appointment or compensation is offered (required)
            </span>
          </label>
        </fieldset>
      </template>
    </DraftForm>

    <figure class="pw-band t-band">
      <ResponsiveImage
        name="hero-ridge"
        alt="A small group seated on a rocky ridge above a mountain lake, with one person standing beside them"
      />
    </figure>

    <section class="pw-section t-why" aria-labelledby="why-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">Founding educators</p>
          <h2 id="why-title" class="pw-h2">One clear lesson.<br><em>A way to see growth.</em></h2>
        </div>
        <div class="t-why__body">
          <p class="pw-text">
            We are seeking educators for six connected areas. Relevant disciplinary or coaching competence, clear teaching
            and sound judgment matter. One person may contribute to more than one area when qualified and available.
          </p>
          <p class="pw-text">
            Roles, dates, pay, employment or contract terms and local support are not yet confirmed. Preparation,
            feedback, camp coverage and the second tutorial educator must be resourced separately.
          </p>
        </div>
        <p class="pw-actions t-why__actions">
          <AppLink class="link" to="#areas">Explore the teaching areas <span aria-hidden="true">→</span></AppLink>
        </p>
      </div>
    </section>

    <section id="areas" class="pw-section pw-section--mist" aria-labelledby="areas-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">Six areas of practice</p>
          <h2 id="areas-title" class="pw-h2">Help shape the teaching.</h2>
          <p class="pw-text">Proposed teaching roles. Scope and terms to be agreed.</p>
        </div>
        <ol class="t-areas">
          <li v-for="(area, i) in areas" :key="area.name" class="t-area" :class="{ 'is-open': openArea === i }">
            <div class="t-area__row">
              <span class="t-area__num">{{ pad(i + 1) }}</span>
              <h3 class="t-area__title">
                <button
                  :id="`area-button-${i}`"
                  type="button"
                  :aria-expanded="openArea === i"
                  :aria-controls="`area-panel-${i}`"
                  @click="toggleArea(i)"
                >
                  {{ area.name }}
                  <span class="t-area__toggle" aria-hidden="true"></span>
                </button>
              </h3>
              <p class="t-area__focus">{{ area.focus.join(' · ') }}</p>
              <p class="t-area__hours">{{ area.hours }} teaching hours</p>
              <AppLink class="link t-area__cta" :to="areaLink(area.name)" @click="prepareArea(area.name)">
                Prepare for this area <span aria-hidden="true">→</span>
                <span class="visually-hidden">: {{ area.name }}</span>
              </AppLink>
            </div>
            <div
              :id="`area-panel-${i}`"
              class="t-area__panel"
              role="region"
              :aria-labelledby="`area-button-${i}`"
              :hidden="openArea !== i"
            >
              <p class="pw-text">{{ area.text }}</p>
              <p class="t-area__load">Proposed course allocation · {{ area.hours }} teaching hours</p>
              <AppLink class="link t-area__cta-panel" :to="areaLink(area.name)" @click="prepareArea(area.name)">
                Prepare for this area <span aria-hidden="true">→</span>
              </AppLink>
            </div>
          </li>
        </ol>
        <p class="pw-note t-areas__note">
          Hours shown are the learner-facing course allocation across six weeks. Preparation, assessment, coordination
          and camping supervision require separate time and agreed resources. More than one person may share an area.
        </p>
      </div>
    </section>

    <section class="pw-section pw-section--navy" aria-labelledby="challenge-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">A twenty-minute teaching challenge</p>
          <h2 id="challenge-title" class="pw-h2">Make one difficult<br><em>idea understandable.</em></h2>
          <p class="pw-text">
            Choose a question. Give learners something to do or inspect. Ask for evidence of understanding. Offer another
            route for someone who needs it. The draft below asks for this proposal once.
          </p>
        </div>
        <p class="pw-note"><span class="t-minutes-label">Minutes</span> · Example: a claim about warmth</p>
        <ol class="pw-columns pw-columns--4" aria-label="Minutes and Example: a claim about warmth">
          <li v-for="item in challenge" :key="item.minutes">
            <span class="pw-num">{{ item.minutes }}</span>
            <p class="pw-item-title">{{ item.text }}</p>
          </li>
        </ol>
        <p class="pw-actions t-challenge__note">
          <AppLink class="link" to="/learning">Inspect the complete worked example <span aria-hidden="true">→</span></AppLink>
        </p>
      </div>
    </section>

    <section class="pw-section" aria-labelledby="principles-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">Before an appointment</p>
          <h2 id="principles-title" class="pw-h2">Role information.</h2>
        </div>
        <ol class="pw-rows" aria-label="Role information and Before an appointment">
          <li v-for="(item, i) in roleInformation" :key="item.title">
            <span class="pw-num">{{ pad(i + 1) }}</span>
            <h3 class="pw-item-title">{{ item.title }}</h3>
            <p class="pw-text">{{ item.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="container pw-switch" aria-label="Student pathway">
      <p class="pw-label">Looking for your own learning adventure?</p>
      <AppLink class="link" to="/join/students">Explore the student pathway <span aria-hidden="true">→</span></AppLink>
    </section>
  </div>
</template>

<style scoped>
.t-band img {
  object-position: 70% 45%;
}

.t-why__body {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5) var(--space-8);
  max-width: 64rem;
}

.t-why__actions,
.t-role-info {
  margin-top: var(--space-6);
}

.t-areas {
  border-top: 1px solid var(--color-ink);
}

.t-area {
  border-bottom: 1px solid var(--color-line);
  transition: background-color var(--duration) var(--ease);
}

.t-area:hover,
.t-area.is-open {
  background: rgba(255, 255, 255, 0.6);
}

.t-area__row {
  display: grid;
  grid-template-columns: 3rem minmax(0, 5fr) minmax(0, 4fr) 9rem auto;
  align-items: baseline;
  gap: var(--space-2) var(--space-5);
  padding: var(--space-5) var(--space-3);
}

.t-area__num {
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  color: var(--color-cobalt);
}

.t-area__title button {
  display: inline-flex;
  align-items: baseline;
  gap: var(--space-3);
  padding: 0;
  border: 0;
  background: none;
  color: var(--color-ink);
  font-family: var(--font-serif);
  font-size: 1.375rem;
  line-height: 1.25;
  text-align: left;
  cursor: pointer;
}

.t-area__title button:hover {
  color: var(--color-cobalt);
}

.t-area__toggle {
  position: relative;
  flex: none;
  width: 0.75rem;
  height: 0.75rem;
}

.t-area__toggle::before,
.t-area__toggle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transition: transform var(--duration) var(--ease);
}

.t-area__toggle::after {
  transform: rotate(90deg);
}

.t-area.is-open .t-area__toggle::after {
  transform: rotate(0deg);
}

.t-area__focus {
  font-size: var(--text-small);
  color: var(--color-muted);
}

.t-area__hours {
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-muted);
}

.t-area__cta,
.t-area__cta-panel {
  white-space: nowrap;
}

.t-area__panel {
  display: grid;
  gap: var(--space-3);
  padding: 0 var(--space-3) var(--space-6) calc(3rem + var(--space-5) + var(--space-3));
}

.t-area__panel[hidden] {
  display: none;
}

.t-area__load {
  font-size: 0.8125rem;
  color: var(--color-muted);
}

.t-area__cta-panel {
  display: none;
}

.t-areas__note,
.t-challenge__note {
  margin-top: var(--space-6);
}

@media (max-width: 1100px) {
  .t-area__row {
    grid-template-columns: 3rem minmax(0, 1fr) auto;
  }

  .t-area__focus,
  .t-area__hours {
    grid-column: 2;
  }

  .t-area__cta {
    grid-column: 3;
    grid-row: 1;
  }
}

@media (max-width: 900px) {
  .t-why__body {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .t-area__row {
    grid-template-columns: 2.25rem minmax(0, 1fr);
    padding-inline: 0;
  }

  .t-area__cta {
    display: none;
  }

  .t-area__panel {
    padding: 0 0 var(--space-5) calc(2.25rem + var(--space-5));
  }

  .t-area__cta-panel {
    display: inline;
  }
}

@media (prefers-reduced-motion: reduce) {
  .t-area,
  .t-area__toggle::before,
  .t-area__toggle::after {
    transition: none;
  }
}
</style>
