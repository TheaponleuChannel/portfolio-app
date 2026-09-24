<script setup lang="ts">
withDefaults(defineProps<{ label?: string; icon?: string }>(), {
  label: 'Load More',
  icon: 'pi pi-arrow-down',
});

const emit = defineEmits<{ click: [event: MouseEvent] }>();
</script>

<template>
  <button type="button" class="load-more-btn" @click="emit('click', $event)">
    {{ label }}
    <i :class="icon" />
  </button>
</template>

<style scoped>
.load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #6366f1;
  background-color: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.2);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.load-more-btn:hover {
  background-color: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.2);
}

.load-more-btn:active {
  transform: translateY(0);
}

.load-more-btn .pi {
  font-size: 0.85rem;
  transition: transform 0.3s ease;
}

.load-more-btn:hover .pi {
  transform: translateY(3px);
}

.my-app-dark .load-more-btn {
  color: #a5b4fc;
  background-color: rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.2);
}

.my-app-dark .load-more-btn:hover {
  background-color: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.35);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.25);
}

@media (max-width: 639px) {
  .load-more-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
