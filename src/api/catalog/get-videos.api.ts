import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Topic } from '@/ts/catalog';

export const getTopicVideos = async (topicId: string) => {
    try {
        const res = await axios.get<Topic>(`/topics/${topicId}/`);

        return res.data.videos;
    } catch (err) {
        useThrowError(err);
    }
};
