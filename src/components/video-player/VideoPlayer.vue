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
        <player-controls fullscreen :player="player" />

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

    import { plyrOptions } from '@/libs/plyr/plyr-options.ts';

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

    const closePlayer = () => {
        player.value?.pause();
        emits('close');
    };

    onMounted(() => {
        if (videoElement.value && controls.value) {
            player.value = new Plyr(videoElement.value, {
                controls: controls.value,
                ...plyrOptions,
            });

            // Set poster
            if (props.poster) {
                player.value.poster = props.poster;
            }
        }
    });
</script>

<style lang="postcss"></style>
