import axios from 'axios';

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

axios.defaults.baseURL = 'http://127.0.0.1:8000';

export default axios;
