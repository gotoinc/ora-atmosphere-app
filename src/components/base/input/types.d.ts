import type { Component } from 'vue';

export interface InputProps {
    modelValue: string | number | undefined;
    type?: string;
    name?: string;
    placeholder?: string;
    variant?: 'dark' | 'white';
    label?: string;
    icon?: Component;
    error?: string;
    required?: boolean;
    optional?: boolean;
    disabled?: boolean;
    hint?: string;
}

export interface InputEmits {
    (e: 'update:modelValue', value: InputProps['modelValue']): void;
    (e: 'blur'): void;
    (e: 'enter', value: InputProps['modelValue']): void;
}
