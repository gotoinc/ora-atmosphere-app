import type { Catalog } from '@/ts/interfaces/catalog';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const getCatalog = async () => {
    try {
        const res = await axios.get<Catalog[]>(`/catalog`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
