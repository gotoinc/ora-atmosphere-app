import catalogRoute from '@/router/routes/catalog.route.ts';

export default {
    path: '/',
    name: 'main',
    component: () => import('@/views/MainView.vue'),

    redirect: { name: 'catalogView' },

    children: [catalogRoute],
};
