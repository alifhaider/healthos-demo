import Head from 'next/head'
import { Inter } from '@next/font/google'
import Login from './login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Demo For HealthOS</title>
        <meta name="description" content="Dashboard Ecommerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Login />
      </main>
    </>
  )
}
