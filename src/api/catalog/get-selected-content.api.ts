import type { VideoContent } from '@/ts/interfaces/contents';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const getDefaultContent = async () => {
    try {
        const res = await axios.get<VideoContent>(`/default-video/`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
