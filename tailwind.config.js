// TODO: Remove tailwind to be replaced by Material UI

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        fontFamily: {
            sans: ["Ubuntu", "sans-serif"],
        },
        extend: {
            fontSize: {
                base: "0.75rem",
            },
            colors: {
                primary: {
                    default: "#003f52", 
                    50: "#c9fffc",
                    100: "#99fffd",
                    200: "#54fffe",
                    300: "#07f4ff",
                    400: "#00d5ef",
                    500: "#00a9c9",
                    600: "#0086a1",
                    700: "#111922",
                    800: "#086b82",
                    900: "#003f52",
                },
                secondary: {
                    default: '#32c5a3',
                    50: "#f1fcf9",
                    100: "#cef9eb",
                    200: "#9ef1d8",
                    300: "#65e3c2",
                    400: "#32c5a3",
                    500: "#1cb090",
                    600: "#148d76",
                    700: "#147160",
                    800: "#155a4f",
                    900: "#164b41",
                },
                white: "#FFFFFF",
                "white-dark": "#F5F9FF",
                black: "#18232F",
                gray: {
                    50: "#EEF2F6",
                    100: "#DDE5EE",
                    200: "#BBCBDD",
                    300: "#9AB2CB",
                    400: "#7898BA",
                    500: "#456587",
                    600: "#344C65",
                    700: "#18232F",
                    800: "#111922",
                    900: "#090D11",
                },
            },
            boxShadow: {
                base: "0px 18px 50px -10px rgba(120, 152, 186, 0.3)",
            },
            border: {
                1: '1px'
            },
            borderRadius: {
                "8xl": "3rem",
            },
            height: {
                "90": "90%"
            }
        },
    }
};
