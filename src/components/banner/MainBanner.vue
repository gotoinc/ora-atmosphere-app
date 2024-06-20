<template>
    <section class="banner relative flex items-end">
        <div class="cont w-full">
            <div class="banner__img absolute left-0 top-0 h-full w-full">
                <img src="@img/banner.jpg" alt="Banner" class="img-cover" />
            </div>

            <!-- Back link -->
            <v-button
                v-if="showBackLink"
                variant="text"
                :icon="IconChevronLeft"
                class="mb-[9.6vw] !pl-0 max-2lg:mb-10"
                @click="router.go(-1)"
            >
                Back
            </v-button>

            <div class="banner__heading">
                <div class="mb-2 flex items-center gap-3">
                    <div class="banner__label pointer-events-none select-none">
                        <img
                            src="@img/ora-label.svg"
                            class="img-contain"
                            alt="ORA label"
                        />
                    </div>

                    <h3 class="font-light uppercase">Brands</h3>
                </div>

                <h1 class="mb-8 text-9xl font-extrabold max-2lg:text-[64px]">
                    Cisco
                </h1>

                <div class="flex gap-4">
                    <div ref="playButton" class="relative">
                        <v-button
                            variant="white"
                            :icon="IconPlay"
                            class="!pr-4"
                            icon-class="!w-2.5 !h-3 mr-2"
                            @click="isActionsOpen = !isActionsOpen"
                        >
                            <span class="flex items-center">
                                Play

                                <component :is="IconChevronDown" class="ml-2" />
                            </span>
                        </v-button>

                        <ul
                            v-show="isActionsOpen"
                            class="actions absolute left-0 z-20 overflow-hidden rounded-lg bg-grey-400"
                        >
                            <li
                                class="link"
                                @click="isVideoPlayerOpened = true"
                            >
                                Play on Sphere
                            </li>

                            <li class="link">
                                <router-link :to="{ name: 'simulatorView' }">
                                    Play on Simulator
                                </router-link>
                            </li>
                        </ul>
                    </div>

                    <v-button
                        :icon="IconInfo"
                        variant="info"
                        @click="catalogStore.openVideoPopup"
                    >
                        More info
                    </v-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { computed, onMounted, onUnmounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import IconChevronDown from '@img/icons/chevron-down.svg?component';
    import IconChevronLeft from '@img/icons/chevron-left.svg?component';
    import IconInfo from '@img/icons/info.svg?component';
    import IconPlay from '@img/icons/play.svg?component';

    import VButton from '@/components/banner/VButton.vue';

    import { storeToRefs } from 'pinia';
    import { useCatalogStore } from '@/stores/catalog.store.ts';

    import { useClickOutsideElement } from '@/hooks/useClickOutsideElement.ts';

    const router = useRouter();

    const catalogStore = useCatalogStore();
    const { isVideoPlayerOpened } = storeToRefs(catalogStore);

    const showBackLink = computed(() => {
        const name = router.currentRoute.value.name;

        return [
            'catalogCategoryView',
            'catalogThemeView',
            'catalogGroupView',
        ].some((routeName) => routeName === name);
    });

    const isActionsOpen = ref(false);
    const playButton = ref<HTMLButtonElement | null>(null);

    const setClickEvent = (e: Event) => {
        if (playButton.value) {
            useClickOutsideElement(
                e,
                playButton.value,
                () => (isActionsOpen.value = false)
            );
        }
    };

    onMounted(() => {
        document.addEventListener('click', setClickEvent);
    });

    onUnmounted(() => {
        document.removeEventListener('click', setClickEvent);
    });
</script>

<style scoped lang="postcss">
    .banner {
        padding-bottom: 37vh;
        max-height: 1080px;
        min-height: 900px;
        height: 100vh;

        &__img {
            z-index: -1;

            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(73, 90, 255, 0.35);
            }

            @media screen and (max-width: 551px) {
                img {
                    object-position: 25% 50%;
                }
            }
        }

        &__label {
            width: 30px;
            height: 28px;
        }

        @media screen and (min-height: 1080px) {
            padding-bottom: 455px;
        }

        @media screen and (max-height: 768px) {
            padding-bottom: 380px;
        }

        @media screen and (max-width: 1201px) {
            max-height: 625px;
            min-height: 625px;
            padding-bottom: 200px;
        }
    }
</style>
