import { ref } from 'vue';
import type { LocationQueryValue } from 'vue-router';

import { defineStore } from 'pinia';

import {
    transformArraysFromQueries,
    transformArraysToQueries,
    useTransformPath,
} from '@/hooks/transform-queries.ts';
import router from '@/router';
import {
    routerCategories,
    routerLangs,
    routerTags,
} from '@/router/router-items.ts';

export const useSearchStore = defineStore(
    'search',
    () => {
        const resentSearches = ref<string[]>([]);

        const searchValue = ref('');

        const selectedTags = ref<LocationQueryValue[]>(routerTags.value);
        const selectedLangs = ref<LocationQueryValue[]>([...routerLangs.value]);
        const selectedCategories = ref<LocationQueryValue[]>(
            transformArraysFromQueries(routerCategories.value)
        );

        /**
         * Function for reset filters
         */
        const resetSearch = () => {
            selectedTags.value = [];
            selectedLangs.value = [];
            selectedCategories.value = [];
            searchValue.value = '';
        };

        /**
         * Function for searching
         */
        const onSearch = () => {
            void router.push({
                name: 'searchView',
                params: {
                    value: useTransformPath(searchValue.value.toLowerCase()),
                },

                query: {
                    tags: transformArraysToQueries(selectedTags.value),
                    langs: transformArraysToQueries(selectedLangs.value),
                    categories: transformArraysToQueries(
                        selectedCategories.value
                    ),
                },
            });

            console.log(transformArraysToQueries(selectedCategories.value));

            if (!resentSearches.value.includes(searchValue.value)) {
                resentSearches.value.unshift(searchValue.value);
            }
        };

        return {
            resentSearches,
            selectedTags,
            selectedLangs,
            selectedCategories,
            searchValue,
            resetSearch,
            onSearch,
        };
    },
    {
        persist: {
            paths: ['resentSearches'],
        },
    }
);
