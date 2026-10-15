<script setup lang="ts">
import { ref } from 'vue'
import AppLink from '../components/AppLink.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'

const songPlaying = ref(false)

const work = [
  {
    title: 'Hike and camp',
    image: 'cards/hike',
    details: ['Twelve field sessions, from map reading to camp planning'],
  },
  {
    title: 'Train with a coach',
    image: 'cards/train',
    details: ['Twelve coached martial-arts lessons on balance, footwork and control'],
  },
  {
    title: 'Read primary texts',
    image: 'cards/read',
    details: [
      'Plato, Laozi, Confucius, Hume, Mill, Wollstonecraft, Tagore, E. Pauline Johnson, Douglass',
      'Restate the opposing argument before answering it',
    ],
  },
  {
    title: 'Conduct Experiments',
    image: 'cards/experiment',
    details: [
      'Carry out twelve investigations covering topics such as friction, pendulums, heat, sampling and energy.',
      'Present and defend one of your conclusions in an individual oral examination.',
    ],
  },
  {
    title: 'Create Something Useful to Others',
    image: 'cards/make',
    details: ['Develop a practical resource that others can use.', 'The Jasper Commons Hearing in Week 6.'],
  },
  {
    title: 'Minimise Phone and Internet Use',
    image: 'cards/offline',
    details: [
      'Participants are encouraged to switch off their personal phones and avoid using the internet during teaching sessions and camps.',
    ],
  },
]

const publications = [
  {
    type: 'Founding document',
    title: 'Vision & Founding Charter',
    file: '/founding-charter.pdf',
    download: 'Jasper-Founding-Handbook.pdf',
    cover: 'founding-charter-cover',
    meta: 'PDF · 12 pages · 5.1 MB',
    summary: 'The founding letter, vision and mission, the educational method, the six-week programme and the staged path toward an operating institution.',
  },
  {
    type: 'Curriculum',
    title: 'Field Semester Instructor Guide',
    file: '/field-semester.pdf',
    download: 'Jasper-Field-Semester-Curriculum.pdf',
    cover: 'field-semester-cover',
    meta: 'PDF · 39 pages · 5.2 MB',
    summary: 'Timed lesson plans for all 144 hours, twelve laboratory cards, primary readings, camp arrangements and assessment criteria.',
  },
  {
    type: 'Learner workbook',
    title: 'Offline Learner Fieldbook',
    file: '/offline-fieldbook.pdf',
    download: 'Jasper-Offline-Fieldbook.pdf',
    cover: 'offline-fieldbook-cover',
    meta: 'PDF · 12 printable sheets · 279 KB',
    summary: 'Sheets for field decisions, experiments, close reading, debate and the final project. Made to be carried and written in.',
  },
]

const routes = [
  { who: 'Teachers', title: 'Join our teaching team', to: '/join/teachers' },
  { who: 'Students', title: 'Join the first semester', to: '/join/students' },
  { who: 'Hosts', title: 'Share your place or skills', to: '/join/hosts' },
  { who: 'Founding supporters', title: 'Help found the university', to: '/support' },
]

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
          University of Jasper is a proposed university in the Rocky Mountains of Canada. Its first programme is a
          six-week Field Semester for a small group of adults, designed around hands-on learning, outdoor experiences
          and time away from phones and the internet.
        </p>
        <div class="home-hero__actions">
          <AppLink class="cta cta--light" to="/program">
            Explore the field semester <span class="cta__arrow" aria-hidden="true">→</span>
          </AppLink>
          <AppLink class="cta home-hero__ghost" to="/vision">
            Read the vision <span class="cta__arrow" aria-hidden="true">→</span>
          </AppLink>
        </div>
      </div>
      <p class="home-hero__motto">Grounded in Nature. Open to the World.</p>
    </div>
  </section>

  <section class="home-intro" aria-labelledby="intro-title">
    <div class="container">
      <div class="home-intro__head">
        <p class="label">About the university</p>
        <h2 id="intro-title" class="display">A new university, starting in a small mountain town.</h2>
      </div>
      <div class="home-intro__grid">
        <div class="home-intro__lead">
          <p class="home-text">
            University of Jasper is a university project founded by Vincent Zhang. Its long-term vision is to bring
            together physical training, the humanities across different civilizations, and the fundamental principles of
            mathematics, physics, chemistry and economics.
          </p>
          <p class="home-text">
            The first step is a six-week Field Semester in Jasper for a small group of six to eight adults. Participants
            will hike and camp, train with a coach, study original texts, conduct experiments and create practical work
            that others can use. During teaching sessions, the use of phones and internet access will be restricted to
            encourage focused learning and direct engagement with the world around them.
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

  <section class="home-place" aria-labelledby="place-title">
    <div class="container home-place__grid">
      <figure class="home-place__figure">
        <ResponsiveImage
          name="jasper"
          alt="Spirit Island on Maligne Lake, Jasper National Park"
          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 55vw, 40rem"
        />
        <figcaption>
          <AppLink class="home-place__credit" to="/sources">Maligne Lake, Jasper National Park · Photo credit</AppLink>
        </figcaption>
      </figure>
      <div class="home-place__body">
        <p class="label">Why Jasper</p>
        <h2 id="place-title" class="home-place__title">A place to become.</h2>
        <p class="home-text">
          Jasper is a small mountain town in the Canadian Rockies, surrounded by a national park. The weather can change
          quickly, distances can be challenging, and not every question can be answered from a screen.
        </p>
        <p class="home-text">
          Here, routes must be planned before setting out, camps must be kept dry, and groups must work together before
          moving forward. These everyday challenges give practical meaning to what participants read, discuss and
          investigate.
        </p>
      </div>
    </div>
  </section>

  <section id="jasper-song" class="home-interlude" aria-labelledby="song-title">
    <div class="container home-interlude__grid">
      <div class="home-interlude__page">
        <h2 id="song-title" class="display">Jasper, in song.</h2>
        <p class="home-text">
          Vincent Zhang’s original song follows the glaciers, lakes and remembered journeys of Jasper. It gives a
          personal voice to the place at the heart of the university’s founding vision.
        </p>
        <a class="cta cta--primary" href="https://www.youtube.com/watch?v=htp2z4i4XCI" target="_blank" rel="noopener noreferrer">
          Listen on YouTube<span class="visually-hidden"> (opens in a new tab)</span>
          <span class="cta__arrow" aria-hidden="true">↗</span>
        </a>
      </div>
      <figure class="home-interlude__media">
        <!-- The YouTube player (about 1 MB) only loads once the visitor asks for it. -->
        <div class="home-interlude__video">
          <iframe
            v-if="songPlaying"
            src="https://www.youtube.com/embed/htp2z4i4XCI?autoplay=1"
            title="Jasper Dream Crying | Original Song Inspired by Jasper National Park, Canada | FarJasper Stories"
            width="749"
            height="562"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <button v-else type="button" class="home-interlude__poster" @click="songPlaying = true">
            <ResponsiveImage name="jasper-song-poster" sizes="(max-width: 1100px) 100vw, 42rem" />
            <span class="home-interlude__play" aria-hidden="true"></span>
            <span class="visually-hidden">Play “Jasper Dream Crying” on this page</span>
          </button>
        </div>
        <figcaption class="home-interlude__credit">
          <span>Written by Vincent Zhang</span>
          <span>Produced by FarJasper Stories Canada</span>
        </figcaption>
      </figure>
    </div>
  </section>

  <section id="publications" class="home-library" aria-labelledby="library-title">
    <div class="container">
      <div class="sec-head">
        <div>
          <p class="label">Publications</p>
          <h2 id="library-title" class="display">The proposal, in writing.</h2>
        </div>
        <p>
          Three documents set out the programme in detail: lessons, readings, safety arrangements, assessment, and what
          still has to be established. English edition, September 2026.
        </p>
      </div>
      <ol class="home-library__list">
        <li v-for="doc in publications" :key="doc.file" class="home-doc">
          <a class="home-doc__cover" :href="doc.file" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
            <ResponsiveImage :name="doc.cover" sizes="11rem" />
          </a>
          <div class="home-doc__body">
            <p class="sec-label">{{ doc.type }}</p>
            <h3 class="home-doc__title">{{ doc.title }}</h3>
            <p class="home-doc__meta">{{ doc.meta }}</p>
            <p class="home-doc__summary">{{ doc.summary }}</p>
            <div class="home-doc__actions">
              <a class="cta cta--primary" :href="doc.file" target="_blank" rel="noopener noreferrer">
                Read online<span class="visually-hidden">: {{ doc.title }} (opens in a new tab)</span>
                <span class="cta__arrow" aria-hidden="true">↗</span>
              </a>
              <a class="cta cta--outline" :href="doc.file" :download="doc.download">
                Download PDF<span class="visually-hidden">: {{ doc.title }}</span>
                <span class="cta__arrow" aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <section class="home-participate" aria-labelledby="participate-title">
    <div class="container">
      <div class="sec-head">
        <div>
          <p class="label">Take part</p>
          <h2 id="participate-title" class="display">Find your way in.</h2>
        </div>
      </div>
      <ul class="home-routes">
        <li v-for="route in routes" :key="route.to">
          <AppLink class="home-routes__card" :to="route.to">
            <span class="sec-label">{{ route.who }}</span>
            <span class="home-routes__title">{{ route.title }}</span>
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
        <blockquote>“We human beings have our special responsibilities to make our society and world better.”</blockquote>
        <figcaption>
          <span class="home-letter__name">Vincent Zhang</span>
          <span class="home-letter__source">founding letter, 2015</span>
        </figcaption>
        <AppLink class="cta cta--light" to="/letter">
          Read the letter <span class="cta__arrow" aria-hidden="true">→</span>
        </AppLink>
      </figure>
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

section {
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

.home-intro__head .label {
  margin-bottom: var(--space-3);
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

/* ---------- Intro: heading, then sticky text + six cards ---------- */
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

/* ---------- Place ---------- */
.home-place {
  padding-block: var(--space-section);
}

.home-place__grid {
  display: grid;
  grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
  align-items: center;
  gap: var(--space-8);
}

.home-place__figure img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: 58% 50%;
}

.home-place__figure figcaption {
  margin-top: var(--space-3);
}

.home-place__credit {
  font-size: 0.8125rem;
  color: var(--color-muted);
  text-decoration: none;
}

.home-place__credit:hover {
  color: var(--color-cobalt);
}

.home-place__body {
  display: grid;
  gap: var(--space-5);
}

.home-place__body .label {
  margin-bottom: 0;
  color: var(--color-muted);
}

.home-place__title {
  font-family: var(--font-serif);
  font-size: clamp(2.75rem, 5vw, 4.5rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1;
}

/* ---------- Interlude ---------- */
.home-interlude {
  padding-block: var(--space-section);
  background: var(--color-cloud);
}

.home-interlude__grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  align-items: center;
  gap: var(--space-8);
}

.home-interlude__page {
  display: grid;
  justify-items: start;
  gap: var(--space-5);
}

.home-interlude__video {
  aspect-ratio: 749 / 562;
  background: var(--color-navy-deep);
}

.home-interlude__video iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.home-interlude__poster {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}

.home-interlude__poster img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-interlude__play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4.5rem;
  height: 4.5rem;
  background: var(--color-ink);
  transform: translate(-50%, -50%);
  transition: background-color 0.2s ease;
}

.home-interlude__play::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 54%;
  border-style: solid;
  border-width: 0.75rem 0 0.75rem 1.25rem;
  border-color: transparent transparent transparent var(--color-paper);
  transform: translate(-50%, -50%);
}

.home-interlude__poster:hover .home-interlude__play,
.home-interlude__poster:focus-visible .home-interlude__play {
  background: var(--color-cobalt);
}

.home-interlude__poster:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

.home-interlude .cta {
  margin-top: var(--space-2);
}

.home-interlude__credit {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2) var(--space-5);
  margin-top: var(--space-4);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-line);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-muted);
}

/* ---------- Library ---------- */
.home-library {
  padding-block: var(--space-section);
}

.home-library__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-7) var(--space-6);
}

.home-doc {
  display: flex;
  flex-direction: column;
}

.home-doc__cover {
  display: flex;
  justify-content: center;
  padding: var(--space-6);
  border: 1px solid var(--color-line);
  background: var(--color-cloud);
}

.home-doc__cover img {
  display: block;
  width: auto;
  height: 15rem;
  box-shadow: var(--shadow-paper);
  transition: transform 400ms var(--ease);
}

.home-doc:hover .home-doc__cover img {
  transform: translateY(-4px);
}

.home-doc__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-2);
  padding-top: var(--space-5);
}

.home-doc__body .sec-label {
  color: var(--color-cobalt);
}

.home-doc__title {
  font-family: var(--font-serif);
  font-size: var(--text-title);
  font-weight: 400;
  line-height: 1.2;
}

.home-doc__meta {
  font-size: 0.875rem;
  color: var(--color-muted);
}

.home-doc__summary {
  margin-top: var(--space-2);
  font-size: var(--text-small);
  line-height: 1.6;
}

.home-doc__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-3);
  margin-top: auto;
  padding-top: var(--space-5);
}

/* ---------- Participate ---------- */
.home-participate {
  padding-block: var(--space-section);
  background: var(--color-cloud);
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

.home-routes__card .sec-label {
  color: var(--color-cobalt);
}

.home-routes__title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.2;
  transition: color var(--duration) var(--ease);
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
  text-transform: uppercase;
}

.home-letter__name {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: rgba(253, 230, 138, 0.9);
}

.home-letter__source {
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: #9ca3af;
}

.home-letter .cta {
  margin-top: var(--space-7);
}

/* ---------- Tablet ---------- */
@media (max-width: 1100px) {
  .home-intro__grid,
  .home-interlude__grid {
    grid-template-columns: 1fr;
  }

  .home-intro__lead {
    position: static;
    grid-template-columns: 1fr;
    max-width: 44rem;
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

  .home-library__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
  .home-library__list {
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
    flex-direction: row;
    align-items: baseline;
    flex-wrap: wrap;
    column-gap: var(--space-4);
    padding-right: 0;
  }

  .home-routes__card .sec-label {
    flex-basis: 100%;
  }

  .home-routes__arrow {
    margin-left: auto;
    padding-top: 0;
  }

  .home-work__media {
    height: 12rem;
  }

  .home-place__figure img {
    aspect-ratio: 4 / 3;
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
  .home-work__media img,
  .home-doc__cover img {
    transition: none;
  }
}
</style>
