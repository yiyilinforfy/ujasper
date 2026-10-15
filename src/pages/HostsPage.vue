<script setup lang="ts">
import AppLink from '../components/AppLink.vue'
import DraftForm from '../components/DraftForm.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import type { DraftField, DraftValues } from '../composables/useApplicationForm'
import '../styles/pathway.css'

const pathways = [
  {
    to: '/join/students',
    title: 'Bring a question',
    text: 'Explore the Field Semester and prepare a thoughtful introduction.',
  },
  {
    to: '/join/teachers',
    title: 'Teach something that matters',
    text: 'Help a learner see, test and explain what they could not before.',
  },
  {
    to: '/join/hosts',
    title: 'Make a place for learning',
    text: 'Offer a local connection, a session, resources or a useful task.',
  },
  {
    to: '/support',
    title: 'Help establish the first chapter',
    text: 'Start with people, a defined milestone and evidence.',
  },
]

const isLocal = (values: DraftValues) => values.role === 'Local host' || values.role === 'Activity lead'

function roleGuidance(values: DraftValues) {
  if (isLocal(values))
    return 'Describe your Jasper connection and the particular dates or activity you could support. Six-week availability is only needed if the agreed role requires it.'
  if (values.role === 'Learning contributor')
    return 'You may offer one session or a longer role. Tell us your subject and realistic availability.'
  return 'Supporters may live anywhere. A six-week stay in Jasper is not required. Tell us what interests you and what information you would need before a conversation.'
}

const steps: DraftField[][] = [
  [
    { name: 'name', label: 'Your name', type: 'text', required: true, autocomplete: 'name' },
    {
      name: 'email',
      label: 'Email for your own draft',
      type: 'email',
      autocomplete: 'email',
      hint: 'No address is sent to us by this tool.',
    },
    {
      name: 'role',
      label: 'How you would like to contribute',
      type: 'select',
      required: true,
      options: ['Local host', 'Activity lead', 'Learning contributor', 'Supporter', 'Founding director'],
      callout: roleGuidance,
    },
  ],
  [
    { name: 'offer', label: 'What could you offer or help us explore?', type: 'textarea', required: true },
    { name: 'evidence', label: 'Relevant experience, resources or questions', type: 'textarea' },
    { name: 'availability', label: 'Connection and availability', type: 'textarea', rows: 4, required: isLocal },
  ],
  [
    { name: 'adult', label: 'I am 18 or older', type: 'checkbox', required: true },
    {
      name: 'status',
      label: 'I understand that this draft creates no appointment, financial commitment or agreement',
      type: 'checkbox',
      required: true,
    },
  ],
]
</script>

<template>
  <div class="pw">
    <section class="pw-hero hero-media" aria-labelledby="hosts-title">
      <ResponsiveImage class="hero-media__image" name="join-hosts" priority />
      <div class="container">
        <div class="pw-hero__copy">
          <p class="pw-label">Hosts, contributors and supporters</p>
          <h1 id="hosts-title" class="pw-hero__title">Bring your place,<br><em>practice or possibility.</em></h1>
          <p class="pw-hero__lead">
            A local host, an occasional educator and an overseas supporter bring different things. Tell us what you could
            realistically offer.
          </p>
        </div>
      </div>
    </section>

    <section class="pw-section pw-section--cloud" aria-labelledby="scope-title">
      <div class="container">
        <div class="pw-head">
          <h2 id="scope-title" class="pw-title">A contribution<br><em>with a clear scope.</em></h2>
          <p class="pw-text">
            Local hosts may help identify suitable space or local arrangements. Activity leads bring relevant
            qualifications. Learning contributors may offer one session. Supporters can be based anywhere; a six-week stay
            is not a condition of support.
          </p>
          <p class="pw-note">
            No partnership, venue booking, appointment or funding commitment is created by an introduction.
          </p>
        </div>
        <ul class="pw-roles">
          <li v-for="item in pathways" :key="item.to">
            <AppLink class="pw-role" :to="item.to">
              <h3 class="pw-item-title">{{ item.title }}</h3>
              <span class="pw-role__text">{{ item.text }}</span>
              <span class="pw-role__arrow" aria-hidden="true">→</span>
            </AppLink>
          </li>
        </ul>
      </div>
    </section>

    <section id="draft" class="pw-section" aria-labelledby="draft-title">
      <div class="container">
        <DraftForm kind="host" :steps="steps" worksheet="/host-application-worksheet.txt" preselect="role" />
      </div>
    </section>
  </div>
</template>
