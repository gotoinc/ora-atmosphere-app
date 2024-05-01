import catalogRoute from '@/router/routes/catalog.route.ts';
import catalogExtendedRoute from '@/router/routes/catalog-extended.route.ts';
import categoryRoute from '@/router/routes/category.route.ts';

export default {
    path: '/',
    name: 'main',
    component: () => import('@/views/MainView.vue'),

    meta: { requiresAuth: true },

    redirect: { name: 'catalogView' },

    children: [catalogRoute, catalogExtendedRoute, categoryRoute],
};
