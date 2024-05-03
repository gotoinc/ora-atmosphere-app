// Vuetify
import { createVuetify } from 'vuetify';
import { ClickOutside } from 'vuetify/directives';

export const vuetifyLib = createVuetify({
    theme: false,
    directives: {
        ClickOutside,
    },
});
