<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import AppLink from '../components/AppLink.vue'
import DraftForm from '../components/DraftForm.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import '../styles/pathway.css'

const areas = [
  {
    name: 'Fieldcraft & outdoor judgment',
    focus: ['Preparation', 'Navigation', 'Hiking', 'Camping'],
    hours: 36,
    text: 'Teach preparation, navigation, hiking and serviced camping. Bring terrain-appropriate qualifications, first aid and sound local judgment.',
  },
  {
    name: 'Martial arts & restraint',
    focus: ['Balance', 'Footwork', 'Pad work', 'Knowing when to stop'],
    hours: 18,
    text: 'Teach balance, footwork, controlled pad work and the decision to stop. Bring relevant coaching competence and consent-based beginner teaching.',
  },
  {
    name: 'Attention & reflective practice',
    focus: ['Meditation', 'Reflection', 'Equal alternatives'],
    hours: 12,
    text: 'Offer short, accessible meditation and reflection, with equal alternatives. Bring appropriate training, clear boundaries and a thoughtful response to discomfort.',
  },
  {
    name: 'Mathematics & physics',
    focus: ['Units', 'Mechanics', 'Uncertainty', 'Experiments'],
    hours: 30,
    text: 'Make models testable. Teach units, mechanics, uncertainty and reproducible experiments, including the introductory chemistry investigation.',
  },
  {
    name: 'Philosophy & world humanities',
    focus: ['Primary texts', 'Context', 'Opposing arguments'],
    hours: 30,
    text: 'Help learners read primary texts carefully, understand context, present opposing arguments fairly and revise their own claims.',
  },
  {
    name: 'Original inquiry & the commons',
    focus: ['Questions', 'Tested artifacts', 'Feedback', 'Authorship'],
    hours: 18,
    text: 'Guide useful projects from a question to a tested artifact. Teach feedback, authorship, resource choices and individual accountability.',
  },
]

const challenge = [
  'What is the question?',
  'What will learners actually do?',
  'What would count as understanding?',
  'How will you adapt when the first approach fails?',
]

const principles = [
  {
    title: 'Know the work.',
    text: 'Bring demonstrable subject knowledge and appropriate qualifications for the activity. Make evidence, sources and uncertainty visible.',
  },
  {
    title: 'Make room for independence.',
    text: 'Welcome a serious objection. Offer meaningful adaptations. Help learners think and act with increasing agency.',
  },
  {
    title: 'Take responsibility.',
    text: 'Prepare carefully, maintain professional boundaries and work with the local team. Field and martial roles require verified activity competence.',
  },
  {
    title: 'Agree the terms clearly.',
    text: 'Appointments, employment or contract status, compensation, dates and resources remain unconfirmed. Review these before accepting any role or making travel plans.',
  },
]

const steps = ['Your craft', 'A lesson worth teaching', 'Your Jasper chapter'] as const

const openArea = ref<number | null>(null)
const toggleArea = (i: number) => (openArea.value = openArea.value === i ? null : i)

const draft = useTemplateRef<InstanceType<typeof DraftForm>>('draft')
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="pw">
    <DraftForm
      ref="draft"
      kind="teacher"
      heading="We are recruiting founding teachers."
      text="Educators in fieldcraft, martial arts, attention, mathematics and physics, philosophy or original inquiry who can teach in person in Jasper."
      image="teach-classroom"
      form-title="Teacher application form"
      worksheet="/teacher-application-worksheet.txt"
      subject="University of Jasper — teaching inquiry"
    >
      <template #default="{ current }">
        <fieldset class="draft-step" data-step="0" :hidden="current !== 0">
          <legend>{{ steps[0] }}</legend>
          <div class="draft-field draft-field--c1">
            <label class="draft-label" for="teacher-name">Name or preferred name <span aria-hidden="true">*</span></label>
            <input id="teacher-name" class="draft-input" name="teacher-name" data-export="Name or preferred name" type="text" maxlength="100" required autocomplete="name">
          </div>
          <div class="draft-field draft-field--c1">
            <label class="draft-label" for="teacher-email">Contact email <span class="draft-optional">Optional</span></label>
            <p id="teacher-email-help" class="draft-help">Optional while preparing your draft. Nothing is sent from this page.</p>
            <input id="teacher-email" class="draft-input" name="teacher-email" data-export="Contact email" type="email" maxlength="200" autocomplete="email" aria-describedby="teacher-email-help">
          </div>
          <div class="draft-field draft-field--c2 draft-field--rows3">
            <label class="draft-label" for="teacher-craft">What can you help a learner understand or do? <span aria-hidden="true">*</span></label>
            <p id="teacher-craft-help" class="draft-help">Describe your subject, teaching experience and one concrete example of a learner’s progress.</p>
            <textarea id="teacher-craft" class="draft-input" name="teacher-craft" data-export="What can you help a learner understand or do?" rows="4" maxlength="1200" required aria-describedby="teacher-craft-help"></textarea>
          </div>
          <div class="draft-field draft-field--c1">
            <label class="draft-label" for="teacher-evidence">A link to your work <span class="draft-optional">Optional</span></label>
            <p id="teacher-evidence-help" class="draft-help">A lesson, project, research page, portfolio or CV link. Use only material you are entitled to share.</p>
            <input id="teacher-evidence" class="draft-input" name="teacher-evidence" data-export="A link to your work" type="url" maxlength="600" aria-describedby="teacher-evidence-help">
          </div>
          <fieldset class="draft-field draft-field--full draft-choices">
            <legend>Where could you contribute? <span aria-hidden="true">*</span></legend>
            <label v-for="(area, i) in areas" :key="area.name" class="draft-choice">
              <input type="radio" name="teaching-area" :value="area.name" data-export="Teaching area" :required="i === 0">
              <span>{{ area.name }}</span>
            </label>
          </fieldset>
        </fieldset>

        <fieldset class="draft-step draft-step--three" data-step="1" :hidden="current !== 1">
          <legend>{{ steps[1] }}</legend>
          <div class="draft-field">
            <label class="draft-label" for="teacher-question">What question would open your first Jasper lesson? <span aria-hidden="true">*</span></label>
            <textarea id="teacher-question" class="draft-input" name="teacher-question" data-export="What question would open your first Jasper lesson?" rows="4" maxlength="600" required placeholder="Start with a question learners can investigate."></textarea>
          </div>
          <div class="draft-field">
            <label class="draft-label" for="teacher-lesson">Design twenty minutes without a screen. <span aria-hidden="true">*</span></label>
            <p id="teacher-lesson-help" class="draft-help">Describe what learners do, the simple materials you need and how you discover whether they understand.</p>
            <textarea id="teacher-lesson" class="draft-input" name="teacher-lesson" data-export="Design twenty minutes without a screen." rows="4" maxlength="1600" required aria-describedby="teacher-lesson-help"></textarea>
          </div>
          <div class="draft-field">
            <label class="draft-label" for="teacher-adapt">A learner disagrees or cannot take part in the original activity. What do you do? <span aria-hidden="true">*</span></label>
            <p id="teacher-adapt-help" class="draft-help">Show how you preserve intellectual challenge, dignity and a meaningful alternative.</p>
            <textarea id="teacher-adapt" class="draft-input" name="teacher-adapt" data-export="A learner disagrees or cannot take part in the original activity. What do you do?" rows="4" maxlength="1200" required aria-describedby="teacher-adapt-help"></textarea>
          </div>
        </fieldset>

        <fieldset class="draft-step draft-step--three" data-step="2" :hidden="current !== 2">
          <legend>{{ steps[2] }}</legend>
          <div class="draft-field">
            <label class="draft-label" for="teacher-credentials">Relevant qualifications and boundaries of practice <span aria-hidden="true">*</span></label>
            <p id="teacher-credentials-help" class="draft-help">Summarise relevant teaching or activity credentials. Say what you are not qualified to lead. Do not upload certificates, ID or private records.</p>
            <textarea id="teacher-credentials" class="draft-input" name="teacher-credentials" data-export="Relevant qualifications and boundaries of practice" rows="4" maxlength="1200" required aria-describedby="teacher-credentials-help"></textarea>
          </div>
          <div class="draft-field">
            <label class="draft-label" for="teacher-availability">Your connection to Jasper and possible availability <span aria-hidden="true">*</span></label>
            <p id="teacher-availability-help" class="draft-help">General availability and whether you could teach in person. No home address or travel-booking information.</p>
            <textarea id="teacher-availability" class="draft-input" name="teacher-availability" data-export="Your connection to Jasper and possible availability" rows="4" maxlength="800" required aria-describedby="teacher-availability-help"></textarea>
          </div>
          <div class="draft-field">
            <label class="draft-label" for="teacher-terms">What would make this role workable for you? <span class="draft-optional">Optional</span></label>
            <p id="teacher-terms-help" class="draft-help">For example: preparation time, equipment, compensation or a limited teaching commitment.</p>
            <textarea id="teacher-terms" class="draft-input" name="teacher-terms" data-export="What would make this role workable for you?" rows="4" maxlength="800" aria-describedby="teacher-terms-help"></textarea>
          </div>
          <label class="draft-check">
            <input type="checkbox" name="status-understood" value="Yes" data-export="Proposed-role status understood" required>
            <span>I understand this is preparation for a founding teaching expression of interest. Employment status, compensation, dates and appointments are not confirmed.</span>
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
          <p class="pw-label">The invitation</p>
          <h2 id="why-title" class="pw-h2">Teach where explanation<br><em>meets experience.</em></h2>
        </div>
        <div class="t-why__body">
          <p class="pw-text">
            Jasper brings fieldcraft, martial arts, attention, science and philosophy into one learning life. We are
            developing a founding teaching team that can move between careful explanation, direct experience and honest
            disagreement.
          </p>
          <p class="pw-text">
            Your evidence matters: work you understand deeply, learners you have helped, a method you can explain and
            the judgment to know your limits.
          </p>
        </div>
        <p class="pw-actions t-why__actions">
          <AppLink class="link" to="#areas">Explore the teaching areas <span aria-hidden="true">→</span></AppLink>
          <a class="link" href="/field-semester.pdf" target="_blank" rel="noopener noreferrer">
            Read the instructor guide<span class="visually-hidden"> (PDF, opens in a new tab)</span>
            <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>
    </section>

    <section id="areas" class="pw-section pw-section--mist" aria-labelledby="areas-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">Six teaching areas</p>
          <h2 id="areas-title" class="pw-h2">One school.<br><em>Six areas of practice.</em></h2>
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
              <AppLink class="link t-area__cta" to="#application" @click="draft?.chooseRole(area.name)">
                Prepare for this role <span aria-hidden="true">→</span>
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
              <AppLink class="link t-area__cta-panel" to="#application" @click="draft?.chooseRole(area.name)">
                Prepare for this role <span aria-hidden="true">→</span>
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
          <p class="pw-label">The teaching challenge</p>
          <h2 id="challenge-title" class="pw-h2">Show us how you teach.</h2>
          <p class="pw-lead t-challenge__statement">Twenty minutes. No screen. Make it understood.</p>
          <p class="pw-text">
            Choose one idea worth understanding. Open with a question. Give learners something to do. Find out whether
            their reasoning has changed.
          </p>
        </div>
        <ol class="pw-columns pw-columns--4">
          <li v-for="(question, i) in challenge" :key="question">
            <span class="pw-num">{{ pad(i + 1) }}</span>
            <p class="pw-item-title">{{ question }}</p>
          </li>
        </ol>
        <p class="pw-note t-challenge__note">
          A short written lesson plan is enough. No unpaid trial delivery, video production or public performance is
          required for this draft.
        </p>
      </div>
    </section>

    <section class="pw-section" aria-labelledby="principles-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">What good teaching looks like here</p>
          <h2 id="principles-title" class="pw-h2">Depth. Generosity.<br><em>Sound judgment.</em></h2>
        </div>
        <ol class="pw-rows">
          <li v-for="(item, i) in principles" :key="item.title">
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

/* ---------- Why teach here ---------- */
.t-why__body {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5) var(--space-8);
  max-width: 64rem;
}

.t-why__actions {
  margin-top: var(--space-6);
}

/* ---------- Teaching areas: directory with expandable rows ---------- */
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

/* Plus that turns into a minus. */
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

.t-areas__note {
  margin-top: var(--space-6);
}

/* ---------- Teaching challenge ---------- */
.t-challenge__statement {
  font-style: italic;
  color: var(--color-ice);
}

.t-challenge__note {
  margin-top: var(--space-6);
}

/* ---------- Responsive ---------- */
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
