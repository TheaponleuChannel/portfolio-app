<template>
    <div>
        <menu class="flex gap-8 items-center">
            <li v-for="(item, index) in listMenu" :key="index" class="list-none " >
              <RouterLink :to="item.toLocaleLowerCase()" :active-class="'primary-color border-b-2 border-[#4b87f4]'" class="px-1 text-lg py-1 hover:border-b-2 border-[#4b87f4] primary-color-hover ">
                <a>{{item}}</a>
              </RouterLink>
            </li>
        </menu>
    </div>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    const listMenu = ["Home", "About", "Project", "Contact"];

</script>

<style scoped>
.animate-border {
  border-bottom: 2px solid #4b87f4;
  animation: animate-border 0.5s ease-in-out;
}

@keyframes animate-border {
  0% {
    border-bottom: 2px solid transparent;
    border-bottom-color: #4b87f4;
    transform: scaleX(0);
    transform-origin: right;
  }
  100% {
    transform: scaleX(1);
    transform-origin: right;
  }
}
</style>