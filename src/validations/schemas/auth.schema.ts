import type { ObjectSchema } from 'yup';
import { bool, object, ref, string } from 'yup';

import {
    emailValidation,
    passwordValidation,
    phoneValidation,
} from '@/validations';
import type {
    EmailType,
    SetNewPasswordType,
    SignInInput,
    SignUpFirstStep,
    SignUpSecondStep,
} from '@/validations/types/auth';

/**
 * Define schemas for Sign up form
 */
export const signUpFirstStepSchema: ObjectSchema<SignUpFirstStep> = object({
    first_name: string().required('Please enter first name'),
    last_name: string().required('Please enter last name'),
    email: emailValidation,
    password1: passwordValidation,
    password2: string()
        .required('Please confirm password')
        .oneOf([ref('password1'), ''], 'Passwords must match'),
    agree_with_terms: bool()
        .oneOf([true], 'Please accept')
        .required('Please accept'),
});

export const signUpSecondStepSchema: ObjectSchema<SignUpSecondStep> = object({
    company_name: string().required('Please enter company name'),
    activity: string().required('Please choose activity'),
    job_title: string(),
    company_website: string().url('Please enter a valid URL'),
    phone_number: phoneValidation,
});

/**
 * Define schema for Sign in form
 */
export const signInSchema: ObjectSchema<SignInInput> = object({
    email: emailValidation,
    password: passwordValidation,
});

/**
 * Define schema for forgot password
 */
export const forgotPasswordSchema: ObjectSchema<EmailType> = object({
    email: emailValidation,
});

/**
 * Define schema for choose new password
 */
export const setNewPasswordSchema: ObjectSchema<SetNewPasswordType> = object({
    new_password1: passwordValidation,
    new_password2: string()
        .required('Please confirm password')
        .oneOf([ref('new_password1'), ''], 'Passwords must match'),
});
