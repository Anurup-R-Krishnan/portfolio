/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Space Grotesk"', "sans-serif"],
            },
            colors: {
                neo: {
                    yellow: "#FFDE59",
                    pink: "#FF99C8",
                    blue: "#5CE1E6",
                    green: "#7ED957",
                    orange: "#FF914D",
                    black: "#121212",
                    white: "#FFFFFF",
                    amoled: {
                        bg: "#000000",
                        surface: "#080808",
                        surfaceLight: "#0f0f0f",
                        border: "#1a1a1a",
                        text: "#e4e4e7",
                        muted: "#71717a",
                        accent: "#3f3f46",
                    },
                },
            },
            boxShadow: {
                neo: "5px 5px 0px 0px #000000",
                "neo-amoled": "5px 5px 0px 0px #1a1a1a",
                "neo-sm": "3px 3px 0px 0px #000000",
                "neo-sm-amoled": "3px 3px 0px 0px #1a1a1a",
                "neo-lg": "8px 8px 0px 0px #000000",
                "neo-lg-amoled": "8px 8px 0px 0px #1a1a1a",
            },
            animation: {
                marquee: "marquee 25s linear infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
            },
        },
    },
    plugins: [],
};
