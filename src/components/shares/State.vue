<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Button  from 'primevue/button';

interface Stat {
  icon: string;
  value: string;
  label: string;
  color: string;
  LabelColor: string
}

  const stats: Ref<Stat[]> = ref([
    {
      icon: 'pi-briefcase',
      value: '3+',
      label: 'Years Experience',
      color: 'primary',
      LabelColor: '#3665ea'
    },
    {
      icon: 'pi-check-circle',
      value: '10+',
      label: 'Projects Completed',
      color: 'success',
      LabelColor: '#0ec968'
    },
    {
      icon: 'pi-users',
      value: '30+',
      label: 'Happy Clients',
      color: 'help',
      LabelColor: 'help'
    },
    {
      icon: 'pi-code',
      value: '50K+',
      label: 'Lines of Code',
      color: 'warn',
      LabelColor: 'warn'
    }
  ]);

</script>

<template>
    <section class="py-16 bg-content2 mt-[4rem]" >
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(stat, index) in stats" :key="index">
              <div class="h-full bg-state-item rounded-2xl" disableRipple >
                <div class="flex flex-col items-center justify-center p-6 text-center">
                  <div :class="`w-12 h-12 rounded-full bg-${stat.color} flex items-center justify-center mb-4`">
                       <Button size="large" :icon="`pi ${stat.icon}`" :severity="stat.color" rounded style="color: #ffff" />
                  </div>
                  <h3 class="text-3xl font-bold mb-1">{{stat.value}}</h3>
                  <p class="text-default-500">{{stat.label}}</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>   
</template>

<style scoped>
    .bg-content2 {
        background-color: #f4f4f5;
    }

    .bg-state-item {
        background-color: #ffffff;
    }

    .my-app-dark .bg-state-item {
        background-color: #18181b;
    }

    .my-app-dark .bg-content2 {
        background-color: #27272a;
    }
</style>