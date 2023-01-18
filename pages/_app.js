import Head from "next/head";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.css';
import '../styles/scss/custom.css'
import 'animate.css'
import { NavbarComponent } from "../components/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { SSRProvider } from "react-bootstrap";
import { SessionProvider } from "next-auth/react";
config.autoAddCss = false;

export default function App({
  Component,
  pageProps }) {
  return (
    <SSRProvider>
      <Head>
        <title>SwitchHub | Shop</title>
        <link rel="icon" href="/favicon.ico" />
        <meta httpEquiv="Content-Security-Policy" content=""></meta>
      </Head>
      <NavbarComponent />
      <Component {...pageProps} />
    </SSRProvider>
  )
}