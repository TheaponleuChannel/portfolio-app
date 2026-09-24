<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import ProseBlocks from '../components/ProseBlocks.vue';
import { articles, articleCategories } from '../data/usePortfolio';
import type { ArticleCategory } from '../models/article';

const props = defineProps<{ slug: string }>();

const article = computed(() => articles.find((a) => a.slug === props.slug));

const fallbackCategory: ArticleCategory = { name: 'Article', color: '#6d77ed', icon: 'pi-file-edit' };
const category = computed<ArticleCategory>(() =>
  articleCategories.find((c) => c.name === article.value?.category) ?? fallbackCategory,
);

const badgeStyle = computed(() => ({
  color: category.value.color,
  backgroundColor: category.value.color + '1A',
  border: `1px solid ${category.value.color}40`,
}));

const coverStyle = computed(() => ({
  background: `radial-gradient(circle at 25% 20%, ${category.value.color}40, transparent 62%), linear-gradient(135deg, ${category.value.color}26, ${category.value.color}0a)`,
}));

/** Articles run newest-first, so the previous post is the next index up. */
const index = computed(() => articles.findIndex((a) => a.slug === props.slug));
const newerArticle = computed(() => (index.value > 0 ? articles[index.value - 1] : null));
const olderArticle = computed(() =>
  index.value >= 0 && index.value < articles.length - 1 ? articles[index.value + 1] : null,
);
</script>

<template>
  <section class="container mx-auto px-2.5 sm:px-0 py-10 sm:py-16">
    <!-- Unknown slug -->
    <div v-if="!article" class="not-found">
      <i class="pi pi-file-excel not-found__icon" />
      <h1 class="not-found__title">Article not found</h1>
      <p class="not-found__text">
        That link may be out of date, or the article may have been renamed.
      </p>
      <RouterLink to="/articles" class="not-found__link">
        <i class="pi pi-arrow-left" /> Back to all articles
      </RouterLink>
    </div>

    <template v-else>
      <RouterLink to="/articles" class="back-link">
        <i class="pi pi-arrow-left" />
        All articles
      </RouterLink>

      <article class="reader">
        <!-- Header -->
        <header
          v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }"
          class="reader-header scroll-hidden"
        >
          <span class="reader-badge" :style="badgeStyle">
            <i :class="`pi ${category.icon}`" style="font-size: 0.72rem" />
            {{ article.category }}
          </span>

          <h1 class="reader-title">{{ article.title }}</h1>
          <p class="reader-lead">{{ article.summary }}</p>

          <div class="reader-meta">
            <span class="reader-meta__item">
              <i class="pi pi-calendar" /> {{ article.date }}
            </span>
            <span class="reader-meta__dot" aria-hidden="true">·</span>
            <span class="reader-meta__item">
              <i class="pi pi-clock" /> {{ article.readTime }}
            </span>
          </div>
        </header>

        <!-- Cover -->
        <div class="reader-cover" :style="coverStyle">
          <img
            v-if="article.image"
            :src="article.image"
            :alt="article.title"
            class="reader-cover__img"
          />
          <i
            v-else
            :class="`pi ${category.icon}`"
            class="reader-cover__icon"
            :style="{ color: category.color }"
            aria-hidden="true"
          />
        </div>

        <!-- Body -->
        <div class="reader-body">
          <ProseBlocks :blocks="article.body" />
        </div>

        <!-- Tags -->
        <div v-if="article.tags.length" class="reader-tags">
          <span class="reader-tags__label">Tagged</span>
          <span v-for="tag in article.tags" :key="tag" class="reader-tag">{{ tag }}</span>
        </div>

        <!-- Older / newer -->
        <nav class="reader-nav" aria-label="More articles">
          <RouterLink
            v-if="newerArticle"
            :to="`/articles/${newerArticle.slug}`"
            class="reader-nav__link reader-nav__link--prev"
          >
            <span class="reader-nav__label"><i class="pi pi-arrow-left" /> Newer</span>
            <span class="reader-nav__title">{{ newerArticle.title }}</span>
          </RouterLink>
          <span v-else class="reader-nav__spacer" />

          <RouterLink
            v-if="olderArticle"
            :to="`/articles/${olderArticle.slug}`"
            class="reader-nav__link reader-nav__link--next"
          >
            <span class="reader-nav__label">Older <i class="pi pi-arrow-right" /></span>
            <span class="reader-nav__title">{{ olderArticle.title }}</span>
          </RouterLink>
        </nav>
      </article>
    </template>
  </section>
</template>

<style scoped>
/* ==========================================================================
   Back link
   ========================================================================== */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.75rem;
  padding: 0.45rem 0.95rem;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #52525b;
  background-color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: color 0.25s ease, border-color 0.25s ease,
    transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
}

.back-link:hover {
  color: #6d77ed;
  border-color: rgba(109, 119, 237, 0.45);
  transform: translateX(-3px);
  box-shadow: 0 4px 14px rgba(109, 119, 237, 0.16);
}

.back-link .pi {
  font-size: 0.75rem;
}

.my-app-dark .back-link {
  color: #a1a1aa;
  background-color: rgba(24, 24, 27, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}

.my-app-dark .back-link:hover {
  color: #a5b4fc;
  border-color: rgba(109, 119, 237, 0.5);
}

/* ==========================================================================
   Reader shell — caps the measure so long lines stay readable
   ========================================================================== */
.reader {
  max-width: 46rem;
  margin: 0 auto;
}

.reader-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.85rem;
}

.reader-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.7rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.reader-title {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: #18181b;
  margin: 0;
}

.my-app-dark .reader-title {
  color: #f4f4f5;
}

.reader-lead {
  font-size: 1.02rem;
  line-height: 1.7;
  color: #52525b;
  margin: 0;
}

.my-app-dark .reader-lead {
  color: #a1a1aa;
}

.reader-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.15rem;
  font-size: 0.78rem;
  color: #9c9ca4;
}

.reader-meta__item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.reader-meta__item .pi {
  font-size: 0.72rem;
}

/* ==========================================================================
   Cover
   ========================================================================== */
.reader-cover {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 2rem 0;
  border-radius: 1.25rem;
  aspect-ratio: 21 / 9;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.my-app-dark .reader-cover {
  border-color: rgba(255, 255, 255, 0.07);
}

.reader-cover__icon {
  font-size: 4.5rem;
  opacity: 0.5;
}

.reader-cover__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ==========================================================================
   Body
   ========================================================================== */
.reader-body {
  margin-bottom: 2.25rem;
}

/* ==========================================================================
   Tags
   ========================================================================== */
.reader-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
}

.my-app-dark .reader-tags {
  border-top-color: rgba(255, 255, 255, 0.08);
}

.reader-tags__label {
  margin-right: 0.25rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9c9ca4;
}

.reader-tag {
  padding: 0.25rem 0.7rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 500;
  background-color: rgba(99, 102, 241, 0.08);
  color: #6366f1;
  border: 1px solid rgba(99, 102, 241, 0.15);
}

.my-app-dark .reader-tag {
  background-color: rgba(99, 102, 241, 0.12);
  color: #a5b4fc;
  border-color: rgba(99, 102, 241, 0.2);
}

/* ==========================================================================
   Older / newer navigation
   ========================================================================== */
.reader-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 2.5rem;
}

.reader-nav__link {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 1.15rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.reader-nav__link--next {
  align-items: flex-end;
  text-align: right;
}

.reader-nav__link:hover {
  transform: translateY(-3px);
  border-color: rgba(99, 102, 241, 0.25);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.16), 0 8px 24px rgba(0, 0, 0, 0.07);
}

.my-app-dark .reader-nav__link {
  background-color: rgba(24, 24, 27, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}

.my-app-dark .reader-nav__link:hover {
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 0 24px rgba(47, 0, 255, 0.25), 0 8px 24px rgba(0, 0, 0, 0.3);
}

.reader-nav__label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #6d77ed;
}

.reader-nav__label .pi {
  font-size: 0.65rem;
}

.reader-nav__title {
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.45;
  color: #27272a;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.my-app-dark .reader-nav__title {
  color: #e4e4e7;
}

.reader-nav__link:hover .reader-nav__title {
  color: #6366f1;
}

.my-app-dark .reader-nav__link:hover .reader-nav__title {
  color: #a5b4fc;
}

/* Keeps the lone link on its correct side when there is no sibling */
.reader-nav__spacer {
  display: block;
}

/* ==========================================================================
   Not found
   ========================================================================== */
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 4rem 1rem;
  text-align: center;
}

.not-found__icon {
  font-size: 2.5rem;
  color: #9c9ca4;
}

.not-found__title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #18181b;
}

.my-app-dark .not-found__title {
  color: #f4f4f5;
}

.not-found__text {
  margin: 0;
  color: #71717a;
}

.not-found__link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.75rem;
  padding: 0.6rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  background-image: linear-gradient(135deg, #6d77ed, #974dd1);
  box-shadow: 0 6px 18px rgba(109, 119, 237, 0.35);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}

.not-found__link:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(109, 119, 237, 0.45);
}

/* ==========================================================================
   Small screens
   ========================================================================== */
@media (max-width: 639px) {
  .reader-title {
    font-size: 1.5rem;
  }

  .reader-lead {
    font-size: 0.94rem;
  }

  .reader-cover {
    aspect-ratio: 16 / 9;
    margin: 1.5rem 0;
    border-radius: 1rem;
  }

  .reader-cover__icon {
    font-size: 3rem;
  }

  .reader-nav {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }

  .reader-nav__link--next {
    align-items: flex-start;
    text-align: left;
  }

  .reader-nav__spacer {
    display: none;
  }
}
</style>
