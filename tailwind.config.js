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
                    primary: "#1dd1a1",
                    secondary: "#576574",
                    accent: "#ee5253",
                    neutral: "#3d4451",
                    "base-100": "#ffffff",
                },
            },
            "dark",
            "cupcake",
        ],
    },
}