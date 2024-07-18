import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { UserProfile } from '@/ts/profile';

export const getProfile = async () => {
    try {
        const res = await axios.get<UserProfile>(`/auth/user/`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
