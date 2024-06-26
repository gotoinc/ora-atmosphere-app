import { ref } from 'vue';

import { defineStore } from 'pinia';

import router from '@/router';

export const useCatalogStore = defineStore(
    'catalog',
    () => {
        const selectedContentUrl = ref(
            'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4'
        );

        const isContentPopupOpen = ref(false);
        const isSimulatorLoaded = ref(false);
        const isVideoPlayerOpened = ref(false);
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
            selectedContentUrl,
            isSimulatorLoaded,
            isContentPopupOpen,
            isVideoPlayerOpened,
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
