import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header'
import { createContext, useContext, useState } from 'react'

import { CartProvider } from '../contexts/cartcontext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
      </CartProvider>
    </>
  )
}
