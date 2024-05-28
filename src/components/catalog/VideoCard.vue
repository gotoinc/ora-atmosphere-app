<template>
    <div
        ref="videoCard"
        :class="{ 'expand group': expandOnHover }"
        class="video-card relative z-10 flex justify-center hover:z-20"
    >
        <div
            ref="videoCardWrap"
            class="video-card__wrap relative top-0 rounded-2xl transition-all group-hover:rounded-b-none"
        >
            <div
                class="video-card__bg relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl text-h2 transition-all group-hover:rounded-b-none max-xl:h-[180px]"
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
                class="video-card__content rounded-2xl rounded-t-none bg-dark p-[34px] transition-all max-xl:!visible max-xl:px-4 max-xl:py-6 max-xl:!opacity-100"
            >
                <div class="mb-6 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <!-- Play button -->
                        <button
                            class="flex h-11 w-11 items-center justify-center rounded-full bg-white-100 text-primary-100 transition-colors hover:bg-white-75"
                        >
                            <component :is="IconPlay" class="h-3 w-3" />
                        </button>

                        <h3
                            v-show="!openDescription"
                            class="text-h3 text-primary-50 max-xl:text-h4"
                        >
                            {{ name }}
                        </h3>
                    </div>

                    <!-- Open details button -->
                    <button
                        :class="{ 'rotate-180': openDescription }"
                        class="flex h-11 w-11 items-center justify-center rounded-full border border-solid border-white-100 text-white-100 transition-all hover:bg-white-100 hover:text-dark"
                        @click="emits('expand')"
                    >
                        <component
                            :is="IconChevronDown"
                            class="h-[31px] w-[31px]"
                        />
                    </button>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-4">
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

                <!-- Description block -->
                <div
                    ref="descriptionElement"
                    :style="{ height: descriptionElementHeight + 'px' }"
                    :aria-hidden="!openDescription"
                    class="video-card__desc mt-6 overflow-hidden text-left transition-all aria-hidden:mt-0 aria-hidden:h-0"
                >
                    <h3 class="mb-6 text-h3 text-primary-50 max-xl:text-h4">
                        {{ name }}
                    </h3>

                    <div class="video-card__text mb-8 overflow-y-auto pr-2.5">
                        <p>
                            Description Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est laborum.
                            Learn more Description Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est
                            laborum. Learn more
                        </p>
                    </div>

                    <ul class="flex flex-wrap gap-2">
                        <li
                            v-for="tag in searchTags"
                            :key="tag.id"
                            class="tag pointer-events-none"
                        >
                            {{ tag.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { nextTick, onMounted, ref, watch } from 'vue';
    import IconChevronDown from '@img/icons/chevron-down.svg?component';
    import IconPlay from '@img/icons/play.svg?component';
    import IconVoiceOff from '@img/icons/voice-off.svg?component';
    import IconVoiceOn from '@img/icons/voice-on.svg?component';

    import searchLangs from '@/fixtures/search-langs.json';
    import searchTags from '@/fixtures/search-tags.json';

    interface Props {
        name: string;
        img: string;
        voice?: boolean;
        audio?: boolean;
        expandOnHover?: boolean;
        openDescription?: boolean;
    }

    interface Emits {
        (e: 'expand'): void;
    }

    const props = withDefaults(defineProps<Props>(), {
        expandOnHover: true,
    });

    const emits = defineEmits<Emits>();

    const descriptionElement = ref<HTMLDivElement | null>(null);
    const descriptionElementHeight = ref(0);

    watch(
        () => props.openDescription,
        async () => {
            await nextTick();
            setHeight();
        }
    );

    const setHeight = () =>
        (descriptionElementHeight.value =
            props.openDescription && descriptionElement.value
                ? descriptionElement.value.scrollHeight
                : 0);

    onMounted(() => {
        setHeight();
    });
</script>

<style scoped lang="postcss">
    .video-card {
        &__wrap {
            width: 100%;
            height: 100%;
            box-shadow: 0 11px 58px 0 #00000080;
        }

        &__text {
            max-height: 193px;

            &::-webkit-scrollbar {
                width: 5px;
            }

            &::-webkit-scrollbar-thumb {
                background: #fff;
                border-radius: 20px;
            }
        }

        &:not(.expand) {
            .video-card__bg {
                height: 180px;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;

                @media screen and (min-width: 551px) {
                    height: 314px;
                }
            }
        }

        @media screen and (min-width: 1280px) {
            &.expand {
                height: 195px;

                .video-card__content {
                    opacity: 0;
                    visibility: hidden;
                }

                .video-card__wrap {
                    min-width: 233px;
                }

                &:hover {
                    .video-card__wrap {
                        max-width: 100%;
                        min-width: 23.95vw;
                        height: 13vw;
                        top: -20px;
                    }

                    .video-card__content {
                        opacity: 1;
                        visibility: visible;
                    }
                }
            }
        }
    }
</style>
