<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import SelectButton from 'primevue/selectbutton';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import ResourceCard from '../components/ResourceCard.vue';
import ResourceMagazine from '../components/ResourceMagazine.vue';
import ResourceSkeleton from '../components/ResourceSkeleton.vue';
import FilterToolbar from '../components/FilterToolbar.vue';
import LoadMoreButton from '../components/LoadMoreButton.vue';
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

const searchText = ref('');

const fallbackCategory: ResourceCategory = { name: 'Resource', color: '#6366f1', icon: 'pi-bookmark' };
const categoryMeta = (name: string): ResourceCategory =>
  resourceCategories.find((c) => c.name === name) ?? fallbackCategory;

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

    <div v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }" class="mb-6 sm:mb-10 scroll-hidden">
      <FilterToolbar
        v-model="activeCategory"
        :categories="resourceCategories"
        aria-label="Filter resources by category"
      >
        <template #actions>
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
        </template>
      </FilterToolbar>
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
        <LoadMoreButton @click="loadMore" />
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

</style>
