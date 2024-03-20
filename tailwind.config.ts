import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                messagerec: "fadeInRight 300ms ease-out",
                messagesend: "fadeInBottom 200ms ease-in forwards",
            },
            keyframes: {
                fadeInRight: {
                    "0%": {
                        opacity: "0",
                        transform: "translateX(2rem)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateX(0)",
                    },
                },
                fadeInBottom: {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(2rem)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        styled: false,
        themes: [
            {
                light: {
                    primary: "#405060",
                    secondary: "#c0d0e0",
                    accent: "#222222",
                    neutral: "#f5f5f5",
                    "base-100": "#ffffff",
                    "base-200": "#ffffff",
                    "base-300": "#e0e0e0",
                },
                business: {
                    ...require("daisyui/src/theming/themes")["business"],
                    secondary: "#405060",
                    accent: "#23c19d",
                },
            },
        ],
        // base:false
    },
};
export default config;
