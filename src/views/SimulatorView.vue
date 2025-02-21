<template>
    <teleport to="body">
        <div
            ref="simulatorContainer"
            class="slide-top fixed left-0 top-0 z-[100] h-vh w-screen select-none bg-dark"
        >
            <div ref="simulatorElement" class="simulator h-screen">
                <video
                    ref="videoElement"
                    class="hidden"
                    controls
                    muted
                    playsinline
                ></video>
            </div>

            <div
                v-show="!isSimulatorLoading"
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

            <div v-if="contentToPlay" ref="controls">
                <player-controls
                    :muted="isMuted"
                    :content="contentToPlay"
                    :container="simulatorContainer"
                    :player="player"
                    class="plyr--full-ui absolute bottom-0 left-0 w-full px-4 pb-10"
                    @change-src="changeVideoSrc"
                />
            </div>

            <transition>
                <div
                    v-show="isSimulatorLoading"
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
    import { useToast } from 'vue-toastification';
    import IconCross from '@img/icons/cross.svg?component';
    import type { Simulator } from '@simulator/demo';
    import { initSimulator } from '@simulator/demo/src';
    import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
    import Plyr from 'plyr';

    import VLoader from '@/components/base/VLoader.vue';
    import PlayerControls from '@/components/video-player/PlayerControls.vue';

    import { storeToRefs } from 'pinia';
    import { useCatalogStore } from '@/stores/catalog.store.ts';

    import { plyrOptions } from '@/libs/plyr/plyr-options.ts';

    type SphereDiameter = 100 | 80 | 60;

    const router = useRouter();
    const toast = useToast();

    const { contentToPlay, isSimulatorLoading } =
        storeToRefs(useCatalogStore());

    const simulatorElement = ref<HTMLDivElement | null>(null);
    const simulatorContainer = ref<HTMLDivElement>();
    const videoElement = ref<HTMLVideoElement>();
    const videoSrc = ref('');
    const mediaType = ref<'video' | 'image'>('video');

    const activeDiameter = ref<SphereDiameter>(80);
    const simulatorInstance = ref<Simulator | null>(null);

    const player = ref<Plyr>();
    const controls = ref<HTMLElement>();
    const isMuted = ref(true);

    const setSimulatorDiameter = (diameter: SphereDiameter) => {
        if (simulatorInstance.value) {
            simulatorInstance.value.setDiameter(diameter);
            activeDiameter.value = diameter;
        }
    };

    const closePage = () => {
        if (simulatorContainer.value)
            enableBodyScroll(simulatorContainer.value);

        router.go(-1);

        // Remove default loader of simulator
        const simulatorLoader = document.getElementById('babylonjsLoadingDiv');
        if (simulatorLoader) simulatorLoader.remove();
    };

    const setPlayerToStart = () => {
        if (player.value) {
            player.value.currentTime = 0;
            player.value.pause();
            player.value.muted = false;
            isMuted.value = false;
        }
    };

    const loadVideoFile = () => {
        // TODO: load media type for simulator
        if (contentToPlay.value) {
            videoSrc.value = contentToPlay.value.video_files[0].file;
        }
    };

    const createPromiseFromCallback = (
        callbackFunction: (callback: () => void) => void
    ): Promise<void> => {
        return new Promise((resolve) => {
            callbackFunction(() => {
                resolve();
            });
        });
    };

    const changeVideoSrc = (src: string) => {
        videoSrc.value = src;

        if (simulatorInstance.value?.video) {
            simulatorInstance.value.video.src = src;
            simulatorInstance.value.video.pause();
            player.value?.pause();
        }
    };

    onMounted(async () => {
        isSimulatorLoading.value = true;

        if (simulatorContainer.value) {
            disableBodyScroll(simulatorContainer.value);
        }

        if (simulatorElement.value) {
            loadVideoFile();

            if (videoSrc.value) {
                try {
                    const { simulator } = await initSimulator(
                        simulatorElement.value,
                        videoSrc.value,
                        mediaType.value,
                        videoElement.value
                    );

                    player.value = new Plyr(
                        videoElement.value as HTMLVideoElement,
                        {
                            controls: controls.value,
                            autoplay: false,
                            muted: true,
                            fullscreen: {
                                enabled: false,
                            },
                            ...plyrOptions,
                        }
                    );

                    // Wait for loading scene and video resource
                    await Promise.all([
                        createPromiseFromCallback((callback) => {
                            simulator.onFinish(callback);
                        }),
                        createPromiseFromCallback((callback) => {
                            simulator.onLoadedMedia(callback);
                        }),
                    ]);

                    setPlayerToStart();

                    simulatorInstance.value = simulator;
                    isSimulatorLoading.value = false;
                } catch {
                    closePage();
                    isSimulatorLoading.value = false;
                    toast.error(
                        'The video had some trouble loading. Please try again later'
                    );
                }
            }
        }
    });

    onUnmounted(() => {
        isSimulatorLoading.value = false;
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

    .simulator {
        .plyr {
            max-width: 100%;
            width: 100%;
            max-height: 125px;
            bottom: 0;
            overflow: visible;
        }

        .plyr__video-wrapper {
            display: none;
        }
    }
</style>
