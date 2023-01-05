import "../styles/globals.css";
import "../styles/vars.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

// root
function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// i18n
export default appWithTranslation(App);
