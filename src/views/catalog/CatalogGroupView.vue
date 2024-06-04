<template>
    <template v-if="route.name === 'catalogGroupView'">
        <h2 class="mb-6 text-h5 font-light uppercase">
            {{ useTransformFromPath(route.params.group as string) }}
        </h2>

        <div
            class="mb-10 grid grid-cols-5 gap-3.5 max-2lg:grid-cols-4 max-tab:grid-cols-3 max-sm:grid-cols-2 max-mob-md:grid-cols-1"
        >
            <category-card
                v-for="i in 5"
                :key="i"
                class="!max-w-full"
                :to="{
                    name: 'catalogThemeView',
                    params: { theme: 'test' },
                }"
                :img="ThemeImg"
                name="Theme"
            />

            <category-card
                v-for="i in 20"
                :key="i"
                disable
                saturate-image
                class="!max-w-full"
                :to="{
                    name: 'catalogThemeView',
                    params: { theme: 'test' },
                }"
                :img="ThemeImg"
                name="Theme"
            />
        </div>

        <main-pagination :current-page="3" :total="100" :view-per-page="25" />
    </template>

    <router-view></router-view>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import ThemeImg from '@img/categories/theme-bg.jpg';

    import MainPagination from '@/components/base/MainPagination.vue';
    import CategoryCard from '@/components/catalog/CategoryCard.vue';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import { useTransformFromPath } from '@/hooks/transform-queries.ts';

    const route = useRoute();
</script>

<style scoped></style>
