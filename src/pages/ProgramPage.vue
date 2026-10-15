<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef } from 'vue'
import AppLink from '../components/AppLink.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'

const figures = [
  { value: '04', label: 'teaching days each week' },
  { value: '144', label: 'facilitated hours' },
  { value: '24', label: 'independent-study hours' },
  { value: '168', label: 'planned academic hours' },
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
    code: 'JAS 101',
    image: 'cards/hike',
    title: 'Fieldcraft and physical practice',
    hours: 36,
    evidence: 'Route-and-camp decisions; twelve coached 30-minute strength practices within the 36 hours.',
  },
  {
    code: 'JAS 102',
    image: 'cards/martial',
    title: 'Martial arts and restraint',
    hours: 18,
    evidence: 'Controlled movement, agreed boundaries and a demonstrated stop-and-restart procedure.',
  },
  {
    code: 'JAS 103',
    image: 'field/landscape',
    title: 'Attention and reflective practice',
    hours: 12,
    evidence: 'Voluntary attention practice, observation and reflection; no required belief or private disclosure.',
  },
  {
    code: 'JAS 104',
    image: 'cards/experiment',
    title: 'Jasper as Laboratory',
    hours: 30,
    evidence: 'Twelve investigations; a scientific dossier with data, model, uncertainty and an individual defence.',
  },
  {
    code: 'JAS 105',
    image: 'cards/read',
    title: 'Philosophy and the Jasper Tutorial',
    hours: 30,
    evidence: 'Weekly pair tutorials; two revised essays and a fair account of an opposing argument.',
  },
  {
    code: 'JAS 106',
    image: 'cards/make',
    title: 'The Commons and original inquiry',
    hours: 18,
    evidence: 'Useful original work, peer testing, shared decisions and a public-facing explanation when agreed.',
  },
]

const days = [
  {
    key: 'A',
    periods: [
      {
        period: 'Morning',
        slots: [
          { time: '09:00', text: 'attention 15m' },
          { time: '09:15', text: 'science 150m' },
          { time: '11:45', text: 'break 15m' },
        ],
      },
      {
        period: 'Afternoon',
        slots: [
          { time: '12:00', text: 'lunch 45m' },
          { time: '12:45', text: 'martial arts 90m' },
          { time: '14:15', text: 'break 15m' },
          { time: '14:30', text: 'philosophy 105m' },
        ],
      },
    ],
  },
  {
    key: 'B',
    periods: [
      {
        period: 'Morning',
        slots: [
          { time: '09:00', text: 'attention 15m' },
          { time: '09:15', text: 'fieldcraft: 180m taught + 30m breaks' },
        ],
      },
      {
        period: 'Afternoon',
        slots: [
          { time: '12:45', text: 'lunch 45m' },
          { time: '13:30', text: 'philosophy 90m' },
          { time: '15:00', text: 'commons 75m' },
        ],
      },
    ],
  },
  {
    key: 'C',
    periods: [
      {
        period: 'Morning',
        slots: [
          { time: '09:00', text: 'attention 15m' },
          { time: '09:15', text: 'science 150m' },
          { time: '11:45', text: 'break 15m' },
        ],
      },
      {
        period: 'Afternoon',
        slots: [
          { time: '12:00', text: 'lunch 45m' },
          { time: '12:45', text: 'martial arts 90m' },
          { time: '14:15', text: 'break 15m' },
          { time: '14:30', text: 'attention seminar 60m' },
          { time: '15:30', text: 'commons 45m' },
        ],
      },
    ],
  },
  {
    key: 'D',
    periods: [
      {
        period: 'Morning',
        slots: [
          { time: '09:00', text: 'attention 15m' },
          { time: '09:15', text: 'fieldcraft: 180m taught + 30m breaks' },
        ],
      },
      {
        period: 'Afternoon',
        slots: [
          { time: '12:45', text: 'lunch 45m' },
          { time: '13:30', text: 'philosophy 105m' },
          { time: '15:15', text: 'commons 60m' },
        ],
      },
    ],
  },
]

const activeDay = ref(0)
const dayTabs = useTemplateRef<HTMLButtonElement[]>('dayTabs')
const currentDay = computed(() => days[activeDay.value]!)

function tabTarget(event: KeyboardEvent, current: number, count: number) {
  const last = count - 1
  const forward = current === last ? 0 : current + 1
  const back = current === 0 ? last : current - 1
  const next = {
    ArrowRight: forward,
    ArrowDown: forward,
    ArrowLeft: back,
    ArrowUp: back,
    Home: 0,
    End: last,
  }[event.key]
  if (next !== undefined) event.preventDefault()
  return next
}

function onDayKeydown(event: KeyboardEvent) {
  const next = tabTarget(event, activeDay.value, days.length)
  if (next === undefined) return
  activeDay.value = next
  nextTick(() => dayTabs.value?.[next]?.focus())
}

const weeks = [
  {
    theme: 'Attention',
    question: 'What do I notice, and what do I merely assume?',
    practice:
      'Use a staff-approved short local route. Record ten observations, three inferences and one uncertainty. Read legend, scale and orientation at three agreed stops. Practise posture, spacing, footwork and a verbal stop cue with a coach. Use solo movement before any paired task. Complete the two coached strength sessions within fieldcraft; record an appropriate variation, feedback and recovery.',
    seminarQuestion: 'What deserves our attention?',
    seminar:
      'Plato, Apology: selected passages on examination and responsibility; Laozi, Tao Te Ching: Chapters 1, 2 and 11. Compare what argument reveals with what naming may conceal.',
    work: 'A 400–600-word opening argument, two annotated passages and a tutorial revision.',
    readings: [
      { href: 'https://classics.mit.edu/Plato/apology.html', title: 'Plato · Apology', location: '29d–30b and 38a' },
      { href: 'https://www.gutenberg.org/ebooks/216', title: 'Laozi · Tao Te Ching', location: 'Chapters 1, 2 and 11' },
    ],
  },
  {
    theme: 'Discipline',
    question: 'When does restraint make us stronger?',
    practice:
      'At a reserved serviced campsite, practise shelter setup, layout, dry storage and shared chores. The lead teaches the site’s actual food and wildlife procedures. Use staff-approved cooking equipment only. On suitable mats, use coach-chosen low-resistance balance tasks; no throws or submissions. Partners continuously agree the level of contact. Complete the two coached strength sessions within fieldcraft; record an appropriate variation, feedback and recovery.',
    seminarQuestion: 'When does practice become character?',
    seminar:
      'Aristotle, Nicomachean Ethics II.1–6; Confucius, Analects 2.4, 4.17, 12.1 and 15.24. Read Dhammapada II, verses 21–32 as a short third perspective on attention and conduct.',
    work: 'An Essay 1 draft connecting a precise textual claim with one observed practice; distinguish habit from conformity.',
    readings: [
      {
        href: 'https://classics.mit.edu/Aristotle/nicomachaen.2.ii.html',
        title: 'Aristotle · Nicomachean Ethics',
        location: 'Book II.1–6; bounded passages to be selected',
      },
      { href: 'https://www.gutenberg.org/ebooks/3330', title: 'Confucius · Analects', location: '2.4, 4.17, 12.1 and 15.24' },
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
    practice:
      'Choose an approved route with simple observation stops. Measure sections against the printed map; explain why pace, grade and weather change a time estimate. Watch a short technical demonstration and distinguish what was seen from what was inferred. Practise the selected correction slowly. Complete the two coached strength sessions within fieldcraft; record an appropriate variation, feedback and recovery.',
    seminarQuestion: 'Can we know and fail to act?',
    seminar:
      'Wang Yangming’s knowledge/action exchange recorded by Xu Ai, paired with Hume, Enquiry IV on experience and inference. Preserve their different questions and historical settings.',
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
    practice:
      'Pairs explain the next short section while the guide retains control. Rotate leader, navigator, companion-check and recorder roles. Keep the party together. Rehearse assertive verbal boundaries, stepping away and seeking help through non-contact scenarios. No simulated ambush or coercive role-play. Complete the two coached strength sessions within fieldcraft; record an appropriate variation, feedback and recovery.',
    seminarQuestion: 'Who has the standing to speak?',
    seminar:
      'Mill, On Liberty II; Wollstonecraft, Vindication II. Examine the institutions and educational opportunities needed for meaningful independence.',
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
    practice:
      'Repeat the readiness gate. Set up in a reserved serviced site; assign fair chores, verify communications and practise the agreed regroup location. Design a short safe sequence from previously approved movements, then have the coach review it before practice. Complete the two coached strength sessions within fieldcraft; record an appropriate variation, feedback and recovery.',
    seminarQuestion: 'How should a community govern what it shares?',
    seminar:
      'Selected passages from Ostrom, Governing the Commons, Chapter 3, alongside Tagore, Gitanjali 35–36 and local published mapping history. Test an institutional rule against a concrete shared-resource problem.',
    work: 'Essay 2 draft; a proposed rule with monitoring, revision and a fair account of who bears its costs.',
    readings: [
      {
        href: 'https://doi.org/10.1017/CBO9780511807763.005',
        title: 'Elinor Ostrom · Governing the Commons',
        location: 'Chapter 3, pp.58–102 is the source range; a bounded passage is still to be selected',
      },
      { href: 'https://www.gutenberg.org/ebooks/7164', title: 'Rabindranath Tagore · Gitanjali', location: 'Poems 35 and 36' },
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
    practice:
      'Revisit a comparable accessible route or indoor map problem. Compare preparation and decisions with Week 1. Explain the difference between better judgment and simply better conditions. Practise the final sequence at an agreed pace. Show the solo or adapted equivalent. Include a stop and restart decision. Complete the two coached strength sessions within fieldcraft; record an appropriate variation, feedback and recovery.',
    seminarQuestion: 'What can personal agency change?',
    seminar:
      'Douglass, Narrative VI–VII; Epictetus, Enchiridion 1, 5 and 30. Ask what requires personal practice and what requires changing institutions.',
    work: 'Essay 2 revised to 1,200–1,500 words or equivalent; individual defence and a justified continuation plan.',
    readings: [
      {
        href: 'https://www.gutenberg.org/ebooks/23',
        title: 'Frederick Douglass · Narrative of the Life of Frederick Douglass',
        location: 'Chapters VI–VII; bounded passages to be selected',
      },
      { href: 'https://classics.mit.edu/Epictetus/epicench.html', title: 'Epictetus · Enchiridion', location: 'Sections 1, 5 and 30' },
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

const dimensions = [
  { letter: 'A', title: 'Practice and care' },
  { letter: 'B', title: 'Evidence and reasoning' },
  { letter: 'C', title: 'Interpretation and argument' },
  { letter: 'D', title: 'Original work and revision' },
  { letter: 'E', title: 'Contribution and autonomy' },
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
    links: [
      { to: '/founding', label: 'Check the founding conditions →' },
      { to: '/care', label: 'Read care and privacy →' },
    ],
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

const activeInvestigation = ref(0)
const investigationTabs = useTemplateRef<HTMLButtonElement[]>('investigationTabs')
const currentInvestigation = computed(() => investigations[activeInvestigation.value]!)

function onInvestigationKeydown(event: KeyboardEvent) {
  const next = tabTarget(event, activeInvestigation.value, investigations.length)
  if (next === undefined) return
  activeInvestigation.value = next
  nextTick(() => investigationTabs.value?.[next]?.focus())
}

const pad = (n: number) => String(n).padStart(2, '0')

const pageNav = [
  { href: '#overview', label: 'At a glance' },
  { href: '#courses', label: 'Six courses' },
  { href: '#rhythm', label: 'A teaching week' },
  { href: '#weeks', label: 'Weekly arc' },
  { href: '#outcomes', label: 'Your work' },
  { href: '#practical', label: 'Practical details' },
  { href: '#materials', label: 'Documents' },
] as const
</script>

<template>
  <div class="fs">
    <section class="fs-hero hero-media" aria-labelledby="fs-hero-title">
      <ResponsiveImage class="hero-media__image" name="hero-ridge" priority />
      <div class="fs-wrap">
        <span class="fs-hero__kicker">The Jasper Field Semester · Proposed program</span>
        <h1 id="fs-hero-title" class="fs-hero__title">Go deeply.<br /><em>Come back changed.</em></h1>
        <p class="fs-hero__deck">
          Six weeks in Jasper for 6–8 adults. Physical capability, close reading, scientific investigation and useful
          creation belong to the same day.
        </p>
        <div class="fs-hero__actions">
          <AppLink class="fs-hero__button fs-hero__button--primary" to="/publications">
            <span>Open the publication library</span>
            <span aria-hidden="true">→</span>
          </AppLink>
          <AppLink class="fs-hero__button" to="/join/students?from=program">
            <span>Prepare a student introduction</span>
            <span aria-hidden="true">→</span>
          </AppLink>
        </div>
      </div>
    </section>

    <div class="sp">
      <!-- At a glance -->
      <section class="sp-metrics" aria-label="The semester at a glance">
        <div class="container">
          <dl class="sp-metrics__grid">
            <div v-for="figure in figures" :key="figure.label" class="sp-metric">
              <dt>{{ figure.value }}</dt>
              <dd>{{ figure.label }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div class="container sp-toc-block">
        <nav class="sp-toc" aria-label="On this page">
          <a v-for="item in pageNav" :key="item.href" class="sp-toc__link" :href="item.href">{{ item.label }}</a>
        </nav>
        <p class="sp-toc__note">
          Proposed program · Admissions not open.
          <AppLink class="sp-week-link" to="/founding">See what is established and what comes next</AppLink>
        </p>
      </div>

      <!-- 01 At a glance -->
      <section id="overview" class="sp-section" aria-labelledby="overview-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">01 / At a glance</p>
              <h2 id="overview-title" class="sp-h2">Serious work.<br><em>Room to think.</em></h2>
            </div>
            <p class="sp-intro">
              Four teaching days each week. 144 facilitated hours and 24 independent-study hours: 168 planned academic
              hours. Camp duty, travel, meals and rest are separate commitments.
            </p>
          </div>

          <table class="sp-table sp-table--plan">
            <thead>
              <tr>
                <th scope="col">Commitment</th>
                <th scope="col">Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in commitments" :key="item.term">
                <td><span class="sp-course-name">{{ item.term }}</span></td>
                <td class="sp-table__evidence">{{ item.plan }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 02 Curriculum -->
      <section id="courses" class="sp-section sp-section--soft" aria-labelledby="courses-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">02 / Six connected courses</p>
              <h2 id="courses-title" class="sp-h2">A curriculum with<br><em>something to demonstrate.</em></h2>
            </div>
          </div>

          <table class="sp-table">
            <thead>
              <tr>
                <th scope="col">Course</th>
                <th scope="col">Facilitated time</th>
                <th scope="col">Evidence of learning</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in courses" :key="course.code">
                <td>
                  <div class="sp-table__course">
                    <ResponsiveImage :name="course.image" sizes="7rem" />
                    <div>
                      <span class="sp-course-code">{{ course.code }}</span>
                      <span class="sp-course-name">{{ course.title }}</span>
                    </div>
                  </div>
                </td>
                <td class="sp-table__hours">{{ course.hours }} h</td>
                <td class="sp-table__evidence"><span class="sp-table__label">Evidence of learning: </span>{{ course.evidence }}</td>
              </tr>
            </tbody>
          </table>
          <div class="sp-table-total">
            <strong>Course hours total 144.</strong>
            <span>Four further hours weekly support reading, essay development and science preparation.</span>
          </div>
        </div>
      </section>

      <!-- 03 A teaching week -->
      <section id="rhythm" class="sp-section" aria-labelledby="rhythm-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">03 / A teaching week</p>
              <h2 id="rhythm-title" class="sp-h2">Attention has a rhythm.</h2>
            </div>
          </div>

          <div class="sp-schedule">
            <aside class="sp-schedule__aside">
              <h3 class="sp-h3">Choose a day</h3>
              <div class="sp-day-tabs" role="tablist" aria-label="Daily schedules">
                <button
                  v-for="(day, i) in days"
                  :id="`day-tab-${day.key}`"
                  :key="day.key"
                  ref="dayTabs"
                  type="button"
                  role="tab"
                  class="sp-day-tab"
                  :aria-selected="i === activeDay"
                  :aria-controls="`day-panel-${day.key}`"
                  :tabindex="i === activeDay ? 0 : -1"
                  @click="activeDay = i"
                  @keydown="onDayKeydown"
                >
                  Day {{ day.key }}
                </button>
              </div>
            </aside>

            <article
              :id="`day-panel-${currentDay.key}`"
              class="sp-day-panel"
              role="tabpanel"
              :aria-labelledby="`day-tab-${currentDay.key}`"
            >
              <div class="sp-day-panel__head">
                <h3 class="sp-day-panel__title">Day {{ currentDay.key }}</h3>
              </div>
              <template v-for="period in currentDay.periods" :key="period.period">
                <span class="sp-day-label sp-day-period">{{ period.period }}</span>
                <div v-for="slot in period.slots" :key="slot.time" class="sp-session">
                  <div class="sp-session__time">{{ slot.time }}</div>
                  <div>
                    <h4>{{ slot.text }}</h4>
                  </div>
                </div>
              </template>
              <div class="sp-day-total">
                <span>Daily rhythm</span>
                <strong>09:00–16:15; six teaching hours plus 75 minutes of breaks</strong>
              </div>
            </article>
          </div>

          <div class="sp-note">
            <p>
              Four teaching days are arranged around local conditions. In camp weeks, the proposed order is A on Tuesday,
              C on Wednesday, B on Thursday and D on Friday, with Week 5 return on Saturday. Camp duty and rest must be
              separately staffed.
            </p>
          </div>
        </div>
      </section>

      <!-- 04 Six weeks -->
      <section id="weeks" class="sp-section sp-section--soft" aria-labelledby="weeks-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">04 / The six-week arc</p>
              <h2 id="weeks-title" class="sp-h2">One question becomes<br><em>a practice of inquiry.</em></h2>
            </div>
          </div>

          <div class="sp-week-list">
            <article v-for="(week, i) in weeks" :key="week.theme" class="sp-week-item">
              <div class="sp-week-no">{{ pad(i + 1) }}</div>
              <div class="sp-week-title">
                <span class="sp-week-theme">Week {{ pad(i + 1) }}</span>
                <h3>{{ week.theme }}</h3>
                <p>{{ week.question }}</p>
              </div>
              <div class="sp-week-details">
                <p>{{ week.practice }}</p>
                <p><strong>The seminar question:</strong> {{ week.seminarQuestion }}</p>
                <p>{{ week.seminar }}</p>
                <p class="sp-week-details__meta"><strong>Work to keep:</strong> {{ week.work }}</p>
                <p class="sp-week-details__meta"><strong>Reading locations:</strong></p>
                <ul class="sp-week-readings">
                  <li v-for="reading in week.readings" :key="reading.href" class="sp-week-details__meta">
                    <a class="sp-week-link" :href="reading.href">{{ reading.title }}</a> — {{ reading.location }}
                  </li>
                </ul>
              </div>
            </article>
          </div>
          <p class="sp-small sp-small--after">
            Primary readings include philosophy, poetry, memoir and local accounts. Teachers prepare bounded selections
            and accessible formats; the source list is not a reproduced anthology.
          </p>
        </div>
      </section>

      <!-- 05 Your work -->
      <section id="outcomes" class="sp-section" aria-labelledby="outcomes-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">05 / Your work</p>
              <h2 id="outcomes-title" class="sp-h2">Earn the confidence<br><em>to explain it.</em></h2>
            </div>
            <p class="sp-intro">
              Six weekly entries, two revised essays of 1,200–1,500 words, an 800–1,200-word scientific dossier, useful
              original work, coached demonstrations and an individual defence. Agreed equivalents preserve the
              intellectual standard.
            </p>
          </div>

          <div class="sp-assessment">
            <div class="sp-assessment__intro">
              <div class="sp-completion-box">
                <template v-for="detail in workDetails" :key="detail.title">
                  <h3>{{ detail.title }}</h3>
                  <p>{{ detail.text }}</p>
                </template>
              </div>
              <p class="sp-small sp-small--after">
                <AppLink class="sp-week-link" to="/learning">Inspect an example of the standard →</AppLink>
              </p>
            </div>
            <div>
              <h3 class="sp-h3">Five dimensions are scored from 0 to 3:</h3>
              <div class="sp-assessment-list">
                <div v-for="dimension in dimensions" :key="dimension.letter" class="sp-assessment-row">
                  <span class="sp-assessment-row__number">{{ dimension.letter }}</span>
                  <div>
                    <h4>{{ dimension.title }}</h4>
                  </div>
                </div>
              </div>
              <p class="sp-small sp-small--after">
                Completion requires level 2 in each after an opportunity to revise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 06 Practical -->
      <section id="practical" class="sp-section sp-section--soft" aria-labelledby="practical-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">06 / Practical details</p>
              <h2 id="practical-title" class="sp-h2">Know the commitment<br><em>before you choose it.</em></h2>
            </div>
          </div>

          <div class="sp-practical-grid">
            <article v-for="item in practical" :key="item.title" class="sp-practical">
              <h3 class="sp-h3">{{ item.title }}</h3>
              <p>{{ item.text }}</p>
              <p v-for="link in item.links" :key="link.to">
                <AppLink class="sp-week-link" :to="link.to">{{ link.label }}</AppLink>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section class="sp-status" aria-labelledby="status-title">
        <div class="container sp-status__inner">
          <h2 id="status-title">Proposed program</h2>
          <p>
            Admissions not open.
            <AppLink class="sp-week-link" to="/founding">See what is established and what comes next</AppLink>
          </p>
        </div>
      </section>

      <!-- 07 Materials -->
      <section id="materials" class="sp-section" aria-labelledby="materials-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">07 / Complete materials</p>
              <h2 id="materials-title" class="sp-h2">The plan, in full.</h2>
            </div>
            <p class="sp-intro">
              The academic curriculum, operations manual and printable fieldbook are designed to be used together. Read
              each online or download the matching edition.
            </p>
          </div>

          <div class="sp-downloads">
            <AppLink class="sp-download" to="/publications">
              <div>
                <strong>Open the publication library</strong>
              </div>
              <span class="sp-download__arrow" aria-hidden="true">→</span>
            </AppLink>
            <a class="sp-download" href="/syllabus.txt" download>
              <div>
                <strong>Download the short syllabus</strong>
              </div>
              <span class="sp-download__arrow" aria-hidden="true">↓</span>
            </a>
          </div>

          <div class="sp-downloads sp-downloads--entries">
            <AppLink class="sp-download" to="/join/students?from=program">
              <div>
                <strong>Prepare a student introduction</strong>
              </div>
              <span class="sp-download__arrow" aria-hidden="true">→</span>
            </AppLink>
            <AppLink class="sp-download" to="/join/teachers?from=program">
              <div>
                <strong>Explore founding teaching roles</strong>
              </div>
              <span class="sp-download__arrow" aria-hidden="true">→</span>
            </AppLink>
          </div>
        </div>
      </section>

      <!-- 08 Jasper investigations -->
      <section id="investigations" class="sp-section sp-section--soft" aria-labelledby="investigations-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">08 / JAS 104 · Jasper as Laboratory</p>
              <h2 id="investigations-title" class="sp-h2">Explore the twelve<br><em>Jasper investigations.</em></h2>
            </div>
          </div>

          <div class="sp-case-tabs sp-case-tabs--wide" role="tablist" aria-label="Jasper investigations">
            <button
              v-for="(item, i) in investigations"
              :id="`investigation-tab-${i + 1}`"
              :key="item.title"
              ref="investigationTabs"
              type="button"
              role="tab"
              class="sp-day-tab"
              :aria-selected="i === activeInvestigation"
              :aria-controls="`investigation-panel-${i + 1}`"
              :tabindex="i === activeInvestigation ? 0 : -1"
              @click="activeInvestigation = i"
              @keydown="onInvestigationKeydown"
            >
              {{ item.title }}
              <span>{{ pad(i + 1) }}</span>
            </button>
          </div>

          <article
            :id="`investigation-panel-${activeInvestigation + 1}`"
            class="sp-day-panel sp-case-panel"
            role="tabpanel"
            :aria-labelledby="`investigation-tab-${activeInvestigation + 1}`"
          >
            <div class="sp-day-panel__head">
              <div>
                <span class="sp-day-label">{{ activeInvestigation + 1 }} / {{ currentInvestigation.title }}</span>
                <h3 class="sp-day-panel__title">{{ currentInvestigation.question }}</h3>
              </div>
              <p>{{ currentInvestigation.text }}</p>
            </div>
            <div class="sp-day-total">
              <span>{{ currentInvestigation.method }}</span>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
/* ---------- Hero (unchanged) ---------- */
.fs {
  --fs-navy: #0c2033;
  --fs-dark: #081726;

  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

.fs :where(h1, h2, h3, h4, p, ul, ol, dl, dd) {
  margin: 0;
}

.fs :where(ul, ol) {
  padding: 0;
  list-style: none;
}

.fs :where(a, button):focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}

.fs-wrap {
  max-width: 80rem;
  margin-inline: auto;
  padding-inline: 1.5rem;
}

@media (min-width: 640px) {
  .fs-wrap {
    padding-inline: 2.5rem;
  }
}

.fs-hero {
  display: flex;
  align-items: flex-end;
  min-height: min(calc(100svh - 5.5rem), 46rem);
  padding-block: var(--space-9) var(--space-8);
  --hero-shade:
    linear-gradient(to bottom, rgba(14, 36, 57, 0.2) 0%, rgba(14, 36, 57, 0.7) 100%),
    linear-gradient(90deg, rgba(11, 27, 42, 0.55) 0%, rgba(11, 27, 42, 0) 60%);
  --hero-position: 60% 45%;
  background-color: var(--color-navy-deep);
  color: #fff;
}

.fs-hero > .fs-wrap {
  width: 100%;
}

@media (max-width: 760px) {
  .fs-hero {
    min-height: calc(100svh - 7.75rem);
    padding-block: var(--space-9) var(--space-5);
  }
}

.fs-hero__kicker {
  display: block;
  margin-bottom: var(--space-4);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
}

.fs .fs-hero__title {
  max-width: 56rem;
  margin-bottom: var(--space-6);
  font-family: var(--font-serif);
  font-size: 2.25rem;
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.1;
  color: #fff;
}

.fs-hero__deck {
  max-width: 36rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.625;
  color: #e5e7eb;
}

.fs-hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.fs-hero__button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  text-decoration: none;
  transition: background-color 150ms ease;
}

.fs-hero__button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.fs-hero__button--primary {
  background: var(--fs-navy);
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.fs-hero__button--primary:hover {
  background: var(--fs-dark);
}

@media (min-width: 640px) {
  .fs .fs-hero__title {
    font-size: 3.75rem;
  }

  .fs-hero__deck {
    font-size: 1.125rem;
  }

  .fs-hero__button {
    font-size: 0.875rem;
  }
}

@media (min-width: 1024px) {
  .fs .fs-hero__title {
    font-size: 4.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fs-hero__button {
    transition: none;
  }
}
</style>

<style scoped>
.sp {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.65;
  color: var(--color-ink);
  font-variant-numeric: lining-nums;
}

.sp :where(h2, h3, h4, p, ol, ul, dl, dd) {
  margin: 0;
}

.sp :where(ol, ul) {
  padding: 0;
  list-style: none;
}

.sp strong {
  font-weight: 600;
  color: var(--color-ink);
}

/* ---------- Sections ---------- */
.sp-section {
  padding-block: 100px;
  background: var(--color-paper);
  scroll-margin-top: var(--header-height);
}

.sp-section--soft {
  background: var(--color-cloud);
}

.sp-head {
  display: grid;
  gap: 12px;
  margin-bottom: 44px;
}

.sp-kicker,
.sp-day-label,
.sp-week-theme {
  display: block;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  line-height: 1.5;
  text-transform: uppercase;
  color: var(--color-cobalt);
}

.sp-kicker {
  margin-bottom: 16px;
}

.sp .sp-h2 {
  font-family: var(--font-serif);
  font-weight: 400;
  letter-spacing: -0.035em;
  line-height: 1.06;
  color: var(--color-ink);
}

.sp .sp-h2 {
  font-size: clamp(2.25rem, 4.5vw, 4.2rem);
}

.sp-h2 em {
  font-style: italic;
  color: var(--color-cobalt);
}

.sp-intro {
  max-width: 470px;
  color: var(--color-muted);
}

.sp .sp-h3 {
  margin-bottom: 10px;
  font-family: var(--font-sans);
  font-size: 1.12rem;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.3;
  color: var(--color-ink);
}

.sp-small {
  font-size: 0.86rem;
  color: var(--color-muted);
}

.sp-small--after {
  margin-top: 15px;
}

.sp-note {
  display: grid;
  gap: 8px;
  margin-top: 22px;
  padding: 17px 20px;
  border-left: 3px solid var(--color-cobalt);
  background: var(--color-mist);
  font-size: 0.92rem;
  color: var(--color-ink);
}

/* ---------- Metrics ---------- */
.sp-metrics {
  padding-block: var(--space-7);
  border-bottom: 1px solid var(--color-line);
  background: var(--color-paper);
}

.sp-toc-block {
  padding-block: var(--space-5);
  background: var(--color-paper);
}

.sp-toc {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  padding-block: var(--space-4);
  border-block: 1px solid var(--color-line);
  font-size: 0.875rem;
  font-weight: 500;
}

.sp-toc__link {
  color: var(--color-muted);
  text-decoration: none;
  transition: color var(--duration) var(--ease);
}

.sp-toc__link:hover,
.sp-toc__link:focus-visible {
  color: var(--color-cobalt);
}

.sp-toc__note {
  margin: var(--space-4) 0 0;
  font-size: 0.875rem;
  color: var(--color-muted);
}

.sp-toc__note .sp-week-link {
  margin-left: 0.35rem;
}

.sp-metrics__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5) 0;
}

.sp-metric {
  display: grid;
  gap: var(--space-1);
  padding-inline: var(--space-5);
  border-left: 1px solid var(--color-line);
}

.sp-metric:nth-child(odd) {
  padding-left: 0;
  border-left: 0;
}

.sp-metric dt {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  line-height: 1.1;
  color: var(--color-ink);
}

.sp-metric dd {
  font-size: var(--text-small);
  color: var(--color-muted);
}

/* ---------- 01–02 Tables ---------- */
.sp-table {
  display: block;
  width: 100%;
  border-collapse: collapse;
  background: var(--color-paper);
}

.sp-table thead {
  display: none;
}

.sp-table tbody,
.sp-table tr {
  display: block;
}

.sp-table tr {
  padding: 15px 16px;
  border-bottom: 1px solid var(--color-line);
}

.sp-table tr:last-child {
  border-bottom: 0;
}

.sp-table td {
  display: block;
  padding: 4px 0;
  font-size: 0.91rem;
  vertical-align: top;
}

.sp-table__course {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}

.sp-table__course img {
  display: block;
  width: 72px;
  height: 72px;
  object-fit: cover;
}

.sp-course-code {
  display: block;
  margin-bottom: 5px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-cobalt);
}

.sp-course-name {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--color-ink);
}

.sp .sp-table__hours {
  display: inline-block;
  margin-right: 18px;
  font-family: var(--font-serif);
  font-size: 1.4rem;
  white-space: nowrap;
}

.sp-table__label {
  font-weight: 600;
}

.sp-table__evidence {
  color: var(--color-muted);
}

.sp-table-total {
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: space-between;
  gap: 8px 16px;
  padding: 17px 18px;
  background: var(--color-mist);
  font-size: 0.9rem;
  color: var(--color-navy);
}

.sp-table-total strong {
  font-size: 1.05rem;
  color: var(--color-navy);
}

/* ---------- 03 Schedule ---------- */
.sp-schedule {
  display: grid;
  gap: 20px;
}

.sp-day-tabs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 5px;
}

.sp-day-tab {
  display: block;
  padding: 10px 8px;
  border: 1px solid var(--color-line);
  background: transparent;
  color: var(--color-ink);
  font: inherit;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition:
    background-color var(--duration) var(--ease),
    border-color var(--duration) var(--ease),
    color var(--duration) var(--ease);
}

.sp-day-tab span {
  display: block;
  margin-top: 3px;
  font-size: 0.66rem;
  font-weight: 400;
  color: var(--color-muted);
}

.sp-day-tab:hover {
  border-color: var(--color-navy);
}

.sp-day-tab[aria-selected='true'] {
  border-color: var(--color-navy);
  background: var(--color-navy);
  color: var(--color-on-dark);
}

.sp-day-tab[aria-selected='true'] span {
  color: var(--color-on-dark-muted);
}

.sp-day-panel {
  padding: 20px 16px;
  border: 1px solid var(--color-line);
  background: var(--color-paper);
}

.sp-day-panel__head {
  padding-bottom: 22px;
  margin-bottom: 5px;
  border-bottom: 1px solid var(--color-line);
}

.sp .sp-day-panel__title {
  margin-top: 8px;
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--color-ink);
}

.sp-day-panel__head p {
  max-width: 450px;
  margin-top: 9px;
  font-size: 0.9rem;
  color: var(--color-muted);
}

.sp-day-period {
  margin-top: 18px;
}

.sp-session {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 12px;
  padding: 15px 0;
  border-bottom: 1px solid var(--color-line);
}

.sp-session:last-of-type {
  border-bottom: 0;
}

.sp-session__time {
  padding-top: 1px;
  font-family: var(--font-serif);
  font-size: 1.15rem;
  line-height: 1.3;
  color: var(--color-navy);
  white-space: nowrap;
}

.sp .sp-session h4 {
  margin-bottom: 4px;
  font-family: var(--font-sans);
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.4;
  color: var(--color-ink);
}

.sp-day-total {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
  padding: 12px 15px;
  background: var(--color-cloud);
  font-size: 0.84rem;
}

/* ---------- 04 Weeks ---------- */
.sp-week-list {
  border-top: 1px solid var(--color-line);
}

.sp-week-item {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 10px 16px;
  align-items: start;
  padding: 23px 0;
  border-bottom: 1px solid var(--color-line);
}

.sp-week-no {
  grid-row: span 2;
  font-family: var(--font-serif);
  font-size: 2rem;
  line-height: 1;
  color: #89a6b8;
}

.sp .sp-week-title h3 {
  margin: 7px 0;
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--color-ink);
}

.sp-week-title p {
  font-size: 0.86rem;
  color: var(--color-muted);
}

.sp-week-details {
  grid-column: 2;
}

.sp-week-details p,
.sp-week-readings {
  margin-bottom: 9px;
}

.sp-week-readings li + li {
  margin-top: 4px;
}

.sp-week-details__meta {
  font-size: 0.88rem;
  color: var(--color-muted);
}

.sp-week-link {
  font-size: 0.83rem;
  font-weight: 650;
  color: var(--color-cobalt);
  text-decoration: none;
}

.sp-week-link:hover {
  color: var(--color-navy);
}

/* ---------- 08 Investigations ---------- */
.sp-case-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 5px;
  margin: 16px 0;
}

.sp-case-tabs--wide {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

/* ---------- 05 Assessment ---------- */
.sp-assessment {
  display: grid;
  gap: 28px;
}

.sp-completion-box {
  padding: 28px;
  background: var(--color-navy);
  color: var(--color-on-dark);
}

.sp .sp-completion-box h3 {
  margin-bottom: 10px;
  font-family: var(--font-serif);
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1.2;
  color: var(--color-on-dark);
}

.sp .sp-completion-box h3 + p + h3 {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--color-line-on-dark);
}

.sp-completion-box p {
  font-size: 0.92rem;
  color: var(--color-on-dark-muted);
}

.sp-assessment-list {
  border-top: 1px solid var(--color-line);
}

.sp-assessment-row {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid var(--color-line);
}

.sp-assessment-row__number {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  color: var(--color-cobalt);
}

.sp .sp-assessment-row h4 {
  margin-bottom: 4px;
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0;
  color: var(--color-ink);
}

/* ---------- 07 Practical ---------- */
.sp-practical-grid {
  display: grid;
  gap: 1px;
  border: 1px solid var(--color-line);
  background: var(--color-line);
}

.sp-practical {
  padding: 28px;
  background: var(--color-paper);
}

.sp-practical p {
  font-size: 0.91rem;
  color: var(--color-muted);
}

.sp-practical p + p {
  margin-top: 12px;
}

.sp-status {
  padding: 28px 0;
  border-block: 1px solid var(--color-line);
  background: var(--color-mist);
}

.sp-status__inner {
  display: grid;
  gap: 10px;
  align-items: start;
}

.sp .sp-status__inner h2 {
  font-family: var(--font-serif);
  font-size: 1.55rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.2;
  color: var(--color-navy);
}

.sp-status__inner p {
  font-size: 0.91rem;
  color: var(--color-ink);
}

/* ---------- 08 Materials ---------- */
.sp-downloads {
  display: grid;
  gap: 16px;
  margin-top: 28px;
}

.sp-downloads--entries {
  margin-top: 24px;
}

.sp-download {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 22px;
  border: 1px solid var(--color-line);
  background: var(--color-paper);
  color: inherit;
  text-decoration: none;
  transition:
    border-color var(--duration) var(--ease),
    transform var(--duration) var(--ease);
}

.sp-download:hover {
  border-color: #8ca9ba;
  transform: translateY(-2px);
}

.sp-download strong {
  display: block;
  margin-bottom: 5px;
}

.sp-download__arrow {
  font-size: 1.3rem;
  color: var(--color-cobalt);
}

.sp :where(a, button):focus-visible {
  outline: 3px solid #6ba5c5;
  outline-offset: 3px;
}

/* ---------- Larger screens ---------- */
@media (min-width: 701px) {
  .sp-section {
    padding-block: 76px;
  }

  .sp-head {
    grid-template-columns: minmax(0, 0.9fr) minmax(280px, 0.7fr);
    gap: 30px;
    align-items: end;
  }

  .sp-intro {
    margin-bottom: 5px;
  }

  .sp-table {
    display: table;
  }

  .sp-table thead {
    display: table-header-group;
  }

  .sp-table tbody {
    display: table-row-group;
  }

  .sp-table tr {
    display: table-row;
    padding: 0;
  }

  .sp-table th {
    padding: 13px 11px;
    background: var(--color-navy);
    color: var(--color-on-dark);
    font-size: 0.73rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-align: left;
    text-transform: uppercase;
  }

  .sp-table th:nth-child(1) {
    width: 38%;
  }

  .sp-table th:nth-child(2) {
    width: 10%;
  }

  .sp-table--plan th:nth-child(2) {
    width: auto;
  }

  .sp-table td {
    display: table-cell;
    padding: 13px 11px;
    border-bottom: 1px solid var(--color-line);
  }

  .sp-table tr:last-child td {
    border-bottom: 0;
  }

  .sp .sp-table__hours {
    display: table-cell;
    margin-right: 0;
  }

  .sp-table__label {
    display: none;
  }

  .sp-table__evidence {
    color: var(--color-ink);
  }

  .sp-schedule {
    grid-template-columns: 200px minmax(0, 1fr);
    gap: 25px;
  }

  .sp-day-tabs {
    grid-template-columns: 1fr;
    gap: 7px;
    margin-top: 28px;
  }

  .sp-day-tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 13px 14px;
    font-weight: 400;
    text-align: left;
  }

  .sp-day-tab span {
    margin-top: 0;
    font-size: 0.78rem;
  }

  .sp-day-panel {
    padding: 28px 30px;
  }

  .sp-day-panel__head {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 20px;
  }

  .sp-day-panel__head p {
    margin-top: 0;
  }

  .sp-session {
    grid-template-columns: 76px minmax(0, 1fr);
    gap: 18px;
    padding: 18px 0;
  }

  .sp-session__time {
    font-size: 1.35rem;
  }

  .sp-week-item {
    grid-template-columns: 55px minmax(145px, 0.7fr) minmax(0, 1.3fr);
    gap: 18px;
    padding: 26px 0;
  }

  .sp-week-no {
    grid-row: auto;
    font-size: 2.4rem;
  }

  .sp .sp-week-title h3 {
    font-size: 1.75rem;
  }

  .sp-week-details {
    grid-column: auto;
  }

  .sp-case-tabs {
    max-width: 36rem;
  }

  .sp-case-tabs .sp-day-tab {
    display: block;
    padding: 12px 8px;
    font-weight: 600;
    text-align: center;
  }

  .sp-case-tabs .sp-day-tab span {
    margin-top: 3px;
    font-size: 0.72rem;
  }

  .sp-case-tabs--wide {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    max-width: none;
  }

  .sp-assessment {
    grid-template-columns: 0.8fr 1.2fr;
    gap: 35px;
  }

  .sp-practical-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sp-status__inner {
    grid-template-columns: 200px minmax(0, 1fr);
    gap: 35px;
  }

  .sp-downloads {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 901px) {
  .sp-section {
    padding-block: 100px;
  }

  .sp-head {
    gap: 60px;
  }

  .sp-metrics__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .sp-metric:nth-child(odd) {
    padding-left: var(--space-5);
    border-left: 1px solid var(--color-line);
  }

  .sp-metric:first-child {
    padding-left: 0;
    border-left: 0;
  }

  .sp-table th,
  .sp-table td {
    padding: 18px 17px;
  }

  .sp-table th {
    padding-block: 15px;
  }

  .sp-schedule {
    grid-template-columns: 250px minmax(0, 1fr);
    gap: 48px;
  }

  .sp-week-item {
    grid-template-columns: 76px minmax(170px, 0.75fr) minmax(0, 1.25fr);
    gap: 26px;
  }

  .sp-assessment {
    gap: 70px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sp-day-tab,
  .sp-download {
    transition: none;
  }

  .sp-download:hover {
    transform: none;
  }
}
</style>
