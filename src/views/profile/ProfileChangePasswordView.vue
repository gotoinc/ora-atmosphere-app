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
                :error="errors.new_password1"
                hint="Use 8 or more characters with a mix of letters, numbers & symbols"
            />

            <v-input
                v-model="confirmPassword"
                name="confirmPassword"
                variant="white"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                :error="errors.new_password2"
                hint="Use 8 or more characters with a mix of letters, numbers & symbols"
            />
        </div>

        <v-button :loading="isLoading" class="w-full" type="submit">
            Save changes
        </v-button>
    </form>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';
    import { useForm } from 'vee-validate';

    import VInput from '@/components/base/input/VInput.vue';
    import VButton from '@/components/base/VButton.vue';

    import { resetPassword } from '@/api/auth/reset-password.api.ts';
    import { setNewPasswordSchema } from '@/validations/schemas/auth.schema.ts';
    import type { SetNewPasswordType } from '@/validations/types/auth';

    const toast = useToast();

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

    const isLoading = ref(false);

    const onSubmit = handleSubmit(async () => {
        isLoading.value = true;

        try {
            const res = await resetPassword({
                new_password1: password.value,
                new_password2: confirmPassword.value,
            });

            if (res) {
                toast.success(res.detail);
            }
        } catch (e) {
            toast.error('Password was not changed');
        } finally {
            isLoading.value = false;
            resetForm();
        }
    });
</script>

<style scoped></style>
