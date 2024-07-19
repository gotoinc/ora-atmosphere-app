export interface RegisterInput {
    email: string;
    password1: string;
    password2: string;
    first_name: string;
    last_name: string;
    agree_with_terms: boolean;
    company_name: string;
    activity: string;
    job_title?: string | null;
    company_website?: string | null;
    phone_number?: string | null;
}

export interface SignUpFirstStep
    extends Pick<
        RegisterInput,
        | 'first_name'
        | 'last_name'
        | 'email'
        | 'password1'
        | 'password2'
        | 'agree_with_terms'
    > {}

export interface SignUpSecondStep
    extends Pick<
        RegisterInput,
        | 'company_name'
        | 'activity'
        | 'job_title'
        | 'company_website'
        | 'phone_number'
    > {}

export interface SignInInput extends Pick<SignUpFirstStep, 'email'> {
    password: string;
}

export interface SetNewPasswordType {
    new_password1: string;
    new_password2: string;
}

export interface EmailType extends Pick<SignInInput, 'email'> {}

export interface ProfileInfo
    extends Omit<
            SignUpFirstStep,
            'password1' | 'password2' | 'agree_with_terms'
        >,
        SignUpSecondStep {}
