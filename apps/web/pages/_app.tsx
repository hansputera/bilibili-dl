import "./global.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";

/**
 * Bilibili-DL App
 * @param {AppProps} props React Props.
 * @return {JSX.Element}
 */
export default function App(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>OpenBstation</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
