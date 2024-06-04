<template>
    <div
        ref="reference"
        :class="{
            'cursor-default text-grey-150': isDisabled,
            'cursor-pointer': !isDisabled,
            'saturate-0': isDisabled && !saturateImage,
        }"
        class="card group relative flex items-center justify-center rounded-2xl bg-primary-dark !p-2 text-center text-h2"
        @click="redirect"
    >
        <div
            class="absolute left-0 top-0 z-10 h-full w-full overflow-hidden rounded-2xl before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:content-normal before:bg-primary-100/35"
        >
            <img
                v-if="img"
                :class="{
                    'group-hover:scale-110': !isDisabled,
                    'saturate-0': isDisabled && saturateImage,
                }"
                :src="img"
                class="img-cover transition-transform"
                :alt="name"
            />
        </div>

        <div
            v-if="isDisabled"
            ref="tooltip"
            :style="floatingStyles"
            class="tooltip group-hover:opacity-100"
        >
            Sign in or Sign up to access our entire catalog
        </div>

        <span class="relative z-10">
            {{ name }}
        </span>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import type { RouteLocationRaw } from 'vue-router';
    import { useRouter } from 'vue-router';

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth.store.ts';

    import { useFloatingTooltip } from '@/hooks/useFloatingTooltip.ts';

    interface Props {
        name: string;
        img?: string | null;
        to: RouteLocationRaw;
        disable?: boolean;
        saturateImage?: boolean;
    }

    const props = defineProps<Props>();

    const router = useRouter();

    const { isAuthenticated } = storeToRefs(useAuthStore());

    const isDisabled = computed(() => props.disable && !isAuthenticated.value);

    const reference = ref<HTMLElement | null>(null);
    const tooltip = ref<HTMLElement | null>(null);

    /**
     * Configure tooltip
     */
    const { floatingStyles } = useFloatingTooltip(reference, tooltip);

    /**
     * Redirect function
     */
    const redirect = () => {
        if (!isDisabled.value) {
            void router.push(props.to);
        }
    };
</script>

<style scoped lang="postcss">
    .card {
        min-height: 195px;
    }
</style>
