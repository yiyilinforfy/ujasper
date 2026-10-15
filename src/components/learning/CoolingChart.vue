<script setup lang="ts">
import { computed } from 'vue'

export interface CoolingSeries {
  key: string
  label: string
  values: number[]
  dashed?: boolean
}

const props = defineProps<{
  times: number[]
  series: CoolingSeries[]
}>()

const width = 650
const height = 360
const left = 65
const right = 565
const bottom = 285
const yMax = 40
const plotHeight = bottom - 71.67

const tMax = computed(() => Math.max(...props.times))
const x = (t: number) => left + (t / tMax.value) * (right - left)
const y = (v: number) => bottom - (v / yMax) * plotHeight

const yTicks = [0, 10, 20, 30, 40]
const xTicks = [0, 5, 10, 15, 20]

const lines = computed(() =>
  props.series.map(s => {
    const points = s.values.map((v, i) => ({ x: x(props.times[i]), y: y(v) }))
    const last = points[points.length - 1]
    return {
      ...s,
      points,
      path: points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '),
      endY: last.y + 5,
    }
  }),
)
</script>

<template>
  <svg
    class="cooling-chart"
    :viewBox="`0 0 ${width} ${height}`"
    role="img"
    aria-labelledby="cooling-chart-title cooling-chart-desc"
  >
    <title id="cooling-chart-title">Two synthetic cooling curves</title>
    <desc id="cooling-chart-desc">
      Over twenty minutes sample A decreases from 40 to 28 degrees Celsius and B from 40 to 33.5. These are invented
      teaching values, with one illustrative run per sample. The complete values follow in a table.
    </desc>

    <g class="cooling-chart__grid">
      <g v-for="tick in yTicks" :key="`y${tick}`">
        <line :x1="left" :x2="right" :y1="y(tick)" :y2="y(tick)" :class="{ 'cooling-chart__base': tick === 0 }" />
        <text :x="left - 14" :y="y(tick) + 5" text-anchor="end">{{ tick }}</text>
      </g>
      <text v-for="tick in xTicks" :key="`x${tick}`" :x="x(tick)" :y="bottom + 25" text-anchor="middle">{{ tick }}</text>
    </g>

    <text class="cooling-chart__axis" :x="left" y="23">Temperature (°C)</text>
    <text class="cooling-chart__axis" :x="(left + right) / 2" y="341" text-anchor="middle">Minutes</text>

    <g v-for="line in lines" :key="line.key" :class="['cooling-chart__series', `cooling-chart__series--${line.key}`]">
      <polyline :points="line.path" :stroke-dasharray="line.dashed ? '8 5' : undefined" />
      <circle v-for="(p, i) in line.points" :key="i" :cx="p.x" :cy="p.y" r="4" />
      <text class="cooling-chart__end" :x="right + 15" :y="line.endY">{{ line.label }}</text>
    </g>
  </svg>
</template>

<style scoped>
.cooling-chart {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  font-family: var(--font-sans);
}

.cooling-chart text {
  font-size: 13px;
  font-weight: 400;
  fill: var(--color-muted);
}

.cooling-chart__grid line {
  stroke: var(--color-line);
  stroke-width: 1;
}

.cooling-chart__grid line.cooling-chart__base {
  stroke: var(--color-ink);
}

.cooling-chart .cooling-chart__axis {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  fill: var(--color-ink);
}

.cooling-chart__series polyline {
  fill: none;
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.cooling-chart__series--a {
  --series-colour: var(--color-cobalt);
}

.cooling-chart__series--b {
  --series-colour: var(--color-accent-deep);
}

.cooling-chart__series polyline {
  stroke: var(--series-colour);
}

.cooling-chart__series circle {
  fill: var(--color-paper);
  stroke: var(--series-colour);
  stroke-width: 2;
}

.cooling-chart .cooling-chart__end {
  font-family: var(--font-serif);
  font-size: 18px;
  fill: var(--series-colour);
}
</style>
