<script setup lang="ts">
import AppLink from '../components/AppLink.vue'

const sections = [
  {
    id: 'vision',
    label: 'Vision',
    title: 'A university for the world,',
    emphasis: 'rooted in Jasper.',
    paragraphs: [
      'We aim to establish in Jasper a university for the world, where people of every culture and background develop physical strength, depth of knowledge, independent minds and integrity.',
      'We envision a community that lasts a lifetime. Its members defend freedom, pursue truth, create with courage and accept public responsibility, and they advance human flourishing through their own growth, the example they set and what they contribute to others.',
    ],
  },
  {
    id: 'mission',
    label: 'Mission',
    title: 'Body, humanities and inquiry,',
    emphasis: 'in one education.',
    paragraphs: [
      'We bring physical training, the world’s humanities and fundamental inquiry into a single education, taught together rather than in separate departments. Teaching moves between the trail, the seminar room and the laboratory: life in nature, lectures, close dialogue, debate, field study, experiments and shared projects.',
      'We want graduates who judge for themselves, keep their discipline when the work is hard, take initiative and care about justice.',
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations',
    title: 'Body. Humanity.',
    emphasis: 'Fundamental inquiry.',
    paragraphs: [
      'The body is educated alongside the mind. Substantial outdoor practice and progressive physical training are part of everyday life, so learners build strength, endurance, coordination and resilience, and learn to make sound decisions as conditions change. Challenge is adapted to each person and includes recovery, restraint and care for one another; what counts is lasting progress and dependable action.',
      'The humanities are read across civilizations. Learners study philosophy, history, literature, art, ethics and social thought through named texts in context, weigh their achievements and their limits, and engage with real disagreement. Through comparison, debate and practice they learn to think freely, act with integrity and lead with care for others.',
      'Mathematics and the sciences are learned as they were made: by asking, testing and revising. Learners build foundations in mathematics, physics, chemistry and economics, starting from nature, social life and unresolved questions and working through abstraction, deduction, observation, experiment, modelling and argument. Teachers and learners investigate together, publish their methods and revise explanations in light of evidence.',
    ],
  },
  {
    id: 'ai',
    label: 'AI & agency',
    title: 'Extend our reach.',
    emphasis: 'Deepen our judgment.',
    paragraphs: [
      'AI runs through all three foundations as a tool for learning and research. It widens what a learner can explore; it does not do the learner’s thinking. Learners form their own questions first, use AI to explore, compare, model and make, check every consequential claim, and remain responsible for the work.',
      'AI assistance is disclosed, and privacy, authorship and the social effects of technology are studied as part of the curriculum.',
    ],
  },
  {
    id: 'community',
    label: 'Community',
    title: 'One University.',
    emphasis: 'One Family.',
    paragraphs: [
      'We are building a lifelong commitment to mutual care across ancestry, nationality, ethnicity and race, founded on honesty, generosity and keeping our word. Belonging includes the freedom to disagree, to think independently and to choose one’s own path.',
      'Members protect honest questions, independent inquiry and reasoned disagreement. They take on difficult work with judgment, rest and self-discipline; pursue rigour and originality while accounting for their methods, promises and consequences; read traditions in context and carry their wisdom forward through dialogue; and build lifelong ties on equal dignity and care.',
    ],
  },
]

const declaration = [
  'A university is a place where a person is formed. At Jasper, physical practice, deep study, independent judgment and character belong to one education. Knowledge should enter life; courage should be guided by reason; excellence should become visible in what we contribute to others.',
  'We draw inspiration from ancient Greek inquiry and its education of body and mind; from Bologna’s tradition of protecting scholars; from Vienna’s research culture; from classical study and close discussion at Oxford and Cambridge; from the agency expressed in Harvard’s elective tradition; and from Humboldt’s ideal of joining teaching and research. We bring these inspirations into conversation with the intellectual and cultural resources of civilizations around the world.',
  'As AI and robotics extend what people can do, education must deepen what people can understand, judge and take responsibility for. We want learners to ask worthwhile questions, examine evidence, create knowledge and remain accountable for their choices.',
  'Nature is a source of physical challenge, attention and original questions. Mathematics, physics, chemistry and economics provide foundations for inquiry. History, philosophy, literature, art and ethics help us examine what our knowledge is for.',
  'Excellence shows in character, achievement and contribution. A diverse community can carry valuable traditions forward through study, criticism and renewal. Leadership means taking initiative, serving others and helping people act together.',
  'University of Jasper aspires to be a community of strength, learning, freedom and restraint, held together by courage and care. Its members should set an example through their work and their lives, and sustain a lifelong commitment to helping one another.',
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
          <div class="vp-body">
            <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="declaration" class="vp-section vp-section--cloud" aria-labelledby="declaration-title">
      <div class="container">
        <div class="vp-column">
          <p class="vp-label">{{ pad(sections.length + 1) }} — The founding educational declaration</p>
          <h2 id="declaration-title" class="vp-title">Education measured<br><em>by the person we become.</em></h2>
          <p class="vp-credit">Founding vision by Vincent Zhang</p>
          <div class="vp-body">
            <p v-for="paragraph in declaration" :key="paragraph">{{ paragraph }}</p>
          </div>
          <p class="vp-note">
            The historical traditions named above are sources of inspiration, not claims of affiliation or endorsement.
            <AppLink class="link" to="/sources#educational-traditions">Read the historical notes and sources</AppLink>
          </p>
          <p class="vp-song">
            <AppLink class="link" to="/#jasper-song">Jasper Dream Crying, the founder’s song of place and memory <span aria-hidden="true">↗</span></AppLink>
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

.vp :where(h1, h2, p) {
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

.vp-body p {
  font-family: var(--font-serif);
  font-size: clamp(1.0625rem, 1.4vw, 1.1875rem);
  line-height: 1.8;
  color: var(--color-ink);
}

.vp-body p + p {
  margin-top: var(--space-5);
}

.vp-credit {
  margin: calc(var(--space-6) * -1 + var(--space-3)) 0 var(--space-6);
  font-size: var(--text-small);
  color: var(--color-muted);
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

.vp-song {
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
