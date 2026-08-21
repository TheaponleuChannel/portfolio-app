<script setup lang="ts">
import type { Project } from '../models/project';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ViewProject from './ViewProject.vue';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

const props = defineProps<{ project: Project }>();
const toast = useToast();
const showDetail = ref(false);

const openDemo = () => {
  if (props.project.liveUrl) {
    window.open(props.project.liveUrl, '_blank', 'noopener,noreferrer');
  } else {
    toast.add({
      severity: 'info',
      summary: 'Info Message',
      detail: 'This feature is under development',
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="project-card group">
    <div class="project-image-wrapper">
      <img
        :src="project.image"
        :alt="project.title"
        class="project-image"
        loading="lazy"
      />
      <div class="project-overlay">
        <div class="flex gap-3">
          <RouterLink v-if="project.githubUrl" :to="project.githubUrl" target="_blank">
            <Button
              icon="pi pi-github"
              rounded
              severity="secondary"
              aria-label="GitHub"
            />
          </RouterLink>
          <Button
            icon="pi pi-external-link"
            rounded
            severity="secondary"
            aria-label="Demo"
            @click="openDemo"
          />
        </div>
      </div>
      <span class="category-badge" :class="`badge-${project.categoryColor}`">
        {{ project.category }}
      </span>
    </div>

    <div class="project-content">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-desc">
        {{ project.description || project.longDescription }}
      </p>

      <!-- Tech tags -->
      <div class="tech-tags" v-if="project.technologies?.length">
        <span
          v-for="tech in project.technologies"
          :key="tech"
          class="tech-tag"
        >
          {{ tech }}
        </span>
      </div>

      <div class="project-actions">
        <Button
          label="View Details"
          severity="primary"
          variant="text"
          icon="pi pi-arrow-right"
          icon-pos="right"
          class="flex-1"
          @click="showDetail = true"
        />
        <Toast />
        <Button
          label="Live Demo"
          severity="secondary"
          raised
          icon="pi pi-window-maximize"
          icon-pos="left"
          class="flex-1"
          @click="openDemo"
        />
      </div>
    </div>
  </div>

  <ViewProject
    v-model:visible="showDetail"
    :project="project"
  />
</template>

<style scoped>
.project-card {
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

.project-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 0 24px rgba(99, 102, 241, 0.2),
    0 12px 32px rgba(0, 0, 0, 0.08);
  border-color: rgba(99, 102, 241, 0.25);
}

.my-app-dark .project-card {
  background-color: rgba(24, 24, 27, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}

.my-app-dark .project-card:hover {
  box-shadow:
    0 0 28px rgba(47, 0, 255, 0.3),
    0 12px 32px rgba(0, 0, 0, 0.3);
  border-color: rgba(99, 102, 241, 0.3);
}

.project-image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card:hover .project-image {
  transform: scale(1.06);
}

.project-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
  opacity: 0;
  transition: opacity 0.35s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.category-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.badge-primary {
  background-color: rgba(54, 101, 234, 0.15);
  color: #3665ea;
  border: 1px solid rgba(54, 101, 234, 0.25);
}

.badge-success {
  background-color: rgba(14, 201, 104, 0.15);
  color: #0ec968;
  border: 1px solid rgba(14, 201, 104, 0.25);
}

.badge-help {
  background-color: rgba(152, 75, 208, 0.15);
  color: #984bd0;
  border: 1px solid rgba(152, 75, 208, 0.25);
}

.badge-warn {
  background-color: rgba(243, 187, 89, 0.15);
  color: #d4930a;
  border: 1px solid rgba(243, 187, 89, 0.25);
}

.project-content {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1.25rem;
  flex: 1;
}

.project-title {
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.3;
}

.project-desc {
  font-size: 0.8rem;
  line-height: 1.6;
  color: #6b7280;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.my-app-dark .project-desc {
  color: #9ca3af;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.tech-tag {
  padding: 0.25rem 0.625rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: rgba(99, 102, 241, 0.08);
  color: #6366f1;
  border: 1px solid rgba(99, 102, 241, 0.15);
  transition: all 0.2s ease;
}

.tech-tag:hover {
  background-color: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
}

.my-app-dark .tech-tag {
  background-color: rgba(99, 102, 241, 0.12);
  color: #a5b4fc;
  border-color: rgba(99, 102, 241, 0.2);
}

.project-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
