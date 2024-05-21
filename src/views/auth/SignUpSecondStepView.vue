<template>
    <form class="mb-6" @submit.prevent>
        <div class="mb-6 grid gap-4">
            <v-input
                v-model="companyName"
                label="Company Name"
                placeholder="Enter your company name"
                name="companyName"
                required
            />

            <v-select
                v-model="activity"
                required
                name="activity"
                label="Activity"
                :options="['Museum', 'School', 'Cinema']"
                placeholder="Choose your activity"
            />

            <v-input
                v-model="jobTitle"
                label="Job Title"
                name="jobTitle"
                placeholder="Enter your job title"
            />

            <v-input
                v-model="companyWebsite"
                name="companyWebsite"
                label="Company Website"
                placeholder="Enter your company website"
            />

            <v-input
                v-model="phone"
                name="phone"
                type="number"
                label="Phone Number"
                placeholder="Enter your phone number"
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

            <v-button class="w-full"> Sign Up </v-button>
        </div>
    </form>
</template>

<script setup lang="ts">
    import VButton from '@/components/banner/VButton.vue';
    import VInput from '@/components/base/input/VInput.vue';
    import VSelect from '@/components/base/VSelect.vue';

    import { storeToRefs } from 'pinia';
    import { useSignUpStore } from '@/stores/sign-up.store.ts';

    const { companyName, jobTitle, activity, companyWebsite, phone } =
        storeToRefs(useSignUpStore());
</script>

<style scoped lang="postcss"></style>
