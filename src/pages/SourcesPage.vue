<script setup lang="ts">
const contents = [
  { id: 'governance', label: 'Ambition and formal rights' },
  { id: 'place', label: 'Funding, place and operating rules' },
  { id: 'educational-traditions', label: 'Educational traditions' },
  { id: 'curriculum', label: 'Curriculum references' },
  { id: 'credits', label: 'Founding material and credits' },
]

const governanceLinks = [
  {
    href: 'https://laws-lois.justice.gc.ca/eng/acts/C-7.75/section-128.html',
    title: 'Federal nonprofit director election and tenure rules',
    note: 'Apply if that legal structure is chosen.',
  },
  {
    href: 'https://laws-lois.justice.gc.ca/eng/acts/C-7.75/section-130.html',
    title: 'Federal nonprofit director removal rules',
    note: 'Apply if that legal structure is chosen.',
  },
  {
    href: 'https://www.alberta.ca/system/files/custom_downloaded_images/sa-society-bylaws-form.pdf',
    title: 'Alberta sample society bylaws',
    note: 'Illustrate election and removal provisions. A template, not Jasper’s adopted bylaws or a determination that lifetime tenure is permissible.',
  },
]

const operatingLinks = [
  {
    href: 'https://www.alberta.ca/career-training-licence-requirements',
    title: 'Alberta: career training licence requirements and exemptions',
    note: '',
  },
  {
    href: 'https://www.ualberta.ca/en/kinesiology-sport-recreation/alberta-post-secondary-learning-act.pdf',
    title: 'Post-secondary Learning Act, university-hosted copy',
    note: 'Section 36 concerns use of “university.” This copy is a reference, not confirmation of current approval or a substitute for checking the current consolidation with Alberta.',
  },
  {
    href: 'https://www.jasper-alberta.ca/p/licences-and-permits',
    title: 'Municipality of Jasper: licences and permits',
    note: '',
  },
  {
    href: 'https://parks.canada.ca/agence-agency/dp-pd/ns-ss/pc-bl',
    title: 'Parks Canada: business licensing, including nonprofit undertakings',
    note: '',
  },
  {
    href: 'https://parks.canada.ca/pn-np/ab/jasper/securite-safety',
    title: 'Parks Canada: Jasper visitor safety',
    note: '',
  },
]

const traditions = [
  {
    name: 'Ancient Greek inquiry',
    href: 'https://iep.utm.edu/plato-academy/',
    source: 'Internet Encyclopedia of Philosophy: Plato’s Academy',
    note: 'Plato’s Academy is generally dated to the fourth century BCE, often around 387–383 BCE, rather than the fifth century.',
  },
  {
    name: 'Bologna',
    href: 'https://www.unibo.it/en/university/who-we-are/our-history/nine-centuries-of-history/the-birth-of-the-studium-and-the-commune',
    source: 'University of Bologna: The birth of the Studium and the Commune',
    note: 'The university’s account describes protections for scholars; medieval privileges should not be equated with every feature of modern academic freedom.',
  },
  {
    name: 'Vienna',
    href: 'https://communications.univie.ac.at/fileadmin/user_upload/d_oeffentlichkeitsarbeit/Dokumente/20240311_Broschuere_Organisation_and_Governance_web.pdf',
    source: 'University of Vienna: Organisation and Governance',
    note: 'The official overview discusses research, education and the freedom of teaching and research.',
  },
  {
    name: 'Oxford',
    href: 'https://www.ox.ac.uk/admissions/undergraduate/courses/learning-at-oxford/personalised-learning',
    source: 'University of Oxford: Personalised learning',
    note: 'Tutorials link independent preparation with close discussion and feedback.',
  },
  {
    name: 'Cambridge',
    href: 'https://www.undergraduate.study.cam.ac.uk/supervisions-and-assessment',
    source: 'University of Cambridge: Supervisions and assessment',
    note: 'Supervisions support close discussion, deeper thinking and regular feedback.',
  },
  {
    name: 'Harvard',
    href: 'https://www.harvard.edu/president/history/',
    source: 'Harvard University: History of the Presidency',
    note: 'The history of Charles W. Eliot provides context for the elective tradition; it does not imply unrestricted course choice today.',
  },
  {
    name: 'Humboldt',
    href: 'https://wikis.hu-berlin.de/sites/schulung/images/3/33/Leitbild.pdf',
    source: 'Humboldt-Universität: Mission Statement',
    note: 'The university’s mission statement articulates the unity of research and teaching.',
  },
]

const curriculumLinks = [
  {
    href: 'https://parks.canada.ca/pn-np/ab/jasper/securite-safety',
    title: 'Parks Canada: Jasper visitor safety',
    note: 'Current closures, wildfire, wildlife and communication links; staff verify conditions before departure.',
  },
  {
    href: 'https://parks.canada.ca/pn-np/ab/jasper/activ/experience/sentiers-trails/activguides-guidedactiv',
    title: 'Parks Canada: Guided adventures',
    note: 'Check a guide’s lawful operation and qualifications appropriate to the activity.',
  },
  {
    href: 'https://parks.canada.ca/pn-np/ab/jasper/gestion-management/permis-permits/licence',
    title: 'Parks Canada: Jasper business licences',
    note: 'Operating and guided-business categories; confirm the actual programme’s requirements.',
  },
  {
    href: 'https://parks.canada.ca/pn-np/ab/jasper/activ/passez-stay/arrierepays-backcountry/planif-plan',
    title: 'Parks Canada: Backcountry planning guide',
    note: 'Camp reservations, designated sites and secure attractant storage; site-specific rules control.',
  },
  {
    href: 'https://parachute.ca/wp-content/uploads/2019/06/Concussion-Guideline-2024.pdf',
    title: 'Parachute: Canadian Guideline on Concussion in Sport, 2nd ed.',
    note: 'Removal, assessment and return-to-sport processes. This course does not provide medical clearance.',
  },
  {
    href: 'https://www.nccih.nih.gov/health/meditation-and-mindfulness-effectiveness-and-safety',
    title: 'NCCIH: Meditation and Mindfulness',
    note: 'Benefits, limitations and potential adverse experiences; educational practices are not treatment.',
  },
  {
    href: 'https://openstax.org/books/college-physics-2e/pages/16-4-the-simple-pendulum',
    title: 'OpenStax: The Simple Pendulum',
    note: 'The small-angle model, variables and assumptions.',
  },
  {
    href: 'https://openstax.org/books/college-physics-2e/pages/14-4-heat-transfer-methods',
    title: 'OpenStax: Heat Transfer Methods',
    note: 'Conduction, convection and radiation as a conceptual framework.',
  },
]

const academyLinks = [
  { href: 'https://theacademysf.com/program', title: 'The Academy: programme', note: '' },
  { href: 'https://theacademysf.com/admissions', title: 'The Academy: admissions', note: '' },
  { href: 'https://theacademysf.com/faq', title: 'The Academy: FAQ, status and costs', note: '' },
]
</script>

<template>
  <div class="src">
    <!-- Intro -->
    <section class="src-section src-section--paper src-intro" aria-labelledby="src-title">
      <div class="container">
        <div class="src-head">
          <p class="src-label">Research · Transparency</p>
          <h1 id="src-title" class="src-title">Ideas deserve <em>their sources.</em></h1>
          <p class="src-copy">
            Final edition prepared on 28 September 2026. External sources inform the proposal; they do not imply
            endorsement, affiliation or an established partnership.
          </p>
        </div>

        <div class="src-contents" role="navigation" aria-label="On this page">
          <a v-for="(item, i) in contents" :key="item.id" :href="`#${item.id}`" class="src-contents__item">
            <span class="src-contents__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span>{{ item.label }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Governance -->
    <section id="governance" class="src-section src-section--cloud" aria-labelledby="src-governance-title">
      <div class="container">
        <div class="src-head">
          <p class="src-label">Founding governance · Research</p>
          <h2 id="src-governance-title" class="src-title">Ambition and <em>formal rights.</em></h2>
          <p class="src-copy">
            The five positions, C$2 million commitment per director and C$10 million total target are Vincent Zhang’s
            founding proposal. Lifetime voting rights have not yet been legally established. The appropriate structure
            remains to be established.
          </p>
        </div>

        <ul class="src-list">
          <li v-for="link in governanceLinks" :key="link.href" class="src-list__row">
            <a class="src-list__link" :href="link.href" target="_blank" rel="noopener noreferrer">
              {{ link.title }} <span aria-hidden="true">↗</span>
            </a>
            <p class="src-list__note">{{ link.note }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Funding, place and operating rules -->
    <section id="place" class="src-section src-section--paper" aria-labelledby="src-place-title">
      <div class="container">
        <div class="src-head">
          <p class="src-label">Funding and place · Checked 28 September 2026</p>
          <h2 id="src-place-title" class="src-title">Build from <em>real conditions.</em></h2>
          <p class="src-copy">
            The funding sequence is a planning recommendation, not a confirmed grant or fundraising result.
            <a class="src-inline" href="https://parks.canada.ca/pn-np/ab/jasper/gestion-management/serviceimmobilier-realty/retablissement-recovery/cadre-framework" target="_blank" rel="noopener noreferrer">Parks Canada’s Jasper Recovery Framework</a>
            explains townsite land tenure.
            <a class="src-inline" href="https://ised-isde.canada.ca/site/corporations-canada/en/not-profit-corporations/directors" target="_blank" rel="noopener noreferrer">Corporations Canada’s director guidance</a>
            supplies the federal nonprofit term and election rules. These rules must be assessed against the legal
            structure actually chosen.
          </p>
          <p class="src-copy">
            The supplied WSJ article informed background research. Its full text is not republished. No Academy
            investor, corporate partner, family or foundation is represented as supporting Jasper.
          </p>
        </div>

        <h3 class="src-subhead">Operating references</h3>
        <ul class="src-list">
          <li v-for="link in operatingLinks" :key="link.href" class="src-list__row">
            <a class="src-list__link" :href="link.href" target="_blank" rel="noopener noreferrer">
              {{ link.title }} <span aria-hidden="true">↗</span>
            </a>
            <p v-if="link.note" class="src-list__note">{{ link.note }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Educational traditions -->
    <section id="educational-traditions" class="src-section src-section--cloud" aria-labelledby="src-traditions-title">
      <div class="container">
        <div class="src-head">
          <p class="src-label">Educational traditions · Verified 23 September 2026</p>
          <h2 id="src-traditions-title" class="src-title">Inspiration, <em>carefully attributed.</em></h2>
          <p class="src-copy">
            The historical connections in our declaration are the founder’s interpretation of these traditions. They do
            not imply endorsement, partnership or a complete account of the institutions’ histories. Our concern about
            technological dependence is an educational position, not a claim that all modern people are physically
            inferior to ancient people.
          </p>
        </div>

        <ul class="src-list">
          <li v-for="item in traditions" :key="item.name" class="src-list__row src-list__row--named">
            <h3 class="src-list__name">{{ item.name }}</h3>
            <div>
              <a class="src-list__link" :href="item.href" target="_blank" rel="noopener noreferrer">
                {{ item.source }} <span aria-hidden="true">↗</span>
              </a>
              <p class="src-list__note">{{ item.note }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Curriculum references -->
    <section id="curriculum" class="src-section src-section--paper" aria-labelledby="src-curriculum-title">
      <div class="container">
        <div class="src-head">
          <p class="src-label">The offline field semester</p>
          <h2 id="src-curriculum-title" class="src-title">Curriculum <em>references.</em></h2>
          <p class="src-copy">
            These primary sources inform the design. They do not approve the programme or establish a partnership. Local
            staff must recheck current conditions and requirements before activities.
          </p>
        </div>

        <ul class="src-list">
          <li v-for="link in curriculumLinks" :key="link.href" class="src-list__row">
            <a class="src-list__link" :href="link.href" target="_blank" rel="noopener noreferrer">
              {{ link.title }} <span aria-hidden="true">↗</span>
            </a>
            <p class="src-list__note">{{ link.note }}</p>
          </li>
        </ul>

        <p class="src-copy src-after">
          The instructor guide links the exact editions and locations of eleven primary philosophical readings, and
          distinguishes original teaching examples from measured data.
        </p>
        <a class="cta cta--primary src-cta" href="/field-semester.pdf" target="_blank" rel="noopener noreferrer">
          Instructor guide and reading references <span class="cta__arrow" aria-hidden="true">↗</span>
        </a>

        <h3 class="src-subhead src-subhead--spaced">Educational reference</h3>
        <p class="src-copy src-subcopy">
          The Horowitz Andreessen Academy informed the emphasis on self-directed projects, peer feedback and proof of
          work. Jasper’s proposed curriculum, audience, location and operating model are its own.
        </p>
        <ul class="src-list">
          <li v-for="link in academyLinks" :key="link.href" class="src-list__row">
            <a class="src-list__link" :href="link.href" target="_blank" rel="noopener noreferrer">
              {{ link.title }} <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- Founding material and credits -->
    <section id="credits" class="src-section src-section--cloud" aria-labelledby="src-credits-title">
      <div class="container">
        <div class="src-head">
          <p class="src-label">Founding material and credits</p>
          <h2 id="src-credits-title" class="src-title">Letters, images, <em>music and crest.</em></h2>
        </div>

        <div class="src-credits">
          <article class="src-credit">
            <h3 class="src-credit__title">Founding material</h3>
            <p class="src-credit__text">
              The founder supplied the original crest, earlier proposals and a recovered welcome letter in PDF and Word.
              Vincent Zhang identifies the letter as written in 2015; the file does not print that date. The sentence
              quoted on this website is exact. The contemporary welcome adapts its ideas and introduces new language. The
              earlier signature is not reproduced; this edition uses the founder’s requested name, Vincent Zhang.
              Personal telephone numbers and the historic street address are not published.
            </p>
          </article>

          <article class="src-credit">
            <h3 class="src-credit__title">Photography</h3>
            <p class="src-credit__text">
              <a class="src-inline" href="https://commons.wikimedia.org/wiki/File:Morning_at_Spirit_Island.jpg" target="_blank" rel="noopener noreferrer">Morning at Spirit Island</a>
              © Sergey Pesterev / Wikimedia Commons, licensed under
              <a class="src-inline" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.
              The original photograph is served unchanged, with a responsive display crop and a separate page overlay.
              Any adapted image presentation is offered under the same licence. Spirit Island is pictured as part of
              Jasper’s landscape, not as a proposed class location or evidence of access permission.
            </p>
          </article>

          <article class="src-credit">
            <h3 class="src-credit__title">Music and founding story</h3>
            <p class="src-credit__text">
              <a class="src-inline" href="https://www.youtube.com/watch?v=htp2z4i4XCI" target="_blank" rel="noopener noreferrer">Jasper Dream Crying</a>,
              an original song written by Vincent Zhang and produced by FarJasper Stories Canada. The linked video’s
              published description identifies Jasper National Park, its lakes and glaciers as the song’s inspiration.
              The site links to the original video; the recording and lyrics are not reproduced.
            </p>
          </article>

          <article class="src-credit">
            <h3 class="src-credit__title">The crest</h3>
            <p class="src-credit__text">
              Original artwork supplied and identified by Vincent Zhang as his own design. Displayed unchanged as the
              project’s founding crest. Cultural meanings beyond the founder’s explanation are not assigned by this site.
            </p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.src {
  font-family: var(--font-sans);
  font-variant-numeric: lining-nums;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--color-ink);
  background: var(--color-paper);
}

.src :where(h1, h2, h3, p, ul, li) {
  margin: 0;
}

.src :where(ul) {
  padding: 0;
  list-style: none;
}

.src :where(h1, h2, h3) {
  font-family: var(--font-serif);
  font-weight: 400;
  letter-spacing: -0.025em;
}

.src a:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

.src-section {
  padding-block: var(--space-section);
  scroll-margin-top: var(--header-height);
}

.src-section--paper {
  background: var(--color-paper);
}

.src-section--cloud {
  background: var(--color-cloud);
}

.src-intro {
  padding-top: var(--space-8);
}

.src-head {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  max-width: 48rem;
  margin-bottom: var(--space-7);
}

.src-label {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.src .src-title {
  font-size: var(--text-display);
  line-height: 1.2;
}

.src-title em {
  font-style: italic;
  color: var(--color-cobalt);
}

.src-copy {
  max-width: 40rem;
  color: var(--color-muted);
}

.src-inline {
  font-weight: 500;
  color: var(--color-cobalt);
  transition: color var(--duration) var(--ease);
}

.src-inline:hover {
  color: var(--color-ink);
}

/* ---------- On this page ---------- */
.src-contents {
  display: grid;
  border-top: 1px solid var(--color-ink);
}

.src-contents__item {
  display: flex;
  align-items: baseline;
  gap: var(--space-4);
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--color-line);
  font-family: var(--font-serif);
  font-size: 1.125rem;
  color: var(--color-ink);
  transition: color var(--duration) var(--ease);
}

.src-contents__item:hover {
  color: var(--color-cobalt);
}

.src-contents__num {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  color: var(--color-cobalt);
}

/* ---------- Reference lists ---------- */
.src-subhead {
  margin-bottom: var(--space-4);
  font-size: 1.5rem;
  line-height: 1.25;
}

.src-subhead--spaced {
  margin-top: var(--space-8);
}

.src-subcopy {
  margin-bottom: var(--space-5);
}

.src-list {
  border-top: 1px solid var(--color-ink);
}

.src-list__row {
  display: grid;
  gap: var(--space-2);
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--color-line);
}

.src-list__link {
  justify-self: start;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-cobalt);
  transition: color var(--duration) var(--ease);
}

.src-list__link:hover {
  color: var(--color-ink);
}

.src-list__note {
  max-width: 44rem;
  font-size: 0.9375rem;
  color: var(--color-muted);
}

.src-list__row--named .src-list__note {
  margin-top: var(--space-2);
}

.src-list__name {
  font-size: 1.5rem;
  line-height: 1.25;
}

.src-after {
  margin-top: var(--space-6);
}

.src-cta {
  margin-top: var(--space-5);
}

/* ---------- Credits ---------- */
.src-credits {
  display: grid;
  border-top: 1px solid var(--color-ink);
}

.src-credit {
  display: grid;
  gap: var(--space-3);
  padding-block: var(--space-6);
  border-bottom: 1px solid var(--color-line);
}

.src-credit__title {
  font-size: 1.5rem;
  line-height: 1.25;
}

.src-credit__text {
  max-width: 44rem;
  color: var(--color-muted);
}

@media (min-width: 900px) {
  .src-contents {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .src-contents__item {
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-4) var(--space-5) 0;
  }

  .src-contents__item + .src-contents__item {
    padding-left: var(--space-4);
    border-left: 1px solid var(--color-line);
  }

  .src-list__row--named,
  .src-credit {
    grid-template-columns: 14rem minmax(0, 1fr);
    gap: var(--space-7);
  }

  .src-list__row--named .src-list__name,
  .src-credit__title {
    padding-top: 0.15rem;
  }
}
</style>
