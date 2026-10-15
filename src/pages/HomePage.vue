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

const work = [
  {
    title: 'Train with purpose',
    image: 'cards/train',
    details: [
      'Hiking, campcraft, progressive physical practice, coached martial restraint and reflective attention. Challenge includes recovery and adaptation.',
    ],
  },
  {
    title: 'Read beyond yourself',
    image: 'cards/read',
    details: [
      'Meet primary texts across civilizations. Reconstruct an argument, face a serious objection and revise your own position.',
    ],
  },
  {
    title: 'Make an explanation earn trust',
    image: 'cards/experiment',
    details: [
      'Observe, calculate, model and test. Keep the raw evidence, account for uncertainty and create something another person can use.',
    ],
  },
]

const inquiries = [
  {
    tab: 'Warmth',
    question: 'What does it take to keep someone warm?',
    intro:
      'Jasper’s mountain conditions make warmth a question about physical preparation, heat transfer and shared responsibility.',
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
    intro:
      'Medicine Lake opens a question about hidden systems, chemical evidence and the limits of what we can know.',
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
    intro:
      'A difficult text, an uncertain measurement and a real responsibility test the same capacity: judgment.',
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

const routes = [
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

const activeInquiry = ref(0)
const tabButtons = ref<(HTMLButtonElement | null)[]>([])

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
          <AppLink class="cta home-hero__ghost" to="/learning">
            See the learning in action <span class="cta__arrow" aria-hidden="true">→</span>
          </AppLink>
        </div>
        <p class="home-hero__motto">A founding project · Admissions not open</p>
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

  <section class="home-intro" aria-labelledby="intro-title">
    <div class="container">
      <div class="home-intro__head">
        <p class="label">The Jasper education</p>
        <h2 id="intro-title" class="display">Capability. Judgment.<br><em>Something worth contributing.</em></h2>
      </div>
      <div class="home-intro__grid">
        <div class="home-intro__lead">
          <p class="home-text">
            As technology extends our reach, education must deepen our capacity to understand, act and take
            responsibility.
          </p>
          <AppLink class="cta cta--primary" to="/vision">
            Read the vision and mission <span class="cta__arrow" aria-hidden="true">→</span>
          </AppLink>
        </div>
        <ul class="home-work">
          <li v-for="item in work" :key="item.title" class="home-card home-work__card">
            <div class="home-work__media">
              <ResponsiveImage :name="item.image" sizes="(max-width: 760px) 100vw, (max-width: 1100px) 33vw, 16rem" />
            </div>
            <div class="home-work__body">
              <h3 class="sec-label">{{ item.title }}</h3>
              <p v-for="detail in item.details" :key="detail">{{ detail }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section class="home-inquiry" aria-labelledby="inquiry-title">
    <div class="container">
      <div class="sec-head">
        <div>
          <p class="label">One question across the courses</p>
          <h2 id="inquiry-title" class="display">A whole education,<br><em>through a real question.</em></h2>
        </div>
      </div>
      <div class="home-inquiry__tabs" role="tablist" aria-label="inquiry">
        <button
          v-for="(inquiry, i) in inquiries"
          :id="`inquiry-tab-${i}`"
          :key="inquiry.tab"
          :ref="el => { tabButtons[i] = el as HTMLButtonElement | null }"
          type="button"
          class="home-inquiry__tab"
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
        class="home-inquiry__panel"
        role="tabpanel"
        :aria-labelledby="`inquiry-tab-${i}`"
        tabindex="0"
        :hidden="activeInquiry !== i"
      >
        <div class="home-inquiry__question">
          <p class="sec-label">The question</p>
          <h3 class="home-inquiry__heading">{{ inquiry.question }}</h3>
          <p class="home-text">{{ inquiry.intro }}</p>
        </div>
        <dl class="home-inquiry__rows">
          <div v-for="row in inquiry.rows" :key="row.term" class="home-inquiry__row">
            <dt>{{ row.term }}</dt>
            <dd>{{ row.text }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>

  <section class="home-place" aria-labelledby="place-title">
    <div class="container home-place__grid">
      <div class="home-place__figure home-place__example">
        <p class="sec-label">An educator-created example</p>
        <h3 class="home-place__example-title">Warmer does not yet<br>mean proven.</h3>
        <p class="home-text">Sample A: 40 → 28 °C</p>
        <p class="home-text">Sample B: 40 → 33.5 °C</p>
        <p class="home-text">Same 20 minutes. One run each. What can these numbers establish?</p>
        <p class="home-place__steps">Prediction → evidence → objection → revision</p>
      </div>
      <div class="home-place__body">
        <p class="label">The standard becomes visible</p>
        <h2 id="place-title" class="home-place__title">Look at the work.<br><em>Question the conclusion.</em></h2>
        <p class="home-text">
          Follow a cooling experiment from a tempting claim to a defensible conclusion. The example shows the reasoning
          we want learners to develop; its data are explicitly synthetic.
        </p>
        <AppLink class="cta cta--primary" to="/learning">
          Enter the learning example <span class="cta__arrow" aria-hidden="true">→</span>
        </AppLink>
      </div>
    </div>
  </section>

  <section class="home-participate" aria-labelledby="participate-title">
    <div class="container">
      <div class="sec-head">
        <div>
          <p class="label">The founding community</p>
          <h2 id="participate-title" class="display">A school begins<br><em>with people.</em></h2>
        </div>
        <p>
          There are meaningful roles before there is a campus. Start with the work you can offer or the question you want
          to pursue.
        </p>
      </div>
      <ul class="home-routes">
        <li v-for="route in routes" :key="route.to">
          <AppLink class="home-routes__card" :to="route.to">
            <span class="home-routes__title">{{ route.title }}</span>
            <span class="home-routes__text">{{ route.text }}</span>
            <span class="home-routes__arrow" aria-hidden="true">→</span>
          </AppLink>
        </li>
      </ul>
    </div>
  </section>

  <section class="home-letter" aria-label="From the founding letter">
    <ResponsiveImage class="home-letter__image" name="letter-peaks" />
    <div class="home-letter__shade" aria-hidden="true"></div>
    <div class="container home-letter__grid">
      <div class="home-letter__crest">
        <ResponsiveImage name="founding-crest" alt="University of Jasper crest" sizes="(max-width: 760px) 12rem, 20rem" />
      </div>
      <figure class="home-letter__quote">
        <p class="home-letter__label">The founding letter</p>
        <blockquote>We human beings have our special responsibilities to make our society and world better.</blockquote>
        <figcaption>
          <span class="home-letter__source">Vincent Zhang · Original welcome, identified by the founder as written in 2015.</span>
        </figcaption>
        <AppLink class="cta cta--light" to="/letter">
          Read the letter and hear the song <span class="cta__arrow" aria-hidden="true">→</span>
        </AppLink>
      </figure>
    </div>
  </section>

  <section class="home-beginning" aria-labelledby="beginning-title">
    <div class="container">
      <div class="home-intro__head">
        <p class="label">A clear beginning</p>
        <h2 id="beginning-title" class="display">The ambition is large.<br><em>The next step is specific.</em></h2>
        <p class="home-text">
          Establish a capable local host and teaching team, cost the first in-person event, and confirm the arrangements
          required to deliver it. A six-week cohort follows only when its own conditions are met.
        </p>
        <AppLink class="link" to="/founding">
          Explore the founding progress <span aria-hidden="true">→</span>
        </AppLink>
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

h3 {
  font-family: var(--font-sans);
  letter-spacing: normal;
}

section,
.home-facts {
  font-family: var(--font-sans);
  font-variant-numeric: lining-nums;
  font-size: var(--text-body);
  font-weight: 300;
  line-height: 1.625;
}

strong,
dt,
h3 {
  font-weight: 500;
}

.display em {
  font-style: italic;
  color: var(--color-cobalt);
}

.home-intro__head .label {
  margin-bottom: var(--space-3);
}

.home-intro__head .home-text {
  margin-top: var(--space-5);
}

.home-intro__head .link {
  margin-top: var(--space-5);
}

.home-card {
  background: var(--color-paper);
  box-shadow: var(--shadow-card);
  transition: box-shadow 300ms var(--ease);
}

.home-card:hover {
  box-shadow: var(--shadow-card-hover);
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

.home-hero__motto {
  margin-top: var(--space-7);
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-style: italic;
  color: rgba(243, 244, 246, 0.9);
}

@keyframes hero-fade {
  from {
    opacity: 0;
  }
}

/* ---------- Facts strip (thin-rule list, same language as home-routes) ---------- */
.home-facts {
  padding-block: var(--space-7);
  background: var(--color-paper);
  color: var(--color-ink);
}

.home-facts__list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--color-ink);
}

.home-facts__list li {
  display: grid;
  align-content: start;
  gap: var(--space-1);
  padding: var(--space-5) var(--space-5) 0 0;
}

.home-facts__list li + li {
  padding-left: var(--space-5);
  border-left: 1px solid var(--color-line);
}

.home-facts__list strong {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.2;
}

.home-facts__list span {
  font-size: 0.875rem;
  color: var(--color-muted);
}

/* ---------- Intro: The Jasper education ---------- */
.home-intro {
  padding-block: clamp(5rem, 7vw, 7rem);
  background: var(--color-cloud);
}

.home-intro__head {
  max-width: 48rem;
  margin-bottom: var(--space-8);
}

.home-intro__grid {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  align-items: start;
  gap: var(--space-8);
}

.home-intro__lead {
  position: sticky;
  top: calc(var(--header-height) + var(--space-6));
  display: grid;
  justify-items: start;
  gap: var(--space-5);
}

.home-text {
  font-size: 1rem;
  line-height: 1.625;
  color: var(--color-muted);
}

.home-intro__lead .cta {
  margin-top: var(--space-3);
}

.home-work {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-6);
}

.home-work__card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.home-work__media {
  height: 12rem;
  overflow: hidden;
  background: #e5e7eb;
}

.home-work__media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms var(--ease);
}

.home-work__card:hover .home-work__media img {
  transform: scale(1.05);
}

.home-work__body {
  display: grid;
  flex: 1;
  align-content: start;
  gap: var(--space-2);
  padding: var(--space-5);
}

.home-work__body p {
  font-size: 0.875rem;
  line-height: 1.625;
  color: var(--color-muted);
}

/* ---------- Inquiry tabs (sec-head + thin rules) ---------- */
.home-inquiry {
  padding-block: var(--space-section);
  background: var(--color-paper);
}

.home-inquiry__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0 var(--space-6);
  margin-bottom: var(--space-7);
  border-bottom: 1px solid var(--color-line);
}

.home-inquiry__tab {
  margin-bottom: -1px;
  padding: var(--space-3) 0;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.2;
  color: var(--color-muted);
  cursor: pointer;
  transition:
    color var(--duration) var(--ease),
    border-color var(--duration) var(--ease);
}

.home-inquiry__tab:hover {
  color: var(--color-ink);
}

.home-inquiry__tab[aria-selected='true'] {
  border-bottom-color: var(--color-cobalt);
  color: var(--color-ink);
}

.home-inquiry__tab:focus-visible,
.home-inquiry__panel:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

.home-inquiry__panel {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: var(--space-8);
  align-items: start;
}

.home-inquiry__panel[hidden] {
  display: none;
}

.home-inquiry__question {
  display: grid;
  gap: var(--space-4);
}

.home-inquiry__heading {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.25;
}

.home-inquiry__rows {
  display: grid;
  border-top: 1px solid var(--color-ink);
}

.home-inquiry__row {
  display: grid;
  grid-template-columns: minmax(7rem, 10rem) minmax(0, 1fr);
  gap: var(--space-4);
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--color-line);
}

.home-inquiry__row dt {
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.home-inquiry__row dd {
  color: var(--color-muted);
}

/* ---------- Place → The standard becomes visible ---------- */
.home-place {
  padding-block: var(--space-section);
  background: var(--color-cloud);
}

.home-place__grid {
  display: grid;
  grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
  align-items: center;
  gap: var(--space-8);
}

.home-place__example {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-6);
  border-top: 1px solid var(--color-ink);
  background: var(--color-paper);
}

.home-place__example-title {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.home-place__steps {
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-line);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-muted);
}

.home-place__body {
  display: grid;
  justify-items: start;
  gap: var(--space-5);
}

.home-place__body .label {
  margin-bottom: 0;
  color: var(--color-muted);
}

.home-place__title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.home-place__title em {
  color: var(--color-cobalt);
}

/* ---------- Participate ---------- */
.home-participate {
  padding-block: var(--space-section);
  background: var(--color-paper);
}

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
  line-height: 1.2;
  transition: color var(--duration) var(--ease);
}

.home-routes__text {
  font-size: 0.875rem;
  line-height: 1.625;
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

/* ---------- Founding letter (closing band) ---------- */
.home-letter {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-block: clamp(6rem, 10vw, 8rem);
  background: var(--color-navy-deep);
  color: var(--color-on-dark);
}

.home-letter__image {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-letter__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(to top, rgba(11, 27, 42, 0.95), rgba(14, 36, 57, 0.8));
}

.home-letter__grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  align-items: center;
  gap: clamp(3rem, 5vw, 4rem);
  max-width: 72rem;
}

.home-letter__crest {
  position: relative;
  justify-self: start;
  width: min(100%, 20rem);
}

.home-letter__crest::before {
  content: '';
  position: absolute;
  inset: -0.5rem;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(4px);
}

.home-letter__crest img {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.home-letter__quote {
  display: grid;
  justify-items: start;
}

.home-letter__label {
  margin-bottom: var(--space-5);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: rgba(243, 244, 246, 0.75);
}

.home-letter__quote blockquote {
  margin-bottom: var(--space-6);
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.625;
  color: #f3f4f6;
}

.home-letter__quote figcaption {
  display: grid;
  gap: 0.25rem;
}

.home-letter__source {
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #9ca3af;
}

.home-letter .cta {
  margin-top: var(--space-7);
}

/* ---------- A clear beginning ---------- */
.home-beginning {
  padding-block: var(--space-section);
  background: var(--color-cloud);
}

.home-beginning .home-intro__head {
  margin-bottom: 0;
}

/* ---------- Tablet ---------- */
@media (max-width: 1100px) {
  .home-intro__grid,
  .home-inquiry__panel {
    grid-template-columns: 1fr;
  }

  .home-intro__lead {
    position: static;
    grid-template-columns: 1fr;
    max-width: 44rem;
  }

  .home-facts__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-facts__list li:nth-child(odd) {
    border-left: 0;
    padding-left: 0;
  }

  .home-facts__list li:nth-child(n + 3) {
    border-top: 1px solid var(--color-line);
    padding-top: var(--space-5);
  }

  .home-routes {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-routes > li:nth-child(odd) {
    border-left: 0;
  }

  .home-routes > li:nth-child(odd) .home-routes__card {
    padding-left: 0;
  }

  .home-routes > li:nth-child(n + 3) {
    border-top: 1px solid var(--color-line);
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

  .home-place__grid,
  .home-letter__grid {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }

  .home-work,
  .home-routes,
  .home-facts__list {
    grid-template-columns: 1fr;
  }

  .home-facts__list li,
  .home-facts__list li + li,
  .home-facts__list li:nth-child(n + 3) {
    padding-left: 0;
    border-left: 0;
    border-top: 1px solid var(--color-line);
    padding-top: var(--space-4);
  }

  .home-facts__list li:first-child {
    border-top: 0;
    padding-top: var(--space-5);
  }

  .home-routes > li + li {
    border-left: 0;
    border-top: 1px solid var(--color-line);
  }

  .home-routes > li + li .home-routes__card {
    padding-left: 0;
  }

  .home-routes__card {
    flex-direction: column;
    align-items: flex-start;
    padding-right: 0;
  }

  .home-routes__arrow {
    margin-left: 0;
    padding-top: var(--space-2);
  }

  .home-work__media {
    height: 12rem;
  }

  .home-inquiry__row {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }

  .home-letter__grid {
    gap: var(--space-7);
  }

  .home-letter__crest {
    justify-self: center;
    width: 12rem;
  }

  .home-letter__quote {
    justify-items: center;
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero__image {
    animation: none;
  }

  .home-card,
  .home-work__media img {
    transition: none;
  }
}
</style>
