<template>
    <div
        ref="searchElement"
        :class="{
            active: isFiltersOpen,
        }"
        class="search relative transition-all max-lg:static max-lg:w-fit max-lg:!border-none"
    >
        <form class="search__wrap">
            <!-- Search input -->
            <v-input
                v-model="searchValue"
                placeholder="Search"
                :icon="IconSearch"
                variant="white"
                class="search__input relative z-20"
                :input-class="[inputClass, '!placeholder-white-100'].join(' ')"
                :icon-class="iconClass"
                @click="open"
            />

            <!-- Search filters -->
            <div class="search__filters">
                <div
                    ref="filtersScroll"
                    class="overflow -mr-5 overflow-y-auto pr-5"
                >
                    <!-- Recent searches list -->
                    <div class="mb-8">
                        <h3 class="mb-2 text-[10px] font-bold opacity-70">
                            Recent searches
                        </h3>

                        <ul>
                            <li
                                v-for="i in 3"
                                :key="i"
                                class="flex cursor-pointer items-center gap-3 rounded p-1 text-xs font-bold transition-colors hover:bg-white-25"
                            >
                                <component
                                    :is="IconRecent"
                                    class="h-4 w-4 flex-shrink-0 opacity-70"
                                />

                                Search
                            </li>
                        </ul>
                    </div>

                    <!-- Categories options -->
                    <div class="mb-4">
                        <h3 class="mb-3.5 text-base font-semibold">
                            Categories
                        </h3>

                        <ul class="grid grid-cols-3 gap-3 max-mob:grid-cols-2">
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

                    <!-- Language Contents -->
                    <div class="mb-4">
                        <h3 class="mb-3.5 text-base font-semibold">
                            Language Contents
                        </h3>

                        <ul class="flex flex-wrap gap-2">
                            <li
                                v-for="i in 4"
                                :key="i"
                                class="bordered cursor-pointer !rounded-md px-2 py-[3px] uppercase transition-colors hover:bg-white-100 hover:text-dark"
                            >
                                EN
                            </li>
                        </ul>
                    </div>

                    <!-- Tags options -->
                    <div>
                        <h3 class="mb-3.5 text-base font-semibold">
                            Topics/Tags
                        </h3>

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
    import { computed, onMounted, onUnmounted, ref } from 'vue';
    import IconClose from '@img/icons/close.svg?component';
    import IconRecent from '@img/icons/recent.svg?component';
    import IconSearch from '@img/icons/search.svg?component';
    import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

    import VInput from '@/components/base/input/VInput.vue';

    import type { Category } from '@/ts/interfaces/category';

    import searchCategories from '@/json/search-categories.json';

    /**
     * Define emits
     */
    interface Emits {
        (e: 'opened'): void;
        (e: 'closed'): void;
    }

    const emits = defineEmits<Emits>();

    const searchElement = ref<HTMLDivElement | null>(null);
    const filtersScroll = ref<HTMLElement | null>(null);
    const inputElement = ref<HTMLInputElement | null>(null);

    const isFiltersOpen = ref(false);
    const searchValue = ref('');

    const categories = ref<Category[]>([...searchCategories]);

    const selectedCategory = ref<null | Category>(null);

    /**
     * Define styles for input component
     */
    const inputClass = computed(() =>
        isFiltersOpen.value
            ? '!pb-1 !p-0 !border-transparent !rounded-none !border-b-white-100'
            : ''
    );
    const iconClass = computed(() =>
        [
            '!h-6 !w-6 !text-white-100',
            isFiltersOpen.value ? '!right-0' : '',
        ].join(' ')
    );

    const close = () => {
        isFiltersOpen.value = false;
        emits('closed');

        // Enable body scroll
        if (filtersScroll.value) enableBodyScroll(filtersScroll.value);
    };

    const open = () => {
        isFiltersOpen.value = true;
        emits('opened');

        // Focus input in filters
        if (inputElement.value) inputElement.value.focus();

        // Disable body scroll
        if (filtersScroll.value) disableBodyScroll(filtersScroll.value);
    };

    const setClickEvent = (e: Event) => {
        if (
            e.target !== searchElement.value &&
            searchElement.value &&
            !searchElement.value.contains(e.target as Node)
        ) {
            isFiltersOpen.value = false;
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
    .search {
        @apply w-full max-w-[535px] max-lg:max-w-fit;

        .overflow {
            max-height: calc(calc(var(--vh, 1vh) * 100) - 150px);

            &::-webkit-scrollbar {
                @apply h-1.5 w-1.5;
            }

            &::-webkit-scrollbar-thumb {
                @apply rounded-md bg-white-100;
            }
        }

        &__input {
            @apply h-11 max-w-[389px] transition-all;
        }

        &__wrap {
            @apply transition-all max-lg:invisible max-lg:absolute max-lg:left-1/2 max-lg:top-full max-lg:w-full max-lg:-translate-x-1/2 max-lg:opacity-0;
        }

        &__filters {
            @apply bordered absolute left-0 top-full z-10 w-full transform p-6 pt-14 opacity-0 transition-all max-lg:rounded-none max-lg:border-none max-lg:bg-primary-100 lg:bg-primary-100;
        }

        &__btn {
            @apply flex h-8 w-8 items-center justify-center rounded-md transition-colors lg:hidden;
        }

        &__icon {
            @apply absolute right-0 top-1/2 h-6 w-6 flex-shrink-0 -translate-y-1/2 cursor-pointer rounded transition-colors hover:bg-white-25;
        }

        /* When search is active  */
        &.active {
            @apply border-transparent;

            .search__wrap {
                @apply visible opacity-100;
            }

            .search__filters {
                @apply top-0 opacity-100;
            }

            .search__input {
                @apply max-w-full translate-y-3 px-6;
            }
        }
    }

    .bordered {
        @apply rounded-3xl border border-solid border-white-100;
    }
</style>
