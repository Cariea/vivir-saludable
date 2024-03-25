'use client';

import { Ubuntu } from 'next/font/google';
import { ThemeOptions, createTheme } from '@mui/material/styles';

const ubuntu = Ubuntu({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
  });

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#003f52',
      "50": "#c9fffc",
      "100": "#99fffd",
      "200": "#54fffe",
      "300": "#07f4ff",
      "400": "#00d5ef",
      "500": "#00a9c9",
      "600": "#0086a1",
      "700": "#111922",
      "800": "#086b82",
      "900": "#003f52",
    },
    secondary: {
      main: '#32c5a3',
      "50": "#f1fcf9",
      "100": "#cef9eb",
      "200": "#9ef1d8",
      "300": "#65e3c2",
      "400": "#32c5a3",
      "500": "#1cb090",
      "600": "#148d76",
      "700": "#147160",
      "800": "#155a4f",
      "900": "#164b41",
    },
    background: {
      default: '#f5f9ff',
    },
    error: {
      main: '#e11d48',
    },
    warning: {
      main: '#facc15',
    },
    info: {
      main: '#0ea5e9',
    },
    success: {
      main: '#32C5A3',
    },
    grey: {
      "50": "#EEF2F6",
      "100": "#DDE5EE",
      "200": "#BBCBDD",
      "300": "#9AB2CB",
      "400": "#7898BA",
      "500": "#456587",
      "600": "#344C65",
      "700": "#18232F",
      "800": "#111922",
      "900": "#090D11",
    }
  },
  typography: {
    fontFamily: ubuntu.style.fontFamily,
    fontSize: 14
  },
  components: {
    MuiButton: {
        styleOverrides: {
            root: ({ ownerState }) => ({
                ...(ownerState && {
                    borderRadius: '4rem',
                    boxShadow: '0px 18px 50px -10px rgba(120, 152, 186, 0.3)',
                    padding: '1rem',
                    width: '100%',
                    textTransform: 'none',
                    fontSize: 16
                })
            })
        }
    },
    MuiContainer: {
        styleOverrides: {
            root: ({ ownerState }) => ({
                ...(ownerState && {
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                })
            })
        }
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState && {
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            boxShadow: "0px 2px 8px 0px rgba(120, 152, 186, 0.3)",
            height: "auto",
          })
        })
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ ownerState, theme }) => ({
          ...(ownerState && {
            backgroundColor: theme.palette.background.default,
            height: "100vh"
          })
        })
      }
    }
  }
};

export default createTheme(themeOptions);