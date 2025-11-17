<script setup lang="ts">
import Timeline from 'primevue/timeline';
import Card from 'primevue/card';
import { onMounted, ref, type Ref } from "vue";
import type { ExperienceTimeLine } from '../../models/experience-time-line';
import { experienceTimeLine } from '../../data/project';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

const experiences : Ref<ExperienceTimeLine[]> = ref([]);
onMounted(() => {
    experiences.value = experienceTimeLine;
})

</script>

<template>
    <div class="card">
        <Timeline :value="experiences" align="alternate" class="customized-timeline">
            <template #marker="slotProps">
                <Button :icon="`pi ${slotProps.item.icon}`" rounded :style="{'background-color': slotProps.item.backgroundColor}"/>
            </template>
            <template #content="slotProps">
                <Card class="mt-4 bg-white">
                    <template #title>
                        {{ slotProps.item.role }}
                    </template>
                    <template #subtitle>
                        {{ slotProps.item.period }}
                    </template>
                    <template #content>
                        <p class="text-default-500">
                           {{ slotProps.item.description }}
                        </p>
                        <Divider />
                    </template>
                    <template #footer>
                        <div class="flex flex-wrap gap-4 mt-1">
                            <div v-for="skill in slotProps.item.skills" :key="skill" class="flex ">
                                <div class="tag-bg p-1 rounded">
                                    <span class="flex items-start justify-items-start flex-wrap text-nowrap text-[#818188]">{{ skill }}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </Card>
            </template>
        </Timeline>
    </div>
</template>

<style scoped>
    @media screen and (max-width: 960px) {
        ::v-deep(.customized-timeline) {
            .p-timeline-event:nth-child(even) {
                flex-direction: row;

                .p-timeline-event-content {
                    text-align: left unset !important;
                }
            }

            .p-timeline-event-opposite {
                flex: 0;
            }
        }

    }

    ::v-deep.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content {
        text-align: left !important;
    }

    .tag-bg {
        background-color: #f4f4f5;
    }

    .my-app-dark .tag-bg {
        background-color: #27272a;
    }   

</style>