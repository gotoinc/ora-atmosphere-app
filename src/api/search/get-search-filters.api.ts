import type { SearchFilters } from '@/ts/interfaces/search';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const getSearchFilters = async () => {
    try {
        const res = await axios.post<SearchFilters>(`/search/`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
