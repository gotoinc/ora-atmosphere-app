/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,.module.js}'],
    theme: {
        extend: {
            colors: {
                primary: '#495AFF',
                'primary-light': '#0ACFFE',
                dark: '#141414',
                'dark-grey': '#2B2B2B',

                white: {
                    100: 'rgba(255, 255, 255, 1)',
                    80: 'rgba(255, 255, 255, 0.8)',
                    75: 'rgba(255, 255, 255, 0.75)',
                    50: 'rgba(255, 255, 255, 0.5)',
                    25: 'rgba(255, 255, 255, 0.25)',
                },
            },

            transitionDuration: {
                DEFAULT: '300ms',
            },

            backgroundImage: {
                gradient: 'linear-gradient(180deg, #0ACFFE 0%, #495AFF 100%)',
            },
        },
    },
    plugins: [],
};
