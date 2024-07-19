<template>
    <v-header />

    <main class="flex-grow bg-dark py-14 text-white-100">
        <div class="cont mx-auto">
            <h2 class="mb-12 text-h2 max-sm:mb-8">My Profile</h2>

            <div class="flex gap-10 max-sm:flex-col max-sm:gap-6">
                <aside class="fade-r w-full max-sm:!max-w-full">
                    <div class="max-sm:hidden">
                        <nav class="mb-2">
                            <ul class="flex flex-col gap-2">
                                <li>
                                    <router-link
                                        class="nav-link"
                                        :to="{ name: 'profileInfoView' }"
                                    >
                                        {{ ProfileLinks.Info }}
                                    </router-link>
                                </li>

                                <li>
                                    <router-link
                                        class="nav-link"
                                        :to="{
                                            name: 'profileChangePasswordView',
                                        }"
                                    >
                                        {{ ProfileLinks.Password }}
                                    </router-link>
                                </li>
                            </ul>
                        </nav>

                        <span class="block h-px bg-white-100"></span>

                        <button
                            class="nav-link nav-link--delete mt-2 w-full text-left"
                            @click="isDeleteOpen = true"
                        >
                            {{ ProfileLinks.Delete }}
                        </button>
                    </div>

                    <v-select
                        v-model:reset="isResetSelect"
                        v-model="navigationLink"
                        class="w-full sm:hidden"
                        variant="white"
                        :options="Object.values(ProfileLinks)"
                        @update:model-value="changeLink"
                    />
                </aside>

                <section class="fade-l flex-grow">
                    <router-view></router-view>
                </section>
            </div>
        </div>
    </main>

    <teleport to="body">
        <v-popup v-model="isDeleteOpen">
            <div class="text-center">
                <h3 class="mb-8 text-h4">Delete profile</h3>

                <p class="mb-8">
                    Are you sure you want to delete your profile?
                </p>

                <div class="mx-auto flex max-w-80 flex-wrap gap-4">
                    <v-button
                        class="flex-grow"
                        variant="outline"
                        @click="cancelDelete()"
                    >
                        Cancel
                    </v-button>

                    <v-button
                        :loading="isLoading"
                        class="flex-grow"
                        @click="hadnleDeleteProfile"
                    >
                        Yes, delete
                    </v-button>
                </div>
            </div>
        </v-popup>
    </teleport>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';

    import VButton from '@/components/base/VButton.vue';
    import VSelect from '@/components/base/VSelect.vue';
    import VHeader from '@/components/layout/VHeader.vue';
    import VPopup from '@/components/popup/VPopup.vue';

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth.store.ts';

    import { deleteProfile } from '@/api/auth/delete-profile.api.ts';

    const router = useRouter();
    const toast = useToast();

    const authStore = useAuthStore();

    const { clearAuth } = authStore;
    const { profileData } = storeToRefs(authStore);

    enum ProfileLinks {
        Info = 'Personal information',
        Password = 'Change Password',
        Delete = 'Delete profile',
    }

    const isDeleteOpen = ref(false);
    const isResetSelect = ref(false);
    const navigationLink = ref('');
    const isLoading = ref(false);

    const changeLink = (link: string) => {
        const profileLink = link as ProfileLinks;

        if (profileLink === ProfileLinks.Info) {
            void router.push({ name: 'profileInfoView' });
        } else if (profileLink === ProfileLinks.Password) {
            void router.push({ name: 'profileChangePasswordView' });
        } else {
            isDeleteOpen.value = true;
        }
    };

    const cancelDelete = () => {
        navigationLink.value = ProfileLinks.Info;
        isResetSelect.value = true;
        isDeleteOpen.value = false;

        void router.push({ name: 'profileInfoView' });
    };

    const hadnleDeleteProfile = async () => {
        if (profileData.value) {
            isLoading.value = true;

            try {
                await deleteProfile(profileData.value.pk);

                toast.success('Profile has been deleted');

                clearAuth();

                void router.replace({ name: 'main' });
            } catch (e) {
                toast.error('Profile was not deleted');
            } finally {
                isLoading.value = false;
                isDeleteOpen.value = false;
            }
        }
    };
</script>

<style scoped lang="postcss">
    .cont {
        max-width: 692px;
    }

    aside {
        max-width: 193px;
    }

    .nav-link {
        @apply block rounded-lg p-4 transition-colors hover:bg-primary-100/35;

        &.router-link-active {
            @apply bg-primary-100/35;
        }

        &.nav-link--delete {
            @apply hover:bg-error/40;
        }
    }
</style>
