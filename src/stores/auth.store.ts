import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import Cookies from 'js-cookie';

import { defineStore } from 'pinia';

import { authLogin } from '@/api/auth/auth-login.api.ts';
import { authLogout } from '@/api/auth/auth-logout.api.ts';
import { getProfile } from '@/api/auth/get-profile.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { UserProfile } from '@/ts/profile';
import type { SignInInput } from '@/validations/types/auth';

const toast = useToast();

export const useAuthStore = defineStore('auth', () => {
    const isEmailConfirmed = ref(true);
    const isProfileLoading = ref(false);
    const isAuthenticated = ref(!!Cookies.get('ora_auth'));
    const profileData = ref<UserProfile | undefined>();

    const clearAuth = () => {
        Cookies.remove('ora_auth');
        isAuthenticated.value = false;
    };

    // Logout functionality
    const logout = async () => {
        try {
            const res = await authLogout();

            if (res) {
                clearAuth();

                toast.success(res.detail);
            }
        } catch (e) {
            toast.error('Logout error');
        }
    };

    // Login functionality
    const login = async (body: SignInInput, remember?: boolean) => {
        try {
            const res = await authLogin(body);

            if (res) {
                Cookies.set('ora_auth', res.key, {
                    expires: remember ? 14 : undefined,
                    sameSite: 'Strict',
                    secure: true,
                });

                toast.success('Login success');

                isAuthenticated.value = true;
            }
        } catch (err) {
            toast.error('Unable to log in with provided credentials.');

            useThrowError(err);
        }
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
        clearAuth,
        logout,
        login,
    };
});
