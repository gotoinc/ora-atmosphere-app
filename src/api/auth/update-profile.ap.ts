import type { UserProfile } from '@/ts/interfaces/profile';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const updateProfile = async (body: UserProfile) => {
    try {
        const res = await axios.put<UserProfile>(`/profile`, {
            ...body,
        });

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
