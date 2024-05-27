<template>
    <template v-if="route.name === 'catalogThemeView'">
        <h2 class="text-xl uppercase">Catalog theme</h2>
    </template>

    <router-view></router-view>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router';

    const route = useRoute();
</script>

<style scoped></style>
