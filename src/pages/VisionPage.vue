<script setup lang="ts">
import AppLink from '../components/AppLink.vue'

const foundations = [
  {
    title: 'Physical capability',
    text: 'Train with purpose, practise restraint and learn to judge changing conditions. Recovery, consent and adaptation are part of demanding work.',
  },
  {
    title: 'Humanistic depth',
    text: 'Read named texts in context, question inherited assumptions and understand an opposing case before answering it.',
  },
  {
    title: 'Fundamental inquiry',
    text: 'Move from a worthwhile question through mathematics, observation, modelling and experiment to an explanation others can examine.',
  },
]

const declaration = [
  'A university is a place for the formation of a person. At Jasper, physical practice, deep study, independent judgment and character belong in one education. Knowledge should enter life; courage should be guided by reason; excellence should become visible in what we contribute to others.',
  'We draw inspiration from ancient Greek inquiry and the education of body and mind; Bologna\'s traditions of protecting scholars; Vienna\'s research culture; classical study and close discussion at Oxford and Cambridge; the agency expressed in Harvard\'s elective tradition; and Humboldt\'s ideal of linking teaching and research. We bring these inspirations into conversation with the intellectual and cultural resources of civilizations around the world.',
  'As AI and robotics extend what people can do, education must deepen what people can understand, judge and take responsibility for. We want learners to ask worthwhile questions, examine evidence, create knowledge and remain accountable for their choices.',
  'Nature is a source of physical challenge, attention and original questions. Mathematics, physics, chemistry and economics provide foundations for inquiry. History, philosophy, literature, art and ethics help us examine what our knowledge is for.',
  'Excellence is expressed through character, achievement and contribution. A diverse community can carry valuable traditions forward through study, criticism and renewal. Leadership means taking initiative, serving others and enabling people to act together.',
  'University of Jasper aspires to a community of strength, learning, freedom and restraint, joined by courage and care. Its members should set examples through their work and their lives, sustaining a lifelong commitment to mutual help.',
]

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="vp">
    <section id="vision" class="vp-section vp-section--paper vp-intro" aria-labelledby="vision-title">
      <div class="container">
        <div class="vp-column">
          <p class="vp-label">Vision and mission</p>
          <h1 id="vision-title" class="vp-title">A university for the world.<br><em>Rooted in Jasper.</em></h1>
          <div class="vp-body">
            <p>
              To establish in Jasper a university for the world, where people across cultures and backgrounds develop
              physical strength, depth of knowledge, independent minds and integrity. We envision a lifelong community
              that defends freedom, pursues truth, creates with courage and accepts public responsibility, whose members
              advance human flourishing through their own growth, their example and their contribution to others.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="mission" class="vp-section vp-section--cloud" aria-labelledby="mission-title">
      <div class="container">
        <div class="vp-column">
          <p class="vp-label">Our mission</p>
          <h2 id="mission-title" class="vp-title">Body, humanities<br><em>and inquiry.</em></h2>
          <div class="vp-body">
            <p>
              We unite sustained physical training, humanistic learning across civilizations, and original inquiry in
              mathematics, physics, chemistry and economics. Through nature, lectures, dialogue, debate, experiments and
              shared work, we develop courage, independent judgment, initiative, self-discipline and a commitment to
              justice.
            </p>
          </div>
          <p class="vp-note">
            This is the long-term educational purpose. The first Field Semester offers introductory work toward it; it is
            not a degree curriculum or a claim of disciplinary mastery.
          </p>
        </div>
      </div>
    </section>

    <section id="foundations" class="vp-section vp-section--paper" aria-label="Three foundations">
      <div class="container">
        <ol class="vp-column vp-foundations">
          <li v-for="(item, i) in foundations" :key="item.title" class="vp-foundation">
            <span class="vp-foundation__index">{{ pad(i + 1) }}</span>
            <h3 class="vp-foundation__title">{{ item.title }}</h3>
            <p class="vp-foundation__text">{{ item.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section id="community" class="vp-section vp-section--cloud" aria-label="Independence and community">
      <div class="container">
        <div class="vp-column">
          <div class="vp-block">
            <h2 class="vp-title">Independent first.<br><em>Connected with judgment.</em></h2>
            <div class="vp-body">
              <p>
                AI may extend the university’s future inquiry. In the first semester, learners build and preserve
                original work offline. A separately arranged optional AI Return Lab asks what a model adds, gets wrong or
                leaves unexplained.
              </p>
            </div>
          </div>
          <div class="vp-block">
            <h2 class="vp-title">One University.<br><em>One Family.</em></h2>
            <div class="vp-body">
              <p>
                One University → One Family is a lifelong commitment to mutual care across ancestry, nationality,
                ethnicity and race. We build trust through honesty, generosity and keeping our word. Belonging includes the
                freedom to disagree, think independently and choose one's own path.
              </p>
              <p>
                A strong community protects dissent. No learner is assessed on private beliefs, obedience to the founder
                or willingness to disclose personal reflection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="declaration" class="vp-section vp-section--paper" aria-label="The founding educational declaration">
      <div class="container">
        <div class="vp-column">
          <details class="vp-declaration">
            <summary class="vp-declaration__summary">
              <span>Read Vincent Zhang’s complete founding educational declaration</span>
              <span class="vp-declaration__icon" aria-hidden="true"></span>
            </summary>
            <div class="vp-body vp-declaration__body">
              <p v-for="paragraph in declaration" :key="paragraph">{{ paragraph }}</p>
            </div>
            <p class="vp-note">Historical traditions are inspirations, not affiliations or endorsements.</p>
            <p class="vp-note">
              <AppLink class="link" to="/sources">Historical notes and sources</AppLink>
            </p>
          </details>
          <div class="vp-actions">
            <AppLink class="cta cta--primary" to="/program">
              Explore the first program <span class="cta__arrow" aria-hidden="true">→</span>
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.vp {
  --vp-rule: var(--color-line);

  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-variant-numeric: lining-nums;
  font-size: var(--text-body);
  font-weight: 300;
  line-height: 1.625;
}

.vp :where(h1, h2, h3, p, ol, details) {
  margin: 0;
}

/* ---------- Sections: one reading column of plain text ---------- */
.vp-section {
  padding-block: var(--space-section);
  scroll-margin-top: var(--header-height);
}

.vp-section--paper {
  background: var(--color-paper);
}

.vp-section--cloud {
  background: var(--color-cloud);
}

.vp-intro {
  padding-top: var(--space-8);
}

.vp-column {
  max-width: 46rem;
  margin-inline: auto;
}

.vp-label {
  margin-bottom: var(--space-4);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.vp .vp-title {
  margin-bottom: var(--space-6);
  font-family: var(--font-serif);
  font-size: var(--text-display);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: var(--color-ink);
}

.vp-title em {
  font-style: italic;
  color: var(--color-cobalt);
}

.vp-body p {
  font-family: var(--font-serif);
  font-size: clamp(1.0625rem, 1.4vw, 1.1875rem);
  line-height: 1.8;
  color: var(--color-ink);
}

.vp-body p + p {
  margin-top: var(--space-5);
}

.vp-note {
  max-width: 40rem;
  margin-top: var(--space-6);
  font-size: 1rem;
  line-height: 1.625;
  color: var(--color-muted);
}

.vp-note + .vp-note {
  margin-top: var(--space-3);
}

/* ---------- Three foundations: numbered items on thin rules ---------- */
.vp-foundations {
  padding: 0;
  border-top: 1px solid var(--color-ink);
  list-style: none;
}

.vp-foundation {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  column-gap: var(--space-5);
  padding-block: var(--space-6);
  border-bottom: 1px solid var(--vp-rule);
}

.vp-foundation__index {
  grid-row: span 2;
  padding-top: 0.45rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  color: var(--color-cobalt);
}

.vp .vp-foundation__title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.015em;
  line-height: 1.3;
  color: var(--color-ink);
}

.vp-foundation__text {
  max-width: 40rem;
  margin-top: var(--space-3);
  color: var(--color-muted);
}

/* ---------- Two stacked statements separated by a rule ---------- */
.vp-block + .vp-block {
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--vp-rule);
}

/* ---------- Declaration ---------- */
.vp .vp-declaration {
  padding: 0;
  border-top: 1px solid var(--color-ink);
  border-bottom: 1px solid var(--vp-rule);
}

.vp-declaration__summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
  padding-block: var(--space-6);
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: -0.015em;
  color: var(--color-ink);
  list-style: none;
  cursor: pointer;
}

.vp-declaration__summary::-webkit-details-marker {
  display: none;
}

.vp-declaration__summary:hover {
  color: var(--color-cobalt);
}

.vp-declaration__summary:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

.vp-declaration__icon {
  position: relative;
  flex: none;
  width: 1rem;
  height: 1rem;
}

.vp-declaration__icon::before,
.vp-declaration__icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transition: transform var(--duration) var(--ease);
}

.vp-declaration__icon::after {
  transform: rotate(90deg);
}

.vp-declaration[open] .vp-declaration__icon::after {
  transform: rotate(0deg);
}

.vp-declaration__body {
  padding-top: var(--space-2);
}

.vp-declaration > .vp-note:last-child {
  padding-bottom: var(--space-6);
}

.vp-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4) var(--space-6);
  margin-top: var(--space-7);
}

/* ---------- Focus ---------- */
.vp a:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .vp-foundation {
    grid-template-columns: 1fr;
  }

  .vp-foundation__index {
    grid-row: auto;
    padding-top: 0;
    margin-bottom: var(--space-2);
  }
}
</style>
