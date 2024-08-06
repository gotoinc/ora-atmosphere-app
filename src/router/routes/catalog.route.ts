import type { RouteLocationNormalized } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useCatalogStore } from '@/stores/catalog.store.ts';

import { getGroup } from '@/api/catalog/get-group.api.ts';
import { getTopic } from '@/api/catalog/get-topic.api.ts';

export default {
    path: '/catalog',
    name: 'catalogView',
    component: () => import('@/views/catalog/CatalogView.vue'),

    meta: {
        title: 'Extended catalog',
    },

    children: [
        {
            path: ':groupId/:groupName',
            name: 'catalogGroupView',
            component: () => import('@/views/catalog/CatalogGroupView.vue'),

            beforeEnter: async (to: RouteLocationNormalized) => {
                const { currentGroup } = storeToRefs(useCatalogStore());

                const group = await getGroup(to.params.groupId as string);

                if (group) {
                    currentGroup.value = group;

                    if (group.requires_auth) {
                        return { name: 'main' };
                    }
                }
            },

            children: [
                {
                    path: ':topicId/:topicName/videos',
                    name: 'catalogThemeView',
                    component: () =>
                        import('@/views/catalog/CatalogThemeView.vue'),

                    beforeEnter: async (to: RouteLocationNormalized) => {
                        const { currentTopic } = storeToRefs(useCatalogStore());

                        const topic = await getTopic(
                            to.params.topicId as string
                        );

                        if (topic) {
                            currentTopic.value = topic;

                            if (topic.requires_auth) {
                                return { name: 'main' };
                            }
                        }
                    },
                },
            ],
        },

        {
            path: 'extended/:id/:category',
            name: 'catalogCategoryView',
            component: () => import('@/views/catalog/CatalogCategoryView.vue'),
        },
    ],
};
