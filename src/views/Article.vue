<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import ArticleCard from '../components/ArticleCard.vue';
import ArticleFeatured from '../components/ArticleFeatured.vue';
import FilterToolbar from '../components/FilterToolbar.vue';
import LoadMoreButton from '../components/LoadMoreButton.vue';
import { articles, articleCategories } from '../data/usePortfolio';
import type { ArticleCategory } from '../models/article';

const fallbackCategory: ArticleCategory = { name: 'Article', color: '#6d77ed', icon: 'pi-file-edit' };
const categoryMeta = (name: string): ArticleCategory =>
  articleCategories.find((c) => c.name === name) ?? fallbackCategory;

const activeCategory = ref('All');
const searchText = ref('');

const isFiltering = computed(
  () => activeCategory.value !== 'All' || searchText.value.trim().length > 0,
);

const filteredArticles = computed(() => {
  const byCategory =
    activeCategory.value === 'All'
      ? articles
      : articles.filter((article) => article.category === activeCategory.value);

  const query = searchText.value.trim().toLowerCase();
  if (!query) return byCategory;
  return byCategory.filter((article) =>
    [article.title, article.summary, article.category, ...article.tags]
      .join(' ')
      .toLowerCase()
      .includes(query),
  );
});

/**
 * The spotlight only appears on the unfiltered view. Once the visitor filters or
 * searches we drop it so the results — including featured posts — fill the grid.
 */
const spotlight = computed(() => (isFiltering.value ? null : (articles.find((a) => a.featured) ?? articles[0])));

const gridArticles = computed(() => {
  const active = spotlight.value;
  return active ? filteredArticles.value.filter((article) => article.id !== active.id) : filteredArticles.value;
});

const PAGE_SIZE = 6;

const visibleCount = ref(PAGE_SIZE);

const visibleArticles = computed(() => gridArticles.value.slice(0, visibleCount.value));

const hasMore = computed(() => visibleCount.value < gridArticles.value.length);

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
    <!-- Hero -->
    <div class="text-center mb-8 sm:mb-12 scroll-hidden animate-fade-in-up">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        Writing &amp; <span class="gradient-text">Articles</span>
      </h1>
      <h6 class="text-gray-500 max-w-2xl mx-auto">
        Notes on what I'm building and what I'm still figuring out — Angular, Vue, the backend I came to late, and the occasional detour into AI.
      </h6>

      <div class="article-stats">
        <span class="article-stat">
          <i class="pi pi-file-edit" />
          {{ articles.length }} articles
        </span>
        <span class="article-stat">
          <i class="pi pi-tags" />
          {{ articleCategories.length }} topics
        </span>
      </div>
    </div>

    <!-- Featured spotlight -->
    <div
      v-if="spotlight"
      v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }"
      class="spotlight-wrap scroll-hidden mb-8 sm:mb-12"
    >
      <ArticleFeatured :article="spotlight" :category="categoryMeta(spotlight.category)" />
    </div>

    <!-- Filter toolbar -->
    <div
      v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }"
      class="mb-6 sm:mb-10 scroll-hidden"
    >
      <FilterToolbar
        v-model="activeCategory"
        :categories="articleCategories"
        aria-label="Filter articles by topic"
      >
        <template #actions>
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText
              v-model="searchText"
              placeholder="Search title, topic or tag..."
              size="large"
              aria-label="Search articles"
            />
          </IconField>
        </template>
      </FilterToolbar>
    </div>

    <!-- Result count while filtering -->
    <p v-if="isFiltering" class="article-result-count">
      {{ gridArticles.length }} {{ gridArticles.length === 1 ? 'article' : 'articles' }} found
    </p>

    <!-- Grid -->
    <div
      v-if="gridArticles.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 resource-grid-fade"
    >
      <div
        v-for="(article, index) in visibleArticles"
        :key="article.id"
        class="resource-item-fade"
        :style="{ animationDelay: `${Math.min((index + 1) * 80, 500)}ms` }"
      >
        <ArticleCard :article="article" :category="categoryMeta(article.category)" />
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-14 sm:py-20">
      <i class="pi pi-inbox block mb-4" style="font-size: 2.5rem; color: #9c9ca4" />
      <p class="text-default-500">No articles found. Try a different topic or search term.</p>
    </div>

    <!-- Load more -->
    <div v-if="hasMore" class="flex justify-center mt-12">
      <LoadMoreButton @click="loadMore" />
    </div>
  </section>
</template>

<style scoped>
/* ---------- Hero stats ---------- */
.article-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  margin-top: 1.25rem;
}

.article-stat {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #52525b;
  background-color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.article-stat .pi {
  font-size: 0.75rem;
  color: #6d77ed;
}

.my-app-dark .article-stat {
  color: #a1a1aa;
  background-color: rgba(24, 24, 27, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}

/* ---------- Result count ---------- */
.article-result-count {
  margin: -0.5rem 0 1.25rem;
  font-size: 0.85rem;
  color: #9c9ca4;
}

@media (min-width: 640px) {
  .article-result-count {
    margin-bottom: 1.75rem;
  }
}

/* ---------- Grid fade-in ---------- */
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

@media (prefers-reduced-motion: reduce) {
  .resource-grid-fade,
  .resource-item-fade {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    opacity: 1;
  }
}
</style>
