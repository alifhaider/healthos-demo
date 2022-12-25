import React from 'react'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import Layout from '../components/layout'

const Login = () => {
  const [phone, setPhone] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const [message, setMessage] = React.useState<string>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!phone || !password) return setMessage('Please fill all fields')

    //todo: fix phone number length
    if (phone.length !== 4) return setMessage('Phone Number length must be 4')

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, password }),
    }).then(t => t.json())

    const token = res.token

    if (token) {
      const json = jwt.decode(token) as {
        [key: string]: string
      }
      console.log(json)
      setMessage(`Welcome ${json.admin ? 'admin' : 'user'} `)
    } else {
      setMessage('Invalid Credentials')
    }
  }

  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-8 border-2 px-4 py-6 rounded-md">
          <div>
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={e => handleSubmit(e)}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="phone-number" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phone-number"
                  name="phone"
                  type="tel"
                  pattern="[0-9]{11}"
                  auto-complete="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  auto-complete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {message && <li className="text-red-500">{message}</li>}
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <p className="mt-4 text-sm">
          Don&apos;t Have User ID?{' '}
          <Link href="/signup">
            <span className="text-blue-600 underline">Sign Up!</span>
          </Link>
        </p>
      </div>
    </Layout>
  )
}

export default Login
