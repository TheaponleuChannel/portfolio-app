<script setup lang="ts">
defineProps<{ mode?: 'card' | 'magazine' }>();
</script>

<template>
  <!-- Card skeleton -->
  <div v-if="mode !== 'magazine'" class="skel-card">
    <div class="skel-cover">
      <div class="skel-shimmer" />
    </div>
    <div class="skel-body">
      <div class="skel-line skel-line--title"><div class="skel-shimmer" /></div>
      <div class="skel-line skel-line--desc"><div class="skel-shimmer" /></div>
      <div class="skel-line skel-line--desc skel-line--short"><div class="skel-shimmer" /></div>
      <div class="skel-tags">
        <div class="skel-tag"><div class="skel-shimmer" /></div>
        <div class="skel-tag"><div class="skel-shimmer" /></div>
      </div>
      <div class="skel-footer">
        <div class="skel-line skel-line--meta"><div class="skel-shimmer" /></div>
        <div class="skel-line skel-line--meta skel-line--xs"><div class="skel-shimmer" /></div>
      </div>
    </div>
  </div>

  <!-- Magazine skeleton -->
  <div v-else class="skel-mag">
    <div class="skel-mag-cover">
      <div class="skel-shimmer" />
    </div>
    <div class="skel-mag-body">
      <div class="skel-mag-top">
        <div class="skel-tag"><div class="skel-shimmer" /></div>
        <div class="skel-line skel-line--meta skel-line--xs"><div class="skel-shimmer" /></div>
      </div>
      <div class="skel-line skel-line--title-lg"><div class="skel-shimmer" /></div>
      <div class="skel-line skel-line--desc"><div class="skel-shimmer" /></div>
      <div class="skel-line skel-line--desc skel-line--short"><div class="skel-shimmer" /></div>
      <div class="skel-tags">
        <div class="skel-tag"><div class="skel-shimmer" /></div>
        <div class="skel-tag"><div class="skel-shimmer" /></div>
        <div class="skel-tag"><div class="skel-shimmer" /></div>
      </div>
      <div class="skel-footer">
        <div class="skel-line skel-line--meta"><div class="skel-shimmer" /></div>
        <div class="skel-line skel-line--meta skel-line--sm"><div class="skel-shimmer" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ---------- shared ---------- */
.skel-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.45) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.8s ease-in-out infinite;
}

.my-app-dark .skel-shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.07) 50%,
    rgba(255, 255, 255, 0) 100%
  );
}

@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.skel-line {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
}

.skel-line > .skel-shimmer {
  border-radius: inherit;
}

.skel-line--title {
  width: 70%;
  height: 1.1rem;
  background: rgba(0, 0, 0, 0.06);
}

.skel-line--title-lg {
  width: 80%;
  height: 1.5rem;
  background: rgba(0, 0, 0, 0.06);
}

.skel-line--desc {
  width: 100%;
  height: 0.72rem;
  background: rgba(0, 0, 0, 0.04);
}

.skel-line--short {
  width: 60%;
}

.skel-line--meta {
  width: 5rem;
  height: 0.65rem;
  background: rgba(0, 0, 0, 0.04);
}

.skel-line--sm {
  width: 3.5rem;
}

.skel-line--xs {
  width: 2.5rem;
}

.skel-tag {
  width: 3.5rem;
  height: 1.4rem;
  border-radius: 0.375rem;
  background: rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

.skel-tags {
  display: flex;
  gap: 0.4rem;
}

.skel-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.5rem;
}

/* ---------- Card skeleton ---------- */
.skel-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.my-app-dark .skel-card {
  background-color: rgba(24, 24, 27, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}

.skel-cover {
  position: relative;
  aspect-ratio: 16 / 9;
  background: rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.my-app-dark .skel-cover {
  background: rgba(255, 255, 255, 0.04);
}

.skel-body {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.25rem;
  flex: 1;
}

/* ---------- Magazine skeleton ---------- */
.skel-mag {
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.my-app-dark .skel-mag {
  background-color: rgba(24, 24, 27, 0.6);
  border-color: rgba(255, 255, 255, 0.08);
}

@media (min-width: 768px) {
  .skel-mag {
    flex-direction: row;
  }
}

.skel-mag-cover {
  position: relative;
  min-height: 200px;
  background: rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.my-app-dark .skel-mag-cover {
  background: rgba(255, 255, 255, 0.04);
}

@media (min-width: 768px) {
  .skel-mag-cover {
    flex: 0 0 40%;
    min-height: 260px;
  }
}

.skel-mag-body {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1.75rem;
  flex: 1;
}

@media (min-width: 768px) {
  .skel-mag-body {
    justify-content: center;
    padding: 2.25rem;
  }
}

.skel-mag-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
