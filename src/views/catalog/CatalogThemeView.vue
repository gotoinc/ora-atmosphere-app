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

    <teleport to="body">
        <v-popup v-model="isVideoOpen" is-empty>
            <template #body>
                <div class="relative">
                    <video-card
                        class="w-full max-w-[566px]"
                        :expand-on-hover="false"
                        name="Title"
                        :open-description="isDescriptionOpen"
                        :img="ThemeImg"
                        @expand="isDescriptionOpen = !isDescriptionOpen"
                    />

                    <button
                        class="absolute right-4 top-4 z-20 rounded transition-colors hover:bg-white-15"
                        @click="isVideoOpen = false"
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
    import { ref } from 'vue';
    import ThemeImg from '@img/categories/theme-bg.jpg';
    import IconCross from '@img/icons/cross.svg?component';

    import VideoCard from '@/components/catalog/VideoCard.vue';
    import VPopup from '@/components/popup/VPopup.vue';

    const isVideoOpen = ref(false);
    const isDescriptionOpen = ref(false);

    const openVideoPopup = () => {
        isVideoOpen.value = true;
        isDescriptionOpen.value = true;
    };
</script>

<style scoped></style>
