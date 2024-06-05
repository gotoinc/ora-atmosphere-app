export interface SignUpFirstStep {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    isTermsAgreed: boolean;
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
