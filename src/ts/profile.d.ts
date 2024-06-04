import type { RegisterInput } from '@/validations/types/auth';

export interface UserProfile
    extends Omit<
        RegisterInput,
        'agree_with_terms' | 'password1' | 'password2' | 'recaptcha_token'
    > {}
