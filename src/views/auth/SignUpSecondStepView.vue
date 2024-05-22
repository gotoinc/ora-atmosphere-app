<template>
    <form class="mb-6" @submit.prevent="onSubmit">
        <div class="mb-6 grid gap-4">
            <v-input
                v-model="companyName"
                label="Company Name"
                placeholder="Enter your company name"
                name="companyName"
                required
                :error="secondStepErrors.companyName"
            />

            <v-select
                v-model="activity"
                required
                name="activity"
                label="Activity"
                :options="activitiesList"
                placeholder="Choose your activity"
                :error="secondStepErrors.activity"
            />

            <v-input
                v-model="jobTitle"
                label="Job Title"
                name="jobTitle"
                placeholder="Enter your job title"
                :error="secondStepErrors.jobTitle"
            />

            <v-input
                v-model="companyWebsite"
                name="companyWebsite"
                label="Company Website"
                placeholder="Enter your company website"
                :error="secondStepErrors.companyWebsite"
            />

            <v-input
                v-model="phone"
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
                :error="secondStepErrors.phone"
            />
        </div>

        <div class="flex gap-4 max-mob:flex-col">
            <v-button
                :to="{ name: 'signUpFirstStep' }"
                variant="outline"
                class="w-full"
            >
                Back
            </v-button>

            <v-button type="submit" class="w-full"> Sign Up </v-button>
        </div>
    </form>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';

    import VButton from '@/components/banner/VButton.vue';
    import VInput from '@/components/base/input/VInput.vue';
    import VSelect from '@/components/base/VSelect.vue';

    import { storeToRefs } from 'pinia';
    import { useSignUpStore } from '@/stores/sign-up.store.ts';

    import activitiesList from '@/constants/activities-list.ts';

    const signUpStore = useSignUpStore();

    const router = useRouter();

    const {
        companyName,
        jobTitle,
        activity,
        companyWebsite,
        phone,
        secondStepErrors,
    } = storeToRefs(signUpStore);

    const onSubmit = signUpStore.submitSecondStep(() => {
        void router.push({ name: 'main' });
    });
</script>

<style scoped lang="postcss"></style>
