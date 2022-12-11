import "../styles/globals.css";
import "../styles/vars.css";
import type { AppProps } from "next/app";


// root
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
