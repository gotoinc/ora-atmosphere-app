export default {
    path: '/catalog/:category',
    name: 'categoryView',
    component: () => import('@/views/CategoryView.vue'),
};
