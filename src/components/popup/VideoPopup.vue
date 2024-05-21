<template>
    <teleport to="body">
        <v-popup v-model="isContentPopupOpen" is-empty>
            <template #body>
                <div class="relative">
                    <video-card
                        class="w-full max-w-[566px]"
                        :expand-on-hover="false"
                        name="Title"
                        :open-description="isDescriptionOpen"
                        :img="ThemeImg"
                        @play="catalogStore.playSimulator"
                        @expand="isDescriptionOpen = !isDescriptionOpen"
                    />

                    <button
                        class="absolute right-4 top-4 z-20 rounded transition-colors hover:bg-white-15"
                        @click="isContentPopupOpen = false"
                    >
                        <component
                            :is="IconCross"
                            class="h-10 w-10 text-white-100"
                        />
                    </button>
                </div>
            </template>
        </v-popup>
    </teleport>
</template>

<script setup lang="ts">
    import ThemeImg from '@img/categories/theme-bg.jpg';
    import IconCross from '@img/icons/cross.svg?component';

    import VideoCard from '@/components/catalog/VideoCard.vue';
    import VPopup from '@/components/popup/VPopup.vue';

    import { storeToRefs } from 'pinia';
    import { useCatalogStore } from '@/stores/catalog.store.ts';

    const catalogStore = useCatalogStore();

    const { isContentPopupOpen, isDescriptionOpen } = storeToRefs(catalogStore);
</script>

<style scoped></style>
