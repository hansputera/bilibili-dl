import type {AppProps} from 'next/app';
import {Global} from '@emotion/react';
import xw from 'xwind';

/**
 * Bilibili-DL App
 * @param {AppProps} arg0 App properties.
 * @return {JSX.Element}
 */
export default function BilibiliApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Global styles={xw`XWIND_BASE XWIND_GLOBAL`} />
            <Component {...pageProps} />
        </>
    );
}
