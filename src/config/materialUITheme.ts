'use client';

import { Roboto } from 'next/font/google';
import { ThemeOptions, createTheme } from '@mui/material/styles';

const roboto = Roboto({
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
    fontFamily: roboto.style.fontFamily,
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
    }
  }
};

export default createTheme(themeOptions);