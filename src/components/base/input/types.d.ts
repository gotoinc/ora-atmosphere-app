import type { Component } from 'vue';

export interface InputProps {
    modelValue: string | number;
    type?: string;
    name?: string;
    placeholder?: string;
    variant?: 'dark' | 'white';
    label?: string;
    icon?: Component;
    error?: string;
    required?: boolean;
    disabled?: boolean;
}

export interface InputEmits {
    (e: 'update:modelValue', value: InputProps['modelValue']): void;
    (e: 'blur'): void;
    (e: 'enter', value: InputProps['modelValue']): void;
}
