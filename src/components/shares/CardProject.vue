<script setup lang="ts">
import type { Project } from '../../models/project';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
    defineProps<{ project: Project }>()
    const toast = useToast();
    const demo = () => {
        toast.add({severity:'info', summary: 'Info Message', detail:'This feature is under development', life: 3000});
    }
</script>

<template>
    <Card style="overflow: hidden">
    <template #header>
        <img alt="user header" :src="project.image" />
    </template>
    <template #title>{{ project.title || '' }}</template>
    <template #subtitle>{{ project.category || '' }}</template>
    <template #content>
        <p class="m-0">
            {{ project.longDescription || '' }}
        </p>
    </template>
    <template #footer>
        <div class="flex gap-4 mt-1">
            <Button label="View Detail" severity="success" variant="text" icon="pi pi-arrow-right" icon-pos="right" class="w-full" />
            <Toast/>
            <Button label="Live Demo" severity="secondary"raised icon="pi pi-window-maximize" icon-pos="left" class="w-full" @click="demo" />
        </div>
    </template>
    </Card>
</template>

<style scoped>  

</style>