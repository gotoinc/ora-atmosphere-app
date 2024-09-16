<template>
    <div class="mb-6">
        <h1 class="mb-2 text-h2">Sign Up</h1>

        <p class="mb-6 text-base text-grey-100">
            Sign up to access our entire catalog
        </p>

        <p class="text-base font-semibold text-grey-100">
            Step {{ route.name === 'signUpFirstStep' ? 1 : 2 }} of 2
        </p>
    </div>

    <router-view></router-view>

    <div class="mt-6">
        <p class="mb-2 text-grey-100">
            Already have an account?
            <router-link
                class="font-medium text-dark underline hover:text-primary-100"
                :to="{ name: 'signInView' }"
            >
                Sign In
            </router-link>
        </p>

        <p v-if="false" class="text-grey-100">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <a
                href="#"
                target="_blank"
                class="text-dark hover:text-primary-100"
            >
                Learn more.
            </a>
        </p>
    </div>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router';

    const route = useRoute();
</script>

<style scoped></style>
