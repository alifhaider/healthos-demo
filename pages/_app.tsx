import '../styles/globals.css'
import * as React from 'react'
import type { AppProps } from 'next/app'
import Header from '../components/header'

import { CartProvider } from '../contexts/cart-context'
import { AuthContextProvider } from '../contexts/auth-context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <CartProvider>
          <Header />
          <Component {...pageProps} />
        </CartProvider>
      </AuthContextProvider>
    </>
  )
}
