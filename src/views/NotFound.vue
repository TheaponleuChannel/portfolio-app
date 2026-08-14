<template>
  <div class="notfound-wrapper">
  <div class="bg-decoration">
    <div class="bg-circle bg-circle-1"></div>
    <div class="bg-circle bg-circle-2"></div>
    <div class="bg-circle bg-circle-3"></div>
  </div>

  <div class="notfound-content fade-slide-up">
    <div class="error-code">
      <span>4</span>
      <span class="error-orb">
        <i class="pi pi-search" style="font-size: 4.5rem; color: #ffff"></i>
      </span>
      <span>4</span>
    </div>

    <h1 class="notfound-title">Page not found</h1>
    <p class="notfound-subtitle">
      The page you're looking for doesn't exist or has been moved. Let's get you
      back on track.
    </p>

    <div class="notfound-actions">
        <Button size="large" icon="pi pi-home" severity="warn" rounded label="Back to home" />

    </div>
  </div>
</div>

</template>

<script setup lang="ts">
    import Button from 'primevue/button';
</script>

<style>
:host { display: block; }

.notfound-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-tertiary) 100%);
}

.bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
}

.bg-circle-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #6366f1, transparent);
  top: -200px;
  right: -150px;
  animation: float 20s ease-in-out infinite;
}

.bg-circle-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #8b5cf6, transparent);
  bottom: -100px;
  left: -100px;
  animation: float 25s ease-in-out infinite reverse;
}

.bg-circle-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #06b6d4, transparent);
  top: 40%;
  left: 60%;
  animation: float 18s ease-in-out infinite 5s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -30px) scale(1.05); }
  50% { transform: translate(-20px, 20px) scale(0.95); }
  75% { transform: translate(20px, 30px) scale(1.02); }
}

.notfound-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 480px;
  text-align: center;
}

.error-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: clamp(6rem, 22vw, 10rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1.5rem;
}

.error-orb {
  width: clamp(5rem, 18vw, 8rem);
  height: clamp(5rem, 18vw, 8rem);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  box-shadow: 0 16px 40px rgba(99, 102, 241, 0.35);
  animation: float 6s ease-in-out infinite;

  mat-icon {
    color: white;
    font-size: clamp(2.5rem, 9vw, 4rem);
    width: clamp(2.5rem, 9vw, 4rem);
    height: clamp(2.5rem, 9vw, 4rem);
  }
}

.notfound-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.75rem;
}

.notfound-subtitle {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 auto 2rem;
  max-width: 26rem;
}

.notfound-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  button {
    height: 48px;
    border-radius: 12px;
    font-size: 0.9375rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1.5rem;
  }
}
.fade-slide-up {
  animation: fadeSlideUp 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>