<template>
    <div
        ref="reference"
        :class="{
            'expand group': expandOnHover,
            'disable text-grey-150': isDisabled,
            'cursor-pointer': !isDisabled,
        }"
        class="video-card relative z-10 flex justify-center hover:z-20"
        @click="isDisabled ? '' : emits('select')"
    >
        <div
            :class="{ 'group-hover:rounded-b-none': !isDisabled }"
            class="video-card__wrap relative top-0 rounded-2xl transition-all"
        >
            <div
                :class="{ 'group-hover:rounded-b-none': !isDisabled }"
                class="video-card__bg relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-primary-dark p-2 text-center text-h2 transition-all max-xl:h-[180px] max-xl:rounded-b-none max-xl:text-h3"
            >
                <div
                    class="absolute left-0 top-0 z-10 h-full w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:content-normal before:bg-primary-100/35"
                >
                    <img
                        v-if="data.preview_image"
                        :class="{
                            'saturate-0': isDisabled,
                        }"
                        :src="data.preview_image"
                        class="img-cover opacity-50 transition-transform group-hover:scale-110"
                        :alt="data.title"
                    />
                </div>

                <span class="relative z-10">
                    {{ data.title }}
                </span>
            </div>

            <div
                :class="{
                    'pointer-events-none': isDisabled,
                }"
                class="video-card__content rounded-2xl rounded-t-none bg-dark p-[34px] transition-all max-xl:!visible max-xl:px-4 max-xl:py-6 max-xl:!opacity-100"
            >
                <div class="mb-6 flex items-center justify-between gap-1.5">
                    <div class="flex items-center gap-4">
                        <!-- Play button -->
                        <button
                            :class="{
                                'bg-white-75 text-grey-100': isDisabled,
                                'bg-white-100 text-primary-100': !isDisabled,
                                'pointer-events-none opacity-50':
                                    !data.video_files.length,
                            }"
                            class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white-75"
                            @click.stop="emits('play')"
                        >
                            <span v-if="loading" class="loader-btn"></span>

                            <component :is="IconPlay" v-else class="h-3 w-3" />
                        </button>

                        <h3
                            v-show="!openDescription"
                            :class="{
                                'text-grey-150': isDisabled,
                                'text-primary-50': !isDisabled,
                            }"
                            class="text-left text-h4 max-xl:text-h5 max-mob-lg:text-h4"
                        >
                            {{ data.title }}
                        </h3>
                    </div>

                    <!-- Open details button -->
                    <button
                        :class="{ 'rotate-180': openDescription }"
                        class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-solid border-white-100 text-white-100 transition-all hover:bg-white-100 hover:text-dark"
                        @click.stop="emits('expand')"
                    >
                        <component
                            :is="IconChevronDown"
                            class="h-[31px] w-[31px]"
                        />
                    </button>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-4">
                    <ul class="languages flex flex-wrap items-center gap-1.5">
                        <li
                            v-for="(lang, idx) in getAllLanguages(data)"
                            :key="idx"
                            class="tag tag--lang pointer-events-none"
                        >
                            {{ lang }}
                        </li>
                    </ul>

                    <div class="flex items-center gap-2.5">
                        <div class="flex items-center gap-3">
                            <component
                                :is="IconVoiceOn"
                                v-if="data.narration_enabled"
                                class="h-6 w-6 text-white-100"
                            />

                            <component
                                :is="IconVoiceOff"
                                v-else
                                class="h-6 w-6 text-white-100"
                            />

                            <img
                                v-if="data.audio_enabled"
                                src="@img/icons/audio-on.svg"
                                class="h-6 w-6 object-contain"
                                alt=""
                            />

                            <img
                                v-else
                                src="@img/icons/audio-off.svg"
                                class="h-6 w-6 object-contain"
                                alt=""
                            />
                        </div>

                        <div class="tag tag--lang pointer-events-none">
                            {{ useFormatVideoDuration(data.duration ?? 0) }}
                        </div>
                    </div>
                </div>

                <!-- Description block -->
                <div
                    ref="descriptionElement"
                    :style="{ height: descriptionElementHeight + 'px' }"
                    :aria-hidden="!openDescription"
                    class="video-card__desc mt-6 overflow-hidden pb-1 text-left transition-all aria-hidden:mt-0 aria-hidden:h-0"
                >
                    <h3 class="mb-6 text-h3 text-primary-50 xl:text-h4">
                        {{ data.title }}
                    </h3>

                    <div
                        ref="descriptionContainer"
                        class="video-card__text prose-sm mb-8 overflow-y-auto pr-2.5"
                    ></div>

                    <ul v-if="data.tags" class="flex flex-wrap gap-2">
                        <li
                            v-for="tag in data.tags.split(', ')"
                            :key="tag"
                            class="tag pointer-events-none"
                        >
                            {{ tag }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div
            v-if="isDisabled"
            ref="tooltip"
            :style="floatingStyles"
            class="tooltip group-hover:opacity-100"
        >
            Sign in or Sign up to access our entire catalog
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, nextTick, onMounted, ref, watch } from 'vue';
    import IconChevronDown from '@img/icons/chevron-down.svg?component';
    import IconPlay from '@img/icons/play.svg?component';
    import IconVoiceOff from '@img/icons/voice-off.svg?component';
    import IconVoiceOn from '@img/icons/voice-on.svg?component';
    import DOMPurify from 'dompurify';

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth.store.ts';

    import { useFloatingTooltip } from '@/hooks/useFloatingTooltip.ts';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import { useFormatVideoDuration } from '@/hooks/useFormatVideoDuration.ts';
    import type { VideoContent } from '@/ts/contents';

    interface Props {
        data: VideoContent;
        expandOnHover?: boolean;
        openDescription?: boolean;
        disable?: boolean;
        loading?: boolean;
    }

    interface Emits {
        (e: 'expand'): void;
        (e: 'play'): void;
        (e: 'select'): void;
    }

    const props = withDefaults(defineProps<Props>(), {
        expandOnHover: true,
    });

    const emits = defineEmits<Emits>();

    const { isAuthenticated } = storeToRefs(useAuthStore());

    const isDisabled = computed(() => props.disable && !isAuthenticated.value);

    const descriptionElement = ref<HTMLDivElement | null>(null);
    const descriptionContainer = ref<HTMLDivElement | null>(null);
    const descriptionElementHeight = ref(0);

    const reference = ref<HTMLElement | null>(null);
    const tooltip = ref<HTMLElement | null>(null);

    const getAllLanguages = (video: VideoContent) => {
        const audioLangs =
            video.audios?.map((audio) => audio.language.name) ?? [];
        const videoLangs = video.video_files.map((item) => item.language.name);

        return Array.from(new Set([...audioLangs, ...videoLangs]));
    };

    const { floatingStyles } = useFloatingTooltip(reference, tooltip);

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
        if (descriptionContainer.value && props.data.description) {
            descriptionContainer.value.innerHTML = DOMPurify.sanitize(
                props.data.description
            );
        }

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

                &:hover:not(.disable) {
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

        @media screen and (min-width: 1920px) {
            &.expand {
                &:hover:not(.disable) {
                    .video-card__wrap {
                        min-width: 460px;
                        height: 250px;
                    }
                }
            }
        }
    }
</style>
