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
    },
    secondary: {
      main: '#32c5a3',
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
  },
  typography: {
    fontFamily: ubuntu.style.fontFamily,
    fontSize: 16
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