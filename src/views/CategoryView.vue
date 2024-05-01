<template>
    <h2 class="text-xl uppercase">
        {{ route.params.category }}
    </h2>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router';

    const route = useRoute();
</script>

<style scoped></style>
