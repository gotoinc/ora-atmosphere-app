import type { Category } from '@/ts/interfaces/catalog';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const getCategoryGroups = async (categoryId: string) => {
    try {
        const res = await axios.get<Category>(`/categories/${categoryId}/`);

        return res.data.groups;
    } catch (err) {
        useThrowError(err);
    }
};
