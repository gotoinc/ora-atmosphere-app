<template>
    <h2 class="mb-6 text-h5 font-light uppercase">
        {{ useTransformFromPath(route.params.category as string) }}
    </h2>

    <div
        class="grid grid-cols-5 gap-3.5 max-2lg:grid-cols-4 max-tab:grid-cols-3 max-sm:grid-cols-2 max-mob-md:grid-cols-1"
    >
        <category-card
            v-for="{ name, bg } in categories.items"
            :key="name"
            :to="{
                name: 'catalogGroupView',
                params: { group: useTransformPath(name) },
            }"
            :img="bg"
            :name="name"
        />
    </div>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router';

    import CategoryCard from '@/components/catalog/CategoryCard.vue';

    import catalogJson from '@/fixtures/catalog.json';
    import {
        useTransformFromPath,
        useTransformPath,
    } from '@/hooks/transform-queries.ts';

    const route = useRoute();

    const categories = catalogJson.filter(
        (category) =>
            category.category.toLowerCase() ===
            useTransformFromPath(route.params.category as string).toLowerCase()
    )[0];
</script>

<style scoped></style>
