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

    const route = useRoute();

    const breadcrumbs = computed(() => {
        return route.matched.slice(1).map((item) => {
            const breadcrumbName: string =
                item.name === 'catalogThemeView'
                    ? `${route.params.theme} theme`
                    : (item.meta.title as string);

            return {
                name: breadcrumbName,
                to: item.name,
            };
        });
    });
</script>

<style scoped></style>
