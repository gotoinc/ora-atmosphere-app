import catalogRoute from '@/router/routes/catalog.route.ts';
import simulatorRoute from '@/router/routes/simulator.route.ts';

export default {
    path: '/',
    name: 'main',
    component: () => import('@/views/MainView.vue'),

    redirect: { name: 'catalogView' },

    children: [catalogRoute, simulatorRoute],
};
