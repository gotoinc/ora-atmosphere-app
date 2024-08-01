<template>
    <template v-if="isGroupPage">
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
            <div class="list fade-t">
                <category-card
                    v-for="{ id, name, image, requires_auth } in topicData"
                    :key="id"
                    class="!max-w-full"
                    :to="{
                        name: 'catalogThemeView',
                        params: {
                            topicName: useTransformPath(name),
                            topicId: id,
                        },
                    }"
                    :img="image"
                    :name="name"
                    saturate-image
                    :disable="requires_auth"
                />
            </div>
        </template>

        <h3 v-else class="fade-t pt-8 text-center text-h3">No themes found</h3>
    </template>

    <router-view></router-view>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { onBeforeRouteUpdate, useRoute } from 'vue-router';
    import { useToast } from 'vue-toastification';

    import CardSkeleton from '@/components/catalog/CardSkeleton.vue';
    import CategoryCard from '@/components/catalog/CategoryCard.vue';

    import { storeToRefs } from 'pinia';
    import { useCatalogStore } from '@/stores/catalog.store.ts';

    import { getGroup } from '@/api/catalog/get-group.api.ts';
    import {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        useTransformFromPath,
        useTransformPath,
    } from '@/hooks/transform-queries.ts';
    import type { Topic } from '@/ts/catalog';

    const route = useRoute();
    const toast = useToast();

    const { currentGroup } = storeToRefs(useCatalogStore());

    const isGroupPage = computed(() => route.name === 'catalogGroupView');

    const isLoading = ref(true);
    const topicData = ref<Topic[]>([]);

    const loadTopics = async () => {
        try {
            const res = await getGroup(route.params.groupId as string);

            if (res) {
                topicData.value = res.topics;
                currentGroup.value = res;
            }
        } catch (err) {
            toast.error('Themes were not found');
        } finally {
            isLoading.value = false;
        }
    };

    onBeforeRouteUpdate((to) => {
        if (to.name === 'catalogGroupView') {
            void loadTopics();
        }
    });

    onMounted(() => {
        if (isGroupPage.value && currentGroup.value) {
            topicData.value = currentGroup.value.topics;

            isLoading.value = false;
        }
    });
</script>

<style scoped lang="postcss">
    .list {
        @apply mb-10 grid grid-cols-5 gap-3.5 max-2lg:grid-cols-4 max-tab:grid-cols-3 max-sm:grid-cols-2 max-mob-md:grid-cols-1;
    }
</style>
