<script setup lang="ts">
    import Button from 'primevue/button';
</script>

<template>
    <section class="py-20 relative overflow-hidden">
      <!-- {/* Background elements */} -->
      <div class="absolute inset-0 -z-10 overflow-hidden">
        <div class="absolute right-1/4 top-1/3 -z-10 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl" />
        <div class="absolute left-1/4 bottom-1/3 -z-10 h-64 w-64 rounded-full bg-secondary-500/10 blur-3xl" />
      </div>
      
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            Ready to bring your project to life?
          </h2>
          <p class="text-default-500 text-lg mb-8 max-w-xl mx-auto">
            Let's collaborate to create something amazing together. Whether you have a specific project in mind or just want to discuss possibilities, I'm here to help.
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
                <Button label="Get in Touch" size="large" severity="primary" />
                <RouterLink to="/project">
                    <Button label="View My Work" size="large" severity="primary" variant="outlined" />
                </RouterLink>
          </div>
        </div>
      </div>
    </section>
</template>