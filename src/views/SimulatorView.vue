<template>
    <div id="simulatorRoot" ref="simulatorElement" class="h-screen"></div>

    <div id="content-bar"></div>

    <div id="settings">
        <div id="settings-title">
            <div id="settings-title-text"></div>

            <img
                id="settings-button"
                src="@simulator/demo/public/images/settings.svg"
                alt="settings"
            />
        </div>

        <div id="settings-content" class="hidden">
            <div id="sphere-size">
                <div id="sphere-button-60" class="sphere-size-button">60</div>

                <div id="sphere-button-80" class="sphere-size-button">80</div>

                <div id="sphere-button-100" class="sphere-size-button">100</div>
            </div>

            <div id="settings-people-visible" style="display: none">
                <img
                    id="show-people-button"
                    src="@simulator/demo/public/images/people.svg"
                    alt="show-people"
                />
                Show People
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { init } from '@simulator/demo/src';

    const simulatorElement = ref<HTMLDivElement | null>(null);

    onMounted(() => {
        if (simulatorElement.value) {
            void init().then(() => {
                console.log('Initialized');
            });
        }

        const settings = document.getElementById('settings');
        const settingsContent = document.getElementById('settings-content');
        const settingsButton = document.getElementById('settings-button');
        const settingsTitleText = document.getElementById(
            'settings-title-text'
        );

        if (
            settingsButton &&
            settings &&
            settingsContent &&
            settingsTitleText
        ) {
            settingsButton.onclick = function () {
                settings.className =
                    settings.className === 'settings-open'
                        ? ''
                        : 'settings-open';
                settingsContent.className =
                    settingsContent.className === 'hidden' ? '' : 'hidden';
                settingsButton.src =
                    settingsContent.className === 'hidden'
                        ? 'demo/public/images/settings.svg'
                        : 'demo/public/images/close.svg';
                settingsTitleText.innerHTML =
                    settingsContent.className === 'hidden' ? '' : 'Settings';
            };
        }
    });
</script>

<style>
    @import '@simulator/demo/public/overlay.css';
</style>
