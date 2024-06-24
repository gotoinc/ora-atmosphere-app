<template>
    <video ref="videoElement" crossorigin playsinline>
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
                         <div class="volume__control control control--action">
                             <button type="button" aria-label="Mute" data-plyr="mute">
                                <span class="pointer-events-none icon--pressed">
                                  ${IconVolume}
                                </span>

                                <span class=" pointer-events-none icon--not-pressed">
                                  ${IconVolumeOff}
                                </span>
                            </button>

                            <div class="plyr__volume control-modal bg-grey-500 p-0.5 rounded-sm">
                                <input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
                            </div>
                         </div>
                    </div>

                    <h3 class="text-xl max-sm:hidden" >${props.title ?? ''}</h3>

                    <div class="controls-grid">
                        <!-- Speed -->
                         <div class="relative control--action w-full control max-md:static">
                             <button type="button" class="control" data-plyr="speed">
                                  <span class="pointer-events-none">
                                      ${IconSpeed}
                                  </span>
                             </button>

                             <div class="speed-modal control-modal absolute rounded-xl bg-grey-400 px-12 py-6">
                                <h3 class="text-h3 text-left text-white-100 mb-9 max-lg:text-xl">Playback Speed</h3>

                                <div class="speed-buttons controls-grid pb-16 justify-between">
                                    <button data-speed="0.5" class="speed-btn relative">
                                        <span class="speed-point"></span>
                                        <span class="label">0.5x</span>
                                    </button>

                                    <button data-speed="0.75" class="speed-btn relative">
                                        <span class="speed-point"></span>
                                        <span class="label">0.75x</span>
                                    </button>

                                    <button data-speed="1" class="speed-btn active relative">
                                        <span class="speed-point"></span>
                                        <span class="label">1x <span class="max-md:hidden">(Normal)</span></span>
                                    </button>

                                    <button data-speed="1.25" class="speed-btn relative">
                                        <span class="speed-point"></span>
                                        <span class="label">1.25x</span>
                                    </button>

                                     <button data-speed="1.5" class="speed-btn relative">
                                        <span class="speed-point"></span>
                                        <span class="label">1.5x</span>
                                     </button>
                                </div>
                             </div>

                             <svg class="polygon hidden control-modal absolute h-6 z-10 bottom-full" width="33" height="15" viewBox="0 0 33 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.256287 0.673767L10.5132 12.2457C13.6965 15.8371 19.3035 15.8371 22.4868 12.2457L32.7437 0.673767H0.256287Z" fill="#29292D"/>
                             </svg>
                        </div>

                        <!-- Fullscreen -->
                        <button type="button" class="control max-sm:!hidden" data-plyr="fullscreen">
                            <span >
                                ${IconFullScreen}
                            </span>

                            <span class="label--pressed plyr__tooltip" role="tooltip">Exit fullscreen</span>
                            <span class="label--not-pressed plyr__tooltip" role="tooltip">Enter fullscreen</span>
                        </button>

                        <!-- Play -->
                        <button type="button" class="control sm:!hidden flex items-center justify-center" aria-label="Play, {title}" data-plyr="play">
                            <svg class="icon--not-pressed w-1/2" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
                            <svg class="icon--pressed w-1/2" role="presentation"><use xlink:href="#plyr-play"></use></svg>
                            <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
                            <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" class="plyr__control text-primary plyr__control--overlaid" data-plyr="play" aria-pressed="false" aria-label="Play">
            ${IconPlay}
            <span class="plyr__sr-only">Play</span>
        </button>

         <h3 class="text-xl absolute top-[9%] sm:hidden z-10 left-1/2 -translate-x-1/2" >${props.title ?? ''}</h3>

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

            // Fullscreen toggle
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

            // Action buttons
            const closeButton = document.querySelector('.close-btn');
            const speedControls = document.querySelectorAll('.speed-btn');
            const plyrActions =
                player.value.elements.controls?.querySelectorAll(
                    '.control--action'
                );

            // Player container
            const plyrContainer = player.value.elements.container;

            // Open settings modals for action buttons
            const setClickEvent = (e: Event) => {
                e.stopPropagation();

                if (plyrActions) {
                    plyrActions.forEach((action) => {
                        const button = action.querySelector(
                            'button'
                        ) as HTMLButtonElement;

                        const target = e.target as HTMLElement;

                        if (target === button) {
                            action.classList.toggle('active');
                        }

                        if (!action.contains(target)) {
                            action.classList.remove('active');
                        }
                    });
                }
            };

            if (plyrContainer)
                plyrContainer.addEventListener('click', setClickEvent);

            // Close player
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    player.value?.pause();
                    emits('close');
                });
            }

            // Change speed controls
            if (speedControls.length > 0) {
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
