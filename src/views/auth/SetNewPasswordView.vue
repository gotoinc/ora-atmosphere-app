<template>
    <div class="mx-auto">
        <h1 class="mb-6 text-h2">Choose a new password</h1>

        <form @submit.prevent>
            <div class="mb-6 grid gap-4">
                <v-input
                    v-model="password"
                    name="password"
                    type="password"
                    label="Password"
                    required
                    placeholder="Set your password"
                />

                <v-input
                    v-model="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    required
                    placeholder="Confirm your password"
                />
            </div>

            <v-button class="w-full"> Save </v-button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import VButton from '@/components/banner/VButton.vue';
    import VInput from '@/components/base/input/VInput.vue';

    const password = ref('');
    const confirmPassword = ref('');
</script>

<style scoped></style>
