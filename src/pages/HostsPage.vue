<script setup lang="ts">
import { ref } from 'vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import { jasperDownload } from '../composables/useExportDialog'
import '../styles/pathway.css'

const roles = [
  { title: 'Local host', text: 'Take responsibility for the venue, local permissions and a clear contact channel.' },
  { title: 'Activity lead', text: 'Define a suitable programme, accessibility choices, weather decisions and emergency procedures.' },
  { title: 'Learning contributor', text: 'Facilitate one thoughtful session or review a student project.' },
  {
    title: 'Supporter',
    text: 'Offer space, printing or another specific resource. We are not collecting money or issuing charitable tax receipts.',
  },
  {
    title: 'Founding director',
    text: 'Discuss a founding role in establishing the university. The legal structure and governing documents remain to be established.',
  },
]

const requirements = [
  { title: '18 or over', text: 'Every role and introduction is for adults.' },
  { title: 'Able to be in Jasper', text: 'You can take part in person, in Jasper, Alberta.' },
  { title: 'Respectful with others', text: 'You can work alongside learners, staff and local partners with care.' },
  { title: 'Time for the programme', text: 'You can make time for the proposed six-week programme.' },
]

const process = [
  {
    title: 'Prepare your introduction',
    text: 'Tell us what you want to explore, what you have tried and how you could contribute. A small unfinished project is welcome.',
  },
  {
    title: 'Meet the local host',
    text: 'Once enrolment opens, a short conversation will establish interests, availability and participation needs.',
  },
  {
    title: 'Review the real arrangements',
    text: 'Venue, dates, activity scope, named leaders, total costs and participation terms must be provided before you decide.',
  },
]

const contributions = roles.map(role => role.title)

const pad = (n: number) => String(n).padStart(2, '0')

const status = ref('')

function onSubmit(event: Event) {
  const form = event.currentTarget as HTMLFormElement
  if (!form.reportValidity()) return
  const data = new FormData(form)
  const text =
    'JASPER — PERSONAL INTRODUCTION DRAFT\nNOT SUBMITTED. NOT AN ENROLMENT RECEIPT, FUNDING COMMITMENT OR DIRECTOR APPOINTMENT.\n\n' +
    'Name: ' +
    data.get('name') +
    '\nContact email: ' +
    (data.get('email') || '—') +
    '\nRole: ' +
    data.get('role') +
    '\n\nWhat I want to explore or offer:\n' +
    data.get('idea') +
    '\n\nSomething I have tried:\n' +
    data.get('example') +
    '\n\nConnection to Jasper and availability:\n' +
    data.get('availability') +
    '\n\nI confirm I am 18 or over.\n\nKeep this draft until the founder confirms an official contact address at ujasper.ca. No application has been sent.\n'
  jasperDownload('jasper-introduction-draft.txt', text)
  status.value = 'Your draft is ready in the export panel. Nothing has been submitted.'
}
</script>

<template>
  <div class="pw">
    <section class="draft-hero hero-media" aria-labelledby="hosts-heading">
      <ResponsiveImage class="hero-media__image" name="join-hosts" priority />
      <div class="container draft-hero__inner">
        <h1 id="hosts-heading" class="draft-hero__title">We are looking for hosts and founding partners.</h1>
        <p class="draft-hero__text">
          Local hosts, activity leads, learning contributors, supporters and future founding directors who can help the
          first gathering take shape in Jasper.
        </p>
      </div>
    </section>

    <section id="introduction" class="draft-section" aria-labelledby="hosts-form-title">
      <div class="container draft-section__inner">
        <div class="draft__paper">
          <div class="draft__intro">
            <div>
              <h2 id="hosts-form-title" class="draft__title">Introduction form</h2>
              <p class="draft-help">Fill in the form and download your introduction as a text file.</p>
            </div>
          </div>

          <form @submit.prevent="onSubmit">
            <div class="draft-step">
              <fieldset class="draft-field draft-field--full draft-choices">
                <legend>How would you like to contribute? <span aria-hidden="true">*</span></legend>
                <label v-for="(role, i) in contributions" :key="role" class="draft-choice">
                  <input type="radio" name="role" :value="role" :required="i === 0">
                  <span>{{ role }}</span>
                </label>
              </fieldset>

              <div class="draft-field draft-field--c1">
                <label class="draft-label" for="intro-name">Name or preferred name <span aria-hidden="true">*</span></label>
                <input id="intro-name" class="draft-input" name="name" type="text" autocomplete="name" maxlength="100" required>
              </div>
              <div class="draft-field draft-field--c1">
                <label class="draft-label" for="intro-email">Contact email <span class="draft-optional">Optional</span></label>
                <input id="intro-email" class="draft-input" name="email" type="email" autocomplete="email" maxlength="200">
              </div>
              <div class="draft-field draft-field--c2 draft-field--rows2">
                <label class="draft-label" for="intro-idea">What would you like to explore or offer? <span aria-hidden="true">*</span></label>
                <textarea id="intro-idea" class="draft-input" name="idea" maxlength="3000" required placeholder="One question, project or practical offer is enough."></textarea>
              </div>
              <div class="draft-field draft-field--c1">
                <label class="draft-label" for="intro-example">Something you have tried, made or helped with</label>
                <textarea id="intro-example" class="draft-input" name="example" maxlength="3000"></textarea>
              </div>
              <div class="draft-field draft-field--c2">
                <label class="draft-label" for="intro-time">Your connection to Jasper and availability</label>
                <textarea id="intro-time" class="draft-input" name="availability" maxlength="1500" placeholder="General availability only. No home address or travel details."></textarea>
              </div>

              <label class="draft-check">
                <input type="checkbox" name="adult" required>
                <span>I am 18 or over and understand this is a draft, not enrolment, a funding commitment or a director appointment.</span>
              </label>
            </div>

            <div class="draft__controls">
              <p class="hosts-submit-note">
                <strong>Email submission isn’t open yet.</strong> Download your draft and keep it until we open an
                official channel.
              </p>
              <button class="cta cta--primary" type="submit">
                Download my introduction <span aria-hidden="true">↓</span>
              </button>
            </div>
            <p class="draft__message" role="status">{{ status }}</p>
          </form>
        </div>

        <p class="draft__fineprint">
          Required fields are marked *. Leave out addresses, health information and identity documents. Questions:
          <a href="mailto:vincent@ujasper.ca?subject=University%20of%20Jasper%20host%20inquiry">vincent@ujasper.ca</a>
        </p>
      </div>
    </section>

    <figure class="pw-band hosts-band">
      <ResponsiveImage name="letter-peaks" alt="Mountain peaks in the Canadian Rockies" />
    </figure>

    <section class="pw-section" aria-labelledby="who-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">Who we are looking for</p>
          <h2 id="who-title" class="pw-h2">Who are we looking for?</h2>
          <p class="pw-text">
            Two questions matter: whether you can take part, and what you could bring to the first gathering.
          </p>
        </div>

        <div class="hosts-block">
          <h3 class="hosts-block__title">Who can take part?</h3>
          <ul class="pw-columns pw-columns--4">
            <li v-for="item in requirements" :key="item.title">
              <span class="hosts-check" aria-hidden="true">✓</span>
              <h4 class="pw-item-title">{{ item.title }}</h4>
              <p class="pw-text">{{ item.text }}</p>
            </li>
          </ul>
          <p class="pw-note hosts-block__note">
            No degree, transcript, test score, polished portfolio or athletic benchmark is required.
          </p>
        </div>

        <div class="hosts-block">
          <h3 class="hosts-block__title">What could you bring?</h3>
          <ol class="pw-rows">
            <li v-for="(role, i) in roles" :key="role.title">
              <span class="pw-num">{{ pad(i + 1) }}</span>
              <h4 class="pw-item-title">{{ role.title }}</h4>
              <p class="pw-text">{{ role.text }}</p>
            </li>
          </ol>
          <p class="pw-note hosts-block__note">
            All roles and partnerships are currently unfilled or unconfirmed. An offer of help is not a staff appointment
            or an endorsement, and no venue, partnership, funding commitment or director appointment is created by an
            introduction.
          </p>
        </div>
      </div>
    </section>

    <section class="pw-section pw-section--mist" aria-labelledby="next-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">After your introduction</p>
          <h2 id="next-title" class="pw-h2">What happens next?</h2>
          <p class="pw-text">
            Three steps, in order. Nothing is decided until the real arrangements are in front of you.
          </p>
        </div>

        <ol class="hosts-flow">
          <li v-for="(step, i) in process" :key="step.title">
            <span class="hosts-flow__marker" aria-hidden="true">{{ pad(i + 1) }}</span>
            <h3 class="pw-item-title">{{ step.title }}</h3>
            <p class="pw-text">{{ step.text }}</p>
          </li>
          <li class="hosts-flow__end">
            <span class="hosts-flow__marker hosts-flow__marker--end" aria-hidden="true">✓</span>
            <h3 class="pw-item-title">You decide</h3>
            <p class="pw-text">Take part only once the venue, dates, people and costs are confirmed and clear to you.</p>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hosts-submit-note {
  max-width: 34rem;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--color-muted);
}

.hosts-submit-note strong {
  color: var(--color-ink);
}

.hosts-band img {
  object-position: center 55%;
}

.pw h4 {
  margin: 0;
}

.hosts-block + .hosts-block {
  margin-top: var(--space-8);
}

.hosts-block__title {
  margin-bottom: var(--space-5);
  font-size: 1.5rem;
}

.hosts-block__note {
  margin-top: var(--space-5);
}

.hosts-check {
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid var(--color-cobalt);
  border-radius: 50%;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-cobalt);
}

/* Process flowchart: numbered markers joined by a rule, ending in the learner's decision. */
.hosts-flow {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-6);
}

.hosts-flow > li {
  position: relative;
  display: grid;
  align-content: start;
  gap: var(--space-3);
}

.hosts-flow > li:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 1.25rem;
  left: 3rem;
  width: calc(100% - 3rem + var(--space-6) - 0.5rem);
  height: 1px;
  background: var(--color-line);
}

.hosts-flow > li:not(:last-child)::before {
  content: '';
  position: absolute;
  top: calc(1.25rem - 4px);
  right: calc(-1 * var(--space-6) + 0.5rem);
  width: 9px;
  height: 9px;
  border-top: 1px solid var(--color-line);
  border-right: 1px solid var(--color-line);
  transform: rotate(45deg);
}

.hosts-flow__marker {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--color-cobalt);
  border-radius: 50%;
  background: var(--color-paper);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  color: var(--color-cobalt);
}

.hosts-flow__marker--end {
  background: var(--color-cobalt);
  color: var(--color-on-dark);
  font-size: 0.875rem;
}

.hosts-flow .pw-text {
  max-width: none;
}

@media (max-width: 900px) {
  .hosts-flow {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .hosts-flow > li {
    grid-template-columns: 2.5rem minmax(0, 1fr);
    column-gap: var(--space-4);
    padding-bottom: var(--space-6);
  }

  .hosts-flow__marker {
    grid-row: 1 / span 2;
  }

  .hosts-flow .pw-item-title,
  .hosts-flow .pw-text {
    grid-column: 2;
  }

  .hosts-flow > li:not(:last-child)::after {
    top: 2.75rem;
    left: 1.25rem;
    width: 1px;
    height: calc(100% - 3rem);
  }

  .hosts-flow > li:not(:last-child)::before {
    display: none;
  }
}

@media (max-width: 760px) {
  .draft__controls {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
