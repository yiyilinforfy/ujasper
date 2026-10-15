<script setup lang="ts">
import ResponsiveImage from '../components/ResponsiveImage.vue'

const gatheringChecks = [
  'A named local host and responsible activity lead.',
  'A confirmed venue and accessible participation options.',
  'Written confirmation of applicable permissions and insurance.',
  'Current conditions checked and an agreed cancellation procedure.',
  'Participant briefing, emergency arrangements and clear boundaries.',
]

const community = [
  {
    title: 'Conduct',
    text: 'Speak honestly, disagree with ideas and respect the people expressing them. Harassment, coercion and discrimination have no place here. Photos, recordings and publication of another person’s work require their consent.',
  },
  {
    title: 'Raising a concern',
    text: 'A participant can pause or leave an activity. Before enrolment, the host must provide a concern-reporting contact and a second responsible person for issues involving the host. No reporting channel is active on this preview.',
  },
  {
    title: 'Local knowledge',
    text: 'Learn about Jasper through verified local sources. Do not claim to represent Indigenous communities or teach their knowledge without the relevant relationships, permission and context.',
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
          <p class="care-hero__place">Care · Participation · Privacy</p>
          <h1 id="care-title" class="care-hero__title">Take the challenge.<br><em>Take care of each other.</em></h1>
          <p class="care-hero__summary">
            These are the proposed operating principles for the first field lab. Final activity arrangements and
            participation terms must be reviewed with the named local host before any gathering.
          </p>
        </div>
      </div>
    </section>

    <nav class="care-toc" aria-label="On this page">
      <div class="container">
        <ol>
          <li><a href="#care-movement">Movement</a></li>
          <li><a href="#care-offline">Offline</a></li>
          <li><a href="#care-activities">Camp &amp; train</a></li>
          <li><a href="#care-community">Community</a></li>
          <li><a href="#care-privacy">Your information</a></li>
        </ol>
      </div>
    </nav>

    <section id="care-movement" class="care-section care-section--white" aria-labelledby="movement-title">
      <div class="container">
        <div class="sec-head">
          <div>
            <p class="label">01 / Participation</p>
            <h2 id="movement-title" class="display">Movement with choice.</h2>
          </div>
          <p>
            The pilot is designed for adults. Walking, wheeling, seated observation, lower-intensity alternatives and
            rest can all count as participation. No timed ranking, compulsory endurance test or public comparison of
            bodies.
          </p>
        </div>

        <div class="care-movement">
          <dl class="care-rows">
            <div>
              <dt>Outside the scope</dt>
              <dd>
                The first programme excludes remote expeditions, climbing, open-water activity, fasting challenges and
                sleep deprivation. Those activities are outside this proposal’s resources and operating scope.
              </dd>
            </div>
            <div>
              <dt>When a session goes ahead</dt>
              <dd>
                Local conditions, park restrictions and the activity lead determine whether an outdoor session proceeds.
                The plan must include an indoor alternative, headcounts, communications and emergency procedures.
              </dd>
            </div>
            <div>
              <dt>Further guidance</dt>
              <dd>
                <a
                  class="link"
                  href="https://parks.canada.ca/pn-np/ab/jasper/securite-safety"
                  target="_blank"
                  rel="noopener noreferrer"
                >Read Parks Canada’s Jasper safety guidance<span class="visually-hidden"> (opens in a new tab)</span> ↗</a>
              </dd>
            </div>
          </dl>

          <aside class="care-checklist" aria-labelledby="gathering-title">
            <h3 id="gathering-title" class="care-checklist__title">Before the first gathering</h3>
            <ul>
              <li v-for="item in gatheringChecks" :key="item">
                <span class="care-checklist__mark" aria-hidden="true">
                  <svg viewBox="0 0 16 16"><path d="M4 8.5l2.5 2.5L12 5.5" /></svg>
                </span>
                <span>{{ item }}</span>
              </li>
            </ul>
            <p class="care-checklist__note">
              The website and notebook are not route guidance, medical advice, a waiver or proof that an activity is
              authorised.
            </p>
          </aside>
        </div>
      </div>
    </section>

    <section id="care-offline" class="care-section care-section--cloud" aria-labelledby="offline-title">
      <div class="container">
        <div class="sec-head">
          <div>
            <p class="label">02 / Devices</p>
            <h2 id="offline-title" class="display">Offline, with care still connected.</h2>
          </div>
        </div>
        <ul class="care-columns care-columns--two">
          <li>
            <h3 class="care-item__title">For learners</h3>
            <p>
              Personal phones and networked devices are switched off during teaching and camp immersion. Learners may
              retain them in a sealed pouch or choose secure storage. Devices are returned on request. Agree private
              exceptions for medical equipment, disability, caregiving and essential contact.
            </p>
          </li>
          <li>
            <h3 class="care-item__title">For staff</h3>
            <p>
              Staff retain a tested emergency phone and suitable satellite communications where coverage warrants them.
              They check current conditions and closures before departures.
            </p>
            <p class="care-callout">
              The phone-free learning agreement never prevents a warning, help-seeking or leaving the programme.
            </p>
          </li>
        </ul>
      </div>
    </section>

    <section id="care-activities" class="care-section care-section--white" aria-labelledby="activities-title">
      <div class="container">
        <div class="sec-head">
          <div>
            <p class="label">03 / Activities</p>
            <h2 id="activities-title" class="display">Camp, train and reflect responsibly.</h2>
          </div>
        </div>
        <ul class="care-columns care-columns--three">
          <li>
            <h3 class="care-item__title">Camping</h3>
            <p>
              The three proposed nights use reserved, serviced camping with appropriately qualified local staff,
              equipment, food storage, transport and staff-rest arrangements. Exact locations require current checks.
            </p>
            <p>
              A supervised day-camp equivalent carries the same educational standing; records state what was actually
              completed.
            </p>
          </li>
          <li>
            <h3 class="care-item__title">Martial arts</h3>
            <p>
              Martial arts require a qualified, insured coach and suitable space. No head strikes, hard sparring, chokes,
              joint submissions, weapons or uncoached takedowns. Agree touch and intensity, and stop on request.
            </p>
            <p>
              Suspected concussion requires removal and appropriate assessment under the
              <a
                class="link"
                href="https://parachute.ca/wp-content/uploads/2019/06/Concussion-Guideline-2024.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >Canadian concussion guideline<span class="visually-hidden"> (opens in a new tab)</span></a>.
            </p>
          </li>
          <li>
            <h3 class="care-item__title">Attention practices</h3>
            <p>
              Attention practices are short and voluntary, with quiet reading, drawing or observation as alternatives.
              No unusual breathing, pain endurance or compulsory personal disclosure.
            </p>
            <p>
              Practices are educational; see
              <a
                class="link"
                href="https://www.nccih.nih.gov/health/meditation-and-mindfulness-effectiveness-and-safety"
                target="_blank"
                rel="noopener noreferrer"
              >NCCIH’s discussion of evidence and safety<span class="visually-hidden"> (opens in a new tab)</span></a>.
            </p>
          </li>
        </ul>
        <a class="cta cta--primary care-section__cta" href="/field-semester.pdf" download>
          Read the full curriculum and operating framework <span class="cta__arrow" aria-hidden="true">↓</span>
        </a>
      </div>
    </section>

    <section id="care-community" class="care-section care-section--cloud" aria-labelledby="community-title">
      <div class="container">
        <div class="sec-head">
          <div>
            <p class="label">04 / Community</p>
            <h2 id="community-title" class="display">A respectful community.</h2>
          </div>
        </div>
        <ul class="care-columns care-columns--three">
          <li v-for="item in community" :key="item.title">
            <h3 class="care-item__title">{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section id="care-privacy" class="care-section care-section--white" aria-labelledby="privacy-title">
      <div class="container">
        <div class="sec-head">
          <div>
            <p class="label">05 / Privacy</p>
            <h2 id="privacy-title" class="display">Your work. Your information.</h2>
          </div>
        </div>
        <div class="care-faq">
          <details open>
            <summary>What does this website save?</summary>
            <div class="care-faq__body">
              <p>
                The fieldbook stores notes and checkmarks in this browser’s local storage when you choose Save, switch
                weeks, export or copy a reflection question. It does not send them to Jasper. Browser data can be lost;
                export regularly.
              </p>
              <p>
                The introduction and teacher/student application drafts are held only in page memory until you download
                or close them. They are not submitted or saved in a database. Refreshing clears their answers.
              </p>
            </div>
          </details>
          <details>
            <summary>Are applications being collected?</summary>
            <div class="care-faq__body">
              <p>
                Applications are not yet open. For general inquiries, contact Vincent Zhang at
                <a class="link" href="mailto:vincent@ujasper.ca">vincent@ujasper.ca</a>. Website forms prepare local
                drafts and do not send email or store answers in a database. Application submission instructions and a
                privacy notice will be published before applications are accepted.
              </p>
            </div>
          </details>
          <details>
            <summary>Does the website contact an AI model?</summary>
            <div class="care-faq__body">
              <p>
                No. The offline core uses instructor-written illustrative claim cards on paper. The browser notebook is
                for preparation or later archiving and does not call an AI service. An optional connected audit may
                follow the semester, outside its teaching hours.
              </p>
            </div>
          </details>
          <details>
            <summary>Who owns my work?</summary>
            <div class="care-faq__body">
              <p>
                You retain ownership of your original work. Sharing with peers does not grant permission to publish.
                Respect the rights and licences of others’ contributions.
              </p>
            </div>
          </details>
          <details>
            <summary>What about hosting and external links?</summary>
            <div class="care-faq__body">
              <p>
                The site adds no analytics, advertising trackers or embedded third-party videos. The hosting service may
                process ordinary connection and security information and, for private access, sign-in information under
                its own terms. External links open services with their own policies.
              </p>
            </div>
          </details>
        </div>
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

/* Movement: rows + checklist */
.care-movement {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: var(--space-8);
  align-items: start;
}

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
  max-width: 38rem;
  color: var(--color-muted);
}

.care-checklist {
  padding: var(--space-6);
  border: 1px solid var(--color-line);
  border-top: 2px solid var(--color-cobalt);
  background: var(--color-cloud);
}

.care .care-checklist__title {
  margin-bottom: var(--space-4);
  font-size: 1.5rem;
  line-height: 1.25;
}

.care-checklist li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding-block: var(--space-3);
  border-bottom: 1px solid var(--color-line);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.care-checklist__mark {
  display: inline-grid;
  flex: none;
  place-items: center;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
  border-radius: 50%;
  background: var(--color-cobalt);
}

.care-checklist__mark svg {
  width: 0.875rem;
  height: 0.875rem;
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.care-checklist__note {
  margin-top: var(--space-4);
  font-size: 0.8125rem;
  line-height: 1.6;
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

.care-columns--three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
@media (max-width: 1100px) {
  .care-movement {
    grid-template-columns: 1fr;
    gap: var(--space-7);
  }

  .care-columns--three {
    grid-template-columns: 1fr;
  }

  .care-columns--three > li + li {
    padding-left: 0;
    border-left: 0;
    border-top: 1px solid var(--color-line);
  }

  .care-columns--three > li {
    padding-block: var(--space-6);
    padding-right: 0;
  }
}

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

  .care-checklist {
    padding: var(--space-5);
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
