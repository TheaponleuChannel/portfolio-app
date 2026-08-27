<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import SelectButton from 'primevue/selectbutton';
import ResourceCard from '../components/ResourceCard.vue';
import ResourceMagazine from '../components/ResourceMagazine.vue';
import { resources, resourceCategories } from '../data/usePortfolio';
import type { ResourceCategory } from '../models/resource';

type ViewMode = 'card' | 'magazine';

const STORAGE_KEY = 'resources-view-mode';

const viewOptions = [
  { label: 'Card', value: 'card', icon: 'pi pi-th-large' },
  { label: 'Magazine', value: 'magazine', icon: 'pi pi-book' },
];

const stored = localStorage.getItem(STORAGE_KEY);
const viewMode = ref<ViewMode>(stored === 'magazine' ? 'magazine' : 'card');
watch(viewMode, (value) => localStorage.setItem(STORAGE_KEY, value));

const activeCategory = ref<string>('All');
const filterCategories = computed(() => ['All', ...resourceCategories.map((c) => c.name)]);

const fallbackCategory: ResourceCategory = { name: 'Resource', color: '#6366f1', icon: 'pi-bookmark' };
const categoryMeta = (name: string): ResourceCategory =>
  resourceCategories.find((c) => c.name === name) ?? fallbackCategory;
const categoryIcon = (name: string) => categoryMeta(name).icon;

/** Brand indigo used for the "All" pill; every other pill uses its category accent. */
const BRAND_COLOR = '#6d77ed';
const pillColor = (name: string) => (name === 'All' ? BRAND_COLOR : categoryMeta(name).color);
const pillIcon = (name: string) => (name === 'All' ? 'pi-asterisk' : categoryIcon(name));

const filteredResources = computed(() =>
  activeCategory.value === 'All'
    ? resources
    : resources.filter((resource) => resource.category === activeCategory.value),
);
</script>

<template>
  <section class="container mx-auto py-16">
    <div class="text-center mb-12 scroll-hidden animate-fade-in-up">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
      <h6 class="text-gray-500 max-w-2xl mx-auto">
        A curated collection of articles, tools, books and courses that shaped how I build for the web.
      </h6>
    </div>

    <div
      v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }"
      class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10 scroll-hidden"
    >
      <div class="flex flex-wrap gap-2.5" role="group" aria-label="Filter resources by category">
        <button
          v-for="cat in filterCategories"
          :key="cat"
          type="button"
          class="filter-pill"
          :class="{ 'filter-pill--active': activeCategory === cat }"
          :style="{ '--pill-color': pillColor(cat) }"
          :aria-pressed="activeCategory === cat"
          @click="activeCategory = cat"
        >
          <i :class="`pi ${pillIcon(cat)}`" class="filter-pill__icon" />
          {{ cat }}
        </button>
      </div>

      <SelectButton
        size="large"
        v-model="viewMode"
        :options="viewOptions"
        option-value="value"
        data-key="value"
        :allow-empty="false"
        aria-label="Toggle view mode"
      >
        <template #option="slotProps">
          <i :class="slotProps.option.icon" />
          <span class="ml-2 hidden sm:inline">{{ slotProps.option.label }}</span>
        </template>
      </SelectButton>
    </div>

    <!-- Content -->
    <div v-if="filteredResources.length">
      <!-- Card mode -->
      <div v-if="viewMode === 'card'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(resource, index) in filteredResources"
          :key="resource.id"
          v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }"
          class="scroll-hidden"
          :class="`anim-delay-${Math.min((index + 1) * 100, 800)}`"
        >
          <ResourceCard :resource="resource" :category="categoryMeta(resource.category)" />
        </div>
      </div>

      <!-- Magazine mode -->
      <div v-else class="flex flex-col gap-8">
        <div
          v-for="(resource, index) in filteredResources"
          :key="resource.id"
          v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }"
          class="scroll-hidden"
          :class="`anim-delay-${Math.min((index + 1) * 100, 800)}`"
        >
          <ResourceMagazine
            :resource="resource"
            :category="categoryMeta(resource.category)"
            :reverse="index % 2 === 1"
            :index="index + 1"
          />
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-20">
      <i class="pi pi-inbox block mb-4" style="font-size: 2.5rem; color: #9c9ca4" />
      <p class="text-default-500">No resources found in this category.</p>
    </div>
  </section>
</template>

<style scoped>
.filter-pill {
  --pill-color: #6d77ed;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.66rem 1.2rem;
  border-radius: 10px;
  font-size: 0.95rem;
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

</style>
