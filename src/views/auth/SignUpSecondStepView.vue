<template>
    <form class="mb-6" @submit.prevent="onSubmit">
        <div class="mb-6 grid gap-4">
            <v-input
                v-model="companyName"
                label="Company Name"
                placeholder="Enter your company name"
                name="companyName"
                required
                :error="secondStepErrors.companyName"
            />

            <v-select
                v-model="activity"
                required
                name="activity"
                label="Activity"
                :options="activitiesList"
                placeholder="Choose your activity"
                :error="secondStepErrors.activity"
            />

            <v-input
                v-model="jobTitle"
                label="Job Title"
                name="jobTitle"
                placeholder="Enter your job title"
                :error="secondStepErrors.jobTitle"
            />

            <v-input
                v-model="companyWebsite"
                name="companyWebsite"
                label="Company Website"
                placeholder="Enter your company website"
                :error="secondStepErrors.companyWebsite"
            />

            <v-input
                v-model="phone"
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
                :error="secondStepErrors.phone"
            />
        </div>

        <div class="flex gap-4 max-mob:flex-col">
            <v-button
                :to="{ name: 'signUpFirstStep' }"
                variant="outline"
                class="w-full"
            >
                Back
            </v-button>

            <v-button :loading="isLoading" type="submit" class="w-full">
                Sign Up
            </v-button>
        </div>
    </form>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';

    import VButton from '@/components/banner/VButton.vue';
    import VInput from '@/components/base/input/VInput.vue';
    import VSelect from '@/components/base/VSelect.vue';

    import { storeToRefs } from 'pinia';
    import { useSignUpStore } from '@/stores/sign-up.store.ts';

    import { signUp } from '@/api/auth/register.api.ts';
    import activitiesList from '@/constants/activities-list.ts';

    const signUpStore = useSignUpStore();

    const router = useRouter();
    const toast = useToast();

    const isLoading = ref(false);

    const {
        companyName,
        jobTitle,
        activity,
        companyWebsite,
        phone,
        secondStepErrors,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        isTermsAgreed,
    } = storeToRefs(signUpStore);

    const onSubmit = signUpStore.submitSecondStep(async () => {
        isLoading.value = true;

        try {
            await signUp({
                first_name: firstName.value,
                last_name: lastName.value,
                email: email.value,
                password: password.value,
                confirm_password: confirmPassword.value,
                activity: activity.value,
                company_name: companyName.value,
                agree_with_terms: isTermsAgreed.value,
                company_website: companyWebsite.value,
                job_title: jobTitle.value,
                phone_number: phone.value,
            });

            toast.success('Your account has been created');

            void router.push({ name: 'signInView' });

            signUpStore.resetFirstStep();
            signUpStore.resetSecondStep();
        } catch (e) {
            toast.error('Register error');
        } finally {
            isLoading.value = false;
        }
    });
</script>

<style scoped lang="postcss"></style>
