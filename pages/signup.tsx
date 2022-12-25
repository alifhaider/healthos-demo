import React from 'react'
import jwt from 'jsonwebtoken'
import Link from 'next/link'

const SignUp = () => {
  const [phone, setPhone] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const [message, setMessage] = React.useState<string>('')

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (!phone || !password) return setMessage('Please fill all fields')
    if (phone.length !== 11) return setMessage('Phone Number length must be 11')

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
      setMessage(`Welcome ${json.admin ? 'admin' : 'user'} `)
    } else {
      setMessage('Invalid Credentials')
    }
  }

  return (
    <div className="flex flex-col w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 border-2 px-4 py-6 rounded-md">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign Up to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6">
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
                aria-labelledby="phone-number"
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
              onClick={handleSubmit}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
      <p className="mt-4 text-sm">
        Already have an ID? &nbsp;
        <Link href="/login">
          <span className="text-blue-600 underline">Sign In!</span>
        </Link>
      </p>
    </div>
  )
}

export default SignUp
