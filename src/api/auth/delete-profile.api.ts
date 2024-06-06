import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const deleteProfile = async (id: string) => {
    try {
        const res = await axios.delete(`/profile/${id}`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
