<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import type { Article, ArticleCategory } from '../models/article';

const props = defineProps<{ article: Article; category: ArticleCategory }>();

const coverStyle = computed(() => ({
  background: `radial-gradient(circle at 30% 20%, ${props.category.color}33, transparent 60%), linear-gradient(135deg, ${props.category.color}1f, ${props.category.color}08)`,
}));

const badgeStyle = computed(() => ({
  color: props.category.color,
  backgroundColor: props.category.color + '1A',
  border: `1px solid ${props.category.color}40`,
}));

const MAX_TAGS = 3;
const visibleTags = computed(() => props.article.tags.slice(0, MAX_TAGS));
const extraTagCount = computed(() => Math.max(props.article.tags.length - MAX_TAGS, 0));
</script>

<template>
  <RouterLink
    :to="`/articles/${article.slug}`"
    class="article-card group"
    :aria-label="`Read: ${article.title}`"
  >
    <div class="article-cover" :style="coverStyle">
      <img
        v-if="article.image"
        :src="article.image"
        :alt="article.title"
        class="article-img"
        loading="lazy"
      />
      <i v-else :class="`pi ${category.icon}`" class="article-cover-icon" :style="{ color: category.color }" />

      <span class="article-badge" :style="badgeStyle">
        <i :class="`pi ${category.icon}`" style="font-size: 0.7rem" />
        {{ article.category }}
      </span>

      <span v-if="article.featured" class="article-featured" title="Featured">
        <i class="pi pi-star-fill" />
      </span>
    </div>

    <div class="article-body">
      <h3 class="article-title">{{ article.title }}</h3>
      <p class="article-summary">{{ article.summary }}</p>

      <div class="article-tags">
        <span v-for="tag in visibleTags" :key="tag" class="article-tag">{{ tag }}</span>
        <span v-if="extraTagCount" class="article-tag article-tag--more">+{{ extraTagCount }}</span>
      </div>

      <div class="article-footer">
        <span class="article-meta">{{ article.date }} · {{ article.readTime }}</span>
        <span class="article-more">
          Read <i class="pi pi-arrow-right" />
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.article-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 24px rgba(99, 102, 241, 0.2), 0 12px 32px rgba(0, 0, 0, 0.08);
  border-color: rgba(99, 102, 241, 0.25);
}

.my-app-dark .article-card {
  background-color: rgba(24, 24, 27, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}

.my-app-dark .article-card:hover {
  box-shadow: 0 0 28px rgba(47, 0, 255, 0.3), 0 12px 32px rgba(0, 0, 0, 0.3);
  border-color: rgba(99, 102, 241, 0.3);
}

.article-cover {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.article-cover-icon {
  font-size: 3.25rem;
  opacity: 0.5;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.article-card:hover .article-cover-icon {
  transform: scale(1.12) rotate(-4deg);
}

.article-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.article-card:hover .article-img {
  transform: scale(1.06);
}

.article-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.7rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.article-featured {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  /* Solid backing keeps the gold legible over the light accent cover. */
  color: #a96500;
  background-color: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(243, 187, 89, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.my-app-dark .article-featured {
  color: #f3bb59;
  background-color: rgba(243, 187, 89, 0.15);
  border-color: rgba(243, 187, 89, 0.35);
}

.article-body {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.25rem;
  flex: 1;
}

.article-title {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.35;
  transition: color 0.3s ease;
}

.article-card:hover .article-title {
  color: #6366f1;
}

.my-app-dark .article-card:hover .article-title {
  color: #a5b4fc;
}

.article-summary {
  font-size: 0.82rem;
  line-height: 1.6;
  color: #6b7280;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.my-app-dark .article-summary {
  color: #9ca3af;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.15rem;
}

.article-tag {
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 500;
  line-height: 1.4;
  background-color: rgba(99, 102, 241, 0.08);
  color: #6366f1;
  border: 1px solid rgba(99, 102, 241, 0.15);
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}

.my-app-dark .article-tag {
  background-color: rgba(99, 102, 241, 0.12);
  color: #a5b4fc;
  border-color: rgba(99, 102, 241, 0.2);
}

.article-tag--more {
  border-style: dashed;
}

.article-card:hover .article-tag:not(.article-tag--more) {
  color: v-bind('category.color');
  background-color: v-bind('category.color + "14"');
  border-color: v-bind('category.color + "40"');
}

.article-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.my-app-dark .article-footer {
  border-top-color: rgba(255, 255, 255, 0.08);
}

.article-meta {
  font-size: 0.72rem;
  color: #9c9ca4;
}

.article-more {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #6366f1;
  white-space: nowrap;
}

.article-more .pi {
  font-size: 0.75rem;
  transition: transform 0.3s ease;
}

.article-card:hover .article-more .pi {
  transform: translateX(4px);
}

/* ---------- Small-screen polish ---------- */
@media (max-width: 639px) {
  .article-body {
    padding: 1rem;
    gap: 0.5rem;
  }

  .article-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .article-summary {
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .article-footer {
    flex-wrap: wrap;
    row-gap: 0.25rem;
  }
}
</style>
