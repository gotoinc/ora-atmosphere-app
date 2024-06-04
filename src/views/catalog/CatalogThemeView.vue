<template>
    <div>
        <h2 class="text-h5 font-light uppercase">
            {{
                isSearchPage
                    ? `Results for "${useTransformFromPath(route.params.value as string)}":`
                    : 'Videos'
            }}
        </h2>

        <!-- Selected filters list -->
        <div v-if="isSearchPage" class="mt-3 grid gap-3">
            <div
                v-if="routerCategories.length > 0"
                class="flex flex-wrap gap-3"
            >
                <h4>Selected categories:</h4>

                <div class="flex flex-wrap gap-1">
                    <span
                        v-for="(cat, i) in routerCategories"
                        :key="i"
                        class="uppercase"
                    >
                        {{ useTransformFromPath(cat as string) }}
                        <span v-if="i !== routerCategories.length - 1">
                            ,
                        </span>
                    </span>
                </div>
            </div>

            <div v-if="routerTags.length > 0" class="flex flex-wrap gap-3">
                <h4>Selected tags:</h4>

                <div class="flex flex-wrap gap-1">
                    <span
                        v-for="(tag, i) in routerTags"
                        :key="i"
                        class="tag tag--fill pointer-events-none"
                    >
                        {{ tag }}
                    </span>
                </div>
            </div>

            <div v-if="routerLangs.length > 0" class="flex flex-wrap gap-3">
                <h4>Selected languages:</h4>

                <div class="flex flex-wrap gap-1">
                    <span
                        v-for="(lang, i) in routerLangs"
                        :key="i"
                        class="tag tag--lang tag--fill pointer-events-none"
                    >
                        {{ lang }}
                    </span>
                </div>
            </div>

            <v-button class="w-fit" @click="resetFilters">
                Reset search
            </v-button>
        </div>

        <div>
            <template v-if="true">
                <div
                    class="mb-36 mt-6 grid grid-cols-5 gap-3.5 max-2xl:grid-cols-4 max-tab:grid-cols-3 max-sm:grid-cols-2 max-mob-md:grid-cols-1"
                >
                    <video-card
                        v-for="i in 5"
                        :key="i"
                        name="Title"
                        :img="ThemeImg"
                        @expand="openVideoPopup"
                        @play="playSimulator"
                    />

                    <video-card
                        v-for="i in 20"
                        :key="i"
                        disable
                        name="Title"
                        :img="ThemeImg"
                        @expand="openVideoPopup"
                        @play="playSimulator"
                    />
                </div>

                <main-pagination
                    :current-page="3"
                    :total="100"
                    :view-per-page="25"
                />
            </template>

            <h3 v-else class="py-5 text-center text-h3">No contents found</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import ThemeImg from '@img/categories/theme-bg.jpg';

    import VButton from '@/components/banner/VButton.vue';
    import MainPagination from '@/components/base/MainPagination.vue';
    import VideoCard from '@/components/catalog/VideoCard.vue';

    import { useCatalogStore } from '@/stores/catalog.store.ts';
    import { useSearchStore } from '@/stores/search.store.ts';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import { useTransformFromPath } from '@/hooks/transform-queries.ts';
    import {
        routerCategories,
        routerLangs,
        routerTags,
    } from '@/router/router-items.ts';

    const route = useRoute();
    const router = useRouter();

    const { openVideoPopup, playSimulator } = useCatalogStore();
    const { resetSearch } = useSearchStore();

    const isSearchPage = computed(() => route.name === 'searchView');

    const resetFilters = () => {
        resetSearch();

        void router.push({ name: 'catalogView' });
    };
</script>

<style scoped></style>
