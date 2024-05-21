<template>
    <router-link
        v-if="to"
        :class="[baseStyles, buttonStyles, withIconStyles]"
        :to="to"
    >
        <component :is="icon" v-if="icon" :class="iconStyles" />

        <slot></slot>
    </router-link>

    <button
        v-else
        :class="[baseStyles, buttonStyles, withIconStyles]"
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
        variant?: 'primary' | 'white' | 'info' | 'outline';
    }

    interface Emits {
        (e: 'click'): void;
    }

    const props = withDefaults(defineProps<Props>(), {
        variant: 'primary',
    });

    const emits = defineEmits<Emits>();

    /**
     * Define Button styles
     */
    const buttonStyles = computed(() => {
        switch (props.variant) {
            case 'primary':
                return 'bg-primary-100 text-white-100 hover:bg-primary-200';
            case 'white':
                return 'bg-white-100 text-primary-100 hover:bg-primary-100 hover:text-white-100';
            case 'info':
                return 'bg-white-50 hover:bg-white-25';
            case 'outline':
                return 'border border-solid border-primary-100 text-primary-100 hover:bg-primary-100 hover:text-white-100';
            default:
                return '';
        }
    });

    const iconStyles = 'h-6 w-6 fill-current';

    const baseStyles = computed(
        () => 'py-2.5 px-4 font-bold text-base transition-all rounded-[32px]'
    );

    const withIconStyles = computed(() =>
        props.icon ? 'flex gap-1 items-center' : ''
    );
</script>

<style scoped></style>
