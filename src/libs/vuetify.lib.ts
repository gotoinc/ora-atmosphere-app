// Vuetify
import { createVuetify } from 'vuetify';
import { ClickOutside, Ripple } from 'vuetify/directives';

import 'vuetify/lib/directives/ripple/VRipple.css';

export const vuetifyLib = createVuetify({
    directives: {
        Ripple,
        ClickOutside,
    },
});
