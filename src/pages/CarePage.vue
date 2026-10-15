<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'

const field = [
  {
    title: 'Outdoors',
    paragraphs: [
      'Qualified local staff must confirm route-specific permissions, guide requirements, current closures, weather, wildlife procedures, communications and an emergency plan. A free or small event is not automatically exempt from operating requirements.',
      'Maintained routes and serviced camping keep the proposed scope modest. No technical climbing, glacier travel, backcountry survival test, wildlife approach or cold-water challenge is part of the first program.',
    ],
  },
  {
    title: 'Physical and martial practice',
    paragraphs: [
      'A qualified coach sets an adapted progression and contact boundaries. Beginner practice centres on controlled movement and restraint. No head contact, choking, joint locks, throws or competitive sparring is proposed.',
      'Stop for pain, dizziness, distress or loss of control. Staff must have an agreed first-response and escalation plan; written materials do not substitute for trained responders.',
    ],
  },
]

const privacy = [
  {
    question: 'What does this website collect?',
    answer:
      'The forms have no submission endpoint. Typing, reviewing or downloading a draft does not send your answers to the founder. The website has no advertising trackers or analytics scripts. Hosting providers may process ordinary connection and security logs.',
  },
  {
    question: 'Where do application drafts stay?',
    answer:
      'By default, answers stay in page memory and disappear when you refresh or leave. You can explicitly choose Save on this device, which stores the draft in this browser’s local storage until you clear it or storage is removed. Avoid this on shared devices. Download a copy for your own backup; storage is not guaranteed.',
  },
  {
    question: 'Where do fieldbook notes stay?',
    answer:
      'The personal fieldbook saves locally in the same browser and website origin. Export before changing devices or domains. Switching weeks saves the current note locally. A fieldbook is a private preparation and archive tool; the taught semester uses paper.',
  },
  {
    question: 'What happens when I email?',
    answer:
      'Email opens your own mail application. You choose what to send; the message then travels through your and the recipient’s email providers. Keep general inquiries brief. Do not send medical records, identity documents, financial account details or private information about other people. Formal applicant data-handling arrangements will be published before admissions open.',
  },
  {
    question: 'What happens when I play the song?',
    answer:
      'The YouTube player is loaded only after you press Play. It then connects to YouTube’s privacy-enhanced embed service and may process connection and playback data under its policies. You may instead follow the direct link to the original recording.',
  },
  {
    question: 'How can I clear my data?',
    answer:
      'Use Clear this draft with its confirmation checkbox, or the fieldbook’s delete controls. You can also clear this website’s data in your browser. These actions cannot remove text files you downloaded or email you chose to send.',
  },
  {
    question: 'Is AI processing my answers?',
    answer:
      'No. This website does not send draft answers or notebook entries to an AI service. The optional AI Return Lab is a separate, later learning activity with its own agreed tools and privacy arrangements.',
  },
]
</script>

<template>
  <div class="care">
    <section class="care-hero" aria-labelledby="care-title">
      <ResponsiveImage class="care-hero__image" name="letter-peaks" priority />
      <div class="care-hero__shade" aria-hidden="true"></div>
      <div class="container care-hero__content">
        <div class="care-hero__copy">
          <p class="care-hero__place">Care and privacy</p>
          <h1 id="care-title" class="care-hero__title">Challenge with judgment.<br><em>Belonging with freedom.</em></h1>
          <p class="care-hero__summary">
            A demanding education depends on consent, competent teaching and practical care. These principles guide the
            proposed program; the operator must complete local arrangements before delivery.
          </p>
        </div>
      </div>
    </section>

    <nav class="care-toc" aria-label="On this page">
      <div class="container">
        <ol>
          <li><a href="#participation">Participation</a></li>
          <li><a href="#field">Field and coaching</a></li>
          <li><a href="#privacy">Privacy</a></li>
          <li><a href="#concerns">Questions and concerns</a></li>
        </ol>
      </div>
    </nav>

    <section id="participation" class="care-section care-section--white" aria-labelledby="participation-title">
      <div class="container">
        <div class="sec-head">
          <div>
            <p class="label">01 / Participation</p>
            <h2 id="participation-title" class="display">Take part<br><em>with agency.</em></h2>
          </div>
          <p>
            Personal phones, internet and live AI are off during teaching and camps, with agreed private medical,
            accessibility and essential-contact exceptions. Staff emergency communications remain active. Storage is
            voluntary and devices are returned on request.
          </p>
          <p>
            The offline agreement covers teaching and camps. It does not authorize staff to withhold a device against
            someone’s wishes or prevent necessary contact. Access exceptions are handled privately.
          </p>
        </div>

        <dl class="care-rows">
          <div>
            <dt>Adaptation and choice</dt>
            <dd>
              <p>
                Use appropriate physical variations and equivalent academic evidence. Meditation is voluntary and may be
                replaced with quiet observation or another agreed reflective practice. An alternative sleeping
                arrangement or supervised day-camp equivalent can meet the same learning purpose.
              </p>
              <p class="care-callout">
                No public fitness ranking, forced disclosure, required religious belief or punishment for a reasoned
                disagreement belongs here.
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section id="field" class="care-section care-section--cloud" aria-labelledby="field-title">
      <div class="container">
        <div class="sec-head">
          <div>
            <p class="label">02 / Field and coaching</p>
            <h2 id="field-title" class="display">The plan follows<br><em>the people and conditions.</em></h2>
          </div>
        </div>
        <ul class="care-columns care-columns--two">
          <li v-for="item in field" :key="item.title">
            <h3 class="care-item__title">{{ item.title }}</h3>
            <p v-for="paragraph in item.paragraphs" :key="paragraph">{{ paragraph }}</p>
          </li>
        </ul>
        <AppLink class="cta cta--primary care-section__cta" to="/read/operations">
          Read the full operations manual <span class="cta__arrow" aria-hidden="true">→</span>
        </AppLink>
      </div>
    </section>

    <section id="privacy" class="care-section care-section--white" aria-labelledby="privacy-title">
      <div class="container">
        <div class="sec-head">
          <div>
            <p class="label">03 / Privacy</p>
            <h2 id="privacy-title" class="display">Your draft remains<br><em>under your control.</em></h2>
          </div>
        </div>
        <div class="care-faq">
          <details v-for="(item, i) in privacy" :key="item.question" :open="i === 0">
            <summary>{{ item.question }}</summary>
            <div class="care-faq__body">
              <p>{{ item.answer }}</p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="concerns" class="care-section care-section--cloud" aria-labelledby="concerns-title">
      <div class="container">
        <div class="sec-head">
          <div>
            <p class="label">04 / Questions and concerns</p>
            <h2 id="concerns-title" class="display">Speak up.<br><em>Be heard.</em></h2>
          </div>
          <p>
            Before delivery, participants must receive named contacts for academic questions, activity concerns and
            complaints, including a route independent of the person concerned. Consent for a photograph, testimonial or
            public project is separate from participation.
          </p>
        </div>

        <dl class="care-rows">
          <div>
            <dt>During the founding stage</dt>
            <dd>
              <p>
                Questions about this proposal or this website can be directed to Vincent Zhang at
                <a class="link" href="mailto:vincent@ujasper.ca">vincent@ujasper.ca</a>. This is not an emergency
                reporting service. No operating cohort or independent complaints officer is currently announced.
              </p>
              <a class="cta cta--primary" href="mailto:vincent@ujasper.ca?subject=Jasper%20care%20or%20privacy%20question">Contact the founder</a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  </div>
</template>

<style scoped>
.care {
  font-family: var(--font-sans);
  font-variant-numeric: lining-nums;
  font-size: var(--text-body);
  font-weight: 400;
  line-height: 1.75;
  color: var(--color-ink);
}

.care :where(h1, h2, h3, p, ol, ul, li, dl, dt, dd) {
  margin: 0;
}

.care :where(ol, ul) {
  padding: 0;
  list-style: none;
}

.care :where(h1, h2, h3) {
  font-family: var(--font-serif);
  font-weight: 400;
  letter-spacing: -0.025em;
}

.care .display em,
.care-hero__title em {
  font-style: italic;
}

/* ---------- Hero ---------- */
.care-hero {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: flex-end;
  min-height: min(calc(100svh - 5.5rem), 38rem);
  overflow: hidden;
  background: var(--color-navy-deep);
  color: var(--color-on-dark);
}

.care-hero__image {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 40%;
  animation: care-hero-fade 1.2s var(--ease) both;
}

.care-hero__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(to bottom, rgba(14, 36, 57, 0.25) 0%, rgba(14, 36, 57, 0.75) 100%),
    linear-gradient(90deg, rgba(11, 27, 42, 0.6) 0%, rgba(11, 27, 42, 0) 65%);
}

.care-hero__content {
  padding-block: var(--space-9) var(--space-8);
}

.care-hero__copy {
  max-width: 50rem;
}

.care-hero__place {
  margin-bottom: var(--space-4);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.care .care-hero__title {
  margin-bottom: var(--space-6);
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  line-height: 1.1;
  color: inherit;
}

.care-hero__title em {
  color: var(--color-ice);
}

.care-hero__summary {
  max-width: 38rem;
  font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
  font-weight: 300;
  line-height: 1.65;
  color: rgba(243, 244, 246, 0.92);
}

@keyframes care-hero-fade {
  from {
    opacity: 0;
  }
}

/* ---------- On this page ---------- */
.care-toc {
  position: sticky;
  top: var(--header-height);
  z-index: 10;
  border-bottom: 1px solid var(--color-line);
  background: rgba(255, 255, 255, 0.96);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}

.care-toc ol {
  display: flex;
  gap: var(--space-6);
  overflow-x: auto;
  scrollbar-width: none;
}

.care-toc a {
  display: block;
  padding-block: var(--space-4);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--color-muted);
  text-decoration: none;
  transition: color 150ms ease;
}

.care-toc a:hover {
  color: var(--color-ink);
}

.care-toc a:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 2px;
}

/* ---------- Sections ---------- */
.care-section {
  padding-block: clamp(4.5rem, 8vw, 6.5rem);
  scroll-margin-top: calc(var(--header-height) + 3.25rem);
}

.care-section--white {
  background: var(--color-paper);
}

.care-section--cloud {
  background: var(--color-cloud);
}

.care .sec-head .label {
  color: var(--color-cobalt);
}

.care .sec-head > p {
  max-width: 40rem;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.7;
  color: var(--color-ink);
}

.care-section__cta {
  margin-top: var(--space-7);
}

/* Labelled rows */
.care-rows {
  border-top: 1px solid var(--color-ink);
}

.care-rows > div {
  display: grid;
  grid-template-columns: 12rem minmax(0, 1fr);
  gap: var(--space-5);
  padding-block: var(--space-5);
  border-bottom: 1px solid var(--color-line);
}

.care-rows dt {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.6;
  text-transform: uppercase;
  color: var(--color-ink);
}

.care-rows dd {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  max-width: 38rem;
  color: var(--color-muted);
}

/* Column groups: top rule, thin dividers between columns */
.care-columns {
  display: grid;
  border-top: 1px solid var(--color-ink);
}

.care-columns--two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.care-columns > li {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding: var(--space-6) var(--space-6) var(--space-2) 0;
  color: var(--color-muted);
}

.care-columns > li + li {
  padding-left: var(--space-6);
  border-left: 1px solid var(--color-line);
}

.care .care-item__title {
  margin-bottom: var(--space-1);
  font-size: 1.5rem;
  line-height: 1.25;
  color: var(--color-ink);
}

.care-callout {
  padding-left: var(--space-4);
  border-left: 2px solid var(--color-cobalt);
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--color-ink);
}

/* Privacy FAQ */
.care-faq {
  max-width: 48rem;
  border-top: 1px solid var(--color-ink);
}

.care-faq details {
  border-bottom: 1px solid var(--color-line);
}

.care-faq summary {
  position: relative;
  display: block;
  padding: var(--space-5) var(--space-8) var(--space-5) 0;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  line-height: 1.4;
  color: var(--color-ink);
  list-style: none;
  cursor: pointer;
  transition: color 150ms ease;
}

.care-faq summary::-webkit-details-marker {
  display: none;
}

.care-faq summary::after {
  content: '+';
  position: absolute;
  top: 50%;
  right: 0;
  font-family: var(--font-sans);
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1;
  color: var(--color-cobalt);
  transform: translateY(-50%);
  transition: transform 200ms var(--ease);
}

.care-faq details[open] summary::after {
  transform: translateY(-50%) rotate(45deg);
}

.care-faq summary:hover {
  color: var(--color-cobalt);
}

.care-faq summary:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 4px;
}

.care-faq__body {
  display: grid;
  gap: var(--space-4);
  max-width: 42rem;
  padding-bottom: var(--space-6);
  color: var(--color-muted);
}

/* ---------- Responsive ---------- */
@media (max-width: 760px) {
  .care-hero {
    min-height: calc(100svh - 7.75rem);
  }

  .care-hero__shade {
    background:
      linear-gradient(to bottom, rgba(14, 36, 57, 0.15) 0%, rgba(11, 27, 42, 0.55) 35%, rgba(11, 27, 42, 0.92) 70%);
  }

  .care-hero__content {
    padding-block: var(--space-9) var(--space-6);
  }

  .care .care-hero__title {
    font-size: clamp(2.5rem, 12vw, 3.5rem);
  }

  .care-rows > div {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }

  .care-columns--two {
    grid-template-columns: 1fr;
  }

  .care-columns--two > li + li {
    padding-left: 0;
    border-left: 0;
    border-top: 1px solid var(--color-line);
  }

  .care-columns--two > li {
    padding-block: var(--space-6);
    padding-right: 0;
  }

  .care-section__cta {
    width: 100%;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .care-hero__image {
    animation: none;
  }

  .care-faq summary::after {
    transition: none;
  }
}
</style>
