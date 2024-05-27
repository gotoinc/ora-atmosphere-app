<template>
    <transition>
        <div
            v-show="modelValue"
            ref="modalElement"
            class="fixed inset-0 z-50 overflow-y-auto bg-grey-400/40 backdrop-blur-sm"
        >
            <div
                class="flex min-h-full items-center justify-center p-4 text-center max-mob:items-end max-mob:p-0"
                @click.self="close()"
            >
                <div
                    :class="{
                        'max-w-5xl': props.size === 'lg',
                        'max-w-[484px]': props.size === 'sm',
                    }"
                    class="zoom-in relative flex w-full flex-col overflow-hidden rounded-2xl bg-dark p-11 text-left"
                >
                    <slot :close="close"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
    import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
    // Plugin to disable scroll in all browsers
    import {
        clearAllBodyScrollLocks,
        disableBodyScroll,
        enableBodyScroll,
    } from 'body-scroll-lock';

    interface Props {
        modelValue: boolean;
        size?: 'lg' | 'sm';
        closeButton?: boolean;
    }

    interface Emits {
        (e: 'update:modelValue', value: boolean): void;
        (e: 'close'): void;
    }

    const props = withDefaults(defineProps<Props>(), {
        size: 'sm',
        closeButton: true,
    });

    const emits = defineEmits<Emits>();

    const modalElement = ref<HTMLElement | null>(null);

    watch(
        () => props.modelValue,
        async (value) => {
            await nextTick();

            if (modalElement.value) {
                value
                    ? disableBodyScroll(modalElement.value)
                    : enableBodyScroll(modalElement.value);
            }
        }
    );

    function close() {
        emits('update:modelValue', false);
        emits('close');
    }

    onMounted(() => {
        if (props.modelValue && modalElement.value)
            disableBodyScroll(modalElement.value);
    });

    onUnmounted(() => {
        clearAllBodyScrollLocks();
    });
</script>

<style scoped lang="postcss">
    .v-enter-active,
    .v-leave-active {
        transition: all 0.3s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .zoom-in {
        animation: zoom-in 0.3s ease;
    }

    @keyframes zoom-in {
        0% {
            transform: scale(0.5);
        }

        100% {
            transform: scale(1);
        }
    }
</style>
