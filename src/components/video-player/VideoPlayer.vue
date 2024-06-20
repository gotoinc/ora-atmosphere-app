<template>
    <video ref="videoElement" controls playsinline>
        <source :src="src" type="video/mp4" />
    </video>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import IconClose from '@img/icons/close.svg?raw';
    import IconPlay from '@img/icons/play.svg?raw';
    import IconBackward from '@img/icons/player/backward.svg?raw';
    import IconForward from '@img/icons/player/forward.svg?raw';
    import IconFullScreen from '@img/icons/player/fullscreen.svg?raw';
    import IconSpeed from '@img/icons/player/speed.svg?raw';
    import IconVolume from '@img/icons/player/volume.svg?raw';
    import IconVolumeOff from '@img/icons/player/volume-off.svg?raw';
    import Plyr from 'plyr';

    import 'plyr/dist/plyr.css';

    interface Emits {
        (e: 'close'): void;
    }

    interface Props {
        src: string;
        title?: string;
        poster?: string;
    }

    const props = defineProps<Props>();
    const emits = defineEmits<Emits>();

    const videoElement = ref<HTMLVideoElement>();
    const player = ref<Plyr>();

    const isOpenSpeed = ref(false);

    const controls = `
        <div class="plyr__controls">
            <div class="w-full">
                <div class="flex items-center gap-3">
                    <div class="plyr__progress w-full">
                        <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
                        <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
                        <span role="tooltip" class="plyr__tooltip">00:00</span>
                    </div>

                    <div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
                </div>

                <div class="controls-grid justify-between w-full">
                    <div class="controls-grid">
                         <!-- Backward -->
                        <button type="button" class="control" data-plyr="rewind">
                            ${IconBackward}
                            <span class="plyr__tooltip" role="tooltip">Rewind {seektime} secs</span>
                        </button>

                        <!-- Forward -->
                        <button type="button" class="control" data-plyr="fast-forward">
                            ${IconForward}
                            <span class="plyr__tooltip" role="tooltip">Forward {seektime} secs</span>
                        </button>

                        <!-- Volume -->
                         <div class="volume__control control">
                             <button type="button" aria-label="Mute" data-plyr="mute">
                                <span class="icon--pressed">
                                  ${IconVolume}
                                </span>

                                <span class="icon--not-pressed">
                                  ${IconVolumeOff}
                                </span>
                            </button>
                            <div class="plyr__volume bg-grey-500 p-0.5 rounded-sm">
                                <input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
                            </div>
                         </div>
                    </div>

                    <h3></h3>

                    <div class="controls-grid">
                        <!-- Speed -->
                         <div id="speed-controls" class="relative w-full control max-md:static">
                             <button type="button" class="control" id="speed-control" data-plyr="speed">
                              <span>
                                  ${IconSpeed}
                              </span>
                           </button>

                             <div class="speed-modal absolute rounded-xl bg-grey-400 px-12 py-6">
                                <h3 class="text-h3 text-left text-white-100 mb-9 max-lg:text-xl">Playback Speed</h3>

                                <div class="speed-buttons controls-grid pb-16 justify-between">
                                    <button data-speed="0.5" class="speed-btn relative">
                                        <span class="relative">
                                            <span class="speed-point"></span>
                                            <span class="label">0.5x</span>
                                        </span>
                                    </button>

                                    <button data-speed="0.75" class="speed-btn relative">
                                        <span class="relative">
                                            <span class="speed-point"></span>
                                            <span class="label">0.75x</span>
                                        </span>
                                    </button>

                                    <button data-speed="1" class="speed-btn active relative">
                                        <span class="relative">
                                            <span class="speed-point"></span>
                                            <span class="label">1x <span class="max-md:hidden">(Normal)</span></span>
                                        </span>
                                    </button>

                                    <button data-speed="1.25" class="speed-btn relative">
                                        <span class="relative">
                                            <span class="speed-point"></span>
                                            <span class="label">1.25x</span>
                                        </span>
                                    </button>

                                     <button data-speed="1.5" class="speed-btn relative">
                                        <span class="relative">
                                            <span class="speed-point"></span>
                                            <span class="label">1.5x</span>
                                        </span>
                                     </button>
                                </div>
                            </div>

                             <svg class="polygon hidden absolute h-6 z-10 bottom-full" width="33" height="15" viewBox="0 0 33 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.256287 0.673767L10.5132 12.2457C13.6965 15.8371 19.3035 15.8371 22.4868 12.2457L32.7437 0.673767H0.256287Z" fill="#29292D"/>
                             </svg>
                        </div>

                        <!-- Fullscreen -->
                        <button type="button" class="control" data-plyr="fullscreen">
                            <span >
                                ${IconFullScreen}
                            </span>

                            <span class="label--pressed plyr__tooltip" role="tooltip">Exit fullscreen</span>
                            <span class="label--not-pressed plyr__tooltip" role="tooltip">Enter fullscreen</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" class="plyr__control text-primary plyr__control--overlaid" data-plyr="play" aria-pressed="false" aria-label="Play">
            ${IconPlay}
            <span class="plyr__sr-only">Play</span>
        </button>

        <button type="button" class="close-btn" data-plyr="close">
            ${IconClose}
        </button>
    `;

    onMounted(() => {
        if (videoElement.value) {
            player.value = new Plyr(videoElement.value, {
                controls,

                storage: {
                    enabled: false,
                },

                fullscreen: {
                    iosNative: true,
                },
            });

            // Set poster
            if (props.poster) {
                player.value.poster = props.poster;
            }

            player.value.on('enterfullscreen', () => {
                if (player.value)
                    player.value.elements.controls?.classList.add(
                        'fullscreen--active'
                    );
            });

            player.value.on('exitfullscreen', () => {
                if (player.value)
                    player.value.elements.controls?.classList.remove(
                        'fullscreen--active'
                    );
            });

            const closeButton = document.querySelector('.close-btn');

            const speedControls = document.querySelectorAll('.speed-btn');
            const speedControlsModal =
                document.querySelector('#speed-controls');
            const speedButton = document.querySelector('#speed-control');

            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    player.value?.pause();
                    emits('close');
                });
            }

            if (speedButton && speedControlsModal) {
                speedButton.addEventListener('click', () => {
                    isOpenSpeed.value = !isOpenSpeed.value;

                    isOpenSpeed.value
                        ? speedControlsModal.classList.add('show')
                        : speedControlsModal.classList.remove('show');
                });
            }

            if (speedControls.length) {
                speedControls.forEach((btn) => {
                    const button = btn as HTMLElement;

                    button.addEventListener('click', () => {
                        if (player.value) {
                            player.value.speed = Number(button.dataset.speed);

                            speedControls.forEach((btn) => {
                                btn.classList.remove('active');
                            });

                            button.classList.add('active');
                        }
                    });
                });
            }
        }
    });
</script>

<style lang="postcss">
    @import './video-player.pcss';
</style>
