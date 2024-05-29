import { ref } from 'vue';

import { defineStore } from 'pinia';

export const useCatalogStore = defineStore(
    'catalog',
    () => {
        const selectedContentUrl = ref(
            'https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bmF0dXJhbHxlbnwwfHx8fDE3MTY4MDYwMjV8MA&ixlib=rb-4.0.3'
        );

        const isContentPopupOpen = ref(false);
        const isSimulatorLoaded = ref(false);
        const isDescriptionOpen = ref(false);

        const openVideoPopup = () => {
            isContentPopupOpen.value = true;
            isDescriptionOpen.value = true;
        };

        return {
            isDescriptionOpen,
            selectedContentUrl,
            isSimulatorLoaded,
            isContentPopupOpen,
            openVideoPopup,
        };
    },
    {
        persist: {
            paths: [],
        },
    }
);
