<template>
    <div class="flex h-screen w-screen items-center justify-center">
        <div class="container text-center">
            <h1 class="mb-5 text-h1">404</h1>

            <p class="mb-5 text-2xl">Page not found</p>

            <v-button to="/"> Home </v-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import VButton from '@/components/base/VButton.vue';
</script>

<style scoped></style>
