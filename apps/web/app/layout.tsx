'use client';

import './global.css';
import { ThemeProvider } from "@material-tailwind/react";
import Head from 'next/head';

/**
 * Bilibili-DL App
 * @param {React.ReactNode} children React Child.
 * @return {JSX.Element}
 */
export default function RootLayout({children}: {children: React.ReactNode}): JSX.Element {
    return (
        <html lang="en">
            <Head>
                <title>Home</title>
                <meta name="description" content="OpenBstation" />
            </Head>
            <ThemeProvider>
                <body>{children}</body>
            </ThemeProvider>
        </html>
    );
}
