<template>
    <section class="container mx-auto py-16">
        <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold mb-4" >My Projects</h1>
            <h6 class="text-gray-500 max-w-2xl mx-auto">
                Explore my portfolio of web development projects across various projects.
            </h6>
        </div>
        
        <div class="flex flex-col md:flex-row gap-4 mb-8">
            <IconField >
                <InputIcon class="pi pi-search" />
                <InputText v-model="searchText" placeholder="Search" size="large" :change="onChange()"/>
            </IconField>
        </div>
        <div v-if="projectFiltered.length">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="project in projectFiltered" :key="project.id">
                    <CardProject :project="project"/>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="w-full grid-cols-3">
                <p class="text-center mx-auto ">No project found</p>
            </div>
        </div>

    </section>
</template>

<script setup lang="ts">
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { onBeforeMount, ref, type Ref } from 'vue';
import CardProject from '../shares/CardProject.vue';
import { projects } from '../../data/project';
import type { Project } from '../../models/project';

  const searchText = ref('');
  const projectFiltered : Ref<Project[]> = ref([]);
  const projectList : Ref<Project[]> = ref([]);

  onBeforeMount(() => {
      projectList.value = projects
  })
  const onChange = () => {
    setTimeout(() => {
        projectFiltered.value = projectList.value.filter((project) => project.title.toLowerCase().includes(searchText.value.toLowerCase()))
    }, 200);
  }
</script>