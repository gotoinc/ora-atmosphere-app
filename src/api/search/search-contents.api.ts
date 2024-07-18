import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { VideoContent } from '@/ts/contents';

export interface SearchBody {
    query: string;
    category_ids: number[];
    group_ids: number[];
    topic_ids: number[];
    language_ids: number[];
    tags: string[];
}

export const searchContents = async (body: Partial<SearchBody>) => {
    try {
        const res = await axios.post<
            Partial<SearchBody>,
            AxiosResponse<VideoContent[]>
        >(`/search/`, body);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
