import 'windi.css';
import type {AppProps} from 'next/app';

/**
 * Bilibili-DL App
 * @param {AppProps} arg0 App properties.
 * @return {JSX.Element}
 */
export default function BilibiliApp({Component, pageProps}: AppProps): JSX.Element {
    return (
      <>
        <Component {...pageProps} />
      </>
    );
}
