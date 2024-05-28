<template>
    <template v-if="route.name === 'catalogCategoryView'">
        <h2 class="mb-6 text-h5 font-light uppercase">
            {{ useTransformFromPath(route.params.category as string) }} category
        </h2>

        <div
            class="grid grid-cols-5 gap-3.5 max-2lg:grid-cols-4 max-tab:grid-cols-3 max-sm:grid-cols-2 max-mob-md:grid-cols-1"
        >
            <category-card
                v-for="i in 25"
                :key="i"
                class="!max-w-full max-mob-md:hidden"
                :to="{
                    name: 'catalogThemeView',
                    params: { theme: 'test' },
                }"
                :img="ThemeImg"
                name="Theme"
            />
        </div>
    </template>

    <router-view></router-view>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import ThemeImg from '@img/categories/theme-bg.jpg';

    import CategoryCard from '@/components/catalog/CategoryCard.vue';

    const route = useRoute();
</script>

<style scoped></style>
