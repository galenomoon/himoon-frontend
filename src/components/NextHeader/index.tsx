import Head from 'next/head'
import React from 'react'

export default function NextHeader({
  title = 'Hi, Moon Store 🌙💖 - Sua papelaria criativa!',
  description = 'A Moon Store é uma papelaria criativa que tem como objetivo trazer produtos de qualidade e com um preço acessível para você!',
  image = '/complete_logo.png',
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
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="og:site_name" content="Hi, Moon Store 🌙💖" />
      <meta name="og:type" content="website" />
      <meta name="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={description} />
      <meta name="theme-color" content="#000000" />
    </Head>
  )
}
