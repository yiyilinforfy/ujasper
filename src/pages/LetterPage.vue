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
          <h1 id="lt-title" class="lt-title">A responsibility<br><em>to the world.</em></h1>
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
              sizes="(max-width: 640px) 10rem, 14rem"
            />
            <figcaption class="lt-note">
              The original crest brings the founder’s cross-cultural vision into a single institutional mark.
            </figcaption>
          </figure>
          <h2 id="lt-welcome-title" class="lt-title">Welcome to<br>University of Jasper</h2>
          <div class="lt-body">
            <p>
              We human beings have our special responsibilities to make our society and world better. So we not only
              focus on knowledge training, but also have a keen interest in the studies of our own minds and our history.
              We chase ancient civilization and culture.
            </p>
            <p>
              Welcome you to come here to grow up together and team work to realize our dreams. Hope U of Jasper is your
              style of family. We share each other's value and passion to make our school great.
            </p>
            <p>Cheers!</p>
          </div>
          <p class="lt-signature">Vincent Zhang · Founder</p>
        </article>
      </div>
    </section>

    <section class="lt-section lt-section--paper" aria-labelledby="lt-purpose-title">
      <div class="container">
        <div class="lt-head">
          <p class="lt-label">The purpose today</p>
          <h2 id="lt-purpose-title" class="lt-title">Understanding, made<br><em>visible in action.</em></h2>
          <p class="lt-copy">
            The recovered welcome remains the starting point. Today’s plan gives it a teaching form: physical practice,
            world humanities, scientific inquiry and useful work, first in a small in-person Jasper cohort.
          </p>
          <AppLink class="link" to="/vision">Read the vision and mission <span aria-hidden="true">→</span></AppLink>
        </div>

        <div id="song" class="lt-song">
          <div class="lt-head">
            <p class="lt-label">Jasper, in song</p>
            <h3 class="lt-item-title">Jasper Dream Crying</h3>
            <p class="lt-copy">
              A song of place and memory, written by Vincent Zhang and presented through FarJasper Stories Canada.
            </p>
          </div>
          <div class="lt-video">
            <iframe
              v-if="songPlaying"
              ref="player"
              src="https://www.youtube-nocookie.com/embed/htp2z4i4XCI?autoplay=1"
              title="Jasper Dream Crying by Vincent Zhang"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowfullscreen
            ></iframe>
            <button
              v-else
              type="button"
              class="lt-video__poster"
              aria-label="Play Jasper Dream Crying on YouTube"
              @click="playSong"
            >
              <ResponsiveImage name="jasper-song-poster" sizes="(max-width: 800px) 100vw, 46rem" />
              <span class="lt-video__play" aria-hidden="true">▶ Play the song</span>
            </button>
          </div>
          <p class="lt-note">Pressing Play connects to YouTube. No video is loaded before you choose it.</p>
          <a class="link" href="https://www.youtube.com/watch?v=htp2z4i4XCI">Open the original recording on YouTube</a>
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

.lt :where(h1, h2, h3, p, figure) {
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
  color: var(--color-ink);
}

.lt-title em {
  font-style: italic;
  color: var(--color-cobalt);
}

.lt .lt-item-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.015em;
  line-height: 1.3;
  color: var(--color-ink);
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
  gap: var(--space-5);
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
  width: clamp(10rem, 22vw, 14rem);
  height: auto;
  mix-blend-mode: multiply;
}

.lt-body {
  display: grid;
  gap: var(--space-5);
}

.lt-body p {
  font-family: var(--font-serif);
  font-size: clamp(1.125rem, 1.6vw, 1.25rem);
  line-height: 1.8;
}

.lt-signature {
  margin-top: var(--space-4);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-ink);
  font-family: var(--font-serif);
  font-size: 1.5rem;
  line-height: 1.3;
}

/* ---------- The song ---------- */
.lt-song {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  max-width: 48rem;
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-line);
  scroll-margin-top: var(--header-height);
}

.lt-video {
  width: 100%;
  margin-top: var(--space-2);
  aspect-ratio: 16 / 9;
  background: var(--color-navy-deep);
}

.lt-video iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.lt-video__poster {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}

.lt-video__poster img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lt-video__play {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 0.875rem 1.375rem;
  background: var(--color-ink);
  color: var(--color-on-dark);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  transition: background-color var(--duration) var(--ease);
}

.lt-video__poster:hover .lt-video__play,
.lt-video__poster:focus-visible .lt-video__play {
  background: var(--color-cobalt);
}

.lt-video__poster:focus-visible,
.lt-video iframe:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}
</style>
