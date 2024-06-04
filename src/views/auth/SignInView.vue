<template>
    <div class="fade-t mx-auto">
        <h1 class="mb-6 text-h2">Sign In</h1>

        <form class="mb-6" @submit.prevent="onSubmit">
            <div class="grid gap-4">
                <v-input
                    v-model="email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    :error="errors.email"
                />

                <v-input
                    v-model="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Set your password"
                    :error="errors.password"
                />
            </div>

            <div class="my-6 flex flex-wrap items-center justify-between gap-4">
                <v-checkbox v-model="isRememberChecked">
                    Remember me
                </v-checkbox>

                <router-link
                    class="underline hover:text-primary-100"
                    :to="{ name: 'forgotPassword' }"
                >
                    Forgot Password?
                </router-link>
            </div>

            <v-button class="w-full" type="submit" :loading="isLoading">
                Sign In
            </v-button>
        </form>

        <p>
            Don’t have an account?
            <router-link
                class="underline hover:text-primary-100"
                :to="{ name: 'signUpView' }"
            >
                Sign Up
            </router-link>
        </p>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useForm } from 'vee-validate';

    import VInput from '@/components/base/input/VInput.vue';
    import VButton from '@/components/base/VButton.vue';
    import VCheckbox from '@/components/base/VCheckbox.vue';

    import { useAuthStore } from '@/stores/auth.store.ts';

    import { signInSchema } from '@/validations/schemas/auth.schema.ts';
    import type { SignInInput } from '@/validations/types/auth';

    const isRememberChecked = ref(false);
    const isLoading = ref(false);
    const router = useRouter();

    const authStore = useAuthStore();

    const { defineField, handleSubmit, errors } = useForm<SignInInput>({
        validationSchema: signInSchema,
        initialValues: {
            email: '',
            password: '',
        },
    });

    const [email] = defineField('email');
    const [password] = defineField('password');

    const onSubmit = handleSubmit(async () => {
        isLoading.value = true;

        try {
            const body = {
                email: email.value,
                password: password.value,
            };

            await authStore.login(body, isRememberChecked.value);

            void router.push({ name: 'main' });
        } finally {
            isLoading.value = false;
        }
        // setFieldError('email', 'Email already exists');
    });
</script>

<style scoped></style>
