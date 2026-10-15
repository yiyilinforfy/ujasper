<script setup lang="ts">
import ResponsiveImage from './ResponsiveImage.vue'

/** Generated from the release's HTML reading editions; `html` fields hold trusted inline markup (links, line breaks). */
export interface ReaderBlock {
  type: 'p' | 'small' | 'h3' | 'table' | 'figure' | 'lines' | 'link'
  html?: string
  text?: string
  head?: string[]
  rows?: string[][]
  image?: string
  alt?: string
  caption?: string
  count?: number
  href?: string
}

export interface ReaderDocument {
  eyebrow: string
  title: string
  lead: string
  note: string
  pdf: string
  sections: { id: string; eyebrow: string; title: string; blocks: ReaderBlock[] }[]
}

defineProps<{ doc: ReaderDocument }>()

const print = () => window.print()
</script>

<template>
  <section class="reader-intro" aria-labelledby="reader-title">
    <div class="container">
      <div class="reader-head">
        <p class="reader-label">{{ doc.eyebrow }}</p>
        <h1 id="reader-title" class="display">{{ doc.title }}</h1>
        <p class="reader-lead">{{ doc.lead }}</p>
        <div class="reader-actions">
          <a class="cta cta--primary" :href="doc.pdf">
            Download the matching PDF <span class="cta__arrow" aria-hidden="true">↓</span>
          </a>
          <button class="cta cta--outline" type="button" @click="print">Print this reading edition</button>
        </div>
        <p class="reader-note">{{ doc.note }}</p>
      </div>
    </div>
  </section>

  <section class="reader-toc" aria-labelledby="reader-toc-title">
    <div class="container">
      <div class="reader-column">
        <details>
          <summary id="reader-toc-title" class="reader-label">Contents · {{ doc.sections.length }} sections</summary>
          <ol>
            <li v-for="(section, i) in doc.sections" :key="section.id">
              <a :href="`#${section.id}`">
                <span class="reader-toc__num">{{ String(i + 1).padStart(2, '0') }}</span>
                <span>{{ section.title }}</span>
              </a>
            </li>
          </ol>
        </details>
      </div>
    </div>
  </section>

  <section class="reader-body" aria-label="Full text">
    <div class="container">
      <article class="reader-column">
        <section
          v-for="section in doc.sections"
          :id="section.id"
          :key="section.id"
          class="reader-chapter"
          :aria-labelledby="`${section.id}-title`"
        >
          <p class="reader-label">{{ section.eyebrow }}</p>
          <h2 :id="`${section.id}-title`" class="reader-chapter__title">{{ section.title }}</h2>
          <template v-for="(block, i) in section.blocks" :key="i">
            <h3 v-if="block.type === 'h3'" class="reader-h3">{{ block.text }}</h3>
            <p v-else-if="block.type === 'p'" class="reader-p" v-html="block.html"></p>
            <p v-else-if="block.type === 'small'" class="reader-small" v-html="block.html"></p>
            <p v-else-if="block.type === 'link'" class="reader-small">
              <a class="link" :href="block.href">{{ block.text }}</a>
            </p>
            <div v-else-if="block.type === 'table'" class="reader-table" role="region" tabindex="0" aria-label="Table">
              <table>
                <thead v-if="block.head?.length">
                  <tr><th v-for="(cell, c) in block.head" :key="c" scope="col" v-html="cell"></th></tr>
                </thead>
                <tbody>
                  <tr v-for="(row, r) in block.rows" :key="r">
                    <td v-for="(cell, c) in row" :key="c" v-html="cell"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <figure v-else-if="block.type === 'figure' && block.image" class="reader-figure">
              <ResponsiveImage :name="block.image" :alt="block.alt" sizes="(max-width: 760px) 100vw, 46rem" />
              <figcaption>{{ block.caption }}</figcaption>
            </figure>
            <div v-else-if="block.type === 'lines'" class="reader-lines" aria-hidden="true">
              <span v-for="n in block.count" :key="n"></span>
            </div>
          </template>
        </section>
      </article>
    </div>
  </section>
</template>

<style scoped>
.reader-intro,
.reader-toc,
.reader-body {
  font-family: var(--font-sans);
  font-variant-numeric: lining-nums;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--color-ink);
}

:where(h2, h3, p, ol, figure, table) {
  margin: 0;
}

/* ---------- Intro: label, title, description, actions ---------- */
.reader-intro {
  padding-block: var(--space-section) var(--space-8);
  background: var(--color-paper);
}

.reader-head {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  max-width: 48rem;
}

.reader-label {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.reader-lead {
  max-width: 40rem;
  color: var(--color-muted);
}

.reader-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-3);
}

.reader-actions button {
  cursor: pointer;
  background: none;
}

.reader-note {
  max-width: 40rem;
  font-size: 0.875rem;
  color: var(--color-muted);
}

/* ---------- Contents ---------- */
.reader-toc {
  padding-block: var(--space-7);
  background: var(--color-cloud);
}

.reader-column {
  max-width: 46rem;
  margin-inline: auto;
}

.reader-toc summary {
  cursor: pointer;
}

.reader-toc ol {
  margin-top: var(--space-5);
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--color-ink);
}

.reader-toc li {
  border-bottom: 1px solid var(--color-line);
}

.reader-toc a {
  display: flex;
  gap: var(--space-4);
  padding-block: var(--space-3);
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  color: var(--color-ink);
  transition: color var(--duration) var(--ease);
}

.reader-toc a:hover {
  color: var(--color-cobalt);
}

.reader-toc__num {
  flex: none;
  width: 2rem;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.9;
  color: var(--color-muted);
}

/* ---------- Full text ---------- */
.reader-body {
  padding-block: var(--space-8) var(--space-section);
  background: var(--color-paper);
}

.reader-chapter {
  scroll-margin-top: calc(var(--header-height) + var(--space-5));
}

.reader-chapter + .reader-chapter {
  margin-top: var(--space-8);
  padding-top: var(--space-7);
  border-top: 1px solid var(--color-line);
}

.reader-chapter__title {
  margin: var(--space-3) 0 var(--space-5);
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 2.6vw, 2.25rem);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.reader-h3 {
  margin: var(--space-6) 0 var(--space-3);
  font-family: var(--font-serif);
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 1.3;
}

.reader-p {
  font-family: var(--font-serif);
  font-size: clamp(1.0625rem, 1.4vw, 1.1875rem);
  line-height: 1.8;
}

.reader-p + .reader-p,
.reader-small,
.reader-table,
.reader-figure,
.reader-lines {
  margin-top: var(--space-4);
}

.reader-small {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-muted);
}

.reader-p :deep(a),
.reader-small :deep(a),
.reader-table :deep(a) {
  font-weight: 500;
  color: var(--color-cobalt);
  overflow-wrap: anywhere;
}

.reader-p :deep(a:hover),
.reader-small :deep(a:hover) {
  color: var(--color-ink);
}

.reader-table {
  overflow-x: auto;
}

.reader-table table {
  width: 100%;
  min-width: 32rem;
  border-collapse: collapse;
  border-top: 1px solid var(--color-ink);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.reader-table th,
.reader-table td {
  padding: var(--space-3) var(--space-4) var(--space-3) 0;
  border-bottom: 1px solid var(--color-line);
  text-align: left;
  vertical-align: top;
}

.reader-table th {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.reader-table:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

.reader-figure img {
  display: block;
  width: 100%;
  height: auto;
}

.reader-figure figcaption {
  margin-top: var(--space-2);
  font-size: 0.8125rem;
  color: var(--color-muted);
}

.reader-lines span {
  display: block;
  height: 2.25rem;
  border-bottom: 1px solid var(--color-line);
}

.reader-toc a:focus-visible,
.reader-toc summary:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

@media print {
  :global(.site-header),
  :global(.site-footer),
  :global(.skip),
  .reader-actions,
  .reader-toc {
    display: none;
  }

  .reader-intro,
  .reader-body {
    padding-block: 0 var(--space-6);
  }

  .reader-chapter {
    break-before: page;
  }
}
</style>
