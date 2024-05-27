<template>
    <div ref="carouselElement">
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
        new Carousel(carouselElement.value, options);
    });
</script>

<style>
    .f-carousel__viewport {
        overflow: visible;
    }

    .f-carousel__slide:last-child {
        margin-right: 0 !important;
    }
</style>
