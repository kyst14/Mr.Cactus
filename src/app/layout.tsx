import type { Metadata } from "next";
import { Nunito, Oswald } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/Theme/ThemeProvider";

const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["latin", "cyrillic"],
    display: "swap",
});

const oswald = Oswald({
    variable: "--font-oswald",
    subsets: ["latin", "cyrillic"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Mr.Cactus",
    description: "Mr.Cactus is a family flower store.",
    metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
    icons: {
        icon: "/favicon.ico"
    },
    openGraph: { // Metadata for Open Graph
        title: "Mr.Cactus",
        description: "Mr.Cactus is a family flower store.",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "Mr.Cactus",
            },
        ],
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${nunito.variable} ${oswald.variable} bg-bg antialiased m-0 p-0`}>
            <ThemeProvider>{children}</ThemeProvider>
        </body>
        </html>
    );
}

