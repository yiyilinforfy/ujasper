<script setup lang="ts">
import { computed, ref } from 'vue'
import AppLink from '../components/AppLink.vue'
import CoolingChart, { type CoolingSeries } from '../components/learning/CoolingChart.vue'

const times = [0, 5, 10, 15, 20]
const series: CoolingSeries[] = [
  { key: 'a', label: 'A', values: [40, 36, 33, 30, 28] },
  { key: 'b', label: 'B', values: [40, 38, 36.5, 35, 33.5], dashed: true },
]

type ClaimKey = 'cause' | 'bounded' | 'field'

const claims: { key: ClaimKey; text: string; feedback: string }[] = [
  {
    key: 'cause',
    text: 'The numbers prove B’s insulation is always better.',
    feedback:
      'That conclusion goes beyond the evidence. These are invented teaching values with one run per sample. Starting conditions, placement, instruments and random variation could affect a real comparison.',
  },
  {
    key: 'bounded',
    text: 'In the supplied example, B cools less over 20 minutes.',
    feedback:
      'Yes. In this synthetic example, A falls by 12 °C and B by 6.5 °C over 20 minutes. B remains 5.5 °C warmer. This describes the supplied values; it does not establish why the difference arose.',
  },
  {
    key: 'field',
    text: 'This tells us how much clothing someone needs outdoors.',
    feedback:
      'A cup experiment cannot determine how much clothing will protect a person outdoors. Wind, wetness, fit, activity and the person matter; a field safety decision needs qualified judgment.',
  },
]

const chosenClaim = ref<ClaimKey | null>(null)
const claimFeedback = computed(() => claims.find(c => c.key === chosenClaim.value)?.feedback ?? '')

const levels = [
  {
    name: 'Foundation',
    title: 'Calculate and describe',
    paragraphs: [
      'A falls by 12 °C. B falls by 6.5 °C. After 20 minutes, B is 5.5 °C warmer. State the interval and units; do not call the difference statistically significant.',
      'Your evidence: a labelled table, checked subtraction and one bounded conclusion.',
    ],
  },
  {
    name: 'Develop',
    title: 'Design a fair comparison',
    paragraphs: [
      'Keep water volume, cup geometry, starting temperature, ambient conditions and instrument procedure comparable. Plan independent repeated runs and vary one intended factor. Record all trials and departures from the plan.',
      'Your evidence: a method another person could repeat and an explanation of at least one confounder.',
    ],
  },
  {
    name: 'Extend',
    title: 'Test a model and its limits',
    paragraphs: [
      'For a simple cooling model, compare the excess temperature T − 20 at each time. If exponential cooling were suitable, a graph of ln(T − 20) against time would be approximately straight. Do the two series warrant that model? What additional measurements would help?',
      'Your evidence: a model comparison, a justified uncertainty discussion and a revised claim. The model is an approximation, not a universal law for clothing or bodies.',
    ],
  },
]

const activeLevel = ref(0)
const levelTabs: (HTMLButtonElement | null)[] = []

function selectLevel(index: number, focus = false) {
  activeLevel.value = index
  if (focus) levelTabs[index]?.focus()
}

function onLevelKeydown(event: KeyboardEvent, index: number) {
  const count = levels.length
  let next: number | undefined
  if (event.key === 'ArrowRight') next = (index + 1) % count
  if (event.key === 'ArrowLeft') next = (index + count - 1) % count
  if (event.key === 'Home') next = 0
  if (event.key === 'End') next = count - 1
  if (next === undefined) return
  event.preventDefault()
  selectLevel(next, true)
}

const exchange = [
  { speaker: 'Initial claim:', text: 'B stays warmer, so its insulation caused the improvement.' },
  { speaker: 'Tutor’s question:', text: 'What else could differ, and what have we actually observed?' },
  {
    speaker: 'Revision:',
    text: 'In these supplied values B cools less. A repeated comparison with controlled conditions would be needed to investigate the cause.',
  },
]
</script>

<template>
  <div class="lp">
    <section class="lp-section lp-section--paper lp-intro" aria-labelledby="learning-title">
      <div class="container">
        <div class="lp-head">
          <p class="lp-label">Inside the learning · An educator-created example</p>
          <h1 id="learning-title" class="lp-title lp-title--page">What would make<br><em>you change your mind?</em></h1>
          <p class="lp-text">
            A small experiment can reveal a large difference between describing evidence and claiming to explain it.
            Work through the example at three levels of challenge.
          </p>
        </div>
      </div>
    </section>

    <section id="predict" class="lp-section lp-section--cloud" aria-labelledby="predict-title">
      <div class="container">
        <div class="lp-head">
          <p class="lp-label">01 · Predict before explaining</p>
          <h2 id="predict-title" class="lp-title">Two samples.<br><em>One tempting conclusion.</em></h2>
          <p class="lp-text">
            Imagine two samples of warm water, both starting at 40 °C in an ambient temperature of 20 °C. The table
            gives invented values for one illustrative run per sample. These are not observations from Jasper or results
            from a learner.
          </p>
          <p class="lp-text">
            Before looking at the numbers, write what you would need to know to compare two insulating arrangements
            fairly. Do not test cold exposure on a person.
          </p>
        </div>

        <div class="lp-data">
          <figure class="lp-plot">
            <p class="lp-synthetic">Synthetic teaching data · n = 1 per sample</p>
            <CoolingChart :times="times" :series="series" />
          </figure>

          <div class="lp-table" tabindex="0" role="region" aria-label="Time (min) and Sample A (°C) and Sample B (°C)">
            <table>
              <thead>
                <tr>
                  <th scope="col">Time (min)</th>
                  <th scope="col">Sample A (°C)</th>
                  <th scope="col">Sample B (°C)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(t, i) in times" :key="t">
                  <td>{{ t }}</td>
                  <td>{{ series[0].values[i] }}</td>
                  <td>{{ series[1].values[i] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p class="lp-note">
          <span class="lp-key lp-key--a" aria-hidden="true"></span>
          <span class="lp-key lp-key--b" aria-hidden="true"></span>
          Solid blue: A. Dashed copper: B. Axis begins at 0 °C. No measurement uncertainty is supplied, so none should
          be invented.
        </p>
      </div>
    </section>

    <section id="claim" class="lp-section lp-section--paper" aria-labelledby="claim-title">
      <div class="container">
        <div class="lp-head">
          <p class="lp-label">02 · Choose a defensible claim</p>
          <h2 id="claim-title" class="lp-title">What do these<br><em>numbers establish?</em></h2>
        </div>

        <div class="lp-claims" role="group" aria-labelledby="claim-title">
          <button
            v-for="claim in claims"
            :key="claim.key"
            type="button"
            class="lp-claim"
            :aria-pressed="chosenClaim === claim.key"
            aria-controls="claim-feedback"
            @click="chosenClaim = claim.key"
          >
            <span class="lp-claim__mark" aria-hidden="true"></span>
            <span class="lp-claim__text">{{ claim.text }}</span>
          </button>
        </div>

        <div id="claim-feedback" class="lp-feedback-region" aria-live="polite">
          <p v-if="claimFeedback" class="lp-feedback">{{ claimFeedback }}</p>
        </div>
        <noscript>
          <p class="lp-feedback">
            A defensible claim describes the supplied values: B cools less over 20 minutes. One synthetic run does not
            prove a cause or a field-performance claim.
          </p>
        </noscript>
      </div>
    </section>

    <section id="challenge" class="lp-section lp-section--cloud" aria-labelledby="challenge-title">
      <div class="container">
        <div class="lp-head">
          <p class="lp-label">03 · Deepen the inquiry</p>
          <h2 id="challenge-title" class="lp-title">One question.<br><em>Three levels of challenge.</em></h2>
        </div>

        <div class="lp-tabs" role="tablist" aria-label="Levels of challenge">
          <button
            v-for="(level, i) in levels"
            :id="`challenge-tab-${i}`"
            :key="level.name"
            :ref="el => (levelTabs[i] = el as HTMLButtonElement | null)"
            type="button"
            role="tab"
            class="lp-tab"
            :aria-selected="i === activeLevel"
            :aria-controls="`challenge-panel-${i}`"
            :tabindex="i === activeLevel ? 0 : -1"
            @click="selectLevel(i)"
            @keydown="onLevelKeydown($event, i)"
          >
            <span class="lp-tab__index" aria-hidden="true">0{{ i + 1 }}</span>
            {{ level.name }}
          </button>
        </div>

        <div
          v-for="(level, i) in levels"
          :id="`challenge-panel-${i}`"
          :key="level.name"
          class="lp-panel"
          role="tabpanel"
          :aria-labelledby="`challenge-tab-${i}`"
          tabindex="0"
          :hidden="i !== activeLevel"
        >
          <h3 class="lp-item-title">{{ level.title }}</h3>
          <p v-for="paragraph in level.paragraphs" :key="paragraph" class="lp-text">{{ paragraph }}</p>
        </div>
      </div>
    </section>

    <section id="tutorial" class="lp-section lp-section--paper" aria-labelledby="tutorial-title">
      <div class="container">
        <div class="lp-head">
          <p class="lp-label">04 · The tutorial</p>
          <h2 id="tutorial-title" class="lp-title">A better objection.<br><em>A better explanation.</em></h2>
        </div>

        <div class="lp-tutorial">
          <div class="lp-exchange">
            <p v-for="turn in exchange" :key="turn.speaker" class="lp-turn">
              <strong>{{ turn.speaker }}</strong> {{ turn.text }}
            </p>
            <p class="lp-small">Authored teaching exchange. It is not a quotation from a real tutorial or a student testimonial.</p>
          </div>

          <div class="lp-use">
            <h3 class="lp-item-title">Give the work a use</h3>
            <p class="lp-text">
              Turn the example into a clear one-page explanation for a consenting reader. Ask what they think the graph
              proves. Revise the explanation if it leads them to an unjustified conclusion.
            </p>
            <p class="lp-text">
              Assessment looks for accurate calculation, transparent evidence, a serious objection, an independent
              revision and care for the reader. It does not reward confidence unsupported by evidence.
            </p>
            <AppLink class="cta cta--primary" to="/publications">
              Explore the academic materials <span class="cta__arrow" aria-hidden="true">→</span>
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.lp {
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-variant-numeric: lining-nums;
  font-size: var(--text-body);
  font-weight: 300;
  line-height: 1.625;
}

.lp :where(h1, h2, h3, p, figure, table) {
  margin: 0;
}

/* ---------- Sections ---------- */
.lp-section {
  padding-block: var(--space-section);
  scroll-margin-top: var(--header-height);
}

.lp-section--paper {
  background: var(--color-paper);
}

.lp-section--cloud {
  background: var(--color-cloud);
}

.lp-intro {
  padding-bottom: clamp(3.5rem, 6vw, 5rem);
}

.lp-head {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  max-width: 48rem;
  margin-bottom: var(--space-7);
}

.lp-intro .lp-head {
  margin-bottom: 0;
}

.lp-label {
  margin-bottom: var(--space-2);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.lp-title {
  margin-bottom: var(--space-2);
  font-family: var(--font-serif);
  font-size: var(--text-display);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: var(--color-ink);
}

.lp-title--page {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.12;
}

.lp-title em {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  color: var(--color-cobalt);
}

.lp-text {
  max-width: 40rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--color-muted);
}

.lp-item-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.25;
  color: var(--color-ink);
}

.lp-small,
.lp-note {
  font-size: var(--text-small);
  line-height: 1.6;
  color: var(--color-muted);
}

/* ---------- 01 · Data ---------- */
.lp-data {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  align-items: start;
  gap: var(--space-7);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-ink);
}

.lp-plot {
  display: grid;
  gap: var(--space-4);
}

.lp-synthetic {
  justify-self: start;
  padding-bottom: var(--space-2);
  border-bottom: 2px solid var(--color-cobalt);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.lp-table {
  overflow-x: auto;
}

.lp-table table {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums lining-nums;
}

.lp-table th,
.lp-table td {
  padding: var(--space-3) var(--space-3) var(--space-3) 0;
  border-bottom: 1px solid var(--color-line);
  text-align: left;
}

.lp-table th {
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.4;
  text-transform: uppercase;
  vertical-align: bottom;
  color: var(--color-ink);
  border-bottom-color: var(--color-ink);
}

.lp-table td {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  color: var(--color-ink);
}

.lp-table td:first-child {
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--color-muted);
}

.lp-note {
  max-width: 40rem;
  margin-top: var(--space-5);
}

.lp-key {
  display: inline-block;
  width: 1.5rem;
  margin-right: 0.35rem;
  vertical-align: middle;
  border-top: 3px solid var(--color-cobalt);
}

.lp-key--b {
  margin-right: 0.6rem;
  border-top: 3px dashed var(--color-accent-deep);
}

/* ---------- 02 · Claims ---------- */
.lp-claims {
  display: grid;
  max-width: 48rem;
  border-top: 1px solid var(--color-ink);
}

.lp-claim {
  display: flex;
  align-items: baseline;
  gap: var(--space-4);
  width: 100%;
  padding: var(--space-5) var(--space-2) var(--space-5) 0;
  border: 0;
  border-bottom: 1px solid var(--color-line);
  background: transparent;
  color: var(--color-ink);
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.45;
  text-align: left;
  cursor: pointer;
  transition: color var(--duration) var(--ease);
}

.lp-claim:hover {
  color: var(--color-cobalt);
}

.lp-claim__mark {
  flex: none;
  width: 0.875rem;
  height: 0.875rem;
  border: 1px solid currentColor;
  border-radius: 50%;
  transform: translateY(0.05rem);
}

.lp-claim[aria-pressed='true'] {
  color: var(--color-cobalt);
}

.lp-claim[aria-pressed='true'] .lp-claim__mark {
  border-color: var(--color-cobalt);
  background: var(--color-cobalt);
  box-shadow: inset 0 0 0 2px var(--color-paper);
}

.lp-feedback-region {
  max-width: 48rem;
}

.lp-feedback {
  max-width: 44rem;
  margin-top: var(--space-6);
  padding-left: var(--space-5);
  border-left: 2px solid var(--color-cobalt);
  font-family: var(--font-serif);
  font-size: 1.1875rem;
  line-height: 1.8;
  color: var(--color-ink);
}

/* ---------- 03 · Tabs ---------- */
.lp-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0 var(--space-6);
  border-bottom: 1px solid var(--color-line);
}

.lp-tab {
  display: inline-flex;
  align-items: baseline;
  gap: var(--space-2);
  margin-bottom: -1px;
  padding: var(--space-3) 0;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--color-muted);
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    color var(--duration) var(--ease),
    border-color var(--duration) var(--ease);
}

.lp-tab__index {
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
}

.lp-tab:hover {
  color: var(--color-ink);
}

.lp-tab[aria-selected='true'] {
  border-bottom-color: var(--color-cobalt);
  color: var(--color-ink);
}

.lp-tab[aria-selected='true'] .lp-tab__index {
  color: var(--color-cobalt);
}

.lp-panel {
  display: grid;
  gap: var(--space-4);
  max-width: 48rem;
  padding-top: var(--space-6);
}

.lp-panel[hidden] {
  display: none;
}

.lp-panel .lp-item-title {
  margin-bottom: var(--space-2);
}

.lp-panel .lp-text:first-of-type {
  font-family: var(--font-serif);
  font-size: 1.1875rem;
  line-height: 1.8;
  color: var(--color-ink);
  max-width: 46rem;
}

/* ---------- 04 · Tutorial ---------- */
.lp-tutorial {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-8);
  align-items: start;
}

.lp-exchange,
.lp-use {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-ink);
}

.lp-turn {
  font-family: var(--font-serif);
  font-size: 1.1875rem;
  line-height: 1.8;
  color: var(--color-ink);
}

.lp-turn + .lp-turn {
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-line);
}

.lp-turn strong {
  display: block;
  margin-bottom: var(--space-1);
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.lp-exchange .lp-small {
  margin-top: var(--space-2);
}

.lp-use .cta {
  margin-top: var(--space-3);
}

/* ---------- Focus ---------- */
.lp-claim:focus-visible,
.lp-tab:focus-visible,
.lp-panel:focus-visible,
.lp-table:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
  .lp-data,
  .lp-tutorial {
    grid-template-columns: 1fr;
    gap: var(--space-7);
  }
}

@media (max-width: 760px) {
  .lp-claim {
    font-size: 1.125rem;
  }

  .lp-tabs {
    gap: 0 var(--space-5);
  }
}
</style>
