import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        styled: false,
        themes: [
            {
                light: {
                    primary: "#405060",
                    secondary: "#a0b0c0",
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
