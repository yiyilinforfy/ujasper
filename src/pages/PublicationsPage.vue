<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import { PUBLICATIONS_HERO_SIZES } from '../images'

const publications = [
  {
    id: 'founding-charter',
    title: 'Founding charter',
    text: 'The original welcome, vision, educational commitments and staged institutional proposal.',
    pages: 12,
    file: '/founding-charter.pdf',
    download: 'Jasper-Founding-Handbook.pdf',
    read: '/read/charter',
    cover: 'founding-charter-cover',
  },
  {
    id: 'field-semester',
    title: 'Academic curriculum',
    text: 'Six connected courses, timed teaching, Jasper investigations, tutorials, readings and assessment.',
    pages: 43,
    file: '/field-semester.pdf',
    download: 'Jasper-Field-Semester-Curriculum.pdf',
    read: '/read/curriculum',
    cover: 'field-semester-cover',
  },
  {
    id: 'operations-manual',
    title: 'Operations and safety manual',
    text: 'Staffing, field permissions, activity controls, access, communications and release-to-operate decisions.',
    pages: 15,
    file: '/operations-manual.pdf',
    download: 'Jasper-Operations-and-Safety-Manual.pdf',
    read: '/read/operations',
    cover: 'operations-manual-cover',
  },
  {
    id: 'offline-fieldbook',
    title: 'Printable learner fieldbook',
    text: 'Paper sheets for observation, physical progression, arguments, experiments, useful work and reflection.',
    pages: 15,
    file: '/offline-fieldbook.pdf',
    download: 'Jasper-Offline-Fieldbook.pdf',
    read: '/read/fieldbook',
    cover: 'offline-fieldbook-cover',
  },
  {
    id: 'founding-brief',
    title: 'Founding supporter brief',
    text: 'The first funding conversation, long-term ambition and governance decisions to establish.',
    pages: 2,
    file: '/founding-brief.pdf',
    download: 'Jasper-Founding-Supporter-Brief.pdf',
    read: '/read/supporter',
    cover: 'founding-brief-cover',
  },
]
</script>

<template>
  <div class="pub">
    <!-- 01 The publication library -->
    <section class="pub-section pub-section--paper pub-library" aria-labelledby="pub-title">
      <div class="container">
        <div class="pub-head">
          <p class="pub-label">The publication library · <time datetime="2026-10-15">15 October 2026</time></p>
          <h1 id="pub-title" class="pub-title">One vision.<br><em>A coherent working edition.</em></h1>
          <p class="pub-copy">
            Five PDFs and an editable Word charter, with complete HTML reading editions. The academic plan, operating
            arrangements and learner sheets belong together.
          </p>
          <div class="pub-actions">
            <a class="cta cta--primary" href="/jasper-publications.zip">
              Download all six documents <span class="cta__arrow" aria-hidden="true">↓</span>
            </a>
            <a class="link" href="/founding-charter.docx" download="Jasper-Founding-Charter.docx">Editable Word charter</a>
            <a class="link" href="/publication-manifest.json">Edition and file manifest</a>
          </div>
        </div>

        <figure class="pub-figure">
          <ResponsiveImage
            name="publications-hero"
            alt="A founding letter, an open notebook and bound publications on a wooden desk below a window onto the mountains"
            :sizes="PUBLICATIONS_HERO_SIZES"
            priority
          />
        </figure>

        <ol class="pub-index" aria-labelledby="pub-title">
          <li v-for="doc in publications" :id="doc.id" :key="doc.id" class="pub-row">
            <div class="pub-row__cover">
              <ResponsiveImage :name="doc.cover" sizes="7rem" />
            </div>

            <div class="pub-row__main">
              <h2 class="pub-row__title">{{ doc.title }}</h2>
              <p class="pub-row__text">{{ doc.text }}</p>
              <p class="pub-row__meta">{{ doc.pages }} pages · <time datetime="2026-10-15">15 October 2026</time></p>
            </div>

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
          </li>
        </ol>
      </div>
    </section>

    <!-- 02 Read. Question. Prepare to teach. -->
    <section class="pub-section pub-section--cloud" aria-labelledby="pub-teach-title">
      <div class="container">
        <div class="pub-head pub-head--last">
          <h2 id="pub-teach-title" class="pub-title">Read. Question.<br><em>Prepare to teach.</em></h2>
          <p class="pub-copy">
            These publications describe a proposed program. The operating manual identifies the local decisions and
            checks required before delivery; publication is not permission to operate.
          </p>
          <ul class="pub-links">
            <li><a class="link" href="/syllabus.txt">Short syllabus</a></li>
            <li><AppLink class="link" to="/fieldbook">Personal digital fieldbook</AppLink></li>
            <li><AppLink class="link" to="/founding">Founding progress</AppLink></li>
          </ul>
          <p class="pub-note">
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

.pub :where(h1, h2, h3, p, ol, ul, li, figure) {
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

.pub-library {
  padding-top: var(--space-8);
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

.pub-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-6);
  margin-top: var(--space-2);
}

.pub-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-6);
  margin-top: var(--space-2);
}

.pub-note {
  max-width: 40rem;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-line);
  font-size: var(--text-small);
  color: var(--color-muted);
}

/* ---------- Library photograph ---------- */
.pub-figure {
  max-width: 64rem;
  aspect-ratio: 2 / 1;
  margin-bottom: var(--space-8);
  overflow: hidden;
  border: 1px solid var(--color-line);
}

.pub-figure img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 45% 60%;
}

/* ---------- Publication index ---------- */
.pub-index {
  border-top: 1px solid var(--color-ink);
}

.pub-row {
  display: grid;
  grid-template-columns: 7rem minmax(0, 1fr) 14rem;
  gap: var(--space-7);
  align-items: start;
  padding-block: var(--space-7);
  border-bottom: 1px solid var(--color-line);
  scroll-margin-top: calc(var(--header-height) + 1rem);
}

.pub-row__cover {
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
  gap: var(--space-3);
  max-width: 40rem;
}

.pub .pub-row__title {
  font-size: 1.5rem;
  line-height: 1.25;
}

.pub-row__text {
  color: var(--color-muted);
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

/* ---------- Tablet ---------- */
@media (max-width: 1024px) {
  .pub-row {
    grid-template-columns: 6rem minmax(0, 1fr);
    gap: var(--space-4) var(--space-6);
  }

  .pub-row__actions {
    grid-column: 2;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3) var(--space-5);
  }
}

@media (max-width: 820px) {
  .pub-figure {
    aspect-ratio: 16 / 9;
  }
}

/* ---------- Mobile ---------- */
@media (max-width: 640px) {
  .pub-library {
    padding-top: var(--space-7);
  }

  .pub-actions .cta {
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

  .pub-row__actions {
    grid-column: auto;
  }

  .pub-row__actions .cta {
    width: 100%;
    justify-content: center;
  }
}
</style>
