import type { AxiosResponse } from 'axios';

import type { DetailResponse } from '@/ts/interfaces/common';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { SetNewPasswordType } from '@/validations/types/auth';

export const resetPassword = async (body: SetNewPasswordType) => {
    try {
        const res = await axios.post<
            SetNewPasswordType,
            AxiosResponse<DetailResponse>
        >(`/auth/password/change/`, {
            ...body,
        });

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
