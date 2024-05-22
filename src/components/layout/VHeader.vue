<template>
    <header class="relative left-0 top-0 z-50 w-full bg-gradient">
        <div class="cont flex items-center justify-between !py-6 xl:relative">
            <main-logo hide-label-on-mobile />

            <div v-if="!isAuthenticated" class="flex gap-2">
                <v-button :to="{ name: 'signInView' }" variant="text">
                    Sign in
                </v-button>

                <v-button :to="{ name: 'signUpView' }" variant="white">
                    Sign up
                </v-button>
            </div>

            <user-actions v-else />
        </div>
    </header>
</template>

<script setup lang="ts">
    import VButton from '@/components/banner/VButton.vue';
    import MainLogo from '@/components/base/MainLogo.vue';
    import UserActions from '@/components/base/UserActions.vue';

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth.store.ts';

    const { isAuthenticated } = storeToRefs(useAuthStore());
</script>

<style scoped>
    header {
        margin-bottom: -82px;
    }
</style>
