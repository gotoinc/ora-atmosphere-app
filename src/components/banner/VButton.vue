<template>
    <router-link v-if="to" :class="[buttonStyles, withIconStyles]" :to="to">
        <component :is="icon" v-if="icon" :class="iconStyles" />

        <slot></slot>
    </router-link>

    <button
        v-else
        :class="[buttonStyles, withIconStyles]"
        @click="emits('click')"
    >
        <component :is="icon" v-if="icon" :class="iconStyles" />

        <slot></slot>
    </button>
</template>

<script setup lang="ts">
    import type { Component } from 'vue';
    import { computed } from 'vue';
    import type { RouteLocationRaw } from 'vue-router';

    interface Props {
        to?: RouteLocationRaw;
        icon?: Component;
        variant?: 'white' | 'info' | 'outline';
    }

    interface Emits {
        (e: 'click'): void;
    }

    const props = withDefaults(defineProps<Props>(), {
        variant: 'white',
    });

    const emits = defineEmits<Emits>();

    /**
     * Define Button styles
     */
    const buttonStyles = computed(() => {
        switch (props.variant) {
            case 'white':
                return 'py-2 transition-all text-sm px-4 bg-white-100 font-extrabold rounded text-dark-grey hover:bg-white-75';
            case 'info':
                return 'py-2 transition-all text-sm px-4 bg-white-50 rounded font-extrabold hover:bg-white-25';
            case 'outline':
                return 'py-2 transition-all text-sm px-6 border border-solid border-white-100 rounded-[30px] font-light hover:bg-white-100 hover:text-dark-grey';
            default:
                return '';
        }
    });

    const iconStyles = 'h-6 w-6 fill-current';

    const withIconStyles = computed(() =>
        props.icon ? 'flex gap-1 items-center' : ''
    );
</script>

<style scoped></style>
