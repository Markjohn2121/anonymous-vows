/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                slideIn: {
                    '0%': { transform: 'translateY(-16)', opacity: '1' },
                    '50%': { transform: 'translateY(-24)', opacity: '1' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },


                },
                appear: {
                    '0%': { opacity: '0', transform: 'scale(0) rotate(180deg)' },
                    '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
                },
                clipExpand: {
                    '0%': { clipPath: 'polygon(50% 0%, 100% 0, 0 0)' },
                    '100%': { clipPath: 'polygon(50% 49%, 100% 0, 0 0)' },
                },
            },
            animation: {
                slideIn: 'slideIn 0.5s forwards 1.5s',
                appear: 'appear 0.5s forwards 1.7s',
                clipExpand: 'clipExpand 0.5s forwards 1.6s',
            },
        },
    },
    plugins: [],




}