import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import Cookies from 'js-cookie';

import type { UserProfile } from '@/ts/interfaces/profile';

import { defineStore } from 'pinia';

import { getProfile } from '@/api/auth/get-profile.ts';

const toast = useToast();

export const useAuthStore = defineStore('auth', () => {
    const isEmailConfirmed = ref(true);
    const isProfileLoading = ref(false);
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
        isProfileLoading.value = true;

        try {
            profileData.value = await getProfile();
        } catch (e) {
            toast.error('Profile is not found');
        } finally {
            isProfileLoading.value = false;
        }
    };

    return {
        isEmailConfirmed,
        isAuthenticated,
        profileData,
        isProfileLoading,
        getProfileData,
        logout,
        login,
    };
});
