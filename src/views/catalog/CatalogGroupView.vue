<template>
    <template v-if="route.name === 'catalogGroupView'">
        <h2 class="mb-6 text-h5 font-light uppercase">
            {{ useTransformFromPath(route.params.groupName as string) }}
        </h2>

        <template v-if="isLoading">
            <div class="list">
                <card-skeleton
                    v-for="i in 10"
                    :key="i"
                    class="bg-primary-100/25"
                />
            </div>
        </template>

        <template v-else-if="topicData.length > 0">
            <div class="list">
                <category-card
                    v-for="{ id, name, image_url } in topicData"
                    :key="id"
                    class="!max-w-full"
                    :to="{
                        name: 'catalogThemeView',
                        params: { topic: useTransformPath(name), id },
                    }"
                    :img="image_url"
                    :name="name"
                />
            </div>
        </template>

        <h3 v-else class="pt-5 text-center text-h3">No themes found</h3>
    </template>

    <router-view></router-view>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useToast } from 'vue-toastification';

    import CardSkeleton from '@/components/catalog/CardSkeleton.vue';
    import CategoryCard from '@/components/catalog/CategoryCard.vue';

    import type { Topic } from '@/ts/interfaces/catalog';

    import { getTopics } from '@/api/catalog/get-topics.api.ts';
    import {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        useTransformFromPath,
        useTransformPath,
    } from '@/hooks/transform-queries.ts';

    const route = useRoute();
    const toast = useToast();

    const isLoading = ref(true);
    const topicData = ref<Topic[]>([]);

    onMounted(async () => {
        try {
            topicData.value = (await getTopics()) ?? [];
        } catch (err) {
            toast.error('Themes were not found');
        } finally {
            isLoading.value = false;
        }
    });
</script>

<style scoped lang="postcss">
    .list {
        @apply mb-10 grid grid-cols-5 gap-3.5 max-2lg:grid-cols-4 max-tab:grid-cols-3 max-sm:grid-cols-2 max-mob-md:grid-cols-1;
    }
</style>
