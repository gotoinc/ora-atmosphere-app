<template>
    <div ref="playButton" class="relative">
        <v-button
            variant="white"
            :icon="IconPlay"
            class="!pr-4"
            icon-class="!w-2.5 !h-3 mr-2"
            @click="isActionsOpen = !isActionsOpen"
        >
            <span class="flex items-center">
                Play

                <component :is="IconChevronDown" class="ml-2" />
            </span>
        </v-button>

        <ul
            v-show="isActionsOpen"
            class="actions absolute left-0 z-20 overflow-hidden rounded-lg bg-grey-400"
        >
            <li class="link" @click="isVideoPlayerOpened = true">
                Play on Sphere
            </li>

            <li class="link">
                <router-link :to="{ name: 'simulatorView' }">
                    Play on Simulator
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import IconChevronDown from '@img/icons/chevron-down.svg?component';
    import IconPlay from '@img/icons/play.svg?component';

    import VButton from '@/components/base/VButton.vue';

    import { storeToRefs } from 'pinia';
    import { useCatalogStore } from '@/stores/catalog.store.ts';

    import { useClickOutsideElement } from '@/hooks/useClickOutsideElement.ts';

    const { isVideoPlayerOpened } = storeToRefs(useCatalogStore());
    const isActionsOpen = ref(false);
    const playButton = ref<HTMLButtonElement | null>(null);

    const setClickEvent = (e: Event) => {
        if (playButton.value) {
            useClickOutsideElement(
                e,
                playButton.value,
                () => (isActionsOpen.value = false)
            );
        }
    };

    onMounted(() => {
        document.addEventListener('click', setClickEvent);
    });

    onUnmounted(() => {
        document.removeEventListener('click', setClickEvent);
    });
</script>

<style scoped lang="postcss"></style>
