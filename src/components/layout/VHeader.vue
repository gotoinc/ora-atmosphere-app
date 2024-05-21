<template>
    <header class="relative left-0 top-0 z-50 w-full bg-gradient">
        <div class="cont flex items-center justify-between !py-6 xl:relative">
            <main-logo />

            <div class="relative flex items-center gap-10">
                <v-burger
                    v-model="isSidebarOpen"
                    @click="isSidebarOpen = !isSidebarOpen"
                />
            </div>

            <v-sidebar v-model="isSidebarOpen" />
        </div>
    </header>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import MainLogo from '@/components/base/MainLogo.vue';
    import VBurger from '@/components/base/VBurger.vue';
    import VSidebar from '@/components/layout/VSidebar.vue';

    const isSidebarOpen = ref(false);
</script>

<style scoped>
    header {
        margin-bottom: -82px;
    }
</style>
