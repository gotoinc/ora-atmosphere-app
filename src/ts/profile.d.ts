import type { RegisterInput } from '@/validations/types/auth';

export interface UserProfile
    extends Omit<
        RegisterInput,
        'agree_with_terms' | 'password1' | 'password2' | 'recaptcha_token'
    > {}

export interface ProfileData
    extends Pick<UserProfile, 'email' | 'last_name' | 'first_name'> {
    pk: number;
}
