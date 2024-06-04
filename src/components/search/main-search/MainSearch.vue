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
                @click-input="open"
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

                        <!-- Matched results -->
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
                            <template v-if="isFiltersLoaded">
                                <category-filters
                                    v-model="selectedCategories"
                                    :categories="categories"
                                />
                            </template>

                            <template v-else>
                                <div
                                    v-for="i in 6"
                                    :key="i"
                                    class="flex items-center gap-2.5"
                                >
                                    <v-skeleton
                                        class="h-14 w-14 flex-shrink-0 rounded-lg"
                                    />

                                    <v-skeleton
                                        class="h-4 w-full max-w-14 rounded"
                                    />
                                </div>
                            </template>
                        </div>

                        <!-- Categories for mobile -->
                        <template v-if="isFiltersLoaded">
                            <fancy-carousel class="sm:hidden">
                                <template v-if="isFiltersLoaded">
                                    <category-filters
                                        v-model="selectedCategories"
                                        category-class="f-carousel__slide !w-fit !mr-5"
                                        :categories="categories"
                                    />
                                </template>

                                <template v-else>
                                    <div
                                        v-for="i in 3"
                                        :key="i"
                                        class="f-carousel__slide !mr-5 flex !max-w-44 items-center gap-2.5"
                                    >
                                        <v-skeleton
                                            class="h-14 w-14 flex-shrink-0 rounded-lg"
                                        />

                                        <v-skeleton
                                            class="h-4 w-full rounded"
                                        />
                                    </div>
                                </template>
                            </fancy-carousel>
                        </template>

                        <template v-else>
                            <div class="grid grid-cols-2 gap-2 sm:hidden">
                                <div
                                    v-for="i in 2"
                                    :key="i"
                                    class="flex max-w-44 items-center gap-2.5"
                                >
                                    <v-skeleton
                                        class="h-14 w-14 flex-shrink-0 rounded-lg"
                                    />

                                    <v-skeleton class="h-4 w-full rounded" />
                                </div>
                            </div>
                        </template>
                    </div>

                    <!-- Language Contents -->
                    <div class="mb-4">
                        <h3 class="mb-3.5 text-base font-semibold">
                            Language Contents
                        </h3>

                        <div class="flex flex-wrap gap-2">
                            <template v-if="isFiltersLoaded">
                                <label
                                    v-for="lang in searchLangs"
                                    :key="lang.id"
                                    :class="{
                                        'tag--fill':
                                            lang.name ===
                                            useGetItemByName(
                                                selectedLangs,
                                                lang.name
                                            ),
                                    }"
                                    class="tag tag--lang"
                                >
                                    <input
                                        v-model="selectedLangs"
                                        class="hidden"
                                        type="checkbox"
                                        :value="lang.name"
                                    />

                                    {{ lang.name }}
                                </label>
                            </template>

                            <template v-else>
                                <v-skeleton
                                    v-for="i in 4"
                                    :key="i"
                                    class="h-8 w-10 rounded-lg"
                                />
                            </template>
                        </div>
                    </div>

                    <!-- Tags options -->
                    <div>
                        <h3 class="mb-3.5 text-base font-semibold">
                            Topics/Tags
                        </h3>

                        <div class="flex flex-wrap gap-2">
                            <template v-if="isFiltersLoaded">
                                <label
                                    v-for="tag in searchTags"
                                    :key="tag.id"
                                    :class="{
                                        'tag--fill':
                                            tag.name ===
                                            useGetItemByName(
                                                selectedTags,
                                                tag.name
                                            ),
                                    }"
                                    class="tag"
                                >
                                    <input
                                        v-model="selectedTags"
                                        class="hidden"
                                        type="checkbox"
                                        :value="tag.name"
                                    />
                                    {{ tag.name }}
                                </label>
                            </template>

                            <template v-else>
                                <v-skeleton
                                    v-for="i in 8"
                                    :key="i"
                                    class="h-8 w-20 rounded-lg"
                                />
                            </template>
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
    import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
    import IconClose from '@img/icons/close.svg?component';
    import IconRecent from '@img/icons/recent.svg?component';
    import IconSearch from '@img/icons/search.svg?component';
    import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

    import VInput from '@/components/base/input/VInput.vue';
    import VSkeleton from '@/components/base/VSkeleton.vue';
    import FancyCarousel from '@/components/carousel/FancyCarousel.vue';
    import CategoryFilters from '@/components/search/CategoryFilters.vue';

    import type { Category } from '@/ts/interfaces/category';

    import { storeToRefs } from 'pinia';
    import { useSearchStore } from '@/stores/search.store.ts';

    import searchCategories from '@/fixtures/search-categories.json';
    import searchLangs from '@/fixtures/search-langs.json';
    import searchTags from '@/fixtures/search-tags.json';
    import { useClickOutsideElement } from '@/hooks/useClickOutsideElement.ts';
    import { useGetItemByName } from '@/hooks/useGetItemByName.ts';

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
    const isFiltersLoaded = ref(false);

    const categories = ref<Category[]>([...searchCategories]);

    const searchStore = useSearchStore();
    const {
        resentSearches,
        selectedLangs,
        searchValue,
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
    const open = () => {
        isFiltersOpen.value = true;
        isFiltersLoaded.value = true;

        emits('opened');
    };

    /**
     * Function for handle click and close filters when user clicks outside of component
     */
    const setClickEvent = (e: Event) => {
        if (searchElement.value)
            useClickOutsideElement(e, searchElement.value, () => {
                isFiltersOpen.value = false;
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

        if (searchValue.value) {
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
