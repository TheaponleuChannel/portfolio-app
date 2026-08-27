
  
<template>
    <SpeedInsights/>
    <Analytics/>
    <Layout/>
</template>

<script setup lang="ts">
import Layout from './layout/Layout.vue';
import { SpeedInsights } from "@vercel/speed-insights/vue"
import { Analytics } from '@vercel/analytics/vue';
</script>

<style scoped>

</style>
