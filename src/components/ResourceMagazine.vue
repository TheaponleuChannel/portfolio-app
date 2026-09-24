<script setup lang="ts">
import { computed } from 'vue';
import type { Resource, ResourceCategory } from '../models/resource';

const props = defineProps<{
  resource: Resource;
  category: ResourceCategory;
  reverse?: boolean;
  index: number;
}>();

const coverStyle = computed(() => ({
  background: `radial-gradient(circle at 30% 25%, ${props.category.color}40, transparent 62%), linear-gradient(135deg, ${props.category.color}24, ${props.category.color}0a)`,
}));

const badgeStyle = computed(() => ({
  color: props.category.color,
  backgroundColor: props.category.color + '1A',
  border: `1px solid ${props.category.color}40`,
}));

const indexLabel = computed(() => String(props.index).padStart(2, '0'));

const MAX_TAGS = 3;
const visibleTags = computed(() => props.resource.tags?.slice(0, MAX_TAGS) ?? []);
const extraTagCount = computed(() => Math.max((props.resource.tags?.length ?? 0) - MAX_TAGS, 0));
</script>

<template>
  <a
    :href="resource.link"
    target="_blank"
    rel="noopener noreferrer"
    class="mag group"
    :class="{ 'mag--reverse': reverse }"
    :aria-label="resource.title"
  >
    <div class="mag-cover" :style="coverStyle">
      <img
        v-if="resource.image"
        :src="resource.image"
        :alt="resource.title"
        class="mag-img"
        loading="lazy"
      />
      <i v-else :class="`pi ${category.icon}`" class="mag-cover-icon" :style="{ color: category.color }" />
      <span class="mag-index">{{ indexLabel }}</span>
      <span v-if="resource.featured" class="mag-featured">
        <i class="pi pi-star-fill" /> Featured
      </span>
    </div>

    <div class="mag-body">
      <div class="mag-meta-top">
        <span class="mag-badge" :style="badgeStyle">
          <i :class="`pi ${category.icon}`" style="font-size: 0.72rem" />
          {{ resource.category }}
        </span>
        <span v-if="resource.date" class="mag-date">{{ resource.date }}</span>
      </div>

      <h3 class="mag-title">{{ resource.title }}</h3>
      <p class="mag-desc">{{ resource.description }}</p>

      <div v-if="resource.tags?.length" class="mag-tags">
        <span v-for="tag in visibleTags" :key="tag" class="mag-tag">{{ tag }}</span>
        <span v-if="extraTagCount" class="mag-tag mag-tag--more">+{{ extraTagCount }}</span>
      </div>

      <div class="mag-footer">
        <span class="mag-author">
          <template v-if="resource.author">{{ resource.author }}</template>
          <template v-if="resource.author && resource.readTime"> · </template>
          <template v-if="resource.readTime">{{ resource.readTime }}</template>
        </span>
        <span class="mag-more">Read more <i class="pi pi-arrow-right" /></span>
      </div>
    </div>
  </a>
</template>

<style scoped>
.mag {
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.mag:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 24px rgba(99, 102, 241, 0.2), 0 12px 32px rgba(0, 0, 0, 0.08);
  border-color: rgba(99, 102, 241, 0.25);
}

.my-app-dark .mag {
  background-color: rgba(24, 24, 27, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}

.my-app-dark .mag:hover {
  box-shadow: 0 0 28px rgba(47, 0, 255, 0.3), 0 12px 32px rgba(0, 0, 0, 0.3);
  border-color: rgba(99, 102, 241, 0.3);
}

@media (min-width: 768px) {
  .mag {
    flex-direction: row;
  }
  .mag--reverse {
    flex-direction: row-reverse;
  }
}

.mag-cover {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 200px;
}

@media (min-width: 768px) {
  .mag-cover {
    flex: 0 0 40%;
    min-height: 260px;
  }
}

.mag-cover-icon {
  font-size: 4.5rem;
  opacity: 0.5;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.mag:hover .mag-cover-icon {
  transform: scale(1.12) rotate(-4deg);
}

.mag-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.mag:hover .mag-img {
  transform: scale(1.05);
}

.mag-index {
  position: absolute;
  top: 0.9rem;
  left: 1.1rem;
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1;
  color: rgba(255, 255, 255, 0.55);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

.my-app-dark .mag-index {
  color: rgba(255, 255, 255, 0.28);
}

.mag-featured {
  position: absolute;
  bottom: 0.9rem;
  left: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.68rem;
  font-weight: 600;
  color: #f3bb59;
  background-color: rgba(243, 187, 89, 0.15);
  border: 1px solid rgba(243, 187, 89, 0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.mag-body {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1.75rem;
  flex: 1;
}

@media (min-width: 768px) {
  .mag-body {
    justify-content: center;
    padding: 2.25rem;
  }
}

.mag-meta-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.mag-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.7rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.mag-date {
  font-size: 0.72rem;
  color: #9c9ca4;
}

.mag-title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  transition: color 0.3s ease;
}

.mag:hover .mag-title {
  color: #6366f1;
}

.my-app-dark .mag:hover .mag-title {
  color: #a5b4fc;
}

.mag-desc {
  font-size: 0.92rem;
  line-height: 1.65;
  color: #6b7280;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.my-app-dark .mag-desc {
  color: #9ca3af;
}

.mag-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.mag-tag {
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

.my-app-dark .mag-tag {
  background-color: rgba(99, 102, 241, 0.12);
  color: #a5b4fc;
  border-color: rgba(99, 102, 241, 0.2);
}

.mag-tag--more {
  border-style: dashed;
}

.mag:hover .mag-tag:not(.mag-tag--more) {
  color: v-bind('category.color');
  background-color: v-bind('category.color + "14"');
  border-color: v-bind('category.color + "40"');
}

.mag-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.35rem;
}

.mag-author {
  font-size: 0.78rem;
  color: #9c9ca4;
}

.mag-more {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #6366f1;
  white-space: nowrap;
}

.mag-more .pi {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.mag:hover .mag-more .pi {
  transform: translateX(5px);
}

/* ---------- Small-screen polish ---------- */
@media (max-width: 639px) {
  .mag-body {
    padding: 1.15rem 1rem;
    gap: 0.55rem;
  }

  .mag-title {
    font-size: 1.15rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .mag-desc {
    font-size: 0.85rem;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .mag-cover {
    min-height: 150px;
  }

  .mag-index {
    font-size: 1.9rem;
  }

  .mag-meta-top,
  .mag-footer {
    flex-wrap: wrap;
    row-gap: 0.3rem;
  }

  .mag-footer {
    margin-top: 0.15rem;
    padding-top: 0.6rem;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }

  .my-app-dark .mag-footer {
    border-top-color: rgba(255, 255, 255, 0.06);
  }
}
</style>
