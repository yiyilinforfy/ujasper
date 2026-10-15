<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
import DraftForm from '../components/DraftForm.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import '../styles/pathway.css'

const activities = [
  {
    title: 'Hike and camp with qualified leaders.',
    text: 'Field preparation, navigation and serviced camping under people who know the terrain.',
  },
  {
    title: 'Practise martial arts with restraint.',
    text: 'Balance, footwork, controlled pad work and the judgment to stop.',
  },
  {
    title: 'Try a method of attention.',
    text: 'Short, accessible meditation and reflection, with equal alternatives.',
  },
  {
    title: 'Investigate a physical model.',
    text: 'Units, mechanics, uncertainty and reproducible experiments.',
  },
  {
    title: 'Read and argue from a primary text.',
    text: 'Careful reading, fair opposing arguments and revised claims.',
  },
  {
    title: 'Make something another person can use.',
    text: 'From a question to a tested artifact, with feedback and authorship.',
  },
]

const threeThings = [
  {
    title: 'A question you own.',
    text: 'What keeps drawing your attention? Explain what you want to understand and why it matters to you.',
  },
  {
    title: 'Something you have tried.',
    text: 'A small experiment, a book, a practical task, a project that failed. Show the work and the change in your thinking.',
  },
  {
    title: 'Something you can give.',
    text: 'What could you bring to a shared learning life? Begin with a skill, a reliable habit or a willingness to help.',
  },
]

const commitments = [
  {
    title: 'Who this is for.',
    text: 'Adults aged 18 or over who could join the six-week programme in Jasper. Beginners and returning learners are welcome. No transcript, test score, expensive portfolio or athletic benchmark is required for this proposed introductory programme.',
  },
  {
    title: 'The rhythm.',
    text: 'Four teaching days each week, 144 learning hours and three proposed camping nights. Adapted activities and supervised day-camp equivalents retain equal educational standing.',
  },
  {
    title: 'The calendar.',
    text: 'Winter break runs from mid-December to mid-February, approximately two months. Cohorts take place outside that period. Exact programme dates remain unconfirmed.',
  },
  {
    title: 'The practical details.',
    text: 'Fees, financial support, accommodation, travel and included costs must be confirmed before anyone decides to attend. This is a proposed non-degree programme; it does not offer academic credit or a professional qualification.',
  },
]

const admissions = [
  {
    when: 'Now',
    title: 'Prepare your draft.',
    text: 'Reflect, write and keep a copy. The official application channel is not yet open.',
  },
  {
    when: 'When applications open',
    title: 'Send it. Meet the team.',
    text: 'Submit through the confirmed channel. A conversation would explore your interests, availability and how the group could learn together.',
  },
  {
    when: 'Before you commit',
    title: 'Review the real offer.',
    text: 'Receive confirmed staff, dates, activities, costs and participation terms. An application alone never reserves a place.',
  },
]

const steps = ['Your question', 'Your way of learning', 'Your Jasper chapter'] as const
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="pw">
    <DraftForm
      kind="student"
      heading="We are looking for curious adult learners."
      text="Adults 18 or over for a six-week, in-person field semester in Jasper. No transcript, test score or portfolio required."
      image="apply-signing"
      form-title="Student application form"
      worksheet="/student-application-worksheet.txt"
      subject="University of Jasper — student inquiry"
    >
      <template #default="{ current }">
        <fieldset class="draft-step" data-step="0" :hidden="current !== 0">
          <legend>{{ steps[0] }}</legend>
          <div class="draft-field draft-field--c1">
            <label class="draft-label" for="student-name">Name or preferred name <span aria-hidden="true">*</span></label>
            <input id="student-name" class="draft-input" name="student-name" data-export="Name or preferred name" type="text" maxlength="100" required autocomplete="name">
          </div>
          <div class="draft-field draft-field--c1">
            <label class="draft-label" for="student-email">Contact email <span class="draft-optional">Optional</span></label>
            <p id="student-email-help" class="draft-help">Optional while preparing your draft. Nothing is sent from this page.</p>
            <input id="student-email" class="draft-input" name="student-email" data-export="Contact email" type="email" maxlength="200" autocomplete="email" aria-describedby="student-email-help">
          </div>
          <div class="draft-field draft-field--c2 draft-field--rows2">
            <label class="draft-label" for="student-question">What question keeps pulling you back? <span aria-hidden="true">*</span></label>
            <p id="student-question-help" class="draft-help">It may come from nature, science, a book, a practical problem or something you have lived through. You do not need a polished answer.</p>
            <textarea id="student-question" class="draft-input" name="student-question" data-export="What question keeps pulling you back?" rows="4" maxlength="1000" required aria-describedby="student-question-help"></textarea>
          </div>
        </fieldset>

        <fieldset class="draft-step" data-step="1" :hidden="current !== 1">
          <legend>{{ steps[1] }}</legend>
          <div class="draft-field draft-field--c1 draft-field--rows2">
            <label class="draft-label" for="student-work">Tell us about something you have tried, made or learned. <span aria-hidden="true">*</span></label>
            <p id="student-work-help" class="draft-help">Small and unfinished work counts. Explain what you did, what happened and what you would change.</p>
            <textarea id="student-work" class="draft-input" name="student-work" data-export="Tell us about something you have tried, made or learned." rows="4" maxlength="1400" required aria-describedby="student-work-help"></textarea>
          </div>
          <div class="draft-field draft-field--c1">
            <label class="draft-label" for="student-evidence">A link to something you want to share <span class="draft-optional">Optional</span></label>
            <p id="student-evidence-help" class="draft-help">Optional. A portfolio is not required. Share only your work or material you have permission to share.</p>
            <input id="student-evidence" class="draft-input" name="student-evidence" data-export="A link to something you want to share" type="url" maxlength="600" aria-describedby="student-evidence-help">
          </div>
          <div class="draft-field draft-field--c2 draft-field--rows3">
            <label class="draft-label" for="student-revision">When did evidence or another person change your mind? <span aria-hidden="true">*</span></label>
            <p id="student-revision-help" class="draft-help">Describe the original belief, the challenge and what you think now.</p>
            <textarea id="student-revision" class="draft-input" name="student-revision" data-export="When did evidence or another person change your mind?" rows="4" maxlength="1200" required aria-describedby="student-revision-help"></textarea>
          </div>
        </fieldset>

        <fieldset class="draft-step draft-step--three" data-step="2" :hidden="current !== 2">
          <legend>{{ steps[2] }}</legend>
          <div class="draft-field">
            <label class="draft-label" for="student-contribution">What could you contribute to a small learning community? <span aria-hidden="true">*</span></label>
            <p id="student-contribution-help" class="draft-help">Consider a practical skill, a way of asking questions, a reliable habit or something you would like to learn to offer.</p>
            <textarea id="student-contribution" class="draft-input" name="student-contribution" data-export="What could you contribute to a small learning community?" rows="4" maxlength="1000" required aria-describedby="student-contribution-help"></textarea>
          </div>
          <div class="draft-field">
            <label class="draft-label" for="student-stretch">What would you most like to practise at Jasper? <span aria-hidden="true">*</span></label>
            <p id="student-stretch-help" class="draft-help">For example: field judgment, physical coordination, close reading, mathematical reasoning, attention or constructive disagreement.</p>
            <textarea id="student-stretch" class="draft-input" name="student-stretch" data-export="What would you most like to practise at Jasper?" rows="4" maxlength="800" required aria-describedby="student-stretch-help"></textarea>
          </div>
          <div class="draft-field">
            <label class="draft-label" for="student-availability">Could you consider six weeks of learning in Jasper? <span aria-hidden="true">*</span></label>
            <p id="student-availability-help" class="draft-help">Describe your general availability or what practical information you need first. Exact dates, fees, support and included costs remain unconfirmed.</p>
            <textarea id="student-availability" class="draft-input" name="student-availability" data-export="Could you consider six weeks of learning in Jasper?" rows="4" maxlength="800" required aria-describedby="student-availability-help"></textarea>
          </div>
          <label class="draft-check">
            <input type="checkbox" name="adult" value="Yes" data-export="Age 18 or over" required>
            <span>I am 18 or over.</span>
          </label>
          <label class="draft-check">
            <input type="checkbox" name="offline-understood" value="Yes" data-export="Offline format understood" required>
            <span>I have read the offline format: personal phones and internet are set aside during learning and camps, with staff emergency communications and private access exceptions.</span>
          </label>
          <label class="draft-check">
            <input type="checkbox" name="status-understood" value="Yes" data-export="Proposed-programme status understood" required>
            <span>I understand the field semester is a proposed non-degree programme. Preparing this draft does not enrol me or reserve a place.</span>
          </label>
          <p class="draft-help s-adapt">
            If you need an adaptation, the future admissions conversation should offer a private way to discuss it. Do not
            enter health details, disability records, identity documents or emergency contacts here.
          </p>
        </fieldset>
      </template>
    </DraftForm>

    <figure class="pw-band s-band">
      <ResponsiveImage name="jasper" alt="Mountains and water at Maligne Lake in Jasper National Park" />
    </figure>

    <section class="pw-section" aria-labelledby="experience-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">The experience</p>
          <h2 id="experience-title" class="pw-h2">
            Learning happens in the field, in the seminar<br><em>and in the work between them.</em>
          </h2>
          <p class="pw-text">
            A body you learn to trust. A mind you learn to question. A small community that asks you to contribute.
          </p>
        </div>
        <ol class="s-activities">
          <li v-for="(item, i) in activities" :key="item.title">
            <span class="pw-num">{{ pad(i + 1) }}</span>
            <div>
              <h3 class="pw-item-title">{{ item.title }}</h3>
              <p class="pw-text">{{ item.text }}</p>
            </div>
          </li>
        </ol>
        <p class="pw-note s-offline">
          Personal phones and internet are set aside during learning and camps. Staff emergency communications and private
          medical, accessibility and essential-contact exceptions remain available.
        </p>
        <p class="pw-actions">
          <AppLink class="link" to="/program">Meet the six-course field semester <span aria-hidden="true">→</span></AppLink>
        </p>
      </div>
    </section>

    <section class="pw-section pw-section--mist" aria-labelledby="three-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">Your application begins with three things</p>
          <h2 id="three-title" class="pw-h2">Curiosity. Practice.<br><em>A contribution.</em></h2>
          <p class="pw-text">We are not looking for a polished résumé.</p>
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
        <p class="pw-note s-begin-note">
          Current position: admissions are not open. Venue, dates and cost are not confirmed, and no fees are collected
          on this site. Accommodation is not included or promised. The six weeks total 144 facilitated and 24
          independent hours. Formal criteria, reviewers, access arrangements and decision dates will be published before
          admissions open.
        </p>
        <p class="pw-actions s-begin-actions">
          <AppLink class="link" to="/publications">Read the charter and fieldbook <span aria-hidden="true">→</span></AppLink>
        </p>
      </div>
    </section>

    <section class="pw-section pw-section--navy" aria-labelledby="admissions-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">A proposed admissions conversation</p>
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

/* Six activities in a 3×2 ruled grid. */
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
.s-begin-note,
.s-begin-actions {
  margin-top: var(--space-6);
}

.s-adapt {
  margin-top: var(--space-4);
}

/* Horizontal admissions timeline that stacks on small screens. */
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
