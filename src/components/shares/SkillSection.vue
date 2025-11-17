<script setup lang="ts">
import Card from 'primevue/card';
import { onMounted, ref, type Ref } from 'vue';
import type { Skill } from '../../models/skill';
import { backendSkills, frontendSkills } from '../../data/project';
import ProgressBar from 'primevue/progressbar';

    const fSkills : Ref<Skill[]> = ref([]);
    const bSkills : Ref<Skill[]> = ref([]);
    onMounted(() => {
        fSkills.value = frontendSkills;
        bSkills.value = backendSkills;
    })
</script>

<template >
    <section class="py-20 bg-content2">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h1 class="text-3xl md:text-4xl font-bold mb-4" >My Skills & Expertise</h1>
                <h6 class="text-gray-500 max-w-2xl mx-auto">
                    I've worked with a wide range of technologies in the web development world. Here's an overview of my technical skills and proficiency levels.
                </h6>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <template #title>
                        <h3 class="text-xl font-semibold mb-2 flex items-center gap-2">
                            <i class="pi pi-objects-column" style="font-size: 1rem; color: #3665ea"></i>
                            Frontend Development
                        </h3>
                    </template>
                    <template #content>
                        <div class="mb-6" v-for="(skill, index) in fSkills" :key="index">
                            <div class="flex items-center gap-3 mb-2">
                                <img :src="skill.icon" alt="" width="24" height="24">
                                <span class="font-medium">{{skill.name}}</span>
                                <span class="ml-auto text-sm text-default-500">{{skill.level}}%</span>
                            </div>
                            <ProgressBar 
                                style="height: 5px;"
                                :value="skill.level" 
                                :showValue="false" 
                                :style="{'--p-progressbar-value-background': skill.color, }">
                            </ProgressBar>
                        </div>
                    </template>
                </Card>
                <Card>
                    <template #title>
                        <h3 class="text-xl font-semibold mb-2 flex items-center gap-2">
                            <i class="pi pi-server" style="font-size: 1rem; color: #3665ea"></i>
                            Backend Development
                        </h3>
                    </template>
                    <template #content>
                        <div class="mb-6" v-for="(skill, index) in bSkills" :key="index">
                            <div class="flex items-center gap-3 mb-2">
                                 <img :src="skill.icon" alt="" width="24" height="24">
                                <span class="font-medium">{{skill.name}}</span>
                                <span class="ml-auto text-sm text-default-500">{{skill.level}}%</span>
                            </div>
                            <ProgressBar 
                                style="height: 5px;"
                                :value="skill.level" 
                                :showValue="false" 
                                :style="{'--p-progressbar-value-background': skill.color, }">
                            </ProgressBar>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .bg-content2 {
        background-color: #f4f4f5;
    }

    .my-app-dark .bg-content2 {
        background-color: #27272a;
    }
</style>