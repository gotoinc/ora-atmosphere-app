import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { SetNewPasswordType } from '@/validations/types/auth';

export const resetPassword = async (body: SetNewPasswordType) => {
    try {
        const res = await axios.put<SetNewPasswordType>(`/reset-password`, {
            ...body,
        });

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
