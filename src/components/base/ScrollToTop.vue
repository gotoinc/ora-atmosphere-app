<template>
    <button
        :class="{ active: isButtonShow }"
        class="invisible fixed bottom-20 right-6 flex h-20 w-20 translate-x-5 items-center justify-center rounded-full bg-white-100 text-primary-100 opacity-0 transition-all hover:bg-primary-100 hover:text-white-100 max-sm:right-4"
        @click="scrollTop"
    >
        <component :is="IconChevronUp" class="h-11 w-11" />
    </button>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import IconChevronUp from '@img/icons/chevron-up.svg?component';

    const isButtonShow = ref(false);

    const scrollTop = () => {
        window.scrollTo(0, 0);
    };

    const scrollBtnDisplay = () => {
        window.scrollY > window.innerHeight
            ? (isButtonShow.value = true)
            : (isButtonShow.value = false);
    };

    onMounted(() => {
        window.addEventListener('scroll', scrollBtnDisplay);
    });
</script>

<style scoped lang="postcss">
    .active {
        opacity: 1;
        visibility: visible;
        transform: translateX(0);
    }
</style>
