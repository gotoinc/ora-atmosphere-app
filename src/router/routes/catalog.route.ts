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

            children: [
                {
                    path: ':topicId/:topicName/videos',
                    name: 'catalogThemeView',
                    component: () =>
                        import('@/views/catalog/CatalogThemeView.vue'),
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
