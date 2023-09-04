import Head from 'next/head'
import React from 'react'

export default function NextHeader({
  title = 'Hi, Moon Store 🌙💖 - Sua papelaria criativa!',
  description = 'A Moon Store é uma papelaria criativa que tem como objetivo trazer produtos de qualidade e com um preço acessível para você!',
}) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/moon.png" />
      <title>
        {title}
      </title>
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:image" content="/complete_logo.png" />
      <meta name="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content="/complete_logo.png" />
      <meta name="twitter:description" content={description} />
      <meta name="theme-color" content="#000000" />
    </Head>
  )
}
