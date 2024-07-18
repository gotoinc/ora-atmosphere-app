<template>
    <div
        :class="{ 'cursor-pointer': to }"
        class="group relative flex w-fit items-center"
    >
        <h3 class="w-fit text-h5 font-light uppercase">
            <slot></slot>
        </h3>

        <router-link
            v-if="to"
            :to="to"
            class="link absolute flex w-full items-center gap-1 py-2 transition-all"
        >
            <span
                class="invisible whitespace-nowrap font-bold opacity-0 transition-all group-hover:visible group-hover:opacity-100"
            >
                Explore All
            </span>

            <component :is="IconChevronRight" class="h-6 w-6 flex-shrink-0" />
        </router-link>
    </div>
</template>

<script setup lang="ts">
    import type { RouteLocationRaw } from 'vue-router';
    import IconChevronRight from '@img/icons/chevron-right.svg?component';

    defineProps<{ to?: RouteLocationRaw }>();
</script>

<style scoped lang="postcss">
    .group {
        .link {
            margin-left: calc(100% - 81px);
        }

        &:hover {
            .link {
                padding-left: calc(100% + 20px);
                margin-left: 0;
            }
        }
    }
</style>
