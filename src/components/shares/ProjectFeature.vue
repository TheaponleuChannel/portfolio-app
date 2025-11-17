<script setup lang="ts">
import Button from 'primevue/button';
import CardProject from './CardProject.vue';
import type { Project } from '../../models/project';
import { onMounted, ref, type Ref } from 'vue';
import { projects } from '../../data/project';

    const projectList : Ref<Project[]> = ref([]);
    onMounted(() => {
        projectList.value = projects
    })

</script>

<template >
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center mb-12">
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

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="project in projects">
            <CardProject :project="project" />
          </div>
        </div>
      </div>
    </section>
</template>

<style>

</style>