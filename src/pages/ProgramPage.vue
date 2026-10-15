<script setup lang="ts">
import { ref } from 'vue'
import AppLink from '../components/AppLink.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'

const contents = [
  { id: 'overview', label: 'At a glance' },
  { id: 'courses', label: 'Six courses' },
  { id: 'rhythm', label: 'A teaching week' },
  { id: 'weeks', label: 'Weekly arc' },
  { id: 'outcomes', label: 'Your work' },
  { id: 'practical', label: 'Practical details' },
  { id: 'materials', label: 'Documents' },
]

const commitments = [
  { term: 'Location', plan: 'In person in Jasper, Alberta; venue to be confirmed' },
  { term: 'Daily rhythm', plan: '09:00–16:15; six teaching hours plus 75 minutes of breaks' },
  { term: 'Camping', plan: 'Three proposed nights: one in Week 2, two in Week 5' },
  { term: 'Winter break', plan: 'Mid-December to mid-February; no required teaching or camps' },
  { term: 'Completion', plan: 'Descriptive non-credit record; no degree or professional qualification' },
  { term: 'Dates, fees and accommodation', plan: 'Not yet confirmed; published before formal admissions' },
]

const courses = [
  {
    course: 'JAS 101 · Fieldcraft and physical practice',
    hours: '36 h',
    evidence: 'Route-and-camp decisions; twelve coached 30-minute strength practices within the 36 hours.',
  },
  {
    course: 'JAS 102 · Martial arts and restraint',
    hours: '18 h',
    evidence: 'Controlled movement, agreed boundaries and a demonstrated stop-and-restart procedure.',
  },
  {
    course: 'JAS 103 · Attention and reflective practice',
    hours: '12 h',
    evidence: 'Voluntary attention practice, observation and reflection; no required belief or private disclosure.',
  },
  {
    course: 'JAS 104 · Jasper as Laboratory',
    hours: '30 h',
    evidence: 'Twelve investigations; a scientific dossier with data, model, uncertainty and an individual defence.',
  },
  {
    course: 'JAS 105 · Philosophy and the Jasper Tutorial',
    hours: '30 h',
    evidence: 'Weekly pair tutorials; two revised essays and a fair account of an opposing argument.',
  },
  {
    course: 'JAS 106 · The Commons and original inquiry',
    hours: '18 h',
    evidence: 'Useful original work, peer testing, shared decisions and a public-facing explanation when agreed.',
  },
]

const investigations = [
  {
    title: 'A map is a model',
    question: 'How does a representation shape a journey?',
    text: 'Use a licensed or reusable Jasper map with date, scale and legend. Make five independent measurements of a short segment; convert to ground distance. Read the published account of Samson Beaver’s map used by Mary Schäffer in 1908. Distinguish precision, cultural knowledge and the limits of a printed representation.',
    method: 'Scale, ratios and uncertainty. Extend to alternative route geometries and an uncertainty range.',
  },
  {
    title: 'A landscape in three dimensions',
    question: 'What can we infer without reaching a summit?',
    text: 'Estimate a fixed feature’s height from an approved observation point or an indoor model. Compare similar triangles with angle-and-baseline geometry. Record slope, observer height and assumptions. Use a Jasper landscape image with a valid scale only when the geometry supports measurement.',
    method: 'Similar triangles; tan(theta) = height difference / horizontal baseline. Derive and critique the construction.',
  },
  {
    title: 'The sky as a coordinate system',
    question: 'How could the sky help us find direction?',
    text: 'Use a sourced star chart and Jasper’s latitude to construct horizon and celestial diagrams. Explain Earth’s rotation and a circumpolar star’s apparent path. If a supervised observation is feasible, record time and conditions. Otherwise work from the printed chart, labelled as such.',
    method: 'Angles, rotation and proportional time; the idealised relation between celestial-pole altitude and observer latitude.',
  },
  {
    title: 'The evidence of retreat',
    question: 'What does a changed glacier outline establish?',
    text: 'Compare two dated, attributable images or maps of the Athabasca Glacier after checking scale and registration. Identify a defensible common reference and estimate a terminus displacement with uncertainty. A change in terminus position is not a direct measure of ice mass.',
    method: 'Distance / elapsed time; scale correction and an uncertainty range. Advanced work compares more dates or competing rate models.',
  },
  {
    title: 'Water that disappears',
    question: 'How can we explain Medicine Lake?',
    text: 'Read Parks Canada’s account, draw the visible and underground pathways, and construct a water budget. Compare seasonal inflow change with a change in drainage capacity. Mark observations separately from assumptions. Use an explicitly illustrative flow card for numerical practice.',
    method: 'Change in storage = total inflow minus total outflow over an interval. Track volume and time units; identify unknown terms.',
  },
  {
    title: 'Heat and preparation',
    question: 'Which model explains the cooling curve?',
    text: 'Compare wrapped and unwrapped identical cups using staff-prepared warm water indoors. Record equal starting conditions and repeat measurements. Plot temperature difference from room temperature. Explain how a controlled model relates to mountain preparation and where that comparison fails.',
    method: 'Rates, graphs and an exponential-cooling extension using supplied logarithm tables; discuss conduction, convection and evaporation.',
  },
  {
    title: 'Water as chemical evidence',
    question: 'What does Miette’s mineral list actually tell us?',
    text: 'Use the published Parks Canada dataset: sulphate 1130, calcium 307, bicarbonate 124, magnesium 56 and sodium 10.5 mg/L. Convert a selected value into mmol/L using supplied molar masses. Compare charge equivalents and explain why the listed species may not close a complete charge balance.',
    method: 'Mass concentration, amount of substance, ionic charge and units. Identify measurement-date and completeness limitations.',
  },
  {
    title: 'Recovery and comparison',
    question: 'What would count as evidence after fire?',
    text: 'Use sourced Jasper recovery material and a clearly labelled printed teaching grid to compare sampling plans. For a real dataset, identify dates, locations, selection and missing observations. Explain why one burned/unburned comparison cannot isolate the fire’s effect from prior differences.',
    method: 'Sampling bias, proportions, variability and confounding. Compare results under two sample-selection rules.',
  },
  {
    title: 'Energy and a decision',
    question: 'What does gaining height cost in a model?',
    text: 'Use a fictional mass and an approved or clearly illustrative route profile. Calculate gravitational energy and average mechanical power. Compare route choices by time, access, effort and purpose. Explain why the energy calculation is not a personal calorie prescription.',
    method: 'Delta E = mgh; power = energy / time; opportunity cost and sensitivity to assumptions.',
  },
  {
    title: 'Models under pressure',
    question: 'How could a useful explanation fail?',
    text: 'Return to one water, sky, heat or glacier model. Change a stated assumption and derive a new prediction. Use a low-risk tabletop test or a fresh published observation when available. Require the other pair to challenge the prediction rather than merely repeat arithmetic.',
    method: 'Choose geometry, rates, concentration or uncertainty analysis appropriate to the question. Explain the model’s domain.',
  },
  {
    title: 'An investigation of your own',
    question: 'What can we now investigate with intellectual honesty?',
    text: 'Complete a scoped proposal using already approved methods or published data. State the question, source provenance, predicted result, alternative explanation, method and limitation. Keep failed trials and unresolved questions. Field research needs prior determination and authorization where required.',
    method: 'Select and defend a suitable model. Advanced work may compare models or test robustness; a new equation is not required.',
  },
  {
    title: 'Defend and revise',
    question: 'Can your explanation survive a serious question?',
    text: 'Exchange dossiers and audit one critical calculation or method. Each learner answers questions about evidence, assumptions and alternatives, then revises the conclusion. Retain the pre-revision account for the optional AI Return Lab.',
    method: 'Check units, model assumptions, uncertainty and logical inference. Explain one thing the evidence cannot establish.',
  },
]

const days = [
  {
    key: 'A',
    periods: [
      { period: 'Morning', items: ['09:00 attention 15m', '09:15 science 150m', '11:45 break 15m'] },
      { period: 'Afternoon', items: ['12:00 lunch 45m', '12:45 martial arts 90m', '14:15 break 15m', '14:30 philosophy 105m'] },
    ],
  },
  {
    key: 'B',
    periods: [
      { period: 'Morning', items: ['09:00 attention 15m', '09:15 fieldcraft: 180m taught + 30m breaks'] },
      { period: 'Afternoon', items: ['12:45 lunch 45m', '13:30 philosophy 90m', '15:00 commons 75m'] },
    ],
  },
  {
    key: 'C',
    periods: [
      { period: 'Morning', items: ['09:00 attention 15m', '09:15 science 150m', '11:45 break 15m'] },
      { period: 'Afternoon', items: ['12:00 lunch 45m', '12:45 martial arts 90m', '14:15 break 15m', '14:30 attention seminar 60m', '15:30 commons 45m'] },
    ],
  },
  {
    key: 'D',
    periods: [
      { period: 'Morning', items: ['09:00 attention 15m', '09:15 fieldcraft: 180m taught + 30m breaks'] },
      { period: 'Afternoon', items: ['12:45 lunch 45m', '13:30 philosophy 105m', '15:15 commons 60m'] },
    ],
  },
]

const weeks = [
  {
    theme: 'Attention',
    question: 'What do I notice, and what do I merely assume?',
    practice: 'Use a staff-approved short local route. Record ten observations, three inferences and one uncertainty. Read legend, scale and orientation at three agreed stops. Practise posture, spacing, footwork and a verbal stop cue with a coach. Use solo movement before any paired task. Complete the two coached strength sessions within fieldcraft; record an appropriate variation, feedback and recovery.',
    seminarQuestion: 'What deserves our attention?',
    seminar: 'Plato, Apology: selected passages on examination and responsibility; Laozi, Tao Te Ching: Chapters 1, 2 and 11. Compare what argument reveals with what naming may conceal.',
    work: 'A 400–600-word opening argument, two annotated passages and a tutorial revision.',
    readings: [
      {
        href: 'https://classics.mit.edu/Plato/apology.html',
        title: 'Plato · Apology',
        location: '29d–30b and 38a',
      },
      {
        href: 'https://www.gutenberg.org/ebooks/216',
        title: 'Laozi · Tao Te Ching',
        location: 'Chapters 1, 2 and 11',
      },
    ],
  },
  {
    theme: 'Discipline',
    question: 'When does restraint make us stronger?',
    practice: 'At a reserved serviced campsite, practise shelter setup, layout, dry storage and shared chores. The lead teaches the site’s actual food and wildlife procedures. Use staff-approved cooking equipment only. On suitable mats, use coach-chosen low-resistance balance tasks; no throws or submissions. Partners continuously agree the level of contact. Complete the two coached strength sessions within fieldcraft; record an appropriate variation, feedback and recovery.',
    seminarQuestion: 'When does practice become character?',
    seminar: 'Aristotle, Nicomachean Ethics II.1–6; Confucius, Analects 2.4, 4.17, 12.1 and 15.24. Read Dhammapada II, verses 21–32 as a short third perspective on attention and conduct.',
    work: 'An Essay 1 draft connecting a precise textual claim with one observed practice; distinguish habit from conformity.',
    readings: [
      {
        href: 'https://classics.mit.edu/Aristotle/nicomachaen.2.ii.html',
        title: 'Aristotle · Nicomachean Ethics',
        location: 'Book II.1–6; bounded passages to be selected',
      },
      {
        href: 'https://www.gutenberg.org/ebooks/3330',
        title: 'Confucius · Analects',
        location: '2.4, 4.17, 12.1 and 15.24',
      },
      {
        href: 'https://accesstoinsight.org/tipitaka/kn/dhp/dhp.02.than',
        title: 'Dhammapada · Heedfulness',
        location: 'Chapter II, verses 21–32',
      },
    ],
  },
  {
    theme: 'Evidence',
    question: 'What would change my mind?',
    practice: 'Choose an approved route with simple observation stops. Measure sections against the printed map; explain why pace, grade and weather change a time estimate. Watch a short technical demonstration and distinguish what was seen from what was inferred. Practise the selected correction slowly. Complete the two coached strength sessions within fieldcraft; record an appropriate variation, feedback and recovery.',
    seminarQuestion: 'Can we know and fail to act?',
    seminar: 'Wang Yangming’s knowledge/action exchange recorded by Xu Ai, paired with Hume, Enquiry IV on experience and inference. Preserve their different questions and historical settings.',
    work: 'Essay 1 revised to 1,200–1,500 words or equivalent; answer a counterexample in tutorial.',
    readings: [
      {
        href: 'https://afe.easia.columbia.edu/main_pop/ps/ps_china-wang-yangming-knowing-acting.htm',
        title: 'Wang Yangming · Unity of Knowing and Acting',
        location: 'Xu Ai exchange; Sources of Chinese Tradition, 2nd edition, vol.1, pp.849–850',
      },
      {
        href: 'https://www.gutenberg.org/ebooks/9662',
        title: 'David Hume · Enquiry Concerning Human Understanding',
        location: 'Section IV, Parts I–II; bounded passages to be selected',
      },
    ],
  },
  {
    theme: 'Freedom',
    question: 'What makes disagreement productive?',
    practice: 'Pairs explain the next short section while the guide retains control. Rotate leader, navigator, companion-check and recorder roles. Keep the party together. Rehearse assertive verbal boundaries, stepping away and seeking help through non-contact scenarios. No simulated ambush or coercive role-play. Complete the two coached strength sessions within fieldcraft; record an appropriate variation, feedback and recovery.',
    seminarQuestion: 'Who has the standing to speak?',
    seminar: 'Mill, On Liberty II; Wollstonecraft, Vindication II. Examine the institutions and educational opportunities needed for meaningful independence.',
    work: 'A 600–800-word Essay 2 proposal, an opposing argument represented fairly and a learner-council decision record.',
    readings: [
      {
        href: 'https://www.gutenberg.org/ebooks/34901',
        title: 'John Stuart Mill · On Liberty',
        location: 'Chapter II; selected fallibility argument',
      },
      {
        href: 'https://www.gutenberg.org/ebooks/3420',
        title: 'Mary Wollstonecraft · A Vindication of the Rights of Woman',
        location: 'Chapter II; selected passages on education and reason',
      },
    ],
  },
  {
    theme: 'Responsibility',
    question: 'What do I owe to a place and to other people?',
    practice: 'Repeat the readiness gate. Set up in a reserved serviced site; assign fair chores, verify communications and practise the agreed regroup location. Design a short safe sequence from previously approved movements, then have the coach review it before practice. Complete the two coached strength sessions within fieldcraft; record an appropriate variation, feedback and recovery.',
    seminarQuestion: 'How should a community govern what it shares?',
    seminar: 'Selected passages from Ostrom, Governing the Commons, Chapter 3, alongside Tagore, Gitanjali 35–36 and local published mapping history. Test an institutional rule against a concrete shared-resource problem.',
    work: 'Essay 2 draft; a proposed rule with monitoring, revision and a fair account of who bears its costs.',
    readings: [
      {
        href: 'https://doi.org/10.1017/CBO9780511807763.005',
        title: 'Elinor Ostrom · Governing the Commons',
        location: 'Chapter 3, pp.58–102 is the source range; a bounded passage is still to be selected',
      },
      {
        href: 'https://www.gutenberg.org/ebooks/7164',
        title: 'Rabindranath Tagore · Gitanjali',
        location: 'Poems 35 and 36',
      },
      {
        href: 'https://parks.canada.ca/pn-np/ab/jasper/activ/experience/sentiers-trails/maligne',
        title: 'Parks Canada · Maligne Lake area and Mary Schäffer Loop',
        location: 'Published account crediting Samson Beaver’s map; exact dated excerpt to be archived',
      },
    ],
  },
  {
    theme: 'Contribution',
    question: 'What can I now explain, do and give?',
    practice: 'Revisit a comparable accessible route or indoor map problem. Compare preparation and decisions with Week 1. Explain the difference between better judgment and simply better conditions. Practise the final sequence at an agreed pace. Show the solo or adapted equivalent. Include a stop and restart decision. Complete the two coached strength sessions within fieldcraft; record an appropriate variation, feedback and recovery.',
    seminarQuestion: 'What can personal agency change?',
    seminar: 'Douglass, Narrative VI–VII; Epictetus, Enchiridion 1, 5 and 30. Ask what requires personal practice and what requires changing institutions.',
    work: 'Essay 2 revised to 1,200–1,500 words or equivalent; individual defence and a justified continuation plan.',
    readings: [
      {
        href: 'https://www.gutenberg.org/ebooks/23',
        title: 'Frederick Douglass · Narrative of the Life of Frederick Douglass',
        location: 'Chapters VI–VII; bounded passages to be selected',
      },
      {
        href: 'https://classics.mit.edu/Epictetus/epicench.html',
        title: 'Epictetus · Enchiridion',
        location: 'Sections 1, 5 and 30',
      },
    ],
  },
]

const workDetails = [
  {
    title: 'The Jasper tutorial',
    text: 'Each learner has a weekly 30-minute tutorial in a pair. Two educators run two simultaneous stations during the one-hour rotation; the second educator contributes six additional contact hours across the semester. Bring a claim, a passage and an objection. Leave with a justified revision.',
  },
  {
    title: 'Physical progression',
    text: 'Twelve 30-minute coached sessions are part of fieldcraft, not extra hours. Compare appropriate submaximal practice in Weeks 1 and 6, record conditions and technique, and adapt progression with a qualified coach. There are no public fitness rankings.',
  },
  {
    title: 'Three levels of challenge',
    text: 'Begin by making a sound observation or reconstructing an argument. Develop a model or answer an objection. Extend the work by comparing models, testing uncertainty or defending a substantial revision. Greater depth does not require greater physical risk.',
  },
]

const practical = [
  {
    title: 'Offline together',
    text: 'Personal phones, internet and live AI are off during teaching and camps, with agreed private medical, accessibility and essential-contact exceptions. Staff emergency communications remain active. Storage is voluntary and devices are returned on request.',
  },
  {
    title: 'AI after independent work',
    text: 'The wider vision includes responsible AI inquiry. The first semester develops original judgment offline. An optional three-hour AI Return Lab follows separately, outside the 168 academic hours; it requires its own scheduling and resources.',
  },
  {
    title: 'Access and participation',
    text: 'Adapted physical practice, a supervised day-camp equivalent and accessible forms of academic evidence carry the same educational standing. Private arrangements must be agreed before enrolment.',
  },
  {
    title: 'Before admissions open',
    text: 'The accountable operator, qualified staff, venue, permissions, insurance, costs, accommodation arrangements and funding must be confirmed. No place, job, date or scholarship is offered by this website.',
  },
]

const pad = (n: number) => String(n).padStart(2, '0')

const activeDay = ref(0)
const dayTabs = ref<HTMLButtonElement[]>([])

function selectDay(index: number, focus = false) {
  activeDay.value = index
  if (focus) dayTabs.value[index]?.focus()
}

function onDayKeydown(event: KeyboardEvent, index: number) {
  const count = days.length
  let next: number | undefined
  if (event.key === 'ArrowRight') next = (index + 1) % count
  else if (event.key === 'ArrowLeft') next = (index + count - 1) % count
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = count - 1
  if (next === undefined) return
  event.preventDefault()
  selectDay(next, true)
}
</script>

<template>
  <div class="pg">
    <section class="pg-hero" aria-labelledby="pg-hero-title">
      <ResponsiveImage class="pg-hero__image" name="hero-ridge" priority />
      <div class="pg-hero__shade" aria-hidden="true"></div>
      <div class="container pg-hero__content">
        <div class="pg-hero__copy">
          <p class="pg-hero__eyebrow">The Jasper Field Semester · Proposed program</p>
          <h1 id="pg-hero-title" class="pg-hero__title">Go deeply.<br><em>Come back changed.</em></h1>
          <p class="pg-hero__lead">
            Six weeks in Jasper for 6–8 adults. Physical capability, close reading, scientific investigation and useful
            creation belong to the same day.
          </p>
        </div>
      </div>
    </section>

    <div class="pg-contents">
      <div class="container pg-contents__inner">
        <nav class="pg-toc" aria-label="On this page">
          <ul class="pg-toc__list">
            <li v-for="item in contents" :key="item.id">
              <a class="pg-toc__link" :href="`#${item.id}`">{{ item.label }}</a>
            </li>
          </ul>
        </nav>
        <p class="pg-status">
          Proposed program · Admissions not open.
          <AppLink class="link" to="/founding">See what is established and what comes next</AppLink>
        </p>
      </div>
    </div>

    <section id="overview" class="pg-section" aria-labelledby="overview-title">
      <div class="container">
        <div class="pg-head">
          <p class="pg-label">At a glance</p>
          <h2 id="overview-title" class="pg-title">Serious work.<br><em>Room to think.</em></h2>
          <p class="pg-lead">
            Four teaching days each week. 144 facilitated hours and 24 independent-study hours: 168 planned academic
            hours. Camp duty, travel, meals and rest are separate commitments.
          </p>
        </div>
        <div class="pg-table-wrap" tabindex="0" role="region" aria-label="Commitment and Plan">
          <table class="pg-table pg-table--glance">
            <thead>
              <tr>
                <th scope="col">Commitment</th>
                <th scope="col">Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in commitments" :key="row.term">
                <th scope="row">{{ row.term }}</th>
                <td>{{ row.plan }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section id="courses" class="pg-section pg-section--cloud" aria-labelledby="courses-title">
      <div class="container">
        <div class="pg-head">
          <p class="pg-label">Six connected courses</p>
          <h2 id="courses-title" class="pg-title">A curriculum with<br><em>something to demonstrate.</em></h2>
        </div>
        <div
          class="pg-table-wrap"
          tabindex="0"
          role="region"
          aria-label="Course and Facilitated time and Evidence of learning"
        >
          <table class="pg-table pg-table--courses">
            <thead>
              <tr>
                <th scope="col">Course</th>
                <th scope="col">Facilitated time</th>
                <th scope="col">Evidence of learning</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in courses" :key="row.course">
                <th scope="row">{{ row.course }}</th>
                <td class="pg-table__hours">{{ row.hours }}</td>
                <td>{{ row.evidence }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="pg-note">
          Course hours total 144. Four further hours weekly support reading, essay development and science preparation.
        </p>

        <details class="pg-disclosure">
          <summary class="pg-disclosure__summary">Explore the twelve Jasper investigations</summary>
          <ol class="pg-investigations">
            <li v-for="(item, i) in investigations" :key="item.title" class="pg-investigation">
              <h3 class="pg-item-title">
                <span class="pg-investigation__no">{{ i + 1 }} /</span> {{ item.title }}
              </h3>
              <p class="pg-investigation__question">{{ item.question }}</p>
              <p class="pg-text">{{ item.text }}</p>
              <p class="pg-investigation__method">{{ item.method }}</p>
            </li>
          </ol>
        </details>
      </div>
    </section>

    <section id="rhythm" class="pg-section" aria-labelledby="rhythm-title">
      <div class="container">
        <div class="pg-head">
          <p class="pg-label">A teaching week</p>
          <h2 id="rhythm-title" class="pg-title">Attention has a rhythm.</h2>
        </div>
        <div class="pg-tabs" role="tablist" aria-label="Teaching days">
          <button
            v-for="(day, i) in days"
            :id="`day-tab-${day.key}`"
            :key="day.key"
            :ref="el => { if (el) dayTabs[i] = el as HTMLButtonElement }"
            type="button"
            class="pg-tab"
            role="tab"
            :aria-controls="`day-panel-${day.key}`"
            :aria-selected="activeDay === i ? 'true' : 'false'"
            :tabindex="activeDay === i ? 0 : -1"
            @click="selectDay(i)"
            @keydown="onDayKeydown($event, i)"
          >
            Day {{ day.key }}
          </button>
        </div>
        <div
          v-for="(day, i) in days"
          :id="`day-panel-${day.key}`"
          :key="day.key"
          class="pg-panel"
          role="tabpanel"
          :aria-labelledby="`day-tab-${day.key}`"
          tabindex="0"
          :hidden="activeDay !== i"
        >
          <table class="pg-table pg-table--day">
            <thead>
              <tr>
                <th scope="col">Period</th>
                <th scope="col">Teaching and breaks</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="period in day.periods" :key="period.period">
                <th scope="row">{{ period.period }}</th>
                <td>
                  <span v-for="item in period.items" :key="item" class="pg-slot">
                    <span class="pg-slot__time">{{ item.slice(0, 5) }}</span> {{ item.slice(6) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="pg-note">
          Four teaching days are arranged around local conditions. In camp weeks, the proposed order is A on Tuesday, C
          on Wednesday, B on Thursday and D on Friday, with Week 5 return on Saturday. Camp duty and rest must be
          separately staffed.
        </p>
      </div>
    </section>

    <section id="weeks" class="pg-section pg-section--cloud" aria-labelledby="weeks-title">
      <div class="container">
        <div class="pg-head">
          <p class="pg-label">The six-week arc</p>
          <h2 id="weeks-title" class="pg-title">One question becomes<br><em>a practice of inquiry.</em></h2>
        </div>
        <div class="pg-weeks">
          <details v-for="(week, i) in weeks" :key="week.theme" class="pg-week">
            <summary class="pg-week__summary">
              <span class="pg-week__no">{{ pad(i + 1) }}</span><span class="visually-hidden"> · </span>
              <span class="pg-week__heading">
                <span class="pg-week__theme">{{ week.theme }}</span><span class="visually-hidden"> — </span>
                <span class="pg-week__question">{{ week.question }}</span>
              </span>
            </summary>
            <div class="pg-week__body">
              <p class="pg-week__practice">{{ week.practice }}</p>
              <div class="pg-week__parts">
                <div class="pg-week__part">
                  <h3 class="pg-part-title">The seminar question</h3>
                  <p class="pg-week__seminar-question">{{ week.seminarQuestion }}</p>
                  <p class="pg-text">{{ week.seminar }}</p>
                </div>
                <div class="pg-week__part">
                  <h3 class="pg-part-title">Work to keep</h3>
                  <p class="pg-text">{{ week.work }}</p>
                </div>
                <div class="pg-week__part">
                  <h3 class="pg-part-title">Reading locations</h3>
                  <ul class="pg-readings">
                    <li v-for="reading in week.readings" :key="reading.href">
                      <a class="link" :href="reading.href">{{ reading.title }}</a> — {{ reading.location }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </details>
        </div>
        <p class="pg-note">
          Primary readings include philosophy, poetry, memoir and local accounts. Teachers prepare bounded selections and
          accessible formats; the source list is not a reproduced anthology.
        </p>
      </div>
    </section>

    <section id="outcomes" class="pg-section" aria-labelledby="outcomes-title">
      <div class="container">
        <div class="pg-head">
          <p class="pg-label">Your work</p>
          <h2 id="outcomes-title" class="pg-title">Earn the confidence<br><em>to explain it.</em></h2>
          <p class="pg-lead">
            Six weekly entries, two revised essays of 1,200–1,500 words, an 800–1,200-word scientific dossier, useful
            original work, coached demonstrations and an individual defence. Agreed equivalents preserve the intellectual
            standard.
          </p>
          <p class="pg-lead">
            Five dimensions are scored from 0 to 3: practice and care; evidence and reasoning; interpretation and
            argument; original work and revision; contribution and autonomy. Completion requires level 2 in each after an
            opportunity to revise.
          </p>
        </div>
        <div class="pg-faq">
          <details v-for="item in workDetails" :key="item.title" class="pg-faq__item">
            <summary class="pg-faq__summary">{{ item.title }}</summary>
            <p class="pg-faq__body">{{ item.text }}</p>
          </details>
        </div>
        <p class="pg-after">
          <AppLink class="link" to="/learning">Inspect an example of the standard <span aria-hidden="true">→</span></AppLink>
        </p>
      </div>
    </section>

    <section id="practical" class="pg-section pg-section--cloud" aria-labelledby="practical-title">
      <div class="container">
        <div class="pg-head">
          <p class="pg-label">Practical details</p>
          <h2 id="practical-title" class="pg-title">Know the commitment<br><em>before you choose it.</em></h2>
        </div>
        <ul class="pg-practical">
          <li v-for="(item, i) in practical" :key="item.title" class="pg-practical__item">
            <h3 class="pg-item-title">{{ item.title }}</h3>
            <p class="pg-text">{{ item.text }}</p>
            <p v-if="i === practical.length - 1" class="pg-actions">
              <AppLink class="link" to="/founding">Check the founding conditions <span aria-hidden="true">→</span></AppLink>
              <AppLink class="link" to="/care">Read care and privacy <span aria-hidden="true">→</span></AppLink>
            </p>
          </li>
        </ul>
      </div>
    </section>

    <section id="materials" class="pg-section" aria-labelledby="materials-title">
      <div class="container">
        <div class="pg-head">
          <p class="pg-label">Complete materials</p>
          <h2 id="materials-title" class="pg-title">The plan, in full.</h2>
          <p class="pg-lead">
            The academic curriculum, operations manual and printable fieldbook are designed to be used together. Read each
            online or download the matching edition.
          </p>
        </div>
        <div class="pg-actions">
          <AppLink class="cta cta--primary" to="/publications">
            Open the publication library <span class="cta__arrow" aria-hidden="true">→</span>
          </AppLink>
          <a class="link" href="/syllabus.txt">Download the short syllabus</a>
        </div>
        <div class="pg-actions pg-actions--rule">
          <AppLink class="link" to="/join/students">Prepare a student introduction <span aria-hidden="true">→</span></AppLink>
          <AppLink class="link" to="/join/teachers">Explore founding teaching roles <span aria-hidden="true">→</span></AppLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pg {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-variant-numeric: lining-nums;
  font-size: var(--text-body);
  font-weight: 300;
  line-height: 1.625;
}

.pg :where(h1, h2, h3, p, ul, ol, table) {
  margin: 0;
}

.pg :where(ul, ol) {
  padding: 0;
  list-style: none;
}

.pg :where(a, button, summary, [tabindex='0']):focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

/* ---------- Hero ---------- */
.pg-hero {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: flex-end;
  min-height: min(calc(100svh - 5.5rem), 46rem);
  overflow: hidden;
  background: var(--color-navy-deep);
  color: var(--color-on-dark);
}

.pg-hero__image {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 60% 45%;
}

.pg-hero__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(to bottom, rgba(14, 36, 57, 0.2) 0%, rgba(14, 36, 57, 0.7) 100%),
    linear-gradient(90deg, rgba(11, 27, 42, 0.55) 0%, rgba(11, 27, 42, 0) 60%);
}

.pg-hero__content {
  padding-block: var(--space-9) var(--space-8);
}

.pg-hero__copy {
  max-width: 42rem;
}

.pg-hero__eyebrow {
  margin-bottom: var(--space-4);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
}

.pg .pg-hero__title {
  margin-bottom: var(--space-6);
  font-family: var(--font-serif);
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.1;
  color: inherit;
}

.pg-hero__title em {
  font-family: inherit;
  font-style: italic;
  font-weight: 400;
  color: var(--color-ice);
}

.pg-hero__lead {
  max-width: 36rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: #e5e7eb;
}

@media (min-width: 640px) {
  .pg-hero__lead {
    font-size: 1.125rem;
  }
}

@media (max-width: 760px) {
  .pg-hero {
    min-height: calc(100svh - 7.75rem);
  }

  .pg-hero__content {
    padding-block: var(--space-9) var(--space-6);
  }
}

/* ---------- On this page ---------- */
.pg-contents {
  border-bottom: 1px solid var(--color-line);
  background: var(--color-paper);
}

.pg-contents__inner {
  display: grid;
  gap: var(--space-3);
  padding-block: var(--space-5);
}

.pg-toc {
  display: block;
}

.pg-toc__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-6);
}

.pg-toc .pg-toc__link {
  display: block;
  padding: var(--space-1) 0;
  border-bottom: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  line-height: 1.5;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--color-muted);
  transition: color var(--duration) var(--ease);
}

.pg-toc .pg-toc__link:hover {
  color: var(--color-cobalt);
}

.pg-status {
  font-size: var(--text-small);
  color: var(--color-muted);
}

/* ---------- Sections ---------- */
.pg-section {
  padding-block: var(--space-section);
  background: var(--color-paper);
  scroll-margin-top: var(--header-height);
}

.pg-section--cloud {
  background: var(--color-cloud);
}

.pg-head {
  display: grid;
  justify-items: start;
  gap: var(--space-5);
  max-width: 48rem;
  margin-bottom: var(--space-7);
}

.pg-label {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.pg .pg-title {
  font-family: var(--font-serif);
  font-size: var(--text-display);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: var(--color-ink);
}

.pg-title em {
  font-family: inherit;
  font-style: italic;
  font-weight: 400;
  color: var(--color-cobalt);
}

.pg-lead,
.pg-text {
  max-width: 40rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--color-muted);
}

.pg .pg-item-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.25;
  color: var(--color-ink);
}

.pg .pg-part-title {
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--color-ink);
}

.pg-note {
  max-width: 40rem;
  margin-top: var(--space-5);
  font-size: var(--text-small);
  line-height: 1.6;
  color: var(--color-muted);
}

.pg-after {
  margin-top: var(--space-7);
}

.pg-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4) var(--space-6);
}

.pg-actions--rule {
  margin-top: var(--space-7);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-line);
}

/* ---------- Tables ---------- */
.pg-table-wrap {
  overflow-x: auto;
}

.pg-table {
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid var(--color-ink);
  font-size: 1rem;
  line-height: 1.625;
}

.pg-table th,
.pg-table td {
  padding: var(--space-4) var(--space-5) var(--space-4) 0;
  border-bottom: 1px solid var(--color-line);
  text-align: left;
  vertical-align: top;
}

.pg-table th:last-child,
.pg-table td:last-child {
  padding-right: 0;
}

.pg-table thead th {
  padding-block: var(--space-3);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-muted);
}

.pg-table tbody th {
  font-weight: 500;
  color: var(--color-ink);
}

.pg-table tbody td {
  font-weight: 300;
  color: var(--color-muted);
}

.pg-table--glance tbody th {
  width: 30%;
}

.pg-table--courses {
  min-width: 40rem;
}

.pg-table--courses tbody th {
  width: 34%;
}

.pg-table .pg-table__hours {
  width: 9rem;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  line-height: 1.3;
  white-space: nowrap;
  color: var(--color-ink);
}

/* ---------- Disclosures ---------- */
.pg details {
  padding: 0;
  border-top: 0;
}

.pg summary {
  position: relative;
  display: block;
  list-style: none;
  cursor: pointer;
}

.pg summary::-webkit-details-marker {
  display: none;
}

.pg summary::after {
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
  transition: transform var(--duration) var(--ease);
}

.pg details[open] > summary::after {
  transform: translateY(-50%) rotate(45deg);
}

.pg-disclosure {
  margin-top: var(--space-7);
  border-bottom: 1px solid var(--color-line);
}

.pg .pg-disclosure {
  border-top: 1px solid var(--color-ink);
}

.pg-disclosure__summary {
  padding: var(--space-5) var(--space-7) var(--space-5) 0;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.3;
  color: var(--color-ink);
  transition: color var(--duration) var(--ease);
}

.pg-disclosure__summary:hover {
  color: var(--color-cobalt);
}

.pg-investigations {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-7) var(--space-6);
  padding-block: var(--space-5) var(--space-7);
}

.pg-investigation {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-line);
}

.pg-investigation__no {
  color: var(--color-cobalt);
}

.pg-investigation__question {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-style: italic;
  line-height: 1.5;
  color: var(--color-ink);
}

.pg-investigation__method {
  font-size: var(--text-small);
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-ink);
}

/* ---------- Teaching days: tabs ---------- */
.pg-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-line);
}

.pg-tab {
  margin-bottom: -1px;
  padding: var(--space-3) 0;
  border: 0;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  background: none;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.25;
  color: var(--color-muted);
  cursor: pointer;
  transition: color var(--duration) var(--ease), border-color var(--duration) var(--ease);
}

.pg-tab:hover {
  color: var(--color-ink);
}

.pg-tab[aria-selected='true'] {
  border-bottom-color: var(--color-cobalt);
  color: var(--color-ink);
}

.pg-panel {
  max-width: 48rem;
}

.pg-table--day tbody th {
  width: 10rem;
}

.pg-slot {
  display: block;
}

.pg-slot + .pg-slot {
  margin-top: var(--space-1);
}

.pg-slot__time {
  display: inline-block;
  min-width: 3.5rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--color-ink);
}

/* ---------- Six-week arc ---------- */
.pg-weeks {
  border-top: 1px solid var(--color-ink);
}

.pg .pg-week {
  border-bottom: 1px solid var(--color-line);
}

.pg-week__summary {
  grid-template-columns: 3.5rem minmax(0, 1fr);
  gap: var(--space-4);
  align-items: baseline;
  padding: var(--space-5) var(--space-7) var(--space-5) 0;
}

.pg .pg-week__summary {
  display: grid;
}

.pg-week__no {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  color: var(--color-cobalt);
}

.pg-week__heading {
  display: grid;
  gap: var(--space-1);
}

.pg-week__theme {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.25;
  color: var(--color-ink);
  transition: color var(--duration) var(--ease);
}

.pg-week__summary:hover .pg-week__theme {
  color: var(--color-cobalt);
}

.pg-week__question {
  font-size: 1rem;
  font-weight: 300;
  color: var(--color-muted);
}

.pg-week__body {
  display: grid;
  gap: var(--space-6);
  padding: 0 0 var(--space-7) calc(3.5rem + var(--space-4));
}

.pg-week__practice {
  max-width: 46rem;
  font-family: var(--font-serif);
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-ink);
}

.pg-week__parts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-6);
}

.pg-week__part {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-line);
}

.pg-week__seminar-question {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-style: italic;
  line-height: 1.4;
  color: var(--color-ink);
}

.pg-readings {
  display: grid;
  gap: var(--space-3);
  font-size: var(--text-small);
  line-height: 1.6;
  color: var(--color-muted);
}

.pg-readings .link {
  font-size: inherit;
}

/* ---------- Your work ---------- */
.pg-faq {
  max-width: 48rem;
  border-top: 1px solid var(--color-ink);
}

.pg .pg-faq__item {
  border-bottom: 1px solid var(--color-line);
}

.pg-faq__summary {
  padding: var(--space-5) var(--space-7) var(--space-5) 0;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.4;
  color: var(--color-ink);
  transition: color var(--duration) var(--ease);
}

.pg-faq__summary:hover {
  color: var(--color-cobalt);
}

.pg .pg-faq__body {
  max-width: 40rem;
  margin: 0;
  padding-bottom: var(--space-5);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: var(--color-muted);
}

/* ---------- Practical details ---------- */
.pg-practical {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-7) var(--space-8);
}

.pg-practical__item {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-ink);
}

.pg-practical__item .pg-actions {
  margin-top: var(--space-3);
}

/* ---------- Responsive ---------- */
@media (max-width: 1000px) {
  .pg-investigations {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .pg-investigations,
  .pg-week__parts,
  .pg-practical {
    grid-template-columns: minmax(0, 1fr);
  }

  .pg-week__summary {
    grid-template-columns: 2.5rem minmax(0, 1fr);
  }

  .pg-week__body {
    padding-left: 0;
  }

  .pg-table--day tbody th {
    width: 6.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pg-toc__link,
  .pg-tab,
  .pg summary::after,
  .pg-disclosure__summary,
  .pg-faq__summary,
  .pg-week__theme {
    transition: none;
  }
}

@media print {
  .pg-contents {
    display: none;
  }
}
</style>
