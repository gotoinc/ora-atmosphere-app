import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

interface RegisterInput {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    agree_with_terms: boolean;
    recaptcha_token?: string;
    company_name: string;
    activity: string;
    job_title?: string;
    company_website?: string;
    phone_number?: string;
}

export const signUp = async (body: RegisterInput) => {
    try {
        const res = await axios.post<RegisterInput>(`/register`, {
            ...body,
        });

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
