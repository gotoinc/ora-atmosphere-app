<template>
    <div
        class="sidebar absolute right-0 top-full overflow-y-auto bg-primary py-5 transition-all max-xl:w-full"
        :class="{
            'visible translate-x-0 opacity-100': modelValue,
            'invisible translate-x-full opacity-0': !modelValue,
        }"
    >
        <nav>
            <ul class="sidebar__main-list flex flex-col">
                <li
                    v-for="category in categories"
                    :key="category.id"
                    class="px-10 py-4"
                >
                    <div
                        :class="{
                            'mb-6': category.isOpen,
                        }"
                        class="flex items-center gap-4 transition-all"
                    >
                        <router-link
                            class="sidebar__link uppercase"
                            :to="{
                                name: 'categoryView',

                                params: {
                                    category: useTransformPath(category.name),
                                },
                            }"
                        >
                            {{ category.name }}
                        </router-link>

                        <button
                            :class="{
                                'rotate-180': category.isOpen,
                            }"
                            class="flex h-6 w-6 items-center justify-center transition-transform"
                            @click="toggleCategory(category.id)"
                        >
                            <component :is="IconArrowDown" />
                        </button>
                    </div>

                    <div
                        ref="subNodeList"
                        :data-id="category.id"
                        :class="{
                            'h-0 select-none !opacity-0': !category.isOpen,
                        }"
                        class="sidebar__sub-list flex flex-col overflow-hidden opacity-100 transition-all"
                    >
                        <ul class="space-y-4">
                            <li v-for="sub in category.subs" :key="sub.id">
                                <router-link
                                    class="sidebar__link"
                                    :to="{
                                        name: 'categoryView',
                                        params: {
                                            category: useTransformPath(
                                                sub.name
                                            ),
                                        },
                                    }"
                                >
                                    {{ sub.name }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import IconArrowDown from '@img/icons/arrow-down.svg?component';

    import { useTransformPath } from '@/hooks/useTransformPath.ts';
    import categoriesJson from '@/json/categories.json';

    interface Props {
        modelValue: boolean;
    }

    /**
     * Define test interfaces for categories
     */
    interface Category {
        id: number;
        name: string;
    }

    interface CategoryList extends Category {
        isOpen?: boolean;
        subs: Category[];
    }

    defineProps<Props>();

    /**
     * Node list of sub categories
     */
    const subNodeList = ref<HTMLElement[] | null>(null);

    /**
     * Categories data
     */
    const categories = ref<CategoryList[]>(categoriesJson);

    /**
     * Assign boolean property to toggle sub categories
     */
    categories.value.forEach((category) => {
        category.isOpen = false;
    });

    /**
     * Toggle function
     */
    const toggleCategory = (id: number) => {
        const category = categories.value.find((c) => c.id === id);

        if (category) {
            category.isOpen = !category.isOpen;

            // Set dynamically height to sub categories for smooth transition
            if (subNodeList.value) {
                subNodeList.value.forEach((sub) => {
                    if (sub.dataset.id === id.toString()) {
                        sub.style.height = category.isOpen
                            ? `${sub.scrollHeight.toString()}px`
                            : '0';
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .sidebar {
        max-height: 454px;

        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-thumb {
            background: #0acffe;
            border-radius: 10px;
        }

        &__link {
            @apply transition-colors hover:text-primary-light;
        }
    }
</style>
