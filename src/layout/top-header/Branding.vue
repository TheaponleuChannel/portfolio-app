<template>
    <RouterLink to="/home">
        <div class="flex gap-1 items-center cursor-pointer">
            <Avatar :image="pfImg" alt="Avatar" class="mr-2" size="normal" shape="circle" />
            
            <p class="font-bold text-md surface-0 dark:surface-800" :class="isFooter ? 'block' : 'hidden md:block'">PONLEU</p>
            <div v-if="!isFooter" class="border-l border-primary-color h-5 m-auto"></div>
        </div>
    </RouterLink>
</template>

<script setup lang="ts">
    import Avatar from 'primevue/avatar';
    import { RouterLink } from 'vue-router';
    import pfImg from '../../assets/photo/pf.jpg';

    const props = defineProps({
        isFooter: {
            type: Boolean,
            default: false
        }
    });
</script>