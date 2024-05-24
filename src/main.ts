import { createApp } from 'vue';
import type { PluginOptions } from 'vue-toastification';
import { POSITION } from 'vue-toastification';
import Toast from 'vue-toastification';

import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

// Styles
import './assets/tailwind.css';
import 'vue-toastification/dist/index.css';
import './assets/postcss/base.pcss';
// Router
import router from '@/router';

// Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

// Toast options
const toastOptions: PluginOptions = {
    position: POSITION.BOTTOM_RIGHT,
    pauseOnHover: false,
};

import App from './App.vue';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
createApp(App).use(router).use(pinia).use(Toast, toastOptions).mount('#app');
