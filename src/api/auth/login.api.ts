import type { AxiosResponse } from 'axios';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { SignInInput } from '@/validations/types/auth';

interface LoginSuccessResponse {
    success: boolean;
    message: string;
    token: string;
}

interface LoginInput extends SignInInput {
    remember_me: boolean;
}

export const signIn = async (body: LoginInput) => {
    try {
        const res = await axios.post<
            LoginInput,
            AxiosResponse<LoginSuccessResponse>
        >(`/login`, {
            ...body,
        });

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};