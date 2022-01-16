import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import { MoralisProvider } from "react-moralis";
import { ContextProvider } from "../Store";
import { ChakraProvider, extendTheme, Button } from "@chakra-ui/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { LomModal } from "../components/UI/Modal";

import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS

config.autoAddCss = false;

const theme = extendTheme({
  config: {
    initialColorMode: "dark"
  }
});

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID as string;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL as string;

// const SERVER_URL = "https://exhvmic69969.usemoralis.com:2053/server";
// const APP_ID = "vTAL7LV9e2C8AR7QSRwwTWksdujMxaIubU6Aq9ua";

function MyApp({ Component, pageProps }: AppProps) {
  if (!APP_ID || !SERVER_URL) {
    return (
      // <div>Hello</div>
      <ChakraProvider theme={theme}>
        <LomModal placeholder="Up's, something's wrong...">
          <h3>Moralis App_ID and Server_ID has not been set:</h3>
          <p>
            Follow the steps on the{" "}
            <a href="https://docs.moralis.io/getting-started/quick-start">
              Moralis documentation
            </a>{" "}
            to create a new Moralis project. Then find your application's app id
            and server id and paste them in a root <b>.env</b> file for both{" "}
            <b>.env.development</b> and <b>.env.production</b> like so:
          </p>
          <pre>
            <code>
              MORALIS_APP_ID='[APP_ID]'
              <br />
              MORALIS_SERVER_URL='[SERVER_URL]'
            </code>
          </pre>
        </LomModal>
      </ChakraProvider>
    );
  }

  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <ChakraProvider theme={theme}>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </ChakraProvider>
    </MoralisProvider>
  );
}
export default MyApp;
