import { createApp } from 'vue';

import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

// Styles
import './assets/tailwind.css';

// Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

import App from './App.vue';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
createApp(App).use(pinia).mount('#app');
