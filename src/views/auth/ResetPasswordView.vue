<template>
    <div class="mx-auto">
        <!-- If request link has been sent -->
        <template v-if="isRequestSent">
            <div class="mb-6">
                <h1 class="mb-2 text-center text-h2">Link sent!</h1>

                <p class="text-base text-grey-100">
                    A password reset link has been sent to your email address
                </p>
            </div>

            <v-button class="w-full" :to="{ name: 'signInView' }">
                Back to Sign in
            </v-button>
        </template>

        <!-- Reset password form -->
        <template v-else>
            <div class="mb-6">
                <h1 class="mb-2 text-h2">Forgot your password</h1>

                <p class="text-base text-grey-100">
                    Enter the email address associated with your account and
                    we'll send you a link to reset your password.
                </p>
            </div>

            <form class="mb-6" @submit.prevent="onSubmit">
                <v-input
                    v-model="email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    class="mb-6"
                    :error="errors.email"
                />

                <v-button class="w-full" type="submit"> Continue </v-button>
            </form>

            <p>
                Don’t have an account?
                <router-link
                    class="underline hover:text-primary-100"
                    :to="{ name: 'signUpView' }"
                >
                    Sign up
                </router-link>
            </p>
        </template>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useForm } from 'vee-validate';

    import VButton from '@/components/banner/VButton.vue';
    import VInput from '@/components/base/input/VInput.vue';

    import { forgotPasswordSchema } from '@/validations/schemas/auth.schema.ts';
    import type { EmailType } from '@/validations/types/auth';

    const { defineField, handleSubmit, resetForm, errors } = useForm<EmailType>(
        {
            validationSchema: forgotPasswordSchema,
            initialValues: {
                email: '',
            },
        }
    );

    const [email] = defineField('email');

    const isRequestSent = ref(false);

    const onSubmit = handleSubmit(() => {
        isRequestSent.value = true;

        resetForm();
    });
</script>

<style scoped></style>
