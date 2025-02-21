/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            textIndent: {
                '4': '1rem',
            },

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
                appearEnvelope: {
                    '0%': { opacity: '0', transform: 'scale(0)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                clipExpand: {
                    '0%': { clipPath: 'polygon(50% 0%, 100% 0, 0 0)' },
                    '100%': { clipPath: 'polygon(50% 49%, 100% 0, 0 0)' },
                },
                appearToolTip: {
                    '0%': { opacity: '0', transform: 'scale(0)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
            animation: {
                slideIn: 'slideIn 0.5s forwards 1.5s',
                appear: 'appear 0.5s forwards 1.7s',
                appearEnvelope: 'appearEnvelope 0.3s forwards 0.3s',
                clipExpand: 'clipExpand 0.8s forwards 1.6s',
                appearToolTipF: 'appearToolTip 0.3s forwards .2s',
                appearToolTipB: 'appearToolTip 0.9s backward .6s',
            },

        },
    },
    plugins: [

    ],




}