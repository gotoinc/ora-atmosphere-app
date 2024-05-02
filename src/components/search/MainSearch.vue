<template>
    <form
        v-click-outside="() => (isFiltersOpen = false)"
        :class="{
            active: isFiltersOpen,
        }"
        class="search bordered relative w-full transition-all"
    >
        <!-- Search input -->
        <div class="search__input">
            <input
                v-model="searchValue"
                type="text"
                class="w-full bg-transparent"
                @focus="isFiltersOpen = true"
            />

            <component :is="IconSearch" class="h-6 w-6 flex-shrink-0" />
        </div>

        <!-- Search filters -->
        <div class="search__filters">
            <!-- Recent searches list -->
            <div class="mb-8">
                <h3 class="mb-2 text-xs font-bold opacity-70">
                    Recent searches
                </h3>

                <ul>
                    <li
                        v-for="i in 3"
                        :key="i"
                        class="flex cursor-pointer items-center gap-3 rounded p-1 text-xs font-bold transition-colors hover:bg-white-25"
                    >
                        <component
                            :is="IconSearch"
                            class="h-4 w-4 flex-shrink-0 opacity-70"
                        />

                        Search
                    </li>
                </ul>
            </div>

            <!-- Categories options -->
            <div class="mb-6 text-sm font-bold">
                <h3 class="mb-3.5">Categories</h3>

                <ul class="grid grid-cols-3 gap-3">
                    <li
                        v-for="category in categories"
                        :key="category.id"
                        :class="{
                            '!opacity-100':
                                category.id === selectedCategory?.id,
                        }"
                        class="flex cursor-pointer items-center gap-2.5 opacity-70 transition-opacity"
                        @click="selectedCategory = category"
                    >
                        <div
                            class="h-14 w-14 flex-shrink-0 rounded-lg bg-white-75"
                        ></div>

                        <h4 class="text-xs font-semibold">
                            {{ category.name }}
                        </h4>
                    </li>
                </ul>
            </div>

            <!-- Tags options -->
            <div>
                <h3 class="mb-3.5">Topics/Tags</h3>

                <ul class="flex flex-wrap gap-2">
                    <li
                        v-for="i in 9"
                        :key="i"
                        class="bordered cursor-pointer px-4 py-1 text-xs font-semibold lowercase transition-colors hover:bg-white-100 hover:text-dark"
                    >
                        schools
                    </li>
                </ul>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import IconSearch from '@img/icons/search.svg?component';

    import type { Category } from '@/ts/interfaces/category';

    import searchCategories from '@/json/search-categories.json';

    const isFiltersOpen = ref(false);
    const searchValue = ref('');

    const categories = ref<Category[]>([...searchCategories]);

    const selectedCategory = ref<null | Category>(null);
</script>

<style scoped>
    .search {
        max-width: 514px;

        &__input {
            @apply relative z-10 flex items-center gap-2 px-3.5 py-1.5 transition-all;

            input {
                @apply -mb-2 border-b border-solid border-transparent pb-2 transition-all;
            }
        }

        &__filters {
            @apply bordered absolute -top-1.5 left-0 w-full bg-gradient-search pt-14 opacity-0 transition-all;
        }

        &.active {
            @apply border-transparent;

            .search__input {
                @apply px-9;

                input {
                    @apply border-white-100;
                }
            }

            .search__filters {
                @apply px-9 pb-9 opacity-100;
            }
        }
    }

    .bordered {
        @apply rounded-3xl border border-solid border-white-100;
    }
</style>
