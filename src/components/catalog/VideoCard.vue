<template>
    <div
        ref="videoCard"
        class="video-card group relative z-10 flex justify-center hover:z-20 max-xl:!h-auto"
    >
        <div
            ref="videoCardWrap"
            class="video-card__wrap relative top-0 transition-all"
        >
            <div
                class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl text-h2 transition-all group-hover:rounded-b-none max-xl:h-[180px]"
            >
                <div
                    class="absolute left-0 top-0 -z-10 h-full w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:content-normal before:bg-primary-100/35"
                >
                    <img
                        :src="img"
                        class="img-cover transition-transform group-hover:scale-110"
                        :alt="name"
                    />
                </div>

                {{ name }}
            </div>

            <div
                class="video-card__content invisible rounded-2xl rounded-t-none bg-dark p-[34px] opacity-0 transition-all max-xl:!visible max-xl:px-4 max-xl:py-6 max-xl:!opacity-100"
            >
                <div class="mb-6 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <!-- Play button -->
                        <button
                            class="flex h-11 w-11 items-center justify-center rounded-full bg-white-100 text-primary-100 transition-colors hover:bg-white-75"
                        >
                            <component :is="IconPlay" class="h-7 w-7" />
                        </button>

                        <span class="text-h3 text-primary-50 max-xl:text-h4">
                            {{ name }}
                        </span>
                    </div>

                    <!-- Open details button -->
                    <button
                        class="flex h-11 w-11 items-center justify-center rounded-full border border-solid border-white-100 text-white-100 transition-colors hover:bg-white-100 hover:text-dark"
                    >
                        <component
                            :is="IconChevronDown"
                            class="h-[31px] w-[31px]"
                        />
                    </button>
                </div>

                <div
                    class="flex items-center justify-between gap-4 max-xl:flex-wrap"
                >
                    <ul class="languages flex items-center gap-1.5">
                        <li
                            v-for="lang in searchLangs"
                            :key="lang.id"
                            class="tag tag--lang pointer-events-none"
                        >
                            {{ lang.name }}
                        </li>
                    </ul>

                    <div class="flex items-center gap-2.5">
                        <div class="flex items-center gap-3">
                            <component
                                :is="IconVoiceOn"
                                v-if="voice"
                                class="h-6 w-6 text-white-100"
                            />

                            <component
                                :is="IconVoiceOff"
                                v-else
                                class="h-6 w-6 text-white-100"
                            />

                            <img
                                v-if="!audio"
                                src="@img/icons/audio-off.svg"
                                class="h-6 w-6 object-contain"
                                alt=""
                            />

                            <img
                                v-else
                                src="@img/icons/audio-on.svg"
                                class="h-6 w-6 object-contain"
                                alt=""
                            />
                        </div>

                        <div class="tag tag--lang pointer-events-none">
                            02:35
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import IconChevronDown from '@img/icons/chevron-down.svg?component';
    import IconPlay from '@img/icons/play.svg?component';
    import IconVoiceOff from '@img/icons/voice-off.svg?component';
    import IconVoiceOn from '@img/icons/voice-on.svg?component';

    import searchLangs from '@/fixtures/search-langs.json';

    interface Props {
        name: string;
        img: string;
        voice?: boolean;
        audio?: boolean;
    }

    defineProps<Props>();
</script>

<style scoped lang="postcss">
    .video-card {
        height: 195px;

        &__wrap {
            width: 100%;
            height: 100%;
            box-shadow: 0 11px 58px 0 #00000080;
        }

        @media screen and (min-width: 1280px) {
            &__wrap {
                min-width: 233px;
            }

            &:hover {
                .video-card__wrap {
                    max-width: 100%;
                    min-width: 460px;
                    height: 245px;
                    top: -20px;
                }

                .video-card__content {
                    opacity: 1;
                    visibility: visible;
                }
            }
        }
    }
</style>
