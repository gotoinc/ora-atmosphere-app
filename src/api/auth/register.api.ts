import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { RegisterInput } from '@/validations/types/auth';

export const signUp = async (body: RegisterInput) => {
    try {
        const res = await axios.post<RegisterInput>(`/profile`, {
            ...body,
        });

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};