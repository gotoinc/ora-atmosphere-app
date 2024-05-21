<template>
    <div class="flex items-end gap-4">
        <router-link
            class="transition-transform hover:scale-110"
            to="/"
            aria-label="ORA Application simulator"
        >
            <img
                :src="variant === 'white' ? LogoImg : LogoDarkImg"
                alt="ORA Application simulator"
            />
        </router-link>

        <span
            :class="{ 'text-dark': variant === 'dark' }"
            class="pointer-events-none text-xs uppercase"
        >
            Application simulator
        </span>
    </div>
</template>

<script setup lang="ts">
    import LogoImg from '@img/logo.svg';
    import LogoDarkImg from '@img/logo-dark.svg';

    interface Props {
        variant?: 'white' | 'dark';
    }

    withDefaults(defineProps<Props>(), {
        variant: 'white',
    });
</script>

<style scoped>
    img {
        width: 96px;
        height: 26px;
    }
</style>
