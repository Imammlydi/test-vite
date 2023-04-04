/** @type {import('tailwindcss').Config} */
// import second from './src/assets/image/ILL1.svg'
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            primary: "#035B71",
            secondary: "#C6C052",
            white: "#FFFFFF",
            textPrimary: "#24AFD2",
            textWhite: "#FFFFFF",
            textNotActive: "#85898A",
        },
        extend: {
            fontFamily: {
                Bitter: ["Bitter", "cursive"],
            },
            backgroundImage: {
                hero: "url('/src/assets/image/Ill1.svg)",
            },
        },
    },
    plugins: [],
};
