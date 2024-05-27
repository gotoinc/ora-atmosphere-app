<template>
    <div
        class="flex cursor-pointer items-center gap-2.5 opacity-70 transition-opacity"
    >
        <div class="h-14 w-14 flex-shrink-0 rounded-lg bg-white-75"></div>

        <h4 class="text-xs font-semibold uppercase">
            {{ name }}
        </h4>
    </div>
</template>

<script setup lang="ts">
    defineProps<{ name: string; img?: string }>();
</script>

<style scoped></style>
