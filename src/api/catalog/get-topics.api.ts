import type { Topic } from '@/ts/interfaces/catalog';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const getTopics = async () => {
    try {
        const res = await axios.get<Topic[]>(`/topics`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
