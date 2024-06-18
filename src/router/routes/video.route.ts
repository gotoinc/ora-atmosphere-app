export default {
    path: '/video',
    name: 'videoPlayerView',
    component: () => import('@/views/VideoPlayerView.vue'),

    meta: {
        title: 'Video Player',
    },
};
