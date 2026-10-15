<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import { PUBLICATIONS_HERO_SIZES } from '../images'

const publications = [
  {
    id: 'founding-charter',
    index: '01',
    title: 'Founding charter',
    text: 'The original welcome, vision, educational commitments and staged institutional proposal.',
    pages: 12,
    file: '/founding-charter.pdf',
    download: 'Jasper-Founding-Handbook.pdf',
    cover: 'founding-charter-cover',
    read: '/read/charter',
  },
  {
    id: 'field-semester',
    index: '02',
    title: 'Academic curriculum',
    text: 'Six connected courses, timed teaching, Jasper investigations, tutorials, readings and assessment.',
    pages: 43,
    file: '/field-semester.pdf',
    download: 'Jasper-Field-Semester-Curriculum.pdf',
    cover: 'field-semester-cover',
    read: '/read/curriculum',
  },
  {
    id: 'operations-manual',
    index: '03',
    title: 'Operations and safety manual',
    text: 'Staffing, field permissions, activity controls, access, communications and release-to-operate decisions.',
    pages: 15,
    file: '/operations-manual.pdf',
    download: 'Jasper-Operations-and-Safety-Manual.pdf',
    cover: 'operations-manual-cover',
    read: '/read/operations',
  },
  {
    id: 'offline-fieldbook',
    index: '04',
    title: 'Printable learner fieldbook',
    text: 'Paper sheets for observation, physical progression, arguments, experiments, useful work and reflection.',
    pages: 15,
    file: '/offline-fieldbook.pdf',
    download: 'Jasper-Offline-Fieldbook.pdf',
    cover: 'offline-fieldbook-cover',
    read: '/read/fieldbook',
  },
  {
    id: 'founding-brief',
    index: '05',
    title: 'Founding supporter brief',
    text: 'The first funding conversation, long-term ambition and governance decisions to establish.',
    pages: 2,
    file: '/founding-brief.pdf',
    download: 'Jasper-Founding-Supporter-Brief.pdf',
    cover: 'founding-brief-cover',
    read: '/read/supporter',
  },
]
</script>

<template>
  <div class="pub">
    <!-- 01 The publication library -->
    <section class="pub-section pub-section--paper pub-core" aria-labelledby="pub-core-title">
      <div class="container">
        <div class="pub-intro">
          <div class="pub-head pub-intro__copy">
            <p class="pub-label">The publication library · <time datetime="2026-10-15">15 October 2026</time></p>
            <h1 id="pub-core-title" class="pub-title">One vision.<br><em>A coherent working edition.</em></h1>
            <p class="pub-copy">
              Five PDFs and an editable Word charter, with complete HTML reading editions. The academic plan, operating
              arrangements and learner sheets belong together.
            </p>
            <div class="pub-head__set">
              <a class="cta cta--primary" href="/jasper-publications.zip" download="University-of-Jasper-Publications.zip">
                Download all six documents
                <span class="visually-hidden">(ZIP)</span>
                <span class="cta__arrow" aria-hidden="true">↓</span>
              </a>
              <a class="link" href="/founding-charter.docx" download="Jasper-Founding-Charter.docx">Editable Word charter</a>
              <a class="link" href="/publication-manifest.json">Edition and file manifest</a>
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

        <ol class="pub-index" aria-labelledby="pub-core-title">
          <li v-for="doc in publications" :id="doc.id" :key="doc.id" class="pub-row">
            <AppLink class="pub-row__cover" :to="doc.read" tabindex="-1" aria-hidden="true">
              <ResponsiveImage :name="doc.cover" sizes="7rem" />
            </AppLink>

            <div class="pub-row__main">
              <p class="pub-row__eyebrow">{{ doc.index }}</p>
              <h3 class="pub-row__title">{{ doc.title }}</h3>
              <p class="pub-row__text">{{ doc.text }}</p>
            </div>

            <div class="pub-row__side">
              <p class="pub-row__meta">{{ doc.pages }} pages · <time datetime="2026-10-15">15 October 2026</time></p>
              <div class="pub-row__actions">
                <AppLink class="cta cta--primary" :to="doc.read">
                  Read online<span class="visually-hidden">: {{ doc.title }}</span>
                  <span class="cta__arrow" aria-hidden="true">→</span>
                </AppLink>
                <a class="pub-action" :href="doc.file" :download="doc.download">
                  Download PDF<span class="visually-hidden">: {{ doc.title }}</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- 02 From publication to practice -->
    <section class="pub-section pub-section--cloud" aria-labelledby="pub-practice-title">
      <div class="container">
        <div class="pub-head pub-head--last">
          <p class="pub-label">From publication to practice</p>
          <h2 id="pub-practice-title" class="pub-title">Read. Question.<br><em>Prepare to teach.</em></h2>
          <p class="pub-copy">
            These publications describe a proposed program. The operating manual identifies the local decisions and
            checks required before delivery; publication is not permission to operate.
          </p>
          <div class="pub-head__set">
            <a class="link" href="/syllabus.txt">Short syllabus</a>
            <AppLink class="link" to="/fieldbook">Personal digital fieldbook</AppLink>
            <AppLink class="link" to="/founding">Founding progress</AppLink>
          </div>
          <p class="pub-head__meta">
            The full HTML editions provide a selectable, structured reading alternative to the print PDFs.
          </p>
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

.pub-core {
  padding-top: var(--space-8);
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
