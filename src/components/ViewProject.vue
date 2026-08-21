<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { ref, computed, watch } from 'vue';
import type { Project } from '../models/project';

const props = defineProps<{
  visible: boolean;
  project: Project | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
}>();

const close = () => {
  emit('update:visible', false);
};

const openDemo = () => {
  if (props.project?.liveUrl) {
    window.open(props.project.liveUrl, '_blank', 'noopener,noreferrer');
  }
};

const openGithub = () => {
  if (props.project?.githubUrl) {
    window.open(props.project.githubUrl, '_blank', 'noopener,noreferrer');
  }
};

/* ── Tech icon map ──────────────────────────────────────── */
const techIconMap: Record<string, string> = {
  vue: '/icons/vue.png',
  'vue.js': '/icons/vue.png',
  react: '/icons/react.png',
  angular: '/icons/angular.png',
  javascript: '/icons/javaScript.png',
  typescript: '/icons/typescript.png',
  'html/css': '/icons/html-css.png',
  html: '/icons/html.png',
  css: '/icons/html.png',
  'node.js': '/icons/nodejs.png',
  nodejs: '/icons/nodejs.png',
  express: '/icons/express-js.png',
  mongodb: '/icons/mongodb.png',
  postgresql: '/icons/postgre.png',
  graphql: '/icons/graphql.png',
  docker: '/icons/docker.png',
  primevue: '/icons/vue.png',
};

const getTechIcon = (tech: string): string | null => {
  return techIconMap[tech.toLowerCase()] || null;
};

/* ── Screenshot gallery ─────────────────────────────────── */
const activeIndex = ref(0);
const isTransitioning = ref(false);
const slideDirection = ref<'left' | 'right'>('right');

const screenshots = computed(() => props.project?.screenshots || []);

const hasScreenshots = computed(() => screenshots.value.length > 0);

const currentImage = computed(() =>
  screenshots.value[activeIndex.value] || ''
);

const goTo = (index: number) => {
  if (index === activeIndex.value || isTransitioning.value) return;
  slideDirection.value = index > activeIndex.value ? 'right' : 'left';
  isTransitioning.value = true;
  activeIndex.value = index;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 350);
};

const prev = () => {
  const next = activeIndex.value === 0 ? screenshots.value.length - 1 : activeIndex.value - 1;
  goTo(next);
};

const next = () => {
  const next = activeIndex.value === screenshots.value.length - 1 ? 0 : activeIndex.value + 1;
  goTo(next);
};

// Reset gallery on new project
watch(
  () => props.project?.id,
  () => {
    activeIndex.value = 0;
  }
);
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="emit('update:visible', $event)"
    modal
    :draggable="false"
    :resizable="false"
    position="center"
    class="view-project-dialog"
    :style="{ maxWidth: '1080px', width: '94vw' }"
    :pt="{
      mask: { class: 'vp-dialog-mask' },
    }"
  >
    <template #header>
      <div class="vp-dialog-top-bar" v-if="project">
        <span
          class="category-badge"
          :class="`badge-${project.categoryColor}`"
        >
          {{ project.category }}
        </span>
      </div>
    </template>

    <!-- ── Body ──────────────────────────────────────────── -->
    <div class="vp-body" v-if="project">

      <!-- ═══ HERO: two-column ═══ -->
      <div class="vp-hero">
        <!-- Left: info -->
        <div class="vp-hero-info">
          <h2 class="vp-title">{{ project.title }}</h2>
          <p class="vp-desc">{{ project.description }}</p>

          <!-- Tech tags with icons -->
          <div class="vp-section" v-if="project.technologies?.length">
            <h4 class="vp-label">Technologies Used</h4>
            <div class="vp-tech-list">
              <div
                v-for="tech in project.technologies"
                :key="tech"
                class="vp-tech-chip"
              >
                <img
                  v-if="getTechIcon(tech)"
                  :src="getTechIcon(tech)!"
                  :alt="tech"
                  class="vp-tech-chip-icon"
                />
                <i v-else class="pi pi-code vp-tech-chip-fallback"></i>
                <span>{{ tech }}</span>
              </div>
            </div>
          </div>

          <!-- Key features -->
          <div class="vp-section" v-if="project.features?.length">
            <h4 class="vp-label">Key Features</h4>
            <ul class="vp-features">
              <li v-for="feature in project.features" :key="feature" class="vp-feature-item">
                <i class="pi pi-check-circle vp-feature-icon"></i>
                {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Action buttons -->
          <div class="vp-hero-actions">
            <Button
              v-if="project.liveUrl"
              icon="pi pi-external-link"
              label="Live Demo"
              severity="success"
              @click="openDemo"
            />
            <Button
              v-if="project.githubUrl"
              icon="pi pi-github"
              label="Source Code"
              severity="secondary"
              outlined
              @click="openGithub"
            />
          </div>
        </div>

        <!-- Right: image -->
        <div class="vp-hero-image">
          <img
            :src="project.image"
            :alt="project.title"
            class="vp-hero-img"
          />
        </div>
      </div>

      <!-- ═══ TABVIEW ═══ -->
      <div class="vp-tabs-wrapper">
        <TabView class="vp-tabview">
          <!-- Tab 1: Project Overview -->
          <TabPanel value="0">
            <template #header>
              <div class="vp-tab-header">
                <i class="pi pi-file-edit"></i>
                <span>Project Overview</span>
              </div>
            </template>
            <div class="vp-tab-content">
              <div v-if="project.overview?.about" class="vp-overview-block">
                <h4 class="vp-overview-title">About This Project</h4>
                <p class="vp-overview-text">{{ project.overview.about }}</p>
              </div>
              <div v-else class="vp-overview-block">
                <h4 class="vp-overview-title">About This Project</h4>
                <p class="vp-overview-text">
                  {{ project.longDescription || project.description }}
                </p>
              </div>

              <div v-if="project.overview?.developmentProcess" class="vp-overview-block">
                <h4 class="vp-overview-title">Development Process</h4>
                <p class="vp-overview-text">{{ project.overview.developmentProcess }}</p>
              </div>

              <div v-if="project.overview?.challenges" class="vp-overview-block">
                <h4 class="vp-overview-title">Challenges and Solutions</h4>
                <p class="vp-overview-text">{{ project.overview.challenges }}</p>
              </div>
            </div>
          </TabPanel>

          <!-- Tab 2: Interactive Demo -->
          <TabPanel value="1">
            <template #header>
              <div class="vp-tab-header">
                <i class="pi pi-desktop"></i>
                <span>Interactive Demo</span>
              </div>
            </template>
            <div class="vp-tab-content vp-demo-tab">
              <div v-if="project.liveUrl" class="vp-demo-iframe-wrap">
                <iframe
                  :src="project.liveUrl"
                  :title="`${project.title} demo`"
                  class="vp-demo-iframe"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>
              <div v-else class="vp-demo-placeholder">
                <i class="pi pi-video" style="font-size: 2.5rem; color: #c7c7cc;"></i>
                <p class="vp-demo-placeholder-text">No live demo available yet</p>
                <Button
                  v-if="project.githubUrl"
                  icon="pi pi-github"
                  label="View Source Code"
                  severity="secondary"
                  outlined
                  @click="openGithub"
                />
              </div>
            </div>
          </TabPanel>

          <!-- Tab 3: Screenshots -->
          <TabPanel value="2">
            <template #header>
              <div class="vp-tab-header">
                <i class="pi pi-images"></i>
                <span>Screenshots</span>
              </div>
            </template>
            <div class="vp-tab-content">
              <div v-if="hasScreenshots" class="vp-gallery">
                <!-- Main image viewer -->
                <div class="vp-gallery-main">
                  <Button
                    icon="pi pi-chevron-left"
                    rounded
                    severity="secondary"
                    class="vp-gallery-nav vp-gallery-nav-prev"
                    @click="prev"
                    aria-label="Previous screenshot"
                  />
                  <div class="vp-gallery-stage">
                    <transition :name="slideDirection === 'right' ? 'slide-right' : 'slide-left'" mode="out-in">
                      <img
                        :key="activeIndex"
                        :src="currentImage"
                        :alt="`${project.title} screenshot ${activeIndex + 1}`"
                        class="vp-gallery-image"
                      />
                    </transition>
                    <!-- Image counter -->
                    <span class="vp-gallery-counter">
                      {{ activeIndex + 1 }} / {{ screenshots.length }}
                    </span>
                  </div>
                  <Button
                    icon="pi pi-chevron-right"
                    rounded
                    severity="secondary"
                    class="vp-gallery-nav vp-gallery-nav-next"
                    @click="next"
                    aria-label="Next screenshot"
                  />
                </div>

                <!-- Thumbnail strip -->
                <div class="vp-gallery-thumbs">
                  <button
                    v-for="(src, index) in screenshots"
                    :key="index"
                    class="vp-thumb"
                    :class="{ 'vp-thumb-active': index === activeIndex }"
                    @click="goTo(index)"
                    :aria-label="`View screenshot ${index + 1}`"
                  >
                    <img :src="src" :alt="`Thumbnail ${index + 1}`" class="vp-thumb-img" />
                  </button>
                </div>
              </div>
              <div v-else class="vp-demo-placeholder">
                <i class="pi pi-image" style="font-size: 2.5rem; color: #c7c7cc;"></i>
                <p class="vp-demo-placeholder-text">No screenshots available yet</p>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>

    <!-- ── Footer ────────────────────────────────────────── -->
    <template #footer>
      <div class="vp-footer">
        <Button
          label="Close"
          severity="secondary"
          @click="close"
        />
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
/* ══════════════════════════════════════════════════════════════
   DIALOG PANEL
   ══════════════════════════════════════════════════════════════ */
:global(.vp-dialog-mask) {
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.45);
}

:global(.my-app-dark .vp-dialog-mask) {
  background: rgba(0, 0, 0, 0.65);
}

:global(.view-project-dialog .p-dialog) {
  border-radius: 1.25rem !important;
  overflow: hidden;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow:
    0 0 40px rgba(99, 102, 241, 0.08),
    0 24px 64px rgba(0, 0, 0, 0.12);
}

:global(.my-app-dark .view-project-dialog .p-dialog) {
  background-color: #1a1a24;
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow:
    0 0 40px rgba(99, 102, 241, 0.15),
    0 24px 64px rgba(0, 0, 0, 0.4);
}

:global(.view-project-dialog .p-dialog-header) {
  background: transparent !important;
  padding: 1rem 1.75rem 0 !important;
}

:global(.view-project-dialog .p-dialog-content) {
  background: transparent !important;
  padding: 0 !important;
}

:global(.view-project-dialog .p-dialog-footer) {
  background: transparent !important;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding: 1rem 1.75rem !important;
}

:global(.my-app-dark .view-project-dialog .p-dialog-footer) {
  border-top-color: rgba(255, 255, 255, 0.06);
}

:global(.view-project-dialog .p-dialog-close-button) {
  color: #6b7280 !important;
}

:global(.my-app-dark .view-project-dialog .p-dialog-close-button) {
  color: #9ca3af !important;
}

/* ── Category badge ───────────────────────────────────── */
.vp-dialog-top-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-right: 2rem;
}

.category-badge {
  display: inline-block;
  padding: 0.2rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.badge-primary {
  background-color: rgba(54, 101, 234, 0.12);
  color: #3665ea;
  border: 1px solid rgba(54, 101, 234, 0.2);
}

.badge-success {
  background-color: rgba(14, 201, 104, 0.12);
  color: #0ec968;
  border: 1px solid rgba(14, 201, 104, 0.2);
}

.badge-help {
  background-color: rgba(152, 75, 208, 0.12);
  color: #984bd0;
  border: 1px solid rgba(152, 75, 208, 0.2);
}

.badge-warn {
  background-color: rgba(243, 187, 89, 0.12);
  color: #d4930a;
  border: 1px solid rgba(243, 187, 89, 0.2);
}

/* ══════════════════════════════════════════════════════════════
   BODY
   ══════════════════════════════════════════════════════════════ */
.vp-body {
  display: flex;
  flex-direction: column;
  max-height: 78vh;
  overflow-y: auto;
}

/* ══════════════════════════════════════════════════════════════
   HERO — two-column
   ══════════════════════════════════════════════════════════════ */
.vp-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
  padding: 0.25rem 1.75rem 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.my-app-dark .vp-hero {
  border-bottom-color: rgba(255, 255, 255, 0.06);
}

.vp-hero-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

.vp-title {
  font-size: 1.65rem;
  font-weight: 800;
  line-height: 1.25;
  margin: 0;
  color: #111827;
}

.my-app-dark .vp-title {
  color: #f3f4f6;
}

.vp-desc {
  font-size: 0.875rem;
  line-height: 1.7;
  color: #6b7280;
  margin: 0;
}

.my-app-dark .vp-desc {
  color: #9ca3af;
}

/* ── Hero image ───────────────────────────────────────── */
.vp-hero-image {
  border-radius: 0.875rem;
  overflow: hidden;
  background-color: #f9fafb;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.my-app-dark .vp-hero-image {
  background-color: #24242e;
  border-color: rgba(255, 255, 255, 0.04);
}

.vp-hero-img {
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.vp-hero-img:hover {
  transform: scale(1.03);
}

/* ── Sections inside hero-left ────────────────────────── */
.vp-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.vp-label {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #374151;
  margin: 0;
}

.my-app-dark .vp-label {
  color: #d1d5db;
}

/* ══════════════════════════════════════════════════════════════
   TECH CHIPS — with icons
   ══════════════════════════════════════════════════════════════ */
.vp-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.vp-tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.3rem 0.7rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: rgba(99, 102, 241, 0.07);
  color: #6366f1;
  border: 1px solid rgba(99, 102, 241, 0.14);
  transition: all 0.25s ease;
}

.vp-tech-chip:hover {
  background-color: rgba(99, 102, 241, 0.14);
  border-color: rgba(99, 102, 241, 0.28);
  transform: translateY(-1px);
}

.my-app-dark .vp-tech-chip {
  background-color: rgba(99, 102, 241, 0.12);
  color: #a5b4fc;
  border-color: rgba(99, 102, 241, 0.2);
}

.my-app-dark .vp-tech-chip:hover {
  background-color: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.35);
}

.vp-tech-chip-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  flex-shrink: 0;
}

.vp-tech-chip-fallback {
  font-size: 0.7rem;
  color: #6366f1;
  flex-shrink: 0;
}

/* ── Features list ────────────────────────────────────── */
.vp-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.vp-feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #374151;
}

.my-app-dark .vp-feature-item {
  color: #d1d5db;
}

.vp-feature-icon {
  color: #22c55e;
  font-size: 0.85rem;
  flex-shrink: 0;
}

/* ── Hero actions ─────────────────────────────────────── */
.vp-hero-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

/* ══════════════════════════════════════════════════════════════
   TABVIEW
   ══════════════════════════════════════════════════════════════ */
.vp-tabs-wrapper {
  padding: 0 1.75rem 1.5rem;
}

:global(.vp-tabview .p-tabview-nav) {
  background: transparent !important;
  border: none !important;
  padding: 1.25rem 0 0 !important;
  gap: 0 !important;
}

:global(.vp-tabview .p-tabview-nav-link) {
  font-size: 0.85rem !important;
  font-weight: 600 !important;
  color: #9ca3af !important;
  padding: 0.75rem 1.25rem !important;
  border: none !important;
  border-bottom: 2px solid transparent !important;
  transition: all 0.2s ease !important;
  gap: 0.5rem !important;
  background: transparent !important;
}

:global(.vp-tabview .p-tabview-nav-link:hover) {
  color: #6366f1 !important;
}

:global(.vp-tabview .p-tabview-panels) {
  background: transparent !important;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 0 0.75rem 0.75rem 0.755rem !important;
  padding: 1.25rem 1.5rem !important;
  margin-top: 0 !important;
  min-height: 200px;
}

:global(.my-app-dark .vp-tabview .p-tabview-panels) {
  border-color: rgba(255, 255, 255, 0.06);
}

:global(.my-app-dark .vp-tabview .p-tabview-nav-link) {
  color: #6b7280 !important;
}

:global(.my-app-dark .vp-tabview .p-tabview-nav-link:hover) {
  color: #a5b4fc !important;
}

.vp-tab-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.vp-tab-header i {
  font-size: 0.8rem;
}

.vp-tab-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ── Overview blocks ──────────────────────────────────── */
.vp-overview-block {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.vp-overview-block + .vp-overview-block {
  margin-top: 0.5rem;
}

.vp-overview-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.my-app-dark .vp-overview-title {
  color: #f3f4f6;
}

.vp-overview-text {
  font-size: 0.85rem;
  line-height: 1.75;
  color: #6b7280;
  margin: 0;
}

.my-app-dark .vp-overview-text {
  color: #9ca3af;
}

/* ── Interactive Demo ─────────────────────────────────── */
.vp-demo-tab {
  align-items: center;
  justify-content: center;
}

.vp-demo-iframe-wrap {
  width: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #f9fafb;
}

.my-app-dark .vp-demo-iframe-wrap {
  border-color: rgba(255, 255, 255, 0.06);
  background: #18181b;
}

.vp-demo-iframe {
  width: 100%;
  height: 420px;
  border: none;
  display: block;
}

.vp-demo-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  text-align: center;
}

.vp-demo-placeholder-text {
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0;
}

/* ══════════════════════════════════════════════════════════════
   SCREENSHOT GALLERY — custom with transitions
   ══════════════════════════════════════════════════════════════ */
.vp-gallery {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* ── Main stage ───────────────────────────────────────── */
.vp-gallery-main {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.vp-gallery-stage {
  flex: 1;
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: #f3f4f6;
  border: 1px solid rgba(0, 0, 0, 0.06);
  aspect-ratio: 16 / 10;
}

.my-app-dark .vp-gallery-stage {
  background-color: #1f1f2e;
  border-color: rgba(255, 255, 255, 0.06);
}

.vp-gallery-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.vp-gallery-counter {
  position: absolute;
  bottom: 0.625rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.625rem;
  border-radius: 9999px;
  letter-spacing: 0.03em;
}

/* ── Nav arrows ───────────────────────────────────────── */
.vp-gallery-nav {
  flex-shrink: 0;
  width: 2.25rem !important;
  height: 2.25rem !important;
  background-color: rgba(255, 255, 255, 0.85) !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
  color: #374151 !important;
  transition: all 0.2s ease !important;
}

.vp-gallery-nav:hover {
  background-color: #fff !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;
  transform: scale(1.08) !important;
}

.my-app-dark .vp-gallery-nav {
  background-color: rgba(30, 30, 42, 0.85) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #d1d5db !important;
}

.my-app-dark .vp-gallery-nav:hover {
  background-color: rgba(40, 40, 56, 0.95) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
}

/* ── Thumbnail strip ──────────────────────────────────── */
.vp-gallery-thumbs {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.125rem 0;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.vp-gallery-thumbs::-webkit-scrollbar {
  display: none;
}

.vp-thumb {
  flex-shrink: 0;
  width: 72px;
  height: 52px;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  padding: 0;
  background: none;
  transition: all 0.25s ease;
  opacity: 0.55;
}

.vp-thumb:hover {
  opacity: 0.85;
}

.vp-thumb-active {
  border-color: #6366f1;
  opacity: 1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.my-app-dark .vp-thumb-active {
  border-color: #818cf8;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.25);
}

.vp-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 0.375rem;
}

/* ── Slide transitions ────────────────────────────────── */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(24px) scale(0.97);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-24px) scale(0.97);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-24px) scale(0.97);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(24px) scale(0.97);
}

/* ══════════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════════ */
.vp-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* ── Scrollbar ────────────────────────────────────────── */
.vp-body::-webkit-scrollbar {
  width: 4px;
}

.vp-body::-webkit-scrollbar-track {
  background: transparent;
}

.vp-body::-webkit-scrollbar-thumb {
  background-color: rgba(99, 102, 241, 0.2);
  border-radius: 9999px;
}

.vp-body::-webkit-scrollbar-thumb:hover {
  background-color: rgba(99, 102, 241, 0.35);
}

/* ══════════════════════════════════════════════════════════════
   RESPONSIVE — tablet (≤ 768px)
   ══════════════════════════════════════════════════════════════ */
@media (max-width: 768px) {
  :global(.view-project-dialog .p-dialog) {
    border-radius: 1rem !important;
    margin: 0.5rem !important;
  }

  :global(.view-project-dialog .p-dialog-header) {
    padding: 0.75rem 1.25rem 0 !important;
  }

  :global(.view-project-dialog .p-dialog-footer) {
    padding: 0.75rem 1.25rem !important;
  }

  .vp-hero {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 0 1.25rem 1.25rem;
  }

  .vp-hero-image {
    order: -1;
  }

  .vp-hero-img {
    min-height: 180px;
  }

  .vp-title {
    font-size: 1.35rem;
  }

  .vp-tabs-wrapper {
    padding: 0 1.25rem 1.25rem;
  }

  :global(.vp-tabview .p-tabview-panels) {
    padding: 1rem 1.125rem !important;
    min-height: 160px;
  }

  .vp-demo-iframe {
    height: 320px;
  }

  .vp-gallery-nav {
    width: 2rem !important;
    height: 2rem !important;
  }

  .vp-thumb {
    width: 60px;
    height: 44px;
  }
}

/* ══════════════════════════════════════════════════════════════
   RESPONSIVE — mobile (≤ 480px)
   ══════════════════════════════════════════════════════════════ */
@media (max-width: 480px) {
  :global(.view-project-dialog .p-dialog) {
    width: 100vw !important;
    max-width: 100vw !important;
    height: 100vh !important;
    max-height: 100vh !important;
    border-radius: 0 !important;
    margin: 0 !important;
    border: none !important;
  }

  :global(.view-project-dialog .p-dialog-header) {
    padding: 0.625rem 1rem 0 !important;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  :global(.view-project-dialog .p-dialog-content) {
    overflow-y: auto;
  }

  :global(.view-project-dialog .p-dialog-footer) {
    padding: 0.75rem 1rem !important;
    position: sticky;
    bottom: 0;
    z-index: 10;
  }

  .vp-hero {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 1rem 1rem;
  }

  .vp-hero-img {
    min-height: 150px;
    aspect-ratio: 16 / 9;
  }

  .vp-title {
    font-size: 1.15rem;
  }

  .vp-desc {
    font-size: 0.8rem;
  }

  .vp-label {
    font-size: 0.72rem;
  }

  .vp-feature-item {
    font-size: 0.8rem;
  }

  .vp-hero-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .vp-hero-actions :global(.p-button) {
    width: 100%;
    justify-content: center;
  }

  .vp-tabs-wrapper {
    padding: 0 1rem 1rem;
  }

  :global(.vp-tabview .p-tabview-nav) {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    gap: 0 !important;
  }

  :global(.vp-tabview .p-tabview-nav::-webkit-scrollbar) {
    display: none;
  }

  :global(.vp-tabview .p-tabview-nav-link) {
    font-size: 0.78rem !important;
    padding: 0.625rem 0.875rem !important;
    white-space: nowrap;
  }

  :global(.vp-tabview .p-tabview-panels) {
    padding: 0.875rem 1rem !important;
    min-height: 140px;
  }

  .vp-overview-title {
    font-size: 0.85rem;
  }

  .vp-overview-text {
    font-size: 0.8rem;
    line-height: 1.65;
  }

  .vp-demo-iframe {
    height: 260px;
  }

  /* Gallery mobile */
  .vp-gallery-main {
    gap: 0.375rem;
  }

  .vp-gallery-nav {
    width: 1.75rem !important;
    height: 1.75rem !important;
  }

  .vp-gallery-stage {
    aspect-ratio: 16 / 10;
    border-radius: 0.625rem;
  }

  .vp-thumb {
    width: 52px;
    height: 38px;
  }

  .vp-gallery-counter {
    font-size: 0.6rem;
    padding: 0.15rem 0.5rem;
    bottom: 0.375rem;
    right: 0.5rem;
  }
}

/* ── Touch device tweaks ──────────────────────────────── */
@media (hover: none) and (pointer: coarse) {
  .vp-hero-img:hover {
    transform: none;
  }

  .vp-body {
    -webkit-overflow-scrolling: touch;
  }
}
</style>
