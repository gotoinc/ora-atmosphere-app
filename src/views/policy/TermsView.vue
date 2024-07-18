<template>
    <v-header />

    <main class="flex-grow bg-dark py-14 text-white-100">
        <div class="cont mx-auto">
            <h1 class="mb-5 text-h1 max-mob-lg:text-h2">Terms of Use</h1>

            <ol class="list-decimal space-y-5 pl-5">
                <li>
                    Acceptance of Terms Welcome to Atmosphère. By accessing and
                    using our website, you agree to comply with and be bound by
                    the following terms and conditions ("Terms of Use"). If you
                    do not agree with these terms, please do not use our
                    website.
                </li>

                <li>
                    Use of the Website You agree to use the website in
                    accordance with all applicable laws and regulations. You may
                    not use the website for any unlawful purpose or in a manner
                    that could damage, disable, or impair the website.
                </li>

                <li>
                    Intellectual Property All content on this website, including
                    text, graphics, logos, icons, and images, is the property of
                    the Company or its content suppliers and is protected by
                    intellectual property laws. Unauthorized use of any
                    materials on this site is prohibited.
                </li>

                <li>
                    User Accounts If you create an account on our website, you
                    are responsible for maintaining the confidentiality of your
                    account information and for all activities that occur under
                    your account. You agree to notify us immediately of any
                    unauthorized use of your account.
                </li>

                <li>
                    Limitation of Liability The Company will not be liable for
                    any direct, indirect, incidental, special, or consequential
                    damages arising out of or in connection with your use of the
                    website.
                </li>

                <li>
                    Changes to the Terms We reserve the right to modify these
                    Terms of Use at any time. Your continued use of the website
                    following any changes indicates your acceptance of the new
                    terms.
                </li>

                <li>
                    Governing Law These Terms of Use are governed by and
                    construed in accordance with the laws of France, and you
                    hereby consent to the exclusive jurisdiction of the courts
                    in France, Paris.
                </li>
            </ol>
        </div>
    </main>
</template>

<script setup lang="ts">
    import VHeader from '@/components/layout/VHeader.vue';
</script>

<style scoped lang="postcss">
    li {
        @apply text-lg;
    }
</style>
