<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
import { imageUrl } from '../images'

const pathways = [
  { to: '/join/teachers', title: 'Teach in the field semester', image: 'teach-classroom' },
  { to: '/join/students', title: 'Apply for the field semester', image: 'apply-signing' },
  { to: '/join/hosts', title: 'Offer a place, a skill or a hand in founding', image: 'join-hosts' },
  { to: '/support', title: 'Help found the university', image: 'founding-chairs' },
]
</script>

<template>
  <section class="join" aria-labelledby="join-title">
    <div class="container join__inner">
      <div class="join__copy">
        <p class="join__label">Join us</p>
        <h1 id="join-title" class="join__title">We are recruiting <em>teachers, students and hosts.</em></h1>
        <p class="join__text">
          Choose the entry that fits you. Each one opens an application form: fill it in, download your answers and
          email them to us. Formal admissions and appointments are not open yet. Forms prepare a draft on your device and
          never submit automatically; a draft is not an application, reservation or offer. General inquiries:
          <a href="mailto:vincent@ujasper.ca">vincent@ujasper.ca</a>.
        </p>
      </div>

      <ul class="join__cards">
        <li v-for="item in pathways" :key="item.to">
          <AppLink class="join-card" :to="item.to" :style="{ '--join-card-image': `url('${imageUrl(item.image, 960)}')` }">
            <span class="join-card__title">{{ item.title }} <span aria-hidden="true">→</span></span>
          </AppLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.join {
  display: grid;
  align-items: center;
  min-height: calc(100svh - var(--header-height));
  padding-block: var(--space-7);
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
}

.join :where(h1, p, ul) {
  margin: 0;
}

.join__inner {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  align-items: center;
  gap: var(--space-8);
}

.join__label {
  margin-bottom: var(--space-4);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.join__title {
  font-family: var(--font-serif);
  font-size: var(--text-display);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.join__title em {
  display: block;
  color: var(--color-cobalt);
}

.join__text {
  max-width: 40rem;
  margin-top: var(--space-5);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--color-muted);
}

.join__text a {
  color: inherit;
}

.join__cards {
  display: grid;
  gap: var(--space-3);
  padding: 0;
  list-style: none;
}

.join-card {
  position: relative;
  display: grid;
  align-content: end;
  gap: 0.375rem;
  min-height: 9.5rem;
  padding: var(--space-5) var(--space-6);
  overflow: hidden;
  background:
    linear-gradient(90deg, rgba(8, 23, 38, 0.82), rgba(8, 23, 38, 0.35)),
    var(--join-card-image) center / cover no-repeat;
  color: #fff;
  text-decoration: none;
  transition: background-size var(--duration) var(--ease);
}

.join-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(8, 23, 38, 0);
  transition: background-color var(--duration) var(--ease);
}

.join-card:hover::after {
  background: rgba(8, 23, 38, 0.18);
}

.join-card > * {
  position: relative;
  z-index: 1;
}

.join-card__title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  line-height: 1.25;
}

.join-card:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

@media (max-width: 900px) {
  .join {
    min-height: 0;
  }

  .join__inner {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}
</style>
