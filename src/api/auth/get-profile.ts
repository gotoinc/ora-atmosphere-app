import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { ProfileData } from '@/ts/profile';

export const getProfile = async () => {
    try {
        const res = await axios.get<ProfileData>(`/auth/user/`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
