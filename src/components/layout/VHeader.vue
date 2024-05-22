<template>
    <header class="relative left-0 top-0 z-50 w-full bg-gradient">
        <div class="cont flex items-center justify-between !py-6 xl:relative">
            <main-logo />
        </div>
    </header>
</template>

<script setup lang="ts">
    import MainLogo from '@/components/base/MainLogo.vue';
</script>

<style scoped>
    header {
        margin-bottom: -82px;
    }
</style>
