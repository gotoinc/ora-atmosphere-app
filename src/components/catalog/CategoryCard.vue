<template>
    <router-link
        :to="to"
        class="card group relative flex items-center justify-center overflow-hidden rounded-2xl text-h2"
    >
        <div
            class="absolute left-0 top-0 -z-10 h-full w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:content-normal before:bg-primary-100/35"
        >
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

        &__img:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            background:;
        }
    }
</style>
