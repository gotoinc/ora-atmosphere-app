<template>
    <div>
        <h2 class="text-h5 font-light uppercase">
            {{ title }}
        </h2>

        <!-- Selected filters list -->
        <div v-if="isSearchPage" class="mt-3">
            <v-button class="w-fit" @click="resetFilters">
                Reset search
            </v-button>
        </div>

        <!-- Contents list -->
        <template v-if="isLoading">
            <div class="list">
                <card-skeleton
                    v-for="i in 10"
                    :key="i"
                    class="bg-primary-100/25"
                />
            </div>
        </template>

        <template v-else-if="videosData.length > 0">
            <div class="list fade-t">
                <video-card
                    v-for="video in videosData"
                    :key="video.id"
                    :data="video"
                    :disable="video.requires_auth"
                    @expand="openVideoPopup(video)"
                    @play="handlePlay(video)"
                    @select="selectVideo(video)"
                />
            </div>
        </template>

        <h3 v-else class="fade-t pt-8 text-center text-h3">
            No contents found
        </h3>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import type { RouteLocationNormalized } from 'vue-router';
    import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

    import VButton from '@/components/base/VButton.vue';
    import CardSkeleton from '@/components/catalog/CardSkeleton.vue';
    import VideoCard from '@/components/catalog/VideoCard.vue';

    import { storeToRefs } from 'pinia';
    import { useCatalogStore } from '@/stores/catalog.store.ts';
    import { useSearchStore } from '@/stores/search.store.ts';

    import { getVideos } from '@/api/contents/get-videos.api.ts';
    import type { SearchBody } from '@/api/search/search-contents.api.ts';
    import { searchContents } from '@/api/search/search-contents.api.ts';
    import {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        useTransformFromPath,
    } from '@/hooks/transform-queries.ts';
    import {
        routerCategories,
        routerLangs,
        routerTags,
    } from '@/router/router-items.ts';
    import type { VideoContent } from '@/ts/contents';

    const route = useRoute();
    const router = useRouter();

    const catalogStore = useCatalogStore();
    const { openVideoPopup, playSimulator } = catalogStore;
    const { contentToPlay } = storeToRefs(catalogStore);

    const { resetSearch } = useSearchStore();

    const isSearchPage = computed(() => route.name === 'searchView');

    const title = computed(() =>
        isSearchPage.value
            ? `Search results: ${route.query.value ? `"${useTransformFromPath(route.query.value as string)}"` : ''}`
            : 'Videos'
    );

    const resetFilters = () => {
        resetSearch();

        void router.push({ name: 'catalogView' });
    };

    const isLoading = ref(true);
    const videosData = ref<VideoContent[]>([]);

    const selectVideo = (content: VideoContent) => {
        contentToPlay.value = content;

        window.scrollTo(0, 0);
    };

    const handlePlay = (content: VideoContent) => {
        contentToPlay.value = content;
        playSimulator();
    };

    const loadVideos = async () => {
        isLoading.value = true;

        try {
            videosData.value = (await getVideos()) ?? [];
        } finally {
            isLoading.value = false;
        }
    };

    const handleSearch = async (route: RouteLocationNormalized) => {
        isLoading.value = true;

        try {
            const body: Partial<SearchBody> = {
                query: route.query.value
                    ? useTransformFromPath(route.query.value as string)
                    : '',
                category_ids: routerCategories.value as number[],
                language_ids: routerLangs.value as number[],
                tags: routerTags.value,
            };

            videosData.value = (await searchContents(body)) ?? [];
        } finally {
            isLoading.value = false;
        }
    };

    onBeforeRouteUpdate(async (to) => {
        if (
            to.query.value ||
            to.query.langs ||
            to.query.tags ||
            to.query.categories
        ) {
            await handleSearch(to);
        }
    });

    onMounted(async () => {
        if (isSearchPage.value) {
            await handleSearch(route);
        } else {
            await loadVideos();
        }
    });
</script>

<style scoped lang="postcss">
    .list {
        @apply mb-36 mt-6 grid grid-cols-5 gap-3.5 max-2xl:grid-cols-4 max-lg:grid-cols-3 max-tab:grid-cols-2 max-mob-lg:grid-cols-1;
    }
</style>
