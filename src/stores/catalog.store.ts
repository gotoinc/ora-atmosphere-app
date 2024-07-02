import { ref } from 'vue';

import { defineStore } from 'pinia';

import router from '@/router';

export const useCatalogStore = defineStore(
    'catalog',
    () => {
        const selectedContent = ref({
            id: 1,
            title: 'Sample Title',
            description: 'This is a sample description',
            file: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
            languages: [
                {
                    id: 1,
                    name: 'English',
                },
                {
                    id: 2,
                    name: 'Spanish',
                },
            ],
            tags: 'sample, test, example',
            requires_auth: true,
            image: '/images/banner.jpg',
            audio: [
                {
                    id: 2,
                    name: 'Test',
                    file: '/audio/test.mp3',
                },
                {
                    id: 3,
                    name: 'Test 2',
                    file: '/audio/test-2.mp3',
                },
            ],
            speech: true,
            duration: 3600,
            date_created: '2023-01-01T00:00:00Z',
            topic_name: 'Sample Topic',
        });

        const isContentPopupOpen = ref(false);
        const isSimulatorLoading = ref(false);
        const isVideoPlayerOpened = ref(false);
        const isDescriptionOpen = ref(false);

        const openVideoPopup = () => {
            isContentPopupOpen.value = true;
            isDescriptionOpen.value = true;
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
