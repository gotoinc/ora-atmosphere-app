import type { VideoContent } from '@/ts/interfaces/contents';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const getVideos = async () => {
    try {
        const res = await axios.get<VideoContent[]>(`/videos`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
