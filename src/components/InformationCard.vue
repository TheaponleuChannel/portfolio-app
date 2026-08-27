<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    <a
      v-for="(info, index) in contactInformation"
      :key="info.title"
      :href="info.link"
      target="_blank"
      rel="noopener noreferrer"
      v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }"
      class="info-card scroll-hidden"
      :class="`anim-delay-${(index + 1) * 100}`"
      :aria-label="`${info.title}: ${info.value}`"
    >
      <div class="info-card-inner">
        <div
          class="info-icon"
          :style="{ backgroundColor: info.color + '1A', color: info.color }"
        >
          <i :class="`pi ${info.icon}`"></i>
        </div>
        <h3 class="info-title">{{ info.title }}</h3>
        <span class="info-value">{{ info.value }}</span>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { ContactInfo } from '../models/contact-information';
import { contactInfo } from '../data/usePortfolio';

const contactInformation: Ref<ContactInfo[]> = ref(contactInfo);
</script>

<style scoped>
.info-card {
  display: flex;
  height: 100%;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.info-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 0 24px rgba(99, 102, 241, 0.2),
    0 12px 32px rgba(0, 0, 0, 0.08);
  border-color: rgba(99, 102, 241, 0.25);
}

.my-app-dark .info-card {
  background-color: rgba(24, 24, 27, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}

.my-app-dark .info-card:hover {
  box-shadow:
    0 0 28px rgba(47, 0, 255, 0.3),
    0 12px 32px rgba(0, 0, 0, 0.3);
  border-color: rgba(99, 102, 241, 0.3);
}

.info-card-inner {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.75rem 1.25rem;
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.info-icon .pi {
  font-size: 1.3rem;
}

.info-card:hover .info-icon {
  transform: scale(1.1);
}

.info-title {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.info-value {
  font-size: 0.85rem;
  line-height: 1.5;
  color: #6b7280;
  word-break: break-word;
  transition: color 0.3s ease;
}

.info-card:hover .info-value {
  color: #6366f1;
}

.my-app-dark .info-value {
  color: #9ca3af;
}

.my-app-dark .info-card:hover .info-value {
  color: #a5b4fc;
}
</style>
