/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: '#0a0a0a',
                accent: '#ffffff',
                muted: '#a1a1aa',
                'neon-blue': '#4deeea',
                'neon-purple': '#bc13fe',
                'deep-black': '#050505',
                'tech-line': '#2a2a2a',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Bricolage Grotesque', 'sans-serif'],
            },
            animation: {
                'marquee': 'marquee 0.5s linear infinite',
                'marquee-reverse': 'marquee-reverse 0.5s linear infinite',
                'marquee-vertical': 'marquee-vertical 0.5s linear infinite',
                'spin-slow': 'spin 12s linear infinite',
                'scrolling-text': 'scroll 20s linear infinite',
                'glitch': 'glitch 1s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'marquee-reverse': {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'marquee-vertical': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-50%)' },
                },
                reveal: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                glitch: {
                    '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
                    '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
                    '62%': { transform: 'translate(0,0) skew(5deg)' },
                }
            }
        },
    },
    plugins: [],
}
