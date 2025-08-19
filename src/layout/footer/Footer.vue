<script setup lang="ts">
import Branding from '../top-header/Branding.vue';
import { RouterLink } from 'vue-router';
    const listMenu: string[] = ["Home", "About", "Project", "Contact"];
    const listService: string[] = ["Web Development", "UI/UX Design", "Mobile App", "Consulting"];
    const listLegal: string[] = ["Privacy Policy", "Terms of Service", "Cookie Policy"];
</script>

<template>
    <div class="grid grid-cols-4 gap-4 max-w-9/10 mx-auto pt-[3rem] max-lg:w-full max-lg:grid-cols-2 max-sm:grid-cols-1 ">
        <div>
            <Branding/>
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

        <div>
            <h3 class="flex items-center h-[28px]"><b>Navigation</b></h3>
            <div class="flex flex-col gap-2 pt-[15px]">
                <li v-for="(item, index) in listMenu" :key="index" class="list-none" >
                    <RouterLink :to="item.toLocaleLowerCase()" class=" primary-color-hover text-lg font-semibold text-[#9c9ca4] ">
                        <a class="mb-[1rem]">{{item}}</a>
                    </RouterLink>
                </li>
            </div>
        </div>

        <div >
            <h3 class="flex items-center h-[28px]"> <b>Service</b></h3>
            <div class="flex flex-col gap-2 pt-[15px]">
                <li v-for="(item, index) in listService" :key="index" class="list-none cursor-pointer" >
                    <div class=" primary-color-hover text-lg font-semibold text-[#9c9ca4] ">
                        <a class="mb-[1rem]">{{item}}</a>
                    </div>
                </li>
            </div>
        </div>

        <div>
            <h3 class="flex items-center h-[28px]"><b>Legal</b></h3>
            <div class="flex flex-col gap-2 pt-[15px]">
                <li v-for="(item, index) in listLegal" :key="index" class="list-none cursor-pointer" >
                <div class=" primary-color-hover text-lg font-semibold text-[#9c9ca4] ">
                    <a class="mb-[1rem]">{{item}}</a>
                </div>
                </li>
            </div>
        </div>
    </div>

</template>