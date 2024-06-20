import type { AxiosResponse } from 'axios';

import type { DetailResponse } from '@/ts/interfaces/common';

import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const authLogout = async () => {
    try {
        const res = await axios.post<unknown, AxiosResponse<DetailResponse>>(
            `/auth/logout/`
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
