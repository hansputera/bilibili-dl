import './global.css';
import {Metadata} from 'next';

/**
 * Bilibili-DL App
 * @param {React.ReactNode} children React Child.
 * @return {JSX.Element}
 */
export default function RootLayout({children}: {children: React.ReactNode}): JSX.Element {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

export const metadata: Metadata = {
    title: 'Home',
    description: 'Bilibili-DL App',
};
