import type { UserProfile } from '@/ts/interfaces/profile';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const getProfile = async () => {
    try {
        const res = await axios.get<UserProfile>(`/auth/user/`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
