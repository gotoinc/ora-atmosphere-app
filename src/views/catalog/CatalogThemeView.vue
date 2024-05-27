<template>
    <template v-if="route.name === 'catalogThemeView'">
        <h2 class="mb-6 text-h5 font-light uppercase">
            {{ route.params.theme }} theme
        </h2>

        <div
            class="grid grid-cols-5 gap-3.5 max-2lg:grid-cols-4 max-tab:grid-cols-3 max-sm:grid-cols-2 max-mob-md:grid-cols-1"
        >
            <category-card
                v-for="i in 25"
                :key="i"
                class="!max-w-full max-mob-md:hidden"
                :to="{
                    name: 'catalogVideosView',
                }"
                :img="ThemeImg"
                name="Theme"
            />

            <category-card
                v-for="i in 4"
                :key="i"
                class="!max-w-full mob-md:hidden"
                :to="{
                    name: 'catalogVideosView',
                }"
                :img="ThemeImg"
                name="Theme"
            />
        </div>

        <v-button variant="text" class="mx-auto mt-6 block mob-md:hidden">
            Show more
        </v-button>
    </template>

    <router-view></router-view>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import ThemeImg from '@img/categories/theme-bg.jpg';

    import VButton from '@/components/banner/VButton.vue';
    import CategoryCard from '@/components/catalog/CategoryCard.vue';

    const route = useRoute();
</script>

<style scoped></style>
