export default {
    path: '/catalog',
    name: 'catalogView',
    component: () => import('@/views/CatalogView.vue'),

    meta: {
        title: 'Catalog',
    },
};
