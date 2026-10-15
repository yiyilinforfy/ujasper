<script setup lang="ts">
const contents = [
  { id: 'governance-sources', label: 'Governance sources' },
  { id: 'operating-sources', label: 'Operating references' },
  { id: 'educational-traditions', label: 'Authorship and provenance' },
  { id: 'readings', label: 'Primary readings' },
  { id: 'credits', label: 'Photography and type' },
]

const governanceLinks = [
  {
    href: 'https://laws-lois.justice.gc.ca/eng/acts/C-7.75/section-128.html',
    title: 'Canada Not-for-profit Corporations Act section 128',
  },
  {
    href: 'https://laws-lois.justice.gc.ca/eng/regulations/SOR-2011-223/FullText.html',
    title: 'Canada Not-for-profit Corporations Regulations section 28',
  },
]

const operatingGroups = [
  {
    title: 'Name and program status',
    text: 'Current written advice and any required authorization are still needed for the name, structure, advertising and planned activities. The founding-project description does not itself grant permission.',
    links: [
      {
        href: 'https://open.alberta.ca/publications/p19p5',
        title: 'Alberta King’s Printer — Post-secondary Learning Act',
      },
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
      {
        href: 'https://parks.canada.ca/pn-np/ab/jasper/securite-safety',
        title: 'Jasper visitor safety',
      },
    ],
  },
]

const traditions = [
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
  {
    week: 'Optional',
    reading: 'E. Pauline Johnson · Legends of Vancouver',
    selection: 'Author’s foreword and The Siwash Rock',
  },
]

const sourceEditions = [
  { href: 'https://classics.mit.edu/Plato/apology.html', title: 'Plato — Apology', note: 'Benjamin Jowett' },
  { href: 'https://www.gutenberg.org/ebooks/216', title: 'Laozi — Tao Te Ching', note: 'James Legge' },
  {
    href: 'https://classics.mit.edu/Aristotle/nicomachaen.2.ii.html',
    title: 'Aristotle — Nicomachean Ethics',
    note: 'W. D. Ross',
  },
  { href: 'https://www.gutenberg.org/ebooks/3330', title: 'Confucius — Analects', note: 'James Legge' },
  {
    href: 'https://accesstoinsight.org/tipitaka/kn/dhp/dhp.02.than',
    title: 'Dhammapada — Heedfulness',
    note: 'Thanissaro Bhikkhu',
  },
  {
    href: 'https://afe.easia.columbia.edu/main_pop/ps/ps_china-wang-yangming-knowing-acting.htm',
    title: 'Wang Yangming — Unity of Knowing and Acting',
    note: 'Columbia Asia for Educators excerpt',
  },
  {
    href: 'https://www.gutenberg.org/ebooks/9662',
    title: 'David Hume — Enquiry Concerning Human Understanding',
    note: 'Specified Gutenberg source',
  },
  { href: 'https://www.gutenberg.org/ebooks/34901', title: 'John Stuart Mill — On Liberty', note: 'Specified Gutenberg source' },
  {
    href: 'https://www.gutenberg.org/ebooks/3420',
    title: 'Mary Wollstonecraft — A Vindication of the Rights of Woman',
    note: 'Specified Gutenberg source',
  },
  {
    href: 'https://doi.org/10.1017/CBO9780511807763.005',
    title: 'Elinor Ostrom — Governing the Commons',
    note: 'Cambridge University Press, licensed or library copy',
  },
  {
    href: 'https://www.gutenberg.org/ebooks/7164',
    title: 'Rabindranath Tagore — Gitanjali',
    note: 'Author’s English rendering',
  },
  {
    href: 'https://parks.canada.ca/pn-np/ab/jasper/activ/experience/sentiers-trails/maligne',
    title: 'Parks Canada — Maligne Lake area and Mary Schäffer Loop',
    note: 'Official site account',
  },
  {
    href: 'https://www.gutenberg.org/ebooks/23',
    title: 'Frederick Douglass — Narrative of the Life of Frederick Douglass',
    note: 'Specified Gutenberg source',
  },
  { href: 'https://classics.mit.edu/Epictetus/epicench.html', title: 'Epictetus — Enchiridion', note: 'Elizabeth Carter' },
  {
    href: 'https://www.gutenberg.org/ebooks/3478',
    title: 'E. Pauline Johnson — Legends of Vancouver',
    note: 'Specified Gutenberg source',
  },
]

const laboratoryLinks = [
  {
    href: 'https://parks.canada.ca/~/~/~/link.aspx?_id=03038F177E7044559197C51732328A87&_z=z',
    title: 'D1 / Dark-sky preserve',
  },
  {
    href: 'https://www.parks.canada.ca/pn-np/ab/jasper/nature/environment/ecosys/glaciers',
    title: 'D2 / Glaciers and icefields',
  },
  {
    href: 'https://parks.canada.ca/pn-np/ab/jasper/activ/itineraires-itineraries/medicine',
    title: 'D3 / Medicine Lake',
  },
  { href: 'https://parks.canada.ca/pn-np/ab/jasper/sources-miette-springs', title: 'D4 / Miette mineral values' },
  {
    href: 'https://parks.canada.ca/pn-np/ab/jasper/activ/experience/sentiers-trails/maligne',
    title: 'D5 / Maligne mapping history',
  },
]
</script>

<template>
  <div class="src">
    <!-- Intro -->
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

        <div class="src-contents" role="navigation" aria-label="On this page">
          <a v-for="(item, i) in contents" :key="item.id" :href="`#${item.id}`" class="src-contents__item">
            <span class="src-contents__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span>{{ item.label }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Governance sources -->
    <section id="governance-sources" class="src-section src-section--cloud" aria-labelledby="src-governance-title">
      <div class="container">
        <div id="governance" class="src-head">
          <h2 id="src-governance-title" class="src-title">Governance sources</h2>
          <p class="src-copy">
            For a federal not-for-profit corporation, Act section 128(3) and Regulations section 28(1) govern elected
            director terms, with the Regulations specifying four years. Re-election and other governance rules require
            attention. This does not determine Jasper’s eventual structure or establish lifetime voting rights.
          </p>
        </div>

        <ul class="src-list">
          <li v-for="link in governanceLinks" :key="link.href" class="src-list__row">
            <a class="src-list__link" :href="link.href" target="_blank" rel="noopener noreferrer">
              {{ link.title }} <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- Operating references -->
    <section id="operating-sources" class="src-section src-section--paper" aria-labelledby="src-operating-title">
      <div class="container">
        <div class="src-head">
          <p class="src-label">Operating references</p>
          <h2 id="src-operating-title" class="src-title">Confirm the actual<br><em>requirements.</em></h2>
        </div>

        <template v-for="(group, i) in operatingGroups" :key="group.title">
          <h3 class="src-subhead" :class="{ 'src-subhead--spaced': i > 0 }">{{ group.title }}</h3>
          <p class="src-copy src-subcopy">{{ group.text }}</p>
          <ul class="src-list">
            <li v-for="link in group.links" :key="link.href" class="src-list__row">
              <a class="src-list__link" :href="link.href" target="_blank" rel="noopener noreferrer">
                {{ link.title }} <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </template>
      </div>
    </section>

    <!-- Authorship and provenance -->
    <section id="educational-traditions" class="src-section src-section--cloud" aria-labelledby="src-traditions-title">
      <div class="container">
        <div class="src-head">
          <h2 id="src-traditions-title" class="src-title">Authorship<br><em>and provenance.</em></h2>
          <p class="src-copy">
            Founding vision, original crest, recovered welcome and Jasper Dream Crying: Vincent Zhang. The original
            welcome is identified by the founder as written in 2015; spacing is normalized. Contemporary program writing
            is presented separately.
          </p>
          <p class="src-copy">
            Release edition: 15 October 2026. Shared content produces the public program, weekly reading plan, syllabus
            and publications. Reading sources are not a bundled anthology or permission to reproduce modern
            translations.
          </p>
        </div>

        <h3 class="src-subhead">Historical influences</h3>
        <ul class="src-list">
          <li v-for="link in traditions" :key="link.href" class="src-list__row">
            <a class="src-list__link" :href="link.href" target="_blank" rel="noopener noreferrer">
              {{ link.title }} <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>

        <p class="src-copy src-after">
          These traditions have different histories. The declaration draws on particular educational ideas rather than
          claiming a single uninterrupted institutional model.
        </p>
      </div>
    </section>

    <!-- Primary readings and Jasper as Laboratory -->
    <section id="readings" class="src-section src-section--paper" aria-labelledby="src-readings-title">
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
                <td>{{ row.week }}</td>
                <td>{{ row.reading }}</td>
                <td>{{ row.selection }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <details class="src-details">
          <summary>Open the source editions</summary>
          <ul class="src-list">
            <li v-for="link in sourceEditions" :key="link.title" class="src-list__row">
              <a class="src-list__link" :href="link.href" target="_blank" rel="noopener noreferrer">
                {{ link.title }} <span aria-hidden="true">↗</span>
              </a>
              <p class="src-list__note">{{ link.note }}</p>
            </li>
          </ul>
        </details>

        <p class="src-copy src-after">
          Teachers select bounded passages, prepare accessible formats and verify reproduction rights before delivery.
          The primary reading plan includes philosophy, poetry, memoir and local accounts.
        </p>

        <div class="src-head src-head--spaced">
          <p class="src-label">Jasper as Laboratory</p>
          <h2 class="src-title">A real place.<br><em>A traceable question.</em></h2>
        </div>
        <ul class="src-list">
          <li v-for="link in laboratoryLinks" :key="link.href" class="src-list__row">
            <a class="src-list__link" :href="link.href" target="_blank" rel="noopener noreferrer">
              {{ link.title }} <span aria-hidden="true">↗</span>
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

    <!-- Photography and type -->
    <section id="credits" class="src-section src-section--cloud" aria-labelledby="src-credits-title">
      <div class="container">
        <div class="src-head">
          <h2 id="src-credits-title" class="src-title">Photography<br><em>and type.</em></h2>
        </div>

        <div class="src-credits">
          <article class="src-credit">
            <h3 class="src-credit__title">Photography</h3>
            <div class="src-credit__body">
              <p class="src-credit__text">
                Morning at Spirit Island — © Sergey Pesterev / Wikimedia Commons, CC BY-SA 4.0. Resized, compressed and
                cropped for responsive presentation; adapted photo versions retain that licence. Landscape context only:
                no campus, class location or access permission is implied.
              </p>
              <p class="src-credit__links">
                <a class="src-inline" href="https://commons.wikimedia.org/wiki/File:Morning_at_Spirit_Island.jpg" target="_blank" rel="noopener noreferrer">Photograph source</a>
                <a class="src-inline" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
              </p>
            </div>
          </article>

          <article class="src-credit">
            <h3 class="src-credit__title">The original crest</h3>
            <p class="src-credit__text">
              Vincent Zhang’s supplied artwork is retained. Responsive versions change file size and display dimensions
              without adding a personal name or date to the institutional mark.
            </p>
          </article>

          <article class="src-credit">
            <h3 class="src-credit__title">Self-hosted fonts</h3>
            <div class="src-credit__body">
              <p class="src-credit__text">
                Inter and Playfair Display are distributed under the SIL Open Font License. Copyright and licence notices
                accompany the assets.
              </p>
              <p class="src-credit__links">
                <a class="src-inline" href="/assets/licences/Inter-OFL.txt">Inter licence</a>
                <a class="src-inline" href="/assets/licences/Playfair-Display-OFL.txt">Playfair Display licence</a>
              </p>
            </div>
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

.src a:focus-visible,
.src-table-wrap:focus-visible,
.src-details summary:focus-visible {
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
  scroll-margin-top: var(--header-height);
}

.src-head--spaced {
  margin-top: var(--space-8);
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

.src-after {
  margin-top: var(--space-6);
}

/* ---------- Primary readings ---------- */
.src-table-wrap {
  overflow-x: auto;
  border-top: 1px solid var(--color-ink);
}

.src-table {
  width: 100%;
  min-width: 36rem;
  border-collapse: collapse;
  text-align: left;
}

.src-table th,
.src-table td {
  padding: var(--space-4) var(--space-4) var(--space-4) 0;
  border-bottom: 1px solid var(--color-line);
  vertical-align: top;
}

.src-table th {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.src-table td {
  font-size: 0.9375rem;
  color: var(--color-muted);
}

.src-table td:nth-child(2) {
  font-weight: 400;
  color: var(--color-ink);
}

.src-details {
  margin-top: var(--space-6);
}

.src-details summary {
  padding-block: var(--space-2);
  font-weight: 500;
  color: var(--color-cobalt);
  cursor: pointer;
  transition: color var(--duration) var(--ease);
}

.src-details summary:hover {
  color: var(--color-ink);
}

.src-details[open] summary {
  margin-bottom: var(--space-4);
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

.src-credit__body {
  display: grid;
  gap: var(--space-3);
}

.src-credit__text {
  max-width: 44rem;
  color: var(--color-muted);
}

.src-credit__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-5);
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

  .src-credit {
    grid-template-columns: 14rem minmax(0, 1fr);
    gap: var(--space-7);
  }

  .src-credit__title {
    padding-top: 0.15rem;
  }
}
</style>
