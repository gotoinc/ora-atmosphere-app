import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { UserProfile } from '@/ts/profile';

interface UpdateUserInput extends UserProfile {
    role: string;
}

export const updateProfile = async (
    id: string | number,
    body: UpdateUserInput
) => {
    try {
        const res = await axios.put<UserProfile>(`/users/${id}/`, {
            ...body,
        });

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
