<template>
    <div
        v-if="total"
        class="pagination slide-up flex items-center justify-center gap-4"
    >
        <button
            class="arrow"
            :class="{ '!hidden': currentPage === 1 }"
            @click="changePage(currentPage - 1)"
        >
            <component :is="IconChevronLeft" class="h-6 w-6" />
        </button>

        <div class="flex items-center gap-2">
            <button
                v-for="(page, i) in displayPages"
                :key="i"
                :class="{ 'bg-white-15': page === currentPage }"
                :disabled="page === -1"
                class="h-8 w-8 rounded-md transition-colors hover:bg-white-15"
                @click="changePage(page)"
            >
                {{ page === -1 ? '...' : page }}
            </button>
        </div>

        <button
            class="arrow"
            :class="{ '!hidden': currentPage === pageCount && isNextPage }"
            @click="changePage(currentPage + 1)"
        >
            <component :is="IconChevronRight" class="h-6 w-6" />
        </button>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import IconChevronLeft from '@img/icons/chevron-left.svg?component';
    import IconChevronRight from '@img/icons/chevron-right.svg?component';

    interface Props {
        currentPage: number;
        total: number;
        changeRoute?: boolean;
        viewPerPage: number;
        range?: number;
        isNextPage?: boolean;
    }

    interface Emits {
        (e: 'changePage', value: number): void;
    }

    const props = withDefaults(defineProps<Props>(), {
        isNextPage: true,
        range: 10,
    });

    const emits = defineEmits<Emits>();

    const router = useRouter();
    const route = useRoute();

    const pageCount = computed(() =>
        Math.ceil(props.total / Number(props.viewPerPage))
    );

    const displayPages = computed(() => {
        const startPage = Math.max(1, props.currentPage - props.range);
        const endPage = Math.min(
            pageCount.value,
            props.currentPage + props.range
        );

        const pages = [];

        if (startPage !== 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push(-1); // marker for missing pages
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage !== pageCount.value) {
            if (pageCount.value - endPage > 1) {
                pages.push(-1); // marker for missing pages
            }
            pages.push(pageCount.value);
        }

        return pages;
    });

    function changePage(page: number) {
        if (page <= 0 || page > pageCount.value) return;

        emits('changePage', page);

        if (props.changeRoute) {
            void router.replace({
                path: route.path,
                query: {
                    ...route.query,
                    page: page,
                },
            });
        }
    }
</script>

<style scoped lang="postcss">
    .arrow {
        @apply flex h-8 w-8 items-center justify-center rounded-md text-white-100 transition-colors hover:bg-white-15;
    }
</style>
