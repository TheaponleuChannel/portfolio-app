<script setup lang="ts">
import Branding from '../top-header/Branding.vue';
import { RouterLink } from 'vue-router';
    const listMenu: string[] = ["Home", "About","Project","Resources", "Articles", "Contact"];
    const socialList = [
        {
            label: 'Github',
            icon: 'pi pi-github',
            ref: 'https://github.com/TheaponleuChannel'
        },
        {
            label: 'Linkedin',
            icon: 'pi pi-linkedin',
            ref: 'https://www.linkedin.com/in/thea-ponleu-331a5a287/'
        },
        {
            label: 'Telegram',
            icon: 'pi pi-telegram',
            ref: 'https://t.me/theriel_theaponleu'
        },
        {
            label: 'Instagram',
            icon: 'pi pi-instagram',
            ref: 'https://www.instagram.com/pzuss_zz?igsh=cW41dXA3aGpwY21y&utm_source=qr'
        }

    ]
</script>

<template>
    <footer class="container mx-auto flex justify-between max-sm:flex-col gap-y-4 max-sm:p-[2rem] py-2">
        <div>
            <Branding :isFooter="true"/>
            <div class="pt-[15px]">
                <p class="font-semibold text-[#9c9ca4] text-lg">
                    Building exceptional digital experiences with modern web technologies.
                </p>
                <div class="flex gap-6 py-[1rem]" >
                    <a v-for="list in socialList" :href="list.ref" v-tooltip.bottom="{value: list.label}" target="_blank">
                        <i :class="list.icon" class="primary-color-hover" style="font-size: large;"></i>
                    </a>
                </div>
            </div>
        </div>

        <div class="min-w-[200px]">
            <h3 class="flex items-center h-[25px]"><b>Navigation</b></h3>
            <div class="grid grid-cols-2 gap-2 pt-[15px]">
                <li v-for="(item, index) in listMenu" :key="index" class="list-none" >
                    <RouterLink :to="item.toLocaleLowerCase()" class="primary-color-hover text-lg font-semibold text-[#9c9ca4] ">
                        <a class="mb-[1rem]">{{item}}</a>
                    </RouterLink "/>
                </li>
            </div>
        </div>
    </footer>

</template>