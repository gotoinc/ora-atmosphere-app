<template>
    <div class="plyr__controls">
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

                        <span class="plyr__tooltip" role="tooltip">
                            Rewind {seektime} secs
                        </span>
                    </button>

                    <!-- Forward -->
                    <button
                        type="button"
                        class="control"
                        data-plyr="fast-forward"
                    >
                        <component :is="IconForward" />

                        <span class="plyr__tooltip" role="tooltip"
                            >Forward {seektime} secs</span
                        >
                    </button>

                    <!-- Volume -->
                    <div class="volume__control control control--action">
                        <button
                            type="button"
                            aria-label="Mute"
                            data-plyr="mute"
                        >
                            <span class="icon--pressed pointer-events-none">
                                <component :is="IconVolume" />
                            </span>

                            <span class="icon--not-pressed pointer-events-none">
                                <component :is="IconVolumeOff" />
                            </span>
                        </button>

                        <div
                            class="plyr__volume control-modal rounded-sm bg-grey-500 p-0.5"
                        >
                            <input
                                data-plyr="volume"
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value="1"
                                autocomplete="off"
                                aria-label="Volume"
                            />
                        </div>
                    </div>
                </div>

                <h3 class="text-xl max-sm:hidden">Title</h3>

                <div class="controls-grid">
                    <!-- Languages -->
                    <div
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
                                    v-for="{ src, language } in sources"
                                    :key="language"
                                    class="lang-btn"
                                    :class="{ active: selectedSrc === src }"
                                    @click="changeVideoSrc(src)"
                                >
                                    {{ language }}
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
                        class="control flex items-center justify-center sm:!hidden"
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
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import IconBackward from '@img/icons/player/backward.svg?component';
    import IconForward from '@img/icons/player/forward.svg?component';
    import IconFullScreen from '@img/icons/player/fullscreen.svg?component';
    import Polygon from '@img/icons/player/polygon.svg?component';
    import IconSpeed from '@img/icons/player/speed.svg?component';
    import IconSubtitles from '@img/icons/player/subtitles.svg?component';
    import IconVolume from '@img/icons/player/volume.svg?component';
    import IconVolumeOff from '@img/icons/player/volume-off.svg?component';

    import 'plyr/dist/plyr.css';

    interface Emits {
        (e: 'change-audio'): void;
        (e: 'change-speed', value: number): void;
    }

    const emits = defineEmits<Emits>();

    // Sources
    const sources = [
        {
            language: 'French',
            src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
        },
        {
            language: 'English',
            src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        },
        {
            language: 'German',
            src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
        {
            language: 'Spanish',
            src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        },
    ];
    const selectedSrc = ref(sources[0].src);

    // Speed options
    const speedOptions = [0.5, 0.75, 1, 1.25, 1.5];
    const activeSpeed = ref(speedOptions[2]);

    const changeSpeed = (option: number) => {
        activeSpeed.value = option;
        emits('change-speed', option);
    };

    const changeVideoSrc = (src: string) => {
        selectedSrc.value = src;
    };
</script>

<style lang="postcss">
    @import './video-player.pcss';
</style>
