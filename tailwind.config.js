module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#34d399",
                    secondary: "#475569",
                    accent: "#ef4444",
                    neutral: "#3d4451",
                    "base-100": "#ffffff",
                },
            },
            "dark",
            "cupcake",
        ],
    },
}