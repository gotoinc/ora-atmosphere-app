export default {
    path: '/',
    name: 'main',
    component: () => import('@/views/MainView.vue'),

    meta: { requiresAuth: true },

    children: [],
};
