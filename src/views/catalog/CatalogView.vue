<template>
    <!-- Catalog page  -->
    <template v-if="route.name === 'catalogView'">
        <div class="grid gap-12">
            <template v-if="isLoaded">
                <div
                    v-for="{ category, groups } in catalogData"
                    :key="category"
                >
                    <catalog-link
                        :to="isCatalogLink(category, groups.length)"
                        class="mb-4"
                    >
                        {{ category }}
                    </catalog-link>

                    <fancy-carousel
                        overflow-visible
                        class="-ml-4 w-screen px-4"
                    >
                        <category-card
                            v-for="item in groups.slice(0, 10)"
                            :key="item.id"
                            class="f-carousel__slide !mr-3.5 !max-w-[347px] max-sm:!max-w-[268px]"
                            :to="{
                                name: 'catalogGroupView',
                                params: { group: useTransformPath(item.name) },
                            }"
                            :img="item.image_url"
                            :name="item.name"
                        />
                    </fancy-carousel>
                </div>
            </template>

            <div v-else>
                <fancy-carousel
                    v-for="i in 3"
                    :key="i"
                    overflow-visible
                    class="-ml-4 w-screen px-4"
                >
                    <card-skeleton
                        v-for="j in 5"
                        :key="j"
                        class="f-carousel__slide !mr-3.5 !max-w-[347px] !bg-primary-200/30 max-sm:!max-w-[268px]"
                    />
                </fancy-carousel>
            </div>
        </div>
    </template>

    <template v-else>
        <v-breadcrumbs class="mb-14" />

        <router-view></router-view>
    </template>

    <scroll-to-top />
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useToast } from 'vue-toastification';

    import ScrollToTop from '@/components/base/ScrollToTop.vue';
    import VBreadcrumbs from '@/components/base/VBreadcrumbs.vue';
    import FancyCarousel from '@/components/carousel/FancyCarousel.vue';
    import CardSkeleton from '@/components/catalog/CardSkeleton.vue';
    import CatalogLink from '@/components/catalog/CatalogLink.vue';
    import CategoryCard from '@/components/catalog/CategoryCard.vue';

    import type { Catalog } from '@/ts/interfaces/catalog';

    import { getCatalog } from '@/api/catalog/get-catalog.api.ts';
    import { useTransformPath } from '@/hooks/transform-queries.ts';

    const route = useRoute();
    const toast = useToast();

    const isCatalogLink = (category: string, length: number) => {
        return length > 5
            ? {
                  name: 'catalogCategoryView',
                  params: { category: useTransformPath(category) },
              }
            : undefined;
    };

    const isLoaded = ref(false);
    const catalogData = ref<Catalog[]>([]);

    onMounted(async () => {
        try {
            catalogData.value = (await getCatalog()) ?? [];
        } catch (err) {
            toast.error('Catalog was not found');
        } finally {
            isLoaded.value = true;
        }
    });
</script>

<style scoped></style>
