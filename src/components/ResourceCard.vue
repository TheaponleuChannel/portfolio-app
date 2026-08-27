<script setup lang="ts">
import { computed } from 'vue';
import type { Resource, ResourceCategory } from '../models/resource';

const props = defineProps<{ resource: Resource; category: ResourceCategory }>();

const coverStyle = computed(() => ({
  background: `radial-gradient(circle at 30% 20%, ${props.category.color}33, transparent 60%), linear-gradient(135deg, ${props.category.color}1f, ${props.category.color}08)`,
}));

const badgeStyle = computed(() => ({
  color: props.category.color,
  backgroundColor: props.category.color + '1A',
  border: `1px solid ${props.category.color}40`,
}));
</script>

<template>
  <a
    :href="resource.link"
    target="_blank"
    rel="noopener noreferrer"
    class="resource-card group"
    :aria-label="resource.title"
  >
    <div class="resource-cover" :style="coverStyle">
      <img
        v-if="resource.image"
        :src="resource.image"
        :alt="resource.title"
        class="resource-img"
        loading="lazy"
      />
      <i v-else :class="`pi ${category.icon}`" class="resource-cover-icon" :style="{ color: category.color }" />

      <span class="resource-badge" :style="badgeStyle">
        <i :class="`pi ${category.icon}`" style="font-size: 0.7rem" />
        {{ resource.category }}
      </span>

      <span v-if="resource.featured" class="resource-featured" title="Featured">
        <i class="pi pi-star-fill" />
      </span>
    </div>

    <div class="resource-body">
      <h3 class="resource-title">{{ resource.title }}</h3>
      <p class="resource-desc">{{ resource.description }}</p>

      <div v-if="resource.tags?.length" class="resource-tags">
        <span v-for="tag in resource.tags" :key="tag" class="resource-tag">{{ tag }}</span>
      </div>

      <div class="resource-footer">
        <span class="resource-meta">
          <template v-if="resource.author">{{ resource.author }}</template>
          <template v-if="resource.author && resource.readTime"> · </template>
          <template v-if="resource.readTime">{{ resource.readTime }}</template>
        </span>
        <span class="resource-more">
          Read <i class="pi pi-arrow-right" />
        </span>
      </div>
    </div>
  </a>
</template>

<style scoped>
.resource-card {
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

.resource-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 24px rgba(99, 102, 241, 0.2), 0 12px 32px rgba(0, 0, 0, 0.08);
  border-color: rgba(99, 102, 241, 0.25);
}

.my-app-dark .resource-card {
  background-color: rgba(24, 24, 27, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}

.my-app-dark .resource-card:hover {
  box-shadow: 0 0 28px rgba(47, 0, 255, 0.3), 0 12px 32px rgba(0, 0, 0, 0.3);
  border-color: rgba(99, 102, 241, 0.3);
}

.resource-cover {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.resource-cover-icon {
  font-size: 3.25rem;
  opacity: 0.5;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.resource-card:hover .resource-cover-icon {
  transform: scale(1.12) rotate(-4deg);
}

.resource-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.resource-card:hover .resource-img {
  transform: scale(1.06);
}

.resource-badge {
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

.resource-featured {
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
  color: #f3bb59;
  background-color: rgba(243, 187, 89, 0.15);
  border: 1px solid rgba(243, 187, 89, 0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.resource-body {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.25rem;
  flex: 1;
}

.resource-title {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.35;
  transition: color 0.3s ease;
}

.resource-card:hover .resource-title {
  color: #6366f1;
}

.my-app-dark .resource-card:hover .resource-title {
  color: #a5b4fc;
}

.resource-desc {
  font-size: 0.82rem;
  line-height: 1.6;
  color: #6b7280;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.my-app-dark .resource-desc {
  color: #9ca3af;
}

.resource-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.15rem;
}

.resource-tag {
  padding: 0.2rem 0.55rem;
  border-radius: 0.375rem;
  font-size: 0.7rem;
  font-weight: 500;
  background-color: rgba(99, 102, 241, 0.08);
  color: #6366f1;
  border: 1px solid rgba(99, 102, 241, 0.15);
}

.my-app-dark .resource-tag {
  background-color: rgba(99, 102, 241, 0.12);
  color: #a5b4fc;
  border-color: rgba(99, 102, 241, 0.2);
}

.resource-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

.resource-meta {
  font-size: 0.72rem;
  color: #9c9ca4;
}

.resource-more {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #6366f1;
  white-space: nowrap;
}

.resource-more .pi {
  font-size: 0.75rem;
  transition: transform 0.3s ease;
}

.resource-card:hover .resource-more .pi {
  transform: translateX(4px);
}
</style>
