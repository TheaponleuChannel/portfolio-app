<script setup lang="ts">
import Branding from '../top-header/Branding.vue';
import { RouterLink } from 'vue-router';
    const listMenu: string[] = ["Home", "About","Project","Resources", "Articles", "Contact"];
</script>

<template>
    <footer class="container mx-auto flex justify-between max-sm:flex-col gap-y-4 max-sm:p-[2rem] py-2">
        <div>
            <Branding :isFooter="true"/>
            <div class="pt-[15px]">
                <p class="font-semibold text-[#9c9ca4] text-lg">
                    Building exceptional digital experiences with modern web technologies.
                </p>
                <div class="flex gap-6 py-[1rem]">
                    <i class="pi pi-github cursor-pointer primary-color-hover" v-tooltip.bottom="'Github'" style="font-size: 1.5rem;"></i>
                    <i class="pi pi-linkedin cursor-pointer primary-color-hover" v-tooltip.bottom="'Linkedin'" style="font-size: 1.5rem;"></i>
                    <i class="pi pi-twitter cursor-pointer primary-color-hover" v-tooltip.bottom="'X'" style="font-size: 1.5rem;"></i>
                    <i class="pi pi-instagram cursor-pointer primary-color-hover" v-tooltip.bottom="'Instagram'" style="font-size: 1.5rem;"></i>
                </div>
            </div>
        </div>

        <div class="min-w-[200px]">
            <h3 class="flex items-center h-[25px]"><b>Navigation</b></h3>
            <div class="grid grid-cols-2 gap-2 pt-[15px]">
                <li v-for="(item, index) in listMenu" :key="index" class="list-none" >
                    <RouterLink :to="item.toLocaleLowerCase()" class=" primary-color-hover text-lg font-semibold text-[#9c9ca4] ">
                        <a class="mb-[1rem]">{{item}}</a>
                    </RouterLink "/>
                </li>
            </div>
        </div>
    </footer>

</template>