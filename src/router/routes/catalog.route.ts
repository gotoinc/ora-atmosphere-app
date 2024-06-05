export default {
    path: '/catalog',
    name: 'catalogView',
    component: () => import('@/views/catalog/CatalogView.vue'),

    meta: {
        title: 'Extended catalog',
    },

    children: [
        {
            path: ':group',
            name: 'catalogGroupView',
            component: () => import('@/views/catalog/CatalogGroupView.vue'),

            children: [
                {
                    path: ':theme/videos',
                    name: 'catalogThemeView',
                    component: () =>
                        import('@/views/catalog/CatalogThemeView.vue'),
                },
            ],
        },

        {
            path: 'extended/:category',
            name: 'catalogCategoryView',
            component: () => import('@/views/catalog/CatalogCategoryView.vue'),
        },
    ],
};
