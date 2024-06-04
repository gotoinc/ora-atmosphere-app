<template>
    <div>
        <label
            v-if="label"
            :class="{ 'text-white-100': variant === 'white' }"
            class="mb-1 inline-block text-base font-semibold"
        >
            <span v-if="required">*</span>

            {{ label }}
        </label>

        <div
            :class="{
                'white-variant': variant === 'white',
            }"
            class="relative"
        >
            <select
                ref="selectElement"
                :disabled="disabled"
                class="input"
                :class="{
                    '!text-grey-100': !modelValue,
                    '!border-error': error,
                }"
                :name="name"
                @focus="isOpen = true"
                @blur="isOpen = false"
                @change="selectOption($event)"
            >
                <option
                    v-if="placeholder"
                    :selected="!options.includes(modelValue)"
                    disabled
                    class="text-grey-100"
                >
                    {{ placeholder }}
                </option>

                <option
                    v-for="item in options"
                    :key="item"
                    :selected="item === modelValue"
                    class="text-grey-100"
                    :value="item"
                >
                    {{ item }}
                </option>
            </select>

            <component
                :is="IconChevronDown"
                class="icon"
                :class="{
                    '-translate-y-1/2 rotate-180': isOpen,
                    'text-white-100': variant === 'white',
                }"
            />
        </div>

        <p v-show="error" class="error mt-1 text-error transition">
            {{ error }}
        </p>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import IconChevronDown from '@img/icons/chevron-down.svg?component';

    interface Props {
        modelValue: string;
        options: string[];
        name?: string;
        label?: string;
        required?: boolean;
        disabled?: boolean;
        placeholder?: string;
        error?: string;
        reset?: boolean;
        variant?: 'dark' | 'white';
    }

    interface Emits {
        (e: 'update:modelValue', value: Props['modelValue']): void;
        (e: 'update:reset', value: Props['reset']): void;
    }

    const props = defineProps<Props>();

    const emits = defineEmits<Emits>();

    const isOpen = ref(false);

    const selectElement = ref<HTMLSelectElement | null>(null);

    /**
     * Handle reset select
     */
    watch(
        () => props.modelValue,
        () => {
            if (props.reset && selectElement.value) {
                selectElement.value.selectedIndex = 0;

                emits('update:reset', false);
            }
        }
    );

    const selectOption = (event: Event) => {
        const target = event.target as HTMLSelectElement;

        emits(
            'update:modelValue',
            target.value === props.placeholder ? '' : target.value
        );
    };
</script>

<style scoped lang="postcss">
    .icon {
        @apply pointer-events-none absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 fill-current transition-transform;
    }
</style>
