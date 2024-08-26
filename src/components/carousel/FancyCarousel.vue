<template>
    <div ref="carouselElement" :class="{ visible: overflowVisible }">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { Carousel } from '@fancyapps/ui';
    import type { OptionsType } from '@fancyapps/ui/types/Carousel/options';

    import '@fancyapps/ui/dist/carousel/carousel.css';

    interface Props {
        carouselOptions?: Partial<OptionsType>;
        overflowVisible?: boolean;
    }

    type CarouselElement = HTMLElement | string | null;

    const props = defineProps<Props>();

    const carouselElement = ref<CarouselElement>(null);

    const options = Object.assign(props.carouselOptions ?? {}, {
        center: false,
        infinite: false,
        adaptiveHeight: true,
        Navigation: false,
    });

    onMounted(() => {
        if (
            carouselElement.value &&
            typeof carouselElement.value !== 'string'
        ) {
            const fancybox = new Carousel(carouselElement.value, options);

            let touchStartX = 0;
            let touchEndX = 0;

            const checkSwipe = () => {
                if (touchEndX < touchStartX) {
                    fancybox.slideNext();
                }
                if (touchEndX > touchStartX) {
                    fancybox.slidePrev();
                }
            };

            carouselElement.value.addEventListener(
                'wheel',
                (event: WheelEvent) => {
                    if (event.deltaX > 0) {
                        fancybox.slideNext();
                    } else if (event.deltaX < 0) {
                        fancybox.slidePrev();
                    }
                }
            );

            carouselElement.value.addEventListener(
                'touchstart',
                (event: TouchEvent) => {
                    touchStartX = event.changedTouches[0].screenX;
                }
            );

            carouselElement.value.addEventListener('touchend', (event) => {
                touchEndX = event.changedTouches[0].screenX;
                checkSwipe();
            });
        }
    });
</script>

<style>
    .visible {
        .f-carousel__viewport {
            overflow: visible;
        }
    }

    .f-carousel__slide:last-child {
        margin-right: 0 !important;
    }
</style>
