<template>
    <div
        ref="searchElement"
        :class="{
            active: isFiltersOpen,
        }"
        class="search relative transition-all max-lg:static max-lg:w-fit max-lg:!border-none"
    >
        <form class="search__wrap" @submit.prevent>
            <!-- Search input -->
            <v-input
                v-model.trim="searchValue"
                placeholder="Search"
                :icon="IconSearch"
                variant="white"
                class="search__input relative z-20"
                :input-class="[inputClass, '!placeholder-white-100'].join(' ')"
                :icon-class="iconClass"
                icon-clickable
                @click-input="isFiltersOpen ? '' : open()"
                @click-icon="handleSearch"
                @enter="handleSearch"
            />

            <!-- Search filters -->
            <div class="search__filters bordered">
                <div
                    ref="filtersScroll"
                    class="overflow -mr-5 overflow-y-auto pr-5"
                >
                    <!-- Recent searches list -->
                    <div class="mb-6">
                        <template v-if="resentSearches.length > 0">
                            <h3 class="mb-2 text-[10px] font-bold opacity-70">
                                Recent searches
                            </h3>

                            <ul>
                                <li
                                    v-for="result in resentSearches.slice(0, 5)"
                                    :key="result"
                                    class="search__result"
                                    @click="handleSearch(result)"
                                >
                                    <component
                                        :is="IconRecent"
                                        class="h-4 w-4 flex-shrink-0 opacity-70"
                                    />

                                    {{ result }}
                                </li>
                            </ul>
                        </template>

                        <h3 v-else class="text-sm font-bold opacity-70">
                            No recent searches
                        </h3>
                    </div>

                    <!-- Categories options -->
                    <div class="mb-4">
                        <h3 class="mb-3.5 text-base font-semibold">
                            Categories
                        </h3>

                        <!-- Categories for desktop -->
                        <div
                            class="grid grid-cols-3 gap-3 max-sm:hidden max-mob:grid-cols-2"
                        >
                            <template v-if="isFiltersLoading">
                                <div
                                    v-for="i in 6"
                                    :key="i"
                                    class="flex items-center gap-2.5"
                                >
                                    <v-skeleton
                                        class="h-14 w-14 flex-shrink-0 rounded-lg bg-white-15"
                                    />

                                    <v-skeleton
                                        class="h-4 w-full max-w-14 rounded bg-white-15"
                                    />
                                </div>
                            </template>

                            <template
                                v-else-if="searchFilters.categories.length > 0"
                            >
                                <category-filters
                                    v-model="selectedCategories"
                                    :categories="searchFilters.categories"
                                />
                            </template>

                            <p v-else>No categories found.</p>
                        </div>

                        <!-- Categories for mobile -->
                        <div class="sm:hidden">
                            <template v-if="isFiltersLoading">
                                <fancy-carousel>
                                    <div
                                        v-for="i in 3"
                                        :key="i"
                                        class="f-carousel__slide !mr-5 flex !max-w-44 items-center gap-2.5"
                                    >
                                        <v-skeleton
                                            class="h-14 w-14 flex-shrink-0 rounded-lg bg-white-15"
                                        />

                                        <v-skeleton
                                            class="h-4 w-full rounded bg-white-15"
                                        />
                                    </div>
                                </fancy-carousel>
                            </template>

                            <template v-else-if="searchFilters">
                                <fancy-carousel>
                                    <category-filters
                                        v-model="selectedCategories"
                                        category-class="f-carousel__slide !w-fit !mr-5"
                                        :categories="searchFilters.categories"
                                    />
                                </fancy-carousel>
                            </template>

                            <p v-else>No categories found.</p>
                        </div>
                    </div>

                    <!-- Language Contents -->
                    <div class="mb-4">
                        <h3 class="mb-3.5 text-base font-semibold">
                            Language Contents
                        </h3>

                        <div class="flex flex-wrap gap-2">
                            <template v-if="isFiltersLoading">
                                <v-skeleton
                                    v-for="i in 4"
                                    :key="i"
                                    class="h-8 w-10 rounded-lg bg-white-15"
                                />
                            </template>

                            <template
                                v-else-if="searchFilters.langs.length > 0"
                            >
                                <label
                                    v-for="lang in searchFilters.langs"
                                    :key="lang.id"
                                    :class="{
                                        'tag--fill': selectedLangs.includes(
                                            lang.id
                                        ),
                                    }"
                                    class="tag tag--lang"
                                >
                                    <input
                                        v-model="selectedLangs"
                                        class="hidden"
                                        type="checkbox"
                                        :value="lang.id"
                                    />

                                    {{ lang.name }}
                                </label>
                            </template>

                            <p v-else class="f-carousel__slide">
                                No languages found.
                            </p>
                        </div>
                    </div>

                    <!-- Tags options -->
                    <div>
                        <h3 class="mb-3.5 text-base font-semibold">
                            Topics/Tags
                        </h3>

                        <div class="flex flex-wrap gap-2">
                            <template v-if="isFiltersLoading">
                                <v-skeleton
                                    v-for="i in 8"
                                    :key="i"
                                    class="h-8 w-20 rounded-lg bg-white-15"
                                />
                            </template>

                            <template v-else-if="searchFilters.tags.length > 0">
                                <label
                                    v-for="tag in searchFilters.tags"
                                    :key="tag"
                                    :class="{
                                        'tag--fill': selectedTags.includes(tag),
                                    }"
                                    class="tag"
                                >
                                    <input
                                        v-model="selectedTags"
                                        class="hidden"
                                        type="checkbox"
                                        :value="tag"
                                    />
                                    {{ tag }}
                                </label>
                            </template>

                            <p v-else class="f-carousel__slide">
                                No tags found.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <!-- Button for tablet and mobile -->
        <button
            class="search__btn"
            :class="{
                'bg-white-15': isFiltersOpen,
            }"
            @click="isFiltersOpen ? close() : open()"
        >
            <component
                :is="IconSearch"
                v-show="!isFiltersOpen"
                class="h-6 w-6 flex-shrink-0"
            />

            <component
                :is="IconClose"
                v-show="isFiltersOpen"
                class="h-3.5 w-3.5 flex-shrink-0"
            />
        </button>
    </div>
</template>

<script setup lang="ts">
    import {
        computed,
        onMounted,
        onUnmounted,
        reactive,
        ref,
        watch,
    } from 'vue';
    import IconClose from '@img/icons/close.svg?component';
    import IconRecent from '@img/icons/recent.svg?component';
    import IconSearch from '@img/icons/search.svg?component';
    import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

    import VInput from '@/components/base/input/VInput.vue';
    import VSkeleton from '@/components/base/VSkeleton.vue';
    import FancyCarousel from '@/components/carousel/FancyCarousel.vue';
    import CategoryFilters from '@/components/search/CategoryFilters.vue';

    import { storeToRefs } from 'pinia';
    import { useSearchStore } from '@/stores/search.store.ts';

    import { getCategories } from '@/api/catalog/get-categories.api.ts';
    import { getLanguages } from '@/api/search/get-languages.api.ts';
    import { useClickOutsideElement } from '@/hooks/useClickOutsideElement.ts';
    import type { SearchFilters } from '@/ts/search';

    /**
     * Define emits
     */
    interface Emits {
        (e: 'opened'): void;
        (e: 'closed'): void;
    }

    const emits = defineEmits<Emits>();

    /**
     * DOM elements
     */
    const searchElement = ref<HTMLElement | null>(null);
    const filtersScroll = ref<HTMLElement | null>(null);

    /**
     * Filters data
     */
    const isFiltersOpen = ref(false);
    const isFiltersLoading = ref(false);

    const searchFilters = reactive<SearchFilters>({
        langs: [],
        tags: [],
        categories: [],
    });

    const searchStore = useSearchStore();
    const {
        resentSearches,
        selectedLangs,
        searchValue,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        selectedCategories,
        selectedTags,
    } = storeToRefs(searchStore);

    /**
     * Define styles for input component
     */
    const inputClass = computed(() =>
        isFiltersOpen.value
            ? '!pb-1 !p-0 !border-transparent !placeholder-transparent !rounded-none !border-b-white-100'
            : ''
    );
    const iconClass = computed(() =>
        [
            '!h-6 !w-6 !text-white-100 rounded hover:bg-white-25',
            isFiltersOpen.value ? '!right-0' : '',
        ].join(' ')
    );

    /**
     * Function for close filters
     */
    const close = () => {
        isFiltersOpen.value = false;
        emits('closed');
    };

    /**
     * Function for opening filters
     */
    let isLoaded = false;

    const open = async () => {
        isFiltersOpen.value = true;

        if (!isLoaded) {
            isFiltersLoading.value = true;

            try {
                searchFilters.categories = (await getCategories()) ?? [];
                searchFilters.langs = (await getLanguages()) ?? [];
                searchFilters.tags = [
                    'sport',
                    'entertainment',
                    'art',
                    'science',
                ];
            } finally {
                isFiltersLoading.value = false;
                isLoaded = true;
            }
        }

        emits('opened');
    };

    /**
     * Function for handle click and close filters when user clicks outside of component
     */
    const setClickEvent = (e: Event) => {
        if (searchElement.value)
            useClickOutsideElement(e, searchElement.value, () => {
                close();
            });
    };

    /**
     * Watch state of filters to manipulate with scroll
     */
    watch(isFiltersOpen, (value) => {
        if (filtersScroll.value) {
            value
                ? disableBodyScroll(filtersScroll.value)
                : enableBodyScroll(filtersScroll.value);
        }
    });

    /**
     * Function for searching
     */
    const handleSearch = (value?: string) => {
        if (value) searchValue.value = value;

        if (
            value ||
            selectedTags.value.length > 0 ||
            selectedLangs.value.length > 0 ||
            selectedCategories.value.length > 0
        ) {
            searchStore.onSearch();
            close();
        }
    };

    onMounted(() => {
        document.addEventListener('click', setClickEvent);
    });

    onUnmounted(() => {
        document.removeEventListener('click', setClickEvent);
    });
</script>

<style scoped lang="postcss">
    @import './main-search.pcss';
</style>
