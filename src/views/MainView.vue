<template>
    <v-header />

    <main class="flex flex-grow flex-col">
        <main-banner />

        <section class="bottom-section flex-grow">
            <div class="cont">
                <router-view></router-view>
            </div>
        </section>
    </main>

    <v-footer />
</template>

<script setup lang="ts">
    import MainBanner from '@/components/banner/MainBanner.vue';
    import VFooter from '@/components/layout/VFooter.vue';
    import VHeader from '@/components/layout/VHeader.vue';
</script>

<style scoped lang="postcss">
    .bottom-section {
        position: relative;
        z-index: 10;
        margin-top: -7vw;
        background: linear-gradient(
            180deg,
            rgba(73, 90, 255, 0) 0%,
            #141414 80px
        );
    }
</style>
