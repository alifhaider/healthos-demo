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
        <div className="flex gap-10 mb-10">
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
        <pre
          data-line-numbers="true"
          data-lang="tsx"
          style={{
            backgroundColor: '#dfdfdf',
            borderRadius: '0.3em',
            fontSize: '0.9em',
            margin: '2em 0',
            overflowX: 'auto',
            padding: '0.5em',
          }}
        >
          <code>
            {`
  <p> To login as user: type any phone number with 11 digits and any passwords </p> 
  <br />
  <p> To login as admin: phone="1111" and password="admin"</p> 
  `}
          </code>
        </pre>
      </main>
    </>
  )
}
