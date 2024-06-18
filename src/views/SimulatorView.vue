<template>
    <teleport to="body">
        <div
            ref="simulatorContainer"
            class="slide-top fixed left-0 top-0 z-[100] h-screen w-screen bg-dark"
        >
            <div ref="simulatorElement" class="h-screen"></div>

            <div
                v-show="isSimulatorLoaded"
                class="settings absolute flex flex-col items-center gap-4"
            >
                <button
                    type="button"
                    :class="{
                        'bg-white-100 text-dark': activeDiameter === 100,
                    }"
                    class="size-button h-[100px] w-[100px]"
                    @click="setSimulatorDiameter(100)"
                >
                    100
                </button>

                <button
                    type="button"
                    :class="{
                        'bg-white-100 text-dark': activeDiameter === 80,
                    }"
                    class="size-button h-[80px] w-[80px]"
                    @click="setSimulatorDiameter(80)"
                >
                    80
                </button>

                <button
                    type="button"
                    :class="{
                        'bg-white-100 text-dark': activeDiameter === 60,
                    }"
                    class="size-button h-[60px] w-[60px]"
                    @click="setSimulatorDiameter(60)"
                >
                    60
                </button>
            </div>

            <button
                class="close-btn absolute right-16 top-16 z-[101] h-10 w-10 rounded bg-white-100 p-1 transition-colors hover:bg-white-75"
                @click="closePage"
            >
                <component :is="IconCross" class="h-full w-full text-dark" />
            </button>

            <div
                class="plyr__controls plyr--full-ui absolute bottom-0 left-0 w-full px-4 pb-10"
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

                            <span role="tooltip" class="plyr__tooltip">
                                00:00
                            </span>
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
                            <button
                                type="button"
                                class="control"
                                data-plyr="rewind"
                            >
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
                            <div
                                class="volume__control control control--action"
                            >
                                <button
                                    type="button"
                                    aria-label="Mute"
                                    data-plyr="mute"
                                >
                                    <span
                                        class="icon--pressed pointer-events-none"
                                    >
                                        <component :is="IconVolume" />
                                    </span>

                                    <span
                                        class="icon--not-pressed pointer-events-none"
                                    >
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
                                <button
                                    type="button"
                                    class="control"
                                    data-plyr="speed"
                                >
                                    <span class="pointer-events-none">
                                        <component :is="IconSubtitles" />
                                    </span>
                                </button>

                                <div
                                    class="control-modal absolute rounded-xl bg-grey-400 px-10 py-3"
                                >
                                    <h3
                                        class="mb-2.5 text-left text-h4 text-white-100"
                                    >
                                        Audio
                                    </h3>

                                    <div class="grid grid-cols-2 gap-x-10">
                                        <button
                                            v-for="{ src, language } in sources"
                                            :key="language"
                                            class="lang-btn"
                                            :class="{
                                                active: selectedSrc === src,
                                            }"
                                            @click="changeVideoSrc(src)"
                                        >
                                            {{ language }}
                                        </button>
                                    </div>
                                </div>

                                <component :is="Polygon" />
                            </div>

                            <!-- Speed -->
                            <div
                                class="control--action control relative w-full max-md:static"
                            >
                                <button
                                    type="button"
                                    class="control"
                                    data-plyr="speed"
                                >
                                    <span class="pointer-events-none">
                                        <component :is="IconSpeed" />
                                    </span>
                                </button>

                                <div
                                    class="speed-modal control-modal absolute rounded-xl bg-grey-400 px-12 py-6"
                                >
                                    <h3
                                        class="mb-9 text-left text-h4 text-white-100"
                                    >
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

                                <component :is="Polygon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <transition>
                <div
                    v-show="!isSimulatorLoaded"
                    class="absolute left-0 top-0 z-[100] h-full w-full bg-dark"
                >
                    <v-loader />
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import IconCross from '@img/icons/cross.svg?component';
    import IconBackward from '@img/icons/player/backward.svg?component';
    import IconForward from '@img/icons/player/forward.svg?component';
    import Polygon from '@img/icons/player/polygon.svg?component';
    import IconSpeed from '@img/icons/player/speed.svg?component';
    import IconSubtitles from '@img/icons/player/subtitles.svg?component';
    import IconVolume from '@img/icons/player/volume.svg?component';
    import IconVolumeOff from '@img/icons/player/volume-off.svg?component';
    import type { Simulator } from '@simulator/demo';
    import { initSimulator } from '@simulator/demo/src';
    import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

    import VLoader from '@/components/base/VLoader.vue';

    import { storeToRefs } from 'pinia';
    import { useCatalogStore } from '@/stores/catalog.store.ts';

    type SphereDiameter = 100 | 80 | 60;

    const router = useRouter();

    const { selectedContentUrl, isSimulatorLoaded } =
        storeToRefs(useCatalogStore());

    const simulatorElement = ref<HTMLDivElement | null>(null);
    const simulatorContainer = ref<HTMLDivElement | null>(null);
    const activeDiameter = ref<SphereDiameter>(80);
    const simulatorInstance = ref<Simulator | null>(null);

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

        const currentVideo = simulatorInstance.value?.curVideo
            ?.video as HTMLVideoElement;

        currentVideo.playbackRate = option;
    };

    const setSimulatorDiameter = (diameter: SphereDiameter) => {
        if (simulatorInstance.value) {
            simulatorInstance.value.setDiameter(diameter);
            activeDiameter.value = diameter;
        }
    };

    const changeVideoSrc = (src: string) => {
        selectedSrc.value = src;
    };

    const closePage = () => {
        if (simulatorContainer.value)
            enableBodyScroll(simulatorContainer.value);

        router.go(-1);

        // Remove default loader of simulator
        const simulatorLoader = document.getElementById('babylonjsLoadingDiv');
        if (simulatorLoader) simulatorLoader.remove();
    };

    onMounted(async () => {
        if (simulatorContainer.value) {
            disableBodyScroll(simulatorContainer.value);

            let controlButton: Element | null = null;

            // Open settings modals for action buttons
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

            simulatorContainer.value.addEventListener('click', setClickEvent);
        }

        if (simulatorElement.value) {
            const { simulator } = await initSimulator(
                simulatorElement.value,
                selectedContentUrl.value
            );

            simulator.onFinish(() => {
                isSimulatorLoaded.value = true;

                // void simulator.curVideo?.video.play();
            });

            simulatorInstance.value = simulator;
        }
    });

    onUnmounted(() => {
        isSimulatorLoaded.value = false;
    });
</script>

<style scoped lang="postcss">
    .v-enter-active,
    .v-leave-active {
        transition: all 0.7s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .settings,
    .close-btn {
        top: 3.3vw;
    }

    .settings {
        left: 3.3vw;
    }

    .close-btn {
        right: 3.3vw;
    }

    .size-button {
        @apply cursor-pointer rounded-full border border-solid border-white-100 transition-colors hover:bg-white-100 hover:text-dark;
    }

    .slide-top {
        animation: slide-top 0.8s ease;
    }

    @keyframes slide-top {
        0% {
            transform: translateY(100%);
        }

        100% {
            transform: translateY(0);
        }
    }
</style>

<style lang="postcss">
    #babylonjsLoadingDiv {
        display: none !important;
    }
</style>
