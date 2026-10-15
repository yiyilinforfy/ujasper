<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
import DraftForm from '../components/DraftForm.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import type { DraftField } from '../composables/useApplicationForm'
import '../styles/pathway.css'

const position = [
  ['Age', '18 or older'],
  ['Commitment', 'Six weeks; 144 facilitated + 24 independent hours'],
  ['Location', 'Jasper, Alberta; venue not confirmed'],
  ['Dates and cost', 'Not confirmed; no fees collected here'],
  ['Living and camping', 'Accommodation not included or promised; three camp nights proposed, with agreed equivalents'],
  ['Admissions', 'Not open. Prepare a draft or make a general inquiry.'],
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
    { name: 'question', label: 'A question you want to pursue', type: 'textarea', required: true },
  ],
  [
    { name: 'work', label: 'Something you have practised, made or investigated', type: 'textarea', required: true },
    { name: 'revision', label: 'A time evidence or another person changed your thinking', type: 'textarea', required: true },
    {
      name: 'contribution',
      label: 'Something you hope to contribute',
      type: 'textarea',
      hint: 'Writing, craft, a skill or a thoughtful question can all be starting points.',
    },
  ],
  [
    {
      name: 'practical',
      label: 'Practical questions or access arrangements to discuss',
      type: 'textarea',
      hint: 'Ask about dates, cost, accommodation or access; do not disclose medical records here.',
    },
    { name: 'adult', label: 'I am 18 or older', type: 'checkbox', required: true },
    {
      name: 'offline',
      label: 'I have read the offline agreement and its medical, access and essential-contact exceptions',
      type: 'checkbox',
      required: true,
    },
    {
      name: 'status',
      label: 'I understand that admissions are not open and this draft does not reserve a place',
      type: 'checkbox',
      required: true,
    },
  ],
]
</script>

<template>
  <div class="pw">
    <section class="pw-hero hero-media" aria-labelledby="students-title">
      <ResponsiveImage class="hero-media__image" name="apply-signing" priority />
      <div class="container">
        <div class="pw-hero__copy">
          <p class="pw-label">Prospective students</p>
          <h1 id="students-title" class="pw-hero__title">Bring a question.<br><em>Build an answer you can defend.</em></h1>
          <p class="pw-hero__lead">
            You do not need a polished life story. Bring curiosity, a practice you are willing to develop and the courage
            to revise your thinking.
          </p>
        </div>
      </div>
    </section>

    <section class="pw-section pw-section--cloud" aria-labelledby="offer-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">Before you begin</p>
          <h2 id="offer-title" class="pw-title">Know the offer.<br><em>Choose with care.</em></h2>
          <p class="pw-text">
            The proposed Field Semester is introductory, demanding and non-credit. It brings 6–8 adults together in
            person, with real preparation, physical practice, reading, argument and useful work.
          </p>
          <p class="pw-text">
            Personal phones, internet and live AI are off during teaching and camps, with agreed private medical,
            accessibility and essential-contact exceptions. Staff emergency communications remain active. Storage is
            voluntary and devices are returned on request.
          </p>
          <p class="pw-actions">
            <AppLink class="link" to="/learning">Try a learning example <span aria-hidden="true">→</span></AppLink>
            <AppLink class="link" to="/program">Read the full program <span aria-hidden="true">→</span></AppLink>
          </p>
        </div>
        <div class="pw-table-wrap" tabindex="0" role="region" aria-label="Before applying and Current position">
          <table class="pw-table">
            <thead>
              <tr>
                <th scope="col">Before applying</th>
                <th scope="col">Current position</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="[item, value] in position" :key="item">
                <th scope="row">{{ item }}</th>
                <td>{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="pw-section" aria-labelledby="learn-title">
      <div class="container">
        <div class="pw-head">
          <h2 id="learn-title" class="pw-title">Show how you learn.</h2>
          <p class="pw-text">
            A careful observation, a practical skill, writing, an experiment or community work can reveal more than a
            polished claim. We want to understand your questions, effort, response to criticism and contribution.
          </p>
        </div>
        <div class="pw-block">
          <h3 class="pw-item-title">A fair process to establish</h3>
          <p class="pw-text">
            Formal criteria, reviewers, access arrangements and decision dates will be published before admissions open.
            No transcript, video, passport or sensitive health record is requested by this draft tool.
          </p>
          <a class="link" href="mailto:vincent@ujasper.ca?subject=Jasper%20student%20inquiry">
            Ask a short question by email <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>

    <section id="draft" class="pw-section pw-section--cloud" aria-labelledby="draft-title">
      <div class="container">
        <DraftForm kind="student" :steps="steps" worksheet="/student-application-worksheet.txt" />
      </div>
    </section>
  </div>
</template>
