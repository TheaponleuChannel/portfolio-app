<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import type { Article, ArticleCategory } from '../models/article';

const props = defineProps<{ article: Article; category: ArticleCategory }>();

const coverStyle = computed(() => ({
  background: `radial-gradient(circle at 30% 25%, ${props.category.color}4d, transparent 62%), linear-gradient(135deg, ${props.category.color}2e, ${props.category.color}0a)`,
}));

const badgeStyle = computed(() => ({
  color: props.category.color,
  backgroundColor: props.category.color + '1A',
  border: `1px solid ${props.category.color}40`,
}));
</script>

<template>
  <RouterLink
    :to="`/articles/${article.slug}`"
    class="spotlight group"
    :aria-label="`Read: ${article.title}`"
  >
    <div class="spotlight-cover" :style="coverStyle">
      <img
        v-if="article.image"
        :src="article.image"
        :alt="article.title"
        class="spotlight-img"
        loading="lazy"
      />
      <i
        v-else
        :class="`pi ${category.icon}`"
        class="spotlight-cover-icon"
        :style="{ color: category.color }"
        aria-hidden="true"
      />

      <span class="spotlight-flag">
        <i class="pi pi-star-fill" /> Featured
      </span>
    </div>

    <div class="spotlight-body">
      <span class="spotlight-badge" :style="badgeStyle">
        <i :class="`pi ${category.icon}`" style="font-size: 0.72rem" />
        {{ article.category }}
      </span>

      <h2 class="spotlight-title">{{ article.title }}</h2>
      <p class="spotlight-summary">{{ article.summary }}</p>

      <div class="spotlight-tags">
        <span v-for="tag in article.tags" :key="tag" class="spotlight-tag">{{ tag }}</span>
      </div>

      <div class="spotlight-footer">
        <span class="spotlight-meta">
          <i class="pi pi-calendar" /> {{ article.date }}
          <span class="spotlight-dot" aria-hidden="true">·</span>
          <i class="pi pi-clock" /> {{ article.readTime }}
        </span>
        <span class="spotlight-cta">
          Read article <i class="pi pi-arrow-right" />
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.spotlight {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1.25rem;
  background-color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.spotlight:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 28px rgba(99, 102, 241, 0.22), 0 16px 40px rgba(0, 0, 0, 0.09);
  border-color: rgba(99, 102, 241, 0.25);
}

.my-app-dark .spotlight {
  background-color: rgba(24, 24, 27, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}

.my-app-dark .spotlight:hover {
  box-shadow: 0 0 32px rgba(47, 0, 255, 0.3), 0 16px 40px rgba(0, 0, 0, 0.35);
  border-color: rgba(99, 102, 241, 0.3);
}

/* ---------- Cover ---------- */
.spotlight-cover {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 200px;
}

.spotlight-cover-icon {
  font-size: 5rem;
  opacity: 0.5;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.spotlight:hover .spotlight-cover-icon {
  transform: scale(1.1) rotate(-4deg);
}

.spotlight-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.spotlight:hover .spotlight-img {
  transform: scale(1.05);
}

.spotlight-flag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  /* Solid backing keeps the gold legible over the light accent cover. */
  color: #a96500;
  background-color: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(243, 187, 89, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.my-app-dark .spotlight-flag {
  color: #f3bb59;
  background-color: rgba(243, 187, 89, 0.15);
  border-color: rgba(243, 187, 89, 0.35);
}

/* ---------- Body ---------- */
.spotlight-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1.5rem;
  flex: 1;
}

.spotlight-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.7rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.spotlight-title {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.25;
  transition: color 0.3s ease;
}

.spotlight:hover .spotlight-title {
  color: #6366f1;
}

.my-app-dark .spotlight:hover .spotlight-title {
  color: #a5b4fc;
}

.spotlight-summary {
  font-size: 0.92rem;
  line-height: 1.7;
  color: #6b7280;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.my-app-dark .spotlight-summary {
  color: #9ca3af;
}

.spotlight-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.spotlight-tag {
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

.my-app-dark .spotlight-tag {
  background-color: rgba(99, 102, 241, 0.12);
  color: #a5b4fc;
  border-color: rgba(99, 102, 241, 0.2);
}

.spotlight:hover .spotlight-tag {
  color: v-bind('category.color');
  background-color: v-bind('category.color + "14"');
  border-color: v-bind('category.color + "40"');
}

.spotlight-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  width: 100%;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.my-app-dark .spotlight-footer {
  border-top-color: rgba(255, 255, 255, 0.08);
}

.spotlight-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: #9c9ca4;
}

.spotlight-meta .pi {
  font-size: 0.72rem;
}

.spotlight-dot {
  margin: 0 0.15rem;
}

.spotlight-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.1rem;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #fff;
  background-image: linear-gradient(135deg, #6d77ed, #974dd1);
  box-shadow: 0 6px 18px rgba(109, 119, 237, 0.35);
  transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.spotlight:hover .spotlight-cta {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(109, 119, 237, 0.45);
}

.spotlight-cta .pi {
  font-size: 0.75rem;
  transition: transform 0.3s ease;
}

.spotlight:hover .spotlight-cta .pi {
  transform: translateX(4px);
}

/* ---------- Desktop: side-by-side ---------- */
@media (min-width: 1024px) {
  .spotlight {
    flex-direction: row;
  }

  .spotlight-cover {
    flex: 0 0 42%;
    min-height: 340px;
  }

  .spotlight-body {
    justify-content: center;
    padding: 2.25rem 2.5rem;
    gap: 0.9rem;
  }

  .spotlight-title {
    font-size: 1.95rem;
  }
}

/* ---------- Small-screen polish ---------- */
@media (max-width: 639px) {
  .spotlight-cover {
    min-height: 150px;
  }

  .spotlight-cover-icon {
    font-size: 3.5rem;
  }

  .spotlight-body {
    padding: 1.15rem 1rem;
    gap: 0.6rem;
  }

  .spotlight-title {
    font-size: 1.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .spotlight-summary {
    font-size: 0.85rem;
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }

  .spotlight-cta {
    width: 100%;
    justify-content: center;
  }
}
</style>
