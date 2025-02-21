<template>
    <router-link
        v-if="to"
        :class="allButtonStyles"
        class="inline-block"
        :to="to"
    >
        <component :is="icon" v-if="icon" :class="allIconStyles" />

        <span :class="{ hidden: loading }">
            <slot></slot>
        </span>

        <span :class="loaderStyles" class="loader-btn"></span>
    </router-link>

    <button
        v-else
        :type="type"
        :class="allButtonStyles"
        @click="emits('click')"
    >
        <component :is="icon" v-if="icon" :class="allIconStyles" />

        <span :class="{ hidden: loading }">
            <slot></slot>
        </span>

        <span :class="loaderStyles" class="loader-btn"></span>
    </button>
</template>

<script setup lang="ts">
    import type { Component } from 'vue';
    import { computed } from 'vue';
    import type { RouteLocationRaw } from 'vue-router';

    interface Props {
        to?: RouteLocationRaw;
        icon?: Component;
        appendIcon?: Component;
        iconClass?: string;
        reverse?: boolean;
        type?: 'button' | 'submit' | 'reset' | undefined;
        variant?: 'primary' | 'white' | 'info' | 'outline' | 'text';
        loading?: boolean;
        disabled?: boolean;
    }

    interface Emits {
        (e: 'click'): void;
    }

    const props = withDefaults(defineProps<Props>(), {
        variant: 'primary',
        type: 'button',
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
            case 'text':
                return 'bg-transparent hover-link';
            case 'outline':
                return 'border border-solid border-primary-100 text-primary-100 hover:bg-primary-100 hover:text-white-100';
            default:
                return '';
        }
    });

    const iconStyles = 'h-6 w-6 fill-current';

    const baseStyles = computed(
        () =>
            'py-2.5 px-6 min-h-11 text-center font-bold text-base transition-all rounded-[32px]'
    );

    const withIconStyles = computed(() =>
        props.icon
            ? props.reverse
                ? 'flex flex-row-reverse gap-1 items-center'
                : 'flex gap-1 items-center'
            : ''
    );

    const loaderStyles = computed(() => {
        return {
            '!hidden': !props.loading,
            '!border-primary-100 !border-l-transparent':
                props.variant === 'white',
        };
    });

    const allIconStyles = computed(() => [
        iconStyles,
        props.iconClass,
        { '!hidden': props.loading },
    ]);

    const allButtonStyles = computed(() => [
        baseStyles.value,
        buttonStyles.value,
        withIconStyles.value,
        { 'pointer-events-none': props.loading },
        { 'pointer-events-none opacity-50': props.disabled },
    ]);
</script>

<style scoped lang="postcss"></style>
