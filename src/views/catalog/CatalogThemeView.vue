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
            <div class="list">
                <video-card
                    v-for="video in videosData"
                    :key="video.id"
                    :name="video.title"
                    :img="video.image_url"
                    :disable="video.requires_auth"
                    @expand="openVideoPopup"
                    @play="playSimulator"
                />
            </div>
        </template>

        <h3 v-else class="pt-5 text-center text-h3">No contents found</h3>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';

    import VButton from '@/components/banner/VButton.vue';
    import CardSkeleton from '@/components/catalog/CardSkeleton.vue';
    import VideoCard from '@/components/catalog/VideoCard.vue';

    import type { VideoContent } from '@/ts/interfaces/contents';

    import { useCatalogStore } from '@/stores/catalog.store.ts';
    import { useSearchStore } from '@/stores/search.store.ts';

    import { getVideos } from '@/api/catalog/get-videos.api.ts';
    import {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        useTransformFromPath,
    } from '@/hooks/transform-queries.ts';
    import {
        routerCategories,
        routerLangs,
        routerTags,
    } from '@/router/router-items.ts';

    const route = useRoute();
    const toast = useToast();
    const router = useRouter();

    const { openVideoPopup, playSimulator } = useCatalogStore();
    const { resetSearch } = useSearchStore();

    const isSearchPage = computed(() => route.name === 'searchView');

    const resetFilters = () => {
        resetSearch();

        void router.push({ name: 'catalogView' });
    };

    const isLoading = ref(true);
    const videosData = ref<VideoContent[]>([]);

    onMounted(async () => {
        try {
            const res = await getVideos(route.params.topicId as string);

            videosData.value = res ?? [];
        } catch (err) {
            toast.error('Contents were not found');
        } finally {
            isLoading.value = false;
        }
    });
</script>

<style scoped lang="postcss">
    .list {
        @apply mb-36 mt-6 grid grid-cols-5 gap-3.5 max-2xl:grid-cols-4 max-tab:grid-cols-3 max-sm:grid-cols-2 max-mob-md:grid-cols-1;
    }
</style>
