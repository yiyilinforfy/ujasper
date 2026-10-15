<script setup lang="ts">
import { nextTick, ref } from 'vue'
import AppLink from '../components/AppLink.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'

const songPlaying = ref(false)
const player = ref<HTMLIFrameElement | null>(null)

async function playSong() {
  songPlaying.value = true
  await nextTick()
  player.value?.focus()
}
</script>

<template>
  <div class="lt">
    <section class="lt-section lt-section--paper lt-intro" aria-labelledby="lt-title">
      <div class="container">
        <div class="lt-head">
          <p class="lt-label">The founding letter · Vincent Zhang</p>
          <h1 id="lt-title" class="lt-title lt-title--hero">A responsibility<br><em>to the world.</em></h1>
          <p class="lt-copy">Original welcome, identified by Vincent Zhang as written in 2015; spacing normalized.</p>
        </div>
      </div>
    </section>

    <section class="lt-section lt-section--cloud" aria-labelledby="lt-welcome-title">
      <div class="container">
        <article class="lt-letter">
          <figure class="lt-crest">
            <ResponsiveImage
              name="founding-crest"
              alt="Vincent Zhang’s original University of Jasper crest"
              sizes="(max-width: 640px) 10rem, 12rem"
            />
            <figcaption class="lt-note">
              The original crest brings the founder’s cross-cultural vision into a single institutional mark.
            </figcaption>
          </figure>
          <h2 id="lt-welcome-title" class="lt-title">Welcome to<br>University of Jasper</h2>
          <div class="lt-body">
            <p>We human beings have our special responsibilities to make our society and world better. So we not only focus on knowledge training, but also have a keen interest in the studies of our own minds and our history. We chase ancient civilization and culture.</p>
            <p>Welcome you to come here to grow up together and team work to realize our dreams. Hope U of Jasper is your style of family. We share each other's value and passion to make our school great.</p>
            <p>Cheers!</p>
          </div>
          <div class="lt-signature">
            <strong>Vincent Zhang</strong>
            <span>Founder</span>
          </div>
        </article>
      </div>
    </section>

    <section class="lt-section lt-section--paper" aria-labelledby="lt-close-title">
      <div class="container">
        <div class="lt-head">
          <p class="lt-label">The purpose today</p>
          <h2 id="lt-close-title" class="lt-title">Understanding, made<br><em>visible in action.</em></h2>
          <p class="lt-copy">
            The recovered welcome remains the starting point. Today’s plan gives it a teaching form: physical practice,
            world humanities, scientific inquiry and useful work, first in a small in-person Jasper cohort.
          </p>
          <div class="lt-actions">
            <AppLink class="link" to="/vision">Read the vision and mission →</AppLink>
          </div>
        </div>
      </div>
    </section>

    <section id="song" class="lt-section lt-section--cloud lt-song" aria-labelledby="lt-song-title">
      <div class="container lt-song__grid">
        <div class="lt-head">
          <p class="lt-label">Jasper, in song</p>
          <h2 id="lt-song-title" class="lt-title">Jasper Dream Crying</h2>
          <p class="lt-copy">
            A song of place and memory, written by Vincent Zhang and presented through FarJasper Stories Canada.
          </p>
          <div class="lt-actions">
            <a class="cta cta--primary" href="https://www.youtube.com/watch?v=htp2z4i4XCI" target="_blank" rel="noopener noreferrer">
              Open the original recording on YouTube<span class="visually-hidden"> (opens in a new tab)</span>
              <span class="cta__arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <figure class="lt-song__media">
          <!-- The YouTube player only loads once the visitor asks for it. -->
          <div class="lt-song__video">
            <iframe
              v-if="songPlaying"
              ref="player"
              src="https://www.youtube-nocookie.com/embed/htp2z4i4XCI?autoplay=1"
              title="Jasper Dream Crying by Vincent Zhang"
              width="749"
              height="562"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <button v-else type="button" class="lt-song__poster" @click="playSong">
              <ResponsiveImage name="jasper-song-poster" sizes="(max-width: 1100px) 100vw, 42rem" />
              <span class="lt-song__play" aria-hidden="true"></span>
              <span class="visually-hidden">Play Jasper Dream Crying on YouTube</span>
            </button>
          </div>
          <figcaption class="lt-song__credit">
            Pressing Play connects to YouTube. No video is loaded before you choose it.
          </figcaption>
        </figure>
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

.lt :where(h1, h2, p, figure) {
  margin: 0;
}

.lt-section {
  padding-block: var(--space-section);
  scroll-margin-top: var(--header-height);
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

.lt-crest {
  display: grid;
  justify-items: start;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.lt-crest img {
  display: block;
  width: 12rem;
  max-width: 100%;
  height: auto;
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

/* ---------- The song: click-to-load player, as on the original home page ---------- */
.lt-song__grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  align-items: center;
  gap: var(--space-8);
}

.lt-song__video {
  aspect-ratio: 749 / 562;
  background: var(--color-navy-deep);
}

.lt-song__video iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.lt-song__poster {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}

.lt-song__poster img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lt-song__play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4.5rem;
  height: 4.5rem;
  background: var(--color-ink);
  transform: translate(-50%, -50%);
  transition: background-color 0.2s ease;
}

.lt-song__play::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 54%;
  border-style: solid;
  border-width: 0.75rem 0 0.75rem 1.25rem;
  border-color: transparent transparent transparent var(--color-paper);
  transform: translate(-50%, -50%);
}

.lt-song__poster:hover .lt-song__play,
.lt-song__poster:focus-visible .lt-song__play {
  background: var(--color-cobalt);
}

.lt-song__poster:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

.lt-song__credit {
  margin-top: var(--space-4);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-line);
  font-size: var(--text-small);
  color: var(--color-muted);
}

@media (max-width: 1100px) {
  .lt-song__grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lt-song__play {
    transition: none;
  }
}
</style>
