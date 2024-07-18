import { ref } from 'vue';
import type { LocationQueryValue } from 'vue-router';

import { defineStore } from 'pinia';

import {
    // transformArraysFromQueries,
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

        const searchValue = ref(
            (router.currentRoute.value.query.value ?? '') as string
        );

        const selectedTags = ref<Array<string | LocationQueryValue>>([
            ...routerTags.value,
        ]);
        const selectedLangs = ref<Array<number | LocationQueryValue>>([
            ...routerLangs.value,
        ]);
        const selectedCategories = ref<Array<number | LocationQueryValue>>([
            ...routerCategories.value,
        ]);

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
                query: {
                    value: searchValue.value
                        ? useTransformPath(searchValue.value)
                        : '',
                    tags: selectedTags.value,
                    langs: selectedLangs.value,
                    categories: selectedCategories.value,
                },
            });

            if (
                searchValue.value &&
                !resentSearches.value.includes(searchValue.value)
            ) {
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
