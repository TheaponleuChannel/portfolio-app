<script setup lang="ts">
import { computed } from 'vue';

interface FilterCategory {
  name: string;
  color: string;
  icon: string;
}

const props = withDefaults(
  defineProps<{
    categories: FilterCategory[];
    /** Label of the always-present first pill that clears the filter. */
    allLabel?: string;
    /** Accent used for the "all" pill; the rest use their category accent. */
    brandColor?: string;
    ariaLabel?: string;
  }>(),
  {
    allLabel: 'All',
    brandColor: '#6d77ed',
    ariaLabel: 'Filter by category',
  },
);

const model = defineModel<string>({ required: true });

const pills = computed<FilterCategory[]>(() => [
  { name: props.allLabel, color: props.brandColor, icon: 'pi-asterisk' },
  ...props.categories,
]);
</script>

<template>
  <div class="filter-toolbar">
    <div class="filter-pills" role="group" :aria-label="ariaLabel">
      <button
        v-for="pill in pills"
        :key="pill.name"
        type="button"
        class="filter-pill"
        :class="{ 'filter-pill--active': model === pill.name }"
        :style="{ '--pill-color': pill.color }"
        :aria-pressed="model === pill.name"
        @click="model = pill.name"
      >
        <i :class="`pi ${pill.icon}`" class="filter-pill__icon" />
        {{ pill.name }}
      </button>
    </div>

    <div v-if="$slots.actions" class="filter-toolbar__side">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.filter-pill {
  --pill-color: #6d77ed;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  gap: 0.55rem;
  padding: 0.5rem 0.95rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #52525b;
  background-color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
  transition: color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease,
    transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
}

.filter-pill__icon {
  font-size: 0.82rem;
  color: var(--pill-color);
  transition: color 0.25s ease;
}

.filter-pill:hover {
  transform: translateY(-2px);
  color: var(--pill-color);
  border-color: color-mix(in srgb, var(--pill-color) 45%, transparent);
  box-shadow: 0 4px 14px color-mix(in srgb, var(--pill-color) 18%, transparent);
}

.filter-pill:focus-visible {
  outline: 2px solid var(--pill-color);
  outline-offset: 2px;
}

.filter-pill--active {
  color: #fff;
  background-color: var(--pill-color);
  background-image: linear-gradient(135deg, color-mix(in srgb, var(--pill-color) 82%, #fff), var(--pill-color));
  border-color: transparent;
  box-shadow: 0 6px 18px color-mix(in srgb, var(--pill-color) 42%, transparent);
}

.filter-pill--active:hover {
  color: #fff;
  transform: translateY(-2px);
}

.filter-pill--active .filter-pill__icon {
  color: #fff;
}

.my-app-dark .filter-pill {
  color: #a1a1aa;
  background-color: rgba(24, 24, 27, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}

.my-app-dark .filter-pill:hover {
  color: color-mix(in srgb, var(--pill-color) 70%, #fff);
  border-color: color-mix(in srgb, var(--pill-color) 55%, transparent);
}

.my-app-dark .filter-pill--active,
.my-app-dark .filter-pill--active:hover {
  color: #fff;
}

/* Horizontal scroller on small screens; wraps to rows on ≥768px */
.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  padding: 0.25rem 0.5rem 0.625rem;
  margin: -0.25rem -0.5rem -0.625rem;
  scrollbar-width: none;
}

.filter-pills::-webkit-scrollbar {
  display: none;
}

@media (min-width: 768px) {
  .filter-pills {
    flex-wrap: wrap;
    overflow-x: visible;
    padding: 0;
    margin: 0;
  }
}

/* ---------- Filter toolbar ---------- */
.filter-toolbar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 1.25rem;
  background-color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.filter-toolbar__side {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
}

.my-app-dark .filter-toolbar {
  background-color: rgba(24, 24, 27, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}

@media (min-width: 1024px) {
  .filter-toolbar {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.1rem;
  }
}
</style>
