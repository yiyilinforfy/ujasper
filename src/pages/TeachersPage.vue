<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
import DraftForm from '../components/DraftForm.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import type { DraftField } from '../composables/useApplicationForm'
import '../styles/pathway.css'

const roleInformation = [
  ['Teaching scope', 'Named course area and actual preparation/assessment load'],
  ['Practical support', 'Venue, equipment, access and field coverage agreed'],
  ['Review', 'Relevant work, teaching demonstration and role-appropriate checks'],
  ['Status', 'Expressions of interest only; no job or contract offer'],
] as const

const areas = [
  {
    title: 'Fieldcraft and physical practice',
    text: 'Route-and-camp decisions; twelve coached 30-minute strength practices within the 36 hours.',
  },
  {
    title: 'Martial arts and restraint',
    text: 'Controlled movement, agreed boundaries and a demonstrated stop-and-restart procedure.',
  },
  {
    title: 'Attention and reflective practice',
    text: 'Voluntary attention practice, observation and reflection; no required belief or private disclosure.',
  },
  {
    title: 'Jasper as Laboratory',
    text: 'Twelve investigations; a scientific dossier with data, model, uncertainty and an individual defence.',
  },
  {
    title: 'Philosophy and the Jasper Tutorial',
    text: 'Weekly pair tutorials; two revised essays and a fair account of an opposing argument.',
  },
  {
    title: 'The Commons and original inquiry',
    text: 'Useful original work, peer testing, shared decisions and a public-facing explanation when agreed.',
  },
] as const

const challenge = [
  ['0–3', 'Ask what a pair of cooling curves might show. Record predictions.'],
  ['3–9', 'Inspect the explicitly synthetic data and calculate both temperature changes.'],
  ['9–15', 'Compare a descriptive conclusion with a causal claim; identify a confounder.'],
  ['15–20', 'Each learner revises one claim and specifies a useful next test.'],
] as const

const steps: DraftField[][] = [
  [
    { name: 'name', label: 'Your name', type: 'text', required: true, autocomplete: 'name' },
    {
      name: 'email',
      label: 'Email for your own draft',
      type: 'email',
      autocomplete: 'email',
      hint: 'No address is sent to us by this tool.',
    },
    { name: 'area', label: 'Teaching area', type: 'select', required: true, options: areas.map(area => area.title) },
  ],
  [
    { name: 'practice', label: 'What have you studied or practised deeply?', type: 'textarea', required: true },
    {
      name: 'lesson',
      label: 'Propose a twenty-minute lesson',
      type: 'textarea',
      required: true,
      hint: 'State the question, activity, evidence of understanding and an adaptation. A model is shown above.',
    },
    {
      name: 'evidence',
      label: 'Work or experience we could inspect',
      type: 'textarea',
      hint: 'A plain URL or description is enough. Do not include private information about learners.',
    },
  ],
  [
    {
      name: 'availability',
      label: 'Availability and practical requirements',
      type: 'textarea',
      hint: 'State location, timing, compensation expectations or access needs without sensitive details.',
    },
    { name: 'adult', label: 'I am 18 or older', type: 'checkbox', required: true },
    {
      name: 'status',
      label: 'I understand that this is a draft and no teaching appointment or compensation is offered',
      type: 'checkbox',
      required: true,
    },
  ],
]

const pad = (n: number) => String(n).padStart(2, '0')
const areaLink = (title: string) => `/join/teachers?area=${encodeURIComponent(title)}#draft`
</script>

<template>
  <div class="pw">
    <section class="pw-hero hero-media" aria-labelledby="teachers-title">
      <ResponsiveImage class="hero-media__image" name="teach-classroom" priority />
      <div class="container">
        <div class="pw-hero__copy">
          <p class="pw-label">Founding educators</p>
          <h1 id="teachers-title" class="pw-hero__title">Teach with depth.<br><em>Make understanding visible.</em></h1>
          <p class="pw-hero__lead">
            Bring a serious practice and the generosity to help someone else enter it. Show how a learner could test,
            explain and revise what they understand.
          </p>
        </div>
      </div>
    </section>

    <section class="pw-section pw-section--cloud" aria-labelledby="lesson-title">
      <div class="container">
        <div class="pw-head">
          <h2 id="lesson-title" class="pw-title">One clear lesson.<br><em>A way to see growth.</em></h2>
          <p class="pw-text">
            We are seeking educators for six connected areas. Relevant disciplinary or coaching competence, clear teaching
            and sound judgment matter. One person may contribute to more than one area when qualified and available.
          </p>
          <p class="pw-note">
            Roles, dates, pay, employment or contract terms and local support are not yet confirmed. Preparation,
            feedback, camp coverage and the second tutorial educator must be resourced separately.
          </p>
        </div>
        <div class="pw-table-wrap" tabindex="0" role="region" aria-label="Role information and Before an appointment">
          <table class="pw-table">
            <thead>
              <tr>
                <th scope="col">Role information</th>
                <th scope="col">Before an appointment</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="[item, value] in roleInformation" :key="item">
                <th scope="row">{{ item }}</th>
                <td>{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="pw-section" aria-labelledby="areas-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">Six areas of practice</p>
          <h2 id="areas-title" class="pw-title">Help shape the teaching.</h2>
        </div>
        <ol class="pw-grid">
          <li v-for="(area, i) in areas" :key="area.title">
            <span class="pw-index">{{ pad(i + 1) }}</span>
            <h3 class="pw-item-title">{{ area.title }}</h3>
            <p class="pw-text">{{ area.text }}</p>
            <AppLink class="link" :to="areaLink(area.title)">
              Prepare for this area<span class="visually-hidden">: {{ area.title }}</span>
              <span aria-hidden="true">→</span>
            </AppLink>
          </li>
        </ol>
      </div>
    </section>

    <section class="pw-section pw-section--cloud" aria-labelledby="challenge-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">A twenty-minute teaching challenge</p>
          <h2 id="challenge-title" class="pw-title">Make one difficult<br><em>idea understandable.</em></h2>
          <p class="pw-text">
            Choose a question. Give learners something to do or inspect. Ask for evidence of understanding. Offer another
            route for someone who needs it. The draft below asks for this proposal once.
          </p>
        </div>
        <div class="pw-table-wrap" tabindex="0" role="region" aria-label="Minutes and Example: a claim about warmth">
          <table class="pw-table t-challenge">
            <thead>
              <tr>
                <th scope="col">Minutes</th>
                <th scope="col">Example: a claim about warmth</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="[minutes, activity] in challenge" :key="minutes">
                <th scope="row">{{ minutes }}</th>
                <td>{{ activity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="pw-actions">
          <AppLink class="link" to="/learning">Inspect the complete worked example <span aria-hidden="true">→</span></AppLink>
        </p>
      </div>
    </section>

    <section id="draft" class="pw-section" aria-labelledby="draft-title">
      <div class="container">
        <DraftForm kind="teacher" :steps="steps" worksheet="/teacher-application-worksheet.txt" preselect="area" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.pw-grid .link {
  justify-self: start;
}

.t-challenge tbody th {
  width: 7rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
</style>
