<template>
    <section class="banner relative flex">
        <div class="cont w-full">
            <div class="banner__img absolute left-0 top-0 h-full w-full">
                <img src="@img/banner.jpg" alt="Banner" class="img-cover" />
            </div>

            <div class="banner__heading">
                <div class="mb-2 flex items-center gap-3">
                    <div class="banner__label pointer-events-none select-none">
                        <img
                            src="@img/ora-label.svg"
                            class="img-contain"
                            alt="ORA label"
                        />
                    </div>

                    <h3 class="font-light uppercase">Brands</h3>
                </div>

                <h1 class="mb-8 text-9xl font-extrabold max-2lg:text-[64px]">
                    Cisco
                </h1>

                <div class="flex gap-4">
                    <v-button variant="white" :icon="IconPlay"> Play </v-button>

                    <v-button :icon="IconInfo" variant="info">
                        More info
                    </v-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import IconInfo from '@img/icons/info.svg?component';
    import IconPlay from '@img/icons/play.svg?component';

    import VButton from '@/components/banner/VButton.vue';
</script>

<style scoped lang="postcss">
    .banner {
        padding-top: 35.6vh;
        max-height: 1080px;
        min-height: 900px;
        height: 100vh;

        &__img {
            z-index: -1;

            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(73, 90, 255, 0.35);
            }

            @media screen and (max-width: 551px) {
                img {
                    object-position: 25% 50%;
                }
            }
        }

        &__label {
            width: 30px;
            height: 28px;
        }

        @media screen and (min-height: 1080px) {
            padding-top: 385px;
        }

        @media screen and (max-height: 768px) {
            padding-top: 280px;
        }

        @media screen and (max-width: 1201px) {
            max-height: 625px;
            min-height: 625px;
            padding-top: 200px;
        }
    }
</style>
