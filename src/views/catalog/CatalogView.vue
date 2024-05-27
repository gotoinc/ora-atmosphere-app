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
                        v-for="i in 2"
                        :key="i"
                        class="f-carousel__slide !mr-3.5"
                        :to="{
                            name: 'catalogThemeView',
                            params: { theme: 'brands' },
                        }"
                        :img="CategoryImg"
                        name="Brands"
                    />
                </fancy-carousel>
            </div>
        </div>
    </template>

    <template v-else>
        <router-view></router-view>
    </template>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import CategoryImg from '@img/categories/cat-1.jpg';

    import FancyCarousel from '@/components/carousel/FancyCarousel.vue';
    import CatalogLink from '@/components/catalog/CatalogLink.vue';
    import CategoryCard from '@/components/catalog/CategoryCard.vue';

    const route = useRoute();
</script>

<style scoped></style>
