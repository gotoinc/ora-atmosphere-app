<template>
    <teleport to="body">
        <v-popup v-model="isPopupOpen" class="z-[51]" is-empty>
            <template #body>
                <video-player
                    src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
                />
            </template>
        </v-popup>
    </teleport>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import VPopup from '@/components/popup/VPopup.vue';
    import VideoPlayer from '@/components/video-player/VideoPlayer.vue';

    const isPopupOpen = ref(true);
</script>

<style></style>
