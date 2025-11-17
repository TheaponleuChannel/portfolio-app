<template>
    <section class="container mx-auto py-16">
        <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold mb-4" >About Me</h1>
            <h6 class="text-gray-500 max-w-2xl mx-auto">
                Learn more about my background, skills, and experience as a web developer.
            </h6>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20  max-sm:mx-5">
            <div class="img-section" >
                <ImageCompare class="shadow-lg rounded-2xl aspect-1">
                    <template #left>
                        <img src="../../assets/photo/pf-black.png" class="w-full h-full object-cover aspect-square" />
                    </template>
                    <template #right>
                        <img src="../../assets/photo/pf.jpg" class="w-full h-full object-cover aspect-square" />
                    </template>
                </ImageCompare>
            </div>

            <div class="flex flex-col justify-center" >
                <h2 class="text-3xl font-bold mb-6">
                    Hi, I'm <span class="gradient-text">Ponleu</span>
                 </h2>
                <p class="text-default-600 mb-4">
                    I'm a passionate Frontend Web Developer with over 2 years of experience in creating exceptional digital experiences. I specialize in building responsive, user-friendly websites and web applications using modern technologies.
                </p>
                <p class="text-default-600 mb-6">
                    My journey in web development began when I discovered my passion for creating interactive websites during college. Since then, I've worked with various clients across different industries, helping them achieve their digital goals through innovative solutions.
                </p>
          
                <div class="grid grid-cols-2 gap-4 mb-8">
                    <div>
                        <h3 class="font-semibold mb-2">Location</h3>
                        <p class="text-default-500 flex items-center gap-2">
                             <i class="pi pi-map-marker" style="font-size: 1rem; color: #3665ea"></i>

                            Phnom Penh, Cambodia
                        </p>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-2">Email</h3>
                        <p class="text-default-500 flex items-center gap-2">
                             <i class="pi pi-envelope" style="font-size: 1rem; color: #3665ea"></i>
                            ponleu.thea@gmail.com
                        </p>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-2">Experience</h3>
                        <p class="text-default-500 flex items-center gap-2">
                             <i class="pi pi-briefcase" style="font-size: 1rem; color: #3665ea"></i>
                            2+ Years
                        </p>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-2">Availability</h3>
                        <p class="text-default-500 flex items-center gap-2">
                             <i class="pi pi-check-circle" style="font-size: 1rem; color: #0ec968"></i>
                            Available for freelance
                        </p>
                    </div>
                </div>
          
                <div class="flex gap-4">
                    <Button label="Download CV" size="large" icon="pi pi-download" icon-pos="right" @click="onDownload()"/>
                    <RouterLink to="/contact">
                        <Button label="Contact Me" size="large" severity="primary" variant="outlined" />
                    </RouterLink>
                </div>
            </div>
        </div>

        <SkillSection />
        <div class="py-20">
            <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
                My Experience
            </h2>
            <p class="text-default-500 max-w-2xl mx-auto">
                A timeline of my professional journey and career highlights.
            </p>
            </div>
        <ExperienceTimeLine />
      </div>

    </section>
</template>

<script setup lang="ts">
    import Button from 'primevue/button';
    import ImageCompare from 'primevue/imagecompare';
    import SkillSection from '../shares/SkillSection.vue';
    import ExperienceTimeLine from '../shares/ExperienceTimeLine.vue';

    const onDownload = () => {
        // const link = document.createElement('a');
        // link.href = '/CV_Ponleu.pdf';
        // link.download = 'CV_Ponleu.pdf';
        // link.click();
    }

</script>

<style>
    .aspect-1 {
        aspect-ratio: 1/1 !important;
    }
</style>