import { useForm } from 'vee-validate';

import { defineStore } from 'pinia';

import {
    signUpFirstStepSchema,
    signUpSecondStepSchema,
} from '@/validations/schemas/auth.schema.ts';
import type {
    SignUpFirstStep,
    SignUpSecondStep,
} from '@/validations/types/auth';

export const useSignUpStore = defineStore('sign-up', () => {
    /**
     * Handle validation for first steps
     */
    const {
        handleSubmit: submitFirstStep,
        errors: firstStepErrors,
        defineField: defineFirstSteps,
        resetForm: resetFirstStep,
        values: firstStepValues,
        setFieldError: setFirstStepErrors,
    } = useForm<SignUpFirstStep>({
        validationSchema: signUpFirstStepSchema,
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password1: '',
            password2: '',
            agree_with_terms: false,
        },
    });

    const [firstName] = defineFirstSteps('first_name');
    const [lastName] = defineFirstSteps('last_name');
    const [email] = defineFirstSteps('email');
    const [password] = defineFirstSteps('password1');
    const [confirmPassword] = defineFirstSteps('password2');
    const [isTermsAgreed] = defineFirstSteps('agree_with_terms');

    // Check if object valid
    const validateObject = (obj: { [key: string]: string | boolean }) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                if (!value) {
                    return false;
                }
            }
        }
        return true;
    };

    /**
     * Handle validation for second steps
     */
    const {
        handleSubmit: submitSecondStep,
        errors: secondStepErrors,
        defineField: defineSecondSteps,
        resetForm: resetSecondStep,
    } = useForm<SignUpSecondStep>({
        validationSchema: signUpSecondStepSchema,
        initialValues: {
            company_name: '',
            activity: '',
        },
    });

    const [companyName] = defineSecondSteps('company_name');
    const [activity] = defineSecondSteps('activity');
    const [jobTitle] = defineSecondSteps('job_title');
    const [companyWebsite] = defineSecondSteps('company_website');
    const [phone] = defineSecondSteps('phone_number');

    return {
        firstStepValues,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        isTermsAgreed,

        validateObject,

        submitFirstStep,
        firstStepErrors,
        resetSecondStep,
        resetFirstStep,
        setFirstStepErrors,

        companyName,
        jobTitle,
        activity,
        companyWebsite,
        phone,

        submitSecondStep,
        secondStepErrors,
    };
});
