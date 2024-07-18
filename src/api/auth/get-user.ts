import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { UserProfile } from '@/ts/profile';

export const getUser = async (id: string | number) => {
    try {
        const res = await axios.get<UserProfile>(`/users/${id}`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
