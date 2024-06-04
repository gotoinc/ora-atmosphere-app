import { ref } from 'vue';

import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
    const isEmailConfirmed = ref(false);
    const isAuthenticated = ref(false);

    const logout = () => {
        isAuthenticated.value = false;
    };

    return {
        isEmailConfirmed,
        isAuthenticated,
        logout,
    };
});
