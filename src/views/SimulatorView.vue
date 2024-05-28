<template>
    <div>
        <div ref="simulatorElement" class="h-screen"></div>

        <div
            class="settings absolute left-16 top-16 flex flex-col items-center gap-4"
        >
            <button
                type="button"
                :class="{ 'bg-white-100 text-dark': activeDiameter === 100 }"
                class="size-button h-[100px] w-[100px]"
                @click="setSimulatorDiameter(100)"
            >
                100
            </button>

            <button
                type="button"
                :class="{ 'bg-white-100 text-dark': activeDiameter === 80 }"
                class="size-button h-[80px] w-[80px]"
                @click="setSimulatorDiameter(80)"
            >
                80
            </button>

            <button
                type="button"
                :class="{ 'bg-white-100 text-dark': activeDiameter === 60 }"
                class="size-button h-[60px] w-[60px]"
                @click="setSimulatorDiameter(60)"
            >
                60
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import type { Simulator } from '@simulator/demo';
    import { initSimulator } from '@simulator/demo/src';
    // import { resolveContentURL } from '@simulator/demo/src/library.ts';

    type SphereDiameter = 100 | 80 | 60;

    const simulatorElement = ref<HTMLDivElement | null>(null);
    const activeDiameter = ref<SphereDiameter>(80);

    const setSimulatorContent = () => {
        if (simulatorInstance.value) {
            void simulatorInstance.value.setContent({
                URL: 'https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bmF0dXJhbHxlbnwwfHx8fDE3MTY4MDYwMjV8MA&ixlib=rb-4.0.3',
            });
        }
    };

    const setSimulatorDiameter = (diameter: SphereDiameter) => {
        if (simulatorInstance.value) {
            simulatorInstance.value.setDiameter(diameter);
            activeDiameter.value = diameter;
        }
    };

    const simulatorInstance = ref<Simulator | null>(null);

    onMounted(async () => {
        if (simulatorElement.value) {
            const { simulator } = await initSimulator(
                simulatorElement.value,
                ''
            );

            simulatorInstance.value = simulator;
        }

        setSimulatorContent();
    });
</script>

<style scoped lang="postcss">
    .size-button {
        @apply cursor-pointer rounded-full border border-solid border-white-100 transition-colors hover:bg-white-100 hover:text-dark;
    }
</style>
