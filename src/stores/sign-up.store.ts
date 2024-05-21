import { ref } from 'vue';

import { defineStore } from 'pinia';

export const useSignUpStore = defineStore('sign-up', () => {
    // First step
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const isTermsChecked = ref(false);

    // Second step
    const companyName = ref('');
    const jobTitle = ref('');
    const activity = ref('');
    const companyWebsite = ref('');
    const phone = ref('');

    return {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        isTermsChecked,

        companyName,
        jobTitle,
        activity,
        companyWebsite,
        phone,
    };
});
