<template>
    <h2 class="mb-6 text-h5 font-light uppercase">
        {{ useTransformFromPath(route.params.category as string) }}
    </h2>

    <template v-if="isLoading">
        <div class="list">
            <card-skeleton v-for="i in 10" :key="i" class="bg-primary-100/25" />
        </div>
    </template>

    <template v-else-if="groupsData.length > 0">
        <div class="list fade-t">
            <category-card
                v-for="{ id, name, image, requires_auth } in groupsData"
                :key="id"
                :to="{
                    name: 'catalogGroupView',
                    params: { groupName: useTransformPath(name), groupId: id },
                }"
                :img="image"
                :name="name"
                :disable="requires_auth"
            />
        </div>
    </template>

    <h3 v-else class="fade-t pt-5 text-center text-h3">No groups found</h3>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useToast } from 'vue-toastification';

    import CardSkeleton from '@/components/catalog/CardSkeleton.vue';
    import CategoryCard from '@/components/catalog/CategoryCard.vue';

    import { getCategoryGroups } from '@/api/catalog/get-groups.api.ts';
    import {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        useTransformFromPath,
        useTransformPath,
    } from '@/hooks/transform-queries.ts';
    import type { Group } from '@/ts/catalog';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const route = useRoute();
    const toast = useToast();

    const isLoading = ref(true);
    const groupsData = ref<Group[]>([]);

    onMounted(async () => {
        try {
            const res = await getCategoryGroups(route.params.id as string);

            groupsData.value = res ?? [];
        } catch (err) {
            toast.error('Groups were not found');
        } finally {
            isLoading.value = false;
        }
    });
</script>

<style scoped lang="postcss">
    .list {
        @apply grid grid-cols-5 gap-3.5 max-2lg:grid-cols-4 max-tab:grid-cols-3 max-sm:grid-cols-2 max-mob-md:grid-cols-1;
    }
</style>
