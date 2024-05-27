<template>
    <!-- Catalog page  -->
    <template v-if="route.name === 'catalogView'">
        <div class="grid gap-12">
            <div>
                <catalog-link to="#" class="mb-4">
                    BRANDS & EVENTS
                </catalog-link>

                <fancy-carousel class="-ml-4 w-screen px-4">
                    <category-card
                        class="f-carousel__slide !mr-3.5 max-sm:!max-w-[268px]"
                        :to="{
                            name: 'catalogThemeView',
                            params: { theme: 'brands' },
                        }"
                        :img="CategoryImg1"
                        name="Brands"
                    />

                    <category-card
                        class="f-carousel__slide !mr-3.5 max-sm:!max-w-[268px]"
                        :to="{
                            name: 'catalogThemeView',
                            params: { theme: 'events' },
                        }"
                        :img="CategoryImg2"
                        name="Events"
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
    import CategoryImg1 from '@img/categories/cat-1.jpg';
    import CategoryImg2 from '@img/categories/cat-2.jpg';

    import ScrollToTop from '@/components/base/ScrollToTop.vue';
    import VBreadcrumbs from '@/components/base/VBreadcrumbs.vue';
    import FancyCarousel from '@/components/carousel/FancyCarousel.vue';
    import CatalogLink from '@/components/catalog/CatalogLink.vue';
    import CategoryCard from '@/components/catalog/CategoryCard.vue';

    const route = useRoute();
</script>

<style scoped></style>
