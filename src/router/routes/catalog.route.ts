export default {
    path: '/catalog',
    name: 'catalogView',
    component: () => import('@/views/catalog/CatalogView.vue'),

    meta: {
        title: 'Catalog extended',
    },

    children: [
        {
            path: ':theme',
            name: 'catalogThemeView',
            component: () => import('@/views/catalog/CatalogThemeView.vue'),

            children: [
                {
                    path: 'videos',
                    name: 'catalogVideosView',
                    component: () =>
                        import('@/views/catalog/CatalogVideosView.vue'),

                    meta: {
                        title: 'Videos',
                    },
                },
            ],
        },
    ],
};
