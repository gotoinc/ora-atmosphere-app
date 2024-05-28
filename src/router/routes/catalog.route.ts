export default {
    path: '/catalog',
    name: 'catalogView',
    component: () => import('@/views/catalog/CatalogView.vue'),

    meta: {
        title: 'Catalog extended',
    },

    children: [
        {
            path: ':category',
            name: 'catalogCategoryView',
            component: () => import('@/views/catalog/CatalogCategoryView.vue'),

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
            path: 'extended/:domain',
            name: 'catalogDomainView',
            component: () => import('@/views/catalog/CatalogDomainView.vue'),
        },
    ],
};
