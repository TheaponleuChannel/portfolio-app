<script setup lang="ts">
import Button from 'primevue/button';
import CardProject from './CardProject.vue';
import type { Project } from '../models/project';
import { onMounted, ref, type Ref } from 'vue';
import { projects } from '../data/usePortfolio';

  const projectList : Ref<Project[]> = ref([]);
  onMounted(() => {
      projectList.value = projects
  })

</script>

<template >
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div 
          v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }" 
          class="flex flex-col md:flex-row justify-between items-center mb-12 scroll-hidden"
        >
          <div>
            <h2 class="text-3xl md:text-4xl font-bold mb-2">Featured Projects</h2>
            <p class="text-default-500">
              Explore some of my recent work
            </p>
          </div>
          <div>
            <RouterLink to="/project">
                <Button label="View All Projects" variant="text" severity="secondary" icon="pi pi-arrow-right" icon-pos="right" />
            </RouterLink>
          </div>
        </div>

        <div 
          v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }" 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-hidden anim-delay-200"
        >
          <div v-for="project in projects" :key="project.id">
            <CardProject :project="project" />
          </div>
        </div>
      </div>
    </section>
</template>

<style>

</style>