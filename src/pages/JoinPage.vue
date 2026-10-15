<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import '../styles/pathway.css'

const pathways = [
  {
    to: '/join/students',
    title: 'Bring a question',
    text: 'Explore the Field Semester and prepare a thoughtful introduction.',
    image: 'apply-signing',
  },
  {
    to: '/join/teachers',
    title: 'Teach something that matters',
    text: 'Help a learner see, test and explain what they could not before.',
    image: 'teach-classroom',
  },
  {
    to: '/join/hosts',
    title: 'Make a place for learning',
    text: 'Offer a local connection, a session, resources or a useful task.',
    image: 'join-hosts',
  },
  {
    to: '/support',
    title: 'Help establish the first chapter',
    text: 'Start with people, a defined milestone and evidence.',
    image: 'founding-chairs',
  },
]
</script>

<template>
  <div class="pw">
    <section class="pw-section j-intro" aria-labelledby="join-title">
      <div class="container">
        <div class="pw-head j-intro__head">
          <p class="pw-label">The founding community</p>
          <h1 id="join-title" class="pw-title">A school begins<br><em>with people.</em></h1>
          <p class="pw-text">
            Bring intellectual depth, practical skill, local knowledge or a question worth pursuing. There are several
            ways to help shape the first chapter.
          </p>
        </div>
      </div>
    </section>

    <section class="pw-section pw-section--cloud" aria-labelledby="ways-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">Choose your way in</p>
          <h2 id="ways-title" class="pw-title">What would you<br><em>bring to Jasper?</em></h2>
          <p class="pw-text">
            General inquiries are welcome at vincent@ujasper.ca. Formal admissions and appointments are not open. Website
            forms prepare local drafts and never submit automatically; a draft is not an application, reservation or
            offer.
          </p>
          <p class="pw-actions">
            <a class="cta cta--primary" href="mailto:vincent@ujasper.ca?subject=University%20of%20Jasper%20inquiry">
              Send a general inquiry <span class="cta__arrow" aria-hidden="true">→</span>
            </a>
          </p>
        </div>
        <ul class="pw-roles">
          <li v-for="item in pathways" :key="item.to">
            <AppLink class="pw-role" :to="item.to">
              <span class="pw-role__media">
                <ResponsiveImage :name="item.image" sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 18rem" />
              </span>
              <h3 class="pw-item-title">{{ item.title }}</h3>
              <span class="pw-role__text">{{ item.text }}</span>
              <span class="pw-role__arrow" aria-hidden="true">→</span>
            </AppLink>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.j-intro {
  padding-bottom: var(--space-7);
}

.j-intro__head {
  margin-bottom: 0;
}
</style>
