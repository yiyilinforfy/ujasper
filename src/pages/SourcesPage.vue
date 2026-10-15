<script setup lang="ts">
const influences = [
  { href: 'https://www.britannica.com/topic/Academy-ancient-school-Athens-Greece', title: 'Ancient Greek inquiry' },
  { href: 'https://www.unibo.it/en/university/who-we-are/our-history', title: 'Bologna and scholarly autonomy' },
  { href: 'https://www.univie.ac.at/en/about-us/', title: 'Vienna and research' },
  {
    href: 'https://www.ox.ac.uk/admissions/undergraduate/courses/learning-at-oxford/personalised-learning',
    title: 'Oxford and close teaching',
  },
  {
    href: 'https://www.undergraduate.study.cam.ac.uk/courses/teaching-supervisions',
    title: 'Cambridge and supervision',
  },
  { href: 'https://www.harvard.edu/president/history/', title: 'Harvard and Eliot’s elective tradition' },
  { href: 'https://hic.hu-berlin.de/en/about', title: 'Humboldt and research-oriented teaching' },
]

const readings = [
  { week: '1', reading: 'Plato · Apology', selection: '29d–30b and 38a' },
  { week: '1', reading: 'Laozi · Tao Te Ching', selection: 'Chapters 1, 2 and 11' },
  { week: '2', reading: 'Aristotle · Nicomachean Ethics', selection: 'Book II.1–6; bounded passages to be selected' },
  { week: '2', reading: 'Confucius · Analects', selection: '2.4, 4.17, 12.1 and 15.24' },
  { week: '2', reading: 'Dhammapada · Heedfulness', selection: 'Chapter II, verses 21–32' },
  {
    week: '3',
    reading: 'Wang Yangming · Unity of Knowing and Acting',
    selection: 'Xu Ai exchange; Sources of Chinese Tradition, 2nd edition, vol.1, pp.849–850',
  },
  {
    week: '3',
    reading: 'David Hume · Enquiry Concerning Human Understanding',
    selection: 'Section IV, Parts I–II; bounded passages to be selected',
  },
  { week: '4', reading: 'John Stuart Mill · On Liberty', selection: 'Chapter II; selected fallibility argument' },
  {
    week: '4',
    reading: 'Mary Wollstonecraft · A Vindication of the Rights of Woman',
    selection: 'Chapter II; selected passages on education and reason',
  },
  {
    week: '5',
    reading: 'Elinor Ostrom · Governing the Commons',
    selection: 'Chapter 3, pp.58–102 is the source range; a bounded passage is still to be selected',
  },
  { week: '5', reading: 'Rabindranath Tagore · Gitanjali', selection: 'Poems 35 and 36' },
  {
    week: '5',
    reading: 'Parks Canada · Maligne Lake area and Mary Schäffer Loop',
    selection: 'Published account crediting Samson Beaver’s map; exact dated excerpt to be archived',
  },
  {
    week: '6',
    reading: 'Frederick Douglass · Narrative of the Life of Frederick Douglass',
    selection: 'Chapters VI–VII; bounded passages to be selected',
  },
  { week: '6', reading: 'Epictetus · Enchiridion', selection: 'Sections 1, 5 and 30' },
  { week: 'Optional', reading: 'E. Pauline Johnson · Legends of Vancouver', selection: 'Author’s foreword and The Siwash Rock' },
]

const editions = [
  { href: 'https://classics.mit.edu/Plato/apology.html', title: 'Plato — Apology', edition: 'Benjamin Jowett' },
  { href: 'https://www.gutenberg.org/ebooks/216', title: 'Laozi — Tao Te Ching', edition: 'James Legge' },
  {
    href: 'https://classics.mit.edu/Aristotle/nicomachaen.2.ii.html',
    title: 'Aristotle — Nicomachean Ethics',
    edition: 'W. D. Ross',
  },
  { href: 'https://www.gutenberg.org/ebooks/3330', title: 'Confucius — Analects', edition: 'James Legge' },
  {
    href: 'https://accesstoinsight.org/tipitaka/kn/dhp/dhp.02.than',
    title: 'Dhammapada — Heedfulness',
    edition: 'Thanissaro Bhikkhu',
  },
  {
    href: 'https://afe.easia.columbia.edu/main_pop/ps/ps_china-wang-yangming-knowing-acting.htm',
    title: 'Wang Yangming — Unity of Knowing and Acting',
    edition: 'Columbia Asia for Educators excerpt',
  },
  {
    href: 'https://www.gutenberg.org/ebooks/9662',
    title: 'David Hume — Enquiry Concerning Human Understanding',
    edition: 'Specified Gutenberg source',
  },
  { href: 'https://www.gutenberg.org/ebooks/34901', title: 'John Stuart Mill — On Liberty', edition: 'Specified Gutenberg source' },
  {
    href: 'https://www.gutenberg.org/ebooks/3420',
    title: 'Mary Wollstonecraft — A Vindication of the Rights of Woman',
    edition: 'Specified Gutenberg source',
  },
  {
    href: 'https://doi.org/10.1017/CBO9780511807763.005',
    title: 'Elinor Ostrom — Governing the Commons',
    edition: 'Cambridge University Press, licensed or library copy',
  },
  { href: 'https://www.gutenberg.org/ebooks/7164', title: 'Rabindranath Tagore — Gitanjali', edition: 'Author’s English rendering' },
  {
    href: 'https://parks.canada.ca/pn-np/ab/jasper/activ/experience/sentiers-trails/maligne',
    title: 'Parks Canada — Maligne Lake area and Mary Schäffer Loop',
    edition: 'Official site account',
  },
  {
    href: 'https://www.gutenberg.org/ebooks/23',
    title: 'Frederick Douglass — Narrative of the Life of Frederick Douglass',
    edition: 'Specified Gutenberg source',
  },
  { href: 'https://classics.mit.edu/Epictetus/epicench.html', title: 'Epictetus — Enchiridion', edition: 'Elizabeth Carter' },
  {
    href: 'https://www.gutenberg.org/ebooks/3478',
    title: 'E. Pauline Johnson — Legends of Vancouver',
    edition: 'Specified Gutenberg source',
  },
]

const laboratory = [
  {
    href: 'https://parks.canada.ca/~/~/~/link.aspx?_id=03038F177E7044559197C51732328A87&_z=z',
    code: 'D1',
    title: 'Dark-sky preserve',
  },
  {
    href: 'https://www.parks.canada.ca/pn-np/ab/jasper/nature/environment/ecosys/glaciers',
    code: 'D2',
    title: 'Glaciers and icefields',
  },
  {
    href: 'https://parks.canada.ca/pn-np/ab/jasper/activ/itineraires-itineraries/medicine',
    code: 'D3',
    title: 'Medicine Lake',
  },
  { href: 'https://parks.canada.ca/pn-np/ab/jasper/sources-miette-springs', code: 'D4', title: 'Miette mineral values' },
  {
    href: 'https://parks.canada.ca/pn-np/ab/jasper/activ/experience/sentiers-trails/maligne',
    code: 'D5',
    title: 'Maligne mapping history',
  },
]

const operating = [
  {
    title: 'Name and program status',
    text: 'Current written advice and any required authorization are still needed for the name, structure, advertising and planned activities. The founding-project description does not itself grant permission.',
    links: [
      { href: 'https://open.alberta.ca/publications/p19p5', title: 'Alberta King’s Printer — Post-secondary Learning Act' },
      {
        href: 'https://www.alberta.ca/post-secondary-program-standards-oversight',
        title: 'Alberta program standards and oversight',
      },
    ],
  },
  {
    title: 'Field activity permissions',
    text: 'Confirm the exact operator, activity and route with Parks Canada. A listed-trail exemption from a Guided Business Licence does not remove the Basic Business Licence requirement. Confirm any required guide qualifications and identification cards.',
    links: [
      {
        href: 'https://parks.canada.ca/pn-np/ab/jasper/gestion-management/permis-permits/licence/guides',
        title: 'Jasper guided business requirements',
      },
      { href: 'https://parks.canada.ca/pn-np/ab/jasper/securite-safety', title: 'Jasper visitor safety' },
    ],
  },
]

const governance = [
  {
    href: 'https://laws-lois.justice.gc.ca/eng/acts/C-7.75/section-128.html',
    title: 'Canada Not-for-profit Corporations Act section 128',
  },
  {
    href: 'https://laws-lois.justice.gc.ca/eng/regulations/SOR-2011-223/FullText.html',
    title: 'Canada Not-for-profit Corporations Regulations section 28',
  },
]
</script>

<template>
  <div class="src">
    <!-- 01 Sources and credits · Authorship and provenance -->
    <section class="src-section src-section--paper src-intro" aria-labelledby="src-title">
      <div class="container">
        <div class="src-head">
          <p class="src-label">Sources and credits</p>
          <h1 id="src-title" class="src-title">Follow the claim.<br><em>Find the source.</em></h1>
          <p class="src-copy">
            Educational influences, primary reading locations and operating references. A citation identifies an
            influence or source; it does not imply an affiliation, partnership or approval.
          </p>
        </div>

        <div class="src-block">
          <h2 id="src-authorship-title" class="src-title">Authorship<br><em>and provenance.</em></h2>
          <div class="src-body">
            <p>
              Founding vision, original crest, recovered welcome and Jasper Dream Crying: Vincent Zhang. The original
              welcome is identified by the founder as written in 2015; spacing is normalized. Contemporary program
              writing is presented separately.
            </p>
            <p>
              Release edition: <time datetime="2026-10-15">15 October 2026</time>. Shared content produces the public
              program, weekly reading plan, syllabus and publications. Reading sources are not a bundled anthology or
              permission to reproduce modern translations.
            </p>
          </div>
        </div>

        <div id="educational-traditions" class="src-sub">
          <h3 class="src-item-title">Historical influences</h3>
          <ul class="src-list">
            <li v-for="link in influences" :key="link.href" class="src-list__row">
              <a class="src-list__link" :href="link.href">{{ link.title }} <span aria-hidden="true">↗</span></a>
            </li>
          </ul>
          <p class="src-note">
            These traditions have different histories. The declaration draws on particular educational ideas rather than
            claiming a single uninterrupted institutional model.
          </p>
        </div>
      </div>
    </section>

    <!-- 02 Primary readings -->
    <section id="readings" class="src-section src-section--cloud" aria-labelledby="src-readings-title">
      <div class="container">
        <div class="src-head">
          <p class="src-label">Primary readings</p>
          <h2 id="src-readings-title" class="src-title">Texts in context.<br><em>Arguments open to challenge.</em></h2>
        </div>

        <div class="src-table-wrap" tabindex="0" role="region" aria-label="Week and Reading and Selection">
          <table class="src-table">
            <thead>
              <tr>
                <th scope="col">Week</th>
                <th scope="col">Reading</th>
                <th scope="col">Selection</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in readings" :key="row.reading">
                <td class="src-table__week">{{ row.week }}</td>
                <td class="src-table__reading">{{ row.reading }}</td>
                <td>{{ row.selection }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <details class="src-details">
          <summary class="src-details__summary">Open the source editions</summary>
          <ul class="src-list src-details__list">
            <li v-for="link in editions" :key="link.href" class="src-list__row">
              <p>
                <a class="src-list__link" :href="link.href">{{ link.title }} <span aria-hidden="true">↗</span></a>
                <span class="src-list__meta"> · {{ link.edition }}</span>
              </p>
            </li>
          </ul>
        </details>

        <p class="src-note">
          Teachers select bounded passages, prepare accessible formats and verify reproduction rights before delivery.
          The primary reading plan includes philosophy, poetry, memoir and local accounts.
        </p>
      </div>
    </section>

    <!-- 03 Jasper as Laboratory -->
    <section class="src-section src-section--paper" aria-labelledby="src-laboratory-title">
      <div class="container">
        <div class="src-head">
          <p class="src-label">Jasper as Laboratory</p>
          <h2 id="src-laboratory-title" class="src-title">A real place.<br><em>A traceable question.</em></h2>
        </div>

        <ul class="src-list">
          <li v-for="link in laboratory" :key="link.code" class="src-list__row">
            <a class="src-list__link" :href="link.href">
              <span class="src-list__code">{{ link.code }} /</span> {{ link.title }} <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
        <p class="src-copy src-after">
          These sources support classroom analysis and preparation. They do not establish current route access,
          field-trip permission or a confirmed visit. Published values are identified as published data, never as our
          own measurements.
        </p>
      </div>
    </section>

    <!-- 04 Operating references -->
    <section id="operating-sources" class="src-section src-section--cloud" aria-labelledby="src-operating-title">
      <div class="container">
        <div class="src-head">
          <p class="src-label">Operating references</p>
          <h2 id="src-operating-title" class="src-title">Confirm the actual<br><em>requirements.</em></h2>
        </div>

        <div class="src-grid">
          <div v-for="group in operating" :key="group.title" class="src-grid__item">
            <h3 class="src-item-title">{{ group.title }}</h3>
            <p class="src-copy">{{ group.text }}</p>
            <ul class="src-list">
              <li v-for="link in group.links" :key="link.href" class="src-list__row">
                <a class="src-list__link" :href="link.href">{{ link.title }} <span aria-hidden="true">↗</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 05 Governance sources -->
    <section id="governance-sources" class="src-section src-section--paper" aria-labelledby="src-governance-title">
      <div id="governance" class="container src-anchor">
        <div class="src-head">
          <h2 id="src-governance-title" class="src-title">Governance sources</h2>
          <p class="src-copy">
            For a federal not-for-profit corporation, Act section 128(3) and Regulations section 28(1) govern elected
            director terms, with the Regulations specifying four years. Re-election and other governance rules require
            attention. This does not determine Jasper’s eventual structure or establish lifetime voting rights.
          </p>
        </div>

        <ul class="src-list">
          <li v-for="link in governance" :key="link.href" class="src-list__row">
            <a class="src-list__link" :href="link.href">{{ link.title }} <span aria-hidden="true">↗</span></a>
          </li>
        </ul>
      </div>
    </section>

    <!-- 06 Photography and type -->
    <section id="credits" class="src-section src-section--cloud" aria-labelledby="src-credits-title">
      <div class="container">
        <div class="src-head">
          <h2 id="src-credits-title" class="src-title">Photography<br><em>and type.</em></h2>
          <p class="src-copy">
            Morning at Spirit Island — © Sergey Pesterev / Wikimedia Commons, CC BY-SA 4.0. Resized, compressed and
            cropped for responsive presentation; adapted photo versions retain that licence. Landscape context only: no
            campus, class location or access permission is implied.
          </p>
          <div class="src-links">
            <a class="link" href="https://commons.wikimedia.org/wiki/File:Morning_at_Spirit_Island.jpg">
              Photograph source <span aria-hidden="true">↗</span>
            </a>
            <a class="link" href="https://creativecommons.org/licenses/by-sa/4.0/">
              CC BY-SA 4.0 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div class="src-credits">
          <div class="src-credit">
            <h3 class="src-item-title">The original crest</h3>
            <p class="src-copy">
              Vincent Zhang’s supplied artwork is retained. Responsive versions change file size and display dimensions
              without adding a personal name or date to the institutional mark.
            </p>
          </div>
          <div class="src-credit">
            <h3 class="src-item-title">Self-hosted fonts</h3>
            <p class="src-copy">
              Inter and Playfair Display are distributed under the SIL Open Font License. Copyright and licence notices
              accompany the assets.
            </p>
            <div class="src-links">
              <a class="link" href="/assets/licences/Inter-OFL.txt">Inter licence</a>
              <a class="link" href="/assets/licences/Playfair-Display-OFL.txt">Playfair Display licence</a>
            </div>
          </div>
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

.src :where(h1, h2, h3, p, ul, li, table) {
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

.src a:focus-visible,
.src-table-wrap:focus-visible,
.src-details__summary:focus-visible {
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

.src-anchor,
.src-sub {
  scroll-margin-top: calc(var(--header-height) + var(--space-6));
}

/* ---------- Section head: label → title → description ---------- */
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

.src-note {
  max-width: 40rem;
  margin-top: var(--space-5);
  font-size: var(--text-small);
  color: var(--color-muted);
}

.src-after {
  margin-top: var(--space-6);
}

.src-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-6);
}

.src .src-item-title {
  font-size: 1.5rem;
  line-height: 1.25;
}

/* ---------- Authorship and provenance ---------- */
.src-block {
  display: grid;
  gap: var(--space-5);
  max-width: 48rem;
  padding-top: var(--space-7);
  border-top: 1px solid var(--color-ink);
}

.src-body {
  display: grid;
  gap: var(--space-5);
  max-width: 46rem;
}

.src-body p {
  font-family: var(--font-serif);
  font-size: clamp(1.0625rem, 1.4vw, 1.1875rem);
  line-height: 1.8;
  color: var(--color-ink);
}

.src-sub {
  display: grid;
  gap: var(--space-4);
  max-width: 48rem;
  margin-top: var(--space-8);
}

/* ---------- Reference lists ---------- */
.src-list {
  border-top: 1px solid var(--color-ink);
}

.src-list__row {
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--color-line);
}

.src-list__link {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-cobalt);
  transition: color var(--duration) var(--ease);
}

.src-list__link:hover {
  color: var(--color-ink);
}

.src-list__meta {
  font-size: 0.9375rem;
  color: var(--color-muted);
}

.src-list__code {
  font-weight: 600;
  letter-spacing: var(--tracking-label);
}

/* ---------- Primary readings table ---------- */
.src-table-wrap {
  overflow-x: auto;
  border-top: 1px solid var(--color-ink);
}

.src-table {
  width: 100%;
  min-width: 40rem;
  border-collapse: collapse;
  font-size: 0.9375rem;
  text-align: left;
}

.src-table th {
  padding: var(--space-3) var(--space-4) var(--space-3) 0;
  border-bottom: 1px solid var(--color-line);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ink);
}

.src-table td {
  padding: var(--space-4) var(--space-4) var(--space-4) 0;
  border-bottom: 1px solid var(--color-line);
  vertical-align: top;
  color: var(--color-muted);
}

.src-table__week {
  width: 6rem;
  font-weight: 500;
  white-space: nowrap;
}

.src-table td.src-table__reading {
  width: 45%;
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  color: var(--color-ink);
}

/* ---------- Source editions disclosure ---------- */
.src-details {
  margin-top: var(--space-6);
}

.src-details__summary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  font-size: var(--text-small);
  font-weight: 500;
  color: var(--color-cobalt);
  cursor: pointer;
  list-style: none;
  transition: color var(--duration) var(--ease);
}

.src-details__summary::-webkit-details-marker {
  display: none;
}

.src-details__summary::after {
  content: '+';
  font-weight: 400;
}

.src-details[open] > .src-details__summary::after {
  content: '−';
}

.src-details__summary:hover {
  color: var(--color-ink);
}

.src-details__list {
  margin-top: var(--space-4);
}

/* ---------- Operating references ---------- */
.src-grid {
  display: grid;
  gap: var(--space-7);
}

.src-grid__item {
  display: grid;
  align-content: start;
  gap: var(--space-4);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-ink);
}

.src-grid__item .src-list {
  margin-top: var(--space-2);
  border-top-color: var(--color-line);
}

/* ---------- Photography and type ---------- */
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

@media (min-width: 900px) {
  .src-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
