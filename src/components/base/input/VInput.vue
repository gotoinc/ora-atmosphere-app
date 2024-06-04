<template>
    <div>
        <label
            v-if="label"
            class="mb-1.5 inline-block text-base font-semibold"
            :class="{ 'text-white-100': variant === 'white' }"
        >
            <span v-if="required">*</span>

            {{ label }}
            <span v-if="optional" class="text-white-50"> (optional) </span>
        </label>

        <div
            :class="{
                'white-variant': variant === 'white',
            }"
            class="relative"
        >
            <input
                :type="inputType"
                :value="modelValue"
                :disabled="disabled"
                :placeholder="placeholder"
                :name="name"
                :class="[
                    {
                        'with-icon': icon || type === 'password',
                        '!border-error': error,
                    },
                    inputClass,
                ]"
                class="input"
                @input="onInput($event)"
                @click="emits('click-input')"
                @blur="emits('blur')"
                @keyup.enter="onEnter($event)"
            />

            <component
                :is="icon"
                v-if="icon"
                :class="[
                    iconClass,
                    {
                        '!pointer-events-auto cursor-pointer': iconClickable,
                    },
                ]"
                class="input-icon"
                @click="emits('click-icon')"
            />

            <template v-else-if="type === 'password'">
                <component
                    :is="IconEyeSlash"
                    v-show="inputType === 'password'"
                    class="input-icon icon-password"
                    @click="inputType = 'text'"
                />

                <component
                    :is="IconEyeOpen"
                    v-show="inputType !== 'password'"
                    class="input-icon icon-password !pointer-events-auto cursor-pointer !fill-none hover:!text-dark"
                    @click="inputType = 'password'"
                />
            </template>
        </div>

        <p v-show="error" class="mt-1 text-error transition">
            {{ error }}
        </p>

        <p
            v-show="hint && !modelValue && !error"
            class="mt-1 text-small text-grey-100 transition"
            :class="{ 'text-white-50': variant === 'white' }"
        >
            {{ hint }}
        </p>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import IconEyeOpen from '@img/icons/eye-open.svg?component';
    import IconEyeSlash from '@img/icons/eye-slash.svg?component';

    import type { InputEmits, InputProps } from '@/components/base/input/types';

    const emits = defineEmits<InputEmits>();

    const props = withDefaults(defineProps<InputProps>(), {
        type: 'text',
        placeholder: '',
        variant: 'dark',
    });

    const inputType = ref(props.type);

    const onInput = (e: Event) => {
        const target = e.target as HTMLInputElement;

        emits('update:modelValue', target.value);
    };

    const onEnter = (e: Event) => {
        const target = e.target as HTMLInputElement;

        emits('enter', target.value);
    };
</script>

<style scoped lang="postcss">
    .input-icon {
        @apply pointer-events-none absolute right-6 top-1/2 h-4 w-4 -translate-y-1/2 fill-current text-grey-100 transition-colors;

        &.icon-password {
            @apply pointer-events-auto cursor-pointer hover:text-dark;
        }
    }
</style>
