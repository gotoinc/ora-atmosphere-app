<template>
    <section>
        <div class="cont">
            <h1>
                {{ route.params.category }}
            </h1>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router';

    const route = useRoute();
</script>

<style scoped></style>
