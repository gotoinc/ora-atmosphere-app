export default {
    path: '/search/:value',
    name: 'searchView',
    component: () => import('@/views/catalog/CatalogThemeView.vue'),
};
