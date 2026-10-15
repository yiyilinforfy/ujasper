<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'

const inspectItems = [
  'The specific event or semester being funded and its accountable operator.',
  'Actual quotations, staffing commitments and the funding recipient.',
  'Deliverables, reporting dates and the evidence for a further cohort.',
  'Conditions for postponement, unused funds and cancellation.',
  'Independent governance, conflicts and academic freedom.',
]

const routes = [
  {
    index: '01',
    title: 'The Founding Five',
    text: 'Five proposed founding positions at C$2 million each. The aim is enduring stewardship of an educational mission. No commitments or appointments are confirmed.',
  },
  {
    index: '02',
    title: 'An anchor family or foundation',
    text: 'A substantial anchor commitment is an alternative route for discussion. A supporter may live anywhere. The same clarity about purpose, staged funding and independent oversight would be required.',
  },
]

const governance = [
  'The Founding Five is Vincent Zhang’s proposal for five founding positions at C$2 million each, toward a C$10 million ambition. His intended model includes lifetime board voting rights. These rights are not established. The legal structure, governing documents, appointment, election, removal and voting rules require independent legal review. No contribution currently purchases or guarantees a directorship or vote.',
  'A permanent founding honour and a governing appointment serve different purposes. Academic independence, conflicts, succession, appointment and removal rules must be resolved through the chosen structure, not inferred from a contribution.',
]

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="sp">
    <section class="sp-hero hero-media" aria-labelledby="sp-hero-title">
      <ResponsiveImage class="hero-media__image" name="founding-chairs" priority />
      <div class="container sp-hero__content">
        <div class="sp-hero__copy">
          <p class="sp-hero__label">The founding invitation</p>
          <h1 id="sp-hero-title" class="sp-hero__title">Help establish<br><em>something worth continuing.</em></h1>
          <p class="sp-hero__lead">
            Support should make a real educational milestone possible. Begin with accountable people, an agreed purpose
            and evidence of what the work achieves.
          </p>
        </div>
      </div>
    </section>

    <section id="first-decision" class="sp-section sp-section--paper" aria-labelledby="sp-decision-title">
      <div class="container">
        <div class="sp-head">
          <h2 id="sp-decision-title" class="sp-title">The first decision<br><em>before the larger ambition.</em></h2>
          <p class="sp-text">
            Help establish a capable Jasper host, qualified educators and a fully costed first in-person milestone. Use
            appropriate existing space. Property follows demonstrated need and a sustainable operating case.
          </p>
          <div class="sp-actions">
            <a class="cta cta--primary" href="mailto:vincent@ujasper.ca?subject=Jasper%20founding%20support%20conversation">
              Start a founding conversation
            </a>
            <AppLink class="link" to="/founding">
              Inspect the founding conditions <span aria-hidden="true">→</span>
            </AppLink>
          </div>
        </div>

        <div class="sp-inspect">
          <h3 class="sp-item-title">What a supporter should be able to inspect</h3>
          <ol class="sp-list" role="list">
            <li v-for="(item, i) in inspectItems" :key="item">
              <span class="sp-list__num" aria-hidden="true">{{ pad(i + 1) }}</span>
              <span>{{ item }}</span>
            </li>
          </ol>
          <p class="sp-note">
            No priced pilot request is published yet. The planning worksheet identifies the costs that must be quoted.
          </p>
          <a class="link sp-inspect__download" href="/funding-planning-worksheet.txt">
            Download the funding planning worksheet <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>

    <section id="ambition" class="sp-section sp-section--cloud" aria-labelledby="sp-ambition-title">
      <div class="container">
        <div class="sp-head">
          <p class="sp-label">The long-term founding ambition</p>
          <h2 id="sp-ambition-title" class="sp-title">C$10 million.<br><em>A proposal to build toward.</em></h2>
        </div>

        <ul class="sp-routes" role="list">
          <li v-for="route in routes" :key="route.index" class="sp-routes__item">
            <span class="sp-routes__index">{{ route.index }}</span>
            <h3 class="sp-item-title">{{ route.title }}</h3>
            <p class="sp-text">{{ route.text }}</p>
          </li>
        </ul>

        <details class="sp-disclosure">
          <summary class="sp-disclosure__summary">
            <span>The founder’s governance proposal and decisions still required</span>
            <span class="sp-disclosure__icon" aria-hidden="true"></span>
          </summary>
          <div class="sp-disclosure__body">
            <p v-for="paragraph in governance" :key="paragraph" class="sp-text">{{ paragraph }}</p>
            <AppLink class="link" to="/sources#governance-sources">Relevant governance sources</AppLink>
          </div>
        </details>

        <p class="sp-note">
          No payment is accepted here. No investment return, charitable tax receipt, accreditation or lifetime appointment
          is promised.
        </p>
      </div>
    </section>

    <section id="contribution" class="sp-section sp-section--paper" aria-labelledby="sp-contribution-title">
      <div class="container">
        <div class="sp-head sp-head--last">
          <h2 id="sp-contribution-title" class="sp-title">A contribution<br><em>with a clear next step.</em></h2>
          <p class="sp-text">
            Describe what you would like to help make possible, why Jasper matters to you and what evidence you would
            need before considering a commitment. You can begin with a short email or a private draft.
          </p>
          <div class="sp-actions">
            <AppLink class="cta cta--primary" to="/join/hosts?role=Supporter#draft">
              Prepare a supporter introduction <span class="cta__arrow" aria-hidden="true">→</span>
            </AppLink>
            <a class="link" href="/founding-brief.pdf">Read the supporter brief</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sp {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-variant-numeric: lining-nums;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
}

.sp :where(h1, h2, h3, p, ol, ul, li) {
  margin: 0;
}

.sp :where(ol, ul) {
  padding: 0;
  list-style: none;
}

/* ---------- Hero ---------- */
.sp-hero {
  display: flex;
  align-items: flex-end;
  min-height: min(calc(100svh - 5.5rem), 42rem);
  --hero-shade:
    linear-gradient(to bottom, rgba(14, 36, 57, 0.25) 0%, rgba(11, 27, 42, 0.78) 100%),
    linear-gradient(90deg, rgba(11, 27, 42, 0.55) 0%, rgba(11, 27, 42, 0) 65%);
  --hero-position: center 45%;
  background: var(--color-navy-deep);
  color: var(--color-on-dark);
}

.sp-hero__content {
  padding-block: var(--space-9) var(--space-8);
}

.sp-hero__copy {
  max-width: 44rem;
}

.sp-hero__label {
  margin-bottom: var(--space-4);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ice);
}

.sp-hero__title {
  margin-bottom: var(--space-6);
  font-family: var(--font-serif);
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.1;
  color: var(--color-on-dark);
}

.sp-hero__title em {
  font-style: italic;
  color: var(--color-ice);
}

.sp-hero__lead {
  max-width: 36rem;
  font-size: 1rem;
  line-height: 1.625;
  color: #e5e7eb;
}

/* ---------- Sections ---------- */
.sp-section {
  padding-block: var(--space-section);
  scroll-margin-top: var(--header-height);
}

.sp-section--paper {
  background: var(--color-paper);
}

.sp-section--cloud {
  background: var(--color-cloud);
}

.sp-head {
  display: grid;
  justify-items: start;
  gap: var(--space-5);
  max-width: 48rem;
  margin-bottom: var(--space-7);
}

.sp-head--last {
  margin-bottom: 0;
}

.sp-label {
  margin-bottom: calc(var(--space-2) * -1);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.sp-title {
  font-family: var(--font-serif);
  font-size: var(--text-display);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: var(--color-ink);
}

.sp-title em {
  font-style: italic;
  color: var(--color-cobalt);
}

.sp-text {
  max-width: 40rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--color-muted);
}

.sp-item-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.25;
  color: var(--color-ink);
}

.sp-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4) var(--space-6);
  margin-top: var(--space-2);
}

.sp-note {
  max-width: 40rem;
  margin-top: var(--space-6);
  font-size: var(--text-small);
  line-height: 1.6;
  color: var(--color-muted);
}

/* ---------- What a supporter should be able to inspect ---------- */
.sp-inspect {
  max-width: 48rem;
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-ink);
}

.sp-list {
  margin-top: var(--space-5);
  border-top: 1px solid var(--color-line);
}

.sp-list li {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  gap: var(--space-3);
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--color-line);
  font-weight: 400;
  color: var(--color-ink);
}

.sp-list__num {
  padding-top: 0.2rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-cobalt);
}

.sp-inspect .sp-note {
  margin-top: var(--space-5);
}

.sp-inspect__download {
  display: inline-block;
  margin-top: var(--space-4);
}

/* ---------- Founding ambition ---------- */
.sp-routes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--color-ink);
  border-bottom: 1px solid var(--color-line);
}

.sp-routes__item {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding: var(--space-6) var(--space-6) var(--space-6) 0;
}

.sp-routes__item + .sp-routes__item {
  padding-right: 0;
  padding-left: var(--space-6);
  border-left: 1px solid var(--color-line);
}

.sp-routes__index {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  color: var(--color-cobalt);
}

.sp-disclosure {
  max-width: 48rem;
  margin-top: var(--space-7);
  padding: 0;
  border-top: 1px solid var(--color-ink);
  border-bottom: 1px solid var(--color-line);
}

.sp-disclosure__summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
  padding-block: var(--space-5);
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.35;
  color: var(--color-ink);
  list-style: none;
  cursor: pointer;
}

.sp-disclosure__summary::-webkit-details-marker {
  display: none;
}

.sp-disclosure__summary:hover {
  color: var(--color-cobalt);
}

.sp-disclosure__summary:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

.sp-disclosure__icon {
  position: relative;
  flex: none;
  width: 1rem;
  height: 1rem;
  color: var(--color-cobalt);
}

.sp-disclosure__icon::before,
.sp-disclosure__icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: currentColor;
  transition: transform var(--duration) var(--ease);
}

.sp-disclosure__icon::after {
  transform: rotate(90deg);
}

.sp-disclosure[open] .sp-disclosure__icon::after {
  transform: rotate(0deg);
}

.sp-disclosure__body {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  padding-bottom: var(--space-6);
}

.sp-disclosure__body p {
  margin: 0;
  max-width: 40rem;
}

/* ---------- Responsive ---------- */
@media (min-width: 640px) {
  .sp-hero__lead {
    font-size: 1.125rem;
  }
}

@media (max-width: 760px) {
  .sp-hero {
    min-height: calc(100svh - 7.75rem);
  }

  .sp-hero__content {
    padding-block: var(--space-9) var(--space-6);
  }

  .sp-routes {
    grid-template-columns: 1fr;
  }

  .sp-routes__item,
  .sp-routes__item + .sp-routes__item {
    padding: var(--space-5) 0;
  }

  .sp-routes__item + .sp-routes__item {
    border-left: 0;
    border-top: 1px solid var(--color-line);
  }

  .sp-actions .cta {
    width: 100%;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sp-disclosure__icon::before,
  .sp-disclosure__icon::after {
    transition: none;
  }
}

@media print {
  .sp-hero {
    min-height: 0;
    background: var(--color-paper);
    color: var(--color-ink);
  }

  .sp-hero__title,
  .sp-hero__lead {
    color: var(--color-ink);
  }

  .sp-hero__label,
  .sp-hero__title em {
    color: var(--color-cobalt);
  }
}
</style>
