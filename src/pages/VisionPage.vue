<script setup lang="ts">
import AppLink from '../components/AppLink.vue'

interface VisionSection {
  id: string
  label: string
  title: string
  emphasis: string
  paragraphs: string[]
  items?: { title: string; text: string }[]
}

const sections: VisionSection[] = [
  {
    id: 'vision',
    label: 'Vision and mission',
    title: 'A university for the world.',
    emphasis: 'Rooted in Jasper.',
    paragraphs: [
      'To establish in Jasper a university for the world, where people across cultures and backgrounds develop physical strength, depth of knowledge, independent minds and integrity. We envision a lifelong community that defends freedom, pursues truth, creates with courage and accepts public responsibility, whose members advance human flourishing through their own growth, their example and their contribution to others.',
    ],
  },
  {
    id: 'mission',
    label: 'Our mission',
    title: 'Body, humanities',
    emphasis: 'and inquiry.',
    paragraphs: [
      'We unite sustained physical training, humanistic learning across civilizations, and original inquiry in mathematics, physics, chemistry and economics. Through nature, lectures, dialogue, debate, experiments and shared work, we develop courage, independent judgment, initiative, self-discipline and a commitment to justice.',
      'This is the long-term educational purpose. The first Field Semester offers introductory work toward it; it is not a degree curriculum or a claim of disciplinary mastery.',
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations',
    title: 'The three foundations',
    emphasis: 'belong together.',
    paragraphs: [],
    items: [
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
    ],
  },
  {
    id: 'ai',
    label: 'AI & agency',
    title: 'Independent first.',
    emphasis: 'Connected with judgment.',
    paragraphs: [
      'AI may extend the university’s future inquiry. In the first semester, learners build and preserve original work offline. A separately arranged optional AI Return Lab asks what a model adds, gets wrong or leaves unexplained.',
    ],
  },
  {
    id: 'community',
    label: 'Community',
    title: 'One University.',
    emphasis: 'One Family.',
    paragraphs: [
      'One University → One Family is a lifelong commitment to mutual care across ancestry, nationality, ethnicity and race. We build trust through honesty, generosity and keeping our word. Belonging includes the freedom to disagree, think independently and choose one\'s own path.',
      'A strong community protects dissent. No learner is assessed on private beliefs, obedience to the founder or willingness to disclose personal reflection.',
    ],
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
    <section
      v-for="(section, i) in sections"
      :id="section.id"
      :key="section.id"
      class="vp-section"
      :class="i % 2 ? 'vp-section--cloud' : 'vp-section--paper'"
      :aria-labelledby="`${section.id}-title`"
    >
      <div class="container">
        <div class="vp-column">
          <p class="vp-label">{{ pad(i + 1) }} — {{ section.label }}</p>
          <component :is="i === 0 ? 'h1' : 'h2'" :id="`${section.id}-title`" class="vp-title">
            {{ section.title }}<br><em>{{ section.emphasis }}</em>
          </component>
          <div v-if="section.paragraphs.length" class="vp-body">
            <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          </div>
          <ol v-if="section.items" class="vp-items">
            <li v-for="(item, j) in section.items" :key="item.title" class="vp-item">
              <h3 class="vp-item__title">
                <span class="vp-item__index">{{ pad(j + 1) }}</span>
                {{ item.title }}
              </h3>
              <p class="vp-item__text">{{ item.text }}</p>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section id="declaration" class="vp-section vp-section--cloud" aria-labelledby="declaration-title">
      <div class="container">
        <div class="vp-column">
          <p class="vp-label">{{ pad(sections.length + 1) }} — Declaration</p>
          <h2 id="declaration-title" class="vp-title">Vincent Zhang’s complete<br><em>founding educational declaration.</em></h2>
          <div class="vp-body">
            <p v-for="paragraph in declaration" :key="paragraph">{{ paragraph }}</p>
          </div>
          <p class="vp-note">
            Historical traditions are inspirations, not affiliations or endorsements.
            <AppLink class="link" to="/sources#educational-traditions">Historical notes and sources</AppLink>
          </p>
          <p class="vp-next">
            <AppLink class="cta cta--primary" to="/program">
              Explore the first program <span class="cta__arrow" aria-hidden="true">→</span>
            </AppLink>
          </p>
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

.vp :where(h1, h2, h3, p, ol) {
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

.vp-title {
  margin-bottom: var(--space-6);
  font-family: var(--font-serif);
  font-size: var(--text-display);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.vp-title em {
  font-style: italic;
  color: var(--color-cobalt);
}

.vp-body p,
.vp-item__text {
  font-family: var(--font-serif);
  font-size: clamp(1.0625rem, 1.4vw, 1.1875rem);
  line-height: 1.8;
  color: var(--color-ink);
}

.vp-body p + p {
  margin-top: var(--space-5);
}

/* ---------- Foundations: numbered items divided by thin rules ---------- */
.vp-items {
  padding: 0;
  list-style: none;
}

.vp-item {
  padding-top: var(--space-5);
  border-top: 1px solid var(--vp-rule);
}

.vp-item:first-child {
  border-top-color: var(--color-ink);
}

.vp-item + .vp-item {
  margin-top: var(--space-6);
}

.vp-item__title {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.2;
}

.vp-item__index {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  color: var(--color-cobalt);
}

.vp-note {
  margin-top: var(--space-6);
  font-size: var(--text-small);
  line-height: 1.6;
  color: var(--color-muted);
}

.vp-note .link {
  font-size: inherit;
}

.vp-next {
  margin-top: var(--space-6);
  padding-top: var(--space-5);
  border-top: 1px solid var(--vp-rule);
}

/* ---------- Focus ---------- */
.vp a:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}
</style>
