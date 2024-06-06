import { ref } from 'vue';
import Cookies from 'js-cookie';

import type { UserProfile } from '@/ts/interfaces/profile';

import { defineStore } from 'pinia';

import { getProfile } from '@/api/auth/get-profile.ts';

export const useAuthStore = defineStore('auth', () => {
    const isEmailConfirmed = ref(true);
    const isAuthenticated = ref(!!Cookies.get('ora'));
    const profileData = ref<UserProfile | undefined>();

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

    const getProfileData = async () => {
        profileData.value = await getProfile();
    };

    return {
        isEmailConfirmed,
        isAuthenticated,
        profileData,
        getProfileData,
        logout,
        login,
    };
});
