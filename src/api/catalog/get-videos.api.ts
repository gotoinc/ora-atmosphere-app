import type { VideoContent } from '@/ts/interfaces/contents';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const getVideos = async (topicId: string) => {
    try {
        const res = await axios.get<VideoContent[]>(
            `/topics/${topicId}/videos`
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
