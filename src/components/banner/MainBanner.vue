<template>
    <section class="banner relative flex items-end">
        <div class="cont w-full">
            <div class="banner__img absolute left-0 top-0 h-full w-full">
                <img src="@img/banner.jpg" alt="Banner" class="img-cover" />
            </div>

            <!-- Back link -->
            <v-button
                v-if="showBackLink"
                variant="text"
                :icon="IconChevronLeft"
                class="mb-[9.6vw] !pl-0 max-2lg:mb-10"
                @click="router.go(-1)"
            >
                Back
            </v-button>

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
    import { computed } from 'vue';
    import { useRouter } from 'vue-router';
    import IconChevronLeft from '@img/icons/chevron-left.svg?component';
    import IconInfo from '@img/icons/info.svg?component';
    import IconPlay from '@img/icons/play.svg?component';

    import VButton from '@/components/banner/VButton.vue';

    const router = useRouter();

    const showBackLink = computed(() => {
        const name = router.currentRoute.value.name;

        return name === 'catalogThemeView' || name === 'catalogVideosView';
    });
</script>

<style scoped lang="postcss">
    .banner {
        padding-bottom: 37vh;
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
            padding-bottom: 400px;
        }

        @media screen and (max-height: 768px) {
            padding-bottom: 380px;
        }

        @media screen and (max-width: 1201px) {
            max-height: 625px;
            min-height: 625px;
            padding-bottom: 200px;
        }
    }
</style>
