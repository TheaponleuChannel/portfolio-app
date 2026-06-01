<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';
import Footer from './footer/Footer.vue';
import Branding from './top-header/Branding.vue';
import MenuList from './top-header/MenuList.vue';
import ThemeSwitcher from './top-header/ThemeSwitcher.vue';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import { ref, type Ref } from "vue";
import ScrollPanel from 'primevue/scrollpanel';


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

const year = new Date().getFullYear();

const showMenu = (event: Event) => {
    menu.value.toggle(event);
}

</script>

<template>
    <div class="sticky mx-auto w-full lg:container top-5 z-10 m-5 rounded-[16px] border border-[#0000001f] bg-header transition-all duration-300 ease-in-out">
        <div class=" h-full mx-auto px-4 flex justify-between items-center">
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
    <ScrollPanel  class="scroll-container overflow-y-auto flex flex-col min-h-[95vh] ">
        <div class="flex-1 min-h-auto">
            <router-view v-slot="{ Component }">
                <transition name="route-fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
        <div class="bg-footer bg-footer-dark inset-shadow-2xs">
            <Footer/>
            
            <hr>
    
            <div class="copy-right py-[2.5rem]">
                <p class="text-center text-[#9c9ca4]">
                    © {{year}} THEA PONLEU. All rights reserved.
                </p>
            </div>
        </div>
    </ScrollPanel>
</template>

<style>
.bg-header {
    background-color: #ffffff;
}

.my-app-dark .bg-header {
    background-color: #27272a;
}
</style>
