import { ref } from 'vue';
import { useToast } from 'vue-toastification';

import type { VideoContent } from '@/ts/interfaces/contents';

import { defineStore } from 'pinia';

import router from '@/router';

const toast = useToast();

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
            console.log(true);
            if (selectedContent.value?.file) {
                console.log(true);
                void router.push({ name: 'simulatorView' });
            } else {
                toast.error('File not found');
            }
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
            paths: ['selectedContent'],
        },
    }
);
