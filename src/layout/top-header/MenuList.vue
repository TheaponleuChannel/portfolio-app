<template>
    <div>
        <menu class="menu-list flex items-center">
            <li v-for="item in listMenu" :key="item.name" class="list-none " >
              <RouterLink :to="item.path" active-class="active-link" class="menu-item text-lg">
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
        { name: "Resources", path: "/resources" },
        { name: "Articles", path: "/articles" },
        { name: "Contact", path: "/contact" },
    ];

</script>

<style scoped>
.menu-list {
  gap: 0.4rem;
  margin: 0;
  padding: 0.25rem;
  /* border: 1px solid rgba(148, 163, 184, 0.22); */
  border-radius: 999px;
  /* background: rgba(244, 244, 245, 0.62); */
}

.menu-item {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0.45rem 0.95rem;
  border-radius: 999px;
  overflow: hidden;
  text-decoration: none;
  color: #52525b;
  font-weight: 700;
  transition: color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.menu-item::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(75, 135, 244, 0.16), rgba(20, 184, 166, 0.14));
  opacity: 0;
  transform: scale(0.88);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.menu-item::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  bottom: 5px;
  left: 50%;
  border-radius: 999px;
  background: #14b8a6;
  opacity: 0;
  transform: translateX(-50%) translateY(6px);
  transition: opacity 0.25s ease, transform 0.25s ease, width 0.25s ease, height 0.25s ease;
}

.menu-item:hover,
.menu-item:focus-visible {
  color: var(--p-primary-color);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(75, 135, 244, 0.12);
}

.menu-item:hover::before,
.menu-item:focus-visible::before,
.menu-item.active-link::before {
  opacity: 1;
  transform: scale(1);
}

.menu-item:hover::after,
.menu-item:focus-visible::after,
.menu-item.active-link::after {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.menu-item.active-link {
  color: var(--p-primary-color);
  box-shadow: inset 0 0 0 1px rgba(75, 135, 244, 0.2), 0 12px 26px rgba(75, 135, 244, 0.14);
}

.menu-item.active-link::before {
  background: linear-gradient(135deg, rgba(75, 135, 244, 0.2), rgba(20, 184, 166, 0.18));
}

.menu-item.active-link::after {
  width: 22px;
  height: 3px;
  background: linear-gradient(90deg, #4b87f4, #14b8a6);
}

:global(.my-app-dark) .menu-list {
  border-color: rgba(148, 163, 184, 0.16);
  background: rgba(39, 39, 42, 0.64);
}

:global(.my-app-dark) .menu-item {
  color: #d4d4d8;
}

:global(.my-app-dark) .menu-item:hover,
:global(.my-app-dark) .menu-item:focus-visible,
:global(.my-app-dark) .menu-item.active-link {
  color: #ffffff;
}

:global(.my-app-dark) .menu-item::before {
  background: linear-gradient(135deg, rgba(75, 135, 244, 0.26), rgba(20, 184, 166, 0.2));
}

@media (prefers-reduced-motion: reduce) {
  .menu-item,
  .menu-item::before,
  .menu-item::after {
    transition-duration: 0.01ms;
  }

  .menu-item:hover,
  .menu-item:focus-visible {
    transform: none;
  }
}
</style>
