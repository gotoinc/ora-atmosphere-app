import type { Group } from '@/ts/interfaces/catalog';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const getGroups = async (categoryId: string) => {
    try {
        const res = await axios.get<Group[]>(
            `/categories/${categoryId}/groups`
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
