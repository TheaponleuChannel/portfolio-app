<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';
import Footer from './footer/Footer.vue';
import Branding from './top-header/Branding.vue';
import MenuList from './top-header/MenuList.vue';
import ThemeSwitcher from './top-header/ThemeSwitcher.vue';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import { ref, type Ref } from "vue";

const menu = ref();
const items: Ref<MenuItem[]> = ref([
    {
        label: 'Home',
        url: '/'
    },
    {
        label: 'About',
        url: '/about'
    },
    {
        label: 'Project',
        url: '/project'
    },
    {
        label: 'Contact',
        url: '/contact'
    },
])

const showMenu = (event: Event) => {
    menu.value.toggle(event);
}

</script>

<template>
    <div class="sticky top-0 left-0 right-0 h-16 border-b-1 border-[#dddddfa9] z-10 ">
        <div class="max-w-[1280px] mx-auto py-4 flex justify-between items-center max-xl:px-[1rem] ">
            <div class="flex gap-4 items-center">
                <div class="hidden max-sm:block">
                    <Button icon="pi pi-bars" severity="contrast" variant="text" rounded @click="showMenu"/>
                    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" @click="" />
                </div>
                <Branding/>
            </div>
            <span class="max-sm:hidden">
                <MenuList/>
            </span>
            <ThemeSwitcher/>
        </div>
    </div>
    <div class="scroll-container overflow-y-auto flex flex-col min-h-[95vh] ">
        <div class="flex-1 min-h-auto">
            <router-view></router-view>
        </div>
        <div class="bg-footer bg-footer-dark inset-shadow-2xs">
            <Footer/>
            
            <hr class="mt-[1rem]">
    
            <div class="copy-right py-[2.5rem]">
                <p class="text-center text-[#9c9ca4]">
                    © 2025 PONLEU. All rights reserved.
                </p>
            </div>
        </div>
    </div>
</template>

<style>

</style>