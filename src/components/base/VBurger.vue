<template>
    <div
        :class="{ active: modelValue, 'not-active': !modelValue }"
        class="burger"
    >
        <span></span>

        <span></span>

        <span></span>
    </div>
</template>

<script setup lang="ts">
    interface Props {
        modelValue: boolean;
    }

    defineProps<Props>();
</script>

<style scoped lang="postcss">
    .burger {
        width: 32px;
        height: 22px;
        cursor: pointer;

        &:hover {
            span:nth-child(2) {
                width: 100%;
            }
        }
    }

    span {
        display: block;
        width: 100%;
        border-radius: 30px;
        height: 2px;
        background: #fff;
        transition: all 0.3s;
        position: relative;

        &:nth-child(2) {
            width: 80%;
        }

        & + span {
            margin-top: 8px;
        }
    }

    .active {
        span:nth-child(1) {
            animation: ease 0.7s top forwards;
        }

        span:nth-child(2) {
            animation: ease 0.7s scaled forwards;
        }

        span:nth-child(3) {
            animation: ease 0.7s bottom forwards;
        }
    }

    .not-active {
        span:nth-child(1) {
            animation: ease 0.7s top-2 forwards;
        }

        span:nth-child(2) {
            animation: ease 0.7s scaled-2 forwards;
        }

        span:nth-child(3) {
            animation: ease 0.7s bottom-2 forwards;
        }
    }

    @keyframes top {
        0% {
            top: 0;
            transform: rotate(0);
        }
        50% {
            top: 11px;
            transform: rotate(0);
        }
        100% {
            top: 11px;
            transform: rotate(45deg);
        }
    }

    @keyframes top-2 {
        0% {
            top: 11px;
            transform: rotate(45deg);
        }
        50% {
            top: 11px;
            transform: rotate(0deg);
        }
        100% {
            top: 0;
            transform: rotate(0deg);
        }
    }

    @keyframes bottom {
        0% {
            bottom: 0;
            transform: rotate(0);
        }
        50% {
            bottom: 9px;
            transform: rotate(0);
        }
        100% {
            bottom: 9px;
            transform: rotate(135deg);
        }
    }

    @keyframes bottom-2 {
        0% {
            bottom: 9px;
            transform: rotate(135deg);
        }
        50% {
            bottom: 9px;
            transform: rotate(0);
        }
        100% {
            bottom: 0;
            transform: rotate(0);
        }
    }

    @keyframes scaled {
        50% {
            transform: scale(0);
        }
        100% {
            transform: scale(0);
        }
    }

    @keyframes scaled-2 {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
