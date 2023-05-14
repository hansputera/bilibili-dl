import './global.css';
import {Metadata} from 'next';

export default function RootLayout({children}: {children: React.ReactNode}) {
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
