import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import "../styles/main.css";

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

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" data-theme="vs">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/x-icon" href="./favicon.ico" />
            </head>
            <body className={`${ubuntu.className} bg-white-dark`}>
                <main>
                    <div className="container-sm container-xl h-screen p-8 pt-4">{children}</div>
                </main>
            </body>
        </html>
    );
}
