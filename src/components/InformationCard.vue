<template>
     <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div v-for="info in contactInformation" >
            <div class="h-full rounded-2xl bg-[#f4f4f4] bg-card">
              <div class="flex flex-col items-center text-center p-6">
                <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4 " :style="{background: info.bgColor + '6D'}">
                    <div>
                        <i :class="`pi ${info.icon}`" style="font-size: 1.25rem"></i>
                    </div>
                </div>
                <h3 class="text-lg font-semibold mb-2">{{info.title}}</h3>
                <a 
                  :href=info.link 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-default-500 hover:text-primary-500 transition-colors"
                >
                  {{info.value}}
                </a>
              </div>
            </div>
          </div>
      </div>
</template>
<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import type { ContactInfo } from '../models/contact-information';
import { contactInfo } from '../data/usePortfolio';
    const contactInformation : Ref<ContactInfo[]> = ref([]);
    onMounted(() => {
        contactInformation.value = contactInfo
    })
</script>
<style scoped>

    .my-app-dark .bg-card {
        background-color: #18181b;
    }
</style>