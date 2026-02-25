<script setup lang="ts">
    import Button from 'primevue/button';
</script>

<template>
    <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-12">
            <div class="flex-1 text-center md:text-left">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    <span>Hi, I'm </span>
                    <span class="gradient-text">Ponleu</span>
                </h1>
                <h2 class="text-2xl md:text-3xl font-medium text-default-600 mb-6">
                    Frontend Web Developer
                </h2>
                <p class="text-default-500 text-lg mb-8 max-w-lg mx-auto md:mx-0">
                    I build exceptional digital experiences with modern technologies.
                    Specializing in creating responsive websites, web applications, and
                    interactive user interfaces.
                </p>
                <div class="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Button label="View Projects" size="large" severity="primary" icon="pi pi-arrow-right" icon-pos="right" />
                    <Button label="Contact Me" size="large" severity="primary" variant="outlined" />
                </div>
            </div>
            <div class="flex-1 card-board">
                <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-400 via-slate-700 to-gray-800 rounded-3xl rotate-3 scale-105" />
                    <div class="relative bg-wrap-content p-6 rounded-3xl shadow-lg">
                        <div class="flex items-center gap-2 mb-4">
                        <div class="w-3 h-3 rounded-full bg-danger-500" />
                        <div class="w-3 h-3 rounded-full bg-warning-500" />
                        <div class="w-3 h-3 rounded-full bg-success-500" />
                        </div>
                        <div class="space-y-4">
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 bg-[#cee1fc] rounded-md flex items-center justify-center text-primary-500">
                                <i class="pi pi-code" style="color: #3665ea; font-size: 1.2rem;" ></i>

                            </div>
                            <div>
                            <p class="text-sm font-medium">Web Development</p>
                            <p class="text-xs text-default-500">Angular, Vue, Node.js</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 bg-[#e5d3f3] rounded-md flex items-center justify-center text-secondary-500">
                                <i class="pi pi-th-large" style="color: #7e0fc5; font-size: 1.2rem;" ></i>

                            </div>
                            <div>
                            <p class="text-sm font-medium">UI/UX Design</p>
                            <p class="text-xs text-default-500">Figma, Adobe XD</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 rounded-md flex items-center justify-center bg-[#d1f4e0] text-success-500">
                                <i class="pi pi-database" style="color: #0ec968; font-size: 1.2rem;" ></i>

                            </div>
                            <div>
                            <p class="text-sm font-medium">Backend Development</p>
                            <p class="text-xs text-default-500">MongoDB, MySQL</p>
                            </div>
                        </div>
                        <div class="h-32 bg-content rounded-lg flex items-center justify-center">
                            <p class="text-default-500 text-sm">Your vision, my code.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>