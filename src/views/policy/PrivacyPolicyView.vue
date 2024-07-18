<template>
    <v-header />

    <main class="flex-grow bg-dark py-14 text-white-100">
        <div class="cont mx-auto">
            <h1 class="mb-5 text-h1 max-mob-lg:text-h2">Privacy Policy</h1>

            <ol>
                <li>
                    Introduction [Your Company Name] ("Company") respects your
                    privacy and is committed to protecting your personal data.
                    This privacy policy explains how we collect, use, disclose,
                    and safeguard your information when you visit our website.
                </li>

                <li>
                    Information We Collect We may collect personal data from you
                    in various ways, including:

                    <ul>
                        <li>
                            Information you provide directly to us, such as when
                            you create an account or fill out a contact form.
                        </li>

                        <li>
                            Information collected automatically when you use our
                            website, such as IP addresses and browsing behavior.
                        </li>
                    </ul>
                </li>

                <li>
                    Use of Your Information We may use the information we
                    collect from you to:

                    <ul>
                        <li>Provide and manage your account.</li>

                        <li>Improve our website and services.</li>

                        <li>
                            Communicate with you about updates and promotions.
                        </li>

                        <li>Comply with legal obligations.</li>
                    </ul>
                </li>

                <li>
                    Sharing Your Information We do not sell, trade, or otherwise
                    transfer your personal data to outside parties, except as
                    described in this policy or when we have your consent. We
                    may share your information with:

                    <ul>
                        <li>
                            Service providers who assist us in operating our
                            website and conducting our business.
                        </li>

                        <li>
                            Law enforcement or regulatory agencies if required
                            by law.
                        </li>
                    </ul>
                </li>

                <li>
                    Data Security We implement appropriate technical and
                    organizational measures to protect your personal data from
                    unauthorized access, use, or disclosure.
                </li>

                <li>
                    Your Rights You have the right to:

                    <ul>
                        <li>Access the personal data we hold about you.</li>

                        <li>Request correction of any inaccurate data.</li>

                        <li>Request deletion of your personal data.</li>

                        <li>Object to the processing of your personal data.</li>
                    </ul>
                </li>

                <li>
                    Changes to This Policy We may update this privacy policy
                    from time to time. We will notify you of any significant
                    changes by posting the new policy on our website.
                </li>

                <li>
                    Contact Us If you have any questions about this privacy
                    policy, please contact us at
                    <a
                        class="font-semibold underline hover:text-primary-100"
                        href="mailto:contact@agtmosphere.space"
                    >
                        contact@agtmosphere.space
                    </a>
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

    ol {
        @apply list-decimal space-y-5 pl-5;
    }

    ul {
        @apply mt-5 list-disc space-y-4 pl-5;
    }
</style>
