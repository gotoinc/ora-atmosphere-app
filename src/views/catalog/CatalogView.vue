<template>
    <!-- Catalog page  -->
    <template v-if="isCatalogPage">
        <template v-if="isLoading">
            <div class="fade-t grid gap-12">
                <fancy-carousel
                    v-for="i in 3"
                    :key="i"
                    overflow-visible
                    class="-ml-4 w-screen px-4"
                >
                    <card-skeleton
                        v-for="j in 5"
                        :key="j"
                        class="f-carousel__slide !mr-3.5 !max-w-[347px] !bg-primary-100/30 max-sm:!max-w-[268px]"
                    />
                </fancy-carousel>
            </div>
        </template>

        <template v-else-if="catalogData.length > 0">
            <div class="grid gap-12">
                <div
                    v-for="category in catalogData"
                    :key="category.id"
                    class="fade-t"
                >
                    <catalog-link
                        :to="isCatalogLink(category, category.groups.length)"
                        class="mb-4"
                    >
                        {{ category.name }}
                    </catalog-link>

                    <fancy-carousel overflow-visible class="max-w-[95vw]">
                        <category-card
                            v-for="group in category.groups.slice(0, 10)"
                            :key="group.id"
                            class="f-carousel__slide !mr-3.5 !max-w-[347px] max-sm:!max-w-[268px]"
                            :to="{
                                name: 'catalogGroupView',
                                params: {
                                    groupName: useTransformPath(group.name),
                                    groupId: group.id,
                                },
                            }"
                            :img="group.image"
                            :name="group.name"
                            :disable="group.requires_auth"
                        />
                    </fancy-carousel>
                </div>
            </div>
        </template>

        <h3 v-else class="pt-5 text-center text-h3">No catalog found</h3>
    </template>

    <template v-else>
        <v-breadcrumbs class="mb-14" />

        <router-view></router-view>
    </template>

    <scroll-to-top />
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { onBeforeRouteUpdate, useRoute } from 'vue-router';
    import { useToast } from 'vue-toastification';

    import ScrollToTop from '@/components/base/ScrollToTop.vue';
    import VBreadcrumbs from '@/components/base/VBreadcrumbs.vue';
    import FancyCarousel from '@/components/carousel/FancyCarousel.vue';
    import CardSkeleton from '@/components/catalog/CardSkeleton.vue';
    import CatalogLink from '@/components/catalog/CatalogLink.vue';
    import CategoryCard from '@/components/catalog/CategoryCard.vue';

    import { getCategories } from '@/api/catalog/get-categories.api.ts';
    import { useTransformPath } from '@/hooks/transform-queries.ts';
    import type { Category } from '@/ts/catalog';

    const route = useRoute();
    const toast = useToast();

    const isCatalogLink = (category: Category, length: number) => {
        return length > 10
            ? {
                  name: 'catalogCategoryView',
                  params: {
                      id: category.id,
                      category: useTransformPath(category.name),
                  },
              }
            : undefined;
    };

    const isCatalogPage = computed(() => route.name === 'catalogView');

    const isLoading = ref(true);
    const catalogData = ref<Category[]>([]);

    const loadCatalog = async () => {
        try {
            catalogData.value = (await getCategories()) ?? [];
        } catch (err) {
            toast.error('Catalog was not found');
        } finally {
            isLoading.value = false;
        }
    };

    onBeforeRouteUpdate((to) => {
        if (to.name === 'catalogView') {
            void loadCatalog();
        }
    });

    onMounted(() => {
        if (isCatalogPage.value) {
            void loadCatalog();
        }
    });
</script>

<style scoped></style>
