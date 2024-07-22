<template>
    <label
        v-for="{ id, name, image } in categories"
        :key="id"
        :class="[
            {
                '!opacity-100': selectedCategories.includes(id),
            },
            categoryClass,
        ]"
        class="flex cursor-pointer items-center gap-2.5 opacity-70 transition-opacity"
    >
        <span class="block h-14 w-14 flex-shrink-0 rounded-lg bg-white-75">
            <img
                v-if="image"
                class="img-cover rounded-lg"
                :src="image"
                :alt="name"
            />
        </span>

        <span class="name text-xs font-semibold uppercase">
            {{ name }}
        </span>

        <input
            v-model="selectedCategories"
            class="hidden"
            type="checkbox"
            :value="id"
            @change="onChange"
        />
    </label>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import type { LocationQueryValue } from 'vue-router';

    import type { Category } from '@/ts/catalog';

    interface Props {
        modelValue: Array<number | LocationQueryValue>;
        categories: Category[];
        categoryClass?: string;
    }

    interface Emits {
        (e: 'update:modelValue', value: Props['modelValue']): void;
    }

    const props = defineProps<Props>();
    const emits = defineEmits<Emits>();

    const selectedCategories = computed<Props['modelValue']>({
        get() {
            return props.modelValue;
        },

        set(value) {
            emits('update:modelValue', value);
        },
    });

    const onChange = () => {
        emits('update:modelValue', selectedCategories.value);
    };
</script>

<style scoped lang="postcss">
    .name {
        word-break: break-word;
    }
</style>
