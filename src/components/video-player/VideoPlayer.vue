<template>
    <video ref="videoElement" playsinline controls>
        <source :src="src" type="video/mp4" />
    </video>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import IconBackward from '@img/icons/player/backward.svg?raw';
    import IconForward from '@img/icons/player/forward.svg?raw';
    import IconFullScreen from '@img/icons/player/fullscreen.svg?raw';
    import IconVolume from '@img/icons/player/volume.svg?raw';
    import IconVolumeOff from '@img/icons/player/volume-off.svg?raw';
    import Plyr from 'plyr';

    import 'plyr/dist/plyr.css';

    defineProps<{ src: string }>();

    const videoElement = ref<HTMLVideoElement>();

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

                    <div class="controls-grid">
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
    `;

    onMounted(() => {
        if (videoElement.value) {
            new Plyr(videoElement.value, {
                controls,
            });
        }
    });
</script>

<style lang="postcss">
    .plyr--video {
        border-radius: 5px;
    }

    .control {
        width: 56px;
        height: 56px;

        display: flex;
        align-items: center;
    }

    .controls-grid {
        @apply flex items-center gap-7;
    }

    .icon--not-pressed {
        display: none;
    }

    .plyr__control--pressed {
        .icon--not-pressed {
            display: block;
        }

        .icon--pressed {
            display: none;
        }
    }

    .volume__control {
        &:hover {
            .plyr__volume {
                bottom: calc(100% + 8px);
                opacity: 1;
                visibility: visible;
            }
        }
    }

    .plyr__volume {
        transition: 0.3s ease;
        position: absolute;
        transform: rotate(-90deg) translateY(-23px);

        opacity: 0;
        bottom: 90%;
        visibility: hidden;

        .plyr__volume input[type='range'] {
            max-width: 65px;
        }
    }
</style>
