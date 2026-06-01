<template>
    <div class="bg-[#f4f4f4] bg-card">
        <Fieldset legend="Tech Stack" class="w-full">
            <div class="scroll-container">
                <div class="scroll-track">
                    <div v-for="(icon, index) in icons" :key="`original-${index}`">
                        <Image :src="icon" alt="Avatar" width="48" height="48" shape="circle" />
                    </div>
                    <div v-for="(icon, index) in icons" :key="`duplicate-${index}`">
                        <Image :src="icon" alt="Avatar" width="48" height="48" shape="circle" />
                    </div>
                </div>
            </div>
        </Fieldset>
    </div>
</template>

<script setup lang="ts">
import Fieldset from 'primevue/fieldset';
import Image from 'primevue/image';
import { ref, type Ref } from 'vue';

    const icons : Ref<string[]> = ref([
        '/src/assets/icons/angular.png',
        '/src/assets/icons/docker.png',
        '/src/assets/icons/express-js.png',
        '/src/assets/icons/graphql.png',
        '/src/assets/icons/html-css.png',
        '/src/assets/icons/html.png',
        '/src/assets/icons/javaScript.png',
        '/src/assets/icons/mongodb.png',
        '/src/assets/icons/nodejs.png',
        '/src/assets/icons/postgre.png',
        '/src/assets/icons/react.png',
        '/src/assets/icons/typescript.png',
        '/src/assets/icons/vue.png',
    ])
</script>

<style scoped>
    .my-app-dark .bg-card {
        background-color: #18181b;
    }

    .scroll-container {
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        mask-image: linear-gradient(
            to right,
            transparent ,
            #000 20%,
            #000 800%,
            transparent
        );
    }

    .scroll-track {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        animation: scroll 15s linear infinite;
        width: max-content;
    }

    .scroll-track:hover {
        animation-play-state: paused;
    }

    .scroll-track > div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    @keyframes scroll {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    :deep(.p-fieldset-content) {
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        mask-image: linear-gradient(
            to right,
            transparent ,
            #000 20%,
            #000 800%,
            transparent
        );
    }
</style>