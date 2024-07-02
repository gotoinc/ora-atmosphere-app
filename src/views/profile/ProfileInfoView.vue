<template>
    <form @submit.prevent="onSubmit">
        <div class="mb-8 grid gap-4">
            <v-input
                v-model="firstName"
                name="firstName"
                placeholder="Enter your first name"
                variant="white"
                label="First Name"
                :error="errors.firstName"
            />

            <v-input
                v-model="lastName"
                variant="white"
                label="Last Name"
                name="lastName"
                placeholder="Enter your last name"
                :error="errors.lastName"
            />

            <v-input
                v-model="companyName"
                label="Company Name"
                placeholder="Enter your company name"
                name="companyName"
                variant="white"
                :error="errors.companyName"
            />

            <v-select
                v-model="activity"
                variant="white"
                name="activity"
                label="Activity"
                :options="activitiesList"
                placeholder="Choose your activity"
                :error="errors.activity"
            />

            <v-input
                v-model="jobTitle"
                variant="white"
                label="Job Title"
                optional
                name="jobTitle"
                placeholder="Enter your job title"
                :error="errors.jobTitle"
            />

            <v-input
                v-model="companyWebsite"
                variant="white"
                optional
                name="companyWebsite"
                label="Company Website"
                placeholder="Enter your company website"
                :error="errors.companyWebsite"
            />

            <v-input
                v-model="phone"
                variant="white"
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
                :error="errors.phone"
            />

            <v-input
                v-model="email"
                variant="white"
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                :error="errors.email"
            />
        </div>

        <v-button class="w-full" type="submit"> Save changes </v-button>
    </form>
</template>

<script setup lang="ts">
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import VInput from '@/components/base/input/VInput.vue';
    import VButton from '@/components/base/VButton.vue';
    import VSelect from '@/components/base/VSelect.vue';

    import activitiesList from '@/constants/activities-list.ts';
    import profileJSON from '@/fixtures/profile.json';
    import { useCompareObjects } from '@/hooks/useCompareObjects.ts';
    import {
        signUpFirstStepSchema,
        signUpSecondStepSchema,
    } from '@/validations/schemas/auth.schema.ts';
    import type {
        SignUpFirstStep,
        SignUpSecondStep,
    } from '@/validations/types/auth';

    const toast = useToast();

    const profileInfoSchema = signUpFirstStepSchema
        .omit(['password', 'confirmPassword', 'isTermsAgreed'])
        .concat(signUpSecondStepSchema);

    interface ProfileInfo
        extends Omit<
                SignUpFirstStep,
                'password' | 'confirmPassword' | 'isTermsAgreed'
            >,
            SignUpSecondStep {}

    const { defineField, errors, handleSubmit } = useForm<ProfileInfo>({
        validationSchema: profileInfoSchema,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        initialValues: profileJSON,
    });

    const [firstName] = defineField('firstName');
    const [lastName] = defineField('lastName');
    const [companyName] = defineField('companyName');
    const [activity] = defineField('activity');
    const [jobTitle] = defineField('jobTitle');
    const [companyWebsite] = defineField('companyWebsite');
    const [phone] = defineField('phone');
    const [email] = defineField('email');

    const onSubmit = handleSubmit((values) => {
        if (useCompareObjects(profileJSON, values)) {
            toast.error('No changes were captured');
        } else {
            toast.success('Saved successfully');
        }
    });
</script>

<style scoped></style>
