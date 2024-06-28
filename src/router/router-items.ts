import { computed } from 'vue';

import { queriesToArray } from '@/hooks/transform-queries.ts';
import router from '@/router/index.ts';

export const routerTags = computed(() =>
    queriesToArray(router.currentRoute.value.query.tags)
);
export const routerLangs = computed(() =>
    queriesToArray(router.currentRoute.value.query.langs)
);
export const routerCategories = computed(() =>
    queriesToArray(router.currentRoute.value.query.categories)
);
