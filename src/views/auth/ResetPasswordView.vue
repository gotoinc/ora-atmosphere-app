<template>
    <div class="mx-auto">
        <template v-if="isRequestSent">
            <div class="mb-6">
                <h1 class="mb-2 text-h2">Link sent!</h1>

                <p class="text-base text-grey-100">
                    A password reset link has been sent to your email address
                </p>
            </div>

            <v-button class="w-full" :to="{ name: 'signInView' }">
                Back to Sign in
            </v-button>
        </template>

        <template v-else>
            <div class="mb-6">
                <h1 class="mb-2 text-h2">Forgot your password</h1>

                <p class="text-base text-grey-100">
                    Enter the email address associated with your account and
                    we'll send you a link to reset your password.
                </p>
            </div>

            <form class="mb-6" @submit.prevent>
                <v-input
                    v-model="email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    class="mb-6"
                />

                <v-button class="w-full" @click="isRequestSent = true">
                    Continue
                </v-button>
            </form>

            <p>
                Don’t have an account?
                <router-link
                    class="underline hover:text-primary-100"
                    :to="{ name: 'signUpView' }"
                >
                    Sign In
                </router-link>
            </p>
        </template>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import VButton from '@/components/banner/VButton.vue';
    import VInput from '@/components/base/input/VInput.vue';

    const email = ref('');
    const isRequestSent = ref(false);
</script>

<style scoped></style>
