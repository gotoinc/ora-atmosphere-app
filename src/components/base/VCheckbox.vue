<template>
    <label
        :class="{ 'pointer-events-none opacity-50': disabled, error }"
        class="checkbox"
    >
        <input
            :disabled="disabled"
            type="checkbox"
            :checked="modelValue"
            :aria-checked="modelValue"
            @change="check($event)"
        />

        <span class="text-base">
            <slot></slot>
        </span>
    </label>
</template>

<script setup lang="ts">
    interface Props {
        modelValue: boolean;
        disabled?: boolean;
        error?: boolean | string;
    }

    interface Emits {
        (e: 'update:modelValue', value: boolean): void;
    }

    defineProps<Props>();

    const emits = defineEmits<Emits>();

    const check = (event: Event) => {
        const target = event.target as HTMLInputElement;

        emits('update:modelValue', target.checked);
    };
</script>

<style scoped lang="postcss">
    .checkbox {
        align-items: center;
        cursor: pointer;
        display: flex;
        position: relative;
        width: fit-content;

        &.error {
            span:before {
                @apply border-error;
            }
        }

        input {
            @apply hidden;

            &[aria-checked='true'] + span {
                &:before {
                    @apply border-primary-100 bg-primary-100 text-base;
                }
            }
        }

        span {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 0 0 auto;
            font-weight: 400;
            line-height: normal;

            position: relative;
            transition: all 0.3s ease;
            width: 100%;
            word-break: break-word;
            text-align: left;

            &:before {
                @apply flex h-6 w-6 items-center justify-center border border-solid border-grey-100 transition;
            }

            &:before {
                content: '';
                border-radius: 4px;
                background-repeat: no-repeat;
                background-size: 65%;
                background-position: center;
                background-image: url('data:image/svg+xml,<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4796 0.48913C11.7616 0.75354 11.7759 1.19653 11.5115 1.47857L4.01148 9.4786C3.88106 9.6177 3.69957 9.6975 3.50892 9.6998C3.31827 9.702 3.13497 9.6263 3.00137 9.4903L0.501366 6.9448C0.230476 6.669 0.234466 6.2258 0.510286 5.9549C0.786106 5.684 1.22931 5.688 1.5002 5.9639L3.48904 7.9889L10.4901 0.52105C10.7545 0.23901 11.1975 0.22472 11.4796 0.48913Z" fill="white"/></svg>');

                transition: font-size 0.3s ease;
                flex-shrink: 0;
            }
        }
    }
</style>
