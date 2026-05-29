<script setup lang="ts">
import ContactForm from '../components/ContactForm.vue';
import InformationCard from '../components/InformationCard.vue';
import Location from '../components/Location.vue';

</script>

<template>
        <section class="container mx-auto py-16">
        <div class="text-center mb-16 scroll-hidden animate-fade-in-up">
            <h1 class="text-4xl md:text-5xl font-bold mb-4" >Get in Touch</h1>
            <h6 class="text-gray-500 max-w-2xl mx-auto">
                Have a project in mind or want to collaborate? Feel free to reach out!
            </h6>
        </div>
        <div 
          v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }" 
          class="scroll-hidden"
        >
            <InformationCard />
        </div>
        <div 
          v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }" 
          class="grid grid-cols-1 lg:grid-cols-2 gap-12 scroll-hidden anim-delay-200"
        >
            <ContactForm />
            <div>
                <Location/>
            </div>
        </div>
    </section>
</template>