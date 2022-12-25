import Head from 'next/head'
import Link from 'next/link'
import Login from './login'

export default function Home() {
  return (
    <>
      <Head>
        <title>Demo For HealthOS</title>
        <meta name="description" content="Dashboard Ecommerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-7xl mx-auto flex flex-col min-h-screen items-center justify-center">
        <div className="flex gap-10">
          <Link
            className="px-8 py-4 bg-orange-400 text-white rounded-lg"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="px-8 py-4 bg-orange-400 text-white rounded-lg"
            href="/signup"
          >
            Sign UP
          </Link>
        </div>
      </main>
    </>
  )
}
