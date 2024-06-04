<template>
    <form @submit.prevent="onSubmit">
        <div class="mb-6 grid gap-4">
            <v-input
                v-model="firstName"
                label="First Name"
                placeholder="Enter your first name"
                name="firstName"
                required
                :error="firstStepErrors.first_name"
            />

            <v-input
                v-model="lastName"
                label="Last Name"
                name="lastName"
                placeholder="Enter your last name"
                required
                :error="firstStepErrors.last_name"
            />

            <v-input
                v-model="email"
                name="email"
                label="Email"
                type="email"
                required
                placeholder="Enter your email"
                :error="firstStepErrors.email"
            />

            <v-input
                v-model="password"
                name="password"
                type="password"
                label="Password"
                required
                placeholder="Set your password"
                :error="firstStepErrors.password1"
                hint="Use 8 or more characters with a mix of letters, numbers & symbols"
            />

            <v-input
                v-model="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                required
                placeholder="Confirm your password"
                :error="firstStepErrors.password2"
            />
        </div>

        <v-checkbox
            v-model="isTermsAgreed"
            :error="firstStepErrors.agree_with_terms"
            class="mb-6"
        >
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

        <v-button class="w-full" type="submit"> Next </v-button>
    </form>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';

    import VInput from '@/components/base/input/VInput.vue';
    import VButton from '@/components/base/VButton.vue';
    import VCheckbox from '@/components/base/VCheckbox.vue';

    import { storeToRefs } from 'pinia';
    import { useSignUpStore } from '@/stores/sign-up.store.ts';

    const router = useRouter();

    const signUpStore = useSignUpStore();

    const {
        confirmPassword,
        password,
        isTermsAgreed,
        email,
        firstName,
        lastName,
        firstStepErrors,
    } = storeToRefs(signUpStore);

    const onSubmit = signUpStore.submitFirstStep(() => {
        void router.push({ name: 'signUpSecondStep' });
    });
</script>

<style scoped></style>
