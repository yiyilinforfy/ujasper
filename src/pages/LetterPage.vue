<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
</script>

<template>
  <div class="lt">
    <section class="lt-section lt-section--paper lt-intro" aria-labelledby="lt-title">
      <div class="container">
        <div class="lt-head">
          <p class="lt-label">THE FOUNDING LETTER / VINCENT ZHANG</p>
          <h1 id="lt-title" class="lt-title lt-title--hero">A responsibility<br>to the <em>world.</em></h1>
          <p class="lt-copy">A dream begun in 2015.<br>An invitation to the people who will give it life.</p>
        </div>
      </div>
    </section>

    <section class="lt-section lt-section--cloud" aria-label="The original conviction">
      <div class="container">
        <div class="lt-head">
          <p class="lt-label">THE ORIGINAL CONVICTION</p>
          <blockquote class="lt-quote">“We human beings have our special responsibilities to make our society and world better.”</blockquote>
          <p class="lt-note">From the recovered founding letter, identified by the founder as written in 2015.</p>
          <a class="link" href="/founding-charter.pdf">Read the founding charter ↗</a>
        </div>
      </div>
    </section>

    <section class="lt-section lt-section--paper" aria-labelledby="lt-welcome-title">
      <div class="container">
        <article class="lt-letter">
          <p class="lt-label">A WELCOME FROM VINCENT ZHANG</p>
          <h2 id="lt-welcome-title" class="lt-title">Let us build<br><em>this together.</em></h2>
          <p class="lt-note">A contemporary adaptation of the original letter’s ideas, prepared for the final English founding edition.</p>
          <div class="lt-body">
            <p>Welcome to University of Jasper. My dream is to build a place where education reaches the whole person: our physical capacities, our understanding of the world and the responsibility we take for one another.</p>
            <p>In my founding letter, I wrote that we have a responsibility to make our society and our world better. That conviction remains the starting point. Knowledge matters because of what we can understand, create and contribute through it.</p>
            <p>I imagine people from different cultures coming to Jasper to learn together. We would train outdoors, investigate nature, read deeply, question inherited ideas and test our own. We would study the wisdom of ancient civilizations with the freedom to disagree and the courage to carry something valuable forward.</p>
            <p>As technology becomes more powerful, I want us to become more capable: attentive, physically prepared, intellectually independent and responsible for what we create. Ambition should demand something of us. It should make us more honest in our work and more generous toward others.</p>
            <p>One University → One Family expresses the community I hope we will build: a place of mutual care across borders and backgrounds, where belonging protects the freedom to think for yourself. Come with a difficult question, a willingness to practise and something you hope to give. Let us build this together.</p>
          </div>
          <div class="lt-signature">
            <strong>Vincent Zhang</strong>
            <span>Founder · University of Jasper</span>
          </div>
        </article>
      </div>
    </section>

    <section class="lt-section lt-section--cloud" aria-labelledby="lt-close-title">
      <div class="container">
        <div class="lt-head">
          <p class="lt-label">ONE UNIVERSITY → ONE FAMILY</p>
          <h2 id="lt-close-title" class="lt-title">A place to belong.<br><em>The freedom to become.</em></h2>
          <div class="lt-actions">
            <AppLink class="cta cta--primary" to="/join/teachers">Help shape the teaching <span class="cta__arrow" aria-hidden="true">↗</span></AppLink>
            <AppLink class="link" to="/join/students">Explore the student pathway ↗</AppLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.lt {
  font-family: var(--font-sans);
  font-variant-numeric: lining-nums;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--color-ink);
  background: var(--color-paper);
}

.lt :where(h1, h2, p, blockquote) {
  margin: 0;
}

.lt-section {
  padding-block: var(--space-section);
}

.lt-section--paper {
  background: var(--color-paper);
}

.lt-section--cloud {
  background: var(--color-cloud);
}

.lt-intro {
  padding-top: var(--space-8);
}

.lt-head {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  max-width: 48rem;
}

.lt-label {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.lt .lt-title {
  font-family: var(--font-serif);
  font-size: var(--text-display);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.lt .lt-title--hero {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
}

.lt-title em {
  font-style: italic;
  color: var(--color-cobalt);
}

.lt-copy {
  max-width: 40rem;
  color: var(--color-muted);
}

.lt-quote {
  max-width: 44rem;
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 2.6vw, 2.125rem);
  line-height: 1.35;
  letter-spacing: -0.015em;
}

.lt-note {
  max-width: 40rem;
  font-size: var(--text-small);
  color: var(--color-muted);
}

/* ---------- The welcome: one centred reading column ---------- */
.lt-letter {
  display: grid;
  gap: var(--space-4);
  max-width: 46rem;
  margin-inline: auto;
}

.lt-body {
  display: grid;
  gap: var(--space-5);
  margin-top: var(--space-4);
}

.lt-body p {
  font-family: var(--font-serif);
  font-size: clamp(1.0625rem, 1.4vw, 1.1875rem);
  line-height: 1.8;
}

.lt-signature {
  display: grid;
  gap: var(--space-1);
  margin-top: var(--space-6);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-ink);
}

.lt-signature strong {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
}

.lt-signature span {
  font-size: var(--text-small);
  color: var(--color-muted);
}

.lt-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4) var(--space-6);
  margin-top: var(--space-4);
}
</style>
