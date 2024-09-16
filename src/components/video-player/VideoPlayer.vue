<template>
    <video
        v-if="contentToPlay"
        ref="videoElement"
        crossorigin="anonymous"
        playsinline
    >
        <source :src="contentToPlay.video_files[0].file" />
    </video>

    <div v-if="contentToPlay" ref="controls">
        <player-controls
            :content="contentToPlay"
            fullscreen
            :player="player"
            @change-src="changeVideoSrc"
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

    import { storeToRefs } from 'pinia';
    import { useCatalogStore } from '@/stores/catalog.store.ts';

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

    const { contentToPlay } = storeToRefs(useCatalogStore());

    const videoElement = ref<HTMLVideoElement>();
    const player = ref<Plyr>();
    const controls = ref<HTMLElement>();

    const closePlayer = () => {
        player.value?.pause();
        emits('close');
    };

    const changeVideoSrc = (src: string) => {
        if (videoElement.value) {
            videoElement.value.src = src;
        }
    };

    onMounted(() => {
        if (videoElement.value && controls.value) {
            player.value = new Plyr(videoElement.value, {
                controls: controls.value,
                fullscreen: {
                    iosNative: true,
                },
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
