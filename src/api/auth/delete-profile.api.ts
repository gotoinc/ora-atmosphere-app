import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const deleteProfile = async (id: string | number) => {
    try {
        const res = await axios.delete(`/users/${id}/`);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
