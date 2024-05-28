<template>
    <!-- Catalog page  -->
    <template v-if="route.name === 'catalogView'">
        <div class="grid gap-12">
            <div
                v-for="{ items, category, active } in catalogJson"
                :key="category"
            >
                <catalog-link
                    :to="isCatalogLink(category, items.length)"
                    class="mb-4"
                >
                    {{ category }}
                </catalog-link>

                <fancy-carousel overflow-visible class="-ml-4 w-screen px-4">
                    <category-card
                        v-for="item in items.slice(0, 5)"
                        :key="item.name"
                        :disable="!active"
                        class="f-carousel__slide !mr-3.5 max-sm:!max-w-[268px]"
                        :to="{
                            name: 'catalogGroupView',
                            params: { group: useTransformPath(item.name) },
                        }"
                        :img="item.bg"
                        :name="item.name"
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
    import { useRoute } from 'vue-router';

    import ScrollToTop from '@/components/base/ScrollToTop.vue';
    import VBreadcrumbs from '@/components/base/VBreadcrumbs.vue';
    import FancyCarousel from '@/components/carousel/FancyCarousel.vue';
    import CatalogLink from '@/components/catalog/CatalogLink.vue';
    import CategoryCard from '@/components/catalog/CategoryCard.vue';

    import catalogJson from '@/fixtures/catalog.json';
    import { useTransformPath } from '@/hooks/useTransformPath.ts';

    const isCatalogLink = (category: string, length: number) => {
        return length > 5
            ? {
                  name: 'catalogCategoryView',
                  params: { category: useTransformPath(category) },
              }
            : undefined;
    };

    const route = useRoute();
</script>

<style scoped></style>
