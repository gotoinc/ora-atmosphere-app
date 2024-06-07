import { ref } from 'vue';

import type { VideoContent } from '@/ts/interfaces/contents';

import { defineStore } from 'pinia';

import router from '@/router';

export const useCatalogStore = defineStore(
    'catalog',
    () => {
        const selectedContent = ref<VideoContent>();

        const isContentPopupOpen = ref(false);
        const isSimulatorLoaded = ref(false);
        const isDescriptionOpen = ref(false);

        const openVideoPopup = () => {
            isContentPopupOpen.value = true;
            isDescriptionOpen.value = true;
        };

        const playSimulator = () => {
            void router.push({ name: 'simulatorView' });
        };

        return {
            isDescriptionOpen,
            selectedContent,
            isSimulatorLoaded,
            isContentPopupOpen,
            playSimulator,
            openVideoPopup,
        };
    },
    {
        persist: {
            paths: [],
        },
    }
);
