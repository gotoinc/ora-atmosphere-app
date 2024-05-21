<template>
    <h2 class="mb-6 text-h5 font-light uppercase">Videos</h2>

    <div
        class="mb-36 grid grid-cols-5 gap-3.5 max-2xl:grid-cols-4 max-tab:grid-cols-3 max-sm:grid-cols-2 max-mob-md:grid-cols-1"
    >
        <video-card
            v-for="i in 5"
            :key="i"
            name="Title"
            :img="ThemeImg"
            @expand="openVideoPopup"
            @play="playSimulator"
        />

        <video-card
            v-for="i in 20"
            :key="i"
            disable
            name="Title"
            :img="ThemeImg"
            @expand="openVideoPopup"
            @play="playSimulator"
        />
    </div>

    <main-pagination :current-page="3" :total="100" :view-per-page="25" />
</template>

<script setup lang="ts">
    import ThemeImg from '@img/categories/theme-bg.jpg';

    import MainPagination from '@/components/base/MainPagination.vue';
    import VideoCard from '@/components/catalog/VideoCard.vue';

    import { useCatalogStore } from '@/stores/catalog.store.ts';

    const { openVideoPopup, playSimulator } = useCatalogStore();
</script>

<style scoped></style>
