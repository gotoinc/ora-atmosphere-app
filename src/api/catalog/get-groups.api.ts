import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Category } from '@/ts/catalog';

export const getCategoryGroups = async (categoryId: string) => {
    try {
        const res = await axios.get<Category>(`/categories/${categoryId}/`);

        return res.data.groups;
    } catch (err) {
        useThrowError(err);
    }
};
