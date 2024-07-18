<template>
    <div
        ref="actionsElement"
        class="relative flex cursor-pointer items-center"
        @click="isActionsOpen = !isActionsOpen"
    >
        <v-skeleton
            v-if="isProfileLoading"
            class="mr-4 h-7 w-32 rounded-lg bg-white-50"
        />

        <p
            v-else-if="profileData && Object.keys(profileData).length > 0"
            class="mr-4 text-base font-bold max-mob:hidden"
        >
            {{ `${profileData.first_name} ${profileData.last_name}` }}
        </p>

        <div
            class="border-white mr-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-solid bg-primary-50"
        >
            <component :is="IconUser" class="h-5 w-5 text-white-100" />
        </div>

        <component
            :is="IconChevronDown"
            class="h-6 w-6 text-white-100 transition-transform"
            :class="{
                'rotate-180': isActionsOpen,
            }"
        />

        <ul
            v-show="isActionsOpen"
            class="actions absolute right-0 overflow-hidden rounded-lg bg-grey-400"
        >
            <li>
                <router-link class="link" :to="{ name: 'profileView' }">
                    My Profile
                </router-link>
            </li>

            <li class="link" @click="isLogOutOpen = true">Log Out</li>
        </ul>

        <teleport to="body">
            <v-popup v-model="isLogOutOpen">
                <div class="text-center">
                    <h3 class="mb-8 text-h4">Log Out</h3>

                    <p class="mb-8">Are you sure you want to log out?</p>

                    <div class="mx-auto flex max-w-80 flex-wrap gap-4">
                        <v-button
                            class="flex-grow"
                            variant="outline"
                            @click="isLogOutOpen = false"
                        >
                            Cancel
                        </v-button>

                        <v-button class="flex-grow" @click="handleLogout">
                            Yes, log out
                        </v-button>
                    </div>
                </div>
            </v-popup>
        </teleport>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import IconChevronDown from '@img/icons/chevron-down.svg?component';
    import IconUser from '@img/icons/user.svg?component';

    import VButton from '@/components/base/VButton.vue';
    import VSkeleton from '@/components/base/VSkeleton.vue';
    import VPopup from '@/components/popup/VPopup.vue';

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth.store.ts';

    import { useClickOutsideElement } from '@/hooks/useClickOutsideElement.ts';

    const isActionsOpen = ref(false);

    const router = useRouter();
    const route = useRoute();

    const actionsElement = ref<HTMLDivElement | null>(null);

    const isLogOutOpen = ref(false);

    const authStore = useAuthStore();
    const { profileData, isProfileLoading } = storeToRefs(authStore);

    const setClickEvent = (e: Event) => {
        if (actionsElement.value) {
            useClickOutsideElement(
                e,
                actionsElement.value,
                () => (isActionsOpen.value = false)
            );
        }
    };

    const handleLogout = async () => {
        try {
            await authStore.logout();

            void router.replace({ name: 'main' });
        } finally {
            isLogOutOpen.value = false;
        }
    };

    onMounted(async () => {
        document.addEventListener('click', setClickEvent);

        if (!profileData.value && route.name !== 'profileInfoView') {
            await authStore.getProfileData();
        }
    });

    onUnmounted(() => {
        document.removeEventListener('click', setClickEvent);
    });
</script>

<style scoped lang="postcss">
    .actions {
        top: calc(100% + 8px);
        min-width: 177px;
        animation: fade-up 0.3s ease;
    }

    .link {
        @apply block px-4 py-2.5 text-white-100 transition-colors hover:bg-grey-200;
    }

    @keyframes fade-up {
        0% {
            opacity: 0;
            transform: translateY(-20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
