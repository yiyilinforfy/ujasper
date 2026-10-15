<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppLink from '../components/AppLink.vue'
import DraftForm from '../components/DraftForm.vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import '../styles/pathway.css'

const roles = [
  {
    title: 'Local host',
    text: 'Help identify suitable space or local arrangements. Describe your Jasper connection and the particular dates or activity you could support.',
  },
  {
    title: 'Activity lead',
    text: 'Bring relevant qualifications for a defined programme. Six-week availability is only needed if the agreed role requires it.',
  },
  {
    title: 'Learning contributor',
    text: 'You may offer one session or a longer role. Tell us your subject and realistic availability.',
  },
  {
    title: 'Supporter',
    text: 'Supporters may live anywhere. A six-week stay in Jasper is not required. Tell us what interests you and what information you would need before a conversation.',
  },
  {
    title: 'Founding director',
    text: 'Discuss a founding role in establishing the university. No partnership, venue booking, appointment or funding commitment is created by an introduction.',
  },
]

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

const process = [
  {
    title: 'Prepare your introduction',
    text: 'Use the draft below as a thinking space. Required fields are marked. Keep the draft until formal instructions are published.',
  },
  {
    title: 'Keep a clear scope',
    text: 'Local hosts may help identify suitable space or local arrangements. Activity leads bring relevant qualifications. Learning contributors may offer one session.',
  },
  {
    title: 'No commitment yet',
    text: 'Supporters can be based anywhere; a six-week stay is not a condition of support. No partnership, venue booking, appointment or funding commitment is created by an introduction.',
  },
]

const steps = ['Your introduction', 'Your work and questions', 'Your commitments'] as const
const contributionOptions = roles.map(role => role.title)
const pad = (n: number) => String(n).padStart(2, '0')

const selectedRole = ref('Local host')
const availabilityRequired = computed(
  () => selectedRole.value === 'Local host' || selectedRole.value === 'Activity lead',
)

const roleGuidance = computed(() => {
  if (selectedRole.value === 'Local host' || selectedRole.value === 'Activity lead') {
    return 'Describe your Jasper connection and the particular dates or activity you could support. Six-week availability is only needed if the agreed role requires it.'
  }
  if (selectedRole.value === 'Learning contributor') {
    return 'You may offer one session or a longer role. Tell us your subject and realistic availability.'
  }
  return 'Supporters may live anywhere. A six-week stay in Jasper is not required. Tell us what interests you and what information you would need before a conversation.'
})

const draft = useTemplateRef<InstanceType<typeof DraftForm>>('draft')
const route = useRoute()

function onRoleChange(event: Event) {
  selectedRole.value = (event.target as HTMLInputElement).value
}

function syncRoleFromForm() {
  const checked = document.querySelector<HTMLInputElement>('#draft input[name="role"]:checked')
  if (checked) selectedRole.value = checked.value
}

onMounted(async () => {
  const requested = route.query.role
  if (typeof requested === 'string' && contributionOptions.includes(requested)) {
    selectedRole.value = requested
  }
  await nextTick()
  syncRoleFromForm()
  if (!document.querySelector('#draft input[name="role"]:checked')) {
    draft.value?.chooseRole(selectedRole.value)
  }
  document.getElementById('draft')?.addEventListener('draft-cleared', syncRoleFromForm)
})

onUnmounted(() => {
  document.getElementById('draft')?.removeEventListener('draft-cleared', syncRoleFromForm)
})

watch(
  () => route.query.role,
  requested => {
    if (typeof requested === 'string' && contributionOptions.includes(requested)) {
      selectedRole.value = requested
      draft.value?.chooseRole(requested)
    }
  },
)
</script>

<template>
  <div class="pw">
    <DraftForm
      ref="draft"
      kind="host"
      label="Hosts, contributors and supporters"
      heading="Bring your place,<br><em>practice or possibility.</em>"
      text="A local host, an occasional educator and an overseas supporter bring different things. Tell us what you could realistically offer."
      image="join-hosts"
      worksheet="/host-application-worksheet.txt"
      preselect="role"
    >
      <template #default="{ current }">
        <fieldset class="draft-step" data-step="0" :hidden="current !== 0">
          <legend>{{ steps[0] }}</legend>
          <div class="draft-field draft-field--c1">
            <label class="draft-label" for="host-name">Your name <span aria-hidden="true">*</span></label>
            <input
              id="host-name"
              class="draft-input"
              name="name"
              data-export="Your name"
              type="text"
              maxlength="250"
              required
              autocomplete="name"
            >
          </div>
          <div class="draft-field draft-field--c1">
            <label class="draft-label" for="host-email">
              Email for your own draft <span class="draft-optional">Optional</span>
            </label>
            <p id="host-email-help" class="draft-help">No address is sent to us by this tool.</p>
            <input
              id="host-email"
              class="draft-input"
              name="email"
              data-export="Email for your own draft"
              type="email"
              maxlength="250"
              autocomplete="email"
              aria-describedby="host-email-help"
            >
          </div>
          <fieldset class="draft-field draft-field--full draft-choices">
            <legend>How you would like to contribute <span aria-hidden="true">*</span></legend>
            <label v-for="(role, i) in contributionOptions" :key="role" class="draft-choice">
              <input
                type="radio"
                name="role"
                :value="role"
                data-export="How you would like to contribute"
                :required="i === 0"
                @change="onRoleChange"
              >
              <span>{{ role }}</span>
            </label>
            <p id="role-guidance" class="draft-help hosts-role-guidance" aria-live="polite">{{ roleGuidance }}</p>
          </fieldset>
        </fieldset>

        <fieldset class="draft-step" data-step="1" :hidden="current !== 1">
          <legend>{{ steps[1] }}</legend>
          <div class="draft-field draft-field--c1 draft-field--rows2">
            <label class="draft-label" for="host-offer">
              What could you offer or help us explore? <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="host-offer"
              class="draft-input"
              name="offer"
              data-export="What could you offer or help us explore?"
              rows="4"
              maxlength="12000"
              required
            ></textarea>
          </div>
          <div class="draft-field draft-field--c1 draft-field--rows2">
            <label class="draft-label" for="host-evidence">
              Relevant experience, resources or questions <span class="draft-optional">Optional</span>
            </label>
            <textarea
              id="host-evidence"
              class="draft-input"
              name="evidence"
              data-export="Relevant experience, resources or questions"
              rows="4"
              maxlength="12000"
            ></textarea>
          </div>
          <div class="draft-field draft-field--c2 draft-field--rows2">
            <label class="draft-label" for="host-availability">
              Connection and availability
              <span v-if="availabilityRequired" aria-hidden="true">*</span>
              <span v-else class="draft-optional">Optional</span>
            </label>
            <textarea
              id="host-availability"
              class="draft-input"
              name="availability"
              data-export="Connection and availability"
              rows="4"
              maxlength="12000"
              :required="availabilityRequired"
            ></textarea>
          </div>
        </fieldset>

        <fieldset class="draft-step draft-step--three" data-step="2" :hidden="current !== 2">
          <legend>{{ steps[2] }}</legend>
          <label class="draft-check">
            <input type="checkbox" name="adult" value="Yes" data-export="I am 18 or older" required>
            <span>I am 18 or older (required)</span>
          </label>
          <label class="draft-check">
            <input
              type="checkbox"
              name="status"
              value="Yes"
              data-export="I understand that this draft creates no appointment, financial commitment or agreement"
              required
            >
            <span>
              I understand that this draft creates no appointment, financial commitment or agreement (required)
            </span>
          </label>
        </fieldset>
      </template>
    </DraftForm>

    <figure class="pw-band hosts-band">
      <ResponsiveImage name="letter-peaks" alt="Mountain peaks in the Canadian Rockies" />
    </figure>

    <section class="pw-section" aria-labelledby="who-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">Hosts, contributors and supporters</p>
          <h2 id="who-title" class="pw-h2">A contribution<br><em>with a clear scope.</em></h2>
          <p class="pw-text">
            Local hosts may help identify suitable space or local arrangements. Activity leads bring relevant
            qualifications. Learning contributors may offer one session. Supporters can be based anywhere; a six-week stay
            is not a condition of support.
          </p>
          <p class="pw-note">
            No partnership, venue booking, appointment or funding commitment is created by an introduction.
          </p>
        </div>

        <div class="hosts-block">
          <h3 class="hosts-block__title">What could you bring?</h3>
          <ol class="pw-rows">
            <li v-for="(role, i) in roles" :key="role.title">
              <span class="pw-num">{{ pad(i + 1) }}</span>
              <h4 class="pw-item-title">{{ role.title }}</h4>
              <p class="pw-text">{{ role.text }}</p>
            </li>
          </ol>
        </div>

        <div class="hosts-block">
          <h3 class="hosts-block__title">Choose your way in</h3>
          <ul class="pw-columns pw-columns--4">
            <li v-for="item in pathways" :key="item.to">
              <h4 class="pw-item-title">
                <AppLink class="link" :to="item.to">{{ item.title }} <span aria-hidden="true">→</span></AppLink>
              </h4>
              <p class="pw-text">{{ item.text }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="pw-section pw-section--mist" aria-labelledby="next-title">
      <div class="container">
        <div class="pw-head">
          <p class="pw-label">After your introduction</p>
          <h2 id="next-title" class="pw-h2">What happens next?</h2>
          <p class="pw-text">
            Formal admissions and appointments are not open. Keep your draft until formal instructions are published.
          </p>
        </div>

        <ol class="hosts-flow">
          <li v-for="(step, i) in process" :key="step.title">
            <span class="hosts-flow__marker" aria-hidden="true">{{ pad(i + 1) }}</span>
            <h3 class="pw-item-title">{{ step.title }}</h3>
            <p class="pw-text">{{ step.text }}</p>
          </li>
          <li class="hosts-flow__end">
            <span class="hosts-flow__marker hosts-flow__marker--end" aria-hidden="true">✓</span>
            <h3 class="pw-item-title">You decide</h3>
            <p class="pw-text">
              Take part only once the venue, dates, people and costs are confirmed and clear to you.
            </p>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hosts-role-guidance {
  grid-column: 1 / -1;
  margin-top: var(--space-3);
}

.hosts-band img {
  object-position: center 55%;
}

.pw h4 {
  margin: 0;
}

.hosts-block + .hosts-block {
  margin-top: var(--space-8);
}

.hosts-block__title {
  margin-bottom: var(--space-5);
  font-size: 1.5rem;
}

.hosts-flow {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-6);
}

.hosts-flow > li {
  position: relative;
  display: grid;
  align-content: start;
  gap: var(--space-3);
}

.hosts-flow > li:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 1.25rem;
  left: 3rem;
  width: calc(100% - 3rem + var(--space-6) - 0.5rem);
  height: 1px;
  background: var(--color-line);
}

.hosts-flow > li:not(:last-child)::before {
  content: '';
  position: absolute;
  top: calc(1.25rem - 4px);
  right: calc(-1 * var(--space-6) + 0.5rem);
  width: 9px;
  height: 9px;
  border-top: 1px solid var(--color-line);
  border-right: 1px solid var(--color-line);
  transform: rotate(45deg);
}

.hosts-flow__marker {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--color-cobalt);
  border-radius: 50%;
  background: var(--color-paper);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  color: var(--color-cobalt);
}

.hosts-flow__marker--end {
  background: var(--color-cobalt);
  color: var(--color-on-dark);
  font-size: 0.875rem;
}

.hosts-flow .pw-text {
  max-width: none;
}

@media (max-width: 900px) {
  .hosts-flow {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .hosts-flow > li {
    grid-template-columns: 2.5rem minmax(0, 1fr);
    column-gap: var(--space-4);
    padding-bottom: var(--space-6);
  }

  .hosts-flow__marker {
    grid-row: 1 / span 2;
  }

  .hosts-flow .pw-item-title,
  .hosts-flow .pw-text {
    grid-column: 2;
  }

  .hosts-flow > li:not(:last-child)::after {
    top: 2.75rem;
    left: 1.25rem;
    width: 1px;
    height: calc(100% - 3rem);
  }

  .hosts-flow > li:not(:last-child)::before {
    display: none;
  }
}
</style>
