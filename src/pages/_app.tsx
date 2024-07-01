import CartContextProvider from "@/contexts/cartContext"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"

export default function App({ Component, pageProps }: AppProps) {
  const title = "Hi, Moon Store 🌙💖 - Sua papelaria criativa!"
  const description =
    "A Moon Store é uma papelaria criativa que tem como objetivo trazer produtos de qualidade e com um preço acessível para você!"

  return (
    <CartContextProvider>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/logo-384x384.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logo-384x384.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-384x384.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/logo-384x384.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:url" content="https://himoonstore.vercel.app/" />
        <meta property="og:image" content="/logo-384x384.png" />
      </Head>
      <Component {...pageProps} />
    </CartContextProvider>
  )
}
