<template>
    <form @submit.prevent="onSubmit">
        <div class="mb-8 grid gap-4">
            <template v-if="isFieldsLoading">
                <v-skeleton
                    v-for="i in 8"
                    :key="i"
                    class="h-11 w-full rounded-[32px] bg-white-15"
                />
            </template>

            <template v-else>
                <v-input
                    v-model="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    variant="white"
                    label="First Name"
                    :error="errors.first_name"
                />

                <v-input
                    v-model="lastName"
                    variant="white"
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter your last name"
                    :error="errors.last_name"
                />

                <v-input
                    v-model="companyName"
                    label="Company Name"
                    placeholder="Enter your company name"
                    name="companyName"
                    variant="white"
                    :error="errors.company_name"
                />

                <v-select
                    v-model="activity"
                    variant="white"
                    name="activity"
                    label="Activity"
                    :options="activitiesList"
                    placeholder="Choose your activity"
                    :error="errors.activity"
                />

                <v-input
                    v-model="jobTitle"
                    variant="white"
                    label="Job Title"
                    optional
                    name="jobTitle"
                    placeholder="Enter your job title"
                    :error="errors.job_title"
                />

                <v-input
                    v-model="companyWebsite"
                    variant="white"
                    optional
                    name="companyWebsite"
                    label="Company Website"
                    placeholder="Enter your company website"
                    :error="errors.company_website"
                />

                <v-input
                    v-model="phone"
                    variant="white"
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    :error="errors.phone_number"
                />

                <v-input
                    v-model="email"
                    variant="white"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    :error="errors.email"
                />
            </template>
        </div>

        <v-button
            v-if="!isFieldsLoading"
            :loading="isLoading"
            class="w-full"
            type="submit"
        >
            Save changes
        </v-button>
    </form>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import VInput from '@/components/base/input/VInput.vue';
    import VButton from '@/components/base/VButton.vue';
    import VSelect from '@/components/base/VSelect.vue';
    import VSkeleton from '@/components/base/VSkeleton.vue';

    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/auth.store.ts';

    import { updateProfile } from '@/api/auth/update-profile.ap.ts';
    import activitiesList from '@/constants/activities-list.ts';
    import { useCompareArrays } from '@/hooks/useCompareObjects.ts';
    import type { UserProfile } from '@/ts/profile';
    import {
        signUpFirstStepSchema,
        signUpSecondStepSchema,
    } from '@/validations/schemas/auth.schema.ts';
    import type { ProfileInfo } from '@/validations/types/auth';

    const toast = useToast();

    const authStore = useAuthStore();
    const { profileData } = storeToRefs(authStore);

    const isLoading = ref(false);
    const isFieldsLoading = ref(true);

    const profileInfoSchema = signUpFirstStepSchema
        .omit(['password1', 'password2', 'agree_with_terms'])
        .concat(signUpSecondStepSchema);

    const { defineField, errors, handleSubmit, setValues } =
        useForm<ProfileInfo>({
            validationSchema: profileInfoSchema,
            initialValues: {
                activity: '',
            },
        });

    const [firstName] = defineField('first_name');
    const [lastName] = defineField('last_name');
    const [companyName] = defineField('company_name');
    const [activity] = defineField('activity');
    const [jobTitle] = defineField('job_title');
    const [companyWebsite] = defineField('company_website');
    const [phone] = defineField('phone_number');
    const [email] = defineField('email');

    const onSubmit = handleSubmit(async (values) => {
        if (profileData.value) {
            const profileValues: UserProfile = {
                company_name: profileData.value.company_name,
                email: profileData.value.email,
                activity: profileData.value.activity,
                first_name: profileData.value.first_name,
                last_name: profileData.value.last_name,
                phone_number: profileData.value.phone_number,
                job_title: profileData.value.job_title,
                company_website: profileData.value.company_website,
            };

            if (
                useCompareArrays(
                    Object.values(profileValues),
                    Object.values(values) as string[]
                )
            ) {
                toast.error('No changes were captured');

                return;
            }
        }

        isLoading.value = true;

        try {
            profileData.value = await updateProfile({
                company_name: companyName.value,
                email: email.value,
                activity: activity.value,
                first_name: firstName.value,
                last_name: lastName.value,
                phone_number: phone.value,
                job_title: jobTitle.value,
                company_website: companyWebsite.value,
            });

            toast.success('Changes were saved');
        } catch (e) {
            toast.error('No changes were saved');
        } finally {
            isLoading.value = false;
        }
    });

    onMounted(async () => {
        if (!profileData.value) {
            await authStore.getProfileData();
        }

        if (profileData.value) {
            setValues(profileData.value);
        }

        isFieldsLoading.value = false;
    });
</script>

<style scoped></style>
