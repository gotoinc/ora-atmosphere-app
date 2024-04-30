/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,.module.js}'],
    theme: {
        extend: {
            colors: {
                primary: '#495AFF',
                'primary-light': '#0ACFFE',
                dark: '#141414',
            },

            backgroundImage: {
                gradient: 'linear-gradient(180deg, #0ACFFE 0%, #495AFF 100%)',
            },
        },
    },
    plugins: [],
};
