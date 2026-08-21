<script setup lang="ts">
import Button from 'primevue/button';
import CardProject from './CardProject.vue';
import { projects } from '../data/usePortfolio';
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <!-- Section header -->
      <div
        v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }"
        class="flex flex-col md:flex-row justify-between items-center mb-10 scroll-hidden"
      >
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-2">
            Featured <span class="gradient-text">Projects</span>
          </h2>
          <p class="text-default-500 text-sm">
            Explore some of my recent work
          </p>
        </div>
        <div class="mt-4 md:mt-0">
          <RouterLink to="/project">
            <Button
              label="View All Projects"
              variant="text"
              severity="secondary"
              icon="pi pi-arrow-right"
              icon-pos="right"
            />
          </RouterLink>
        </div>
      </div>

      <!-- Project grid with staggered reveal -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }"
          class="scroll-hidden"
          :class="`anim-delay-${(index + 1) * 100}`"
        >
          <CardProject :project="project" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
