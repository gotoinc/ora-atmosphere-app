import { ref } from 'vue';

import { defineStore } from 'pinia';

import router from '@/router';
import type { VideoContent } from '@/ts/contents';

export const useCatalogStore = defineStore(
    'oraCatalog',
    () => {
        const selectedContent = ref<VideoContent>();
        const contentToPlay = ref<VideoContent | null>(null);

        const isContentPopupOpen = ref(false);
        const isSimulatorLoading = ref(false);
        const isVideoPlayerOpened = ref(false);
        const isDescriptionOpen = ref(false);

        const openVideoPopup = (content: VideoContent) => {
            isContentPopupOpen.value = true;
            isDescriptionOpen.value = true;

            selectedContent.value = content;
        };

        const playSimulator = () => {
            isSimulatorLoading.value = true;
            void router.push({ name: 'simulatorView' });
        };

        return {
            isDescriptionOpen,
            selectedContent,
            isSimulatorLoading,
            isContentPopupOpen,
            isVideoPlayerOpened,
            contentToPlay,
            playSimulator,
            openVideoPopup,
        };
    },
    {
        persist: {
            paths: ['contentToPlay'],
        },
    }
);
