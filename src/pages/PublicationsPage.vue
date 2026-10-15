<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import { PUBLICATIONS_HERO_SIZES } from '../images'

const publications = [
  {
    id: 'founding-charter',
    index: '01',
    category: 'The vision',
    title: 'Vision & Founding Charter',
    purpose: 'Why we are building it.',
    text: 'The recovered founding letter, vision, mission, educational method, six-week programme, and staged path toward a real institution.',
    meta: 'PDF · 12 pages · 5.1 MB · English',
    file: '/founding-charter.pdf',
    download: 'Jasper-Founding-Handbook.pdf',
    cover: 'founding-charter-cover',
    read: 'Read the charter',
  },
  {
    id: 'field-semester',
    index: '02',
    category: 'The curriculum',
    title: 'Field Semester Instructor Guide',
    purpose: 'How we intend to teach.',
    text: 'The proposed 144-hour curriculum, with detailed lessons, scientific investigations, primary readings, assessment, and signature inquiries.',
    meta: 'PDF · 39 pages · 5.2 MB · English',
    file: '/field-semester.pdf',
    download: 'Jasper-Field-Semester-Curriculum.pdf',
    cover: 'field-semester-cover',
    read: 'Read the guide',
  },
  {
    id: 'offline-fieldbook',
    index: '03',
    category: 'The practice',
    title: 'Offline Learner Fieldbook',
    purpose: 'What learning looks like in the field.',
    text: 'Twelve printable sheets for field decisions, experiments, close reading, debate, and a final project. Designed to be carried and used in the field.',
    meta: 'PDF · 12 pages · 279 KB · English',
    file: '/offline-fieldbook.pdf',
    download: 'Jasper-Offline-Fieldbook.pdf',
    cover: 'offline-fieldbook-cover',
    read: 'Read the fieldbook',
  },
]

const additional = [
  {
    id: 'founding-brief',
    index: '04',
    category: 'Founding support',
    title: 'Founding Supporter Brief',
    purpose: 'How the founding could be supported.',
    text: 'A two-page introduction to the C$10 million proposed founding-capital ambition, the Founding Five, and the steps that need support.',
    meta: 'PDF · 2 pages · 263 KB · English',
    file: '/founding-brief.pdf',
    download: 'Jasper-Founding-Supporter-Brief.pdf',
    cover: 'founding-brief-cover',
    read: 'Read the brief',
  },
  {
    id: 'founding-charter-docx',
    index: '05',
    category: 'Editable edition',
    title: 'Editable Founding Charter',
    purpose: 'The charter text, ready to edit.',
    text: 'The complete founding vision and charter text in Word, including the contemporary welcome adapted from Vincent Zhang’s 2015 letter.',
    meta: 'Word · 3.9 MB · English',
    file: '/founding-charter.docx',
    download: 'Jasper-Founding-Charter.docx',
    cover: 'founding-charter-docx-cover',
    read: '',
  },
]

const groups = [
  { key: 'core', head: null, items: publications },
  {
    key: 'additional',
    head: {
      label: 'Additional publications',
      title: 'For the work of founding.',
      text: 'Two further documents for readers who want to understand the founding case more closely or work directly with the charter text.',
    },
    items: additional,
  },
]
</script>

<template>
  <div class="pub">
    <!-- 01 Core publications -->
    <section class="pub-section pub-section--paper pub-core" aria-labelledby="pub-core-title">
      <div class="container">
        <div class="pub-intro">
          <div class="pub-head pub-intro__copy">
            <p class="pub-label">University of Jasper · Publications</p>
            <h1 id="pub-core-title" class="pub-title">Three publications. <em>One developing university.</em></h1>
            <p class="pub-copy">
              University of Jasper publishes three core works, meant to be read in order. The
              <strong>Vision &amp; Founding Charter</strong> explains why the university is being built. The
              <strong>Field Semester Instructor Guide</strong> sets out how the proposed six-week programme would be
              taught. The <strong>Offline Learner Fieldbook</strong> is the paper workbook learners carry into the field.
            </p>
            <p class="pub-copy">
              Each serves a different purpose: to explain the vision, guide the teaching, and support learning in the
              field. Two additional publications follow them, for founding supporters and for anyone working with the
              charter text.
            </p>
            <div class="pub-head__set">
              <a class="cta cta--primary" href="/jasper-publications.zip" download="University-of-Jasper-Publications.zip">
                Download the complete publication set
                <span class="visually-hidden">(ZIP, 12.6 MB)</span>
                <span class="cta__arrow" aria-hidden="true">↓</span>
              </a>
              <p class="pub-head__meta">ZIP · 12.6 MB · All five publications</p>
            </div>
          </div>
          <figure class="pub-intro__figure">
            <ResponsiveImage
              name="publications-hero"
              alt="A founding letter, an open notebook and bound publications on a wooden desk below a window onto the mountains"
              :sizes="PUBLICATIONS_HERO_SIZES"
              priority
            />
          </figure>
        </div>

        <div v-for="group in groups" :key="group.key" class="pub-group">
          <div v-if="group.head" class="pub-head pub-group__head">
            <p class="pub-label">{{ group.head.label }}</p>
            <h2 :id="`pub-${group.key}-title`" class="pub-group__title">{{ group.head.title }}</h2>
            <p class="pub-copy">{{ group.head.text }}</p>
          </div>

          <ol class="pub-index" :aria-labelledby="group.head ? `pub-${group.key}-title` : 'pub-core-title'">
            <li v-for="doc in group.items" :id="doc.id" :key="doc.id" class="pub-row">
              <a
                class="pub-row__cover"
                :href="doc.file"
                v-bind="doc.read ? { target: '_blank', rel: 'noopener noreferrer' } : { download: doc.download }"
                tabindex="-1"
                aria-hidden="true"
              >
                <ResponsiveImage :name="doc.cover" sizes="7rem" />
              </a>

              <div class="pub-row__main">
                <p class="pub-row__eyebrow">{{ doc.index }} / {{ doc.category }}</p>
                <h3 class="pub-row__title">{{ doc.title }}</h3>
                <p class="pub-row__purpose">{{ doc.purpose }}</p>
                <p class="pub-row__text">{{ doc.text }}</p>
              </div>

              <div class="pub-row__side">
                <p class="pub-row__meta">{{ doc.meta }}</p>
                <div class="pub-row__actions">
                  <template v-if="doc.read">
                    <a class="cta cta--primary" :href="doc.file" target="_blank" rel="noopener noreferrer">
                      {{ doc.read }}<span class="visually-hidden">: {{ doc.title }} (PDF, opens in a new tab)</span>
                      <span class="cta__arrow" aria-hidden="true">→</span>
                    </a>
                    <a class="pub-action" :href="doc.file" :download="doc.download">
                      Download PDF<span class="visually-hidden">: {{ doc.title }}</span>
                      <span aria-hidden="true">↓</span>
                    </a>
                  </template>
                  <a v-else class="cta cta--primary" :href="doc.file" :download="doc.download">
                    Download Word edition<span class="visually-hidden">: {{ doc.title }} (DOCX)</span>
                    <span class="cta__arrow" aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- 02 From publication to practice -->
    <section class="pub-section pub-section--cloud" aria-labelledby="pub-practice-title">
      <div class="container">
        <div class="pub-head pub-head--last">
          <p class="pub-label">From publication to practice</p>
          <h2 id="pub-practice-title" class="pub-title">Take the work <em>into the field.</em></h2>
          <p class="pub-copy">
            Explore the proposed six-week Field Semester in Jasper, where the educational vision becomes a practical
            programme of study, inquiry, and physical discipline.
          </p>
          <AppLink class="cta cta--primary pub-head__cta" to="/program">
            Explore the Field Semester <span class="cta__arrow" aria-hidden="true">→</span>
          </AppLink>
        </div>
      </div>
    </section>

    <!-- 03 Current editions -->
    <section class="pub-section pub-section--paper pub-editions" aria-labelledby="pub-editions-title">
      <div class="container">
        <div class="pub-editions__block">
          <p class="pub-label">Current editions</p>
          <h2 id="pub-editions-title" class="pub-editions__title">Edition information</h2>
          <p class="pub-editions__date"><time datetime="2026-09-28">28 September 2026</time></p>
          <div class="pub-editions__notes">
            <p>
              The charter and instructor guide include the annual winter break from mid-December to mid-February,
              approximately two months. Exact dates are confirmed each academic year.
            </p>
            <p>
              These publications describe the founding vision and proposed non-degree Field Semester. Enrolment dates
              and delivery arrangements remain unconfirmed.
            </p>
            <p>
              Read links open PDFs in a new tab. Download the files before the offline semester; the learner fieldbook
              is designed for printing.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pub {
  font-family: var(--font-sans);
  font-variant-numeric: lining-nums;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--color-ink);
  background: var(--color-paper);
}

.pub :where(h1, h2, h3, p, ol, ul, li) {
  margin: 0;
}

.pub :where(ol, ul) {
  padding: 0;
  list-style: none;
}

.pub :where(h1, h2, h3) {
  font-family: var(--font-serif);
  font-weight: 400;
  letter-spacing: -0.025em;
}

.pub a:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

/* ---------- Shared section structure ---------- */
.pub-section {
  padding-block: var(--space-section);
}

.pub-section--paper {
  background: var(--color-paper);
}

.pub-section--cloud {
  background: var(--color-cloud);
}

.pub-head {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  max-width: 48rem;
  margin-bottom: var(--space-7);
}

.pub-head--last {
  margin-bottom: 0;
}

.pub-head__cta {
  margin-top: var(--space-2);
}

.pub-core {
  padding-top: var(--space-8);
}

.pub-copy strong {
  font-weight: 500;
  color: var(--color-ink);
}

.pub-head__set {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-5);
  margin-top: var(--space-2);
}

.pub-head__meta {
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
  color: var(--color-muted);
}

.pub-label {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.pub .pub-title {
  font-size: var(--text-display);
  line-height: 1.2;
}

.pub-title em {
  font-style: italic;
  color: var(--color-cobalt);
}

.pub-copy {
  max-width: 40rem;
  color: var(--color-muted);
}

/* Secondary text action: no underline, marked by colour and arrow. */
.pub-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-cobalt);
  white-space: nowrap;
  transition: color var(--duration) var(--ease);
}

.pub-action:hover {
  color: var(--color-ink);
}

/* ---------- 02 Core publications ---------- */
.pub-index {
  border-top: 1px solid var(--color-ink);
}

.pub-row {
  display: grid;
  grid-template-columns: 7rem minmax(0, 1fr) 16rem;
  gap: var(--space-7);
  align-items: start;
  padding-block: var(--space-7);
  border-bottom: 1px solid var(--color-line);
  scroll-margin-top: calc(var(--header-height) + 1rem);
}

.pub-row__cover {
  display: block;
  border: 1px solid var(--color-line);
  background: var(--color-paper);
}

.pub-row__cover img {
  display: block;
  width: 100%;
  height: auto;
}

.pub-row__main {
  display: grid;
  gap: var(--space-2);
  max-width: 40rem;
}

.pub-row__eyebrow {
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.pub .pub-row__title {
  font-size: clamp(1.5rem, 2.2vw, 1.875rem);
  line-height: 1.2;
}

.pub-row__purpose {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-style: italic;
  line-height: 1.4;
  color: var(--color-muted);
}

.pub-row__text {
  margin-top: var(--space-2);
  color: var(--color-muted);
}

.pub-row__side {
  display: grid;
  gap: var(--space-4);
  padding-top: 1.625rem;
}

.pub-row__meta {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--color-muted);
}

.pub-row__actions {
  display: grid;
  justify-items: start;
  gap: var(--space-2);
}

/* ---------- 03 Current editions ---------- */
.pub-editions {
  padding-block: var(--space-8);
}

.pub-editions__block {
  display: grid;
  gap: var(--space-3);
  max-width: 46rem;
}

.pub .pub-editions__title {
  font-size: clamp(1.5rem, 2.2vw, 1.875rem);
  line-height: 1.2;
}

.pub-editions__date {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-ink);
}

.pub-editions__notes {
  margin-top: var(--space-3);
  border-top: 1px solid var(--color-ink);
}

.pub-editions__notes p {
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--color-line);
  font-size: var(--text-small);
  line-height: 1.7;
  color: var(--color-muted);
}

/* ---------- Page intro: copy left, image right ---------- */
.pub-intro {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  align-items: center;
  gap: var(--space-8);
  margin-bottom: var(--space-7);
}

.pub-intro__copy {
  margin-bottom: 0;
}

.pub-intro__figure {
  margin: 0;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border: 1px solid var(--color-line);
}

.pub-intro__figure img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 45% 60%;
}

/* ---------- Additional publications ---------- */
.pub-group + .pub-group {
  margin-top: var(--space-8);
}

.pub-group__head {
  margin-bottom: var(--space-6);
}

.pub .pub-group__title {
  font-size: clamp(1.75rem, 2.6vw, 2.25rem);
  line-height: 1.2;
}

/* ---------- Tablet ---------- */
@media (max-width: 1024px) {
  .pub-row {
    grid-template-columns: 6rem minmax(0, 1fr);
    gap: var(--space-4) var(--space-6);
  }

  .pub-row__side {
    grid-column: 2;
    padding-top: 0;
  }

  .pub-row__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3) var(--space-5);
  }

  .pub-intro {
    grid-template-columns: minmax(0, 1fr) minmax(0, 18rem);
    gap: var(--space-6);
  }
}

@media (max-width: 820px) {
  .pub-intro {
    grid-template-columns: 1fr;
  }

  .pub-intro__figure {
    aspect-ratio: 16 / 9;
  }
}

/* ---------- Mobile ---------- */
@media (max-width: 640px) {
  .pub-core {
    padding-top: var(--space-7);
  }

  .pub-head__set .cta {
    width: 100%;
    justify-content: center;
  }

  .pub-row {
    grid-template-columns: 1fr;
    gap: var(--space-4);
    padding-block: var(--space-6);
  }

  .pub-row__cover {
    display: none;
  }

  .pub-row__side {
    grid-column: auto;
  }

  .pub-row__actions .cta {
    width: 100%;
    justify-content: center;
  }
}
</style>
