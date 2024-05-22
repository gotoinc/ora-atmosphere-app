import { ref } from 'vue';

import { defineStore } from 'pinia';

export const useAuthStore = defineStore(
    'auth',
    () => {
        const isEmailConfirmed = ref(false);

        return {
            isEmailConfirmed,
        };
    },
    {
        persist: {
            paths: [],
        },
    }
);
