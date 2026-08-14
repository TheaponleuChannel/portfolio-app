<template>
    <div>
        <menu class="menu-list flex items-center justify-around">
            <li v-for="item in listMenu" :key="item.name" class="list-none " >
              <RouterLink :to="item.path" active-class="active-link" class="menu-item text-lg" :aria-label="item.name">
                <i :class="item.icon" class="menu-icon"/>
                <span class="menu-label">{{ item.name }}</span>
              </RouterLink>
            </li>
        </menu>
    </div>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    const listMenu = [
        { name: "Home", path: "/home", icon: "pi pi-home" },
        { name: "About", path: "/about", icon: "pi pi-id-card" },
        { name: "Project", path: "/project", icon: "pi pi-briefcase" },
        { name: "Resources", path: "/resources", icon: "pi pi-book" },
        { name: "Articles", path: "/articles", icon: "pi pi-file-edit" },
        { name: "Contact", path: "/contact", icon: "pi pi-phone" },
    ];

</script>

<style scoped>

.menu-list {
  gap: 0.4rem;
  margin: 0;
  padding: 0.25rem;
  border-radius: 5px;
}

.menu-item {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.45rem 0.6rem;
  border-radius: 5px;
  overflow: hidden;
  text-decoration: none;
  color: #52525b;
  font-weight: 700;
  transition: color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}

.menu-label {
  max-width: 0;
  margin-left: 0;
  opacity: 0;
  overflow: hidden;
  white-space: nowrap;
  transform: translateX(-6px);
  transition: max-width 0.5s ease, margin-left 0.5s ease, opacity 0.5s ease, transform 0.5s ease;
}

.menu-icon {
  font-size: 1.35rem;
  transition: transform 0.2s ease, color 0.2s ease;
}

.menu-item:hover .menu-label,
.menu-item:focus-visible .menu-label {
  max-width: 8rem;
  margin-left: 0.5rem;
  opacity: 1;
  transform: translateX(0);
}

.menu-item:hover .menu-icon,
.menu-item:focus-visible .menu-icon {
  transform: translateX(3px);
}

.menu-item::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  opacity: 0;
  transform: scale(0.88);
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.menu-item:hover,
.menu-item:focus-visible {
  color: var(--p-primary-color);
  transform: translateY(-2px);
}

.menu-item:hover,
.menu-item:focus-visible,
.menu-item.active-link {
  color: var(--p-primary-color);
}


:global(.my-app-dark) .menu-item::before {
  background: linear-gradient(135deg, rgba(75, 135, 244, 0.26), rgba(20, 184, 166, 0.2));
}


</style>
