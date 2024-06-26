<template>
    <v-popup v-model="isVideoPlayerOpened" class="z-[51]" is-empty>
        <template #body>
            <video-player
                title="Marine Whales"
                poster="/images/banner.jpg"
                @close="isVideoPlayerOpened = false"
            />
        </template>
    </v-popup>
</template>

<script setup lang="ts">
    import VPopup from '@/components/popup/VPopup.vue';
    import VideoPlayer from '@/components/video-player/VideoPlayer.vue';

    import { storeToRefs } from 'pinia';
    import { useCatalogStore } from '@/stores/catalog.store.ts';

    const catalogStore = useCatalogStore();

    const { isVideoPlayerOpened } = storeToRefs(catalogStore);
</script>

<style scoped></style>
