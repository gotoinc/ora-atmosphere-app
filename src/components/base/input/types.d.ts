import type { Component } from 'vue';

export interface InputProps {
    modelValue: string | number | undefined;
    type?: string;
    name?: string;
    placeholder?: string;
    variant?: 'dark' | 'white';
    label?: string;
    icon?: Component;
    iconClass?: string;
    iconClickable?: boolean;
    inputClass?: string;
    error?: string;
    required?: boolean;
    optional?: boolean;
    disabled?: boolean;
    hint?: string;
}

export interface InputEmits {
    (e: 'update:modelValue', value: InputProps['modelValue']): void;
    (e: 'blur'): void;
    (e: 'enter', value?: string): void;
    (e: 'click-icon'): void;
    (e: 'click-input'): void;
}
