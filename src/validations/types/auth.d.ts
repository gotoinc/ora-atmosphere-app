export interface SignUpFirstStep {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    isTermsAgreed: boolean;
}

export interface RegisterInput {
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

export interface SignUpSecondStep {
    companyName: string;
    activity: string;
    jobTitle?: string;
    companyWebsite?: string;
    phone?: string;
}

export interface SignInInput
    extends Pick<SignUpFirstStep, 'email' | 'password'> {}

export interface SetNewPasswordType
    extends Pick<SignUpFirstStep, 'confirmPassword' | 'password'> {}

export interface EmailType extends Pick<SignInInput, 'email'> {}

export interface ProfileInfo
    extends Omit<
            SignUpFirstStep,
            'password' | 'confirmPassword' | 'isTermsAgreed'
        >,
        SignUpSecondStep {}
