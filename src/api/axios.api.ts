import axios from 'axios';

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

axios.defaults.baseURL = 'http://localhost:3000/api';

export default axios;
