<template>
    <header class="relative left-0 top-0 z-50 w-full bg-gradient">
        <div class="cont flex items-center !py-4 xl:relative">
            <main-logo
                class="mr-20 flex-shrink-0 max-2lg:mr-6"
                hide-label-on-mobile
            />

            <main-search class="mr-auto max-lg:ml-auto max-lg:mr-2.5" />

            <div v-if="!isAuthenticated" class="flex flex-shrink-0 gap-2">
                <v-button
                    class="max-mob-lg:hidden"
                    :to="{ name: 'signInView' }"
                    variant="text"
                >
                    Sign in
                </v-button>

                <v-button :to="{ name: 'signUpView' }" variant="white">
                    Sign up
                </v-button>
            </div>

            <user-actions v-else class="flex-shrink-0" />
        </div>
    </header>
</template>

<script setup lang="ts">
    import MainLogo from '@/components/base/MainLogo.vue';
    import UserActions from '@/components/base/UserActions.vue';
    import VButton from '@/components/base/VButton.vue';
    import MainSearch from '@/components/search/main-search/MainSearch.vue';

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth.store.ts';

    const { isAuthenticated } = storeToRefs(useAuthStore());
</script>

<style scoped>
    header {
        max-height: 76px;
    }
</style>
