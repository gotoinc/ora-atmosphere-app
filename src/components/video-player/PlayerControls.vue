<template>
    <div
        class="plyr__controls"
        :class="{ 'fullscreen--active': isFullScreenActive }"
    >
        <div class="plyr__controls-content mx-auto w-full">
            <div class="flex items-center gap-3">
                <div class="plyr__progress w-full">
                    <input
                        data-plyr="seek"
                        type="range"
                        min="0"
                        max="100"
                        step="0.01"
                        value="0"
                        aria-label="Seek"
                    />

                    <progress
                        class="plyr__progress__buffer"
                        min="0"
                        max="100"
                        value="0"
                    >
                        % buffered
                    </progress>

                    <span role="tooltip" class="plyr__tooltip">00:00</span>
                </div>

                <div
                    class="plyr__time plyr__time--current"
                    aria-label="Current time"
                >
                    00:00
                </div>
            </div>

            <div class="controls-grid w-full justify-between">
                <div class="controls-grid">
                    <!-- Backward -->
                    <button type="button" class="control" data-plyr="rewind">
                        <component :is="IconBackward" />
                    </button>

                    <!-- Forward -->
                    <button
                        type="button"
                        class="control"
                        data-plyr="fast-forward"
                    >
                        <component :is="IconForward" />
                    </button>

                    <!-- Volume -->
                    <div class="volume__control control control--action">
                        <button
                            v-if="audioEnabled"
                            type="button"
                            aria-label="Mute"
                            class="h-full w-full"
                        >
                            <span
                                v-show="volumeProgress > 0"
                                class="pointer-events-none"
                            >
                                <component :is="IconVolume" />
                            </span>

                            <span
                                v-show="volumeProgress === 0"
                                class="pointer-events-none"
                            >
                                <component :is="IconVolumeOff" />
                            </span>
                        </button>

                        <div
                            v-if="!isIOS()"
                            class="plyr__volume control-modal rounded-sm bg-grey-500 p-0.5"
                        >
                            <input
                                :style="{
                                    '--value':
                                        formatToPercentage(volumeProgress),
                                }"
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value="1"
                                autocomplete="off"
                                aria-label="Volume"
                                @input="changeVolume"
                            />
                        </div>
                    </div>
                </div>

                <h3 class="text-xl max-sm:hidden">
                    {{ title }}
                </h3>

                <div class="controls-grid">
                    <!-- Audio -->
                    <div
                        v-if="audios && audios.length > 0"
                        class="control--action control relative w-full max-md:static"
                    >
                        <button type="button" class="control" data-plyr="speed">
                            <span class="pointer-events-none">
                                <component :is="IconSubtitles" />
                            </span>
                        </button>

                        <div
                            class="control-modal audio-modal absolute rounded-xl bg-grey-400 px-10 py-3"
                        >
                            <h3 class="mb-2.5 text-left text-h4 text-white-100">
                                Audio
                            </h3>

                            <div class="grid grid-cols-2 gap-x-10">
                                <button
                                    v-for="{ file, name, id } in audios"
                                    :key="id"
                                    class="lang-btn"
                                    :class="{
                                        active: selectedAudioSrc === file,
                                    }"
                                    @click="changeAudioSrc(file)"
                                >
                                    <span class="line-camp-2">
                                        {{ name }}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <component :is="Polygon" class="polygon" />
                    </div>

                    <!-- Speed -->
                    <div
                        class="control--action control relative w-full max-md:static"
                    >
                        <button type="button" class="control" data-plyr="speed">
                            <span class="pointer-events-none">
                                <component :is="IconSpeed" />
                            </span>
                        </button>

                        <div
                            class="speed-modal control-modal absolute rounded-xl bg-grey-400 px-12 py-6"
                        >
                            <h3 class="mb-9 text-left text-h4 text-white-100">
                                Playback Speed
                            </h3>

                            <div
                                class="speed-buttons controls-grid justify-between pb-16"
                            >
                                <button
                                    v-for="option in speedOptions"
                                    :key="option"
                                    class="speed-btn relative"
                                    :class="{
                                        active: option === activeSpeed,
                                    }"
                                    @click="changeSpeed(option)"
                                >
                                    <span class="speed-point"></span>

                                    <span class="label">
                                        {{ option }}x

                                        <span
                                            v-if="option === 1"
                                            class="max-md:hidden"
                                        >
                                            (Normal)
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </div>

                        <component :is="Polygon" class="polygon" />
                    </div>

                    <!-- Fullscreen -->
                    <button
                        v-if="fullscreen"
                        type="button"
                        class="control max-sm:!hidden"
                        data-plyr="fullscreen"
                    >
                        <span>
                            <component :is="IconFullScreen" />
                        </span>
                    </button>

                    <!-- Play -->
                    <button
                        type="button"
                        :class="{ 'sm:!hidden': fullscreen }"
                        class="control flex items-center justify-center"
                        aria-label="Play, {title}"
                        data-plyr="play"
                    >
                        <svg
                            class="icon--not-pressed w-1/2"
                            role="presentation"
                        >
                            <use xlink:href="#plyr-pause"></use>
                        </svg>

                        <svg class="icon--pressed w-1/2" role="presentation">
                            <use xlink:href="#plyr-play"></use>
                        </svg>

                        <span
                            class="label--pressed plyr__tooltip"
                            role="tooltip"
                        >
                            Pause
                        </span>

                        <span
                            class="label--not-pressed plyr__tooltip"
                            role="tooltip"
                        >
                            Play
                        </span>
                    </button>
                </div>
            </div>
        </div>

        <audio v-if="audios" ref="audioElement" class="hidden"></audio>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import IconBackward from '@img/icons/player/backward.svg?component';
    import IconForward from '@img/icons/player/forward.svg?component';
    import IconFullScreen from '@img/icons/player/fullscreen.svg?component';
    import Polygon from '@img/icons/player/polygon.svg?component';
    import IconSpeed from '@img/icons/player/speed.svg?component';
    import IconSubtitles from '@img/icons/player/subtitles.svg?component';
    import IconVolume from '@img/icons/player/volume.svg?component';
    import IconVolumeOff from '@img/icons/player/volume-off.svg?component';
    import type Plyr from 'plyr';

    import { isIOS } from '@/utils/navigator.utils.ts';

    import 'plyr/dist/plyr.css';
    import type { Audio } from '@/ts/common';

    interface Props {
        title: string;
        player?: Plyr;
        fullscreen?: boolean;
        container?: HTMLElement;
        audios?: Audio[];
        muted?: boolean;
        audioEnabled?: boolean;
    }

    const props = defineProps<Props>();

    const mainPlayer = computed<Plyr | undefined>(() => props.player);

    const volumeProgress = ref(1);

    const formatToPercentage = (value: number) => `${value * 100}%`;

    const audioElement = ref<HTMLAudioElement>();
    const selectedAudioSrc = ref('');

    const isFullScreenActive = ref(false);

    // Speed options
    const speedOptions = [0.5, 0.75, 1, 1.25, 1.5];
    const activeSpeed = ref(speedOptions[2]);

    const changeSpeed = (option: number) => {
        activeSpeed.value = option;

        if (mainPlayer.value) mainPlayer.value.speed = option;
    };

    changeSpeed(1);

    const changeAudioSrc = (src: string) => {
        if (audioElement.value) {
            if (selectedAudioSrc.value === src) {
                selectedAudioSrc.value = '';

                handleAudio(false);

                return;
            }

            selectedAudioSrc.value = src;
            audioElement.value.src = src;

            handleAudio(true);
        }
    };

    const handleAudio = (isAudioPlay: boolean) => {
        if (mainPlayer.value && audioElement.value) {
            mainPlayer.value.pause();
            audioElement.value.pause();

            mainPlayer.value.muted = isAudioPlay;
            audioElement.value.volume = volumeProgress.value;

            if (isAudioPlay) {
                mainPlayer.value.pause();

                audioElement.value.playbackRate = mainPlayer.value.speed;
                audioElement.value.currentTime = mainPlayer.value.currentTime;
            } else {
                audioElement.value.pause();
                mainPlayer.value.volume = volumeProgress.value;
            }
        }
    };

    const changeVolume = (e: Event) => {
        const target = e.target as HTMLInputElement;
        volumeProgress.value = Number(target.value);

        if (audioElement.value && selectedAudioSrc.value) {
            audioElement.value.volume = volumeProgress.value;
        } else if (mainPlayer.value) {
            mainPlayer.value.volume = volumeProgress.value;
        }
    };

    // Open settings modals for action buttons
    let controlButton: Element | null = null;

    const setClickEvent = (e: Event) => {
        const target = e.target as HTMLElement;
        const controlContainer = target.closest('.control--action');

        if (controlButton !== controlContainer) {
            controlButton?.classList.remove('active');
        }

        if (controlContainer) {
            const button = controlContainer.querySelector(
                'button'
            ) as HTMLButtonElement;

            if (target === button) {
                controlContainer.classList.toggle('active');

                controlButton = controlContainer;
            }
        } else {
            controlButton?.classList.remove('active');
        }
    };

    // Set event handlers for controls when player is active
    watch(
        () => props.player,
        (player) => {
            if (mainPlayer.value && player) {
                if (props.container) {
                    props.container.addEventListener('click', setClickEvent);
                } else {
                    // Player container
                    const plyrContainer = mainPlayer.value.elements.container;

                    if (plyrContainer)
                        plyrContainer.addEventListener('click', setClickEvent);
                }

                if (props.fullscreen) {
                    // Fullscreen toggle
                    mainPlayer.value.on('enterfullscreen', () => {
                        isFullScreenActive.value = true;
                    });

                    mainPlayer.value.on('exitfullscreen', () => {
                        isFullScreenActive.value = false;
                    });
                }
            }

            // Connect audio element with player
            if (mainPlayer.value && audioElement.value) {
                // Pause audio with player
                mainPlayer.value.on('pause', () => {
                    if (selectedAudioSrc.value) audioElement.value!.pause();
                });

                // Play audio with player
                mainPlayer.value.on('play', () => {
                    if (!props.muted) {
                        mainPlayer.value!.volume = volumeProgress.value;
                    }

                    if (selectedAudioSrc.value) {
                        mainPlayer.value!.muted = true;
                        void audioElement.value!.play();
                    }
                });

                mainPlayer.value.on('ratechange', () => {
                    if (selectedAudioSrc.value) {
                        audioElement.value!.playbackRate =
                            mainPlayer.value!.speed;
                    }
                });

                mainPlayer.value.on('seeked', () => {
                    if (selectedAudioSrc.value) {
                        audioElement.value!.pause();
                        mainPlayer.value!.pause();

                        audioElement.value!.currentTime =
                            mainPlayer.value!.currentTime;
                    }
                });
            }
        },
        {
            once: true,
        }
    );
</script>

<style lang="postcss">
    @import './video-player.pcss';
</style>
