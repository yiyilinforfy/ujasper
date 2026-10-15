<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef } from 'vue'
import AppLink from '../components/AppLink.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'

const figures = [
  { value: '06', label: 'weeks in person' },
  { value: '144', label: 'facilitated learning hours' },
  { value: '06–08', label: 'adult learners · ages 18+' },
  { value: '03', label: 'proposed camping nights' },
]

const layers = [
  {
    title: 'Six courses',
    text: 'Six strands of learning, from fieldcraft and martial arts to science, philosophy and original inquiry.',
  },
  {
    title: 'One weekly question',
    text: 'Each week has a theme—Attention, Discipline, Evidence and more—that connects work across all six courses.',
  },
  {
    title: 'Four teaching days a week',
    text: 'Every week has four teaching days: one Day A, one Day B, one Day C and one Day D. Each letter is a different daily timetable that mixes several courses—not a separate course.',
  },
  {
    title: 'Evidence of learning',
    text: 'Keep weekly records, test ideas, revise work, build a capstone and explain your contribution individually.',
  },
]

const courses = [
  {
    code: 'JAS 101',
    image: 'cards/hike',
    title: 'Fieldcraft, Hiking and Camping',
    text: 'Route-finding, preparation, field judgment and care.',
    hours: 36,
    rhythm: 'Two fieldcraft sessions each week, on Day B and Day D.',
    evidence: 'A route-and-camp dossier; observed field judgment.',
  },
  {
    code: 'JAS 102',
    image: 'cards/martial',
    title: 'Martial Arts and Restraint',
    text: 'Balance, coordination, boundaries and controlled practice.',
    hours: 18,
    rhythm: 'Two coached sessions each week, on Day A and Day C.',
    evidence: 'A coached control demonstration; practice record.',
  },
  {
    code: 'JAS 103',
    image: 'field/landscape',
    title: 'Attention and Reflective Practice',
    text: 'Noticing, listening and reflecting on attention.',
    hours: 12,
    rhythm: 'A 15-minute attention practice every teaching day, plus a 60-minute seminar on Day C.',
    evidence: 'An attention-method comparison; personal protocol.',
  },
  {
    code: 'JAS 104',
    image: 'cards/experiment',
    title: 'Mathematics and Physics in Nature',
    text: 'Measurement, experiments, uncertainty and reasoned claims.',
    hours: 30,
    rhythm: 'Two science sessions each week, on Day A and Day C.',
    evidence: 'A reproducible investigation; individual oral defence.',
  },
  {
    code: 'JAS 105',
    image: 'cards/read',
    title: 'Philosophy, Reading and Argument',
    text: 'Close reading, dialogue, disagreement and revision.',
    hours: 30,
    rhythm: 'Three discussion sessions each week, across Day A, B and D.',
    evidence: 'Text annotations, a fair opposing argument and a revised essay.',
  },
  {
    code: 'JAS 106',
    image: 'cards/make',
    title: 'The Commons and Original Inquiry',
    text: 'Collaborative work that produces something useful to others.',
    hours: 18,
    rhythm: 'Three project sessions each week, across Day B, C and D.',
    evidence: 'A useful analogue artefact; stewardship and cost account.',
  },
]

const attention = { minutes: 15, code: 'JAS 103', name: 'Attention practice', text: 'A short daily exercise in noticing, listening or observation.' }

const days = [
  {
    key: 'A',
    name: 'Model and practise',
    short: 'Model and practise',
    lead: 'Build a method before testing it.',
    summary: 'Science and coached physical practice sit alongside philosophical reading.',
    slots: [
      attention,
      { minutes: 150, code: 'JAS 104', name: 'Mathematics and physics', text: 'Investigate a question, make measurements and record evidence.' },
      { minutes: 90, code: 'JAS 102', name: 'Martial arts and restraint', text: 'Coached practice in balance, control, coordination and boundaries.' },
      { minutes: 105, code: 'JAS 105', name: 'Philosophy, reading and argument', text: 'Read closely, examine claims and test interpretations through discussion.' },
    ],
  },
  {
    key: 'B',
    name: 'Encounter and question',
    short: 'Encounter',
    lead: 'Meet the world directly.',
    summary: 'Field observation becomes material for discussion and collaborative work.',
    slots: [
      attention,
      { minutes: 180, code: 'JAS 101', name: 'Fieldcraft, hiking and camping', text: 'Read a route, measure a place, plan carefully and practise field judgment.' },
      { minutes: 90, code: 'JAS 105', name: 'Philosophy, reading and argument', text: 'Discuss difficult passages and represent another position fairly.' },
      { minutes: 75, code: 'JAS 106', name: 'The Commons and original inquiry', text: 'Work together to define a useful question or develop a project.' },
    ],
  },
  {
    key: 'C',
    name: 'Test and reflect',
    short: 'Test and reflect',
    lead: 'Test the claim. Review the response.',
    summary: 'Experiment, coached practice, reflective seminar and project work share one day.',
    slots: [
      attention,
      { minutes: 150, code: 'JAS 104', name: 'Mathematics and physics', text: 'Run a second investigation, compare results and record uncertainty.' },
      { minutes: 90, code: 'JAS 102', name: 'Martial arts and restraint', text: 'Coached practice with an emphasis on control and safe boundaries.' },
      { minutes: 60, code: 'JAS 103', name: 'Attention seminar', text: 'Compare attention methods and reflect on what changed.' },
      { minutes: 45, code: 'JAS 106', name: 'The Commons and original inquiry', text: 'Develop, test or review the project’s next step.' },
    ],
  },
  {
    key: 'D',
    name: 'Judge and contribute',
    short: 'Contribute',
    lead: 'Bring judgment into action.',
    summary: 'Field practice, philosophical judgment and a useful shared outcome close the teaching cycle.',
    slots: [
      attention,
      { minutes: 180, code: 'JAS 101', name: 'Fieldcraft, hiking and camping', text: 'Plan routes, check equipment and practise sound decisions in the field.' },
      { minutes: 105, code: 'JAS 105', name: 'Philosophy, reading and argument', text: 'Debate, examine opposing claims and revise a position.' },
      { minutes: 60, code: 'JAS 106', name: 'The Commons and original inquiry', text: 'Review project progress and make the work useful to another person.' },
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
    practice: 'Establish an observation baseline, read a local route, measure the same thing in more than one way, and begin close reading.',
    happens: 'Walk a local route. Measure the same object two ways. Read Plato and Laozi.',
    place: 'Short local routes and the classroom',
    evidence: 'Observation baseline; map-and-measure sheet; 250-word position.',
  },
  {
    theme: 'Discipline',
    question: 'When does restraint make us stronger?',
    camp: 'One proposed camp night',
    practice: 'Connect preparation and controlled practice with choices, effort and the costs of different options.',
    happens: 'First night at camp. Shelter, dry storage and shared chores. Read Aristotle and the Analects.',
    place: 'A reserved, serviced campsite, one night',
    evidence: 'First camp review; balanced practice plan; opportunity-cost account.',
  },
  {
    theme: 'Evidence',
    question: 'What would change my mind?',
    practice: 'Repeat an investigation, track uncertainty and compare the result with the original prediction.',
    happens: 'Time a pendulum. Check the prediction. Measure a route against the map. Read Hume.',
    place: 'Approved routes with observation stops',
    evidence: 'Repeatable experiment; uncertainty record; revised claim.',
  },
  {
    theme: 'Freedom',
    question: 'What makes disagreement productive?',
    practice: 'Represent a competing position fairly, audit a printed claim and choose a question for the capstone.',
    happens: 'Take turns as navigator. Debate Mill and Wollstonecraft. Study sampling and bias.',
    place: 'On the trail and in the seminar room',
    evidence: 'Structured debate; printed-claim audit; capstone proposal.',
  },
  {
    theme: 'Responsibility',
    question: 'What do I owe to a place and to other people?',
    camp: 'Two proposed camp nights',
    practice: 'Develop the capstone, test a prototype with another person and document its effects and limitations.',
    happens: 'Two nights at camp. Read Tagore and E. Pauline Johnson. Test the project with a peer or host.',
    place: 'A reserved, serviced campsite, two nights',
    evidence: 'Two-night camp dossier; prototype test; stewardship evidence.',
  },
  {
    theme: 'Contribution',
    question: 'What can I now explain, do and give?',
    practice: 'Review how your observations and judgments have changed, finish the portfolio and explain your own contribution.',
    happens: 'Revisit a week-1 route. Run a small investigation. Present at the Jasper Commons Hearing.',
    place: 'A comparable route and the classroom base',
    evidence: 'Final portfolio; individual oral defence; 30-day commitment.',
  },
]

const method = [
  {
    step: 'Experience it',
    where: 'Fieldcraft, martial arts or attention',
    text: 'Meet the question in practice first: on a route, in a drill or in a short reflection.',
  },
  {
    step: 'Test it',
    where: 'Mathematics and physics',
    text: 'Turn a hunch into a prediction, then measure, repeat and record how certain the result is.',
  },
  {
    step: 'Question it',
    where: 'Philosophy',
    text: 'Read and debate why it matters, and state the strongest case against your own view.',
  },
  {
    step: 'Make it useful',
    where: 'The Commons',
    text: 'Turn what you learned into something another person can use, ask them to try it, then revise it.',
  },
]

const cases = [
  {
    key: 'warmth',
    name: 'Warmth',
    question: 'What does it take to keep someone warm?',
    context: 'A cold morning becomes a question about physics, preparation and our obligations to one another.',
    steps: [
      {
        course: 'Fieldcraft',
        text: 'Plan clothing layers and shelter for an approved outing. Testing uses warm water and materials indoors; nobody is exposed to cold as an experiment.',
      },
      {
        course: 'Mathematics and physics',
        text: 'Compare cooling curves, repeat the measurements and explain the uncertainty. Separate the effect of an insulating material from changes in starting temperature.',
      },
      {
        course: 'Philosophy',
        text: 'Read an argument about voluntary hardship. Defend a distinction between a worthwhile challenge and avoidable harm.',
      },
      {
        course: 'The Commons',
        text: 'Build a paper packing guide. Ask a peer to use it, record what they misunderstand and revise it.',
      },
    ],
    evidence: 'A graph, a reasoned argument, a tested guide and a decision you changed.',
  },
  {
    key: 'direction',
    name: 'Direction',
    question: 'How do you know which way to go?',
    context: 'Navigation connects geometry and physical judgment with the question of when to trust another person.',
    steps: [
      {
        course: 'Fieldcraft',
        text: 'Explain one short section of a staff-approved route. Practise a turnaround decision while the guide stays in control.',
      },
      {
        course: 'Mathematics and physics',
        text: 'Estimate distance from the map scale and compare it with what you observe. Show how uncertainty changes the time you should allow.',
      },
      {
        course: 'Philosophy',
        text: 'Debate how authority, evidence and personal responsibility relate. Represent the opposing case fairly before answering it.',
      },
      {
        course: 'The Commons',
        text: 'Create a route-decision worksheet with a clear return plan and an accessible alternative. Test whether others can follow it.',
      },
    ],
    evidence: 'A labelled map, an uncertainty estimate, a fair counterargument and a usable worksheet.',
  },
  {
    key: 'conviction',
    name: 'Conviction',
    question: 'What would change your mind?',
    context: 'A persuasive claim becomes a chance to examine your reasoning, your reactions and your responsibility as an author.',
    steps: [
      {
        course: 'Martial arts and attention',
        text: 'Use coached drills to practise control, and a voluntary attention exercise to notice how you react under effort.',
      },
      {
        course: 'Mathematics and physics',
        text: 'Check a printed claim against a calculation or experiment. Keep the evidence that disagrees with your prediction.',
      },
      {
        course: 'Philosophy',
        text: 'Read two primary texts in context. Switch sides in a structured debate and name the strongest objection to your own view.',
      },
      {
        course: 'The Commons',
        text: 'Write a short account of an error you corrected, with enough detail that a peer can follow your reasoning without simply trusting you.',
      },
    ],
    evidence: 'A claim audit, a passage-based argument, a clear revision and an individual oral defence.',
  },
]

const activeCase = ref(0)
const caseTabs = useTemplateRef<HTMLButtonElement[]>('caseTabs')
const currentCase = computed(() => cases[activeCase.value]!)

function onCaseKeydown(event: KeyboardEvent) {
  const next = tabTarget(event, activeCase.value, cases.length)
  if (next === undefined) return
  activeCase.value = next
  nextTick(() => caseTabs.value?.[next]?.focus())
}

const outputs = [
  {
    title: 'Six weekly portfolio entries',
    text: 'Evidence from the weekly inquiry: observations, measurements, arguments, reflections and project records.',
  },
  {
    title: 'A capstone dossier',
    text: 'Document the question, evidence, decisions, testing, feedback and revisions behind an original piece of work.',
  },
  {
    title: 'An individual oral defence',
    text: 'Explain your reasoning, respond to questions and identify the limits of your conclusions.',
  },
  {
    title: 'Instructor-reviewed demonstrations',
    text: 'Show field judgment and safe, controlled martial practice within the programme’s agreed boundaries.',
  },
]

const dimensions = [
  { letter: 'A', title: 'Practice and care', text: 'Preparation, attention to safety and care for others.' },
  { letter: 'B', title: 'Evidence and reasoning', text: 'Quality of observation, measurement, inference and uncertainty.' },
  { letter: 'C', title: 'Interpretation and argument', text: 'Close reading, fair representation of alternatives and reasoned claims.' },
  { letter: 'D', title: 'Original work and revision', text: 'Making, testing, receiving feedback and improving the work.' },
  {
    letter: 'E',
    title: 'Contribution and autonomy',
    text: 'Keeping agreed commitments, respecting consent and dissent, and creating fair conditions for others to contribute.',
  },
]

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="fs">
    <section class="fs-hero hero-media" aria-labelledby="fs-hero-title">
      <ResponsiveImage class="hero-media__image" name="hero-ridge" priority />
      <div class="fs-wrap">
        <span class="fs-hero__kicker">The Jasper Field Semester · Proposed curriculum</span>
        <h1 id="fs-hero-title" class="fs-hero__title">The Jasper Field Semester.<br /><em>Proposed curriculum.</em></h1>
        <p class="fs-hero__deck">
          Six weeks in Jasper with a small group of six to eight adults. You leave with a stronger body, a freer mind
          and a life more closely examined.
        </p>
        <div class="fs-hero__actions">
          <a class="fs-hero__button fs-hero__button--primary" href="/field-semester.pdf" target="_blank" rel="noopener noreferrer">
            <span>Read the instructor guide<span class="visually-hidden"> (PDF, opens in a new tab)</span></span>
            <span aria-hidden="true">↗</span>
          </a>
          <AppLink class="fs-hero__button" to="/join/students?from=program">
            <span>Apply for the semester</span>
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

      <!-- 01 How it works -->
      <section id="structure" class="sp-section" aria-labelledby="structure-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">01 / How the semester works</p>
              <h2 id="structure-title" class="sp-h2">Four parts.<br><em>One connected education.</em></h2>
            </div>
            <p class="sp-intro">
              The curriculum has four layers. The courses run throughout the semester; the weekly theme gives them a
              shared question; the daily schedule determines what happens when; and the portfolio shows what each
              learner has understood and made.
            </p>
          </div>

          <ol class="sp-system">
            <li v-for="(layer, i) in layers" :key="layer.title" class="sp-system__step">
              <span class="sp-system__num">{{ pad(i + 1) }}</span>
              <h3 class="sp-h3">{{ layer.title }}</h3>
              <p>{{ layer.text }}</p>
            </li>
          </ol>

          <div class="sp-note">
            <p>
              <strong>In short:</strong> all six courses run across the six weeks. Each week’s theme connects them; each
              week has four teaching days, Day A to Day D, and each day’s timetable determines the mix of lessons. The six
              weekly portfolio entries are part of the evidence of learning, alongside the capstone and assessed
              demonstrations.
            </p>
          </div>
        </div>
      </section>

      <!-- 02 Curriculum -->
      <section id="courses" class="sp-section sp-section--soft" aria-labelledby="courses-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">02 / The curriculum</p>
              <h2 id="courses-title" class="sp-h2">Six courses.<br><em>144 hours in total.</em></h2>
            </div>
            <p class="sp-intro">
              Each course has a defined place in the weekly timetable and a distinct kind of work. The hours below are
              totals for the entire six-week semester—not hours per week.
            </p>
          </div>

          <table class="sp-table">
            <thead>
              <tr>
                <th scope="col">Course</th>
                <th scope="col">Total</th>
                <th scope="col">Weekly rhythm</th>
                <th scope="col">Main evidence</th>
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
                      <span class="sp-muted">{{ course.text }}</span>
                    </div>
                  </div>
                </td>
                <td class="sp-table__hours">{{ course.hours }} h</td>
                <td class="sp-table__rhythm">{{ course.rhythm }}</td>
                <td class="sp-table__evidence"><span class="sp-table__label">Evidence: </span>{{ course.evidence }}</td>
              </tr>
            </tbody>
          </table>
          <div class="sp-table-total">
            <span>Six course totals add up to the semester’s facilitated learning time.</span>
            <strong>36 + 18 + 12 + 30 + 30 + 18 = 144 hours</strong>
          </div>
          <p class="sp-small sp-small--after">
            The course codes describe this proposed introductory, non-credit design. Mathematics and Physics includes one
            chemistry investigation and one exercise in economic reasoning about choices and resources; the Commons also
            keeps an opportunity-cost account in Week 2.
          </p>
        </div>
      </section>

      <!-- 03 A teaching day -->
      <section id="schedule" class="sp-section" aria-labelledby="schedule-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">03 / A teaching day</p>
              <h2 id="schedule-title" class="sp-h2">Four daily formats.<br><em>A steady rhythm.</em></h2>
            </div>
            <p class="sp-intro">
              There are four teaching days each week, and each one follows a different timetable: Day A, B, C or D.
              Every teaching day runs from 09:00 to 16:15. Select a day to see its course mix.
            </p>
          </div>

          <div class="sp-schedule">
            <aside class="sp-schedule__aside">
              <h3 class="sp-h3">Choose a day</h3>
              <p class="sp-muted">
                These formats repeat through the six weeks. The learning question changes each week, while the day’s
                subject mix remains the same.
              </p>
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
                  <span>{{ day.short }}</span>
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
                <div>
                  <span class="sp-day-label">Day {{ currentDay.key }} / {{ currentDay.name }}</span>
                  <h3 class="sp-day-panel__title">{{ currentDay.lead }}</h3>
                </div>
                <p>{{ currentDay.summary }}</p>
              </div>
              <div v-for="slot in currentDay.slots" :key="slot.name" class="sp-session">
                <div class="sp-session__time">{{ slot.minutes }}<small> min</small></div>
                <div>
                  <h4>{{ slot.name }} <span>{{ slot.code }}</span></h4>
                  <p>{{ slot.text }}</p>
                </div>
              </div>
              <div class="sp-day-total">
                <span>Facilitated learning</span>
                <strong>360 min / 6 hours</strong>
              </div>
            </article>
          </div>

          <div class="sp-note">
            <p>
              <strong>Time in the day:</strong> 09:00–16:15 includes 6 hours of facilitated learning plus 75 minutes for
              meals and breaks. The complete instructor guide should be used for exact lesson timings and delivery
              instructions.
            </p>
          </div>
        </div>
      </section>

      <!-- 04 Six weeks -->
      <section id="week" class="sp-section sp-section--soft" aria-labelledby="week-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">04 / The six-week journey</p>
              <h2 id="week-title" class="sp-h2">From attention<br><em>to contribution.</em></h2>
            </div>
            <p class="sp-intro">
              Each week has one central question. That question is not a seventh course: it is the thread connecting
              fieldwork, science, physical practice, reading and project work.
            </p>
          </div>

          <div class="sp-week-list">
            <article v-for="(week, i) in weeks" :key="week.theme" class="sp-week-item">
              <div class="sp-week-no">{{ pad(i + 1) }}</div>
              <div class="sp-week-title">
                <span class="sp-week-theme">Week {{ pad(i + 1) }}</span>
                <h3>{{ week.theme }}</h3>
                <p>{{ week.question }}</p>
                <span v-if="week.camp" class="sp-camp-tag">{{ week.camp }}</span>
              </div>
              <div class="sp-week-details">
                <p><strong>In practice:</strong> {{ week.practice }}</p>
                <p><strong>This week:</strong> {{ week.happens }}</p>
                <p class="sp-week-details__meta"><strong>Where:</strong> {{ week.place }}</p>
                <p class="sp-week-details__meta"><strong>Evidence:</strong> {{ week.evidence }}</p>
                <AppLink class="sp-week-link" :to="`/fieldbook?week=${i + 1}`">
                  Week {{ i + 1 }} paper inquiry prompts →
                </AppLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- 05 Assessment -->
      <section id="completion" class="sp-section" aria-labelledby="completion-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">05 / Assessment and completion</p>
              <h2 id="completion-title" class="sp-h2">Show your work.<br><em>Explain your thinking.</em></h2>
            </div>
            <p class="sp-intro">
              Assessment is based on records of learning, original work, practical demonstrations and an individual oral
              defence—not on physique, distance walked, combat dominance, personal beliefs or private spiritual
              experience.
            </p>
          </div>

          <div class="sp-assessment">
            <div class="sp-assessment__intro">
              <h3 class="sp-h3">What learners are expected to produce</h3>
              <p class="sp-muted">
                The proposed assessment combines weekly work with a final project and demonstrations reviewed by
                instructors.
              </p>
              <div class="sp-completion-box">
                <h3>To complete the semester</h3>
                <p>
                  Submit all six weekly entries and the capstone; reach at least level 2 in every dimension after
                  revision; and demonstrate the required field and martial stop procedures to the responsible
                  instructor. Missed sessions are made up through documented equivalent work.
                </p>
                <h3>What you receive</h3>
                <p>
                  A descriptive, non-credit participation record. The programme does not award a degree, academic credit
                  or professional credential.
                </p>
              </div>
            </div>
            <div>
              <div class="sp-assessment-list">
                <div v-for="(output, i) in outputs" :key="output.title" class="sp-assessment-row">
                  <span class="sp-assessment-row__number">{{ pad(i + 1) }}</span>
                  <div>
                    <h4>{{ output.title }}</h4>
                    <p>{{ output.text }}</p>
                  </div>
                </div>
              </div>
              <div class="sp-rule"></div>
              <h3 class="sp-h3">Five dimensions of assessment</h3>
              <div class="sp-assessment-list">
                <div v-for="dimension in dimensions" :key="dimension.letter" class="sp-assessment-row">
                  <span class="sp-assessment-row__number">{{ dimension.letter }}</span>
                  <div>
                    <h4>{{ dimension.title }}</h4>
                    <p>{{ dimension.text }}</p>
                  </div>
                </div>
              </div>
              <p class="sp-small sp-small--after">
                Each dimension is scored from 0 to 3. Descriptive feedback is given in Week 3 and a revision opportunity
                in Week 6. Adapted tasks are assessed against the same standards.
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
              <p class="sp-kicker">06 / Practical information</p>
              <h2 id="practical-title" class="sp-h2">Know the rhythm.<br><em>Know the conditions.</em></h2>
            </div>
            <p class="sp-intro">
              This is a small, in-person, mostly offline programme with substantial field activity. Its timetable, camp
              arrangements and participation conditions need to be understood before enrolment.
            </p>
          </div>

          <div class="sp-practical-grid">
            <article class="sp-practical">
              <p class="sp-eyebrow">Format and daily hours</p>
              <h3 class="sp-h3">Four teaching days a week</h3>
              <p>
                Six weeks in person, for adults aged 18 and over, in a proposed cohort of 6–8 learners. Each teaching day
                runs 09:00–16:15, with 360 facilitated learning minutes and 75 minutes for meals and breaks. The other
                three days of the week carry no compulsory training.
              </p>
            </article>
            <article class="sp-practical">
              <p class="sp-eyebrow">Camping</p>
              <h3 class="sp-h3">Three proposed nights</h3>
              <p>
                Week 2 includes one night; Week 5 includes two nights, with Saturday checkout and return. During camping
                weeks, the schedule is A on Tuesday, C on Wednesday, B on Thursday and D on Friday. Camp meals, sleep,
                transport and duty sit outside the 144 teaching hours.
              </p>
              <p>
                Learners who do not stay overnight can use an accessible sleeping arrangement or a supervised day-camp
                equivalent, with the same educational standing.
              </p>
            </article>
            <article class="sp-practical">
              <p class="sp-eyebrow">Offline learning</p>
              <h3 class="sp-h3">Paper, people and direct experience</h3>
              <p>
                Personal phones and networked devices are off during learning and camps. The core includes no internet or
                live AI. Learners retain switched-off devices or may choose secure storage; devices are returned on
                request. Staff retain emergency communications and check current conditions.
              </p>
              <p>
                Private medical, accessibility and essential-contact exceptions are agreed in advance. The wider
                university may use AI; the core semester uses instructor-written printed claim cards, with any optional
                connected audit outside the 144-hour core.
              </p>
              <p>
                <AppLink class="sp-week-link" to="/care">Read the participation arrangements →</AppLink>
              </p>
            </article>
            <article class="sp-practical">
              <p class="sp-eyebrow">Winter break</p>
              <h3 class="sp-h3">Mid-December to mid-February</h3>
              <p>
                The winter break lasts approximately two months, with no required teaching or camping. Six-week cohorts
                finish before the break or begin after it. Exact dates are confirmed each academic year.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section class="sp-status" aria-labelledby="status-title">
        <div class="container sp-status__inner">
          <h2 id="status-title">Proposed programme</h2>
          <p>
            Before enrolment can open, qualified local staff, a host, venues, equipment, permissions, insurance,
            accessibility arrangements and funding must be confirmed. Dates, fees, subsidies and included costs are not
            yet confirmed. No degree, academic credit or professional credential is offered. The founder’s personal
            spending limit is separate from the actual cost of delivery.
          </p>
        </div>
      </section>

      <!-- 07 Materials -->
      <section id="materials" class="sp-section" aria-labelledby="materials-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">07 / Complete materials</p>
              <h2 id="materials-title" class="sp-h2">Go deeper<br><em>into the teaching plan.</em></h2>
            </div>
            <p class="sp-intro">
              The page explains the semester at a glance. The full documents contain the lesson-by-lesson material and
              reusable paper exercises.
            </p>
          </div>

          <div class="sp-downloads">
            <a class="sp-download" href="/field-semester.pdf" target="_blank" rel="noopener noreferrer">
              <div>
                <strong>Field Semester · Instructor Guide</strong>
                <span>Timed lessons, labs, readings, assessment criteria, camp arrangements and delivery requirements.</span>
              </div>
              <span class="sp-download__arrow" aria-hidden="true">↗</span>
              <span class="visually-hidden">(PDF, opens in a new tab)</span>
            </a>
            <a class="sp-download" href="/offline-fieldbook.pdf" download="Jasper-Offline-Fieldbook.pdf">
              <div>
                <strong>Offline Fieldbook · Learner Sheets</strong>
                <span>Twelve reusable paper sheets for observation, inquiry, reflection and evidence.</span>
              </div>
              <span class="sp-download__arrow" aria-hidden="true">↓</span>
            </a>
          </div>

          <div class="sp-rule"></div>
          <p class="sp-small">
            Enrolment is not open while the programme’s staffing, host, venue, permissions, insurance and funding remain
            unconfirmed. You can prepare an application now and keep it until an official channel opens.
          </p>

          <div class="sp-downloads sp-downloads--entries">
            <AppLink class="sp-download" to="/join/teachers?from=program">
              <div>
                <span class="sp-eyebrow">For teachers</span>
                <strong>Founding teaching roles</strong>
                <span>Prepare an application</span>
              </div>
              <span class="sp-download__arrow" aria-hidden="true">→</span>
            </AppLink>
            <AppLink class="sp-download" to="/join/students?from=program">
              <div>
                <span class="sp-eyebrow">For students</span>
                <strong>Six-week field semester</strong>
                <span>Prepare an application</span>
              </div>
              <span class="sp-download__arrow" aria-hidden="true">→</span>
            </AppLink>
          </div>
        </div>
      </section>

      <!-- 08 Teaching examples -->
      <section id="examples" class="sp-section sp-section--soft" aria-labelledby="examples-title">
        <div class="container">
          <div class="sp-head">
            <div>
              <p class="sp-kicker">08 / Teaching examples</p>
              <h2 id="examples-title" class="sp-h2">How a real question<br><em>is taught across the courses.</em></h2>
            </div>
            <p class="sp-intro">
              These are teaching examples from the instructor guide, not extra courses or extra hours. Each one takes an
              everyday question and works on it inside the existing timetable, so the six courses build one piece of
              work together.
            </p>
          </div>

          <h3 class="sp-h3">The Jasper method in four steps</h3>
          <p class="sp-muted sp-examples__lead">
            Every example follows the same pattern. A learner meets the question in practice, tests it with evidence,
            asks why it matters, and turns it into something another person can use.
          </p>
          <ol class="sp-system">
            <li v-for="(item, i) in method" :key="item.step" class="sp-system__step">
              <span class="sp-system__num">{{ pad(i + 1) }}</span>
              <h4 class="sp-h3">{{ item.step }}</h4>
              <span class="sp-eyebrow sp-system__where">{{ item.where }}</span>
              <p>{{ item.text }}</p>
            </li>
          </ol>

          <h3 class="sp-h3 sp-examples__subhead">Three example questions</h3>
          <div class="sp-case-tabs" role="tablist" aria-label="Teaching examples">
            <button
              v-for="(item, i) in cases"
              :id="`case-tab-${item.key}`"
              :key="item.key"
              ref="caseTabs"
              type="button"
              role="tab"
              class="sp-day-tab"
              :aria-selected="i === activeCase"
              :aria-controls="`case-panel-${item.key}`"
              :tabindex="i === activeCase ? 0 : -1"
              @click="activeCase = i"
              @keydown="onCaseKeydown"
            >
              {{ item.name }}
              <span>Example {{ pad(i + 1) }}</span>
            </button>
          </div>

          <article
            :id="`case-panel-${currentCase.key}`"
            class="sp-day-panel sp-case-panel"
            role="tabpanel"
            :aria-labelledby="`case-tab-${currentCase.key}`"
          >
            <div class="sp-day-panel__head">
              <div>
                <span class="sp-day-label">Example {{ pad(activeCase + 1) }} / {{ currentCase.name }}</span>
                <h3 class="sp-day-panel__title">{{ currentCase.question }}</h3>
              </div>
              <p>{{ currentCase.context }}</p>
            </div>
            <div v-for="(step, i) in currentCase.steps" :key="step.course + i" class="sp-session sp-case-step">
              <div class="sp-case-step__mark">
                <span class="sp-system__num">{{ pad(i + 1) }}</span>
                <span>{{ method[i]!.step }}</span>
              </div>
              <div>
                <h4>{{ step.course }}</h4>
                <p>{{ step.text }}</p>
              </div>
            </div>
            <div class="sp-day-total">
              <span>What the learner leaves with</span>
              <strong>{{ currentCase.evidence }}</strong>
            </div>
          </article>

          <p class="sp-small sp-small--after">
            These are proposed examples. The instructor guide sets the exact contexts once local conditions, access and
            the actual group are known, and every activity stays within agreed safety boundaries.
            <a class="sp-week-link" href="/field-semester.pdf" target="_blank" rel="noopener noreferrer">
              Read the examples in the instructor guide ↗<span class="visually-hidden"> (PDF, opens in a new tab)</span>
            </a>
          </p>
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
.sp-eyebrow,
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

.sp-muted {
  color: var(--color-muted);
}

.sp-small {
  font-size: 0.86rem;
  color: var(--color-muted);
}

.sp-small--after {
  margin-top: 15px;
}

.sp-rule {
  height: 1px;
  margin: 28px 0;
  background: var(--color-line);
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

/* ---------- 01 System ---------- */
.sp-system {
  display: grid;
  border: 1px solid var(--color-line);
  background: var(--color-paper);
}

.sp-system__step {
  padding: 21px;
  border-bottom: 1px solid var(--color-line);
}

.sp-system__step:last-child {
  border-bottom: 0;
}

.sp-system__num {
  display: block;
  margin-bottom: 10px;
  font-family: var(--font-serif);
  font-size: 1.7rem;
  color: var(--color-cobalt);
}

.sp-system__step p {
  font-size: 0.91rem;
  color: var(--color-muted);
}

/* ---------- 02 Course table ---------- */
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

.sp-table__course .sp-muted {
  display: block;
  font-size: 0.84rem;
}

.sp .sp-table__hours {
  display: inline-block;
  margin-right: 18px;
  font-family: var(--font-serif);
  font-size: 1.4rem;
  white-space: nowrap;
}

.sp-table__rhythm {
  margin-top: 7px;
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

.sp-schedule__aside p {
  margin-bottom: 16px;
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

.sp-session__time small {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  color: var(--color-muted);
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

.sp-session h4 span {
  margin-left: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-cobalt);
  white-space: nowrap;
}

.sp-session p {
  font-size: 0.88rem;
  color: var(--color-muted);
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

.sp-camp-tag {
  display: inline-block;
  margin-top: 9px;
  padding: 4px 8px;
  border: 1px solid var(--color-line);
  background: var(--color-mist);
  font-size: 0.7rem;
  color: var(--color-navy);
}

.sp-week-details {
  grid-column: 2;
}

.sp-week-details p {
  margin-bottom: 9px;
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

/* ---------- 08 Teaching examples ---------- */
.sp-examples__lead {
  max-width: 40rem;
  margin-bottom: 20px;
}

.sp-system__where {
  margin: -4px 0 8px;
  font-size: 0.68rem;
}

.sp .sp-examples__subhead {
  margin-top: 44px;
}

.sp-case-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 5px;
  margin: 16px 0;
}

.sp-case-step {
  grid-template-columns: 92px minmax(0, 1fr);
}

.sp-case-step__mark {
  display: grid;
  align-content: start;
  gap: 2px;
}

.sp .sp-case-step__mark .sp-system__num {
  margin: 0;
  font-size: 1.35rem;
  line-height: 1.2;
}

.sp-case-step__mark span:last-child {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-muted);
}

.sp-case-panel .sp-day-total strong {
  max-width: 34rem;
}

/* ---------- 05 Assessment ---------- */
.sp-assessment {
  display: grid;
  gap: 28px;
}

.sp-assessment__intro > p {
  margin-bottom: 16px;
}

.sp-completion-box {
  margin-top: 28px;
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

.sp-assessment-row p {
  font-size: 0.88rem;
  color: var(--color-muted);
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

.sp-practical .sp-eyebrow {
  margin-bottom: 12px;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
}

.sp-practical p:not(.sp-eyebrow) {
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

.sp-download div > span:not(.sp-eyebrow) {
  display: block;
  font-size: 0.85rem;
  color: var(--color-muted);
}

.sp-download .sp-eyebrow {
  margin-bottom: 6px;
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

  .sp-system {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sp-system__step {
    padding: 25px 22px;
    border-bottom: 0;
  }

  .sp-system__step:nth-child(odd) {
    border-right: 1px solid var(--color-line);
  }

  .sp-system__step:nth-child(-n + 2) {
    border-bottom: 1px solid var(--color-line);
  }

  .sp-system__num {
    margin-bottom: 22px;
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

  .sp-table__rhythm {
    margin-top: 0;
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

  .sp-case-step {
    grid-template-columns: 140px minmax(0, 1fr);
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

  .sp-system {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .sp-system__step {
    min-height: 220px;
  }

  .sp-system__step:nth-child(-n + 2) {
    border-bottom: 0;
  }

  .sp-system__step:not(:last-child) {
    border-right: 1px solid var(--color-line);
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
