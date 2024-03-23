import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"

import theme from "@/config/materialUITheme";

import RootContainer from "@/components/RootContainer";

import "../styles/main.css";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Vivir Saludable",
    description: "Generated by create next app",
    manifest: "/manifest.json",
    icons: {
        apple: "/icon.png",
    },
};

export const viewport: Viewport = {
    themeColor: "light",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = cookies().get("session");

    return (
        <html lang="es" data-theme="vs">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
                />
                <link rel="icon" type="image/x-icon" href="./favicon.ico" />
                <Script src="//g.alicdn.com/chatui/icons/2.0.2/index.js"></Script>
            </head>
            <body>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <RootContainer cookies={cookieStore}>
                            {children}
                        </RootContainer>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
