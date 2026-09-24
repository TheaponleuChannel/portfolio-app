<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import SelectButton from 'primevue/selectbutton';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import ResourceCard from '../components/ResourceCard.vue';
import ResourceMagazine from '../components/ResourceMagazine.vue';
import ResourceSkeleton from '../components/ResourceSkeleton.vue';
import { resources, resourceCategories } from '../data/usePortfolio';
import type { ResourceCategory } from '../models/resource';
import { useThumbnails } from '../composables/useThumbnails';

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

const searchText = ref('');

const fallbackCategory: ResourceCategory = { name: 'Resource', color: '#6366f1', icon: 'pi-bookmark' };
const categoryMeta = (name: string): ResourceCategory =>
  resourceCategories.find((c) => c.name === name) ?? fallbackCategory;
const categoryIcon = (name: string) => categoryMeta(name).icon;

/** Brand indigo used for the "All" pill; every other pill uses its category accent. */
const BRAND_COLOR = '#6d77ed';
const pillColor = (name: string) => (name === 'All' ? BRAND_COLOR : categoryMeta(name).color);
const pillIcon = (name: string) => (name === 'All' ? 'pi-asterisk' : categoryIcon(name));

const PAGE_SIZE = 5;

const { enrichedResources, loading } = useThumbnails(resources);

const filteredResources = computed(() => {
  const byCategory =
    activeCategory.value === 'All'
      ? enrichedResources.value
      : enrichedResources.value.filter((resource) => resource.category === activeCategory.value);

  const query = searchText.value.trim().toLowerCase();
  if (!query) return byCategory;
  return byCategory.filter((resource) =>
    [resource.title, resource.description, resource.author ?? '', ...(resource.tags ?? [])]
      .join(' ')
      .toLowerCase()
      .includes(query),
  );
});

const visibleCount = ref(PAGE_SIZE);

const visibleResources = computed(() =>
  filteredResources.value.slice(0, visibleCount.value),
);

const hasMore = computed(() => visibleCount.value < filteredResources.value.length);

function loadMore() {
  visibleCount.value += PAGE_SIZE;
}

// Reset pagination when category or search changes
watch([activeCategory, searchText], () => {
  visibleCount.value = PAGE_SIZE;
});
</script>

<template>
  <section class="container mx-auto px-2.5 sm:px-0 py-10 sm:py-16">
    <div class="text-center mb-8 sm:mb-12 scroll-hidden animate-fade-in-up">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
      <h6 class="text-gray-500 max-w-2xl mx-auto">
        Things I read, watch, and use to keep learning and improving as a developer. I share them here in case they can help you too.
      </h6>
    </div>

    <div v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }" class="filter-toolbar mb-6 sm:mb-10 scroll-hidden">
      <div class="filter-pills" role="group" aria-label="Filter resources by category">
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

      <div class="filter-toolbar__side">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="searchText"
            placeholder="Search title, tag or author..."
            size="large"
            aria-label="Search resources"
          />
        </IconField>

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
    </div>

    <!-- Content -->
    <div v-if="loading">
      <!-- Skeleton loading -->
      <div v-if="viewMode === 'card'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        <ResourceSkeleton v-for="n in 6" :key="n" mode="card" />
      </div>
      <div v-else class="flex flex-col gap-5 sm:gap-8">
        <ResourceSkeleton v-for="n in 4" :key="n" mode="magazine" />
      </div>
    </div>

    <div v-else-if="filteredResources.length">
      <!-- Card mode -->
      <div v-if="viewMode === 'card'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 resource-grid-fade">
        <div
          v-for="(resource, index) in visibleResources"
          :key="resource.id"
          class="resource-item-fade"
          :style="{ animationDelay: `${Math.min((index + 1) * 80, 500)}ms` }"
        >
          <ResourceCard :resource="resource" :category="categoryMeta(resource.category)" />
        </div>
      </div>

      <!-- Magazine mode -->
      <div v-else class="flex flex-col gap-5 sm:gap-8 resource-grid-fade">
        <div
          v-for="(resource, index) in visibleResources"
          :key="resource.id"
          class="resource-item-fade"
          :style="{ animationDelay: `${Math.min((index + 1) * 100, 600)}ms` }"
        >
          <ResourceMagazine
            :resource="resource"
            :category="categoryMeta(resource.category)"
            :reverse="index % 2 === 1"
            :index="index + 1"
          />
        </div>
      </div>

      <!-- Load more button -->
      <div v-if="hasMore" class="flex justify-center mt-12">
        <button type="button" class="load-more-btn" @click="loadMore">
          Load More
          <i class="pi pi-arrow-down" />
        </button>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-14 sm:py-20">
      <i class="pi pi-inbox block mb-4" style="font-size: 2.5rem; color: #9c9ca4" />
      <p class="text-default-500">No resources found. Try a different category or search term.</p>
    </div>
  </section>
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

/* Small-screen polish */
@media (max-width: 639px) {
  .load-more-btn {
    width: 100%;
    justify-content: center;
  }
}

/* ---------- Resource grid fade-in ---------- */
.resource-grid-fade {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.resource-item-fade {
  opacity: 0;
  animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ---------- Load More button ---------- */
.load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #6366f1;
  background-color: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.2);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.load-more-btn:hover {
  background-color: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.2);
}

.load-more-btn:active {
  transform: translateY(0);
}

.load-more-btn .pi {
  font-size: 0.85rem;
  transition: transform 0.3s ease;
}

.load-more-btn:hover .pi {
  transform: translateY(3px);
}

.my-app-dark .load-more-btn {
  color: #a5b4fc;
  background-color: rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.2);
}

.my-app-dark .load-more-btn:hover {
  background-color: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.35);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.25);
}

</style>
