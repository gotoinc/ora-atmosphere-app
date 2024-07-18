import type { AxiosError } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useAuthStore } from '@/stores/auth.store.ts';

axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response && error.response.status === 403) {
            const authStore = useAuthStore();

            authStore.clearAuth();
        }

        return Promise.reject(error);
    }
);

axios.interceptors.request.use(function (config) {
    const token = Cookies.get('ora_auth');

    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }

    return config;
});

axios.defaults.baseURL =
    'http://atmosphere-api.eba-menjd7cv.eu-west-3.elasticbeanstalk.com';

export default axios;
