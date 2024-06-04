<template>
    <div class="flex flex-wrap items-center gap-2 whitespace-nowrap uppercase">
        <div
            v-for="link in breadcrumbs.slice(0, -1)"
            :key="link.name"
            class="flex items-center gap-2"
        >
            <router-link
                class="text-sm underline transition-colors hover:text-primary-50"
                :to="{ name: link.to }"
            >
                {{ link.name }}
            </router-link>

            <span class="text-sm"> > </span>
        </div>

        <span class="text-sm">
            {{ breadcrumbs[breadcrumbs.length - 1].name }}
        </span>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    import { useTransformFromPath } from '@/hooks/transform-queries.ts';

    const route = useRoute();

    const breadcrumbs = computed(() => {
        return route.matched.slice(1).map((item) => {
            let breadcrumbName: string;

            if (item.name === 'catalogGroupView') {
                breadcrumbName = `${route.params.group}`;
            } else if (item.name === 'catalogThemeView') {
                breadcrumbName = `${route.params.theme}`;
            } else if (item.name === 'catalogCategoryView') {
                breadcrumbName = route.params.category as string;
            } else {
                breadcrumbName = item.meta.title as string;
            }

            return {
                name: useTransformFromPath(breadcrumbName),
                to: item.name,
            };
        });
    });
</script>

<style scoped></style>
