<template>
    <section class="banner relative flex items-end">
        <div class="cont">
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

                <h1 class="mb-8 text-9xl font-extrabold">Cisco</h1>

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
        min-height: 600px;
        height: 56.25vw;
        max-height: 90vh;
        padding-bottom: 13vw;

        &__img {
            z-index: -1;

            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(73, 90, 255, 0.35);
            }
        }

        &__label {
            width: 30px;
            height: 28px;
        }
    }
</style>
