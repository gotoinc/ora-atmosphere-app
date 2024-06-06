import { ref } from 'vue';
import Cookies from 'js-cookie';

import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
    const isEmailConfirmed = ref(false);
    const isAuthenticated = ref(!!Cookies.get('ora'));

    const logout = () => {
        Cookies.remove('ora');
        isAuthenticated.value = false;
    };

    const login = (token: string) => {
        Cookies.set('ora', token, {
            expires: 7,
            sameSite: 'strict',
            secure: true,
        });

        isAuthenticated.value = true;
    };

    return {
        isEmailConfirmed,
        isAuthenticated,
        logout,
        login,
    };
});
