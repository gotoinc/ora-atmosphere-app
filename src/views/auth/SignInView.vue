<template>
    <div class="mx-auto">
        <h1 class="mb-6 text-h2">Sign In</h1>

        <form class="mb-6" @submit.prevent>
            <div class="grid gap-4">
                <v-input
                    v-model="email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                />

                <v-input
                    v-model="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Set your password"
                />
            </div>

            <div class="my-6 flex flex-wrap items-center justify-between gap-4">
                <v-checkbox v-model="isRememberChecked">
                    Remember me
                </v-checkbox>

                <router-link
                    class="underline hover:text-primary-100"
                    :to="{ name: 'resetPasswordView' }"
                >
                    Forgot Password?
                </router-link>
            </div>

            <v-button class="w-full"> Sign In </v-button>
        </form>

        <p>
            Don’t have an account?
            <router-link
                class="underline hover:text-primary-100"
                :to="{ name: 'signUpView' }"
            >
                Sign Up
            </router-link>
        </p>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import VButton from '@/components/banner/VButton.vue';
    import VInput from '@/components/base/input/VInput.vue';
    import VCheckbox from '@/components/base/VCheckbox.vue';

    const email = ref('');
    const password = ref('');
    const isRememberChecked = ref(false);
</script>

<style scoped></style>
