export default {
    path: '/profile',
    name: 'profileView',
    component: () => import('@/views/profile/ProfileView.vue'),

    meta: {
        title: 'My Profile',
        requiresAuth: true,
    },

    redirect: { name: 'profileInfoView' },

    children: [
        {
            path: 'info',
            name: 'profileInfoView',
            component: () => import('@/views/profile/ProfileInfoView.vue'),
        },
        {
            path: 'change-password',
            name: 'profileChangePasswordView',
            component: () =>
                import('@/views/profile/ProfileChangePasswordView.vue'),
        },
    ],
};
