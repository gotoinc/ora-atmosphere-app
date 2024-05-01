<template>
    <v-header />

    <main class="flex-grow">
        <router-view></router-view>
    </main>

    <v-footer />
</template>

<script setup lang="ts">
    import VFooter from '@/components/layout/VFooter.vue';
    import VHeader from '@/components/layout/VHeader.vue';
</script>

<style scoped></style>
