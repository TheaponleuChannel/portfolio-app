<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <!-- Section header -->
      <div class="text-center mb-6">
        <h2 class="text-2xl md:text-3xl font-bold mb-2">
          My <span class="gradient-text">Tech Stack</span>
        </h2>
        <p class="text-default-500 text-sm">Technologies &amp; tools I work with</p>
      </div>

      <!-- Infinite scroll marquee -->
      <div class="marquee-container">
        <div
          class="marquee-track"
          @mouseenter="paused = true"
          @mouseleave="paused = false"
        >
          <!-- Original set -->
          <div
            v-for="(tech, index) in techStack"
            :key="`orig-${index}`"
            class="tech-card"
          >
            <div class="tech-card-inner">
              <img
                :src="tech.icon"
                :alt="tech.name"
                class="tech-icon"
                loading="lazy"
              />
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
          <!-- Duplicate set for seamless infinite loop -->
          <div
            v-for="(tech, index) in techStack"
            :key="`dup-${index}`"
            class="tech-card"
          >
            <div class="tech-card-inner">
              <img
                :src="tech.icon"
                :alt="tech.name"
                class="tech-icon"
                loading="lazy"
              />
              <span class="tech-name">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface TechItem {
  name: string;
  icon: string;
}

const paused = ref(false);

const techStack: TechItem[] = [
  { name: 'Angular',    icon: '/src/assets/icons/angular.png' },
  { name: 'Docker',     icon: '/src/assets/icons/docker.png' },
  { name: 'Express',    icon: '/src/assets/icons/express-js.png' },
  { name: 'GraphQL',    icon: '/src/assets/icons/graphql.png' },
  { name: 'HTML/CSS',   icon: '/src/assets/icons/html-css.png' },
  { name: 'HTML',       icon: '/src/assets/icons/html.png' },
  { name: 'JavaScript', icon: '/src/assets/icons/javaScript.png' },
  { name: 'MongoDB',    icon: '/src/assets/icons/mongodb.png' },
  { name: 'Node.js',    icon: '/src/assets/icons/nodejs.png' },
  { name: 'PostgreSQL', icon: '/src/assets/icons/postgre.png' },
  { name: 'React',      icon: '/src/assets/icons/react.png' },
  { name: 'TypeScript', icon: '/src/assets/icons/typescript.png' },
  { name: 'Vue',        icon: '/src/assets/icons/vue.png' },
];
</script>

<style scoped>
/* ── Marquee container ─────────────────────────────────────── */
.marquee-container {
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    #000 15%,
    #000 85%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    #000 15%,
    #000 85%,
    transparent 100%
  );
}

.marquee-track {
  display: flex;
  gap: 1.25rem;
  padding: 1rem 0;
  width: max-content;
  animation: marquee-scroll 30s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.tech-card {
  flex-shrink: 0;
}

.tech-card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;
  min-width: 90px;
}

.tech-card-inner:hover {
  transform: scale(1.1) translateY(-4px);
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow:
    0 0 20px rgba(99, 102, 241, 0.35),
    0 8px 24px rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
}

.my-app-dark .tech-card-inner {
  background-color: rgba(24, 24, 27, 0.55);
  border-color: rgba(255, 255, 255, 0.08);
}

.my-app-dark .tech-card-inner:hover {
  background-color: rgba(24, 24, 27, 0.8);
  box-shadow:
    0 0 24px rgba(47, 0, 255, 0.4),
    0 8px 24px rgba(47, 0, 255, 0.2);
  border-color: rgba(99, 102, 241, 0.35);
}

.tech-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.tech-card-inner:hover .tech-icon {
  transform: scale(1.15);
}

.tech-name {
  font-size: 0.7rem;
  font-weight: 500;
  color: #6b7280;
  white-space: nowrap;
  letter-spacing: 0.01em;
}

.my-app-dark .tech-name {
  color: #9ca3af;
}

@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation-duration: 60s;
  }
}
</style>
