<template>
    <div>
        <Toast/>
        <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
        <p className="text-default-500 mb-8">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
        </p>
        <Card>
            <template #title>Get in Touch</template>
            <template #content>
                <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full">
                    <IftaLabel >
                        <label for="name">Name *</label>
                        <InputText id="name" placeholder="Your Name" name="name" class="w-full"/>
                         <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name?.error?.message }}</Message>
                    </IftaLabel>
                    <IftaLabel >
                        <label for="email">Email *</label>
                        <InputText id="email" placeholder="your.email@example.com" name="email" class="w-full"/>
                         <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
                    </IftaLabel>
                    <IftaLabel >
                        <label for="subject">Subject *</label>
                        <InputText id="subject" placeholder="What is your regarding?" name="subject" class="w-full"/>
                         <Message v-if="$form.subject?.invalid" severity="error" size="small" variant="simple">{{ $form.subject.error.message }}</Message>
                    </IftaLabel>
                    <IftaLabel >
                        <label for="email">Message *</label>
                        <Textarea name="message" placeholder="Your message here..." rows="5" cols="30" style="resize: none" class="w-full" />
                        <Message v-if="$form.message?.invalid" severity="error" size="small" variant="simple">{{ $form.message.error?.message }}</Message>
                    </IftaLabel>
                    <Button type="submit" severity="contrast" label="Send Message" size="large" />
                </Form>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
    import Card from 'primevue/card';
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import Textarea from 'primevue/textarea';
    import Message from 'primevue/message';
    import Form, {  type FormSubmitEvent } from '@primevue/forms/form';
    import { reactive } from 'vue';
    import Toast from 'primevue/toast';
    import { useToast } from "primevue/usetoast";
    import IftaLabel from 'primevue/iftalabel';
    import type { useFormResolverOptions } from '@primevue/forms/useform';

    const toast = useToast();
    const initialValues = reactive({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const resolver = (formResolverOptions : useFormResolverOptions) => {
        const errors: Record<string, { message: string }[]> = {};
        if (!formResolverOptions.values.name) {
            errors.name = [{ message: 'Name is required' }];
        }
        if (!formResolverOptions.values.email) {
            errors.email = [{ message: 'Email is required' }];
        }
        if (!formResolverOptions.values.subject) {
            errors.subject = [{ message: 'Subject is required' }];
        }
        if (!formResolverOptions.values.message) {
            errors.message = [{ message: 'Message is required' }];
        }
        return { errors, values: formResolverOptions.values}; // will emit when submit form
    };

    const onFormSubmit = (event: FormSubmitEvent) => {
        if(event.valid) {
            toast.add({
                severity:'success', 
                summary: 'Message send', 
                detail:'Your message has been sent successfully', 
                life: 3000
            });

            console.log('send data', event.values);
        } else {
            toast.add({
                severity:'error', 
                summary: 'Error', 
                detail:'Please check your form', 
                life: 3000
            });
        }
    };

</script>
<style scoped></style>