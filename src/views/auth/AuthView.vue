<template>
    <main
        class="flex min-h-screen bg-white-100 max-lg:flex-col max-lg:pt-[60px]"
    >
        <div
            class="banner relative w-full w-full p-12 max-lg:!max-w-full max-lg:p-0"
        >
            <div class="cont">
                <main-logo
                    variant="white"
                    class="relative z-10 max-lg:hidden"
                />

                <main-logo variant="dark" class="relative z-10 lg:hidden" />

                <div class="absolute left-0 top-0 h-full w-full max-lg:hidden">
                    <img
                        class="img-cover"
                        :src="backgroundURL"
                        alt="ORA background"
                    />
                </div>
            </div>
        </div>

        <section
            class="flex w-full items-center justify-center py-[52px] max-lg:py-10"
        >
            <div class="cont w-full max-lg:w-full">
                <div
                    class="mx-auto w-full max-w-[472px] text-dark max-lg:max-w-full"
                >
                    <router-view></router-view>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import signInBG from '@img/sign-in-bg.jpg';
    import signUpBG from '@img/sign-up-bg.jpg';

    import MainLogo from '@/components/base/MainLogo.vue';

    const route = useRoute();

    const backgroundURL = computed(() =>
        route.name === 'signUpView' ? signUpBG : signInBG
    );
</script>

<style scoped lang="postcss">
    .banner {
        max-width: 973px;
        min-width: 536px;
    }
</style>
