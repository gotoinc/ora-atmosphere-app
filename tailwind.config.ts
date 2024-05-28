/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,.module.js}'],
    theme: {
        extend: {
            colors: {
                dark: '#141414',

                error: '#F83838',

                grey: {
                    100: '#80808C',
                    200: '#3E3F47',
                    300: '#2B2B2B',
                    400: '#29292D',
                },

                primary: {
                    50: '#0ACFFE',
                    100: '#495AFF',
                    200: '#0839FB',
                },

                white: {
                    100: 'rgba(255, 255, 255, 1)',
                    80: 'rgba(255, 255, 255, 0.8)',
                    75: 'rgba(255, 255, 255, 0.75)',
                    50: 'rgba(255, 255, 255, 0.5)',
                    25: 'rgba(255, 255, 255, 0.25)',
                    15: 'rgba(255, 255, 255, 0.15)',
                },
            },

            fontSize: {
                h1: [
                    '3.5rem',
                    {
                        fontWeight: '700',
                    },
                ],
                h2: [
                    '2.5rem',
                    {
                        fontWeight: '700',
                        lineHeight: '135%',
                    },
                ],
                h3: [
                    '2rem',
                    {
                        fontWeight: '700',
                    },
                ],
                h4: [
                    '1.5rem',
                    {
                        fontWeight: '700',
                    },
                ],
                h5: ['1.25rem'],
                small: '0.813rem',
            },

            transitionDuration: {
                DEFAULT: '300ms',
            },

            backgroundImage: {
                gradient: 'linear-gradient(180deg, #0ACFFE 0%, #495AFF 100%)',
                'gradient-search':
                    'linear-gradient(180deg, #0ACFFE 0%, #495AFF 7.5%)',
            },

            screens: {
                xs: '375px',
                mob: '415px',
                'mob-md': '480px',
                'mob-lg': '551px',
                tab: '901px',
                lg: '1025px',
                '2lg': '1200px',
                desktop: '1440px',
            },

            height: {
                vh: 'calc(var(--vh, 1vh) * 100)',
            },
        },
    },
    plugins: [],
};
