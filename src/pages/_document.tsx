import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <meta charSet="utf-8" />
        <link rel="icon" href="/moon.png" />
        <title>
          Hi, Moon Store - Sua papelaria criativa!
        </title>
        <meta name="description" content="A Moon Store é uma papelaria criativa que tem como objetivo trazer produtos de qualidade e com um preço acessível para você!" />
        <meta name="og:title" content="Hi, Moon Store - Sua papelaria criativa!" />
        <meta name="og:image" content="/complete_logo.png" />
        <meta name="og:description" content="A Moon Store é uma papelaria criativa que tem como objetivo trazer produtos de qualidade e com um preço acessível para você!" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
