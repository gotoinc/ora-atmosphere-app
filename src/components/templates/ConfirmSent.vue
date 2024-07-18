<template>
    <div class="mb-6">
        <h1 class="mb-2 text-center text-h2">Link sent!</h1>

        <p class="text-center text-base text-grey-100">
            <slot name="text">
                A password reset link has been sent to your email address
            </slot>
        </p>
    </div>

    <v-button class="w-full" :to="{ name: 'signInView' }">
        Go to Sign in
    </v-button>
</template>

<script setup lang="ts">
    import VButton from '@/components/base/VButton.vue';
</script>

<style scoped lang="postcss"></style>
