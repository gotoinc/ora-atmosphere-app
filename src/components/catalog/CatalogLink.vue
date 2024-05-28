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
            class="absolute -right-[30px] flex items-center gap-1 py-2 pl-6 transition-all group-hover:translate-x-[105px]"
        >
            <span
                class="invisible whitespace-nowrap font-bold opacity-0 transition-all group-hover:visible group-hover:opacity-100"
            >
                Explore All
            </span>

            <component :is="IconChevronRight" class="h-6 w-6" />
        </router-link>
    </div>
</template>

<script setup lang="ts">
    import type { RouteLocationRaw } from 'vue-router';
    import IconChevronRight from '@img/icons/chevron-right.svg?component';

    defineProps<{ to?: RouteLocationRaw }>();
</script>

<style scoped></style>
