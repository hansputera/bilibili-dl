import "./global.css";
import NextApp, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { AbstractIntlMessages, NextIntlProvider } from "next-intl";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import Layout from "@/components/layout";

type Props = {
  messages: AbstractIntlMessages;
  locale: string;
  colorScheme: ColorScheme;
};

/**
 * Bilibili-DL App
 * @param {AppProps} props React Props.
 * @return {JSX.Element}
 */
export default function App(props: AppProps & Props): JSX.Element {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <>
      <Head>
        <title>OpenBstation</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
          }}
        >
          <NextIntlProvider
            messages={pageProps.messages}
            locale={pageProps.locale ?? "en"}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NextIntlProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);

  return {
    ...appProps,
    colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "light",
  };
};
