<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'

const routes = [
  {
    no: 'Route 01',
    tag: 'Proposed',
    title: 'The Founding Five',
    metric: 'C$2 million',
    metricNote: 'per proposed position',
    paragraphs: [
      'Five proposed founding positions at C$2 million each. The aim is enduring stewardship of an educational mission. No commitments or appointments are confirmed.',
    ],
  },
  {
    no: 'Route 02',
    tag: 'Alternative for discussion',
    title: 'An anchor family or foundation',
    metric: 'Anchor commitment',
    metricNote: 'scope not yet defined',
    paragraphs: [
      'A substantial anchor commitment is an alternative route for discussion. A supporter may live anywhere. The same clarity about purpose, staged funding and independent oversight would be required.',
    ],
  },
]

const inspectItems = [
  'The specific event or semester being funded and its accountable operator.',
  'Actual quotations, staffing commitments and the funding recipient.',
  'Deliverables, reporting dates and the evidence for a further cohort.',
  'Conditions for postponement, unused funds and cancellation.',
  'Independent governance, conflicts and academic freedom.',
]

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="fd">
    <!-- 01 Hero -->
    <section class="fd-hero hero-media" aria-labelledby="fd-hero-title">
      <ResponsiveImage class="hero-media__image" name="founding-chairs" priority />
      <div class="container">
        <div class="fd-hero__grid">
          <div class="fd-hero__main">
            <span class="fd-kicker fd-kicker--on-dark">The founding invitation</span>
            <h1 id="fd-hero-title" class="fd-hero__title">
              Help establish<br><em>something worth continuing.</em>
            </h1>
            <p class="fd-hero__deck">
              Support should make a real educational milestone possible. Begin with accountable people, an agreed
              purpose and evidence of what the work achieves.
            </p>
            <div class="fd-hero__actions">
              <a class="fd-button fd-button--light" href="/founding-brief.pdf" target="_blank" rel="noopener noreferrer">
                <span>Read the supporter brief</span>
                <span aria-hidden="true">↗</span>
              </a>
              <AppLink class="fd-button fd-button--ghost" to="/join/hosts#introduction">
                <span>Prepare a supporter introduction</span>
                <span aria-hidden="true">→</span>
              </AppLink>
            </div>
          </div>

          <aside class="fd-hero__aside" aria-label="The long-term founding ambition">
            <p class="fd-hero__capital-label">The long-term founding ambition</p>
            <p class="fd-hero__figure">C$10m</p>
            <p class="fd-hero__aside-text">
              No commitments or appointments are confirmed.
            </p>
          </aside>
        </div>
      </div>
    </section>

    <!-- 02 The model -->
    <section id="model" class="fd-section fd-section--white" aria-labelledby="fd-model-title">
      <div class="container">
        <div class="fd-intro">
          <span class="fd-kicker">01 — The long-term founding ambition</span>
          <h2 id="fd-model-title" class="fd-h2">
            C$10 million.<br><em>A proposal to build toward.</em>
          </h2>
        </div>

        <div class="fd-routes">
          <article v-for="route in routes" :key="route.no" class="fd-route">
            <div class="fd-route__top">
              <span class="fd-route__no">{{ route.no }}</span>
              <span class="fd-route__tag">{{ route.tag }}</span>
            </div>
            <h3 class="fd-route__title">{{ route.title }}</h3>
            <p class="fd-route__metric">
              <strong>{{ route.metric }}</strong>
              <span>{{ route.metricNote }}</span>
            </p>
            <div class="fd-route__body">
              <p v-for="(text, i) in route.paragraphs" :key="i" class="fd-text">{{ text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 03 The first decision -->
    <section id="first-decision" class="fd-section fd-section--cloud" aria-labelledby="fd-sequence-title">
      <div class="container">
        <div class="fd-intro fd-intro--last">
          <span class="fd-kicker">02 — The first decision</span>
          <h2 id="fd-sequence-title" class="fd-h2">
            The first decision<br><em>before the larger ambition.</em>
          </h2>
          <p class="fd-deck">
            Help establish a capable Jasper host, qualified educators and a fully costed first in-person milestone. Use
            appropriate existing space. Property follows demonstrated need and a sustainable operating case.
          </p>
          <div class="fd-intro__actions">
            <a class="fd-button fd-button--dark" href="mailto:vincent@ujasper.ca?subject=Jasper%20founding%20support%20conversation">
              <span>Start a founding conversation</span>
            </a>
            <AppLink class="fd-arrowlink" to="/founding">
              <span>Inspect the founding conditions</span>
              <span aria-hidden="true">→</span>
            </AppLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 04 What a supporter should be able to inspect -->
    <section id="inspect" class="fd-section fd-section--white" aria-labelledby="fd-support-title">
      <div class="container">
        <div class="fd-intro">
          <span class="fd-kicker">03 — Before a commitment</span>
          <h2 id="fd-support-title" class="fd-h2">
            What a supporter<br><em>should be able to inspect</em>
          </h2>
        </div>

        <ol class="fd-means" aria-label="What a supporter should be able to inspect">
          <li v-for="(item, i) in inspectItems" :key="item">
            <span class="fd-means__num">{{ pad(i + 1) }}</span>
            <span>{{ item }}</span>
          </li>
        </ol>

        <div class="fd-budget">
          <strong>Funding planning worksheet</strong>
          <p>
            No priced pilot request is published yet. The planning worksheet identifies the costs that must be quoted.
          </p>
          <a class="fd-arrowlink fd-budget__link" href="/funding-planning-worksheet.txt">
            <span>Download the funding planning worksheet</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>

    <!-- 05 Governance & trust -->
    <section id="trust" class="fd-section fd-section--cloud" aria-labelledby="fd-trust-title">
      <div class="container">
        <div class="fd-intro fd-intro--last">
          <span class="fd-kicker">04 — Governance</span>
          <h2 id="fd-trust-title" class="fd-h2">
            The founder’s governance proposal<br><em>and decisions still required</em>
          </h2>
          <p class="fd-deck">
            The Founding Five is Vincent Zhang’s proposal for five founding positions at C$2 million each, toward a
            C$10 million ambition. His intended model includes lifetime board voting rights. These rights are not
            established. The legal structure, governing documents, appointment, election, removal and voting rules
            require independent legal review. No contribution currently purchases or guarantees a directorship or vote.
          </p>
          <p class="fd-deck">
            A permanent founding honour and a governing appointment serve different purposes. Academic independence,
            conflicts, succession, appointment and removal rules must be resolved through the chosen structure, not
            inferred from a contribution.
          </p>
          <p class="fd-deck">
            No payment is accepted here. No investment return, charitable tax receipt, accreditation or lifetime
            appointment is promised.
          </p>
          <AppLink class="fd-arrowlink fd-trust__link" to="/sources#governance-sources">
            <span>Relevant governance sources</span>
            <span aria-hidden="true">↗</span>
          </AppLink>
        </div>
      </div>
    </section>

    <!-- 06 Begin a conversation -->
    <section id="conversation" class="fd-close" aria-labelledby="fd-close-title">
      <div class="container">
        <span class="fd-kicker">05 — The next step</span>
        <h2 id="fd-close-title" class="fd-close__title">
          A contribution<br><em>with a clear next step.</em>
        </h2>
        <p class="fd-close__deck">
          Describe what you would like to help make possible, why Jasper matters to you and what evidence you would need
          before considering a commitment. You can begin with a short email or a private draft.
        </p>
        <div class="fd-close__actions">
          <AppLink class="fd-button fd-button--dark" to="/join/hosts#introduction">
            <span>Prepare a supporter introduction</span>
            <span aria-hidden="true">→</span>
          </AppLink>
          <a class="fd-button fd-button--outline" href="/founding-brief.pdf" target="_blank" rel="noopener noreferrer">
            <span>Read the supporter brief</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p class="fd-close__note">
          For a founding-support conversation, email Vincent Zhang at
          <a href="mailto:vincent@ujasper.ca?subject=Jasper%20founding%20support%20conversation">vincent@ujasper.ca</a>.
          Introduction drafts stay on your device. This website does not accept money, appoint directors or receive
          applications.
        </p>
      </div>
    </section>

    <!-- 07 Founding motto -->
    <section class="fd-motto" aria-label="Founding motto">
      <ResponsiveImage class="fd-motto__image" name="letter-peaks" />
      <div class="fd-motto__shade" aria-hidden="true"></div>
      <div class="container fd-motto__grid">
        <div class="fd-motto__crest">
          <ResponsiveImage name="founding-crest" alt="University of Jasper crest" sizes="9rem" />
        </div>
        <figure class="fd-motto__quote">
          <blockquote>“Fearless in learning. Lead by example.”</blockquote>
          <figcaption>
            <span class="fd-motto__name">Founding motto</span>
            <span class="fd-motto__source">One University <span aria-hidden="true">→</span><span class="visually-hidden">,</span> One Family</span>
          </figcaption>
        </figure>
      </div>
    </section>
  </div>
</template>

<style>
/* Founding page — visual language aligned with the Field Semester page. */
.fd {
  --fd-navy: #0c2033;
  --fd-dark: #081726;
  --fd-ink: #102f4a;
  --fd-light: #f4f5f7;
  --fd-cloud: #edf4f8;
  --fd-muted: #5a6b7c;
  --fd-border: #d9e0e8;
  --fd-accent: #b45309;

  background: var(--fd-light);
  color: #111827;
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.fd ::selection {
  background: #fef3c7;
  color: var(--fd-navy);
}

.fd :where(h1, h2, h3, p, ul, ol, li, figure) {
  margin: 0;
}

.fd :where(ul, ol) {
  padding: 0;
  list-style: none;
}

.fd :where(h1, h2, h3) {
  font-family: var(--font-serif);
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.25;
  color: var(--fd-navy);
}

.fd :where(a) {
  text-decoration: none;
}

.fd :where(a, button):focus-visible {
  outline: 2px solid var(--fd-accent);
  outline-offset: 3px;
}

.fd-section {
  padding-block: 5rem;
  border-bottom: 1px solid var(--fd-border);
  scroll-margin-top: var(--header-height);
}

.fd-section--white {
  background: #fff;
}

.fd-section--cloud {
  background: var(--fd-cloud);
}

.fd-kicker {
  display: block;
  margin-bottom: 0.75rem;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  line-height: 1.33;
  text-transform: uppercase;
  color: var(--fd-muted);
}

.fd-kicker--on-dark {
  color: #d1d5db;
}

.fd-minilabel {
  display: block;
  margin-bottom: 0.75rem;
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--fd-muted);
}

.fd-h2 {
  font-size: 1.875rem;
  line-height: 1.25;
}

.fd-h2 em {
  font-style: italic;
  color: var(--fd-ink);
}

.fd-intro {
  max-width: 40rem;
  margin-bottom: 2.5rem;
}

.fd-deck,
.fd-text {
  font-size: 0.9375rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--fd-muted);
}

.fd-intro .fd-h2 {
  margin-bottom: 1.25rem;
}



.fd-arrowlink {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--fd-navy);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 150ms ease;
}

.fd-arrowlink:hover {
  color: var(--fd-accent);
}

.fd-mid-cta {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--fd-border);
}

.fd-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid transparent;
  color: #fff;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}

.fd-button--light {
  background: #fff;
  color: var(--fd-navy);
}

.fd-button--light:hover {
  background: var(--fd-light);
}

.fd-button--ghost {
  border-color: rgba(255, 255, 255, 0.35);
  background: transparent;
  color: #fff;
}

.fd-button--ghost:hover {
  background: rgba(255, 255, 255, 0.1);
}

.fd-button--dark {
  background: var(--fd-navy);
  color: #fff;
}

.fd-button--dark:hover {
  background: var(--fd-dark);
}

.fd-button--outline {
  border-color: var(--fd-border);
  background: transparent;
  color: var(--fd-navy);
}

.fd-button--outline:hover {
  border-color: var(--fd-navy);
}

/* ---------- Hero ---------- */
.fd-hero {
  display: flex;
  align-items: flex-end;
  min-height: min(calc(100svh - 5.5rem), 46rem);
  padding-block: var(--space-9) var(--space-8);
  --hero-shade: rgba(8, 23, 38, 0.66);
  --hero-position: center 45%;
  background: var(--fd-navy);
  color: #fff;
}

@media (max-width: 760px) {
  .fd-hero {
    min-height: calc(100svh - 7.75rem);
    padding-block: var(--space-9) var(--space-5);
  }
}

.fd-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 0.55fr);
  gap: var(--space-8);
  align-items: end;
}

.fd .fd-hero__title {
  max-width: 56rem;
  margin-bottom: 1.5rem;
  font-size: 2.25rem;
  letter-spacing: -0.025em;
  line-height: 1.1;
  color: #fff;
}

.fd-hero__title em {
  font-style: italic;
  color: #c1e4fa;
}

.fd-hero__deck {
  max-width: 36rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: #e5e7eb;
}

.fd-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.fd-hero__aside {
  padding-left: 1.5rem;
  border-left: 1px solid rgba(255, 255, 255, 0.24);
}

.fd-hero__capital-label {
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #d1d5db;
}

.fd-hero__figure {
  margin-bottom: 0.75rem;
  font-family: var(--font-serif);
  font-size: clamp(2.25rem, 5vw, 3.375rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: #fff;
}

.fd-hero__aside-text {
  max-width: 18rem;
  font-size: 0.8125rem;
  font-weight: 300;
  line-height: 1.6;
  color: #c5d1d5;
}







/* ---------- Model / routes ---------- */
.fd-routes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--fd-ink);
  border-bottom: 1px solid var(--fd-ink);
}

.fd-route {
  padding: 1.75rem 2rem 2rem 0;
}

.fd-route + .fd-route {
  padding-left: 2rem;
  padding-right: 0;
  border-left: 1px solid var(--fd-border);
}

.fd-route__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.fd-route__no {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--fd-accent);
}

.fd-route__tag {
  padding: 0.4rem 0.55rem;
  border: 1px solid var(--fd-border);
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--fd-muted);
}

.fd .fd-route__title {
  margin-bottom: 0.85rem;
  font-size: 1.75rem;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.fd-route__metric {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 0.75rem;
  margin-bottom: 1.25rem;
}

.fd-route__body {
  display: grid;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--fd-border);
}

.fd-route__metric strong {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--fd-navy);
}

.fd-route__metric span {
  font-size: 0.75rem;
  color: var(--fd-muted);
}



/* ---------- First decision ---------- */
.fd-intro__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.5rem;
  margin-top: 1.5rem;
}











/* ---------- Use of support ---------- */
.fd-means {
  border-top: 1px solid var(--fd-border);
  max-width: 42rem;
}

.fd-means li {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  gap: 0.85rem;
  padding-block: 1rem;
  border-bottom: 1px solid var(--fd-border);
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--fd-ink);
}

.fd-means__num {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--fd-accent);
}

.fd-budget {
  max-width: 42rem;
  margin-top: 1.5rem;
  padding: 1.15rem 1.25rem;
  background: var(--fd-light);
  font-size: 0.8125rem;
  line-height: 1.75;
  color: var(--fd-muted);
}

.fd-budget strong {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--fd-ink);
}

.fd-budget__link {
  margin-top: 0.75rem;
}

/* ---------- Governance ---------- */
.fd-intro--last {
  margin-bottom: 0;
}

.fd-intro--last .fd-deck + .fd-deck {
  margin-top: 1rem;
}

.fd-trust__link {
  margin-top: 1.5rem;
}

/* ---------- Close ---------- */
.fd-close {
  padding-block: 5rem;
  background: #fff;
  color: var(--fd-ink);
  scroll-margin-top: var(--header-height);
}

.fd .fd-close__title {
  max-width: 40rem;
  margin-bottom: 1.25rem;
  font-size: 1.875rem;
  line-height: 1.2;
  color: var(--fd-navy);
}

.fd-close__title em {
  font-style: italic;
  color: var(--color-cobalt);
}

.fd-close__deck {
  max-width: 36rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--fd-muted);
}

.fd-close__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.fd-close__note {
  max-width: 40rem;
  font-size: 0.8125rem;
  font-weight: 300;
  line-height: 1.65;
  color: var(--fd-muted);
}

.fd-close__note a {
  color: var(--color-cobalt);
  font-weight: 500;
}

.fd-close__note a:hover {
  color: var(--fd-navy);
}

/* ---------- Founding motto ---------- */
.fd-motto {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-block: clamp(6rem, 10vw, 8rem);
  background: var(--color-navy-deep);
  color: var(--color-on-dark);
}

.fd-motto__image {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fd-motto__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(to right, rgba(8, 23, 38, 0.72), rgba(8, 23, 38, 0.35));
}

.fd-motto__grid {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: var(--space-8);
}

.fd-motto__crest {
  position: relative;
  width: 7.5rem;
  height: 7.5rem;
}

.fd-motto__crest::before {
  content: '';
  position: absolute;
  inset: -0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
}

.fd-motto__crest img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fd-motto__quote {
  max-width: 36rem;
}

.fd-motto__quote blockquote {
  margin-bottom: 1rem;
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-style: italic;
  line-height: 1.3;
  color: #fff;
}

.fd-motto__quote figcaption {
  display: grid;
  gap: 0.25rem;
}

.fd-motto__name {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.fd-motto__source {
  font-size: 0.875rem;
  color: rgba(243, 244, 246, 0.85);
}

@media (min-width: 900px) {
  .fd-motto__grid {
    gap: var(--space-9);
  }

  .fd-motto__crest {
    width: 9rem;
    height: 9rem;
  }

  .fd-motto__quote {
    padding-left: var(--space-6);
    border-left: 1px solid rgba(255, 255, 255, 0.25);
  }
}

@media (min-width: 640px) {
  .fd-h2 {
    font-size: 2.25rem;
  }

  .fd .fd-hero__title {
    font-size: 3.75rem;
  }

  .fd-hero__deck {
    font-size: 1.125rem;
  }

  .fd-button {
    font-size: 0.875rem;
  }






  .fd .fd-close__title {
    font-size: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .fd-section,
  .fd-close {
    padding-block: 6rem;
  }

  .fd .fd-hero__title {
    font-size: 4.5rem;
  }





}

@media (max-width: 900px) {
  .fd-hero__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .fd-hero__aside {
    max-width: 22rem;
    padding-left: 0;
    border-left: 0;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.24);
  }




  .fd-routes {
    grid-template-columns: 1fr;
  }

  .fd-route,
  .fd-route + .fd-route {
    padding: 1.5rem 0;
  }

  .fd-route + .fd-route {
    border-left: 0;
    border-top: 1px solid var(--fd-border);
  }



}

@media (max-width: 640px) {
  .fd-close__actions .fd-button,
  .fd-intro__actions .fd-button,
  .fd-hero__actions .fd-button {
    width: 100%;
  }




  .fd-motto__grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .fd-button,
  .fd-arrowlink {
    transition: none;
  }
}

@media print {
  .fd-hero,
  .fd-close {
    background: #fff !important;
    color: var(--fd-ink) !important;
  }

  .fd .fd-hero__title,
  .fd .fd-close__title,
  .fd-hero__figure,
  .fd-close__deck,
  .fd-close__note,
  .fd-hero__deck,
  .fd-hero__capital-label,
  .fd-hero__aside-text,
  .fd-kicker--on-dark,

  .fd-button--light,
  .fd-button--ghost {
    border: 1px solid var(--fd-border);
    background: #fff;
    color: var(--fd-ink);
  }
}
</style>
