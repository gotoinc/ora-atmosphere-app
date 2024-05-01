<template>
    <header class="absolute left-0 top-0 z-50 w-full bg-gradient py-6">
        <div class="cont flex items-center justify-between">
            <main-logo />

            <v-button variant="outline" :to="{ name: 'catalogView' }">
                Catalog
            </v-button>
        </div>
    </header>
</template>

<script setup lang="ts">
    import VButton from '@/components/banner/VButton.vue';
    import MainLogo from '@/components/base/MainLogo.vue';
</script>

<style scoped></style>
