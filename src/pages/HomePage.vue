<script setup lang="ts">
import { ref } from 'vue'
import AppLink from '../components/AppLink.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'

const facts = [
  { value: '6 weeks', detail: 'in person in Jasper' },
  { value: '6–8 learners', detail: 'adults aged 18 and over' },
  { value: '144 + 24 h', detail: 'facilitated + independent study' },
  { value: 'One community', detail: 'many cultures and perspectives' },
]

const capabilities = [
  {
    title: 'Train with purpose',
    image: 'cards/train',
    text: 'Hiking, campcraft, progressive physical practice, coached martial restraint and reflective attention. Challenge includes recovery and adaptation.',
  },
  {
    title: 'Read beyond yourself',
    image: 'cards/read',
    text: 'Meet primary texts across civilizations. Reconstruct an argument, face a serious objection and revise your own position.',
  },
  {
    title: 'Make an explanation earn trust',
    image: 'cards/experiment',
    text: 'Observe, calculate, model and test. Keep the raw evidence, account for uncertainty and create something another person can use.',
  },
]

const inquiries = [
  {
    tab: 'Warmth',
    question: 'What does it take to keep someone warm?',
    intro: 'Jasper’s mountain conditions make warmth a question about physical preparation, heat transfer and shared responsibility.',
    rows: [
      {
        term: 'Experience',
        text: 'Build a coached strength practice and explain the layers and shelter for an approved outing. Test materials indoors, with the person’s wellbeing protected.',
      },
      {
        term: 'Test',
        text: 'Compare cooling curves, repeat measurements and use a heat-transfer model. Explain what the experiment can and cannot say about clothing outdoors.',
      },
      {
        term: 'Question',
        text: 'Read arguments about habit, attention and care. Defend a distinction between productive effort and avoidable harm.',
      },
      {
        term: 'Contribute',
        text: 'Create a tested preparation resource for a consenting user. Show the evidence behind each recommendation and revise what the user misunderstands.',
      },
      {
        term: 'Evidence you can inspect',
        text: 'A graph, a reasoned argument, a tested guide and a decision you changed.',
      },
    ],
  },
  {
    tab: 'Water',
    question: 'Where does the water go?',
    intro: 'Medicine Lake opens a question about hidden systems, chemical evidence and the limits of what we can know.',
    rows: [
      {
        term: 'Experience',
        text: 'Observe an approved setting, practise precise field notes and contribute to a shared camp. Explain what your observations leave unseen.',
      },
      {
        term: 'Test',
        text: 'Build a water-balance model, analyse published Miette mineral data and identify missing measurements. Separate sourced evidence from a teaching scenario.',
      },
      {
        term: 'Question',
        text: 'Ask who has the authority to describe a place and govern its use. Read primary arguments about knowledge, action and shared resources.',
      },
      {
        term: 'Contribute',
        text: 'Produce an annotated water-system model for a consenting reader. Make the uncertainty understandable rather than hiding it.',
      },
      {
        term: 'Evidence you can inspect',
        text: 'A water budget, a chemical calculation, a cited argument and an independently defended revision.',
      },
    ],
  },
  {
    tab: 'Judgment',
    question: 'What would change your mind?',
    intro: 'A difficult text, an uncertain measurement and a real responsibility test the same capacity: judgment.',
    rows: [
      {
        term: 'Experience',
        text: 'Take a bounded leadership role and demonstrate coached progression. Explain a decision to continue, adapt or stop.',
      },
      {
        term: 'Test',
        text: 'Compare competing explanations of glacier change or ecological recovery. Preserve the evidence that challenges your first account.',
      },
      {
        term: 'Question',
        text: 'Write, defend and revise an argument in a weekly two-person tutorial. Treat Wang Yangming, Hume and other thinkers as interlocutors, never compulsory beliefs.',
      },
      {
        term: 'Contribute',
        text: 'Complete useful work for a consenting peer or confirmed host. Defend your contribution; optionally audit AI against the preserved work after the semester.',
      },
      {
        term: 'Evidence you can inspect',
        text: 'A claim audit, a passage-based argument, an explicit revision and an individual oral defence.',
      },
    ],
  },
]

const roles = [
  {
    title: 'Bring a question',
    text: 'Explore the Field Semester and prepare a thoughtful introduction.',
    to: '/join/students',
  },
  {
    title: 'Teach something that matters',
    text: 'Help a learner see, test and explain what they could not before.',
    to: '/join/teachers',
  },
  {
    title: 'Make a place for learning',
    text: 'Offer a local connection, a session, resources or a useful task.',
    to: '/join/hosts',
  },
  {
    title: 'Help establish the first chapter',
    text: 'Start with people, a defined milestone and evidence.',
    to: '/support',
  },
]

const pad = (n: number) => String(n).padStart(2, '0')

const activeInquiry = ref(0)
const tabButtons = ref<HTMLButtonElement[]>([])

function selectInquiry(index: number, focus = false) {
  activeInquiry.value = index
  if (focus) tabButtons.value[index]?.focus()
}

function onTabKeydown(event: KeyboardEvent, index: number) {
  const count = inquiries.length
  let next: number | undefined
  if (event.key === 'ArrowRight') next = (index + 1) % count
  else if (event.key === 'ArrowLeft') next = (index + count - 1) % count
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = count - 1
  if (next === undefined) return
  event.preventDefault()
  selectInquiry(next, true)
}
</script>

<template>
  <section class="home-hero" aria-labelledby="hero-title">
    <ResponsiveImage
      class="home-hero__image"
      name="field/hero"
      alt="Snow-capped peaks above a forested valley in the Canadian Rockies"
      priority
    />
    <div class="home-hero__shade" aria-hidden="true"></div>
    <div class="container home-hero__content">
      <div class="home-hero__copy">
        <p class="home-hero__place">Jasper, Alberta · Canada</p>
        <h1 id="hero-title" class="home-hero__title">Strong in body.<br><em>Free in mind.</em></h1>
        <p class="home-hero__summary">
          A university begins with a way of learning. Ours brings physical practice, world humanities and scientific
          inquiry into one education.
        </p>
        <p class="home-hero__summary">
          The first proposed chapter: six weeks in person in Jasper, learning through paper, people and direct
          experience.
        </p>
        <div class="home-hero__actions">
          <AppLink class="cta cta--light" to="/program">
            Explore the Field Semester <span class="cta__arrow" aria-hidden="true">→</span>
          </AppLink>
          <AppLink class="cta home-hero__ghost" to="/learning">See the learning in action</AppLink>
        </div>
        <p class="home-hero__note">A founding project · Admissions not open</p>
      </div>
    </div>
  </section>

  <div class="home-facts">
    <ul class="container home-facts__list" aria-label="The Field Semester at a glance">
      <li v-for="fact in facts" :key="fact.value">
        <strong>{{ fact.value }}</strong>
        <span>{{ fact.detail }}</span>
      </li>
    </ul>
  </div>

  <section class="hp-section hp-section--cloud" aria-labelledby="education-title">
    <div class="container">
      <div class="hp-head">
        <p class="hp-label">The Jasper education</p>
        <h2 id="education-title" class="hp-title">Capability. Judgment.<br><em>Something worth contributing.</em></h2>
        <p class="hp-lead">
          As technology extends our reach, education must deepen our capacity to understand, act and take
          responsibility.
        </p>
      </div>
      <ol class="hp-capabilities">
        <li v-for="(item, i) in capabilities" :key="item.title" class="hp-capability">
          <div class="hp-capability__media">
            <ResponsiveImage :name="item.image" sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 24rem" />
          </div>
          <span class="hp-capability__index">{{ pad(i + 1) }}</span>
          <h3 class="hp-item-title">{{ item.title }}</h3>
          <p class="hp-text">{{ item.text }}</p>
        </li>
      </ol>
      <p class="hp-after">
        <AppLink class="link" to="/vision">Read the vision and mission <span aria-hidden="true">→</span></AppLink>
      </p>
    </div>
  </section>

  <section class="hp-section" aria-labelledby="inquiry-title">
    <div class="container">
      <div class="hp-head">
        <p class="hp-label">One question across the courses</p>
        <h2 id="inquiry-title" class="hp-title">A whole education,<br><em>through a real question.</em></h2>
      </div>
      <div class="hp-tabs" role="tablist" aria-labelledby="inquiry-title">
        <button
          v-for="(inquiry, i) in inquiries"
          :id="`inquiry-tab-${i}`"
          :key="inquiry.tab"
          :ref="el => { if (el) tabButtons[i] = el as HTMLButtonElement }"
          type="button"
          class="hp-tab"
          role="tab"
          :aria-controls="`inquiry-panel-${i}`"
          :aria-selected="activeInquiry === i ? 'true' : 'false'"
          :tabindex="activeInquiry === i ? 0 : -1"
          @click="selectInquiry(i)"
          @keydown="onTabKeydown($event, i)"
        >
          {{ inquiry.tab }}
        </button>
      </div>
      <div
        v-for="(inquiry, i) in inquiries"
        :id="`inquiry-panel-${i}`"
        :key="inquiry.tab"
        class="hp-panel"
        role="tabpanel"
        :aria-labelledby="`inquiry-tab-${i}`"
        tabindex="0"
        :hidden="activeInquiry !== i"
      >
        <div class="hp-panel__question">
          <p class="hp-label hp-label--small">The question</p>
          <h3 class="hp-panel__title">{{ inquiry.question }}</h3>
          <p class="hp-text">{{ inquiry.intro }}</p>
        </div>
        <dl class="hp-panel__rows">
          <div v-for="row in inquiry.rows" :key="row.term" class="hp-panel__row">
            <dt>{{ row.term }}</dt>
            <dd>{{ row.text }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>

  <section class="hp-section hp-section--cloud" aria-labelledby="standard-title">
    <div class="container">
      <div class="hp-head">
        <p class="hp-label">The standard becomes visible</p>
        <h2 id="standard-title" class="hp-title">Look at the work.<br><em>Question the conclusion.</em></h2>
        <p class="hp-lead">
          Follow a cooling experiment from a tempting claim to a defensible conclusion. The example shows the reasoning
          we want learners to develop; its data are explicitly synthetic.
        </p>
        <AppLink class="cta cta--primary" to="/learning">
          Enter the learning example <span class="cta__arrow" aria-hidden="true">→</span>
        </AppLink>
      </div>
      <div class="hp-example">
        <div class="hp-example__claim">
          <p class="hp-label hp-label--small">An educator-created example</p>
          <h3 class="hp-example__title">Warmer does not yet<br>mean proven.</h3>
        </div>
        <ul class="hp-example__samples">
          <li>
            <p><span class="hp-example__name">Sample A:</span> <strong>40 → 28 °C</strong></p>
          </li>
          <li>
            <p><span class="hp-example__name">Sample B:</span> <strong>40 → 33.5 °C</strong></p>
          </li>
        </ul>
        <div class="hp-example__question">
          <p class="hp-text">Same 20 minutes. One run each. What can these numbers establish?</p>
          <p class="hp-example__steps">Prediction → evidence → objection → revision</p>
        </div>
      </div>
    </div>
  </section>

  <section class="hp-section" aria-labelledby="community-title">
    <div class="container">
      <div class="hp-head">
        <p class="hp-label">The founding community</p>
        <h2 id="community-title" class="hp-title">A school begins<br><em>with people.</em></h2>
        <p class="hp-lead">
          There are meaningful roles before there is a campus. Start with the work you can offer or the question you
          want to pursue.
        </p>
      </div>
      <ul class="home-routes">
        <li v-for="role in roles" :key="role.to">
          <AppLink class="home-routes__card" :to="role.to">
            <h3 class="home-routes__title">{{ role.title }}</h3>
            <p class="home-routes__text">{{ role.text }}</p>
            <span class="home-routes__arrow" aria-hidden="true">→</span>
          </AppLink>
        </li>
      </ul>
    </div>
  </section>

  <section class="hp-section hp-section--cloud" aria-labelledby="letter-label">
    <div class="container">
      <div class="hp-letter">
        <div class="hp-letter__crest">
          <ResponsiveImage name="founding-crest" alt="University of Jasper crest" sizes="6rem" />
        </div>
        <p id="letter-label" class="hp-label">The founding letter</p>
        <blockquote class="hp-letter__quote">
          We human beings have our special responsibilities to make our society and world better.
        </blockquote>
        <p class="hp-letter__origin">
          Vincent Zhang · Original welcome, identified by the founder as written in 2015.
        </p>
        <AppLink class="cta cta--outline" to="/letter">Read the letter and hear the song</AppLink>
      </div>
    </div>
  </section>

  <section class="hp-section" aria-labelledby="beginning-title">
    <div class="container">
      <div class="hp-head hp-head--last">
        <p class="hp-label">A clear beginning</p>
        <h2 id="beginning-title" class="hp-title">The ambition is large.<br><em>The next step is specific.</em></h2>
        <p class="hp-lead">
          Establish a capable local host and teaching team, cost the first in-person event, and confirm the arrangements
          required to deliver it. A six-week cohort follows only when its own conditions are met.
        </p>
        <AppLink class="link" to="/founding">Explore the founding progress <span aria-hidden="true">→</span></AppLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---------- Shared ---------- */
h2,
h3,
p,
dl,
dd,
ol,
ul,
figure,
blockquote {
  margin: 0;
}

ol,
ul {
  padding: 0;
  list-style: none;
}

section,
.home-facts {
  font-family: var(--font-sans);
  font-variant-numeric: lining-nums;
  font-size: var(--text-body);
  font-weight: 300;
  line-height: 1.625;
}

.hp-section {
  padding-block: var(--space-section);
  background: var(--color-paper);
  color: var(--color-ink);
}

.hp-section--cloud {
  background: var(--color-cloud);
}

/* Section head: label, title, description, then content below. */
.hp-head {
  display: grid;
  justify-items: start;
  gap: var(--space-5);
  max-width: 48rem;
  margin-bottom: var(--space-7);
}

.hp-head--last {
  margin-bottom: 0;
}

.hp-head .cta {
  margin-top: var(--space-2);
}

.hp-label {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.hp-label--small {
  font-size: var(--text-label);
}

.hp-title {
  font-family: var(--font-serif);
  font-size: var(--text-display);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.hp-title em {
  font-style: italic;
  color: var(--color-cobalt);
}

.hp-lead,
.hp-text {
  max-width: 40rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--color-muted);
}

.hp-item-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.25;
}

.hp-after {
  margin-top: var(--space-7);
}

/* ---------- Hero ---------- */
.home-hero {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: flex-end;
  min-height: min(calc(100svh - 5.5rem), 46rem);
  overflow: hidden;
  background: var(--color-navy-deep);
  color: var(--color-on-dark);
}

.home-hero__image {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 60% 45%;
  animation: hero-fade 1.2s var(--ease) both;
}

.home-hero__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(to bottom, rgba(14, 36, 57, 0.2) 0%, rgba(14, 36, 57, 0.7) 100%),
    linear-gradient(90deg, rgba(11, 27, 42, 0.55) 0%, rgba(11, 27, 42, 0) 60%);
}

.home-hero__content {
  padding-block: var(--space-9) var(--space-8);
}

.home-hero__copy {
  max-width: 42rem;
}

.home-hero__place {
  margin-bottom: var(--space-4);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.home-hero__title {
  margin: 0 0 var(--space-6);
  font-family: var(--font-serif);
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.home-hero__title em {
  color: var(--color-ice);
}

.home-hero__summary {
  max-width: 36rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: #e5e7eb;
}

.home-hero__summary + .home-hero__summary {
  margin-top: var(--space-4);
}

@media (min-width: 640px) {
  .home-hero__summary {
    font-size: 1.125rem;
  }
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: var(--space-6);
}

.home-hero__ghost {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  color: #fff;
}

.home-hero__ghost:hover {
  background: rgba(255, 255, 255, 0.2);
}

.home-hero__note {
  margin-top: var(--space-6);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: rgba(243, 244, 246, 0.85);
}

@keyframes hero-fade {
  from {
    opacity: 0;
  }
}

/* ---------- Facts strip ---------- */
.home-facts {
  padding-block: var(--space-7);
  background: var(--color-paper);
  color: var(--color-ink);
}

.home-facts__list {
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--color-ink);
}

.home-facts__list li {
  display: grid;
  align-content: start;
  gap: var(--space-1);
  padding: var(--space-5) var(--space-5) 0;
}

.home-facts__list li:first-child {
  padding-left: 0;
}

.home-facts__list li + li {
  border-left: 1px solid var(--color-line);
}

.home-facts__list strong {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.home-facts__list span {
  font-size: var(--text-small);
  color: var(--color-muted);
}

/* ---------- The Jasper education ---------- */
.hp-capabilities {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-7) var(--space-6);
}

.hp-capability {
  display: grid;
  align-content: start;
  gap: var(--space-3);
}

.hp-capability__media {
  aspect-ratio: 4 / 3;
  margin-bottom: var(--space-3);
  overflow: hidden;
  background: #e5e7eb;
}

.hp-capability__media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hp-capability__index {
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-ink);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  color: var(--color-cobalt);
}

/* ---------- One question: tabs ---------- */
.hp-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
  margin-bottom: var(--space-7);
  border-bottom: 1px solid var(--color-line);
}

.hp-tab {
  margin-bottom: -1px;
  padding: var(--space-3) 0;
  border: 0;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  background: none;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.25;
  color: var(--color-muted);
  cursor: pointer;
  transition: color var(--duration) var(--ease), border-color var(--duration) var(--ease);
}

.hp-tab:hover {
  color: var(--color-ink);
}

.hp-tab[aria-selected='true'] {
  border-bottom-color: var(--color-cobalt);
  color: var(--color-ink);
}

.hp-tab:focus-visible,
.hp-panel:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

.hp-panel__question {
  display: grid;
  gap: var(--space-4);
  max-width: 48rem;
  margin-bottom: var(--space-7);
}

.hp-panel__title {
  font-family: var(--font-serif);
  font-size: var(--text-title);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.25;
}

.hp-panel__rows {
  border-top: 1px solid var(--color-ink);
}

.hp-panel__row {
  display: grid;
  grid-template-columns: minmax(0, 14rem) minmax(0, 40rem);
  gap: var(--space-2) var(--space-6);
  padding-block: var(--space-5);
  border-bottom: 1px solid var(--color-line);
}

.hp-panel__row dt {
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.8;
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.hp-panel__row dd {
  font-size: 1rem;
  line-height: 1.625;
  color: var(--color-muted);
}

/* ---------- The standard becomes visible ---------- */
.hp-example {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 4fr) minmax(0, 4fr);
  gap: var(--space-6);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-ink);
}

.hp-example__claim {
  display: grid;
  align-content: start;
  gap: var(--space-4);
}

.hp-example__title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.25;
}

.hp-example__samples {
  display: grid;
  align-content: start;
}

.hp-example__samples li + li {
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-line);
}

.hp-example__samples p {
  display: grid;
  gap: var(--space-1);
}

.hp-example__name {
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-muted);
}

.hp-example__samples strong {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.hp-example__question {
  display: grid;
  align-content: start;
  gap: var(--space-4);
}

.hp-example__steps {
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-cobalt);
}

/* ---------- Founding community: thin-rule route list ---------- */
.home-routes {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--color-ink);
}

.home-routes > li {
  display: flex;
}

.home-routes > li + li {
  border-left: 1px solid var(--color-line);
}

.home-routes__card {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-5) var(--space-5) var(--space-5) 0;
  color: var(--color-ink);
  text-decoration: none;
}

.home-routes > li + li .home-routes__card {
  padding-left: var(--space-5);
}

.home-routes__title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.2;
  transition: color var(--duration) var(--ease);
}

.home-routes__text {
  font-size: var(--text-small);
  line-height: 1.6;
  color: var(--color-muted);
}

.home-routes__arrow {
  margin-top: auto;
  padding-top: var(--space-3);
  color: var(--color-cobalt);
  transition: transform var(--duration) var(--ease);
}

.home-routes__card:hover .home-routes__title {
  color: var(--color-cobalt);
}

.home-routes__card:hover .home-routes__arrow {
  transform: translateX(4px);
}

.home-routes__card:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

/* ---------- Founding letter ---------- */
.hp-letter {
  display: grid;
  justify-items: center;
  gap: var(--space-5);
  max-width: 46rem;
  margin-inline: auto;
  text-align: center;
}

.hp-letter__crest {
  width: 6rem;
}

.hp-letter__crest img {
  display: block;
  width: 100%;
  height: auto;
}

.hp-letter__quote {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-ink);
}

.hp-letter__origin {
  max-width: 40rem;
  font-size: var(--text-small);
  color: var(--color-muted);
}

.hp-letter .cta {
  margin-top: var(--space-3);
}

/* ---------- Tablet ---------- */
@media (max-width: 1100px) {
  .home-facts__list,
  .home-routes {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-facts__list li:nth-child(odd),
  .home-routes > li:nth-child(odd) {
    border-left: 0;
  }

  .home-facts__list li:nth-child(odd),
  .home-routes > li:nth-child(odd) .home-routes__card {
    padding-left: 0;
  }

  .home-facts__list li:nth-child(n + 3) {
    margin-top: var(--space-5);
  }

  .home-routes > li:nth-child(n + 3) {
    border-top: 1px solid var(--color-line);
  }

  .hp-capabilities {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hp-example {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hp-example__question {
    grid-column: 1 / -1;
  }
}

/* ---------- Mobile ---------- */
@media (max-width: 760px) {
  .home-hero {
    min-height: calc(100svh - 7.75rem);
  }

  .home-hero__image {
    object-position: 82% 50%;
  }

  .home-hero__shade {
    background:
      linear-gradient(to bottom, rgba(14, 36, 57, 0.15) 0%, rgba(11, 27, 42, 0.55) 35%, rgba(11, 27, 42, 0.92) 70%);
  }

  .home-hero__content {
    padding-block: var(--space-9) var(--space-5);
  }

  .home-hero__title {
    font-size: clamp(2.75rem, 13vw, 3.75rem);
  }

  .home-hero__actions .cta {
    width: 100%;
    justify-content: center;
  }

  .hp-capabilities,
  .hp-example,
  .home-routes {
    grid-template-columns: 1fr;
  }

  .hp-tabs {
    gap: var(--space-5);
  }

  .hp-tab {
    font-size: 1.25rem;
  }

  .hp-panel__row {
    grid-template-columns: 1fr;
  }

  .home-routes > li + li {
    border-left: 0;
    border-top: 1px solid var(--color-line);
  }

  .home-routes > li + li .home-routes__card {
    padding-left: 0;
  }

  .home-routes__card {
    padding-right: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero__image {
    animation: none;
  }

  .hp-tab,
  .home-routes__title,
  .home-routes__arrow {
    transition: none;
  }
}
</style>
