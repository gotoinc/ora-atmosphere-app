import { ref } from 'vue';

import { defineStore } from 'pinia';

export const useSimulatorStore = defineStore(
    'simulator',
    () => {
        const selectedContentUrl = ref(
            'https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bmF0dXJhbHxlbnwwfHx8fDE3MTY4MDYwMjV8MA&ixlib=rb-4.0.3'
        );

        const isSimulatorLoaded = ref(false);

        return {
            selectedContentUrl,
            isSimulatorLoaded,
        };
    },
    {
        persist: {
            paths: [],
        },
    }
);
