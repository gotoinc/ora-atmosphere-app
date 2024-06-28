<template>
    <video ref="videoElement" crossorigin playsinline>
        <source
            v-for="{ src, language } in sources"
            :key="language"
            :src="src"
            type="video/mp4"
        />
    </video>

    <div ref="controls">
        <player-controls
            :class="{ 'fullscreen--active': isFullScreenActive }"
        />

        <button
            type="button"
            class="plyr__control text-primary plyr__control--overlaid"
            data-plyr="play"
            aria-pressed="false"
            aria-label="Play"
        >
            <component :is="IconPlay" />

            <span class="plyr__sr-only">Play</span>
        </button>

        <h3
            class="absolute left-1/2 top-[9%] z-10 -translate-x-1/2 text-xl sm:hidden"
        >
            {{ title ?? '' }}
        </h3>

        <button
            type="button"
            class="close-btn"
            data-plyr="close"
            @click="closePlayer"
        >
            <component :is="IconClose" />
        </button>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import IconClose from '@img/icons/close.svg?component';
    import IconPlay from '@img/icons/play.svg?component';
    import Plyr from 'plyr';

    import PlayerControls from '@/components/video-player/PlayerControls.vue';

    interface Emits {
        (e: 'close'): void;
    }

    interface Props {
        title?: string;
        poster?: string;
    }

    const props = defineProps<Props>();
    const emits = defineEmits<Emits>();

    const videoElement = ref<HTMLVideoElement>();
    const player = ref<Plyr>();
    const controls = ref<HTMLElement>();

    // Speed options
    const speedOptions = [0.5, 0.75, 1, 1.25, 1.5];
    const activeSpeed = ref(speedOptions[2]);

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

    const isFullScreenActive = ref(false);

    const changeSpeed = (option: number) => {
        activeSpeed.value = option;

        if (player.value) player.value.speed = option;
    };

    changeSpeed(1);

    const closePlayer = () => {
        player.value?.pause();
        emits('close');
    };

    const changeVideoSrc = (src: string) => {
        selectedSrc.value = src;

        if (videoElement.value) {
            videoElement.value.src = src;
        }

        if (player.value) {
            player.value.poster = '';
        }
    };

    changeVideoSrc(selectedSrc.value);

    onMounted(() => {
        if (videoElement.value && controls.value) {
            player.value = new Plyr(videoElement.value, {
                controls: controls.value,

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
                isFullScreenActive.value = true;
            });

            player.value.on('exitfullscreen', () => {
                isFullScreenActive.value = false;
            });

            // Player container
            const plyrContainer = player.value.elements.container;

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

            if (plyrContainer)
                plyrContainer.addEventListener('click', setClickEvent);
        }
    });
</script>

<style lang="postcss"></style>
