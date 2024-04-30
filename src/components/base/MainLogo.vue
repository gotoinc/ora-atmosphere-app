<template>
    <div class="flex items-end gap-4">
        <router-link to="/" aria-label="ORA Application simulator">
            <img src="@img/logo.svg" alt="ORA Application simulator" />
        </router-link>

        <span class="pointer-events-none text-sm uppercase">
            Application simulator
        </span>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
    img {
        width: 96px;
        height: 26px;
    }
</style>
