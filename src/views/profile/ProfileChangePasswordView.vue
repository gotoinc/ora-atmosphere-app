<template>
    <form @submit.prevent="onSubmit">
        <div class="mb-8 grid gap-4">
            <v-input
                v-model="password"
                name="password"
                type="password"
                label="Password"
                variant="white"
                placeholder="Set your password"
                :error="errors.password"
                hint="Use 8 or more characters with a mix of letters, numbers & symbols"
            />

            <v-input
                v-model="confirmPassword"
                name="confirmPassword"
                variant="white"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                :error="errors.confirmPassword"
                hint="Use 8 or more characters with a mix of letters, numbers & symbols"
            />
        </div>

        <v-button class="w-full" type="submit"> Save changes </v-button>
    </form>
</template>

<script setup lang="ts">
    import { useForm } from 'vee-validate';

    import VButton from '@/components/banner/VButton.vue';
    import VInput from '@/components/base/input/VInput.vue';

    import { setNewPasswordSchema } from '@/validations/schemas/auth.schema.ts';
    import type { SetNewPasswordType } from '@/validations/types/auth';

    const { defineField, handleSubmit, resetForm, errors } =
        useForm<SetNewPasswordType>({
            validationSchema: setNewPasswordSchema,
            initialValues: {
                password: '',
                confirmPassword: '',
            },
        });

    const [password] = defineField('password');
    const [confirmPassword] = defineField('confirmPassword');

    const onSubmit = handleSubmit(() => {
        resetForm();
    });
</script>

<style scoped></style>
