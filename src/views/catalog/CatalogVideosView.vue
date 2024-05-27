<template>
    <h2 class="mb-6 text-h5 font-light uppercase">Videos</h2>

    <div
        class="mb-36 grid grid-cols-5 gap-3.5 max-2xl:grid-cols-4 max-tab:grid-cols-3 max-sm:grid-cols-2 max-mob-md:grid-cols-1"
    >
        <video-card v-for="i in 25" :key="i" name="Title" :img="ThemeImg" />
    </div>
</template>

<script setup lang="ts">
    import ThemeImg from '@img/categories/theme-bg.jpg';

    import VideoCard from '@/components/catalog/VideoCard.vue';
</script>

<style scoped></style>
