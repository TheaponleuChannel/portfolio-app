<template>
    <div>
        <menu class="flex gap-8 items-center">
            <li v-for="item in listMenu" :key="item.name" class="list-none " >
              <RouterLink :to="item.path" :active-class="'primary-color active-link'" class="menu-item px-1 text-lg py-1 primary-color-hover">
                {{item.name}}
              </RouterLink>
            </li>
        </menu>
    </div>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    const listMenu = [
        { name: "Home", path: "/home" },
        { name: "About", path: "/about" },
        { name: "Project", path: "/project" },
        { name: "Contact", path: "/contact" },
    ];

</script>

<style scoped>
.menu-item {
  position: relative;
  text-decoration: none;
}

.menu-item::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #4b87f4;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.menu-item:hover::after,
.menu-item.active-link::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>