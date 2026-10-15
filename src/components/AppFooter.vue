<script setup lang="ts">
import AppLink from './AppLink.vue'

const information = [
  { to: '/letter', label: 'Founder’s letter and song' },
  { to: '/founding', label: 'Founding progress' },
  { to: '/care', label: 'Care and privacy' },
  { to: '/sources', label: 'Sources and credits' },
  { to: '/fieldbook', label: 'Personal fieldbook' },
]
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__grid">
      <div class="site-footer__identity">
        <p class="site-footer__name">University of Jasper</p>
        <p class="site-footer__motto">Strong in body. Free in mind.<br>One University → One Family</p>
      </div>
      <nav class="site-footer__group site-footer__group--status" aria-label="Information">
        <h2 class="site-footer__heading">Information</h2>
        <AppLink v-for="link in information" :key="link.to" :to="link.to">{{ link.label }}</AppLink>
      </nav>
      <div class="site-footer__group">
        <h2 class="site-footer__heading">Contact</h2>
        <p>Vincent Zhang · Founder</p>
        <a href="mailto:vincent@ujasper.ca">vincent@ujasper.ca</a>
        <p>General inquiries welcome. Formal admissions and appointments are not open.</p>
      </div>
    </div>
    <div class="site-footer__bottom">
      <p>© 2026 University of Jasper · 15 October 2026</p>
      <p>Founding project · Proposed non-degree Field Semester</p>
    </div>
  </footer>
</template>
