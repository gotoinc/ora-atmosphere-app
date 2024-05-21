<template>
    <form @submit.prevent>
        <div class="mb-6 grid gap-4">
            <v-input
                v-model="firstName"
                label="First Name"
                placeholder="Enter your first name"
                name="firstName"
                required
            />

            <v-input
                v-model="lastName"
                label="Last Name"
                name="lastName"
                placeholder="Enter your last name"
                required
            />

            <v-input
                v-model="email"
                name="email"
                label="Email"
                type="email"
                required
                placeholder="Enter your email"
            />

            <v-input
                v-model="password"
                name="password"
                type="password"
                label="Password"
                required
                placeholder="Set your password"
            />

            <v-input
                v-model="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                required
                placeholder="Confirm your password"
            />
        </div>

        <v-checkbox v-model="isTermsChecked" class="mb-6">
            <span>
                Agree to our
                <a href="#" class="underline hover:text-primary-100">
                    Terms of use
                </a>

                and

                <a href="#" class="underline hover:text-primary-100">
                    Privacy Policy
                </a>
            </span>
        </v-checkbox>

        <v-button :to="{ name: 'signUpSecondStep' }" class="w-full">
            Next
        </v-button>
    </form>
</template>

<script setup lang="ts">
    import VButton from '@/components/banner/VButton.vue';
    import VInput from '@/components/base/input/VInput.vue';
    import VCheckbox from '@/components/base/VCheckbox.vue';

    import { storeToRefs } from 'pinia';
    import { useSignUpStore } from '@/stores/sign-up.store.ts';

    const {
        confirmPassword,
        password,
        isTermsChecked,
        email,
        firstName,
        lastName,
    } = storeToRefs(useSignUpStore());
</script>

<style scoped></style>
