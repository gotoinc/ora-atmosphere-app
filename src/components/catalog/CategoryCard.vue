<template>
    <router-link
        :to="to"
        class="card group relative flex items-center justify-center overflow-hidden rounded-2xl text-h2 max-sm:!max-w-[268px]"
    >
        <div class="absolute left-0 top-0 -z-10 h-full w-full">
            <img
                :src="img"
                class="img-cover transition-transform group-hover:scale-110"
                :alt="name"
            />
        </div>

        {{ name }}
    </router-link>
</template>

<script setup lang="ts">
    import type { RouteLocationRaw } from 'vue-router';

    interface Props {
        name: string;
        img: string;
        to: RouteLocationRaw;
    }

    defineProps<Props>();
</script>

<style scoped lang="postcss">
    .card {
        max-width: 347px;
        min-height: 195px;
    }
</style>
