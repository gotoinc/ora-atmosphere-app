<template>
    <section class="banner relative flex items-end">
        <div class="cont">
            <div class="banner__img absolute left-0 top-0 h-full w-full">
                <img src="@img/banner.jpg" alt="Banner" class="img-cover" />
            </div>

            <div class="banner__heading">
                <div class="mb-2 flex items-center gap-3">
                    <div class="banner__label">
                        <img
                            src="@img/ora-label.svg"
                            class="img-contain"
                            alt="ORA label"
                        />
                    </div>

                    <h3 class="font-light uppercase">Brands</h3>
                </div>

                <h1 class="mb-8 text-9xl font-extrabold">Cisco</h1>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="postcss">
    .banner {
        min-height: 810px;
        height: 80vh;
        padding-bottom: 174px;

        &__img {
            z-index: -1;

            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(73, 90, 255, 0.35);
            }
        }

        &__label {
            width: 30px;
            height: 28px;
        }
    }
</style>
