<template>
    <div class="mx-auto">
        <h1 class="mb-6 text-h2">Choose a new password</h1>

        <form @submit.prevent="onSubmit">
            <div class="mb-6 grid gap-4">
                <v-input
                    v-model="password"
                    name="password"
                    type="password"
                    label="Password"
                    required
                    placeholder="Set your password"
                    :error="errors.new_password1"
                    hint="Use 8 or more characters with a mix of letters, numbers & symbols"
                />

                <v-input
                    v-model="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    required
                    placeholder="Confirm your password"
                    :error="errors.new_password2"
                />
            </div>

            <v-button type="submit" class="w-full"> Change Password </v-button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { useForm } from 'vee-validate';

    import VInput from '@/components/base/input/VInput.vue';
    import VButton from '@/components/base/VButton.vue';

    import { setNewPasswordSchema } from '@/validations/schemas/auth.schema.ts';
    import type { SetNewPasswordType } from '@/validations/types/auth';

    const { defineField, handleSubmit, resetForm, errors } =
        useForm<SetNewPasswordType>({
            validationSchema: setNewPasswordSchema,
            initialValues: {
                new_password1: '',
                new_password2: '',
            },
        });

    const [password] = defineField('new_password1');
    const [confirmPassword] = defineField('new_password2');

    const onSubmit = handleSubmit(() => {
        resetForm();
    });
</script>

<style scoped></style>
