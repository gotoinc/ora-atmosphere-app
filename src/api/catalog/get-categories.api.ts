import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const getCategories = async () => {
    try {
        const res = await axios.get(`/categories`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
