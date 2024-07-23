<template>
    <section class="banner relative flex items-end">
        <div class="cont w-full">
            <div class="banner__img absolute left-0 top-0 h-full w-full">
                <img :src="bannerImg" alt="Banner" class="img-cover" />
            </div>

            <!-- Back link -->
            <v-button
                v-if="showBackLink"
                variant="text"
                :icon="IconChevronLeft"
                class="!pl-0"
                @click="router.go(-1)"
            >
                Back
            </v-button>

            <div
                :class="{ 'max-w-3xl': contentToPlay }"
                class="fade-r banner__heading mt-[182px] max-2lg:mt-10"
            >
                <div class="mb-2 flex items-center gap-3">
                    <v-skeleton
                        v-if="isLoading"
                        class="h-10 w-56 rounded-lg bg-white-25"
                    />

                    <template v-else-if="contentToPlay">
                        <div
                            class="banner__label pointer-events-none select-none"
                        >
                            <img
                                src="@img/ora-label.svg"
                                class="img-contain"
                                alt="ORA label"
                            />
                        </div>

                        <h3
                            v-if="contentToPlay.topic"
                            class="font-light uppercase"
                        >
                            {{ contentToPlay.topic.name }}
                        </h3>
                    </template>
                </div>

                <v-skeleton
                    v-if="isLoading"
                    class="mb-10 h-24 w-80 rounded-lg bg-white-25"
                />

                <h1
                    v-else-if="contentToPlay"
                    class="line-camp-3 text-7xl font-extrabold max-2lg:text-5xl"
                >
                    {{ contentToPlay.title }}
                </h1>

                <div
                    v-if="contentToPlay && !isLoading"
                    class="fade-t mt-8 flex flex-wrap gap-4"
                >
                    <v-button
                        :loading="isSimulatorLoading"
                        variant="white"
                        :icon="IconPlay"
                        :disabled="!contentToPlay.file"
                        icon-class="!w-2.5 !h-3 mr-2"
                        @click="catalogStore.playSimulator"
                    >
                        Play
                    </v-button>

                    <v-button
                        :icon="IconInfo"
                        variant="info"
                        @click="catalogStore.openVideoPopup(contentToPlay)"
                    >
                        More info
                    </v-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import bannerImg from '@img/banner.jpg';
    import IconChevronLeft from '@img/icons/chevron-left.svg?component';
    import IconInfo from '@img/icons/info.svg?component';
    import IconPlay from '@img/icons/play.svg?component';

    import VButton from '@/components/base/VButton.vue';
    import VSkeleton from '@/components/base/VSkeleton.vue';

    import { storeToRefs } from 'pinia';
    import { useCatalogStore } from '@/stores/catalog.store.ts';

    import { getDefaultContent } from '@/api/catalog/get-selected-content.api.ts';

    const router = useRouter();

    const catalogStore = useCatalogStore();
    const { contentToPlay, isSimulatorLoading } = storeToRefs(catalogStore);

    const isLoading = ref(false);

    const showBackLink = computed(() => {
        const name = router.currentRoute.value.name;

        return [
            'catalogCategoryView',
            'catalogThemeView',
            'catalogGroupView',
        ].some((routeName) => routeName === name);
    });

    onMounted(async () => {
        isLoading.value = true;

        try {
            const res = await getDefaultContent();

            if (res) {
                contentToPlay.value = res;
            }
        } catch (e) {
            contentToPlay.value = null;
        } finally {
            isLoading.value = false;
        }
    });
</script>

<style scoped lang="postcss">
    .banner {
        padding-bottom: 37vh;
        max-height: 1080px;
        min-height: 900px;
        height: 100vh;

        .cont {
            min-height: 468px;
        }

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
            padding-bottom: 320px;
        }

        @media screen and (max-width: 1201px) {
            max-height: 625px;
            min-height: 625px;
            padding-bottom: 200px;

            .cont {
                padding-top: 160px;
            }
        }
    }
</style>
