<template>
    <v-header />

    <main class="flex flex-grow flex-col">
        <main-banner />

        <section class="bottom-section flex-grow bg-dark">
            <div class="cont relative z-10">
                <router-view></router-view>
            </div>
        </section>
    </main>

    <teleport to="body">
        <video-popup />
    </teleport>
</template>

<script setup lang="ts">
    import MainBanner from '@/components/banner/MainBanner.vue';
    import VHeader from '@/components/layout/VHeader.vue';
    import VideoPopup from '@/components/popup/VideoPopup.vue';
</script>

<style scoped lang="postcss">
    .bottom-section {
        position: relative;
        z-index: 10;
        padding-bottom: 105px;

        .cont {
            margin-top: -380px;

            @media screen and (min-height: 1080px) {
                margin-top: -380px;
            }

            /*@media screen and (max-height: 768px) {
                margin-top: -200px;
            }*/

            @media screen and (max-width: 1201px) {
                margin-top: -120px;
            }
        }

        &:before {
            content: '';
            position: absolute;
            top: -380px;
            pointer-events: none;

            width: 100%;
            height: 806px;
            background: linear-gradient(
                180deg,
                rgba(73, 90, 255, 0) 0%,
                #141414 7.48%
            );

            @media screen and (min-height: 1440px) {
                top: -380px;
            }

            @media screen and (max-width: 1201px) {
                top: -118px;
            }
        }
    }
</style>
