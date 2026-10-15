<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
import DraftForm from '../components/DraftForm.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import '../styles/pathway.css'

const position = [
  { title: 'Age', text: '18 or older' },
  { title: 'Commitment', text: 'Six weeks; 144 facilitated + 24 independent hours' },
  { title: 'Location', text: 'Jasper, Alberta; venue not confirmed' },
  { title: 'Dates and cost', text: 'Not confirmed; no fees collected here' },
  { title: 'Living and camping', text: 'Accommodation not included or promised; three camp nights proposed, with agreed equivalents' },
  { title: 'Admissions', text: 'Not open. Prepare a draft or make a general inquiry.' },
]

const threeThings = [
  {
    title: 'Observation and practice.',
    text: 'A careful observation, a practical skill, writing, an experiment or community work can reveal more than a polished claim.',
  },
  {
    title: 'Effort and revision.',
    text: 'We want to understand your questions, effort, response to criticism and contribution.',
  },
  {
    title: 'A contribution.',
    text: 'Writing, craft, a skill or a thoughtful question can all be starting points.',
  },
]

const commitments = [
  {
    title: 'Who this is for.',
    text: 'The proposed Field Semester is introductory, demanding and non-credit. It brings 6–8 adults together in person, with real preparation, physical practice, reading, argument and useful work.',
  },
  {
    title: 'The rhythm.',
    text: 'Six weeks; 144 facilitated hours plus 24 independent hours. Personal phones, internet and live AI are off during teaching and camps, with agreed private medical, accessibility and essential-contact exceptions.',
  },
  {
    title: 'The calendar.',
    text: 'Dates and cost are not confirmed; no fees are collected here. Accommodation is not included or promised; three camp nights are proposed, with agreed equivalents.',
  },
  {
    title: 'The practical details.',
    text: 'Staff emergency communications remain active. Storage is voluntary and devices are returned on request. Formal admissions are not open.',
  },
]

const admissions = [
  {
    when: 'Now',
    title: 'Prepare your draft.',
    text: 'Reflect, write and keep a copy. Admissions are not open. A draft does not reserve a place.',
  },
  {
    when: 'Before admissions open',
    title: 'A fair process to establish.',
    text: 'Formal criteria, reviewers, access arrangements and decision dates will be published before admissions open. No transcript, video, passport or sensitive health record is requested by this draft tool.',
  },
  {
    when: 'When you inquire',
    title: 'Ask a short question.',
    text: 'Email vincent@ujasper.ca for a short general inquiry.',
  },
]

const steps = ['Your introduction', 'Your work and questions', 'Your commitments'] as const
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="pw">
    <DraftForm
      kind="student"
      label="Prospective students"
      heading="Bring a question.<br><em>Build an answer you can defend.</em>"
      text="You do not need a polished life story. Bring curiosity, a practice you are willing to develop and the courage to revise your thinking."
      image="apply-signing"
      worksheet="/student-application-worksheet.txt"
    >
      <template #default="{ current }">
        <fieldset class="draft-step" data-step="0" :hidden="current !== 0">
          <legend>{{ steps[0] }}</legend>
          <div class="draft-field draft-field--c1">
            <label class="draft-label" for="student-name">Your name <span aria-hidden="true">*</span></label>
            <input
              id="student-name"
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
            <label class="draft-label" for="student-email">
              Email for your own draft <span class="draft-optional">Optional</span>
            </label>
            <p id="student-email-help" class="draft-help">No address is sent to us by this tool.</p>
            <input
              id="student-email"
              class="draft-input"
              name="email"
              data-export="Email for your own draft"
              type="email"
              maxlength="250"
              autocomplete="email"
              aria-describedby="student-email-help"
            >
          </div>
          <div class="draft-field draft-field--c2 draft-field--rows2">
            <label class="draft-label" for="student-question">
              A question you want to pursue <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="student-question"
              class="draft-input"
              name="question"
              data-export="A question you want to pursue"
              rows="4"
              maxlength="12000"
              required
            ></textarea>
          </div>
        </fieldset>

        <fieldset class="draft-step" data-step="1" :hidden="current !== 1">
          <legend>{{ steps[1] }}</legend>
          <div class="draft-field draft-field--c1 draft-field--rows2">
            <label class="draft-label" for="student-work">
              Something you have practised, made or investigated <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="student-work"
              class="draft-input"
              name="work"
              data-export="Something you have practised, made or investigated"
              rows="4"
              maxlength="12000"
              required
            ></textarea>
          </div>
          <div class="draft-field draft-field--c1 draft-field--rows2">
            <label class="draft-label" for="student-revision">
              A time evidence or another person changed your thinking <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="student-revision"
              class="draft-input"
              name="revision"
              data-export="A time evidence or another person changed your thinking"
              rows="4"
              maxlength="12000"
              required
            ></textarea>
          </div>
          <div class="draft-field draft-field--c2 draft-field--rows2">
            <label class="draft-label" for="student-contribution">
              Something you hope to contribute <span class="draft-optional">Optional</span>
            </label>
            <p id="student-contribution-help" class="draft-help">
              Writing, craft, a skill or a thoughtful question can all be starting points.
            </p>
            <textarea
              id="student-contribution"
              class="draft-input"
              name="contribution"
              data-export="Something you hope to contribute"
              rows="4"
              maxlength="12000"
              aria-describedby="student-contribution-help"
            ></textarea>
          </div>
        </fieldset>

        <fieldset class="draft-step draft-step--three" data-step="2" :hidden="current !== 2">
          <legend>{{ steps[2] }}</legend>
          <div class="draft-field">
            <label class="draft-label" for="student-practical">
              Practical questions or access arrangements to discuss <span class="draft-optional">Optional</span>
            </label>
            <p id="student-practical-help" class="draft-help">
              Ask about dates, cost, accommodation or access; do not disclose medical records here.
            </p>
            <textarea
              id="student-practical"
              class="draft-input"
              name="practical"
              data-export="Practical questions or access arrangements to discuss"
              rows="4"
              maxlength="12000"
              aria-describedby="student-practical-help"
            ></textarea>
          </div>
          <label class="draft-check">
            <input type="checkbox" name="adult" value="Yes" data-export="I am 18 or older" required>
            <span>I am 18 or older (required)</span>
          </label>
          <label class="draft-check">
            <input
              type="checkbox"
              name="offline"
              value="Yes"
              data-export="I have read the offline agreement and its medical, access and essential-contact exceptions"
              required
            >
            <span>
              I have read the offline agreement and its medical, access and essential-contact exceptions (required)
            </span>
          </label>
          <label class="draft-check">
            <input
              type="checkbox"
              name="status"
              value="Yes"
              data-export="I understand that admissions are not open and this draft does not reserve a place"
              required
            >
            <span>I understand that admissions are not open and this draft does not reserve a place (required)</span>
          </label>
        </fieldset>
      </template>
    </DraftForm>

    <figure class="pw-band s-band">
      <ResponsiveImage name="jasper" alt="Mountains and water at Maligne Lake in Jasper National Park" />
    </figure>

    <section class="pw-section" aria-labelledby="experience-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">Before you begin</p>
          <h2 id="experience-title" class="pw-h2">
            Know the offer.<br><em>Choose with care.</em>
          </h2>
          <p class="pw-text">
            The proposed Field Semester is introductory, demanding and non-credit. It brings 6–8 adults together in
            person, with real preparation, physical practice, reading, argument and useful work.
          </p>
          <p class="pw-text">
            Personal phones, internet and live AI are off during teaching and camps, with agreed private medical,
            accessibility and essential-contact exceptions. Staff emergency communications remain active. Storage is
            voluntary and devices are returned on request.
          </p>
        </div>
        <div class="s-position-head" aria-hidden="true">
          <span>Before applying</span>
          <span>Current position</span>
        </div>
        <ol class="s-activities" aria-label="Before applying and Current position">
          <li v-for="(item, i) in position" :key="item.title">
            <span class="pw-num">{{ pad(i + 1) }}</span>
            <div>
              <h3 class="pw-item-title">{{ item.title }}</h3>
              <p class="pw-text">{{ item.text }}</p>
            </div>
          </li>
        </ol>
        <p class="pw-actions s-offline">
          <AppLink class="link" to="/learning">Try a learning example <span aria-hidden="true">→</span></AppLink>
          <AppLink class="link" to="/program">Read the full program <span aria-hidden="true">→</span></AppLink>
        </p>
      </div>
    </section>

    <section class="pw-section pw-section--mist" aria-labelledby="three-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">Show how you learn.</p>
          <h2 id="three-title" class="pw-h2">Curiosity. Practice.<br><em>A contribution.</em></h2>
          <p class="pw-text">
            A careful observation, a practical skill, writing, an experiment or community work can reveal more than a
            polished claim. We want to understand your questions, effort, response to criticism and contribution.
          </p>
        </div>
        <ol class="pw-columns pw-columns--3">
          <li v-for="(item, i) in threeThings" :key="item.title">
            <span class="pw-num">{{ pad(i + 1) }}</span>
            <h3 class="pw-item-title">{{ item.title }}</h3>
            <p class="pw-text">{{ item.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="pw-section" aria-labelledby="begin-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">Before you begin</p>
          <h2 id="begin-title" class="pw-h2">Know the commitments.</h2>
        </div>
        <ol class="pw-columns pw-columns--4">
          <li v-for="item in commitments" :key="item.title">
            <h3 class="pw-item-title">{{ item.title }}</h3>
            <p class="pw-text">{{ item.text }}</p>
          </li>
        </ol>
        <p class="pw-actions s-begin-actions">
          <a class="link" href="mailto:vincent@ujasper.ca?subject=Jasper%20student%20inquiry">
            Ask a short question by email <span aria-hidden="true">→</span>
          </a>
        </p>
      </div>
    </section>

    <section class="pw-section pw-section--navy" aria-labelledby="admissions-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">A fair process to establish</p>
          <h2 id="admissions-title" class="pw-h2">Show your thinking.<br><em>Ask your questions.</em></h2>
        </div>
        <ol class="s-timeline">
          <li v-for="(step, i) in admissions" :key="step.when">
            <span class="s-timeline__when">{{ step.when }}</span>
            <span class="s-timeline__marker" aria-hidden="true">{{ pad(i + 1) }}</span>
            <h3 class="pw-item-title">{{ step.title }}</h3>
            <p class="pw-text">{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="container pw-switch" aria-label="Teaching pathway">
      <p class="pw-label">Have something you want to teach?</p>
      <AppLink class="link" to="/join/teachers">Explore founding teaching roles <span aria-hidden="true">→</span></AppLink>
    </section>
  </div>
</template>

<style scoped>
.s-band img {
  object-position: center 42%;
}

.s-position-head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
  margin-bottom: var(--space-3);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.s-activities {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--color-ink);
}

.s-activities > li {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  gap: var(--space-2) var(--space-4);
  padding: var(--space-5) var(--space-5) var(--space-5) 0;
  border-bottom: 1px solid var(--color-line);
}

.s-activities > li:nth-child(3n + 2),
.s-activities > li:nth-child(3n + 3) {
  padding-left: var(--space-5);
  border-left: 1px solid var(--color-line);
}

.s-activities .pw-text {
  margin-top: var(--space-2);
  max-width: none;
}

.s-offline,
.s-begin-actions {
  margin-top: var(--space-6);
}

.s-timeline {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-6);
  counter-reset: none;
}

.s-timeline > li {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  position: relative;
}

.s-timeline__when {
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ice);
}

.s-timeline__marker {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  margin-block: var(--space-1);
  border: 1px solid var(--color-line-on-dark);
  border-radius: 999px;
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  color: var(--color-ice);
  background: var(--color-navy);
}

.s-timeline > li:not(:last-child)::after {
  content: '';
  position: absolute;
  top: calc(1.15rem + 1.5rem);
  left: 2rem;
  width: calc(100% - 2rem + var(--space-6));
  height: 1px;
  background: var(--color-line-on-dark);
}

.s-timeline .pw-text {
  max-width: none;
}

@media (max-width: 900px) {
  .s-activities {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .s-activities > li:nth-child(3n + 2),
  .s-activities > li:nth-child(3n + 3) {
    padding-left: 0;
    border-left: 0;
  }

  .s-activities > li:nth-child(even) {
    padding-left: var(--space-5);
    border-left: 1px solid var(--color-line);
  }
}

@media (max-width: 760px) {
  .s-activities {
    grid-template-columns: 1fr;
  }

  .s-activities > li,
  .s-activities > li:nth-child(even) {
    padding: var(--space-5) 0;
    border-left: 0;
  }

  .s-timeline {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .s-timeline > li {
    grid-template-columns: 2rem minmax(0, 1fr);
    column-gap: var(--space-4);
    padding-bottom: var(--space-6);
  }

  .s-timeline__when {
    grid-column: 2;
  }

  .s-timeline__marker {
    grid-column: 1;
    grid-row: 1 / span 2;
    align-self: start;
  }

  .s-timeline > li:not(:last-child)::after {
    top: 2rem;
    left: 1rem;
    width: 1px;
    height: calc(100% - 2rem);
  }

  .s-timeline .pw-item-title,
  .s-timeline .pw-text {
    grid-column: 2;
  }
}
</style>
