import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { AuthContext } from '../contexts/auth-context'
import UserInfo from '../components/user-info'
import { getCookie } from 'cookies-next'
import axios from 'axios'

export default function Home() {
  const { isAuthenticated, logout } = React.useContext(AuthContext)

  return (
    <>
      <Head>
        <title>Demo For HealthOS</title>
        <meta name="description" content="Dashboard Ecommerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-7xl mx-auto flex flex-col min-h-screen items-center justify-center">
        <UserInfo />
        {isAuthenticated ? (
          <>
            <h1 className="text-bold text-7xl mb-16">Now you are logged in</h1>
            <button
              onClick={() => logout()}
              className="px-8 py-4 bg-orange-400 text-white rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h1 className="text-bold text-7xl mb-16">
              Hurry Up to Create an Account
            </h1>
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
            <button
              onClick={() => logout()}
              className="px-8 py-4 bg-orange-400 text-white rounded-lg"
            >
              Clear Cookie
            </button>
          </>
        )}
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
        <div className="p-5 bg-black text-slate-300 rounded-lg">
          <h2 className="text-lg font-medium">Features: </h2>
          <ul className="list-inside capitalize ml-4 leading-5">
            <li>- Without logged in unable to visit dashboard</li>
            <li className="flex gap-2">
              - Navigation <pre className="bg-[#dfdfdf] text-black">login</pre>{' '}
              Button Changes to{' '}
              <pre className="bg-[#dfdfdf] text-black">logout</pre>
            </li>
          </ul>
        </div>
      </main>
    </>
  )
}
