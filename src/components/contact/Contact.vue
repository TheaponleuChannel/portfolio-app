<script setup lang="ts">
import ContactForm from '../shares/ContactForm.vue';
import InformationCard from '../shares/InformationCard.vue';
import Location from '../shares/Location.vue';

</script>

<template>
        <section class="container mx-auto py-16">
        <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold mb-4" >Get in Touch</h1>
            <h6 class="text-gray-500 max-w-2xl mx-auto">
                Have a project in mind or want to collaborate? Feel free to reach out!
            </h6>
        </div>
        <InformationCard />
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <div>
                <Location/>
            </div>
        </div>
    </section>
</template>