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
        />

        <video-card
            v-for="i in 20"
            :key="i"
            disable
            name="Title"
            :img="ThemeImg"
            @expand="openVideoPopup"
        />
    </div>
</template>

<script setup lang="ts">
    import ThemeImg from '@img/categories/theme-bg.jpg';

    import VideoCard from '@/components/catalog/VideoCard.vue';

    import { useCatalogStore } from '@/stores/catalog.store.ts';

    const { openVideoPopup } = useCatalogStore();
</script>

<style scoped></style>
