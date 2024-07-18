import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { UserProfile } from '@/ts/profile';

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
