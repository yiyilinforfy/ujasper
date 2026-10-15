<script setup lang="ts">
import AppLink from '../components/AppLink.vue'

interface LedgerEntry {
  title: string
  status: string
  complete: boolean
  text: string
  to: string
}

const ledger: LedgerEntry[] = [
  {
    title: 'Founding vision',
    status: 'Published',
    complete: true,
    text: 'Vincent Zhang’s original welcome, mission and educational declaration are available.',
    to: '/letter',
  },
  {
    title: 'Program design',
    status: 'Published',
    complete: true,
    text: 'A coherent academic plan, operating manual and learner materials are published; this is planning evidence.',
    to: '/publications',
  },
  {
    title: 'Name and legal structure',
    status: 'To confirm',
    complete: false,
    text: 'Obtain current written advice and any required authorization for the name, advertising, legal structure and intended activities. Review the existing public presentation.',
    to: '/sources#operating-sources',
  },
  {
    title: 'Local host and venue',
    status: 'To confirm',
    complete: false,
    text: 'Identify a responsible Jasper host and suitable space with agreed use, access and costs.',
    to: '/join/hosts',
  },
  {
    title: 'Teaching and activity team',
    status: 'To confirm',
    complete: false,
    text: 'Appoint qualified educators, coaches, field staff and a second tutorial educator with agreed workload and terms.',
    to: '/join/teachers',
  },
  {
    title: 'Permissions and insurance',
    status: 'To confirm',
    complete: false,
    text: 'Confirm route- and activity-specific permissions, any required licences and guide cards, insurance and emergency arrangements.',
    to: '/care',
  },
  {
    title: 'Reader and equipment',
    status: 'To prepare',
    complete: false,
    text: 'Assemble the selected reading excerpts with appropriate rights, accessible formats, source data, maps and tested materials.',
    to: '/read/curriculum',
  },
  {
    title: 'First costed milestone',
    status: 'To confirm',
    complete: false,
    text: 'Obtain quotations, identify the lawful funding recipient and agree deliverables, reporting and conditions if delivery cannot proceed.',
    to: '/support',
  },
  {
    title: 'Dates and admissions',
    status: 'Not open',
    complete: false,
    text: 'Publish the complete terms and review process only when the relevant delivery conditions are met.',
    to: '/join/students',
  },
]

const groups = [
  { id: 'completed', heading: 'Completed', entries: ledger.filter(entry => entry.complete) },
  { id: 'outstanding', heading: 'Outstanding', entries: ledger.filter(entry => !entry.complete) },
]

const milestones = [
  {
    title: 'An introductory Jasper gathering',
    text: 'A possible one- or two-day demonstration with its own scope, staffing, permissions and cost. It would test teaching and gather feedback. No date is announced, and it would not count as completing the Field Semester.',
  },
  {
    title: 'The six-week Field Semester',
    text: 'The complete 168-hour academic commitment and proposed camps. It requires the full teaching and operating arrangements, separate from any shorter gathering. Evidence from an introductory event may inform a later decision to proceed.',
  },
]
</script>

<template>
  <div class="fp">
    <section id="progress" class="fp-section fp-section--paper" aria-labelledby="fp-title">
      <div class="container">
        <div class="fp-head">
          <p class="fp-label">Founding progress · 15 October 2026</p>
          <h1 id="fp-title" class="fp-title">Make the next step<br><em>visible.</em></h1>
          <p class="fp-text">
            The vision is established. The delivery commitments still need people, resources and confirmation. This page
            separates published planning from an operating program.
          </p>
        </div>

        <div class="fp-ledger">
          <section
            v-for="group in groups"
            :key="group.id"
            class="fp-group"
            :class="`fp-group--${group.id}`"
            :aria-labelledby="`fp-group-${group.id}`"
          >
            <h2 :id="`fp-group-${group.id}`" class="fp-group__heading">
              {{ group.heading }}
              <span class="fp-group__count">{{ group.entries.length }}</span>
            </h2>
            <ul class="fp-group__list" role="list">
              <li v-for="entry in group.entries" :key="entry.title" class="fp-entry">
                <div class="fp-entry__head">
                  <h3 class="fp-entry__title">{{ entry.title }}</h3>
                  <p class="fp-status" :class="entry.complete ? 'fp-status--complete' : 'fp-status--open'">
                    <span class="fp-status__mark" aria-hidden="true"></span>
                    <span><span class="visually-hidden">Status: </span>{{ entry.status }}</span>
                  </p>
                </div>
                <p class="fp-text fp-entry__text">{{ entry.text }}</p>
                <div class="fp-entry__link">
                  <AppLink class="link" :to="entry.to">
                    Explore<span class="visually-hidden">: {{ entry.title }}</span> <span aria-hidden="true">→</span>
                  </AppLink>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <p class="fp-note">
          Publication review date: 15 October 2026. These are published status statements, not independent
          certifications or evidence that negotiations have begun. New confirmations will identify the responsible people
          and supporting evidence.
        </p>
      </div>
    </section>

    <section id="milestones" class="fp-section fp-section--cloud" aria-labelledby="fp-milestones-title">
      <div class="container">
        <div class="fp-head">
          <p class="fp-label">Two different milestones</p>
          <h2 id="fp-milestones-title" class="fp-title">A first gathering.<br><em>Then a Field Semester.</em></h2>
        </div>

        <ul class="fp-milestones" role="list">
          <li v-for="milestone in milestones" :key="milestone.title" class="fp-milestones__item">
            <h3 class="fp-item-title">{{ milestone.title }}</h3>
            <p class="fp-text">{{ milestone.text }}</p>
          </li>
        </ul>

        <div class="fp-actions">
          <a class="cta cta--primary" href="mailto:vincent@ujasper.ca?subject=Jasper%20founding%20inquiry">
            Discuss a concrete contribution
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fp {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-variant-numeric: lining-nums;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
}

.fp :where(h1, h2, h3, p, ul, li) {
  margin: 0;
}

.fp :where(ul) {
  padding: 0;
  list-style: none;
}

/* ---------- Sections ---------- */
.fp-section {
  padding-block: var(--space-section);
  scroll-margin-top: var(--header-height);
}

.fp-section--paper {
  background: var(--color-paper);
}

.fp-section--cloud {
  background: var(--color-cloud);
}

.fp-head {
  display: grid;
  justify-items: start;
  gap: var(--space-5);
  max-width: 48rem;
  margin-bottom: var(--space-7);
}

.fp-label {
  margin-bottom: calc(var(--space-2) * -1);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.fp-title {
  font-family: var(--font-serif);
  font-size: var(--text-display);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: var(--color-ink);
}

.fp-title em {
  font-style: italic;
  color: var(--color-cobalt);
}

.fp-text {
  max-width: 40rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--color-muted);
}

.fp-item-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.25;
  color: var(--color-ink);
}

.fp-note {
  max-width: 48rem;
  margin-top: var(--space-6);
  font-size: var(--text-small);
  line-height: 1.6;
  color: var(--color-muted);
}

.fp-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-7);
}

/* ---------- Status ledger ---------- */
.fp-ledger {
  display: grid;
  gap: var(--space-7);
}

.fp-group__heading {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-ink);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--color-ink);
}

.fp-group__count {
  font-weight: 500;
  color: var(--color-muted);
}

.fp-entry {
  display: grid;
  grid-template-columns: minmax(0, 17rem) minmax(0, 1fr) auto;
  align-items: start;
  gap: var(--space-3) var(--space-7);
  padding-block: var(--space-5);
  border-bottom: 1px solid var(--color-line);
}

.fp-entry__head {
  display: grid;
  justify-items: start;
  gap: var(--space-2);
}

.fp-entry__title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.25;
  color: var(--color-ink);
}

.fp-entry__text {
  padding-top: 0.2rem;
}

.fp-entry__link {
  padding-top: 0.2rem;
  white-space: nowrap;
}

/* Status: text label plus a shape (filled for complete, open for outstanding), never colour alone. */
.fp-status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
}

.fp-status__mark {
  flex: none;
  width: 0.625rem;
  height: 0.625rem;
  border: 1.5px solid currentColor;
}

.fp-status--complete {
  color: var(--color-cobalt);
}

.fp-status--complete .fp-status__mark {
  background: currentColor;
}

.fp-status--open {
  color: var(--color-muted);
}

/* ---------- Two milestones ---------- */
.fp-milestones {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--color-ink);
  border-bottom: 1px solid var(--color-line);
}

.fp-milestones__item {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding: var(--space-6) var(--space-6) var(--space-6) 0;
}

.fp-milestones__item + .fp-milestones__item {
  padding-right: 0;
  padding-left: var(--space-6);
  border-left: 1px solid var(--color-line);
}

/* ---------- Focus ---------- */
.fp a:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

/* ---------- Responsive ---------- */
@media (max-width: 1000px) {
  .fp-entry {
    grid-template-columns: minmax(0, 15rem) minmax(0, 1fr);
  }

  .fp-entry__link {
    grid-column: 2;
  }
}

@media (max-width: 760px) {
  .fp-entry {
    grid-template-columns: 1fr;
  }

  .fp-entry__link {
    grid-column: auto;
  }

  .fp-entry__text,
  .fp-entry__link {
    padding-top: 0;
  }

  .fp-milestones {
    grid-template-columns: 1fr;
  }

  .fp-milestones__item,
  .fp-milestones__item + .fp-milestones__item {
    padding: var(--space-5) 0;
  }

  .fp-milestones__item + .fp-milestones__item {
    border-left: 0;
    border-top: 1px solid var(--color-line);
  }

  .fp-actions .cta {
    width: 100%;
    justify-content: center;
  }
}
</style>
