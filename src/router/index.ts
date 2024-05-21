import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores/auth.store.ts';

import authRoute from '@/router/routes/auth.route.ts';
import baseRoute from '@/router/routes/base.route.ts';
import profileRoute from '@/router/routes/profile.route.ts';
import simulatorRoute from '@/router/routes/simulator.route.ts';

export const routes = [baseRoute, authRoute, profileRoute, simulatorRoute];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation guard
router.beforeEach((to, _from, next) => {
    const { isAuthenticated } = useAuthStore();

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'auth' }); // Redirect to authorization pages if the user is not logged in
    } else if (to.matched[0].name === 'auth' && isAuthenticated) {
        next({ name: 'main' }); // Redirect to the home page if the user is logged in and tries to access authorization pages
    } else {
        next(); // Continue navigating
    }
});

export default router;
