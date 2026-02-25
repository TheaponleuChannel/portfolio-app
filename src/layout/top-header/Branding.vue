<template>
    <RouterLink to="/home">
        <div class="flex gap-2 items-center cursor-pointer">
            <Avatar image="/src/assets/photo/pf.jpg" alt="Avatar" class="mr-2" size="normal" shape="circle" />
            <p class="font-bold text-md surface-0 dark:surface-800">PONLEU</p>
        </div>
    </RouterLink>
</template>

<script setup lang="ts">
    import Avatar from 'primevue/avatar';
    import { RouterLink } from 'vue-router';
</script>