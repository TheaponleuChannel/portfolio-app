<script setup lang="ts">
import Footer from './footer/Footer.vue';
import Branding from './top-header/Branding.vue';
import MenuList from './top-header/MenuList.vue';
import ThemeSwitcher from './top-header/ThemeSwitcher.vue';
import Divider from 'primevue/divider';

const year = new Date().getFullYear();

</script>

<template>
    <div class="sticky mx-auto w-full lg:container top-5 z-10 duration-300 ease-in-out">
        <div class=" h-full mx-auto pl-2 flex justify-between items-center">
            <div class="flex gap-4 items-center">
                <Branding/>
            </div>
            <span class="px-3">
                <MenuList/>
            </span>
            <ThemeSwitcher/>
        </div>
    </div>
    <div  class="scroll-container overflow-y-auto flex flex-col min-h-[95vh]">
        <div class="flex-1 min-h-auto">
            <router-view v-slot="{ Component }">
                <transition name="route-fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
        <div class="bg-footer bg-footer-dark">
            <Footer/>
            
            <Divider />
    
            <div class="copy-right py-[2.5rem]">
                <p class="text-center text-[#9c9ca4]">
                    © {{year}} THEA PONLEU. All rights reserved.
                </p>
            </div>
        </div>
    </div>
</template>

<style>

</style>
