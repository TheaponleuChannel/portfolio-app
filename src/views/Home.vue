<template>
        <div class="relative py-10 ">
            <div
              v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }"
              class="scroll-hidden"
            >
                <InfoInterest/>
            </div>
            <!-- <div
              v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }"
              class="scroll-hidden"
            >
                <TechStack/>
            </div> -->
            <div
              v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }"
              class="scroll-hidden anim-delay-100"
            >
                <State/>
            </div>
            <div
              v-scroll-reveal="{ enterClass: 'animate-fade-in-up' }"
              class="scroll-hidden anim-delay-200"
            >
                <ProjectFeature/>
            </div>
            <div
              v-scroll-reveal="{ enterClass: 'animate-zoom-in' }"
              class="scroll-hidden-zoom anim-delay-200"
            >
                <CallToAction/>
            </div>
        </div>
</template>

<script setup lang="ts">
import CallToAction from '../components/CallToAction.vue';
import InfoInterest from '../components/InfoInterest.vue';
import ProjectFeature from '../components/ProjectFeature.vue';
import State from '../components/State.vue';
import TechStack from '../components/TechStack.vue';
</script>
